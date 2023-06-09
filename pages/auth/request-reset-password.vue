<script setup lang="ts">
import {
    NForm,
    NFormItem,
    NInput,
    NButton,
    useLoadingBar,
    useDialog,
    FormValidationError,
    FormInst,
    useNotification,
} from 'naive-ui'
import { useAuthStore, RequestResetPasswordDto } from '~/store/auth'
import { requestResetPasswordFromRules } from '@/utils/validators/auth'
import { useUIStore } from '~/store/ui'

definePageMeta({
    layout: 'forgot-password',
})
useHead({
    title: 'Request reset password',
})

const formRef = ref<FormInst | null>(null)
const form = reactive<RequestResetPasswordDto>({
    email: '',
})
const pending = ref<boolean>(false)

const { sendRequestResetPassword } = useAuthStore()
const { setNotificationPlacement } = useUIStore()

const loadingBar = useLoadingBar()
const dialog = useDialog()
const notification = useNotification()

async function handleRequestResetPassword() {
    try {
        loadingBar.start()
        pending.value = true
        await sendRequestResetPassword({
            ...form,
        })
        loadingBar.finish()
        dialog.success({
            title: 'Success!',
            content: 'Please check your email to reset password.',
            positiveText: 'Okay',
            onPositiveClick: () => (location.href = '/auth/login'),
        })
    } catch (error: any) {
        loadingBar.error()
        dialog.error({
            title: 'Failed!',
            content: 'Failed to send request, please try again later.',
            positiveText: 'Okay',
        })
    } finally {
        pending.value = false
    }
}

function submitForm(e: Event) {
    e.preventDefault()

    formRef.value?.validate((errors: FormValidationError[] | undefined) => {
        if (!errors) {
            handleRequestResetPassword()
        } else {
            setNotificationPlacement('top')
            errors.forEach((item) =>
                item.forEach((error) => {
                    notification.error({ title: error.message, duration: 3000 })
                })
            )
        }
    })
}

onMounted(() => {
    if (!process.client) return
    setTimeout(() => loadingBar.finish(), 1)
})
</script>

<template>
    <div>
        <div class="mb-6 text-2xl font-bold lg:text-3xl">
            Forgot <span class="text-green-apple"> password. </span>
        </div>
        <NForm
            ref="formRef"
            :model="form"
            :rules="requestResetPasswordFromRules"
            label-position="top"
            class="flex flex-col gap-0.5"
            @submit.prevent="submitForm"
            @keydown.enter.prevent="submitForm"
        >
            <NFormItem size="large" :show-label="false" path="email" required>
                <NInput
                    v-model:value="form.email"
                    placeholder="your.email@domain.com"
                    :input-props="{ autocomplete: 'off' }"
                    @keydown.enter.prevent
                />
            </NFormItem>
            <NButton
                :loading="pending"
                :disabled="pending"
                type="default"
                attr-type="submit"
                size="large"
                block
                >Request reset password</NButton
            >
        </NForm>
    </div>

    <div class="mt-8 w-full text-base">
        You've just remembered it?
        <NuxtLink to="/auth/login" class="link-underline"
            >Back to login</NuxtLink
        >
    </div>
</template>

<style lang="less" scoped></style>
