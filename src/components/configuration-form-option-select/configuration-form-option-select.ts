/* eslint-disable no-console */
import { Option } from '../../../common/types/Option'
import { OptionTypeSelect } from '../../../common/types/OptionType'
import { getStyle } from './configuration-form-option-select.style'

const template = document.createElement('template')
template.innerHTML = `
    <label class="form-control">
        <div class="name">
            <slot name="name"></slot>
        </div>
        <div class="value">
            <select value=""></select>
        </div>
    </label>
`

export class ConfigurationFormOptionSelect extends HTMLElement {
    option: Option<OptionTypeSelect>

    connectedCallback(): void {
        this.attachShadow({ mode: 'open' })

        try {
            this.option = JSON.parse(this.getAttribute('option'))
        } catch (exception) {
            this.option = undefined
        }

        this.render()
    }

    initEvents(): void {
        this.shadowRoot.querySelector('select').addEventListener('change', (event) => {
            this.handleChange((event.target as HTMLSelectElement).value)
        })
    }

    handleChange(newValue: string) {
        this.dispatchEvent(new CustomEvent<typeof this.option>('change', {
            detail: {
                ...this.option,
                value: { value: newValue },
            },
            composed: true,
        }))
    }

    addStyle(): void {
        const styleTag = document.createElement('style')
        styleTag.textContent = getStyle()
        this.shadowRoot.appendChild(styleTag)
    }

    render(): void {
        this.shadowRoot.innerHTML = ''
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        if (this.option) {
            const nameSlot = this.shadowRoot.querySelector('slot[name="name"]')
            nameSlot.innerHTML = this.option.type.name

            const select = this.shadowRoot.querySelector('select')
            select.value = this.option.value.value

            const optionElement = document.createElement('option')
            optionElement.value = ''
            optionElement.innerText = 'Not selected'
            select.appendChild(optionElement)

            this.option.type.variants.forEach((variant) => {
                const optionElement = document.createElement('option')
                optionElement.value = variant.value
                optionElement.innerText = variant.value
                if (variant.value === this.option.value.value) {
                    optionElement.setAttribute('selected', 'true')
                } else {
                    optionElement.removeAttribute('selected')
                }

                select.appendChild(optionElement)
            })
        }

        this.initEvents()
        this.addStyle()
    }

	// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
	attributeChangedCallback(attrName: unknown, oldVal: unknown, newVal: unknown) {
        // eslint-disable-next-line no-console
        console.log(attrName, oldVal, newVal)
	}
}
