<script setup lang="ts">
import { NButton, NTabs, NTabPane, NImageGroup, NSpace, NImage } from 'naive-ui'
import { useCounterStore } from '~/store/counter'

const counter = useCounterStore()

const increment = () => counter.increment()
</script>

<template>
    <div class="mx-auto flex flex-col items-center">
        <div class="p-4 text-center text-3xl">
            Nuxt 3 + NaiveUI + Tailwind + Pinia
        </div>

        <n-button @click="increment">
            Count: {{ counter.$state.count }}
        </n-button>

        <!-- <draggable-box /> -->

        <div class="my-10">
            <n-image-group show-toolbar-tooltip>
                <n-space>
                    <n-image
                        width="100"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png"
                    />
                </n-space>
            </n-image-group>
        </div>
        <div class="w-96">
            <n-tabs type="segment">
                <n-tab-pane name="oasis" tab="Oasis"> Wonderwall </n-tab-pane>
                <n-tab-pane name="the beatles" tab="the Beatles">
                    Hey Jude
                </n-tab-pane>
                <n-tab-pane name="jay chou" tab="Jay Chou">
                    Qilixiang
                </n-tab-pane>
            </n-tabs>
        </div>
    </div>
</template>

<style lang="less" scoped></style>
