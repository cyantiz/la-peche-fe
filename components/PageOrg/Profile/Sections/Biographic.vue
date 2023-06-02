<script setup lang="ts">
import { NInput, useDialog, useNotification } from 'naive-ui'
import { useAuthStore } from '~/store/auth'
import { useProfileStore } from '~/store/profile'

const emits = defineEmits(['update'])
const props = defineProps<{
    biographic: string | null
}>()
const patchingBiographic = ref(props.biographic)

const profileStore = useProfileStore()
const auth = useAuthStore()
const dialog = useDialog()
const notification = useNotification()

const pending = ref(false)

const updateBiographic = async (closeModal: () => void) => {
    pending.value = true
    try {
        await profileStore.updateProfile({
            username: auth.user.username,
            biographic: patchingBiographic.value ?? '',
        })

        emits('update', { biographic: patchingBiographic.value ?? '' })

        closeModal()
        notification.success({
            title: 'Success',
            content: 'Biographic updated',
            duration: 2000,
        })
    } catch (error: any) {
        dialog.error({
            title: 'Error',
            content: error?.response?._data.message || 'Unknown error',
            positiveText: 'Okay',
        })
    } finally {
        pending.value = false
    }
}
</script>

<template>
    <PageOrgProfileSectionsBaseProfileSection block title="Biographic">
        <template #content>
            <p
                v-if="biographic"
                class="max-h-[114px] overflow-y-auto text-center text-base"
            >
                {{ biographic }}
            </p>
            <p v-if="!biographic" class="text-center text-base text-gray-400">
                You have not set biographic yet.
            </p>
        </template>
        <template #modal="{ title, closeModal, showModal }">
            <PageOrgProfileSectionsBaseModalDialog
                :loading="pending ?? false"
                :title="title"
                :show="showModal"
                @close="closeModal"
                @negative-click="closeModal"
                @positive-click="updateBiographic(closeModal)"
            >
                <NInput
                    v-model:value="patchingBiographic"
                    type="textarea"
                    placeholder="Basic Textarea"
                />
            </PageOrgProfileSectionsBaseModalDialog>
        </template>
    </PageOrgProfileSectionsBaseProfileSection>
</template>

<style lang="less" scoped></style>
