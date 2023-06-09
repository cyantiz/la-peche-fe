<script setup lang="ts">
import { NSelect, useDialog, useNotification } from 'naive-ui'
import {
    PhEye,
    PhHeart,
    PhSmileyBlank,
    PhUserFocus,
    PhHandWaving,
    PhConfetti,
    PhStarHalf,
    PhStar,
} from 'phosphor-vue'
import { useAuthStore } from '~/store/auth'
import { useProfileStore } from '~/store/profile'
import { Orientation } from '~/types/enums/Orientation'
import { RelationshipGoalOption } from '~/types/enums/RelationshipGoal'

const emits = defineEmits(['update'])
const props = defineProps<{
    // no using Pick from UserInformation type because of Vue issue (fixed in 3.3.0 but using 3.2.47 now)
    orientation: string | null
    relationshipGoal: string | null
}>()

const patchingOrientation = ref(props.orientation)
const patchingRelationshipGoal = ref(props.relationshipGoal)

const informationRecords = computed(() => [
    {
        title: 'Orientation',
        content: props.orientation,
        iconComponent: PhUserFocus,
    },
    {
        title: 'Relationship Goal',
        content: props.relationshipGoal,
        iconComponent: PhEye,
    },
])

const profileStore = useProfileStore()
const auth = useAuthStore()
const dialog = useDialog()
const notification = useNotification()

const pending = ref(false)

const updateRelationshipGoal = async (closeModal: () => void) => {
    pending.value = true
    try {
        await profileStore.updateProfile({
            username: auth.user.username,
            orientation: patchingOrientation.value ?? '',
            // relationshipGoal: patchingRelationshipGoal.value ?? '',
        })

        emits('update', {
            orientation: patchingOrientation.value ?? '',
        })

        notification.success({
            title: 'Success',
            content: 'Biographic updated',
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

const orientationOptions = Object.values(Orientation).map((item) => ({
    label: item,
    value: item,
}))

const RelationShipGoalIcon = {
    [RelationshipGoalOption.LongTerm]: PhHeart,
    [RelationshipGoalOption.LongTermOpenToShort]: PhStar,
    [RelationshipGoalOption.ShortTermOpenToLong]: PhStarHalf,
    [RelationshipGoalOption.ShortTermFun]: PhConfetti,
    [RelationshipGoalOption.NewFriends]: PhHandWaving,
    [RelationshipGoalOption.StillFiguringItOut]: PhSmileyBlank,
}
</script>

<template>
    <ProfileSectionsBaseProfileSectionTable
        title="Relationship goals"
        :information-records="informationRecords"
    >
        <template #modal="{ title, closeModal, showModal }">
            <ProfileSectionsBaseModalDialog
                :loading="pending"
                :title="title"
                :show="showModal"
                @close="closeModal"
                @negative-click="closeModal"
                @positive-click="updateRelationshipGoal(closeModal)"
            >
                <p class="mb-1 text-center text-lg font-bold">
                    Sexual Orientation
                </p>
                <NSelect
                    v-model:value="patchingOrientation"
                    :options="orientationOptions"
                ></NSelect>

                <p class="mb-1 mt-4 text-center text-lg font-bold">
                    Right now I'm looking for...
                </p>
                <div class="grid grid-cols-3 grid-rows-2 gap-2 md:w-[600px]">
                    <RelationshipGoalSelection
                        v-for="option in Object.values(RelationshipGoalOption)"
                        :key="option"
                        :title="option"
                        :icon="RelationShipGoalIcon[option]"
                        :active="patchingRelationshipGoal === option"
                        @select="patchingRelationshipGoal = option"
                    />
                </div>
            </ProfileSectionsBaseModalDialog>
        </template>
    </ProfileSectionsBaseProfileSectionTable>
</template>

<style lang="less" scoped></style>
