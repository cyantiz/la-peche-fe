import { FormRules } from 'naive-ui'

export const loginFormRules: FormRules = {
    username: [
        {
            required: true,
            message: 'Please enter your username',
            trigger: 'blur',
        },
        {
            min: 6,
            max: 32,
            message: 'Please enter a valid username',
            trigger: 'blur',
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
