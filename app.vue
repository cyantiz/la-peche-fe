<script lang="ts" setup>
import { NLoadingBarProvider, NDialogProvider } from 'naive-ui'
import ThemeProvider from './theme/index.vue'
defineProps<{}>()
</script>
<template>
    <ThemeProvider>
        <NDialogProvider>
            <NLoadingBarProvider>
                <NuxtLayout>
                    <NuxtPage />
                </NuxtLayout>
            </NLoadingBarProvider>
        </NDialogProvider>
    </ThemeProvider>
</template>
