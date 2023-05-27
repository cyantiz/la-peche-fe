<script setup lang="ts">
import {
    NConfigProvider,
    NLoadingBarProvider,
    NDialogProvider,
    NNotificationProvider,
} from 'naive-ui'
import { ThemeOption } from './config'
import { getTheme } from './utils'
import { useUIStore } from '~/store/ui'

const UI = useUIStore()

const theme = useColorMode({
    attribute: 'theme',
    modes: ThemeOption,
})

const themeCookie = useCookie<ThemeOption>('theme')

const themeOverride = ref(getTheme(themeCookie.value))

// have to store theme in cookie because of ssr
watch(
    () => theme.value,
    (newTheme) => {
        themeCookie.value = newTheme as ThemeOption
        themeOverride.value = getTheme(newTheme as ThemeOption)
    }
)
</script>

<template>
    <NConfigProvider :theme-overrides="themeOverride">
        <NDialogProvider>
            <NLoadingBarProvider>
                <NNotificationProvider
                    :placement="UI.notificationPlacement"
                    :max="5"
                >
                    <slot />
                </NNotificationProvider>
            </NLoadingBarProvider>
        </NDialogProvider>
    </NConfigProvider>
</template>
