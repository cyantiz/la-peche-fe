<script setup lang="ts">
import { NSkeleton } from 'naive-ui'
</script>

<template>
    <div class="static flex w-full flex-col gap-3 lg:relative lg:w-96">
        <NSkeleton size="large" />
        <NSkeleton size="small" style="width: 60%" :repeat="4" />
        <div>
            <NSkeleton text :repeat="4" />
        </div>
        <div
            class="actions absolute bottom-0 right-0 flex w-full justify-center gap-8 bg-white pb-6 pt-2 lg:p-0"
        >
            <NSkeleton circle width="56px" />
            <div class="flex gap-6">
                <NSkeleton circle width="56px" />
                <NSkeleton circle width="56px" />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped></style>
