type CloudinaryUploadResponse = {
    asset_id: string
    public_id: string
    version: number
    version_id: string
    width: number
    height: number
    format: string
    resource_type: string
    created_at: string
    tags: string[]
    bytes: number
    type: string
    etag: string
    placeholder: boolean
    url: string
    secure_url: string
    access_mode: string
    original_filename: string
    original_extension: string
}

export default function useCloudinary() {
    const upload = async (file: File, folderName: string) => {
        const runtimeConfig = useRuntimeConfig()
        const cloudName: string = runtimeConfig.public.cloudinaryName
        const cloudPreset: string = runtimeConfig.public.cloudinaryPreset
        const cloudFolder: string = runtimeConfig.public.cloudinaryFolder

        if (!cloudName || !cloudPreset)
            throw new Error('Cant not upload due to connection error')

        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', cloudPreset)
        formData.append('folder', `${cloudFolder}${folderName}`)
        return await $fetch<CloudinaryUploadResponse>(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        )
    }

    return {
        upload,
    }
}
