import type { OptionType } from './OptionType'
import type { OptionTypeCheckbox, OptionTypeText, OptionTypeSelect } from './OptionType'
import { Variant } from './Variant'

// type ParameterMap = {
//     'checkbox': OptionTypeCheckbox["value"];
//     'text': OptionTypeText["value"];
//     'select': OptionTypeSelect["value"];
// }

// export type ObjectType = keyof ParameterMap

// export interface Option<T extends ObjectType> {
//     type?: OptionTypeCheckbox | OptionTypeText | OptionTypeSelect;
//     typeId: OptionType['id'];
//     value: ParameterMap[T];
//     variants?: T extends OptionTypeSelect ? Variant[] : never;
// }

export interface Option<T extends OptionTypeCheckbox | OptionTypeText | OptionTypeSelect> {
    type?: T;
    typeId: OptionType['id'];
    value: T["defaultValue"];
    variants?: T extends OptionTypeSelect ? Variant[] : never;
}
