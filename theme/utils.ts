import { ThemeOption } from './config'
import BitterSweetTheme from './naive-ui-global-override/BitterSweetTheme'
import OceanTheme from './naive-ui-global-override/OceanTheme'

export const getTheme = (theme: ThemeOption) => {
    switch (theme) {
        case ThemeOption.Ocean:
            return OceanTheme
        case ThemeOption.BitterSweet:
            return BitterSweetTheme
        default:
            return BitterSweetTheme
    }
}
