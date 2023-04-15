<template>
    <div class="flex h-screen w-screen justify-center">
        <LayoutCurtain :show="isShowLayoutCurtain" />
        <div class="flex w-full justify-center lg:w-auto">
            <div
                class="flex h-full w-full max-w-[512px] flex-col gap-4 self-start px-14 py-6 lg:w-[512px]"
            >
                <Logo is-with-text />
                <div class="flex h-full w-full flex-col justify-center">
                    <slot />
                </div>
            </div>
        </div>
        <div class="hidden w-full overflow-hidden p-6 lg:block">
            <div
                class="bg-image bg-cove flex h-full w-full items-end rounded-3xl p-12 text-6xl font-black"
            >
                <div class="w-3/4">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useLoadingBar } from 'naive-ui'

const loadingBar = useLoadingBar()

const isShowLayoutCurtain = ref<boolean>(true)
onMounted(async () => {
    loadingBar.start()
    if (process.client) {
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve()
            }, 400)
        })
        isShowLayoutCurtain.value = false
        loadingBar.finish()
    }
})
</script>

<style lang="less" scoped>
.bg-image {
    background-image: url('https://via.placeholder.com/1000/C4C4C4?text=');
}
</style>
