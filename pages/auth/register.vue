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
import { RegisterRequestBody } from '@/types/api/auth'
import { useAuthStore } from '~/store/auth'
import { registerFormRules } from '@/utils/validators/auth'
import { useUIStore } from '~/store/ui'

definePageMeta({
    layout: 'auth',
})
useHead({
    title: 'Register | La Pêche',
})

const formRef = ref<FormInst | null>(null)

const form = reactive<RegisterRequestBody>({
    email: '',
    name: '',
    username: '',
    password: '',
})

const pending = ref<boolean>(false)

const { register } = useAuthStore()

const { setNotificationPlacement } = useUIStore()
const loadingBar = useLoadingBar()
const dialog = useDialog()
const notification = useNotification()

async function handleRegisterRequest() {
    try {
        loadingBar.start()
        pending.value = true
        await register({
            ...form,
        })
        loadingBar.finish()
    } catch (error: any) {
        loadingBar.error()
        dialog.error({
            title: 'Register failed',
            content: error?.response?._data.message || 'Unknown error',
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
            handleRegisterRequest()
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
    <div
        class="space-between neu-border-2 neu-shadow-rt-4 flex flex-col rounded-xl px-4 py-12"
    >
        <div>
            <div class="quote mb-6 flex flex-col gap-2">
                <div class="text-4xl font-bold">
                    Start to find <br />
                    your
                    <span class="text-bitter-sweet"> matches </span>
                </div>
            </div>
            <NForm
                ref="formRef"
                :model="form"
                :rules="registerFormRules"
                label-position="top"
                @submit.prevent="submitForm"
            >
                <NFormItem label="Email" path="email" required>
                    <NInput
                        v-model:value="form.email"
                        placeholder="email@domain.com"
                        @keydown.enter.prevent
                    />
                </NFormItem>
                <NFormItem label="Full name" path="name" required>
                    <NInput
                        v-model:value="form.name"
                        placeholder="John Doe"
                        @keydown.enter.prevent
                    />
                </NFormItem>
                <NFormItem label="Username" path="username" required>
                    <NInput
                        v-model:value="form.username"
                        placeholder="@username"
                        @keydown.enter.prevent
                    />
                </NFormItem>
                <NFormItem label="Password" path="password" required>
                    <NInput
                        v-model:value="form.password"
                        type="password"
                        placeholder="∗∗∗∗∗∗"
                        @keydown.enter.prevent
                    />
                </NFormItem>
                <NButton :loading="pending" type="primary" attr-type="submit"
                    >Register</NButton
                >
            </NForm>
            <div class="mt-4 w-full text-base">
                Already have an account?
                <NuxtLink to="/auth/login" class="link-underline"
                    >Back to login</NuxtLink
                >
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped></style>
