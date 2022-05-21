import { Configuration } from '../../common/types/Configuration'
import { OptionType } from '../../common/types/OptionType'
import { configurations, optionsTypes } from './data'

export const fetchData = (): Promise<{ configurations: Array<Configuration>; optionsTypes: Array<OptionType>; }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                // @ts-ignore
                configurations: configurations.map((configuration) => ({
                    ...configuration,
                    options: configuration.options.map((option) => ({
                        ...option,
                        type: optionsTypes.find((optionType) => optionType.id === option.typeId),
                    })),
                })),
                optionsTypes,
            });
        }, 256);
    })
}
