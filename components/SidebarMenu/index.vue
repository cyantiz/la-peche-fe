<script setup lang="ts">
import { MenuOption, NMenu } from 'naive-ui'
import {
    PhMagnifyingGlass,
    PhHeart,
    PhChatCenteredDots,
    PhStar,
    PhUser,
} from 'phosphor-vue'

const props = withDefaults(
    defineProps<{
        collapsed: boolean
    }>(),
    {
        collapsed: false,
    }
)

const router = useRouter()

const menuOptions: MenuOption[] = [
    {
        label: 'Explore',
        key: 'index',
        icon: () => h(PhMagnifyingGlass, { weight: 'fill' }),
    },
    {
        label: 'Matches',
        key: 'matches',
        icon: () => h(PhHeart, { weight: 'fill' }),
    },
    {
        label: 'Messages',
        key: 'messages',
        icon: () => h(PhChatCenteredDots, { weight: 'fill' }),
    },
    {
        label: 'Bookmarks',
        key: 'bookmarks',
        icon: () => h(PhStar, { weight: 'fill' }),
    },
    {
        label: 'Profile',
        key: 'profile',
        icon: () => h(PhUser, { weight: 'fill' }),
    },
]

function onItemSelect(name: string) {
    router.push({ name })
}

function renderLabel(option: MenuOption) {
    return h(resolveComponent('nuxt-link'), {
        to: {
            name: option.key?.toString(),
        },
        innerHTML: option.label,
    })
}

function expandIcon() {
    return h(
        PhMagnifyingGlass,
        {
            weight: 'fill',
        },
        {
            default: () => h(PhMagnifyingGlass, { weight: 'fill' }),
        }
    )
}
</script>

<template>
    <div class="flex flex-col gap-8 pt-8">
        <div class="info flex w-full flex-col items-center gap-3">
            <Avatar :size="collapsed ? 40 : 192" />
            <div v-if="!collapsed" class="text">
                <div class="w-48 text-lg font-bold">Kurt Cobain</div>
                <div>Seattle, WA, United States</div>
            </div>
            <div v-if="!collapsed" class="statistic flex w-48 gap-3">
                <div class="like flex-1">
                    <div
                        class="number text-base font-semibold text-bitter-sweet"
                    >
                        888
                    </div>
                    <div class="font-medium text-inactive">Likes</div>
                </div>
                <div class="matches flex-1">
                    <div
                        class="number text-base font-semibold text-bitter-sweet"
                    >
                        88
                    </div>
                    <div class="font-medium text-inactive">Matches</div>
                </div>
            </div>
        </div>
        <NMenu
            :collapsed="props.collapsed"
            :options="menuOptions"
            :expand-icon="expandIcon"
            :render-label="renderLabel"
            :on-update-value="onItemSelect"
            :value="$route.name?.toString()"
            :icon-size="24"
            :collapsed-icon-size="24"
            :collapsed-width="64"
        />
    </div>
</template>

<style lang="less">
.n-menu .n-menu-item-content .n-menu-item-content-header a {
    @apply font-medium;
}
.n-menu-item-content__icon {
    margin-right: 16px !important;
}
.n-menu .n-menu-item-content .n-menu-item-content__icon {
    @apply text-inactive;
}
</style>
