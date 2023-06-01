import { Role } from './enums/Role'

declare global {
    interface IUser {
        id: number
        username: string | null
        cluster: number | null
        isActivated: boolean | null
        isDeleted: boolean | null
        verifyAt: Date | null
        premiumEndsAt: Date | null
        createdAt: Date | null
        updatedAt: Date | null
        lastOnline: Date | null
        role: Role | null
        name: string | null
        gender: string | null
        status: string | null
        orientation: string | null
        biographic: string | null
        email: string | null
        phoneNumber: string | null
        yearOfBirth: number | null
        bodyType: string | null
        diet: string | null
        drinks: string | null
        drugs: string | null
        education: string | null
        ethnicity: string | null
        height: number | null
        income: number | null
        job: string | null
        location: string | null
        offspring: string | null
        pets: string | null
        sign: string | null
        smokes: string | null
        speaks: string | null
    }

    type IUserInformation = Omit<
        IUser,
        | 'username'
        | 'cluster'
        | 'isActivated'
        | 'isDeleted'
        | 'verifyAt'
        | 'premiumEndsAt'
        | 'createdAt'
        | 'updatedAt'
        | 'lastOnline'
        | 'role'
    >

    type IImage = {
        id: string
        url: string
        isThumbnail: boolean
        createdAt: string
        updatedAt: string
    }

    type IUserInformationWithImages = IUserInformation & {
        images: IImage[]
    }

    interface IAreaProvince {
        code: string
        name: string
    }

    interface IAreaDistrict {
        code: string
        name: string
        province: string
    }

    interface IAreaCommune {
        code: string
        name: string
        district: string
        province: string
    }
}
