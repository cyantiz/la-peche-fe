<script setup lang="ts">
import { PhPencilSimple } from 'phosphor-vue'
defineProps<{
    title: string
    informationRecords: {
        title: string
        content: string | number | null
        iconComponent: any // add `any` here because of framework complex type
    }[]
}>()
const isModalOpen = ref(false)

const openModal = () => {
    isModalOpen.value = true
}
const closeModal = () => {
    isModalOpen.value = false
}
</script>

<template>
    <div
        class="profile__section hover:border-theme mb-2 inline-flex w-full flex-col items-center rounded-md border-0 border-solid border-inactive bg-white p-3 transition-all md:mb-0 md:border-2"
    >
        <div
            class="profile__section__header mb-4 flex w-full items-center justify-between pl-3"
        >
            <span class="text-xl font-bold">
                {{ title }}
            </span>
            <div
                class="bg-theme flex cursor-pointer items-center justify-center rounded-md p-1 text-white transition-all duration-200 hover:-translate-y-1"
                @click="() => openModal()"
            >
                <PhPencilSimple :size="20" weight="fill" />
            </div>
        </div>

        <InformationItem
            v-for="(information, index) in informationRecords"
            :key="information.title"
            :title="information.title"
            :content="information.content"
            :bottom-divider="index !== informationRecords.length - 1"
            @add-button-click="openModal"
        >
            <template #icon="{ size }">
                <component
                    :is="information.iconComponent"
                    :size="size"
                    weight="bold"
                />
            </template>
        </InformationItem>
    </div>
    <slot
        name="modal"
        :close-modal="closeModal"
        :show-modal="isModalOpen"
        :title="title"
    />
</template>

<style lang="less" scoped></style>
