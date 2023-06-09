<script setup lang="ts">
import { PhWaves, PhFlowerLotus } from 'phosphor-vue'
import ThemeOptionVue from './ThemeOption.vue'
import { Color, ThemeOption } from '~/theme/config'

const theme = useColorMode({
    attribute: 'theme',
    modes: ThemeOption,
})

const setTheme = (option: ThemeOption) => {
    theme.value = option
}
</script>

<template>
    <div
        class="custom-shadow flex gap-2 rounded-lg border border-solid border-gray-200 bg-white p-4"
    >
        <ThemeOptionVue
            :active="theme === ThemeOption.Ocean"
            text="Ocean"
            :theme-color="Color.Ocean"
            :text-color="Color.AlmostWhite"
            @click.stop="setTheme(ThemeOption.Ocean)"
        >
            <template #icon="{ size }">
                <PhWaves :size="size" weight="fill" />
            </template>
        </ThemeOptionVue>
        <ThemeOptionVue
            :active="theme === ThemeOption.BitterSweet"
            text="Bitter Sweet"
            :theme-color="Color.BitterSweet"
            :text-color="Color.RaisinBlack"
            @click.stop="setTheme(ThemeOption.BitterSweet)"
        >
            <template #icon="{ size }">
                <PhFlowerLotus :size="size" weight="fill" />
            </template>
        </ThemeOptionVue>
    </div>
</template>

<style lang="less" scoped>
.custom-shadow {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
