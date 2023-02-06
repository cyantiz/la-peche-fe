export const useCounterStore = defineStore({
    id: 'counter',
    state: () => {
        return {
            count: 0,
        }
    },
    actions: {
        increment() {
            this.count++
        },
    },

    getters: {},
})
