<script setup lang="ts">
import { PhPencilSimple } from 'phosphor-vue'
import BaseModalDialog from './BaseModalDialog.vue'

withDefaults(
    defineProps<{
        title: string
        block?: boolean
        haveEditModal?: boolean
    }>(),
    {
        block: false,
        haveEditModal: true,
    }
)
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
        class="profile__section hover:border-theme inline-flex w-full flex-col items-center rounded-md border-2 border-solid border-inactive bg-white p-3 transition-all"
        :class="{ 'w-full': block }"
    >
        <div
            class="profile__section__header mb-4 flex w-full items-center justify-between pl-3"
        >
            <span class="text-xl font-bold">
                {{ title }}
            </span>
            <div
                v-if="haveEditModal"
                class="bg-theme flex cursor-pointer items-center justify-center rounded-md p-1 text-white transition-all duration-200 hover:-translate-y-0.5"
                @click="() => openModal()"
            >
                <PhPencilSimple :size="20" weight="fill" />
            </div>
        </div>

        <div class="profile__section__content w-full">
            <slot name="content" />
        </div>
    </div>
    <BaseModalDialog
        v-if="haveEditModal"
        :title="title"
        :show="isModalOpen"
        @close="closeModal"
        @negative-click="closeModal"
    >
        <slot name="modal-content" />
    </BaseModalDialog>
</template>

<style lang="less" scoped></style>
