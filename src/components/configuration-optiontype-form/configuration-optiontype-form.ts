import { InputType, OptionType } from '../../../common/types/OptionType'

import { getStyle } from './configuration-optiontype-form.style'
import { html } from './configuration-optiontype-form.template'

const template = document.createElement('template')
template.innerHTML = html

export class ConfigurationOptionTypeForm extends HTMLElement {
    static get observedAttributes() {
        return ['visible']
    }

    optionType: OptionType = {
        id: undefined,
        type: 'text',
        name: 'Option Type',
        defaultValue: '',
    }

    controls: {
        buttonCancel: HTMLButtonElement;
        form: HTMLFormElement;
        name: HTMLInputElement;
        type: HTMLSelectElement;
        variants: HTMLInputElement;
        variantsWrapper: HTMLDivElement;
    } = {
        buttonCancel: undefined,
        form: undefined,
        name: undefined,
        type: undefined,
        variants: undefined,
        variantsWrapper: undefined,
    }

    connectedCallback(): void {
        this.attachShadow({ mode: 'open' })

        this.render()
    }

    handleNameChange(event: Event) {
        this.optionType.name = (event.target as HTMLInputElement).value
    }

    handleTypeChange(event: Event) {
        this.optionType.type = (event.target as HTMLInputElement).value as InputType
        this.render()
    }

    handleVariantsChange(event: Event) {
        if (this.optionType.type === 'select') {
            this.optionType.variants = (event.target as HTMLInputElement).value
                .split(',')
                .map((value) => ({ value }))
        }
    }

    handleOptionChange(event: CustomEvent<OptionType>) {
        this.dispatchEvent(new CustomEvent('configuration-option-change', {
            detail: event.detail,
            composed: true,
        }))
    }

    handleSubmit(optionType: OptionType) {
        this.dispatchEvent(new CustomEvent('save', {
            detail: {
                ...optionType,
                ...this.optionType.type === 'checkbox' ? {defaultValue: false } : {},
                ...this.optionType.type === 'text' ? { defaultValue: '' } : {},
                ...this.optionType.type === 'select'
                    ? {
                        defaultValue: { value: '' },
                        variants: this.optionType.variants,
                    }
                    : {
                        variants: undefined,
                    },
            },
            composed: true,
        }))

        this.dispatchEvent(new CustomEvent('cancel', {
            composed: true,
        }))
    }

    initControls(): void {
        this.controls = {
            buttonCancel: this.shadowRoot.querySelector('#cancel-button'),
            name: this.shadowRoot.querySelector('input[name="name"]'),
            variants: this.shadowRoot.querySelector('input[name="variants"]'),
            variantsWrapper: this.shadowRoot.querySelector('#variants'),
            type: this.shadowRoot.querySelector('select[name="type"]'),
            form: this.shadowRoot.querySelector('form'),
        }

        this.controls.form.addEventListener('submit', (event) => {
            event.preventDefault()
            this.handleSubmit(this.optionType)
        })

        this.controls.name.addEventListener('change', this.handleNameChange.bind(this))
        this.controls.type.addEventListener('change', this.handleTypeChange.bind(this))
        this.controls.variants.addEventListener('change', this.handleVariantsChange.bind(this))

        this.controls.buttonCancel.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('cancel', {
                composed: true,
            }))
        })
    }

    setupStyles(): void {
        const styleTag = document.createElement('style')
        styleTag.textContent = getStyle()
        this.shadowRoot.appendChild(styleTag)
    }

    render(): void {
        if (!this.optionType || !this.shadowRoot) {
            return
        }

        this.shadowRoot.innerHTML = ''
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.initControls()

        // Update nodes
        this.controls.name.value = this.optionType.name
        this.controls.type.value = this.optionType.type
        if (this.optionType.type === 'select') {
            this.controls.variantsWrapper.style.display = ''
        } else {
            this.controls.variantsWrapper.style.display = 'none'
        }

        this.setupStyles()
    }
}
