const path = require('path');
const name = '酒店管理系统';

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    assetsDir: 'static',
    outputDir: 'dist',
    publicPath: './',
    productionSourceMap: false,

    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },

        plugins: []
    },
    devServer: {
        port: 9550,
        open: true,
        before: require('./mock/mock-server.js')
    },
    chainWebpack(config) {
        config.plugin('preload').tap(() => [
            {
                rel: 'preload',
                fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
                include: 'initial'
            }
        ]);
        config.plugins.delete('prefetch');

        // set svg-sprite-loader
        config.module.rule('svg').exclude.add(resolve('src/icons')).end();
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end();

        config.when(process.env.NODE_ENV !== 'development', (config) => {
            config
                .plugin('ScriptExtHtmlWebpackPlugin')
                .after('html')
                .use('script-ext-html-webpack-plugin', [
                    {
                        //runtime 必须与runtimeChunk名称相同。默认为 runtime
                        inline: /runtime\..*\.js$/
                    }
                ])
                .end();
            config.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial' // 仅打包最初依赖的第三方
                    },
                    elementUI: {
                        name: 'chunk-elementUI', // 将elementUI拆分为单个包
                        priority: 20, // 权重需要大于libs和app，否则将被打包到libs或app中
                        test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // 兼容cnpm
                    },
                    commons: {
                        name: 'chunk-commons',
                        test: resolve('src/components'), // can customize your rules
                        minChunks: 3, //  minimum common number
                        priority: 5,
                        reuseExistingChunk: true
                    }
                }
            });
            // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
            config.optimization.runtimeChunk('single');
        });
    }
};
