<!-- eslint-disable @typescript-eslint/no-var-requires -->
<script setup lang="ts">
// @ts-ignore
import { VueDraggableNext } from 'vue-draggable-next'
import { NAlert, NSpin } from 'naive-ui'
import { uuid4 } from '@sentry/utils'
import Image from './Image.vue'
import { useProfileStore } from '~/store/profile'
useHead({
    title: 'My Profile',
})

const props = defineProps<{
    images: IImage[]
}>()
const pending = ref(false)
const patchingImages = ref<IImage[]>(props.images)
const profile = useProfileStore()
const imagesLeftPad = computed(() => {
    const images = patchingImages.value
    const imagesLeft = 6 - images.length
    return Array(imagesLeft)
        .fill(null)
        .map((_) => ({
            id: uuid4ToNumeric(uuid4()),
            url: '',
        }))
})

const addNewImage = (image: IImage) => {
    patchingImages.value = [...patchingImages.value, image]
    pending.value = false
}
const deleteImage = (id: number) => {
    patchingImages.value = patchingImages.value.filter(
        (image) => +image.id !== id
    )
    pending.value = false
}

const changeOrder = (event: {
    moved: { newIndex: number; oldIndex: number }
}) => {
    const newIndex = event.moved.newIndex
    const oldIndex = event.moved.oldIndex

    const changedImage = patchingImages.value[newIndex]
    // update order of all image after the changed image
    patchingImages.value = patchingImages.value.map((image) => {
        if (+image.id === +changedImage.id) {
            return {
                ...image,
                order: newIndex + 1,
            }
        }
        if (newIndex > oldIndex) {
            if (image.order > oldIndex + 1 && image.order <= newIndex + 1) {
                return {
                    ...image,
                    order: image.order - 1,
                }
            }
        } else if (image.order >= newIndex + 1 && image.order < oldIndex + 1) {
            return {
                ...image,
                order: image.order + 1,
            }
        }

        return image
    })

    patchingImages.value.sort((a, b) => a.order - b.order)

    profile.changeOrder({ id: changedImage.id, newOrder: newIndex + 1 })
}
</script>

<template>
    <ProfileSectionsBaseProfileSection
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
            <VueDraggableNext
                class="relative flex flex-wrap transition-all duration-200"
                :list="patchingImages"
                @change="changeOrder"
            >
                <Image
                    v-for="image in patchingImages"
                    :id="image.id"
                    :key="image.id"
                    :src="image.url"
                    @deleting="pending = true"
                    @deleted="deleteImage"
                    @delete-failed="pending = false"
                />
                <Image
                    v-for="left in imagesLeftPad"
                    :id="left.id"
                    :key="left.id"
                    :src="left.url"
                    :new-order="patchingImages.length + 1"
                    @uploaded="addNewImage"
                    @uploading="pending = true"
                    @upload-failed="pending = false"
                />
                <ClientOnly>
                    <div
                        v-if="pending"
                        class="uploading-curtain absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 p-1"
                    >
                        <div
                            class="flex h-full w-full items-center justify-center rounded-lg bg-black bg-opacity-40"
                        >
                            <NSpin />
                        </div>
                    </div>
                </ClientOnly>
            </VueDraggableNext>
        </template>
    </ProfileSectionsBaseProfileSection>
</template>

<style lang="less" scoped></style>
