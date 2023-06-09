<script setup lang="ts">
import { useLoadingBar, NPagination, NResult } from 'naive-ui'
import { useRecommendationStore } from '~/store/recommendation'

const loadingBar = useLoadingBar()
onMounted(() => {
    if (!process.client) return
    setTimeout(() => loadingBar.finish(), 1)
})

const recommendation = useRecommendationStore()
// const { data: matches } = useAsyncData('getMatched', () =>
//     recommendation.getMatched()
// )
const pagination = reactive<IPagination>({
    page: 1,
    pageSize: 6,
    total: 1,
    totalPages: 1,
})
const matcheds = ref<IUserInformationWithImages[]>([])
const pending = ref(true)
const getMatcheds = async () => {
    pending.value = true
    await useDelay(1000)
    const data = await recommendation.getMatcheds(
        pagination.page,
        pagination.pageSize
    )
    matcheds.value = data
    pending.value = false
}

const getMatchedCount = async () => {
    pending.value = true
    const data = await recommendation.getMatchedCount()
    pagination.total = data
    pagination.totalPages = Math.ceil(data / pagination.pageSize)
    pending.value = false
}

watch(
    () => pagination.page,
    () => {
        getMatcheds()
    }
)

onMounted(async () => {
    await getMatchedCount()
    await getMatcheds()
})
</script>

<template>
    <ClientOnly>
        <div class="flex w-full flex-col items-center">
            <NPagination
                v-if="matcheds.length"
                :page-count="pagination.totalPages"
                :page="pagination.page"
                :page-size="pagination.pageSize"
                @update-page="pagination.page = $event"
            />
            <SkeletonPagination v-else />
            <div
                v-if="pending"
                class="flex h-full w-full flex-wrap justify-center"
            >
                <SkeletonSuggestionCardNoAction />
                <SkeletonSuggestionCardNoAction />
                <SkeletonSuggestionCardNoAction />
                <SkeletonSuggestionCardNoAction />
                <SkeletonSuggestionCardNoAction />
                <SkeletonSuggestionCardNoAction />
            </div>
            <div
                v-else-if="matcheds.length"
                class="flex h-full w-full flex-wrap justify-center"
            >
                <DatingRecSuggestionCardNoActionVersion
                    v-for="match in matcheds"
                    :key="match.id"
                    :index="1"
                    :info-with-images="match"
                />
            </div>
            <div v-else>
                <NResult status="404" title="No matched yet!"> </NResult>
            </div>
            <NPagination
                v-if="matcheds.length"
                :page-count="pagination.totalPages"
                :page="pagination.page"
                :page-size="pagination.pageSize"
                @update-page="pagination.page = $event"
            />
            <SkeletonPagination v-else />
        </div>
    </ClientOnly>
</template>

<style lang="less" scoped></style>
