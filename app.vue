<script lang="ts" setup>
import { ThemeOption } from './theme/config'
import ThemeProvider from './theme/index.vue'
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
