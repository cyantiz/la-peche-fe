<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
        isWithText: boolean
        canNavigate?: boolean
    }>(),
    {
        size: 'md',
        isWithText: false,
        canNavigate: true,
    }
)

const IMG_SIZES: Record<string, number> = {
    xs: 24,
    sm: 40,
    md: 64,
    lg: 96,
    xl: 128,
    '2xl': 256,
}

const GAPS: Record<string, number> = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    '2xl': 48,
}

const TEXT_SIZES: Record<string, number> = {
    xs: 16,
    sm: 20,
    md: 36,
    lg: 48,
    xl: 64,
    '2xl': 128,
}

const imgSize = computed(() => IMG_SIZES[props.size])
const gap = computed(() => GAPS[props.size])
const textSize = computed(() => TEXT_SIZES[props.size])
</script>

<template>
    <NuxtLink
        :to="canNavigate ? '/' : undefined"
        class="flex items-center"
        :style="{ gap: `${gap}px` }"
    >
        <img
            src="/img/logo256.png"
            alt=""
            class="object-cover"
            :style="{ width: `${imgSize}px`, height: `${imgSize}px` }"
        />
        <div
            v-if="props.isWithText"
            class="text font-bold"
            :style="{ fontSize: `${textSize}px` }"
        >
            Pēche
        </div>
    </NuxtLink>
</template>

<style lang="less" scoped>
.text {
    font-family: 'Montserrat', sans-serif;
    user-select: none;
}
</style>
