<script lang="ts" setup>
import {
    NDivider,
    NForm,
    NFormItem,
    NInput,
    NButton,
    useLoadingBar,
    useDialog,
} from 'naive-ui'
import { LoginRequestBody } from '@/types/api/auth'
import { useAuthStore } from '~/store/auth'
import { loginFormRules } from '@/utils/validators/auth'

definePageMeta({
    layout: 'auth',
})
useHead({
    title: 'Login',
})

const form = reactive<LoginRequestBody>({
    username: '',
    password: '',
})

const pending = ref<boolean>(false)

const { login } = useAuthStore()

const loadingBar = useLoadingBar()
const dialog = useDialog()

async function submitForm() {
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

function loginWithGoogle() {
    // console.log('Login with Google')
}
</script>

<template>
    <div class="mb-6 text-4xl font-bold">Welcome back!</div>
    <NForm
        :model="form"
        :rules="loginFormRules"
        label-position="top"
        @submit.prevent="submitForm"
    >
        <NFormItem label="Username" path="username" required>
            <NInput v-model:value="form.username" placeholder="Username" />
        </NFormItem>
        <NFormItem label="Password" path="password" required>
            <NInput
                v-model:value="form.password"
                type="password"
                placeholder="Password"
            />
        </NFormItem>
        <NButton :loading="pending" type="primary" attr-type="submit"
            >Login</NButton
        >
    </NForm>
    <NDivider> Or </NDivider>
    <LoginWithGoogleButton @click="loginWithGoogle" />
</template>

<style lang="less" scoped></style>
