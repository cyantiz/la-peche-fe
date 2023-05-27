interface IRecommendationStoreState {}

export const useRecommendationStore = defineStore({
    id: 'recommendation',
    state: () => ({} as IRecommendationStoreState),
    actions: {
        getRecommendations(
            pageSize = 10
        ): Promise<IUserInformationWithImages[]> {
            return useApiGet('/users/recommended', {
                query: { pageSize },
            })
        },
    },

    getters: {},
})
