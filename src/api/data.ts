import { Configuration } from '../../common/types/Configuration'
import { OptionType } from '../../common/types/OptionType'

export const optionsTypes: Array<OptionType> = [
    {
        id: 1,
        type: 'text',
        name: 'Надпись на капоте',
        defaultValue: '',
    },
    {
        id: 2,
        type: 'checkbox',
        name: 'Карбон',
        defaultValue: false,
    },
    {
        id: 3,
        type: 'select',
        name: 'Движок',
        variants: [
            { value: 'V6' },
            { value: 'V8' },
            { value: 'Blink' },
            { value: 'Presto' },
        ],
        defaultValue: { value: '' },
    },
    {
        id: 4,
        type: 'text',
        name: 'Надпись на двери',
        defaultValue: '',
    },
]

export const configurations: Array<Configuration> = [
    {
        id: 1,
        name: 'Sport',
        options: [
            {
                typeId: 1,
                value: 'Хулиган',
            },
            {
                typeId: 2,
                value: true,
            },
            {
                typeId: 3,
                value: { value: 'V6' },
            },
            {
                typeId: 4,
                value: 'May laif may ruls',
            },
        ],
    },
    {
        id: 2,
        name: 'Prestige',
        options: [
            {
                typeId: 1,
                value: 'Илита',
            },
            {
                typeId: 2,
                value: false,
            },
            {
                typeId: 3,
                value: { value: 'V6' },
            },
            {
                typeId: 4,
                value: 'Зато не в кредит',
            },
        ],
    },
]
