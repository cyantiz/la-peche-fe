<script setup lang="ts">
defineProps<{}>()
definePageMeta({
    layout: 'custom',
})

const { id } = useRoute().params
</script>

<template>
    <div>id: {{ id }}</div>
</template>

<style lang="less" scoped></style>
