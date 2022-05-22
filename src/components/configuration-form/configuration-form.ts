import { Configuration } from '../../../common/types/Configuration'
import { OptionTypeText } from '../../../common/types/OptionType'
import { Option } from '../../../common/types/Option'
import { getStyle } from './configuration-form.style'

const template = document.createElement('template')
template.innerHTML = `
    <div class="form-wrapper">
        <h3>
            <slot name="name"></slot>
        </h3>
        <form>
            <label class="form-control">
                <div class="name">
                    Name
                </div>
                <div class="value">
                    <input
                        name="name"
                        value=""
                        pattern=".{2,255}"
                        required
                    />
                </div>
            </label>

            <slot name="options"></slot>

            <button id="save-button" type="submit" class="button button--type-primary">
                + Save
            </button>

            <button id="cancel-button" type="button" class="button button--type-secondary">
                Cancel
            </button>
        </form>
    </div>
`

export class ConfigurationForm extends HTMLElement {
    static get observedAttributes() {
        return ['configuration'];
    }

    configuration: Configuration

    controls: {
        buttonCancel: HTMLButtonElement;
    } = {
        buttonCancel: undefined,
    }

    optionControlByType = new Map<string, string>([
        ['checkbox', 'configuration-form-option-checkbox'],
        ['select', 'configuration-form-option-select'],
        ['text', 'configuration-form-option-text'],
    ])

    connectedCallback(): void {
        this.attachShadow({ mode: 'open' })

        this.setupData()
        this.render()
    }

    initControls(): void {
        this.controls = {
            buttonCancel: this.shadowRoot.querySelector('#cancel-button'),
        }

        this.controls.buttonCancel.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('cancel', {
                composed: true,
            }))
        })
    }

    setupData() {
        try {
            this.configuration = JSON.parse(this.getAttribute('configuration'))
        } catch (exception) {
            this.configuration = undefined
        }
    }

    handleNameChange(event: Event) {
        this.configuration.name = (event.target as HTMLInputElement).value
    }

    handleOptionChange(event: CustomEvent<Option<OptionTypeText>>) {
        this.dispatchEvent(new CustomEvent('configuration-option-change', {
            detail: event.detail,
            composed: true,
        }))
        this.configuration.options = this.configuration.options.map((option) => ({
            ...option,
            ...option.type.name === event.detail.type.name
                ? {
                    value: event.detail.value,
                }
                : {},
        }))
    }

    handleSubmit(configuration: Configuration) {
        this.dispatchEvent(new CustomEvent('save', {
            detail: configuration,
            composed: true,
        }))
    }

    initEvents(): void {
        this.shadowRoot.querySelector('form').addEventListener('submit', (event) => {
            event.preventDefault()
            this.handleSubmit(this.configuration)
        })
    }

    setupStyles(): void {
        const styleTag = document.createElement('style')
        styleTag.textContent = getStyle()
        this.shadowRoot.appendChild(styleTag)
    }

    render(): void {
        if (!this.configuration || !this.shadowRoot) {
            return
        }

        this.shadowRoot.innerHTML = ''
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        const nameSlot = this.shadowRoot.querySelector('slot[name="name"]')
        nameSlot.innerHTML = this.configuration.name

        const nameInput = this.shadowRoot.querySelector<HTMLInputElement>('input[name="name"]')
        nameInput.value = this.configuration.name
        nameInput.addEventListener('change', this.handleNameChange.bind(this))
        nameInput.addEventListener('input', this.handleNameChange.bind(this))

        const optionsSlot = this.shadowRoot.querySelector('slot[name="options"]')

        this.configuration.options
            .filter((option) => this.optionControlByType.has(option.type.type))
            .forEach((option) => {
                const optionControl = document.createElement(this.optionControlByType.get(option.type.type))
                optionControl.setAttribute('option', JSON.stringify(option))
                optionControl.addEventListener('change', this.handleOptionChange.bind(this))
                optionsSlot.appendChild(optionControl)
        })

        this.initEvents()
        this.initControls()
        this.setupStyles()
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
	attributeChangedCallback(attrName: 'configuration', oldVal?: string, newVal?: string) {
        this.setupData()

        this.render()
	}
}
