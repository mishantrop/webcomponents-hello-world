import { Variant } from './Variant'

export type InputType = 'checkbox' | 'select' | 'text'

// export interface OptionType {
//     defaultValue: unknown;
//     id: number;
//     name: string;
//     type: 'checkbox' | 'text' | 'select';
//     variants?: unknown;
// }

export interface OptionTypeCheckbox {
    defaultValue: boolean;
    name: string;
    type: 'checkbox';
}

export interface OptionTypeText {
    defaultValue: string;
    name: string;
    type: 'text';
}

export interface OptionTypeSelect {
    defaultValue: Variant;
    name: string;
    type: 'select';
    variants: Array<Variant>;
}

export interface OptionType {
    defaultValue: boolean | string | Variant;
    id: number;
    name: string;
    // type: OptionTypeCheckbox | OptionTypeText | OptionTypeSelect;
    type: InputType;
    variants?: Array<Variant>;
}
