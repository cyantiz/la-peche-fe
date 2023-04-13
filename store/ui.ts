import { NotificationPlacement } from 'naive-ui'

interface UIState {
    notificationPlacement: NotificationPlacement
}

export const useUIStore = defineStore({
    id: 'ui',
    state: () =>
        ({
            notificationPlacement: 'top-right',
        } as UIState),
    actions: {
        setNotificationPlacement(placement: NotificationPlacement) {
            this.notificationPlacement = placement
        },
    },

    getters: {},
})
