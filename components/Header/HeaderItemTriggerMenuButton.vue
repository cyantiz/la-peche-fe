<script setup lang="ts"></script>

<template>
    <button
        class="focus:bg-theme hover:bg-theme group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border-0 bg-white p-0 transition-all duration-200 focus-within:-translate-y-0.5 focus-within:text-white hover:-translate-y-0.5 hover:text-white focus:-translate-y-0.5 focus:text-white"
    >
        <slot name="button" />

        <div
            class="pointer-events-none absolute right-0 top-8 cursor-default opacity-0 transition-all duration-200 group-focus-within:pointer-events-auto group-focus-within:top-12 group-focus-within:opacity-100 group-focus:pointer-events-auto group-focus:top-12 group-focus:opacity-100"
        >
            <slot name="menu" />
        </div>
    </button>
</template>

<style lang="less" scoped></style>
