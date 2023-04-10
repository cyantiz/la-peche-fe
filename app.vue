<script lang="ts" setup>
import ThemeProvider from './theme/index.vue'
defineProps<{}>()
</script>
<template>
    <theme-provider>
        <nuxt-layout>
            <nuxt-page />
        </nuxt-layout>
    </theme-provider>
</template>
