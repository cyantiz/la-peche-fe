<script setup lang="ts">
import { PhMagnifyingGlass, PhHeart, PhBellSimple, PhList } from 'phosphor-vue'
</script>

<template>
    <ul class="flex gap-2">
        <HeaderNavbarItem to="/">
            <template #icon="{ size }">
                <PhMagnifyingGlass :size="size" weight="bold" />
            </template>
        </HeaderNavbarItem>
        <HeaderNavbarItem to="/matches">
            <template #icon="{ size }">
                <PhHeart :size="size" weight="bold" />
            </template>
        </HeaderNavbarItem>
        <HeaderNavbarItem to="/notifications">
            <template #icon="{ size }">
                <PhBellSimple :size="size" weight="bold" />
            </template>
        </HeaderNavbarItem>
        <HeaderNavbarItem to="/menu">
            <template #icon="{ size }">
                <PhList :size="size" weight="bold" />
            </template>
        </HeaderNavbarItem>
    </ul>
</template>

<style lang="less" scoped></style>
