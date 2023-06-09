<script setup lang="ts">
import { NResult, NButton } from 'naive-ui'
import { PhArrowClockwise } from 'phosphor-vue'

const reload = () => {
    window.location.reload()
}
</script>

<template>
    <NResult
        status="error"
        title="Oops, Error"
        description="Unable to load data, please reload the page to try again"
    >
        <template #footer>
            <NButton type="success" @click="reload">
                <template #icon>
                    <PhArrowClockwise size="18" />
                </template>
                Reload
            </NButton>
        </template>
    </NResult>
</template>

<style lang="less" scoped></style>
