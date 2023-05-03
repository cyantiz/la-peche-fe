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
    <div
        class="space-between neu-border-2 neu-shadow-rt-4 flex flex-col rounded-xl px-4 py-12"
    >
        <div>
            <div class="mb-6 text-4xl font-bold">Welcome back!</div>
            <NForm
                ref="formRef"
                :model="form"
                :rules="loginFormRules"
                label-position="top"
                @submit.prevent="submitForm"
            >
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
                <NButton
                    :loading="pending"
                    type="primary"
                    attr-type="submit"
                    block
                    >Login</NButton
                >
            </NForm>
            <NDivider> Or </NDivider>
            <LoginWithGoogleButton @click="loginWithGoogle" />
        </div>

        <div class="mt-12 flex flex-col items-center gap-1">
            <span> Don't have an account yet? </span>
            <NButton
                type="success"
                block
                @click="$router.push('/auth/register')"
            >
                Register now
            </NButton>
        </div>
    </div>
</template>

<style lang="less" scoped></style>
