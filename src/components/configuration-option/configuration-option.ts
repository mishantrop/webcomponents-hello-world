import { Option } from '../../../common/types/Option'
import { OptionTypeCheckbox, OptionTypeText, OptionTypeSelect } from '../../../common/types/OptionType'
import { Variant } from '../../../common/types/Variant'

import { getStyle } from './configuration-option.style'

const template = document.createElement('template')
template.innerHTML = `
    <div class="item">
        <div class="name" id="name"></div>
        <div class="value" id="value"></div>
    </div>
`

export class ConfigurationOption extends HTMLElement {
    option: Option<OptionTypeCheckbox | OptionTypeText | OptionTypeSelect>

    connectedCallback(): void {
        this.attachShadow({ mode: 'open' })
        this.option = JSON.parse(this.getAttribute('option'))

        this.render()
    }

    setupStyles(): void {
        const styleTag = document.createElement('style')
        styleTag.textContent = getStyle()
        this.shadowRoot.appendChild(styleTag)
    }

    render(): void {
        this.shadowRoot.innerHTML = ''
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.shadowRoot.querySelector('#name').innerHTML = this.option.type.name

        const valueNode = this.shadowRoot.querySelector('#value')

        switch (this.option.type.type) {
            case 'checkbox':
                valueNode.innerHTML = this.option.value ? 'Yes' : 'No'
                break
            case 'select':
                valueNode.innerHTML = (this.option.value as Variant).value
                break
            case 'text':
                valueNode.innerHTML = this.option.value.toString()
                break
        }

        this.setupStyles()
    }
}
