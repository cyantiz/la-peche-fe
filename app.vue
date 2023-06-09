<script lang="ts" setup>
import { useAreaStore } from './store/area'
import { useAuthStore } from './store/auth'
import { useProfileStore } from './store/profile'
import { useNotificationStore } from './store/notification'
import { ThemeOption } from './theme/config'
import ThemeProvider from './theme/ThemeProvider.vue'
defineProps<{}>()

const area = useAreaStore()

if (process.client) {
    area.init()

    if (useAuthStore().user.id) {
        await useProfileStore().init(useAuthStore().user.username)
        await useNotificationStore().init()
    }
}

useColorMode({
    attribute: 'theme',
    modes: ThemeOption,
})
</script>
<template>
    <ThemeProvider>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </ThemeProvider>
</template>
