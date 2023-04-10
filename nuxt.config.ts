// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
    ssr: true,

    modules: [
        'nuxt-icon',
        '@vueuse/nuxt',
        [
            '@pinia/nuxt',
            {
                autoImports: [
                    // automatically imports `defineStore`
                    'defineStore', // import { defineStore } from 'pinia'
                    // automatically imports `defineStore` as `definePiniaStore`
                    ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
                ],
            },
        ],
    ],

    css: ['@/assets/css/main.less'],

    postcss: {
        plugins: {
            tailwindcss: {
                config: resolve(__dirname, 'tailwind.config.ts'),
            },
            autoprefixer: {},
        },
    },

    alias: {
        '@@': resolve(__dirname, 'pages'),
        '~~': resolve(__dirname, 'components'),
    },

    app: {
        __buildAssetsURL: '/_nuxt/',
        head: {
            meta: [{ name: 'naive-ui-style' }, { name: 'vueuc-style' }],
            link: [
                {
                    rel: 'preconnect',
                    href: 'https://fonts.googleapis.com',
                },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com',
                    crossorigin: '',
                },
                {
                    href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
                    rel: 'stylesheet',
                },
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    href: '/_nuxt/assets/favicon.ico',
                },
            ],
        },
    },

    // naive ui config for ssr
    build: {
        transpile:
            process.env.NODE_ENV === 'production'
                ? [
                      'naive-ui',
                      'vueuc',
                      '@css-render/vue3-ssr',
                      '@juggle/resize-observer',
                  ]
                : ['@juggle/resize-observer'],
    },

    vite: {
        optimizeDeps: {
            include:
                process.env.NODE_ENV === 'development'
                    ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
                    : [],
        },
    },
}

export default config
