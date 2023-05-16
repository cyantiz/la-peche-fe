<script setup lang="ts">
import { NButton } from 'naive-ui'
import { PhSignOut } from 'phosphor-vue'
import { useAuthStore } from '~/store/auth'

const auth = useAuthStore()
const pending = ref(false)
const logout = async () => {
    pending.value = true
    await useDelay(1000)
    auth.logout()
    await useDelay(500)
    pending.value = false
}
</script>

<template>
    <div
        class="neu-border-2 flex min-w-[192px] flex-col items-start bg-white p-4 text-black"
    >
        <div class="text-lg font-bold">
            {{ auth.user.name }}
        </div>
        <div class="text-base">@{{ auth.user.username }}</div>
        <div class="w-full cursor-pointer">
            <NButton class="mt-4" block :loading="pending" @click="logout">
                <template #icon>
                    <PhSignOut weight="fill" />
                </template>
                Sign out
            </NButton>
        </div>
    </div>
</template>

<style lang="less" scoped></style>
