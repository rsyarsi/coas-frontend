"use strict";

const seoConfig = {

    app: {

        head: {

            titleTemplate: 'Yarsi | SIFKGM | %s',

            link: [

                { rel: "icon", type: "image/png", href: "/favicon.ico", },
            ],
        },
    },

    site: {

        name: process.env.NUXT_PUBLIC_APP_NAME || "codebase",
        url: process.env.NUXT_PUBLIC_APP_URL || "http://frontend.localhost",
        defaultLocale: process.env.NUXT_PUBLIC_APP_LANG || "en",
    },
};

export default seoConfig;
