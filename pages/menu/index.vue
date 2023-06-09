<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import { NButton, useLoadingBar } from 'naive-ui'
import {
    PhChatCenteredDots,
    PhHeart,
    PhMagnifyingGlass,
    PhSignOut,
    PhStar,
} from 'phosphor-vue'
import { useAuthStore } from '~/store/auth'
import { useProfileStore } from '~/store/profile'

defineProps<{}>()

const loadingBar = useLoadingBar()
const auth = useAuthStore()
const profileStore = useProfileStore()
const breakpoints = useBreakpoints(breakpointsTailwind)
const router = useRouter()

const greaterThanMd = breakpoints.greater('md')

onMounted(() => {
    if (!process.client) return
    if (greaterThanMd.value) router.push('/profile')
    setTimeout(() => loadingBar.finish(), 1)
})

watch(
    () => greaterThanMd.value,
    (value) => {
        if (value) router.push('/profile')
    }
)
</script>

<template>
    <ClientOnly>
        <div
            class="flex h-full w-full flex-col justify-between bg-black bg-opacity-5 px-2 py-4"
        >
            <div class="flex flex-col gap-8">
                <div
                    class="flex cursor-pointer items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-md transition-all duration-200 hover:-translate-y-0.5"
                    @click="$router.push('/profile')"
                >
                    <Avatar
                        :size="42"
                        circle
                        :src="profileStore.myAvatar?.url"
                    />
                    <div>
                        <p class="text-base font-bold">
                            {{ auth.user?.name }}
                        </p>
                        <p>@{{ auth.user?.username }}</p>
                    </div>
                </div>
                <!-- grid 2 cols tailwind ->  -->
                <div class="grid grid-cols-1 gap-2 xs:grid-cols-2">
                    <MobileMenuItem text="Finding" link="/">
                        <template #icon>
                            <PhMagnifyingGlass :size="28" weight="duotone" />
                        </template>
                    </MobileMenuItem>
                    <MobileMenuItem text="Matches" link="/matches">
                        <template #icon>
                            <PhHeart :size="28" weight="duotone" />
                        </template>
                    </MobileMenuItem>
                    <MobileMenuItem text="Bookmarks" link="/bookmarks">
                        <template #icon>
                            <PhStar :size="28" weight="duotone" />
                        </template>
                    </MobileMenuItem>
                    <MobileMenuItem text="Messages" link="/messages">
                        <template #icon>
                            <PhChatCenteredDots :size="28" weight="duotone" />
                        </template>
                    </MobileMenuItem>
                </div>
            </div>
            <NButton>
                <template #icon>
                    <PhSignOut weight="fill" />
                </template>
                Logout</NButton
            >
        </div>
    </ClientOnly>
</template>

<style lang="less" scoped></style>
