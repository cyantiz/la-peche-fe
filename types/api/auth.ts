import { Role } from '../enums/Role'

export type LoginRequestBody = {
    username: string
    password: string
}

export type LoginResponse = {
    accessToken: string
    refreshToken: string
}

export type AuthPayload = {
    id: number
    email: string
    name: string
    role: Role
    username: string
    avatarUrl: string
    iat: number
    exp: number
}

export type AuthUser = Omit<AuthPayload, 'iat' | 'exp'>
