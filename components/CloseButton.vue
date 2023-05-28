<script setup lang="ts">
defineEmits(['click'])
</script>

<template>
    <div
        class="flex h-6 w-6 cursor-pointer items-center justify-center rounded transition hover:bg-[#e8e8e8] md:hidden"
        @click="$emit('click')"
    >
        <PhX weight="bold" :size="18" />
    </div>
</template>

<style lang="less" scoped></style>
