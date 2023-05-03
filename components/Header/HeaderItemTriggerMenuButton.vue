<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        size: 'tiny' | 'small' | 'medium'
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
        case 'tiny':
            size = 'p-[5px]'
            break
        case 'small':
            size = 'p-2'
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
            switch (props.size) {
                case 'tiny':
                    shape = 'rounded'
                    break
                case 'small':
                    shape = 'rounded-md'
                    break
                case 'medium':
                    shape = 'rounded-xl'
                    break
            }
            break
    }

    return `cursor-pointer bg-white hover:bg-theme hover:text-white neu-border-2  focus:text-white focus:bg-theme focus:neu-shadow-0 neu-shadow-lb-2 focus:-translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 flex items-center justify-center relative group ${size} ${shape}`
})

const iconSize = computed(() => {
    switch (props.size) {
        case 'tiny':
            return 16
        case 'small':
            return 18
        case 'medium':
            return 28
    }
})
</script>

<template>
    <button :class="classes">
        <slot name="icon" :size="iconSize" />

        <div
            class="pointer-events-none absolute right-0 top-8 z-20 cursor-default opacity-0 transition-all duration-200 group-focus:pointer-events-auto group-focus:top-10 group-focus:opacity-100"
        >
            <slot name="menu" />
        </div>
    </button>
</template>

<style lang="less" scoped></style>
