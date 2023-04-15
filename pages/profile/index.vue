<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
defineProps<{}>()

const { user } = useAuthStore()

// test asyncData
const { data, pending, error } = await useAsyncData<UserInformation>(
    async () => {
        // fake loading 1000ms
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(this)
            }, 1000)
        })
        return useApiGet<UserInformation>(`/users/info/${user.username}`)
    }
)
</script>

<template>
    <div v-if="error">
        <h1>Error</h1>
        <p>{{ error }}</p>
    </div>

    <div v-else-if="pending">
        <h1>Loading...</h1>
    </div>

    <div v-else>
        <h1>Success</h1>
        <p>{{ data }}</p>
    </div>
</template>

<style lang="less" scoped></style>
