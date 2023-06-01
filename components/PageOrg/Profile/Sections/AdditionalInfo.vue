<script setup lang="ts">
import {
    PhTranslate,
    PhBaby,
    PhDog,
    PhSmileyWink,
    PhLeaf,
    PhFire,
    PhMartini,
    PhForkKnife,
} from 'phosphor-vue'
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

const informationRecords = [
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
        iconComponent: PhSmileyWink,
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
]
</script>

<template>
    <PageOrgProfileSectionsBaseProfileSectionTable
        title="Additional information"
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
                addition info modal
            </PageOrgProfileSectionsBaseModalDialog>
        </template>
    </PageOrgProfileSectionsBaseProfileSectionTable>
</template>

<style lang="less" scoped></style>
