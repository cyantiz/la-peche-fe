<script setup lang="ts">
import { PhBriefcase, PhGraduationCap, PhMoney } from 'phosphor-vue'
const props = defineProps<{
    // no using Pick from UserInformation type because of Vue issue (fixed in 3.3.0 but using 3.2.47 now)
    job: string | null
    income: number | null
    education: string | null
}>()

const informationRecords = [
    {
        title: 'University',
        content: props.education,
        iconComponent: PhGraduationCap,
    },
    {
        title: 'Job',
        content: props.job?.split(',').join(' at ') ?? props.job,
        iconComponent: PhBriefcase,
    },
    {
        title: 'Income',
        content: props.income,
        iconComponent: PhMoney,
    },
]
</script>

<template>
    <PageOrgProfileSectionsBaseProfileSectionTable
        title="Job and Education"
        :information-records="informationRecords"
    >
        <template #modal="{ title, closeModal, showModal }">
            <PageOrgProfileSectionsBaseModalDialog
                :loading="true"
                :title="title"
                :show="showModal"
                @close="closeModal"
                @negative-click="closeModal"
            >
                job and edu modal
            </PageOrgProfileSectionsBaseModalDialog>
        </template>
    </PageOrgProfileSectionsBaseProfileSectionTable>
</template>

<style lang="less" scoped></style>
