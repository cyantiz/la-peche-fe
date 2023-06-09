<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        infoWithImages: IUserInformationWithImages
        shadow?: boolean
        index: number
    }>(),
    {
        shadow: true,
    }
)

const age = computed(() => {
    return (
        useNow().value.getFullYear() - (props.infoWithImages.yearOfBirth ?? 0)
    )
})
</script>

<template>
    <ClientOnly>
        <div
            class="__info recommendation-card mx-auto flex w-full max-w-[90%] cursor-pointer select-none flex-col items-center gap-4 overflow-scroll rounded-xl bg-white p-4 sm:max-w-[480px] md:mx-0 md:w-1/2 md:overflow-auto xl:w-1/3"
        >
            <div class="relative flex md:w-full">
                <div class="__info__images flex md:w-full">
                    <DatingRecImageCarousel
                        :images="infoWithImages.images"
                        :slides-per-view="1"
                        :preview-disabled="true"
                    />
                </div>

                <div
                    class="__info__text absolute bottom-0 flex w-full flex-col gap-4 rounded-lg bg-gradient-to-t from-black to-transparent p-4"
                >
                    <div class="flex flex-col">
                        <span
                            class="text-md font-medium text-white sm:text-lg sm:font-bold"
                            >{{ infoWithImages.name }}, {{ age }}</span
                        >
                        <span
                            v-if="infoWithImages.location"
                            class="flex items-center gap-2.5 text-sm font-medium text-gray-200 md:text-base"
                        >
                            <PhMapPin weight="fill" size="18" />
                            {{
                                removeAreaPrefix(
                                    infoWithImages.location
                                        .split(',')
                                        .slice(3, 4)
                                        .join('')
                                )
                            }}
                        </span>
                        <p
                            v-if="infoWithImages.education"
                            class="flex w-full items-center gap-2.5 overflow-hidden text-sm font-medium text-gray-200 md:text-base"
                        >
                            <PhGraduationCap weight="fill" size="18" />
                            <span
                                class="w-full overflow-hidden overflow-ellipsis whitespace-nowrap"
                            >
                                {{ infoWithImages.education }}
                            </span>
                        </p>
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
