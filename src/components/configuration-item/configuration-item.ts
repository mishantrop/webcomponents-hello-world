import { Configuration } from '../../../common/types/Configuration'

import { getStyle } from './configuration-item.style'

const template = document.createElement('template')
template.innerHTML = `
    <div class="item">
        <div class="header" id="header">
            <div>
                #<span id="id"></span> <span id="name"></span>
            </div>
            <div>
                <button id="edit-button" class="button button--type-secondary">Edit Configuration</button>
                <button id="expand-toggler" class="button button--type-secondary">Hide/Show Details</button>
            </div>
        </div>
        <div class="options" id="options"></div>
    </div>
`

export class ConfigurationItem extends HTMLElement {
    configuration: Configuration
    isOpened = false

    static get observedAttributes() {
        return ['configuration', 'opened'];
    }

    state: {
        configuration: Configuration;
        isOpened: boolean;
    } = {
        isOpened: true,
        configuration: undefined,
    }

    setState(patch: Partial<typeof this.state>) {
        this.state = { ...this.state, ...patch }
        this.updateDOM()
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
        this.dispatchEvent(new CustomEvent(this.isOpened ? 'open' : 'close', {
            detail: this.configuration.id,
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
        if (!this.shadowRoot) {
            return
        }

        this.shadowRoot.innerHTML = ''
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.updateDOM()

        this.setupStyles()
        this.addEventListeners()
    }

    updateDOM() {
        this.shadowRoot.querySelector('#id').innerHTML = this.configuration.id.toString()
        this.shadowRoot.querySelector('#name').innerHTML = this.configuration.name

        const children = this.shadowRoot.querySelector('#options')

        this.configuration.options.forEach((option) => {
            const optionItem = document.createElement('configuration-option')
            optionItem.setAttribute('option', JSON.stringify(option))
            children.appendChild(optionItem)
        })

        this.shadowRoot.getElementById('expand-toggler').innerHTML = this.isOpened ? 'Hide Details' : 'Show Details'
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
	attributeChangedCallback(attrName: string, oldVal?: string, newVal?: string) {
        if (attrName === 'configuration') {
            this.configuration = JSON.parse(newVal)
            this.render()
        } else if (attrName === 'opened') {
            this.isOpened = newVal === 'true'
            this.render()
        }
    }
}
