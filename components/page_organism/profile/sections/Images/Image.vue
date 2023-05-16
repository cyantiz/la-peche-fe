<script setup lang="ts">
import { NImage } from 'naive-ui'
import { PhUpload, PhTrash } from 'phosphor-vue'
defineProps<{
    src: string
}>()
</script>

<template>
    <div class="my-profile-image relative aspect-[3/4] w-1/2 p-1 md:w-1/3">
        <!-- Image available -->
        <div
            v-if="src"
            class="my-profile-image--available flex h-full w-full overflow-hidden rounded-lg"
        >
            <NImage :src="src" object-fit="cover" />
        </div>

        <!-- Image unavailable -->
        <div
            v-else
            class="my-profile-image--unavailable flex h-full w-full cursor-pointer select-none items-center justify-center rounded-lg bg-inactive bg-opacity-30 transition-all duration-200 hover:-translate-y-1"
        >
            <PhUpload :size="24" weight="bold" />
        </div>

        <!-- Delete button (show when image available) -->
        <div
            v-if="src"
            class="my-profile-image__delete-btn neu-border-2 absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-white text-cherry transition-all hover:-translate-y-0.5 hover:bg-cherry hover:text-white"
        >
            <PhTrash :size="16" weight="fill" />
        </div>
    </div>
</template>

<style lang="less">
.my-profile-image .n-image img {
    width: 100%;
    height: 100%;
}
</style>
