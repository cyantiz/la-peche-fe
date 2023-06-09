interface INotificationStoreState {
    myNotifications: INotification[]
}

export const useNotificationStore = defineStore({
    id: 'notification',
    state: () =>
        ({
            myNotifications: [],
        } as INotificationStoreState),
    actions: {
        async init() {
            const data = await this.getNotifications()
            this.myNotifications = data
        },
        getNotifications() {
            return useApiGet<INotification[]>(`/notifications`)
        },
        markAsRead(id: number) {
            return useApiPut(`/notifications/${id}/read`)
        },
    },

    getters: {},
})
