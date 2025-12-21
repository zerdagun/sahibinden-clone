
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@pinia/nuxt',
    ],
    css: ['~/assets/style.css'],
    typescript: {
        strict: true
    },
    ssr: false, 

    compatibilityDate: '2025-12-20',

})
