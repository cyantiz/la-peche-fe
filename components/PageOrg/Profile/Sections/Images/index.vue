<script setup lang="ts">
import { NAlert, NSpin } from 'naive-ui'
import Image from './Image.vue'
useHead({
    title: 'My Profile',
})

const props = defineProps<{
    images: IImage[]
}>()

const patchingImages = ref<IImage[]>(props.images)

const imagesPad = computed(() => {
    const images = patchingImages.value
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

const uploading = ref(false)

const handleAddNewImage = (image: IImage) => {
    patchingImages.value = [...patchingImages.value, image]
    uploading.value = false
}
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
            <div class="relative flex flex-wrap">
                <Image
                    v-for="image in imagesPad"
                    :key="image.id"
                    :src="image.url"
                    @uploaded="handleAddNewImage"
                    @uploading="uploading = true"
                />
                <ClientOnly>
                    <div
                        v-if="uploading"
                        class="uploading-curtain absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 p-1"
                    >
                        <div
                            class="flex h-full w-full items-center justify-center rounded-lg bg-black bg-opacity-40"
                        >
                            <NSpin />
                        </div>
                    </div>
                </ClientOnly>
            </div>
        </template>
    </PageOrgProfileSectionsBaseProfileSection>
</template>

<style lang="less" scoped></style>
