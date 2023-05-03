<template>
    <div class="flex w-screen flex-col">
        <LayoutCurtain :show="isShowLayoutCurtain || isAuthLoading" />
        <ClientOnly>
            <Header />
        </ClientOnly>
        <NLayout has-sider class="body" content-style="width: 100%">
            <ClientOnly>
                <NLayoutSider
                    v-if="!isMobile"
                    :bordered="false"
                    collapse-mode="width"
                    :collapsed-width="84"
                    :width="258"
                    :collapsed="isCollapsedSidebar"
                >
                    <SidebarMenu :collapsed="isCollapsedSidebar" />
                </NLayoutSider>
            </ClientOnly>
            <NLayout class="w-full" content-style="width: 100%; padding: 1rem;">
                <div
                    class="neu-shadow-lb-4 neu-border-2 bg-theme-dim h-full w-full overflow-y-scroll rounded-lg p-4"
                >
                    <slot />
                </div>
            </NLayout>
        </NLayout>
    </div>
</template>

<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core'
import { NLayoutSider, NLayout, useLoadingBar } from 'naive-ui'
import { COLLAPSED_SIDEBAR_PAGES } from './config'
import SidebarMenu from '@/components/SidebarMenu/index.vue'
import { useAuthStore } from '~/store/auth'

const auth = useAuthStore()
const route = useRoute()
const loadingBar = useLoadingBar()

const isAuthLoading = computed(() => auth.loading)

// handle show/hide layout curtain
const isShowLayoutCurtain = ref<boolean>(true)

const breakPoints = useBreakpoints(breakpointsTailwind)
// handle dynamic styling for sidebar

const isCollapsedSidebar = computed(
    () =>
        COLLAPSED_SIDEBAR_PAGES.includes(String(route.name)) ||
        breakPoints.smallerOrEqual('lg').value
)

// handle dynamic styling for header
const isMobile = breakPoints.smallerOrEqual('md')

onMounted(async () => {
    if (!process.client) return

    loadingBar.start()
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve()
        }, 400)
    })
    isShowLayoutCurtain.value = false
})

const router = useRouter()
router.beforeEach(() => {
    loadingBar.start()
})
</script>

<style lang="less" scoped>
@navbar-height-desktop: 72px;
@navbar-height-mobile: 116px;
@breakpoint-mobile: 726px;
div.body {
    height: calc(100vh - @navbar-height-desktop);
}
@media (max-width: @breakpoint-mobile) {
    div.body {
        height: calc(100vh - @navbar-height-mobile);
    }
}
</style>
