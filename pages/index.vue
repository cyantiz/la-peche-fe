<script setup lang="ts">
import { NButton } from 'naive-ui'
import { useCounterStore } from '~/store/counter'
defineProps<{}>()

const counter = useCounterStore()

const increment = () => counter.increment()
</script>

<template>
    <div class="mx-auto flex flex-col items-center">
        <div class="text-3xl p-4 text-center">
            Nuxt 3 + NaiveUI + Tailwind + Pinia
        </div>

        <n-button @click="increment">
            Count: {{ counter.$state.count }}
        </n-button>

        <draggable-box />
    </div>
</template>

<style lang="less" scoped></style>
