<script setup lang="ts">
import {
    NConfigProvider,
    NLoadingBarProvider,
    NDialogProvider,
    NNotificationProvider,
} from 'naive-ui'
import lightConfig from './lightConfig'
import { useUIStore } from '~/store/ui'

const UI = useUIStore()
</script>

<template>
    <NConfigProvider :theme-overrides="lightConfig">
        <NDialogProvider>
            <NLoadingBarProvider>
                <NNotificationProvider :placement="UI.notificationPlacement">
                    <slot />
                </NNotificationProvider>
            </NLoadingBarProvider>
        </NDialogProvider>
    </NConfigProvider>
</template>
