// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'

export default defineNuxtConfig({
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
        head: {
            meta: [{ name: 'naive-ui-style' }, { name: 'vueuc-style' }],
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
})
