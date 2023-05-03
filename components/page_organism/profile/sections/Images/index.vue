<script setup lang="ts">
import { NAlert } from 'naive-ui'
import BaseProfileSection from '../base/BaseProfileSection.vue'
import Image from './Image.vue'
useHead({
    title: 'My Profile',
})

const images = ref<string[]>([
    'https://i.pinimg.com/originals/f7/4b/d3/f74bd336c65ea7dae95702df3f760840.jpg',
    '',
    '',
    '',
    '',
    '',
])
</script>

<template>
    <BaseProfileSection block title="Images" :have-edit-modal="false">
        <template #content>
            <div class="p-1">
                <NAlert title="Hey! Show-off more" type="info">
                    You can upload upto 6 images, sort them by dragging and
                    dropping
                </NAlert>
            </div>
            <div class="flex flex-wrap">
                <Image
                    v-for="(image, index) in images"
                    :key="index"
                    :src="image"
                />
            </div>
        </template>
        <template #modal-content> Edit form for biographic </template>
    </BaseProfileSection>
</template>

<style lang="less" scoped></style>
