<script setup lang="ts">
import { NuxtLinkProps } from 'nuxt/app'
interface Props extends NuxtLinkProps {}

const props = defineProps<Props>()
</script>

<template>
    <NuxtLink
        v-bind="props"
        class="neu-border-2 hover:neu-shadow-lb-2 neu-shadow-0 group flex w-full rounded-md transition-all duration-200 hover:-translate-y-[1px] hover:translate-x-[1px] hover:bg-white"
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
    transform: translateY(-1px) translateX(1px) !important;
    .neu-shadow-lb-2;
}
</style>
