<script setup lang="ts">
import { PhHeart, PhX, PhStar } from 'phosphor-vue'

defineProps<{
    type: 'like' | 'dislike' | 'star'
}>()
</script>

<template>
    <div
        v-if="type === 'like'"
        class="like-btn cursor-pointer rounded-full bg-bitter-sweet p-3 leading-[0] transition-all duration-200 hover:-translate-y-0.5"
    >
        <PhHeart size="32" weight="fill" color="white" />
    </div>
    <div
        v-if="type === 'dislike'"
        class="dislike-btn cursor-pointer rounded-full bg-gold-metallic p-3 leading-[0] transition-all duration-200 hover:-translate-y-0.5"
    >
        <PhX size="32" weight="bold" color="white" />
    </div>
    <div
        v-if="type === 'star'"
        class="cursor-pointer rounded-full p-3 leading-[0] text-green-apple transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-apple hover:text-white"
    >
        <PhStar size="32" weight="fill" class="star-btn" />
    </div>
</template>

<style lang="less" scoped>
.like-btn {
    box-shadow: -3px 3px 20px rgba(251, 123, 100, 0.4);
}
.dislike-btn {
    box-shadow: -3px 3px 20px rgba(221, 185, 103, 0.4);
}
.star-btn {
    filter: drop-shadow(-3px 3px 20px rgba(24, 160, 88, 0.4));
}
</style>
