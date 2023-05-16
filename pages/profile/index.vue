<script setup lang="ts">
import { useLoadingBar } from 'naive-ui'
import { useAuthStore } from '@/store/auth'
import BasicSection from '@/components/page_organism/profile/sections/Basic.vue'
import RelationShipGoalSection from '@/components/page_organism/profile/sections/RelationshipGoal.vue'
import JobAndEducationSection from '@/components/page_organism/profile/sections/JobAndEducation.vue'
import AdditionalInfoSection from '@/components/page_organism/profile/sections/AdditionalInfo.vue'
import BiographicSection from '@/components/page_organism/profile/sections/Biographic.vue'
import ImagesSection from '@/components/page_organism/profile/sections/Images/index.vue'
defineProps<{}>()

const { user } = useAuthStore()

// test asyncData
const { data, pending, error } = await useAsyncData<UserInformation>(() => {
    return useApiGet<UserInformation>(`/users/info/${user.username}`)
})

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
            class="profile-sections flex w-full flex-col justify-between gap-4 xl:flex-row"
        >
            <div class="flex w-full flex-col items-center gap-4">
                <BiographicSection :biographic="data.biographic" />
                <ImagesSection />
            </div>

            <div class="flex w-full flex-col items-center gap-4">
                <BasicSection
                    :name="data.name"
                    :gender="data.gender"
                    :year-of-birth="data.yearOfBirth"
                    :height="data.height"
                    :location="data.location"
                    :ethnicity="data.ethnicity"
                />

                <RelationShipGoalSection
                    :orientation="data.orientation"
                    :relationship-goal="'Long-term partner'"
                />

                <JobAndEducationSection
                    :job="data.job"
                    :education="data.education"
                    :income="data.income"
                />

                <AdditionalInfoSection
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
        </div>
    </div>
</template>

<style lang="less" scoped></style>
