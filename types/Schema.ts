import { Role } from './Role'

export type User = {
    id: number
    username: string
    cluster: number
    isActivated: boolean
    isDeleted: boolean
    verifyAt: Date
    premiumEndsAt: Date
    createdAt: Date
    updatedAt: Date
    lastOnline: Date
    role: Role
    name: string
    gender: string
    status: string
    orientation: string
    biographic: string
    email: string
    phoneNumber: string
    yearOfBirth: number
    bodyType: string
    diet: string
    drinks: string
    drugs: string
    education: string
    ethnicity: string
    height: string
    income: number
    job: string
    location: string
    offspring: string
    pets: string
    sign: string
    smokes: string
    speaks: string
}