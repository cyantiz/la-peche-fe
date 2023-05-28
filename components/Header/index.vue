<script setup lang="ts">
import {
    PhBellSimple,
    PhPaintBrushBroad,
    PhChatCenteredDots,
} from 'phosphor-vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import Navbar from './Navbar/index.vue'
import ThemeOptionMenu from './HeaderItemMenu/ThemeOptionMenu.vue'
import NotificationMenu from './HeaderItemMenu/NotificationMenu.vue'

const breakPoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakPoints.smallerOrEqual('md')
</script>

<template>
    <header
        class="z-[100] mx-auto flex w-full max-w-[1920px] flex-col md:px-4 md:pt-2"
    >
        <div
            class="layout-org flex w-full flex-col gap-1 rounded-lg bg-white px-4 py-2"
        >
            <div class="flex h-full w-full justify-between">
                <Logo size="sm" is-with-text />

                <div v-if="!isMobile" class="header-right--desktop flex gap-9">
                    <div class="flex items-center gap-4">
                        <HeaderItemTriggerMenuButton size="small">
                            <template #button>
                                <PhBellSimple :size="18" weight="bold" />
                            </template>
                            <template #menu>
                                <NotificationMenu />
                            </template>
                        </HeaderItemTriggerMenuButton>

                        <HeaderItemTriggerMenuButton>
                            <template #button>
                                <PhPaintBrushBroad :size="18" weight="bold" />
                            </template>
                            <template #menu>
                                <ThemeOptionMenu />
                            </template>
                        </HeaderItemTriggerMenuButton>
                        <div
                            class="divider mx-4 h-3/4 w-[2px] rounded-xl bg-black"
                        ></div>
                        <HeaderItemTriggerMenuButton>
                            <template #button>
                                <div class="flex overflow-hidden">
                                    <Avatar :size="40" />
                                </div>
                            </template>
                            <template #menu>
                                <HeaderAvatarMenu />
                            </template>
                        </HeaderItemTriggerMenuButton>
                    </div>
                </div>

                <div v-if="isMobile" class="header-right--mobile">
                    <HeaderItem
                        size="tiny"
                        shape="rounded-square"
                        @click="$router.push({ name: 'Messages' })"
                    >
                        <template #button>
                            <PhChatCenteredDots :size="18" weight="bold" />
                        </template>
                    </HeaderItem>
                </div>
            </div>

            <Navbar v-if="isMobile" />
        </div>
    </header>
</template>

<style lang="less" scoped>
.custom-shadow {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
