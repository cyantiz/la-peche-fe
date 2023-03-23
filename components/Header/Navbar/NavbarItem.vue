<script setup lang="ts">
import { NuxtLinkProps } from 'nuxt/app'
interface Props extends NuxtLinkProps {}

const props = defineProps<Props>()
</script>

<template>
    <NuxtLink v-bind="props" class="group flex w-full py-1">
        <div
            class="flex w-full justify-center rounded-lg py-2 group-hover:bg-raisin-black group-hover:bg-opacity-5"
        >
            <slot name="icon" :size="28"></slot>
        </div>
    </NuxtLink>
</template>

<style lang="less" scoped>
a.router-link-active.router-link-exact-active {
    @apply text-bitter-sweet;
}
</style>
