<script setup lang="ts">
withDefaults(
    defineProps<{
        icon: any
        title: string
        active: boolean
    }>(),
    {
        active: false,
    }
)

defineEmits(['select'])
</script>

<template>
    <div
        class="hover:bg-theme group inline-flex cursor-pointer flex-col items-center gap-2 rounded-lg bg-gray-200 p-4 text-black transition-all duration-200 hover:scale-105 hover:text-white"
        :class="{
            'bg-theme text-white': active,
        }"
        @click="$emit('select')"
    >
        <div class="text-3xl transition-all duration-200 md:text-4xl">
            <component :is="icon" weight="duotone" />
        </div>
        <p class="text-center text-sm font-medium md:text-base">{{ title }}</p>
    </div>
</template>

<style lang="less" scoped></style>
