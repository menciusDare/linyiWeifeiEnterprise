'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')


module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/api/regulatory/':{
         target: 'http://10.0.200.90:8016/', //test
//    target: 'http://10.0.205.152:8016/',//zhijie

//   target:  'http://10.0.205.230:8016/',//xi chuang 
                // http://10.0.200.106:8870/
            //    target: 'http://10.0.200.90:8006/',//
  
            //   target: 'http://10.0.205.102:8016/',//zhijie
            //   target: 'http://10.0.205.235:8016/',
                // target: 'http://10.0.200.106:8860/',
                // target: 'http://10.0.205.134:8006/',//pengfei
                changeOrigin:true,
                pathRewrite:{
                    '^/api/regulatory/': ''
                }
            },
            // '/api/enterprise/':{
            //     // target: 'http://10.0.200.90:8098/',
            //     // target: 'http://localhost:8007/',
            //     // target: 'http://10.0.205.112:8007',//pengfei
            //   changeOrigin:true,
            //   pathRewrite:{
            //     '^/api/enterprise/': ''
            //   }
            // },
            "/api/permissions/": {
                //   target: 'http://10.0.200.90:8016/', //test
                // target: 'http://10.0.205.126:8003', // suzhuang
                changeOrigin: true,
                pathRewrite: {
                    "^/api/permissions/": "",
                },
            },
            // "/api/provincial/": {
            //     target: 'http://10.0.205.235:8017',
            //     changeOrigin: true,
            //     pathRewrite: {
            //         "^/api/provincial/": "",
            //     },
            // },
            '/api/': {
            //    target: 'http://10.0.200.90:8016/', //test
                //target: 'http://localhost:8006/',
            //  target: 'http://10.0.200.90:8016/',
           target: 'http://10.0.200.90:8098/',//
                // target: 'http://10.0.200.90:8098/',//dev
                //  target: 'http://59.110.152.155:8098/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api/': ''
                }
            },
        },

        // Various Dev Server settings
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: true,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',

        /**
         * Source Maps
         */

        productionSourceMap: false,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}
