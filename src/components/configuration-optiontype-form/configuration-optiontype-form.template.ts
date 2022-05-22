export const html = `
    <div>
        <h3>New Configuration Option</h3>
        <form>
            <label class="form-control">
                <div class="name">
                    Name
                </div>
                <div class="value">
                    <input
                        name="name"
                        value=""
                        pattern=".{2,255}"
                        required
                    />
                </div>
            </label>

            <label class="form-control">
                <div class="name">
                    Type
                </div>
                <div class="value">
                    <select name="type">
                        <option value="text">Text</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="select">Dropdown</option>
                    </select>
                </div>
            </label>

            <label class="form-control" id="variants">
                <div class="name">
                    Options
                </div>
                <div class="value">
                    <input
                        name="variants"
                        value=""
                        pattern=".{2,255}"
                    />
                </div>
            </label>

            <button id="save-button" type="submit" class="button button--type-primary">
                + Save
            </button>

            <button id="cancel-button" type="button" class="button button--type-secondary">
                Cancel
            </button>
        </form>
    </div>
`
