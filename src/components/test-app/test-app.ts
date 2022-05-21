/* eslint-disable no-console */
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
    }

    configurationOptionTypeForm: HTMLElement

    editingConfiguration: Configuration
    configurations: Array<Configuration> = []
    optionsTypes: Array<OptionType> = []

    state: {
        isFetching: boolean;
        mode: 'idle' | 'edit-conf' | 'edit-option-type';
    } = {
        isFetching: true,
        mode: 'idle',
    }

    connectedCallback(): void {
        this.attachShadow({ mode: 'open' })

        fetchData()
            .then((data) => {
                this.configurations = data.configurations
                this.optionsTypes = data.optionsTypes
                this.state.isFetching = false
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

    addStyle(): void {
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
            this.render()
        }

        this.state.mode = 'idle'
        this.render()
    }

    handleConfigurationCancel() {
        this.state.mode = 'idle'
        this.editingConfiguration = undefined
        this.render()
    }

    handleOptionTypeSave(event: CustomEvent<OptionType>) {
        this.optionsTypes.push({
            ...event.detail,
            id: this.optionsTypes.length,
        })

        // @ts-ignore
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

        this.state.mode = 'idle'

        this.render()
    }

    handleOptionTypeCancel() {
        this.configurationOptionTypeForm.removeAttribute('visible')
        this.state.mode = 'idle'
        this.render()
    }

    handleCreateConfigurationDraft() {
        if (this.state.isFetching) {
            return false
        }

        this.state.mode = 'edit-conf'

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

        this.render()
    }

    handleCreateOptionType() {
        this.state.mode = 'edit-option-type'
        this.render()
    }

    initEvents(): void {
        this.controls.buttonCreateConfiguration.addEventListener('click', this.handleCreateConfigurationDraft.bind(this))
        this.controls.buttonCreateOptiontype.addEventListener('click', this.handleCreateOptionType.bind(this))

        this.configurationOptionTypeForm.addEventListener('save', this.handleOptionTypeSave.bind(this))
        this.configurationOptionTypeForm.addEventListener('cancel', this.handleOptionTypeCancel.bind(this))
    }

    render(): void {
        this.shadowRoot.innerHTML = ''
        this.shadowRoot.appendChild(templateElement.content.cloneNode(true))

        this.initControls()

        this.configurationOptionTypeForm = document.createElement('configuration-optiontype-form')

        const configurationForm = document.createElement('configuration-form')
        configurationForm.setAttribute('configuration', JSON.stringify(this.editingConfiguration))
        configurationForm.addEventListener('save', this.handleConfigurationSave.bind(this))
        configurationForm.addEventListener('cancel', this.handleConfigurationCancel.bind(this))

        this.controls.configurationList = document.createElement('configuration-list')
        this.controls.configurationList.setAttribute('configurations', JSON.stringify(this.configurations))
        this.controls.configurationList.setAttribute('optionsTypes', JSON.stringify(this.optionsTypes))
        this.controls.configurationList.addEventListener('click-edit', (event: CustomEvent<Configuration>) => {
            this.editingConfiguration = event.detail
            configurationForm.setAttribute('configuration', JSON.stringify(this.editingConfiguration))
            this.state.mode = 'edit-conf'
            this.render()
        })

        this.shadowRoot.querySelector('slot[name="configuration-form"]')
            .appendChild(configurationForm)
        this.shadowRoot.querySelector('slot[name="configuration-list"]')
            .appendChild(this.controls.configurationList)
        this.shadowRoot.querySelector('slot[name="configuration-optiontype-form"]')
            .appendChild(this.configurationOptionTypeForm)

        this.initEvents()
        this.addStyle()

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
