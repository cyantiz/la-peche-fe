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
                    bordered
                    collapse-mode="width"
                    :collapsed-width="64"
                    :width="240"
                    :collapsed="isCollapsedSidebar"
                >
                    <SidebarMenu :collapsed="isCollapsedSidebar" />
                </NLayoutSider>
            </ClientOnly>
            <NLayout class="w-full" content-style="width: 100%; padding: 1rem">
                <slot />
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
const route = useRoute()
const loadingBar = useLoadingBar()

const isAuthLoading = computed(() => auth.loading)

// handle show/hide layout curtain
const isShowLayoutCurtain = ref<boolean>(true)

const breakPoints = useBreakpoints(breakpointsTailwind)
// handle dynamic styling for sidebar
const COLLAPSED_SIDEBAR_PAGES = ['messages']

const isCollapsedSidebar = computed(
    () =>
        COLLAPSED_SIDEBAR_PAGES.includes(String(route.name)) ||
        breakPoints.smallerOrEqual('lg').value
)

// handle dynamic styling for header
const isMobile = breakPoints.smallerOrEqual('md')

onMounted(async () => {
    loadingBar.start()
    if (process.client) {
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve()
            }, 400)
        })
        isShowLayoutCurtain.value = false
    }
})

watch(
    () => isShowLayoutCurtain.value || isAuthLoading.value,
    (val) => {
        if (!val) loadingBar.finish()
    }
)

// const router = useRouter()

// router.beforeEach(() => {
//     loadingBar.start()
// })

// router.afterEach(() => {
//     loadingBar.finish()
// })
</script>

<style lang="less" scoped>
@navbar-height-desktop: 48px;
@navbar-height-mobile: 100px;
@breakpoint-mobile: 640px;
div.body {
    height: calc(100vh - @navbar-height-desktop);
}
@media (max-width: @breakpoint-mobile) {
    div.body {
        height: calc(100vh - @navbar-height-mobile);
    }
}
</style>
