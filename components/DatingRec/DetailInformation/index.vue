<script setup lang="ts">
import { NModal, NCard } from 'naive-ui'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'

defineProps<{
    images: IImage[] | null
    info: IUserInformation | null
    show: boolean
}>()

defineEmits(['close', 'like', 'dislike', 'star'])

const breakPoints = useBreakpoints(breakpointsTailwind)
const lg = breakPoints.smallerOrEqual('lg')
const sm = breakPoints.smallerOrEqual('sm')
</script>

<template>
    <NModal
        :show="show"
        transform-origin="center"
        :mask-closable="true"
        @close="$emit('close')"
    >
        <NCard
            class="detail-card mx-auto h-screen w-full lg:h-auto lg:w-auto"
            header-style="padding: 16px 16px 16px 16px"
            :bordered="false"
            content-style="display: flex; height: full; overflow-y: auto; position: relative"
            :size="lg ? 'small' : 'large'"
            role="dialog"
            aria-modal="true"
            :closable="true"
            @close="$emit('close')"
        >
            <div class="flex h-full flex-col gap-8 overflow-y-auto lg:flex-row">
                <SkeletonDatingRecDetailImage v-show="!images" />

                <DatingRecDetailImage
                    v-if="images"
                    :images="images"
                    :slides-per-view="sm ? 1 : lg ? 2 : 1"
                />

                <ClientOnly>
                    <SkeletonDatingRecDetailText v-show="!info" />
                    <DatingRecDetailTextAndAction
                        v-if="info"
                        :info="info"
                        @dislike="$emit('dislike')"
                        @like="$emit('like')"
                        @star="$emit('star')"
                    />
                </ClientOnly>
            </div>
        </NCard>
    </NModal>
</template>

<style lang="less" scoped></style>
