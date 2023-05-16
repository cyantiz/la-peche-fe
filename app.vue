<script lang="ts" setup>
import { ThemeOption } from './theme/config'
import ThemeProvider from './theme/ThemeProvider.vue'
defineProps<{}>()

useColorMode({
    attribute: 'theme',
    modes: ThemeOption,
})
</script>
<template>
    <ThemeProvider>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </ThemeProvider>
</template>
