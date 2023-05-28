<script setup lang="ts">
import { useLoadingBar, NButton } from 'naive-ui'
import { PhSparkle } from 'phosphor-vue'
import { useAuthStore } from '@/store/auth'

defineProps<{}>()

const { user } = useAuthStore()

// test asyncData
const { data, pending, error } = await useAsyncData<IUserInformationWithImages>(
    () => {
        return useApiGet<IUserInformationWithImages>(
            `/users/info-with-images/${user.username}`
        )
    }
)

const isShowPreview = ref(false)

const loadingBar = useLoadingBar()
onMounted(() => {
    if (!process.client) return
    setTimeout(() => loadingBar.finish(), 1)
})
</script>

<template>
    <div v-if="error" class="flex h-full w-full items-center justify-center">
        <ErrorResult />
    </div>

    <div v-else-if="pending">
        <h1>Loading...</h1>
    </div>

    <div v-else-if="!data">
        <h1>No data</h1>
    </div>

    <div v-else>
        <div
            class="profile-sections flex w-full flex-col justify-between gap-4 pb-16 xl:flex-row"
        >
            <div class="flex w-full flex-col items-center gap-4">
                <PageOrgProfileSectionsBiographic
                    :biographic="data.biographic"
                />
                <PageOrgProfileSectionsImages />
            </div>

            <div class="flex w-full flex-col items-center gap-4">
                <PageOrgProfileSectionsBasic
                    :name="data.name"
                    :gender="data.gender"
                    :year-of-birth="data.yearOfBirth"
                    :height="data.height"
                    :location="data.location"
                    :ethnicity="data.ethnicity"
                />

                <PageOrgProfileSectionsRelationshipGoal
                    :orientation="data.orientation"
                    :relationship-goal="'Long-term partner'"
                />

                <PageOrgProfileSectionsJobAndEducation
                    :job="data.job"
                    :education="data.education"
                    :income="data.income"
                />

                <PageOrgProfileSectionsAdditionalInfo
                    :speaks="data.speaks"
                    :offspring="data.offspring"
                    :pets="data.pets"
                    :drugs="data.drugs"
                    :smokes="data.smokes"
                    :diet="data.diet"
                    :drinks="data.drinks"
                    :sign="data.sign"
                />
            </div>

            <div class="absolute bottom-0 left-0 right-0 md:p-4">
                <div
                    class="preview-btn-container h-full w-full rounded-lg bg-white p-4"
                >
                    <NButton size="large" block @click="isShowPreview = true">
                        <template #icon>
                            <PhSparkle />
                        </template>
                        Preview
                    </NButton>
                </div>
            </div>

            <Transition name="fade">
                <PreviewMyProfile
                    v-if="data && isShowPreview"
                    :info-with-images="data"
                    @close="isShowPreview = false"
                />
            </Transition>
        </div>
    </div>
</template>

<style lang="less" scoped>
.preview-btn-container {
    // background gradient from white -> transparent
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.5) 20%,
        rgba(255, 255, 255, 0.8) 50%,
        rgba(255, 255, 255, 1) 100%
    );
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
