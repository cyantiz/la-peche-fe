<script setup lang="ts">
import { useLoadingBar } from 'naive-ui'
import { useAuthStore } from '~/store/auth'

defineProps<{}>()

const loadingBar = useLoadingBar()
const fireStore = useFirestore()
const auth = useAuthStore()

const userChats = ref<Record<string, IUserChat> | undefined>(undefined)
const currentChatId = ref<string>('')
const currentChatMessages = ref<IChat | undefined>(undefined)
const loadingMessages = ref<boolean>(false)

onMounted(() => {
    if (!process.client) return
    setTimeout(() => loadingBar.finish(), 1)

    const docRef = fireStore.doc('userChats', auth.user.id.toString())

    const unsubscribe = fireStore.onSnapShot<Record<string, IUserChat>>(
        docRef,
        (doc) => {
            console.log(doc.data())
            userChats.value = doc.data()
        }
    )

    onUnmounted(() => {
        unsubscribe()
    })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const sendMsg = (msg: string) => {
    // send msg
}

let unsubscribeChat = () => {}

watch(
    () => currentChatId.value,
    (newVal) => {
        loadingMessages.value = true
        console.log(loadingMessages.value)
        if (!userChats.value) return
        if (unsubscribeChat) unsubscribeChat()

        unsubscribeChat = fireStore.onSnapShot<IChat>(
            userChats.value[newVal].messages,
            (doc) => {
                loadingMessages.value = false
                console.log(loadingMessages.value)
                console.log('Current messages: ', doc.data())
                currentChatMessages.value = doc.data()
            }
        )
    }
)
</script>

<template>
    <ClientOnly>
        <div v-if="!userChats">loading</div>
        <div v-else class="flex h-full gap-2">
            <ChatList
                :user-chats="userChats"
                :current-chat-id="currentChatId"
                @select-chat="currentChatId = $event"
            />
            <div class="h-full w-0.5 bg-gray-200"></div>
            <ChatBox
                v-if="currentChatMessages"
                :pending="loadingMessages"
                :chat-user-info="userChats[currentChatId].userInfo"
                :messages="currentChatMessages?.messages"
            />
            <div
                v-else
                class="flex h-full w-full items-center justify-center text-lg font-bold text-inactive"
            >
                Select a chat or start a new conversation
            </div>
        </div>
    </ClientOnly>
</template>

<style lang="less" scoped></style>
