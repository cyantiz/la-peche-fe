<script setup lang="ts">
withDefaults(
    defineProps<{
        images: IImage[]
        slidesPerView: number
    }>(),
    {
        slidesPerView: 1,
    }
)
</script>

<template>
    <div class="mx-auto flex w-[calc(100vw-32px)] lg:h-full lg:w-96">
        <DatingRecImageCarousel
            :images="images"
            :slides-per-view="slidesPerView"
        />
    </div>
</template>

<style lang="less" scoped></style>
