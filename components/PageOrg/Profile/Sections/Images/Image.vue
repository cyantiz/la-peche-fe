<!-- eslint-disable camelcase -->
<script setup lang="ts">
import { uuid4 } from '@sentry/utils'
import { NImage, useNotification } from 'naive-ui'
import { PhUpload, PhTrash } from 'phosphor-vue'
import { useAuthStore } from '~/store/auth'
import { useProfileStore } from '~/store/profile'
const props = defineProps<{
    src: string
}>()
const emits = defineEmits(['uploading', 'uploaded'])

const randomId = ref(uuid4())
const notification = useNotification()

watch(
    () => props.src,
    () => {
        randomId.value = uuid4()
    }
)

const cloudinary = useCloudinary()
const auth = useAuthStore()
const profile = useProfileStore()

const handleUpload = async (e: Event) => {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return

    try {
        emits('uploading')
        const { secure_url } = await cloudinary.upload(
            file,
            auth.user.username.toString()
        )

        const newImage = await profile.addImage({
            url: secure_url,
            isThumbnail: false,
        })

        if (!newImage)
            throw new Error('Something went wrong while uploading image')

        emits('uploaded', newImage)
    } catch (error) {
        notification.error({
            title: 'Upload failed',
        })
    }
}
</script>

<template>
    <div class="my-profile-image relative aspect-[3/4] w-1/3 p-0.5 md:p-1">
        <!-- Image available -->
        <div
            v-if="src"
            class="my-profile-image--available flex h-full w-full overflow-hidden rounded md:rounded-lg"
        >
            <NImage
                :src="src"
                style="width: 100%; height: 100%"
                object-fit="cover"
            />
        </div>

        <!-- Image unavailable -->
        <label
            v-else
            :for="'image-upload' + '' + randomId"
            class="my-profile-image--unavailable flex h-full w-full cursor-pointer select-none items-center justify-center rounded bg-inactive bg-opacity-30 transition-all duration-200 hover:-translate-y-1 md:rounded-lg"
        >
            <PhUpload :size="24" weight="bold" />
        </label>
        <!-- accept one file image only -->
        <input
            :id="'image-upload' + '' + randomId"
            type="file"
            class="hidden"
            accept="image/*"
            @change="handleUpload"
        />

        <!-- Delete button (show when image available) -->
        <div
            v-if="src"
            class="my-profile-image__delete-btn absolute right-4 top-4 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md bg-white bg-opacity-80 text-[12px] text-cherry transition-all hover:-translate-y-0.5 hover:bg-cherry hover:text-white md:h-8 md:w-8 md:text-base"
        >
            <PhTrash weight="fill" />
        </div>
    </div>
</template>

<style lang="less">
.my-profile-image .n-image img {
    width: 100%;
    height: 100%;
}
</style>
