<script setup lang="ts">
defineProps<{}>()
definePageMeta({
    layout: 'default',
})

const route = useRoute()
const { id } = route.params
</script>

<template>
    <div>id: {{ id }}</div>
    <div>route name: {{ route.name }}</div>
</template>

<style lang="less" scoped></style>
