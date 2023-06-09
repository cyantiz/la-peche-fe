interface IAreaStoreDistricts {
    province_code: string
    list: IAreaDistrict[]
}

interface IAreaStoreCommunes {
    district_code: string
    list: IAreaCommune[]
}

export const useAreaStore = defineStore('area', {
    state: () => ({
        provinces: [] as IAreaProvince[],
        districts: [] as IAreaStoreDistricts[],
        communes: [] as IAreaStoreCommunes[],
        loading: false,
    }),
    getters: {
        provinceNameByCode: (state) => (code: string) => {
            const province = state.provinces.find((item) => item.code === code)
            return province?.name
        },
        provinceByCode: (state) => (code: string) => {
            const province = state.provinces.find((item) => item.code === code)
            return province
        },
        districtByCode:
            (state) => (provinceCode: string, districtCode: string) => {
                const district = state.districts
                    .find((item) => item.province_code === provinceCode)
                    ?.list.find((item) => item.code === districtCode)
                return district
            },
        communeByCode:
            (state) => (districtCode: string, communeCode: string) => {
                const commune = state.communes
                    .find((item) => item.district_code === districtCode)
                    ?.list.find((item) => item.code === communeCode)
                return commune
            },
        listDistrictsByProvinceCode: (state) => (code: string) => {
            const districts = state.districts.find(
                (item) => item.province_code === code
            )
            return districts?.list ?? []
        },
        listCommunesByDistrictCode: (state) => (code: string) => {
            const communes = state.communes.find(
                (item) => item.district_code === code
            )
            return communes?.list ?? []
        },
    },
    actions: {
        init() {
            const provinces = localStorage.getItem('provinces')
            const districts = localStorage.getItem('districts')
            const communes = localStorage.getItem('communes')
            if (provinces) this.provinces = JSON.parse(provinces)
            else {
                this.fetchProvinces()
            }
            if (districts) this.districts = JSON.parse(districts)
            if (communes) this.communes = JSON.parse(communes)
        },
        async fetchProvinces() {
            if (this.provinces.length) return
            try {
                this.loading = true
                const data = await $fetch<{
                    status: string
                    results: IAreaProvince[]
                }>('https://api.mysupership.vn/v1/partner/areas/province')
                this.provinces = data.results
                this.updateLocalStorage()
            } catch (error: any) {
                // handle fetch area error
            } finally {
                this.loading = false
            }
        },
        async fetchDistricts(provinceCode: string) {
            if (
                this.districts.find(
                    (item) => item.province_code === provinceCode
                )
            )
                return
            try {
                this.loading = true
                const data = await $fetch<{
                    status: string
                    results: IAreaDistrict[]
                }>(
                    `https://api.mysupership.vn/v1/partner/areas/district?province=${provinceCode}`
                )
                const districts = {
                    province_code: provinceCode,
                    list: data.results,
                }
                this.districts.push(districts)
                this.updateLocalStorage()
            } catch (error: any) {
                // handle fetch area error
            } finally {
                this.loading = false
            }
        },
        async fetchCommunes(districtCode: string) {
            if (
                this.communes.find(
                    (item) => item.district_code === districtCode
                )
            )
                return
            try {
                this.loading = true

                const data = await $fetch<{
                    status: string
                    results: IAreaCommune[]
                }>(
                    `https://api.mysupership.vn/v1/partner/areas/commune?district=${districtCode}`
                )
                const communes = {
                    district_code: districtCode,
                    list: data.results,
                }
                this.communes.push(communes)
            } catch (error: any) {
                // handle fetch area error
            } finally {
                this.loading = false
            }
        },
        updateLocalStorage() {
            localStorage.setItem('provinces', JSON.stringify(this.provinces))
            localStorage.setItem('districts', JSON.stringify(this.districts))
            localStorage.setItem('communes', JSON.stringify(this.communes))
        },
    },
})
