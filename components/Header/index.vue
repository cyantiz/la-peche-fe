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
    <header class="z-10 flex w-full flex-col px-4 pt-2">
        <div
            class="neu-border-2 neu-shadow-lb-4 bg-theme-dim flex w-full flex-col gap-1 rounded-lg px-4 py-1.5"
        >
            <div class="flex h-full w-full justify-between">
                <Logo size="sm" is-with-text />
                <div v-if="!isMobile" class="header-right--desktop flex gap-9">
                    <div class="flex items-center gap-4">
                        <HeaderItemTriggerMenuButton
                            size="small"
                            shape="rounded-square"
                        >
                            <template #icon="{ size }">
                                <PhBellSimple :size="size" weight="bold" />
                            </template>

                            <template #menu>
                                <NotificationMenu />
                            </template>
                        </HeaderItemTriggerMenuButton>

                        <HeaderItemTriggerMenuButton
                            size="small"
                            shape="rounded-square"
                        >
                            <template #icon="{ size }">
                                <PhPaintBrushBroad :size="size" weight="bold" />
                            </template>

                            <template #menu>
                                <ThemeOptionMenu />
                            </template>
                        </HeaderItemTriggerMenuButton>
                    </div>
                    <div class="divider my-2 w-[2px] rounded-xl bg-black"></div>
                    <button
                        class="neu-border-2 neu-shadow-lb-2 focus:neu-shadow-0 flex overflow-hidden rounded-xl p-0 transition-all duration-200 focus:-translate-x-[1px] focus:translate-y-[1px]"
                    >
                        <Avatar
                            src="https://i1-giaitri.vnecdn.net/2013/04/06/cobain00-jpg-1365215535.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=N1btuexChzpWLU0036GHsg"
                            :size="40"
                        />
                    </button>
                </div>
                <div v-if="isMobile" class="header-right--mobile">
                    <HeaderItem
                        size="tiny"
                        shape="rounded-square"
                        @click="$router.push({ name: 'Messages' })"
                    >
                        <template #icon="{ size, color }">
                            <PhChatCenteredDots
                                :size="size"
                                :color="color"
                                weight="bold"
                            />
                        </template>
                    </HeaderItem>
                </div>
            </div>
            <Navbar v-if="isMobile" />
        </div>
    </header>
</template>

<style lang="less" scoped></style>
