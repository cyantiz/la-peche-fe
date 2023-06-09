<script setup lang="ts">
import { NSpin, NResult } from 'naive-ui'
import { useAuthStore } from '~/store/auth'

defineProps<{
    messages: IMessage[]
    chatUserInfo: IChatUserInfo
    pending: boolean
}>()

const auth = useAuthStore()
</script>

<template>
    <div v-if="pending" class="flex h-full w-full items-center justify-center">
        <NSpin />
    </div>
    <div v-else class="flex h-full w-full flex-col justify-between gap-2">
        <div v-if="chatUserInfo" class="flex items-center gap-2">
            <Avatar :src="chatUserInfo.avatar" :size="48" />
            <p>{{ chatUserInfo.name }}</p>
        </div>
        <div
            v-if="!messages.length"
            class="flex h-full w-full items-center justify-center"
        >
            <NResult status="404" title="No messages yet" />
        </div>
        <div class="h-full w-full overflow-y-auto">
            <ChatBoxMessage
                v-for="message in messages"
                :key="message.createdAt.seconds"
                :text="message.text"
                :self="message.sender === auth.user.id"
            >
            </ChatBoxMessage>
        </div>
        <ChatMessageInput />
    </div>
</template>

<style lang="less" scoped></style>
