export interface UpdateProfileDTO {
    username: string
    name?: string | null
    gender?: string | null
    status?: string | null
    orientation?: string | null
    biographic?: string | null
    yearOfBirth?: number | null
    bodyType?: string | null
    diet?: string | null
    drinks?: string | null
    drugs?: string | null
    education?: string | null
    ethnicity?: string | null
    height?: number | null
    income?: number | null
    job?: string | null
    location?: string | null
    offspring?: string | null
    pets?: string | null
    sign?: string | null
    smokes?: string | null
    speaks?: string | null
}

interface IProfileStoreState {}

export const useProfileStore = defineStore({
    id: 'profile',
    state: () => ({} as IProfileStoreState),
    actions: {
        updateProfile(payload: UpdateProfileDTO) {
            // get username, and other field (store in profileInfo) from payload
            const { username, ...profileInfo } = payload

            return useApiPut<void>(`/users/${username}`, {
                body: { ...profileInfo },
            })
        },
    },

    getters: {},
})
