<script setup lang="ts">
import { PhBriefcase, PhGraduationCap, PhMoney } from 'phosphor-vue'
import {
    useDialog,
    useNotification,
    NForm,
    NFormItem,
    NInput,
    NInputNumber,
} from 'naive-ui'
import { useAuthStore } from '~/store/auth'
import { useProfileStore } from '~/store/profile'
// import { Income } from '~/types/enums/Income'
const props = defineProps<{
    // no using Pick from UserInformation type because of Vue issue (fixed in 3.3.0 but using 3.2.47 now)
    job: string | null
    income: number | null
    education: string | null
}>()
const emits = defineEmits(['update'])

const informationRecords = computed(() => [
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
        content: '$ ' + props.income,
        iconComponent: PhMoney,
    },
])

const patchingData = reactive({ ...props })

const profileStore = useProfileStore()
const auth = useAuthStore()
const dialog = useDialog()
const notification = useNotification()

const pending = ref(false)

const updateBasicInfo = async (closeModal: () => void) => {
    pending.value = true
    try {
        await profileStore.updateProfile({
            username: auth.user.username,
            ...patchingData,
        })

        emits('update', {
            ...patchingData,
        })
        notification.success({
            title: 'Success',
            content: 'Basic information updated',
            duration: 2000,
        })
        closeModal()
    } catch (error: any) {
        dialog.error({
            title: 'Error',
            content: getErrorMessage(error),
            positiveText: 'Okay',
        })
    } finally {
        pending.value = false
    }
}

// const incomeOptions = array2NaiveOptions(Object.values(Income))
</script>

<template>
    <PageOrgProfileSectionsBaseProfileSectionTable
        title="Job and Education"
        :information-records="informationRecords"
    >
        <template #modal="{ title, closeModal, showModal }">
            <PageOrgProfileSectionsBaseModalDialog
                :loading="pending"
                :title="title"
                :show="showModal"
                @close="closeModal"
                @negative-click="closeModal"
                @positive-click="updateBasicInfo(closeModal)"
            >
                <NForm
                    class="flex flex-col gap-2"
                    :model="patchingData"
                    label-placement="left"
                    label-width="120px"
                    label-align="left"
                    @submit.prevent="updateBasicInfo(closeModal)"
                    @keydown.enter.prevent="updateBasicInfo(closeModal)"
                >
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Job title"
                        path="job"
                    >
                        <NInput
                            v-model:value="patchingData.job"
                            placeholder="E.g. Software Engineer"
                            :input-props="{ autocomplete: 'off' }"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="University"
                        path="education"
                    >
                        <NInput
                            v-model:value="patchingData.education"
                            placeholder="E.g. Harvard University"
                            :input-props="{ autocomplete: 'off' }"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Income"
                        label-placement="left"
                        placeholder="Income"
                        path="income"
                    >
                        <!-- <NSelect
                            v-model:value="patchingData.income"
                            placeholder="Select your income"
                            :input-props="{ autocomplete: 'off' }"
                            :options="incomeOptions"
                            @keydown.enter.prevent
                        /> -->
                        <NInputNumber
                            v-model:value="patchingData.income"
                            :min="0"
                            placeholder="Income"
                            :input-props="{ autocomplete: 'off' }"
                            @keydown.enter.prevent
                        >
                            <template #prefix> $ </template>
                        </NInputNumber>
                    </NFormItem>
                </NForm>
            </PageOrgProfileSectionsBaseModalDialog>
        </template>
    </PageOrgProfileSectionsBaseProfileSectionTable>
</template>

<style lang="less" scoped></style>
