import { GlobalThemeOverrides } from 'naive-ui'
import { Color } from './color'

const themeOverrides: GlobalThemeOverrides = {
    common: {
        baseColor: Color.AlmostWhite,
        textColorBase: Color.RaisinBlack,
        primaryColor: Color.BitterSweet,
        primaryColorHover: Color.BitterSweetHover,
        primaryColorPressed: Color.BitterSweetPressed,
        primaryColorSuppl: Color.BitterSweetHover,
        textColor1: Color.RaisinBlack,
        textColor2: Color.RaisinBlack,
        textColor3: Color.RaisinBlack,
        fontFamily: 'Roboto, sans-serif',
        borderRadius: '8px',
    },
}

export default themeOverrides
