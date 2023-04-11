<!-- This is a full-screen-white-background-with-logo curtain to hide the incomplete layout loading  -->
<script setup lang="ts">
defineProps<{
    show: boolean
}>()
</script>

<template>
    <div
        class="curtain fixed left-0 top-0 z-[999] flex h-full w-full items-center justify-center bg-white transition-all"
        :style="{
            visibility: show ? 'visible' : 'hidden',
            opacity: show ? 1 : 0,
        }"
    >
        <Logo size="lg" is-with-text :can-navigate="false" />
    </div>
</template>

<style lang="less" scoped></style>
