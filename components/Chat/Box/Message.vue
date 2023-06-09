<script setup lang="ts">
import { NImage } from 'naive-ui'
const props = defineProps<{
    text: string
    self: boolean
}>()

const imageRegex = /\[image\]\((.*?)\)/

const image = computed<string | null>(() => {
    const match = props.text.match(imageRegex)
    if (!match) return null
    return match[1]
})
</script>

<template>
    <div
        class="flex w-full"
        :style="{ justifyContent: self ? 'flex-end' : 'flex-start' }"
    >
        <div v-if="image" class="message-image-wrapper w-96">
            <NImage :src="image" width="100%" />
        </div>
        <div
            v-else
            class="my-0.5 rounded-lg p-2"
            :class="self ? 'bg-theme text-white' : 'bg-[#E4E6EB] text-black'"
        >
            {{ text }}
        </div>
    </div>
</template>

<style lang="less">
.message-image-wrapper .n-image img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
}
</style>
