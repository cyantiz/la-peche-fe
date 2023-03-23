<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        size: 'small' | 'medium'
        shape: 'circle' | 'rounded-square'
    }>(),
    {
        size: 'medium',
        shape: 'circle',
    }
)

const classes = computed(() => {
    let size = ''
    let shape = ''
    switch (props.size) {
        case 'small':
            size = 'p-[10px]'
            break
        case 'medium':
            size = 'p-3'
            break
    }

    switch (props.shape) {
        case 'circle':
            shape = 'rounded-full'
            break
        case 'rounded-square':
            shape = 'rounded-lg'
            break
    }

    return `cursor-pointer bg-[#E4E6EB] hover:bg-[#D8DADF] flex items-center justify-center ${size} ${shape}`
})

const iconSize = computed(() => {
    switch (props.size) {
        case 'small':
            return 20
        case 'medium':
            return 28
    }
})
</script>

<template>
    <div :class="classes">
        <slot name="icon" :size="iconSize" color="black" />
    </div>
</template>

<style lang="less" scoped></style>
