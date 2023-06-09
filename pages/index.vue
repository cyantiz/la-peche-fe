<script setup lang="ts">
import { useLoadingBar } from 'naive-ui'
import { useAuthStore } from '~/store/auth'
import { useRecommendationStore } from '~/store/recommendation'
useHead({
    title: 'Explore',
})
definePageMeta({
    layout: 'default',
})

const auth = useAuthStore()
const loadingBar = useLoadingBar()

onMounted(() => {
    if (!process.client) return
    setTimeout(() => loadingBar.finish(), 1)
})

const recommendationStore = useRecommendationStore()

const { data: recommendations } = useAsyncData(() =>
    recommendationStore.getRecommendations(5)
)

const detailImages = ref<IImage[] | null>(null)
const detailInfo = ref<IUserInformation | null>(null)
const showDetail = ref(false)

const openDetail = (_infoWithImages: IUserInformationWithImages) => {
    detailImages.value = _infoWithImages.images
    detailInfo.value = _infoWithImages
    showDetail.value = true
}
</script>

<template>
    <div v-if="auth.loading">auth loading</div>
    <div class="relative flex h-full w-full items-center justify-center">
        <div
            class="absolute aspect-square h-full rounded-full bg-bitter-sweet text-bitter-sweet opacity-20 blur-xl"
        />
        <template v-if="recommendations">
            <DatingRecSuggestionCard
                v-for="(recommendation, index) in recommendations"
                :key="recommendation.id"
                :index="recommendations.length - index - 1"
                :info-with-images="recommendation"
                @show-detail-btn-click="openDetail"
            />
        </template>
    </div>
    <DatingRecDetailInformation
        :info="detailInfo"
        :images="detailImages"
        :show="showDetail"
        @close="showDetail = false"
    />
</template>

<style lang="less" scoped></style>
