import { Configuration } from '../../../common/types/Configuration'
import { OptionType } from '../../../common/types/OptionType'

import { getStyle } from './configuration-list.style'

const template = document.createElement('template')
template.innerHTML = `
    <div class="list">
        <slot name="children"></slot>
    </div>
`

export class ConfigurationList extends HTMLElement {
    name: string
    configurations: Array<Configuration> = []
    optionsTypes: Array<OptionType> = []

    state: {
        openedItems: Set<number>;
    } = {
        openedItems: new Set(),
    }

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

    addStyle() {
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

    handleToggleVisibilityClick(event: CustomEvent<{ id: number; opened: boolean; }>) {
        if (this.state.openedItems.has(event.detail.id)) {
            this.state.openedItems.delete(event.detail.id)
        } else {
            this.state.openedItems.add(event.detail.id)
        }
    }

    render() {
        if (!this.shadowRoot) {
            return
        }

        this.shadowRoot.innerHTML = ''
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.addStyle()

        const children = this.shadowRoot.querySelector('slot[name="children"]')

        this.configurations.forEach((configuration) => {
            const configurationItem = document.createElement('configuration-item')
            configurationItem.setAttribute('configuration', JSON.stringify(configuration))
            configurationItem.setAttribute('opened', this.state.openedItems.has(configuration.id) ? 'true' : 'false')
            configurationItem.addEventListener('click-edit', this.handleEditClick.bind(this))
            configurationItem.addEventListener('toggle-visibility', this.handleToggleVisibilityClick.bind(this))
            children.appendChild(configurationItem)
        })
    }

	attributeChangedCallback(attrName: unknown, oldVal: unknown, newVal: unknown) {
        // eslint-disable-next-line no-console
        // console.log(attrName, oldVal, newVal)
        if (attrName === 'configurations') {
            this.configurations = JSON.parse(newVal as string)
        }
        this.render()
	}
}
