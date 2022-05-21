/* eslint-disable no-console */
import { Configuration } from '../../../common/types/Configuration'

import { getStyle } from './configuration-item.style'

const template = document.createElement('template')
template.innerHTML = `
    <div class="item">
        <div class="header" id="header">
            #<slot name="id"></slot> <slot name="name"></slot>
            <div>
                <button id="edit-button" class="button button--type-secondary">Edit Configuration</button>
                <button id="expand-toggler" class="button button--type-secondary">Hide/Show Details</button>
            </div>
        </div>
        <div class="options">
            <slot name="children"></slot>
        </div>
    </div>
`

export class ConfigurationItem extends HTMLElement {
    configuration: Configuration
    isOpened = false

    static get observedAttributes() {
        return ['opened'];
    }

    connectedCallback(): void {
        this.attachShadow({ mode: 'open' })
        this.configuration = JSON.parse(this.getAttribute('configuration'))
        this.isOpened = this.getAttribute('opened') === 'true'

        this.render()
    }

    handleClickEdit() {
        this.dispatchEvent(new CustomEvent('click-edit', {
            detail: this.configuration,
            composed: true,
        }))
        if (!this.isOpened) {
            this.handleClickVisibility()
        }
    }

    handleClickVisibility() {
        this.isOpened = !this.isOpened
        this.dispatchEvent(new CustomEvent('toggle-visibility', {
            detail: { id: this.configuration.id, opened: this.isOpened },
            composed: true,
        }))
        this.render()
    }

    addEventListeners(): void {
        this.shadowRoot.getElementById('edit-button').addEventListener('click', this.handleClickEdit.bind(this))
        this.shadowRoot.getElementById('expand-toggler').addEventListener('click', this.handleClickVisibility.bind(this))
    }

    setupStyles(): void {
        const styleTag = document.createElement('style')
        styleTag.textContent = getStyle({
            isOpened: this.isOpened,
        })
        this.shadowRoot.appendChild(styleTag)
    }

    render(): void {
        this.shadowRoot.innerHTML = ''
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.shadowRoot.querySelector('slot[name="id"]').innerHTML = this.configuration.id.toString()
        this.shadowRoot.querySelector('slot[name="name"]').innerHTML = this.configuration.name

        const children = this.shadowRoot.querySelector('slot[name="children"]')

        this.configuration.options.forEach((option) => {
            const optionItem = document.createElement('configuration-option')
            optionItem.setAttribute('option', JSON.stringify(option))
            optionItem.addEventListener('change', (event: CustomEvent) => {
                // eslint-disable-next-line no-console
                console.log(event)
            })
            children.appendChild(optionItem)
        })

        this.shadowRoot.getElementById('expand-toggler').innerHTML = this.isOpened ? 'Hide Details' : 'Show Details'

        this.setupStyles()
        this.addEventListeners()
    }

	attachedCallback() {

	}

	attributeChangedCallback(attrName: unknown, oldVal: unknown, newVal: unknown) {
        // eslint-disable-next-line no-console
        console.log('attributeChangedCallback')
        // eslint-disable-next-line no-console
        console.log(attrName, oldVal, newVal)
	}
}
