interface IRecommendationStoreState {
    numberOfMatches: number
}

export const useRecommendationStore = defineStore({
    id: 'recommendation',
    state: () =>
        ({
            numberOfMatches: 0,
        } as IRecommendationStoreState),
    actions: {
        getRecommendations(
            pageSize = 10
        ): Promise<IUserInformationWithImages[]> {
            return useApiGet('/users/recommended', {
                query: { pageSize },
            })
        },
        getMatcheds(
            page = 1,
            pageSize = 6
        ): Promise<IUserInformationWithImages[]> {
            return useApiGet(`/users/matched?page=${page}&pageSize=${pageSize}`)
        },
        getMatchedCount(): Promise<number> {
            return useApiGet('/users/matched-count')
        },
        getBookmarkeds(
            page = 1,
            pageSize = 6
        ): Promise<IUserInformationWithImages[]> {
            return useApiGet(`/users/starred?page=${page}&pageSize=${pageSize}`)
        },
        getBookmarkedCount(): Promise<number> {
            return useApiGet('/users/starred-count')
        },
    },

    getters: {},
})
