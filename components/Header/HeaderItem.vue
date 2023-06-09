<script setup lang="ts"></script>

<template>
    <button
        class="focus:bg-theme hover:bg-theme group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border-0 bg-white p-0 transition-all duration-200 focus-within:-translate-y-0.5 focus-within:text-white hover:-translate-y-0.5 hover:text-white focus:-translate-y-0.5 focus:text-white"
    >
        <slot name="button" />
    </button>
</template>

<style lang="less" scoped></style>
