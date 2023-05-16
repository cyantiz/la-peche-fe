<script setup lang="ts">
import { NButton } from 'naive-ui'
import { PhMagnifyingGlassPlus } from 'phosphor-vue'
import ImageCarousel from './ImageCarousel.vue'

const images = ref([
    {
        id: 1,
        url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg',
    },
    {
        id: 2,
        url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg',
    },
    {
        id: 3,
        url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg',
    },
    {
        id: 4,
        url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg',
    },
    {
        id: 5,
        url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg',
    },
    {
        id: 6,
        url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg',
    },
    {
        id: 7,
        url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg',
    },
    {
        id: 8,
        url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg',
    },
])
</script>

<template>
    <ClientOnly>
        <div class="__info border-1 mx-auto flex w-full max-w-[700px] flex-col">
            <div class="__info__images flex w-full gap-4">
                <ImageCarousel :images="images" />
            </div>

            <div class="__info__text flex flex-col gap-4 p-6">
                <div class="__info_text_basic flex w-full justify-between">
                    <div class="flex flex-col">
                        <span class="text-3xl font-bold"
                            >Rocket Racoon, 22</span
                        >
                        <span
                            class="flex items-center gap-2.5 text-lg font-medium text-inactive"
                        >
                            <PhBriefcase weight="fill" size="20" />
                            Guardian at The Galaxy
                        </span>
                        <span
                            class="flex items-center gap-2.5 text-lg font-medium text-inactive"
                        >
                            <PhMapPin weight="fill" size="20" />
                            Knowhere, Galaxy
                        </span>
                        <span
                            class="flex items-center gap-2.5 text-lg font-medium text-inactive"
                        >
                            <PhGraduationCap weight="fill" size="20" />
                            Oxford University
                        </span>
                    </div>
                    <div class="actions flex items-start gap-8">
                        <DatingActionButton type="star" />
                        <div class="flex gap-6">
                            <DatingActionButton type="dislike" />
                            <DatingActionButton type="like" />
                        </div>
                    </div>
                </div>
                <div class="__info__text_else w-full">
                    <div class="text-base">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Deleniti harum enim, eligendi voluptatem, sint,
                        reiciendis facere eveniet vitae commodi porro
                        praesentium quasi libero officia deserunt sapiente!
                        Eligendi reprehenderit cupiditate molestiae!
                    </div>
                </div>
                <NButton block>
                    <template #icon>
                        <PhMagnifyingGlassPlus weight="fill" />
                    </template>
                    Detail information
                </NButton>
            </div>
        </div>
    </ClientOnly>
</template>

<style lang="less" scoped></style>
