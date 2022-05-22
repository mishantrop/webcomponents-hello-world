import { Variant } from './Variant'

export type InputType = 'checkbox' | 'select' | 'text'

interface OptionTypeBase {
    id?: number;
    name: string;
}

export interface OptionTypeCheckbox extends OptionTypeBase {
    defaultValue: boolean;
    type: 'checkbox';
}

export interface OptionTypeText extends OptionTypeBase {
    defaultValue: string;
    type: 'text';
}

export interface OptionTypeSelect extends OptionTypeBase {
    defaultValue: Variant;
    type: 'select';
    variants: Array<Variant>;
}

export type OptionType = OptionTypeCheckbox | OptionTypeText | OptionTypeSelect
