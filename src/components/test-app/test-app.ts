import { Configuration } from '../../../common/types/Configuration'
import { OptionType, OptionTypeCheckbox, OptionTypeSelect, OptionTypeText } from '../../../common/types/OptionType'
import { Option } from '../../../common/types/Option'
import { fetchData } from '../../api/configurations'

import { getStyle } from './test-app.style'
import { template } from './test-app.template'

const templateElement = document.createElement('template')
templateElement.innerHTML = template

export class TestApp extends HTMLElement {
    controls: {
        buttonCreateConfiguration: HTMLButtonElement;
        buttonCreateOptiontype: HTMLButtonElement;
        configurationFormWrapper: HTMLDivElement;
        configurationOptionTypeFormWrapper: HTMLDivElement;

        configurationList?: HTMLElement;
        configurationForm?: HTMLElement;
    }

    configurationOptionTypeForm: HTMLElement

    configurations: Array<Configuration> = []
    optionsTypes: Array<OptionType> = []

    state: {
        editingConfiguration: Configuration;
        isFetching: boolean;
        mode: 'idle' | 'edit-conf' | 'edit-option-type';
    } = {
        editingConfiguration: undefined,
        isFetching: true,
        mode: 'idle',
    }

    setState(patch: Partial<typeof this.state>) {
        this.state = { ...this.state, ...patch }
        this.updateDOM()
    }

    connectedCallback(): void {
        this.attachShadow({ mode: 'open' })

        fetchData()
            .then((data) => {
                this.configurations = data.configurations
                this.optionsTypes = data.optionsTypes
                this.setState({ isFetching: false })
                this.render()
            })

        this.render()
    }

    initControls(): void {
        this.controls = {
            buttonCreateOptiontype: this.shadowRoot.querySelector('#create-optiontype-button'),
            buttonCreateConfiguration: this.shadowRoot.querySelector('#create-configuration-button'),
            configurationFormWrapper: this.shadowRoot.querySelector('#configuration-form-wrapper'),
            configurationOptionTypeFormWrapper: this.shadowRoot.querySelector('#configuration-optiontype-form-wrapper'),
        }
    }

    setupStyles(): void {
        const styleTag = document.createElement('style')
        styleTag.textContent = getStyle()
        this.shadowRoot.appendChild(styleTag)
    }

    handleConfigurationSave(event: CustomEvent<Configuration>) {
        const savedConfiguration = event.detail

        if (savedConfiguration.id) {
            this.configurations = this.configurations.map((configuration) => ({
                ...configuration,
                ...configuration.id === savedConfiguration.id
                    ? savedConfiguration
                    : {},
            }))
            this.controls.configurationList.setAttribute('configurations', JSON.stringify(this.configurations))
        }

        this.setState({ mode: 'idle' })
        this.updateDOM()
    }

    handleConfigurationCancel() {
        this.setState({ editingConfiguration: undefined, mode: 'idle' })
    }

    handleOptionTypeSave(event: CustomEvent<OptionType>) {
        this.optionsTypes.push({
            ...event.detail,
            id: this.optionsTypes.length,
        })

        this.configurations = this.configurations.map((conf) => ({
            ...conf,
            options: [
                ...conf.options,
                ...[{
                    type: event.detail,
                    value: event.detail.defaultValue,
                    typeId: event.detail.id,
                }],
            ],
        }))

        this.setState({ mode: 'idle' })
    }

    handleOptionTypeCancel() {
        this.configurationOptionTypeForm.removeAttribute('visible')
        this.setState({ mode: 'idle' })
    }

    handleCreateConfigurationDraft() {
        if (this.state.isFetching) {
            return false
        }

        this.configurations.push({
            id: this.configurations.length + 1,
            name: `Draft ${this.configurations.length}`,
            options: this.optionsTypes.map((optionType) => ({
                value: optionType.defaultValue,
                typeId: optionType.id,
                type: optionType,
                variants: optionType.type === 'select' ? [] : undefined,
            } as Option<OptionTypeCheckbox | OptionTypeText | OptionTypeSelect>)),
        })

        this.controls.configurationList.setAttribute('configurations', JSON.stringify(this.configurations))
        this.setState({ mode: 'edit-conf' })
    }

    handleCreateOptionType() {
        this.setState({ mode: 'edit-option-type' })
    }

    handleEditConfigurationClick(event: CustomEvent<Configuration>) {
        this.setState({
            editingConfiguration: event.detail,
            mode: 'edit-conf',
        })
        this.controls.configurationForm.setAttribute('configuration', JSON.stringify(this.state.editingConfiguration))
    }

    initEvents(): void {
        this.controls.buttonCreateConfiguration.addEventListener('click', this.handleCreateConfigurationDraft.bind(this))
        this.controls.buttonCreateOptiontype.addEventListener('click', this.handleCreateOptionType.bind(this))

        this.configurationOptionTypeForm.addEventListener('save', this.handleOptionTypeSave.bind(this))
        this.configurationOptionTypeForm.addEventListener('cancel', this.handleOptionTypeCancel.bind(this))

        this.controls.configurationList.addEventListener('click-edit', this.handleEditConfigurationClick.bind(this))

        this.controls.configurationForm.addEventListener('save', this.handleConfigurationSave.bind(this))
        this.controls.configurationForm.addEventListener('cancel', this.handleConfigurationCancel.bind(this))
    }

    render(): void {
        this.shadowRoot.innerHTML = ''
        this.shadowRoot.appendChild(templateElement.content.cloneNode(true))

        this.initControls()

        this.configurationOptionTypeForm = document.createElement('configuration-optiontype-form')

        this.controls.configurationForm = document.createElement('configuration-form')

        this.controls.configurationList = document.createElement('configuration-list')

        this.shadowRoot.querySelector('slot[name="configuration-form"]')
            .appendChild(this.controls.configurationForm)
        this.shadowRoot.querySelector('slot[name="configuration-list"]')
            .appendChild(this.controls.configurationList)
        this.shadowRoot.querySelector('slot[name="configuration-optiontype-form"]')
            .appendChild(this.configurationOptionTypeForm)

        this.initEvents()
        this.setupStyles()

        this.updateDOM()
    }

    updateDOM() {
        this.controls.configurationForm.setAttribute('configuration', JSON.stringify(this.state.editingConfiguration))

        this.controls.configurationList.setAttribute('configurations', JSON.stringify(this.configurations))
        this.controls.configurationList.setAttribute('optionsTypes', JSON.stringify(this.optionsTypes))

        switch (this.state.mode) {
            case 'edit-conf': {
                this.controls.configurationFormWrapper.style.display = ''
                this.controls.configurationOptionTypeFormWrapper.style.display = 'none'
                break
            }
            case 'edit-option-type': {
                this.controls.configurationFormWrapper.style.display = 'none'
                this.controls.configurationOptionTypeFormWrapper.style.display = ''
                break
            }
            case 'idle': {
                this.controls.configurationFormWrapper.style.display = 'none'
                this.controls.configurationOptionTypeFormWrapper.style.display = 'none'
                break
            }
        }
    }
}
