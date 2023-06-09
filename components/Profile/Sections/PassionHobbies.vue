<script setup lang="ts">
// import BaseProfileSectionTable from './base/BaseProfileSectionTable.vue'
// import { NTag } from 'naive-ui'

defineProps<{
    tags: string[]
}>()
</script>

<template>hello {{ tags }}</template>

<style lang="less" scoped></style>
