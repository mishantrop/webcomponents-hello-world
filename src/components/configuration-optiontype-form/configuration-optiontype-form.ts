/* eslint-disable no-console */
import { InputType, OptionType } from '../../../common/types/OptionType'

import { getStyle } from './configuration-optiontype-form.style'

const template = document.createElement('template')
template.innerHTML = `
    <div>
        <h3>New Configuration Option</h3>
        <form>
            <label class="form-control">
                <div class="name">
                    Name
                </div>
                <div class="value">
                    <input name="name" value="" />
                </div>
            </label>

            <label class="form-control">
                <div class="name">
                    Type
                </div>
                <div class="value">
                    <select name="type">
                        <option value="text">Текст</option>
                        <option value="checkbox">Чекбокс</option>
                        <option value="select">Выпадающий список</option>
                    </select>
                </div>
            </label>

            <label class="form-control" id="variants">
                <div class="name">
                    Варианты
                </div>
                <div class="value">
                    <input name="variants" value="" />
                </div>
            </label>

            <button id="save-button" type="submit" class="button button--type-primary">
                + Save
            </button>

            <button id="cancel-button" type="button" class="button button--type-secondary">
                Cancel
            </button>
        </form>
    </div>
`

export class ConfigurationOptionTypeForm extends HTMLElement {
    static get observedAttributes() {
        return ['visible']
    }

    optionType: OptionType = {
        id: undefined,
        type: 'text',
        name: 'Option Type',
        defaultValue: '',
        variants: [],
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
        console.log((event.target as HTMLInputElement).value)
        this.render()
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
                ...optionType.type === 'checkbox' ? { defaultValue: false } : {},
                ...optionType.type === 'text' ? { defaultValue: '' } : {},
                ...optionType.type === 'select' ? { defaultValue: { value: '' } } : {},
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

        this.controls.buttonCancel.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('cancel', {
                composed: true,
            }))
        })
    }

    addStyle(): void {
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

        console.log(this.optionType)

        this.addStyle()
    }

	// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
	attributeChangedCallback(attrName: 'visible', oldVal?: unknown, newVal?: unknown) {
        // eslint-disable-next-line no-console
        // console.group('attributeChangedCallback')
        // console.log('oldVal')
        // console.log(oldVal)
        // console.log('newVal')
        // console.log(newVal)
        // console.groupEnd()
	}
}
