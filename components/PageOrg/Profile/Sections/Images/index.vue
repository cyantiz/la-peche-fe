<script setup lang="ts">
import { NAlert } from 'naive-ui'
import Image from './Image.vue'
useHead({
    title: 'My Profile',
})

const props = defineProps<{
    images: IImage[]
}>()

const imagesPad = computed(() => {
    const images = props.images
    if (images.length < 6) {
        const pad = new Array(6 - images.length).fill({
            id: Date.now().toString(),
            url: '',
            isThumbnail: false,
            updatedAt: '',
            createdAt: '',
        } as IImage)
        return [...images, ...pad]
    }
    return images
})
</script>

<template>
    <PageOrgProfileSectionsBaseProfileSection
        block
        title="Images"
        :have-edit-modal="false"
    >
        <template #content>
            <div class="p-1">
                <NAlert title="Hey! Show-off more" type="info">
                    You can upload upto 6 images, sort them by dragging and
                    dropping
                </NAlert>
            </div>
            <div class="flex flex-wrap">
                <Image
                    v-for="image in imagesPad"
                    :key="image.id"
                    :src="image.url"
                />
            </div>
        </template>
    </PageOrgProfileSectionsBaseProfileSection>
</template>

<style lang="less" scoped></style>
