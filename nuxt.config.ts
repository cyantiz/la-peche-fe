// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
import { defineNuxtConfig } from 'nuxt/config'

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
        // [
        //     '@nuxtjs/sentry',
        //     {
        //         /*
        //          * Sentry module configuration
        //          */
        //     },
        // ],
    ],

    css: [
        '@/assets/css/main.less',
        '@/assets/css/colors.less',
        '@/assets/css/neu_brutalism.less',
    ],

    postcss: {
        plugins: {
            tailwindcss: {
                config: resolve(__dirname, 'tailwind.config.ts'),
            },
            autoprefixer: {},
        },
    },

    plugins: [
        {
            src: '~/plugins/nuxt-loading.ts',
            mode: 'client',
        },
    ],

    alias: {
        '@@': resolve(__dirname, 'pages'),
        '~~': resolve(__dirname, 'components'),
    },

    app: {
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
                    href: 'ttps://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
                    rel: 'stylesheet',
                },
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    href: '/favicon.ico',
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

    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
            ENV: process.env.ENV,
        },
    },

    // vite: {
    // optimizeDeps: {
    //     include:
    //         process.env.NODE_ENV === 'development'
    //             ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
    //             : [],
    // },
    // },
})
