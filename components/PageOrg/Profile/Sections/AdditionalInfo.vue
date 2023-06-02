<script setup lang="ts">
import { useDialog, useNotification, NSelect, NFormItem, NForm } from 'naive-ui'
import {
    PhTranslate,
    PhBaby,
    PhDog,
    PhLeaf,
    PhFire,
    PhMartini,
    PhForkKnife,
    PhMoonStars,
} from 'phosphor-vue'
import { useAuthStore } from '~/store/auth'
import { useProfileStore } from '~/store/profile'
import { Pet } from '~/types/enums/Pet'
import { Zodiac } from '~/types/enums/Zodiac'
import { Frequency } from '~/types/enums/Frequency'
import { Diet } from '~/types/enums/Diet'
import { Offspring } from '~/types/enums/Offspring'
const props = defineProps<{
    // no using Pick from UserInformation type because of Vue issue (fixed in 3.3.0 but using 3.2.47 now)
    speaks: string | null
    offspring: string | null
    pets: string | null
    sign: string | null
    drugs: string | null
    smokes: string | null
    diet: string | null
    drinks: string | null
}>()

const informationRecords = computed(() => [
    {
        title: 'Speaks',
        content: props.speaks,
        iconComponent: PhTranslate,
    },
    {
        title: 'Offspring',
        content: props.offspring,
        iconComponent: PhBaby,
    },
    {
        title: 'Pets',
        content: props.pets,
        iconComponent: PhDog,
    },
    {
        title: 'Sign',
        content: props.sign,
        iconComponent: PhMoonStars,
    },
    {
        title: 'Drugs',
        content: props.drugs,
        iconComponent: PhLeaf,
    },
    {
        title: 'Smokes',
        content: props.smokes,
        iconComponent: PhFire,
    },
    {
        title: 'Diet',
        content: props.diet,
        iconComponent: PhForkKnife,
    },
    {
        title: 'Drinks',
        content: props.drinks,
        iconComponent: PhMartini,
    },
])
const emits = defineEmits(['update'])

const patchingData = reactive({ ...props, speaks: props.speaks?.split(', ') })

const profileStore = useProfileStore()
const auth = useAuthStore()
const dialog = useDialog()
const notification = useNotification()
const pending = ref(false)

const updateAdditionalInfo = async (closeModal: () => void) => {
    pending.value = true
    try {
        await profileStore.updateProfile({
            username: auth.user.username,
            ...patchingData,
            speaks: patchingData.speaks?.join(', '),
        })

        emits('update', {
            ...patchingData,
            speaks: patchingData.speaks?.join(', '),
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

const languageOptions = array2NaiveOptions(languages)
const petsOptions = array2NaiveOptions(Object.values(Pet))
const zodiacOptions = array2NaiveOptions(Object.values(Zodiac))
const frequencyOptions = array2NaiveOptions(Object.values(Frequency))
const dietOptions = array2NaiveOptions(Object.values(Diet))
const offspringOptions = array2NaiveOptions(Object.values(Offspring))
</script>

<template>
    <PageOrgProfileSectionsBaseProfileSectionTable
        title="Additional information"
        :information-records="informationRecords"
    >
        <template #modal="{ title, closeModal, showModal }">
            <PageOrgProfileSectionsBaseModalDialog
                :loading="pending"
                :title="title"
                :show="showModal"
                @close="closeModal"
                @negative-click="closeModal"
                @positive-click="updateAdditionalInfo(closeModal)"
            >
                <NForm
                    class="flex flex-col gap-2"
                    :model="patchingData"
                    label-placement="left"
                    label-width="120px"
                    label-align="left"
                    @submit.prevent="updateAdditionalInfo(closeModal)"
                >
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Speaks"
                        path="speaks"
                    >
                        <NSelect
                            v-model:value="patchingData.speaks"
                            :options="languageOptions"
                            placeholder="Select your language"
                            filterable
                            multiple
                            :input-props="{ autocomplete: 'off' }"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Pets"
                        label-placement="left"
                        path="gender"
                    >
                        <NSelect
                            v-model:value="patchingData.pets"
                            placeholder="Select pet"
                            :input-props="{ autocomplete: 'off' }"
                            :options="petsOptions"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Offspring"
                        label-placement="left"
                        path="sign"
                    >
                        <NSelect
                            v-model:value="patchingData.offspring"
                            placeholder="Please Select"
                            :input-props="{ autocomplete: 'off' }"
                            :options="offspringOptions"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Zodiac"
                        label-placement="left"
                        path="sign"
                    >
                        <NSelect
                            v-model:value="patchingData.sign"
                            placeholder="Select your sign"
                            :input-props="{ autocomplete: 'off' }"
                            :options="zodiacOptions"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Drugs"
                        label-placement="left"
                        path="drugs"
                    >
                        <NSelect
                            v-model:value="patchingData.drugs"
                            placeholder="Please select"
                            :input-props="{ autocomplete: 'off' }"
                            :options="frequencyOptions"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Smokes"
                        label-placement="left"
                        path="smokes"
                    >
                        <NSelect
                            v-model:value="patchingData.smokes"
                            placeholder="Please select"
                            :input-props="{ autocomplete: 'off' }"
                            :options="frequencyOptions"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Diet"
                        label-placement="left"
                        path="diet"
                    >
                        <NSelect
                            v-model:value="patchingData.diet"
                            placeholder="Select your diet"
                            :input-props="{ autocomplete: 'off' }"
                            :options="dietOptions"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Drinks"
                        label-placement="left"
                        path="drinks"
                    >
                        <NSelect
                            v-model:value="patchingData.drinks"
                            placeholder="Please select"
                            :input-props="{ autocomplete: 'off' }"
                            :options="frequencyOptions"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                </NForm>
            </PageOrgProfileSectionsBaseModalDialog>
        </template>
    </PageOrgProfileSectionsBaseProfileSectionTable>
</template>

<style lang="less" scoped></style>
