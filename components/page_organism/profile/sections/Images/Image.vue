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
            class="my-profile-image--available neu-border-2 neu-shadow-rt-2 flex h-full w-full overflow-hidden"
        >
            <NImage :src="src" object-fit="cover" />
        </div>

        <!-- Image unavailable -->
        <div
            v-else
            class="my-profile-image--unavailable neu-border-2 neu-shadow-rt-2 hover:neu-shadow-0 hover:bg-theme flex h-full w-full cursor-pointer select-none items-center justify-center bg-white transition-all duration-200 hover:-translate-y-[2px] hover:translate-x-[2px] hover:text-white"
        >
            <PhUpload :size="24" weight="bold" />
        </div>

        <!-- Delete image button (show when image available) -->
        <div
            v-if="src"
            class="my-profile-image__delete-btn neu-border-2 neu-shadow-rt-2 hover:neu-shadow-0 absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-white text-cherry transition-all duration-200 hover:-translate-y-[2px] hover:translate-x-[2px] hover:bg-cherry hover:text-white"
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
