import { Option } from '../../../common/types/Option'
import { OptionTypeCheckbox } from '../../../common/types/OptionType'
import { getStyle } from './configuration-form-option-checkbox.style'

const template = document.createElement('template')
template.innerHTML = `
    <label class="form-control">
        <div class="name" id="name"></div>
        <div class="value">
            <input type="checkbox" />
        </div>
    </label>
`

export class ConfigurationFormOptionCheckbox extends HTMLElement {
    option: Option<OptionTypeCheckbox>

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
        this.shadowRoot.querySelector('input').addEventListener('change', (event) => {
            this.handleChange((event.target as HTMLInputElement).checked)
        })
    }

    handleChange(newValue: boolean) {
        this.dispatchEvent(new CustomEvent<typeof this.option>('change', {
            detail: {
                ...this.option,
                value: newValue,
            },
            composed: true,
        }))
    }

    setupStyles(): void {
        const styleTag = document.createElement('style')
        styleTag.textContent = getStyle()
        this.shadowRoot.appendChild(styleTag)
    }

    render(): void {
        this.shadowRoot.innerHTML = ''
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        if (this.option) {
            const nameSlot = this.shadowRoot.querySelector('#name')
            nameSlot.innerHTML = this.option.type.name

            const input = this.shadowRoot.querySelector('input')

            if (this.option.value) {
                input.setAttribute('checked', 'true')
            } else {
                input.removeAttribute('checked')
            }
        }

        this.initEvents()
        this.setupStyles()
    }
}
