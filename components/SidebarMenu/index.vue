<script setup lang="ts">
import { MenuOption, NMenu } from 'naive-ui'
import {
    PhMagnifyingGlass,
    PhHeart,
    PhChatCenteredDots,
    PhStar,
    PhUser,
} from 'phosphor-vue'
import { useAuthStore } from '~/store/auth'
import { useProfileStore } from '~/store/profile'

withDefaults(
    defineProps<{
        collapsed: boolean
    }>(),
    {
        collapsed: false,
    }
)

const router = useRouter()

const auth = useAuthStore()
const profile = useProfileStore()

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
    <div class="flex h-full flex-col p-4 pr-0">
        <div
            class="layout-org flex flex-col gap-8 rounded-lg border-[0.5px] border-solid border-[#E6E8EE] bg-white pt-4"
        >
            <div class="info flex w-full flex-col items-center gap-3">
                <div class="flex overflow-hidden rounded-lg">
                    <Avatar
                        :src="profile.myAvatar?.url"
                        :size="collapsed ? 40 : 192"
                    />
                </div>
                <div v-if="!collapsed" class="text">
                    <div class="w-48 text-lg font-bold">
                        {{ auth.user.name }}
                    </div>
                    <div class="font-medium">@{{ auth.user.username }}</div>
                </div>
                <div v-if="!collapsed" class="statistic flex w-48 gap-3">
                    <div class="statistic__likes flex-1">
                        <div class="text-theme text-base font-semibold">
                            888
                        </div>
                        <div class="font-medium text-black">Likes</div>
                    </div>
                    <div class="statistic__matches flex-1">
                        <div class="text-theme text-base font-semibold">88</div>
                        <div class="font-medium text-black">Matches</div>
                    </div>
                </div>
            </div>
            <NMenu
                :collapsed="collapsed"
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
    </div>
</template>

<style lang="less">
@import url('~/assets/css/neu_brutalism.less');

.n-menu .n-menu-item-content .n-menu-item-content-header a {
    @apply font-medium;
}
.n-menu-item-content__icon {
    margin-right: 16px !important;
}

.n-menu .n-menu-item-content {
    @apply transition-all duration-200;

    &::before {
        transition: all ease-in-out 0.2s;
    }

    &:not(&--selected):hover {
        &::before {
            transform: translateY(-2px);
        }
        transform: translateY(-2px);
        @apply text-bitter-sweet;
    }
}
</style>
