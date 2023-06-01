<script setup lang="ts">
import {
    useDialog,
    useNotification,
    NInput,
    NSelect,
    NInputNumber,
    NFormItem,
    NForm,
} from 'naive-ui'
import {
    PhUser,
    PhBaby,
    PhUserFocus,
    PhMapPin,
    PhRuler,
    PhUsersThree,
} from 'phosphor-vue'
import { useAreaStore } from '~/store/area'
import { useAuthStore } from '~/store/auth'
import { useProfileStore } from '~/store/profile'
import { Gender } from '~/types/enums/Gender'
const props = defineProps<{
    // no using Pick from UserInformation type because of Vue issue (fixed in 3.3.0 but using 3.2.47 now)
    name: string | null
    gender: string | null
    yearOfBirth: number | null
    height: number | null
    location: string | null
    ethnicity: string | null
}>()

const informationRecords = computed(() => [
    {
        title: 'Full Name',
        content: props.name,
        iconComponent: PhUser,
    },
    {
        title: 'Gender',
        content: props.gender,
        iconComponent: PhUserFocus,
    },
    {
        title: 'Year of birth',
        content: props.yearOfBirth,
        iconComponent: PhBaby,
    },
    {
        title: 'Height',
        content: props.height,
        iconComponent: PhRuler,
    },
    {
        title: 'Living in',
        content: props.location?.split(',').slice(-3, -2).toString() ?? '',
        iconComponent: PhMapPin,
    },
    {
        title: 'Ethnicity',
        content: props.ethnicity,
        iconComponent: PhUsersThree,
    },
])

const emits = defineEmits(['update'])

const patchingData = reactive({ ...props })

const profileStore = useProfileStore()
const auth = useAuthStore()
const area = useAreaStore()
const dialog = useDialog()
const notification = useNotification()

const pending = ref(false)

const genderOptions = Object.values(Gender).map((item) => ({
    label: item,
    value: item,
}))
const yearOfBirthOptions = Array.from({ length: 100 }, (_, i) => ({
    label: `${new Date().getFullYear() - i}`,
    value: new Date().getFullYear() - i,
}))

if (props.location?.split(',')[0]) {
    area.fetchDistricts(props.location?.split(',')[0])
}

if (props.location?.split(',')[0]) {
    area.fetchCommunes(props.location?.split(',')[1])
}

const areaCode = reactive({
    province: props.location?.split(',')[0] ?? null,
    district: props.location?.split(',')[1] ?? null,
    commune: props.location?.split(',')[2] ?? null,
})

const provinceOptions = computed(() => area2NaiveOptions(area.provinces))
const districtOptions = computed(() =>
    areaCode.province
        ? area2NaiveOptions(area.listDistrictsByProvinceCode(areaCode.province))
        : []
)
const communeOptions = computed(() =>
    areaCode.district
        ? area2NaiveOptions(area.listCommunesByDistrictCode(areaCode.district))
        : []
)

const locationString = computed(() => {
    if (!areaCode.commune || !areaCode.district || !areaCode.province)
        return patchingData.location
    const commune = area.communeByCode(areaCode.district, areaCode.commune)
    return `${areaCode.province},${areaCode.district},${areaCode.commune},${commune?.province},${commune?.district},${commune?.name}`
})

watch(
    () => areaCode.province,
    (value) => {
        areaCode.district = null
        if (!value) return
        area.fetchDistricts(value)
    }
)

watch(
    () => areaCode.district,
    (value) => {
        areaCode.commune = null
        if (!value) return
        area.fetchCommunes(value)
    }
)

const updateBasicInfo = async (closeModal: () => void) => {
    pending.value = true
    try {
        if (!areaCode.province || !areaCode.district || !areaCode.commune) {
            throw new Error('Please select your location')
        }

        await profileStore.updateProfile({
            username: auth.user.username,
            ...patchingData,
            location: locationString.value ?? patchingData.location,
        })

        emits('update', {
            ...patchingData,
            location: locationString.value ?? patchingData.location,
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
</script>

<template>
    <PageOrgProfileSectionsBaseProfileSectionTable
        title="Basic information"
        :information-records="informationRecords"
    >
        <template #modal="{ title, closeModal, showModal }">
            <PageOrgProfileSectionsBaseModalDialog
                :loading="pending"
                :title="title"
                :show="showModal"
                @close="closeModal"
                @negative-click="closeModal"
                @positive-click="() => updateBasicInfo(closeModal)"
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
                        label="Name"
                        path="name"
                    >
                        <NInput
                            v-model:value="patchingData.name"
                            placeholder="John Doe"
                            :input-props="{ autocomplete: 'off' }"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Gender"
                        label-placement="left"
                        path="gender"
                    >
                        <NSelect
                            v-model:value="patchingData.gender"
                            placeholder="Select your gender"
                            :input-props="{ autocomplete: 'off' }"
                            :options="genderOptions"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Year of birth"
                        label-placement="left"
                        path="gender"
                    >
                        <NSelect
                            v-model:value="patchingData.yearOfBirth"
                            placeholder="Which year were you born?"
                            :input-props="{ autocomplete: 'off' }"
                            :options="yearOfBirthOptions"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Height"
                        path="height"
                    >
                        <NInputNumber
                            v-model:value="patchingData.height"
                            :loading="area.loading"
                            placeholder="170"
                            :input-props="{ autocomplete: 'off' }"
                            @keydown.enter.prevent
                        >
                            <template #suffix>cm</template>
                        </NInputNumber>
                    </NFormItem>

                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Province"
                        label-placement="left"
                    >
                        <NSelect
                            v-model:value="areaCode.province"
                            placeholder="Province"
                            :input-props="{ autocomplete: 'off' }"
                            :options="provinceOptions"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="District"
                        label-placement="left"
                    >
                        <NSelect
                            v-model:value="areaCode.district"
                            placeholder="District"
                            :input-props="{ autocomplete: 'off' }"
                            :options="districtOptions"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Commune"
                        label-placement="left"
                    >
                        <NSelect
                            v-model:value="areaCode.commune"
                            placeholder="Commune"
                            :input-props="{ autocomplete: 'off' }"
                            :options="communeOptions"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                </NForm>
            </PageOrgProfileSectionsBaseModalDialog>
        </template>
    </PageOrgProfileSectionsBaseProfileSectionTable>
</template>

<style lang="less" scoped></style>
