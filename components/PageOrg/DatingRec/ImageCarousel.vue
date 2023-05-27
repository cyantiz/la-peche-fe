<script setup lang="ts">
import { NCarousel, NCarouselItem, NImage, NSpin } from 'naive-ui'
import { PhCaretLeft, PhCaretRight } from 'phosphor-vue'

withDefaults(
    defineProps<{
        images: Array<IImage>
        slidesPerView: number
        previewDisabled: boolean
    }>(),
    {
        slidesPerView: 1,
        previewDisabled: false,
    }
)
</script>

<template>
    <NCarousel
        show-arrow
        :slides-per-view="slidesPerView"
        class="rounded-lg"
        :loop="true"
    >
        <NCarouselItem
            v-for="image in images"
            :key="image.id"
            class="aspect-[3/4]"
        >
            <div class="profile-carousel-img flex aspect-[3/4]">
                <div class="flex h-full w-full items-stretch justify-stretch">
                    <NImage
                        :src="image.url"
                        object-fit="cover"
                        :preview-disabled="previewDisabled"
                        lazy
                    >
                        <template #placeholder>
                            <div
                                class="flex h-full w-full items-center justify-center bg-slate-200"
                            >
                                <NSpin />
                            </div>
                        </template>
                    </NImage>
                </div>
            </div>
        </NCarouselItem>
        <template #arrow="{ prev, next }">
            <div class="custom-arrow">
                <button
                    type="button"
                    class="custom-arrow--left"
                    @click.stop="prev"
                >
                    <PhCaretLeft weight="bold" :size="25" />
                </button>
                <button
                    type="button"
                    class="custom-arrow--right"
                    @click.stop="next"
                >
                    <PhCaretRight weight="bold" :size="25" />
                </button>
            </div>
        </template>
        <template #dots="{ total, currentIndex, to }">
            <ul class="custom-dots">
                <li
                    v-for="index of total"
                    :key="index"
                    :class="{ ['is-active']: currentIndex === index - 1 }"
                    @click.stop="to(index - 1)"
                />
            </ul>
        </template>
    </NCarousel>
</template>

<style lang="less" scoped>
.n-carousel:hover {
    .custom-arrow {
        opacity: 1;
    }
}

.custom-arrow {
    opacity: 0;
    transition: all ease 0.2s;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 15%;
    bottom: 15%;
    left: 10px;
    right: 10px;
}

.custom-arrow button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: rgba(255, 255, 255, 0);
    border-width: 0;
    border-radius: 8px;
    transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.custom-arrow button svg {
    filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.4));
}

.custom-arrow button:hover {
}

.custom-arrow button:active {
    transform: scale(0.95);
    transform-origin: center;
}

.custom-dots {
    display: flex;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
}

.custom-dots li {
    display: inline-block;
    width: 100%;
    height: 4px;
    margin: 0 3px;
    border-radius: 4px;
    background-color: rgba(2555, 2555, 255, 0.4);
    box-shadow: 0 0 1px 0px rgba(0, 0, 0, 0.4);
    transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.custom-dots li.is-active {
    // width: 40px;
    background: white;
}
</style>

<style lang="less">
.profile-carousel-img .n-image img,
.profile-carousel-img .n-image {
    width: 100%;
    height: 100%;
}
</style>
