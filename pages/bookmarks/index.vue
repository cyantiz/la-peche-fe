<script setup lang="ts">
import { useLoadingBar, NResult, NPagination } from 'naive-ui'
import { useRecommendationStore } from '~/store/recommendation'

const loadingBar = useLoadingBar()
onMounted(() => {
    if (!process.client) return
    setTimeout(() => loadingBar.finish(), 1)
})

const recommendation = useRecommendationStore()
const pagination = reactive<IPagination>({
    page: 1,
    pageSize: 6,
    total: 1,
    totalPages: 1,
})
const bookmarkeds = ref<IUserInformationWithImages[]>([])
const pending = ref(true)
const getBookmarkeds = async () => {
    pending.value = true
    await useDelay(1000)
    const data = await recommendation.getBookmarkeds(
        pagination.page,
        pagination.pageSize
    )
    bookmarkeds.value = data
    pending.value = false
}

const getBookmarkedCount = async () => {
    pending.value = true
    const data = await recommendation.getBookmarkedCount()
    pagination.total = data
    pagination.totalPages = Math.ceil(data / pagination.pageSize)
    pending.value = false
}

watch(
    () => pagination.page,
    () => {
        getBookmarkeds()
    }
)

onMounted(async () => {
    await getBookmarkedCount()
    await getBookmarkeds()
})
</script>

<template>
    <ClientOnly>
        <div class="flex w-full flex-col items-center">
            <NPagination
                v-if="bookmarkeds.length"
                :page-count="pagination.totalPages"
                :page="pagination.page"
                :page-size="pagination.pageSize"
                size="medium"
                @update-page="pagination.page = $event"
            />
            <SkeletonPagination v-else />

            <div v-if="pending" class="flex w-full flex-wrap justify-center">
                <SkeletonSuggestionCardNoAction />
                <SkeletonSuggestionCardNoAction />
                <SkeletonSuggestionCardNoAction />
                <SkeletonSuggestionCardNoAction />
                <SkeletonSuggestionCardNoAction />
                <SkeletonSuggestionCardNoAction />
            </div>
            <div
                v-else-if="bookmarkeds.length"
                class="flex w-full flex-wrap justify-center"
            >
                <DatingRecSuggestionCardNoActionVersion
                    v-for="bookmarked in bookmarkeds"
                    :key="bookmarked.id"
                    :index="1"
                    :info-with-images="{ ...bookmarked, images: [] }"
                />
            </div>
            <div v-else>
                <NResult status="404" title="No data"> </NResult>
            </div>
            <NPagination
                v-if="bookmarkeds.length"
                :page-count="pagination.totalPages"
                :page="pagination.page"
                :page-size="pagination.pageSize"
                size="medium"
                @update-page="pagination.page = $event"
            />
            <SkeletonPagination v-else />
        </div>
    </ClientOnly>
</template>

<style lang="less" scoped></style>
