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
</script>

<template>
    <div class="space-between flex flex-col">
        <div>
            <div class="quote mb-6 flex flex-col gap-2">
                <div class="text-4xl font-bold">
                    Start to find <br />
                    your
                    <span class="text-bitter-sweet"> matches </span>
                </div>
                <div class="text-sm font-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec sollicitudin nunc sagittis pulvinar luctus. Proin
                    accumsan venenatis tempor. Ut lectus mauris, suscipit eu
                    dictum sed, feugiat id velit.
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
                        placeholder="abc@domain.com"
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
        </div>
    </div>
</template>

<style lang="less" scoped></style>
