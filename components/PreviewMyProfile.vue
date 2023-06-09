<script setup lang="ts">
withDefaults(
    defineProps<{
        infoWithImages: IUserInformationWithImages
    }>(),
    {}
)

const showDetail = ref(false)

defineEmits(['close'])
</script>

<template>
    <div
        class="fixed left-0 top-0 z-[100] flex h-full w-full items-center justify-center"
    >
        <div
            class="absolute left-0 top-0 hidden h-full w-full bg-black bg-opacity-30 md:block"
            @click="$emit('close')"
        ></div>
        <div
            class="flex h-full w-full flex-col items-center justify-center bg-white md:h-auto md:w-auto md:bg-transparent"
        >
            <div class="absolute right-5 top-5">
                <CloseButton @click="$emit('close')" />
            </div>
            <DatingRecSuggestionCard
                :info-with-images="infoWithImages"
                :index="0"
                @dismiss="$emit('close')"
                @show-detail-btn-click="showDetail = true"
            />
        </div>
        <DatingRecDetailInformation
            :info="infoWithImages"
            :images="infoWithImages.images"
            :show="showDetail"
            @close="showDetail = false"
        />
    </div>
</template>

<style lang="less" scoped></style>
