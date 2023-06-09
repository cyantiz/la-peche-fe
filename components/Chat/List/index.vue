<script setup lang="ts">
defineProps<{
    userChats: Record<string, IUserChat>
    currentChatId: string
}>()
defineEmits(['select-chat'])
</script>

<template>
    <div class="flex flex-col gap-1">
        <div class="text-lg font-bold">Messages</div>
        <ChatListItem
            v-for="(chat, chatId) in userChats"
            :key="chatId"
            :date="chat.date"
            :user-info="chat.userInfo"
            :active="currentChatId === chatId"
            @select="() => $emit('select-chat', chatId)"
        />
    </div>
</template>

<style lang="less" scoped></style>
