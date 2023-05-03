<script setup lang="ts">
import {
    NConfigProvider,
    NLoadingBarProvider,
    NDialogProvider,
    NNotificationProvider,
} from 'naive-ui'
import BitterSweet from './naive-ui-global-override/BitterSweetTheme'
import OceanTheme from './naive-ui-global-override/OceanTheme'
import { ThemeOption } from './config'
import { useUIStore } from '~/store/ui'

const UI = useUIStore()

const theme = useColorMode({
    attribute: 'theme',
    modes: ThemeOption,
})

const themeOverride = computed(() => {
    switch (theme.value) {
        case ThemeOption.Ocean:
            return OceanTheme
        case ThemeOption.BitterSweet:
            return BitterSweet
        default:
            return BitterSweet
    }
})
</script>

<template>
    <NConfigProvider :theme-overrides="themeOverride">
        <NDialogProvider>
            <NLoadingBarProvider>
                <NNotificationProvider :placement="UI.notificationPlacement">
                    <slot />
                </NNotificationProvider>
            </NLoadingBarProvider>
        </NDialogProvider>
    </NConfigProvider>
</template>
