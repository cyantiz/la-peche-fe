<script setup lang="ts">
import { NuxtLinkProps } from 'nuxt/app'
interface Props extends NuxtLinkProps {}

const props = defineProps<Props>()
</script>

<template>
    <NuxtLink
        v-bind="props"
        class="neu-shadow-0 group flex w-full rounded-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white"
    >
        <div
            class="flex w-full justify-center rounded-lg py-2 group-hover:bg-raisin-black group-hover:bg-opacity-5"
        >
            <slot name="icon" :size="20"></slot>
        </div>
    </NuxtLink>
</template>

<style lang="less" scoped>
@import url('~/assets/css/neu_brutalism.less');

a.router-link-active.router-link-exact-active {
    @apply text-white;
    background: var(--theme-primary-color);
}
</style>
