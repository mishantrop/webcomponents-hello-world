import type { OptionType } from './OptionType'
import type { OptionTypeCheckbox, OptionTypeText, OptionTypeSelect } from './OptionType'
import { Variant } from './Variant'

export interface Option<T extends OptionTypeCheckbox | OptionTypeText | OptionTypeSelect> {
    type?: T;
    typeId: OptionType['id'];
    value: T["defaultValue"];
    variants?: T extends OptionTypeSelect ? Variant[] : never;
}
