const merge = require('webpack-merge');
const WebpackShellPlugin = require('webpack-shell-plugin');
const PATHS = require('./configs/PATHS');
const BASE = require('./configs/BASE');

const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    output: {
        path: PATHS.dist,
    },
    watch: true,
    plugins: [
        new WebpackShellPlugin({
            onBuildEnd: ['node ./webpack/live-server.js'],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(scss|sass)$/,
                use: [
                    {
                        loader: 'sass-loader',
                        options: {
                            prependData: `
                            $assets : "${BASE.dev}/assets";
                            $public : "${BASE.dev}";
                          `,
                        },
                    },
                ],
            },
        ],
    },
});

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig);
});
