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

export interface UploadImageDTO {
    url: string
    isThumbnail: boolean
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
        addImage(payload: UploadImageDTO) {
            // check if url is valid (start with https://res.cloudinary.com and include lapeche)
            const { url } = payload
            const config = useRuntimeConfig()
            const preset = config.public.cloudinaryPreset
            if (
                !url.startsWith('https://res.cloudinary.com') ||
                !url.includes(preset)
            )
                return

            return useApiPost<IImage>('/users/images', {
                body: payload,
            })
        },
    },

    getters: {},
})
