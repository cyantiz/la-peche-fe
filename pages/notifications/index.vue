<script setup lang="ts">
import { useLoadingBar } from 'naive-ui'
import { useNotificationStore } from '~/store/notification'
import { getDateFormalString } from '~/utils/dateTime'
defineProps<{}>()

const loadingBar = useLoadingBar()
onMounted(() => {
    if (!process.client) return
    setTimeout(() => loadingBar.finish(), 1)
})
const notificationStore = useNotificationStore()
</script>

<template>
    <div class="flex w-full flex-col items-center justify-center gap-2 px-2">
        <div
            v-for="noti in notificationStore.myNotifications"
            :key="noti.id"
            class="flex w-full items-center gap-2"
        >
            <div
                class="flex w-full cursor-pointer items-center gap-3 rounded p-2 hover:bg-blue-50"
            >
                <div
                    v-if="noti.status === 'UNREAD'"
                    class="notification-dot bg-theme h-1.5 w-1.5 rounded-full"
                ></div>
                <div v-else class="h-1.5 w-1.5"></div>

                <div class="flex w-full flex-col items-stretch">
                    <span class="text-start text-base font-semibold">
                        {{ noti.text }}
                    </span>
                    <div class="flex justify-between text-xs">
                        <span>
                            {{ getDateFormalString(new Date(noti.createdAt)) }}
                        </span>
                        <span>
                            {{
                                new Date(noti.createdAt).toLocaleDateString(
                                    'en-US',
                                    {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    }
                                )
                            }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped></style>
