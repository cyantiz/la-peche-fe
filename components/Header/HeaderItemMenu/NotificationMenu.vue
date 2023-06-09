<script setup lang="ts">
import { useNotificationStore } from '~/store/notification'
const notificationStore = useNotificationStore()
</script>

<template>
    <div
        class="custom-shadow flex gap-2 rounded-lg border border-solid border-gray-200 bg-white p-2 text-black"
    >
        <div
            class="flex w-48 flex-col items-center justify-center gap-2 md:w-96"
        >
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
                                {{
                                    getDateFormalString(
                                        new Date(noti.createdAt)
                                    )
                                }}
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
    </div>
</template>

<style lang="less" scoped></style>
