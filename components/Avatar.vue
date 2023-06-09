<script setup lang="ts">
import { NAvatar } from 'naive-ui'
import { AvatarProps } from 'naive-ui/es/avatar/src/Avatar'

interface Props extends AvatarProps {}

const props = defineProps<Props>()

const src = computed(() => {
    const res = props.src ?? '/img/default_avatar.png'
    if (res.length === 0) return '/img/default_avatar.png'
    return res
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
