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
        fontFamily: 'Whyte, Roboto, sans-serif',
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
        color: Color.RaisinBlack,
        colorHover: Color.RaisinBlack,
        colorPressed: Color.RaisinBlack,
        colorFocus: Color.RaisinBlack,
        textColor: Color.AlmostWhite,
        textColorHover: Color.AlmostWhite,
        textColorFocus: Color.AlmostWhite,
        textColorPressed: Color.AlmostWhite,
        border: '3px solid black',
        borderHover: '3px solid black',
        borderPressed: '3px solid black',
        borderFocus: '3px solid black',

        textColorGhost: Color.RaisinBlack,
        textColorGhostHover: Color.RaisinBlack,
        textColorGhostFocus: Color.RaisinBlack,
        textColorGhostPressed: Color.RaisinBlack,

        colorDisabled: Color.RaisinBlack,
        textColorDisabled: Color.AlmostWhite,
        opacityDisabled: '0.9',

        colorPrimary: Color.Ocean,
        colorHoverPrimary: Color.Ocean,
        colorPressedPrimary: Color.OceanHover,
        colorFocusPrimary: Color.Ocean,

        colorInfo: Color.Ocean,
        colorHoverInfo: Color.Ocean,
        colorPressedInfo: Color.OceanHover,
        colorFocusInfo: Color.Ocean,

        colorSuccess: Color.GreenApple,
        colorHoverSuccess: Color.GreenApple,
        colorPressedSuccess: Color.GreenApple,
        colorFocusSuccess: Color.GreenApple,

        heightLarge: '48px',
        fontSizeLarge: '1.125rem',
        paddingLarge: '0 20px',
        borderRadiusLarge: '10px',

        heightMedium: '40px',
        paddingMedium: '0 16px',
        fontSizeMedium: '1rem',
        borderRadiusMedium: '8px',

        heightSmall: '32px',
        fontSizeSmall: '0.875rem',
        paddingSmall: '0 12px',
        borderRadiusSmall: '6px',

        heightTiny: '24px',
        fontSizeTiny: '0.75rem',
        paddingTiny: '0 8px',
        borderRadiusTiny: '4px',

        fontWeight: '700',
    },

    Form: {
        feedbackFontSizeLarge: '1rem',
        feedbackFontSizeMedium: '0.925rem',
        feedbackFontSizeSmall: '0.875rem',
    },

    Input: {
        borderRadius: '5px',

        heightLarge: '50px',
        paddingLarge: '0 6px 0 12px',
        fontSizeLarge: '1rem',

        heightMedium: '40px',
        fontSizeMedium: '0.925rem',

        heightSmall: '32px',
        fontSizeSmall: '0.875rem',

        heightTiny: '24px',
        fontSizeTiny: '0.75rem',

        border: '3px solid #000000',
        borderHover: '3px solid ' + Color.Ocean,
        borderFocus: '3px solid ' + Color.Ocean,
        borderError: '3px solid ' + Color.Cherry,
        borderHoverError: '3px solid ' + Color.Cherry,
        borderFocusError: '3px solid ' + Color.Cherry,
        borderDisabled: '3px solid ' + Color.Inactive,
        borderWarning: '3px solid ' + Color.GreenApple,
        borderHoverWarning: '3px solid ' + Color.GreenApple,
        borderFocusWarning: '3px solid ' + Color.GreenApple,
    },
    Alert: {
        border: '2px solid ' + Color.Ocean,
        borderInfo: '2px solid ' + Color.GreenApple,
        iconColorInfo: Color.GreenApple,
        borderWarning: '2px solid ' + Color.GoldMetallic,
        borderError: '2px solid ' + Color.Cherry,
    },
    Dialog: {
        borderRadius: '16px',
        closeColorHover: 'rgba(0, 0, 0, 0)',
    },
    Modal: {},
}

export default themeOceanOverrides
