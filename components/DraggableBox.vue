<script setup lang="ts">
const el = ref<HTMLElement | null>(null)

const { x, y, style, isDragging } = useDraggable(el, {
    initialValue: { x: 300, y: 300 },
})
</script>

<template>
    <div
        ref="el"
        :style="style"
        class="fixed bg-white border-2 border-black p-3 w-96 flex flex-col items-center rounded-md cursor-move select-none"
    >
        <div>👋 Drag me!</div>
        <div>I am at {{ x }}, {{ y }}</div>
        <div>{{ isDragging ? 'Dragging' : 'Not dragging' }}</div>
    </div>
</template>

<style lang="less" scoped></style>
