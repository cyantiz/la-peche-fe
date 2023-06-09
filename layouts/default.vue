<template>
    <div class="flex h-full w-screen flex-col bg-[#F8FAFF]">
        <LayoutCurtain :show="isShowLayoutCurtain || isAuthLoading" />
        <ClientOnly>
            <Header />
        </ClientOnly>
        <NLayout
            has-sider
            class="body mx-auto w-full max-w-[1920px] bg-white bg-opacity-0"
            content-style="width: 100%;"
        >
            <ClientOnly>
                <NLayoutSider
                    v-if="!isMobile"
                    :bordered="false"
                    collapse-mode="width"
                    :collapsed-width="84"
                    :width="258"
                    :collapsed="true"
                    class="bg-white bg-opacity-0"
                    content-style="overflow: initial"
                >
                    <SidebarMenu :collapsed="true" />
                </NLayoutSider>
            </ClientOnly>
            <NLayout
                class="w-full bg-white bg-opacity-0"
                content-style="width: 100%;"
            >
                <div class="h-full w-full md:p-4">
                    <div
                        class="layout-org h-full w-full overflow-x-hidden overflow-y-scroll bg-white md:rounded-lg md:p-4"
                    >
                        <slot />
                    </div>
                </div>
            </NLayout>
        </NLayout>
    </div>
</template>

<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core'
import { NLayoutSider, NLayout, useLoadingBar } from 'naive-ui'
import SidebarMenu from '@/components/SidebarMenu/index.vue'
import { useAuthStore } from '~/store/auth'

const auth = useAuthStore()
const loadingBar = useLoadingBar()

const isAuthLoading = computed(() => auth.loading)

const isShowLayoutCurtain = ref<boolean>(true)

const breakPoints = useBreakpoints(breakpointsTailwind)

const isMobile = breakPoints.smallerOrEqual('md')

onMounted(async () => {
    if (!process.client) return

    loadingBar.start()
    await useDelay(400)
    isShowLayoutCurtain.value = false
})

const router = useRouter()
router.beforeEach(() => {
    loadingBar.start()
})
</script>

<style lang="less" scoped>
@navbar-height-desktop: 64px;
@navbar-height-mobile: 96px;
@breakpoint-mobile: 768px;
div.body {
    height: calc(100vh - @navbar-height-desktop);
}
@media (max-width: @breakpoint-mobile) {
    div.body {
        max-height: calc(100vh - @navbar-height-mobile);
    }
}
</style>
