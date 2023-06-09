<script setup lang="ts">
defineProps<{
    text: string
    link: string
}>()
</script>

<template>
    <NuxtLink :href="link" class="w-full">
        <div
            class="hover:bg-theme flex flex-col gap-1 rounded-lg bg-white px-4 py-2 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:text-white"
        >
            <slot name="icon"></slot>
            <p class="text-base font-bold">{{ text }}</p>
        </div>
    </NuxtLink>
</template>

<style lang="less" scoped></style>
