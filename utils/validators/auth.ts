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
            max: 20,
            pattern: /^[a-zA-Z0-9_]{6,20}$/,
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
            pattern: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
            message: 'Password length should be between 6 and 32 characters',
            trigger: 'blur',
        },
    ],
}

export const registerFormRules: FormRules = {
    email: [
        {
            required: true,
            message: 'Please enter your email',
            trigger: 'blur',
        },
        {
            type: 'email',
            message: 'Please enter a valid email',
            trigger: 'blur',
        },
    ],
    username: [
        {
            required: true,
            message: 'Please enter your username',
            trigger: 'blur',
        },
        {
            min: 6,
            max: 20,
            pattern: /^[a-zA-Z0-9_]{6,20}$/,
            message: 'Please enter a valid username',
            trigger: 'blur',
        },
    ],
    name: [
        {
            required: true,
            message: 'Please enter your name',
            trigger: 'blur',
        },
        {
            min: 6,
            max: 20,
            pattern: /^[A-Za-z]+$/,
            message: 'Please enter a valid name',
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
            pattern: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
            message: 'Password length should be between 6 and 32 characters',
            trigger: 'blur',
        },
    ],
}
