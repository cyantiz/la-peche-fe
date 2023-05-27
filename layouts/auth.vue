<template>
    <div class="flex w-screen justify-center lg:h-screen">
        <LayoutCurtain :show="isShowLayoutCurtain" />
        <div class="flex w-full justify-center lg:w-auto">
            <div
                class="flex h-full w-full max-w-[512px] flex-col gap-4 self-start px-8 py-6 lg:w-[512px]"
            >
                <div class="bg-white">
                    <Logo is-with-text />
                </div>
                <div class="flex h-full w-full flex-col justify-center">
                    <div
                        class="space-between flex flex-col rounded-xl px-6 py-12 lg:border-[3px] lg:border-solid lg:border-black"
                    >
                        <slot />
                    </div>
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

const router = useRouter()
const loadingBar = useLoadingBar()

const isShowLayoutCurtain = ref<boolean>(true)
onMounted(async () => {
    if (!process.client) return

    loadingBar.start()
    await useDelay(400)
    isShowLayoutCurtain.value = false
    loadingBar.finish()
})

router.beforeEach(() => {
    loadingBar.start()
})
</script>

<style lang="less" scoped>
.bg-image {
    background-image: url('https://via.placeholder.com/1000/C4C4C4?text=');
}
</style>
