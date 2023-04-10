<script setup lang="ts">
import { NDivider, NForm, NFormItem, NInput, NButton } from 'naive-ui'
import { LoginData } from '@/types/auth'
import { useAuthStore } from '~/store/auth'
import { loginFormRules } from '@/utils/validators/auth'

definePageMeta({
    layout: 'auth',
})
useHead({
    title: 'Login',
})

const form = reactive<LoginData>({
    username: '',
    password: '',
})

const { login } = useAuthStore()

async function submitForm() {
    await login({
        ...form,
    })
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
        <NButton type="primary" attr-type="submit">Login</NButton>
    </NForm>
    <NDivider> Or </NDivider>
    <LoginWithGoogleButton @click="loginWithGoogle" />
</template>

<style lang="less" scoped></style>
