<script setup lang="ts">
import { PhBellSimple, PhDotsNine, PhChatCenteredDots } from 'phosphor-vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import Navbar from './Navbar/index.vue'

const breakPoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakPoints.smallerOrEqual('md')
</script>

<template>
    <header class="flex w-full flex-col shadow-md">
        <div class="flex w-full justify-between px-8 py-1">
            <Logo size="sm" is-with-text />
            <div v-if="!isMobile" class="navbar-right--desktop flex gap-9">
                <div class="flex gap-4">
                    <HeaderItem size="small" shape="circle">
                        <template #icon="{ size, color }">
                            <PhBellSimple
                                :size="size"
                                :color="color"
                                weight="bold"
                            />
                        </template>
                    </HeaderItem>
                    <HeaderItem size="small" shape="circle">
                        <template #icon="{ size, color }">
                            <PhDotsNine
                                :size="size"
                                :color="color"
                                weight="bold"
                            />
                        </template>
                    </HeaderItem>
                </div>
                <div class="divider my-2 w-[1px] bg-[#d3d3d3]"></div>
                <Avatar
                    src="https://i1-giaitri.vnecdn.net/2013/04/06/cobain00-jpg-1365215535.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=N1btuexChzpWLU0036GHsg"
                    :size="40"
                    circle
                />
            </div>
            <div v-if="isMobile" class="navbar-right--mobile">
                <HeaderItem
                    size="small"
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
    </header>
</template>

<style lang="less" scoped></style>
