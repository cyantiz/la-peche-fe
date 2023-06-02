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
                class="bg-image bg-cove flex h-full w-full items-end overflow-hidden rounded-3xl text-4xl font-black xl:text-5xl 2xl:text-7xl"
            >
                <div
                    class="mt-auto flex h-1/3 w-full items-end bg-gradient-to-t from-[#333] to-transparent p-12"
                >
                    <div class="w-3/4 text-white">
                        Easy way to find <br />
                        <span class="text-bitter-sweet">your matches</span>
                    </div>
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
    background-image: url('https://res.cloudinary.com/cyantiz/image/upload/v1685643208/lapeche/static/np_file_210391_ez4lkx.jpg');
    background-position: center;
    object-fit: cover;
}
</style>
