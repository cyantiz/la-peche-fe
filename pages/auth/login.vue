<script setup lang="ts">
import {
    NDivider,
    NForm,
    NFormItem,
    FormRules,
    NInput,
    NButton,
} from 'naive-ui'

const form = reactive({
    email: '',
    password: '',
})

const rules: FormRules = {
    email: [
        { required: true, message: 'Please enter your email', trigger: 'blur' },
        {
            type: 'email',
            message: 'Please enter a valid email address',
            trigger: ['blur', 'change'],
        },
    ],
    password: [
        {
            required: true,
            message: 'Please enter your password',
            trigger: 'blur',
        },
        {
            min: 6,
            max: 32,
            message: 'Password length should be between 6 and 32 characters',
            trigger: 'blur',
        },
    ],
}

function submitForm() {
    // console.log('Form submitted:', { ...form })
}

function loginWithGoogle() {
    // console.log('Login with Google')
}

defineProps<{}>()
definePageMeta({
    layout: 'auth',
})
</script>

<template>
    <div class="mb-6 text-4xl font-bold">Welcome back!</div>
    <NForm
        :model="form"
        :rules="rules"
        label-position="top"
        @submit.prevent="submitForm"
    >
        <NFormItem label="Email" path="email" required>
            <NInput v-model:value="form.email" placeholder="Email" />
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
