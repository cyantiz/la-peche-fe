import { GlobalThemeOverrides } from 'naive-ui'
import { Color } from '../config'

const themeOceanOverrides: GlobalThemeOverrides = {
    common: {
        baseColor: Color.AlmostWhite,
        textColorBase: Color.RaisinBlack,
        primaryColor: Color.Ocean,
        primaryColorHover: Color.OceanHover,
        primaryColorPressed: Color.OceanPressed,
        primaryColorSuppl: Color.OceanHover,
        textColor1: Color.RaisinBlack,
        textColor2: Color.RaisinBlack,
        textColor3: Color.RaisinBlack,
        fontFamily: 'Roboto, sans-serif',
        borderRadius: '4px',

        infoColor: Color.Ocean,
        errorColor: Color.Cherry,
    },
    LoadingBar: {
        height: '3px',
    },
    Menu: {
        itemColorActive: Color.Ocean,
        itemColorActiveHover: Color.Ocean,
        itemColorActiveCollapsed: Color.Ocean,
        itemIconColorActive: Color.AlmostWhite,
        itemIconColorActiveHover: Color.AlmostWhite,
        itemTextColorActive: Color.AlmostWhite,
        itemTextColorActiveHover: Color.AlmostWhite,
        itemColorHover: Color.AlmostWhite,
    },
    Button: {
        border: '2px solid #000000',
        borderHover: '2px solid #000000',
        borderPressed: '2px solid #000000',
        borderFocus: '2px solid #000000',
        borderDisabled: '2px solid #000000',

        // primary
        borderPrimary: '2px solid #000000',
        borderHoverPrimary: '2px solid #000000',
        borderFocusPrimary: '2px solid #000000',
        borderPressedPrimary: '2px solid #000000',
        borderDisabledPrimary: '2px solid #000000',

        // success
        borderSuccess: '2px solid #000000',
        borderHoverSuccess: '2px solid #000000',
        borderFocusSuccess: '2px solid #000000',
        borderPressedSuccess: '2px solid #000000',
        borderDisabledSuccess: '2px solid #000000',

        // error
        borderError: '2px solid #000000',
        borderHoverError: '2px solid #000000',
        borderFocusError: '2px solid #000000',
        borderPressedError: '2px solid #000000',
        borderDisabledError: '2px solid #000000',

        // warning
        borderWarning: '2px solid #000000',
        borderHoverWarning: '2px solid #000000',
        borderFocusWarning: '2px solid #000000',
        borderPressedWarning: '2px solid #000000',
        borderDisabledWarning: '2px solid #000000',

        // info
        borderInfo: '2px solid #000000',
        borderHoverInfo: '2px solid #000000',
        borderFocusInfo: '2px solid #000000',
        borderPressedInfo: '2px solid #000000',
        borderDisabledInfo: '2px solid #000000',

        // border radius:
        // ...
    },
    Input: {
        border: '2px solid #000000',
        borderHover: '2px solid ' + Color.Ocean,
        borderFocus: '2px solid ' + Color.Ocean,
        borderError: '2px solid ' + Color.Cherry,
        borderHoverError: '2px solid ' + Color.Cherry,
        borderFocusError: '2px solid ' + Color.Cherry,
        borderDisabled: '2px solid ' + Color.Inactive,
        borderWarning: '2px solid ' + Color.YellowGreenCrayola,
        borderHoverWarning: '2px solid ' + Color.YellowGreenCrayola,
        borderFocusWarning: '2px solid ' + Color.YellowGreenCrayola,

        boxShadowFocusError: '2px -2px 0 0 ' + Color.Cherry,
        boxShadowFocusWarning: '2px -2px 0 0 ' + Color.YellowGreenCrayola,
        boxShadowFocus: '2px -2px 0 0 ' + Color.Ocean,
    },
    Dialog: {
        borderRadius: '16px',
        closeColorHover: 'rgba(0, 0, 0, 0)',
    },
    Alert: {
        border: '2px solid ' + Color.Ocean,
        borderInfo: '2px solid ' + Color.Ocean,
    },
}

export default themeOceanOverrides
