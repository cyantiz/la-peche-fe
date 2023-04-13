<script lang="ts" setup>
import ThemeProvider from './theme/index.vue'
defineProps<{}>()
</script>
<template>
    <ThemeProvider>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </ThemeProvider>
</template>
