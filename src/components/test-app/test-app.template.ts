export const template = `
    <div class="app">
        <h1 class="header">ConfigurationMagic</h1>

        <div class="container">
            <div class="column">
                <slot name="configuration-list"></slot>

                <button id="create-configuration-button" class="button button--type-primary">
                    + New Configuration
                </button>

                <button id="create-optiontype-button" type="button" class="button button--type-secondary">
                    + New Configuration Option
                </button>
            </div>

            <div class="column" id="configuration-form-wrapper">
                <slot name="configuration-form"></slot>
            </div>

            <div class="column" id="configuration-optiontype-form-wrapper">
                <slot name="configuration-optiontype-form"></slot>
            </div>
        </div>
    </div>
`
