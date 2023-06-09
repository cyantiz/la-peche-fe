<script setup lang="ts">
import { NSkeleton } from 'naive-ui'

defineEmits(['showDetailBtnClick', 'like', 'dislike', 'star', 'dismiss'])

withDefaults(
    defineProps<{
        shadow?: boolean
    }>(),
    {
        shadow: true,
    }
)
</script>

<template>
    <ClientOnly>
        <div
            class="__info recommendation-card reocommendation-card--skeleton mx-auto flex w-full max-w-[90%] cursor-pointer select-none flex-col items-center gap-4 overflow-scroll rounded-xl bg-white p-4 sm:max-w-[480px] md:mx-0 md:w-1/2 md:overflow-auto xl:w-1/3"
        >
            <div class="relative flex w-full overflow-hidden rounded-lg">
                <div class="__info__images flex w-full">
                    <div class="aspect-[3/4] w-full">
                        <NSkeleton
                            size="large"
                            style="width: 100%; height: 100%"
                        />
                    </div>
                </div>

                <div
                    class="__info__text absolute bottom-0 flex w-full flex-col gap-4 rounded-lg bg-gradient-to-t from-black to-transparent p-4 pt-24"
                >
                    <div class="flex flex-col">
                        <span
                            class="h-8 text-lg font-medium text-white xs:text-2xl xs:font-bold"
                        >
                            <NSkeleton size="small" style="width: 60%" />
                        </span>
                        <span
                            class="flex h-6 items-center gap-2.5 text-base font-medium text-gray-200"
                        >
                            <PhMapPin weight="fill" size="18" />
                            <NSkeleton style="width: 60%; height: 20px" />
                        </span>
                        <span
                            class="flex h-6 items-center gap-2.5 text-base font-medium text-gray-200"
                        >
                            <PhGraduationCap weight="fill" size="18" />
                            <NSkeleton style="width: 70%; height: 20px" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </ClientOnly>
</template>

<style lang="less" scoped>
.recommendation-card {
    @media (max-width: 768px) {
        transform: none;
        box-shadow: none;
        overflow: hidden;
    }
}
</style>
