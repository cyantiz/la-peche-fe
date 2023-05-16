<script setup lang="ts">
import {
    NDivider,
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
import { LoginRequestBody } from '@/types/api/auth'
import { useAuthStore } from '~/store/auth'
import { loginFormRules } from '@/utils/validators/auth'
import { useUIStore } from '~/store/ui'

definePageMeta({
    layout: 'auth',
})
useHead({
    title: 'Login',
})

const formRef = ref<FormInst | null>(null)

const form = reactive<LoginRequestBody>({
    username: '',
    password: '',
})

const pending = ref<boolean>(false)

const { login } = useAuthStore()

const { setNotificationPlacement } = useUIStore()
const loadingBar = useLoadingBar()
const dialog = useDialog()
const notification = useNotification()

async function handleLoginRequest() {
    try {
        loadingBar.start()
        pending.value = true
        await login({
            ...form,
        })
        loadingBar.finish()
    } catch (error: any) {
        loadingBar.error()
        dialog.error({
            title: 'Login failed',
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
            handleLoginRequest()
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

function loginWithGoogle() {
    // console.log('Login with Google')
}

onMounted(() => {
    if (!process.client) return
    setTimeout(() => loadingBar.finish(), 1)
})
</script>

<template>
    <div class="space-between neu-border-3 flex flex-col rounded-xl px-6 py-12">
        <div>
            <div class="mb-6 text-4xl font-bold">Welcome back!</div>
            <NForm
                ref="formRef"
                :model="form"
                :rules="loginFormRules"
                label-position="top"
                class="flex flex-col gap-0.5"
                auto-complete="false"
                @submit.prevent="submitForm"
            >
                <NFormItem
                    size="large"
                    :show-label="false"
                    path="username"
                    required
                >
                    <NInput
                        v-model:value="form.username"
                        auto-complete="false"
                        placeholder="@username"
                        @keydown.enter.prevent
                    />
                </NFormItem>
                <NFormItem
                    size="large"
                    :show-label="false"
                    path="password"
                    required
                >
                    <NInput
                        v-model:value="form.password"
                        type="password"
                        placeholder="∗∗∗∗∗∗"
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
                    >Login</NButton
                >
            </NForm>
            <NDivider> Or </NDivider>
            <LoginWithGoogleButton @click="loginWithGoogle" />
        </div>

        <div class="mt-12 flex flex-col items-center gap-1">
            <span class="text-base"> Don't have an account yet? </span>
            <NButton
                type="success"
                block
                size="large"
                @click="$router.push('/auth/register')"
            >
                Register now
            </NButton>
        </div>
    </div>
</template>

<style lang="less" scoped></style>
