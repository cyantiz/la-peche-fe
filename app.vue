<script lang="ts" setup>
import { useAreaStore } from './store/area'
import { ThemeOption } from './theme/config'
import ThemeProvider from './theme/ThemeProvider.vue'
defineProps<{}>()

const area = useAreaStore()

if (process.client) {
    area.init()
}

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
