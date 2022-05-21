// import { ObjectType, Option } from './Option'
import { Option } from './Option'
import { OptionTypeCheckbox, OptionTypeText, OptionTypeSelect } from './OptionType'

export interface Configuration {
    id: number;
    name: string;
    options: Array<Option<OptionTypeCheckbox | OptionTypeText | OptionTypeSelect>>;
}
