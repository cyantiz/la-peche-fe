<script setup lang="ts">
const props = defineProps<{
    text: string
    active: boolean
    themeColor: string
    textColor: string
}>()

const cssProps = computed(() => {
    return {
        '--theme-option-color': props.themeColor,
        '--text-color': props.textColor,
    }
})
</script>

<template>
    <div
        class="theme-option flex w-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg py-2 font-bold transition-all duration-200"
        :class="{
            'theme-option--active': active,
            'theme-option--inactive': !active,
        }"
        :style="cssProps"
    >
        <slot name="icon" :size="24" />
        {{ text }}
    </div>
</template>

<style lang="less" scoped>
.theme-option {
    &--active {
        background: var(--theme-option-color);
        color: var(--text-color);
    }

    &--inactive {
        background: rgba(0, 0, 0, 0.1);
        color: var(--theme-option-color);

        &:hover {
            @apply -translate-y-1;
            background: var(--theme-option-color);
            color: var(--text-color);
        }
    }
}
</style>
