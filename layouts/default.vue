<template>
    <div class="flex w-screen flex-col">
        <Header />
        <NLayout has-sider class="body" content-style="width: 100%">
            <NLayoutSider
                v-if="!isMobile"
                bordered
                collapse-mode="width"
                :collapsed-width="64"
                :width="240"
                :collapsed="collapsed"
            >
                <SidebarMenu :collapsed="collapsed" />
            </NLayoutSider>
            <NLayout class="w-full" content-style="width: 100%; padding: 1rem">
                <slot />
            </NLayout>
        </NLayout>
    </div>
</template>

<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core'
import { NLayout, NLayoutSider } from 'naive-ui'

const route = useRoute()
const breakPoints = useBreakpoints(breakpointsTailwind)
const tailwindLargeThanLg = breakPoints.smallerOrEqual('lg')
const isMobile = breakPoints.smallerOrEqual('md')

const COLLAPSED_SIDEBAR_PAGES = ['messages']

const collapsed = computed(() => {
    if (COLLAPSED_SIDEBAR_PAGES.includes(route.name as string)) {
        return true
    }
    return tailwindLargeThanLg.value
})
</script>

<style lang="less" scoped>
div.body {
    height: calc(100vh - 48px);
}
@media (max-width: 640px) {
    div.body {
        height: calc(100vh - 100px);
    }
}
</style>
