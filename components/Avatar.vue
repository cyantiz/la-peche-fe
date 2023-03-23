<script setup lang="ts">
import { NAvatar } from 'naive-ui'
import { AvatarProps } from 'naive-ui/es/avatar/src/Avatar'

interface Props extends AvatarProps {}

const props = defineProps<Props>()

const src = computed(() => {
    return props.src ?? '/_nuxt/assets/img/default_avatar.png'
})
</script>

<template>
    <NAvatar
        :src="src"
        :size="props.size"
        :circle="props.circle"
        class="cursor-pointer"
        object-fit="cover"
    />
</template>

<style lang="less" scoped></style>
