<script setup lang="ts">
import { useAuthStore } from '~/store/auth'
useHead({
    title: 'Explore',
})
definePageMeta({
    layout: 'default',
    collapsed: true,
})

const auth = useAuthStore()
const user = computed(() => auth.user)
</script>

<template>
    <div v-if="auth.loading">auth loading</div>
    <div v-else>
        logged with user: {{ user }}
        <button @click="auth.logout">logout</button>
    </div>
</template>

<style lang="less" scoped></style>
