import { Configuration } from '../../../common/types/Configuration'
import { OptionType } from '../../../common/types/OptionType'

import { getStyle } from './configuration-list.style'

const template = document.createElement('template')
template.innerHTML = `
    <div class="list" id="list"></div>
`

export class ConfigurationList extends HTMLElement {
    name: string
    configurations: Array<Configuration> = []
    optionsTypes: Array<OptionType> = []

    listElement: HTMLElement
    configurationItems: Record<number, HTMLElement> = {}

    static get observedAttributes() {
        return ['configurations'];
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' })

        this.name = this.getAttribute('name')
        this.configurations = JSON.parse(this.getAttribute('configurations'))
        this.optionsTypes = JSON.parse(this.getAttribute('optionsTypes'))

        this.render()
    }

    setupStyles() {
        const styleTag = document.createElement('style')
        styleTag.textContent = getStyle()
        this.shadowRoot.appendChild(styleTag)
    }

    handleEditClick(event: CustomEvent<Configuration>) {
        this.dispatchEvent(new CustomEvent(event.type, {
            detail: event.detail,
            composed: true,
        }))
    }

    render() {
        if (!this.shadowRoot) {
            return
        }

        this.shadowRoot.innerHTML = ''
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.listElement = this.shadowRoot.querySelector('#list')

        this.setupStyles()
        this.updateDOM()
    }

    updateDOM() {
        if (!this.listElement) {
            return
        }

        (this.configurations || []).forEach((configuration) => {
            if (configuration.id in this.configurationItems) {
                this.configurationItems[configuration.id].setAttribute('configuration', JSON.stringify(configuration))
            } else {
                const configurationItem = document.createElement('configuration-item')
                configurationItem.setAttribute('configuration', JSON.stringify(configuration))
                configurationItem.setAttribute('key', configuration.id.toString())
                configurationItem.addEventListener('click-edit', this.handleEditClick.bind(this))
                this.listElement.appendChild(configurationItem)

                this.configurationItems[configuration.id] = configurationItem
            }
        })
    }

	attributeChangedCallback(attrName: 'configurations' | 'optionsTypes', oldVal: unknown, newVal: unknown) {
        if (attrName === 'configurations') {
            this.configurations = JSON.parse(newVal as string)
            this.updateDOM()
        }
	}
}
