import { TestApp } from './src/components/test-app/test-app'
import { ConfigurationForm } from './src/components/configuration-form/configuration-form'
import { ConfigurationFormOptionCheckbox } from './src/components/configuration-form-option-checkbox/configuration-form-option-checkbox'
import { ConfigurationFormOptionSelect } from './src/components/configuration-form-option-select/configuration-form-option-select'
import { ConfigurationFormOptionText } from './src/components/configuration-form-option-text/configuration-form-option-text'
import { ConfigurationItem } from './src/components/configuration-item/configuration-item'
import { ConfigurationList } from './src/components/configuration-list/configuration-list'
import { ConfigurationOption } from './src/components/configuration-option/configuration-option'
import { ConfigurationOptionTypeForm } from './src/components/configuration-optiontype-form/configuration-optiontype-form'

import './style.scss'

try {
    customElements.define('test-app', TestApp)
    customElements.define('configuration-form-option-checkbox', ConfigurationFormOptionCheckbox)
    customElements.define('configuration-form-option-select', ConfigurationFormOptionSelect)
    customElements.define('configuration-form-option-text', ConfigurationFormOptionText)
    customElements.define('configuration-form', ConfigurationForm)
    customElements.define('configuration-item', ConfigurationItem)
    customElements.define('configuration-list', ConfigurationList)
    customElements.define('configuration-option', ConfigurationOption)
    customElements.define('configuration-optiontype-form', ConfigurationOptionTypeForm)
} catch (err) {
    // eslint-disable-next-line no-console
    console.warn(err)

    const h2 = document.createElement('h2')
    h2.innerText = 'This browser doesnt supports web components'
    document.body.appendChild(h2)
}
