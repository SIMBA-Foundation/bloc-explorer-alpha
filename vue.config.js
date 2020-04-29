const path = require('path');
const webpack = require('webpack');

module.exports = {
    publicPath: process.env.NODE_ENV == 'production' ? '/' :  '/',
    devServer: {
        open: process.platform === 'darwin',
        host: '127.0.0.1',
        port: 8089,
        https: false,
        hotOnly: false,
    },
    transpileDependencies: [
      /\bvue-echarts\b/,
      /\bresize-detector\b/
    ],
    configureWebpack: {
          resolve: {
            alias: {
                Api: path.resolve(__dirname, 'src/api/'),
                Components: path.resolve(__dirname, 'src/components/'),
                Constants: path.resolve(__dirname, 'src/constants/'),
                Container: path.resolve(__dirname, 'src/container/'),
                Views: path.resolve(__dirname, 'src/views/'),
                Helpers: path.resolve(__dirname, 'src/helpers/'),
                Themes: path.resolve(__dirname, 'src/themes/')
            },
            extensions: ['*', '.js', '.vue', '.json']
        },
        plugins: [
              //jquery plugin
            new webpack.ProvidePlugin({
                $: 'jquery',
                jquery: 'jquery',
                'window.jQuery': 'jquery',
                jQuery: 'jquery'
            })
        ]
    }
}