<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'
import lightConfig from './lightConfig'
</script>

<template>
    <n-config-provider :theme-overrides="lightConfig">
        <slot />
    </n-config-provider>
</template>
