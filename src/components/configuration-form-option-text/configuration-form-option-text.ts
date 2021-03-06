import { Option } from '../../../common/types/Option'
import { OptionTypeText } from '../../../common/types/OptionType'
import { getStyle } from './configuration-form-option-text.style'

const template = document.createElement('template')
template.innerHTML = `
    <label class="form-control">
        <div class="name" id="name"></div>
        <div class="value">
            <input
                value=""
                pattern=".{2,255}"
                required
            />
        </div>
    </label>
`

export class ConfigurationFormOptionText extends HTMLElement {
    option: Option<OptionTypeText>

    connectedCallback(): void {
        this.attachShadow({ mode: 'open' })

        try {
            this.option = JSON.parse(this.getAttribute('option'))
        } catch (exception) {
            this.option = undefined
        }

        this.render()
    }

    handleChange(newValue: string) {
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
            input.value = this.option.value

            input.addEventListener('change', (event) => {
                this.handleChange((event.target as HTMLInputElement).value)
            })

            input.addEventListener('input', (event) => {
                this.handleChange((event.target as HTMLInputElement).value)
            })
        }

        this.setupStyles()
    }
}
