const merge = require('webpack-merge');
const PATHS = require('./configs/PATHS');
const BASE = require('./configs/BASE');

const baseWebpackConfig = require('./webpack.base.conf');

const buildWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        path: PATHS.out,
    },
    optimization: {
        minimize: true, // minimize js
    },
    module: {
        rules: [
            {
                test: /\.(scss|sass)$/,
                use: [
                    {
                        loader: 'sass-loader',
                        options: {
                            prependData: `
                            $assets : "${BASE.prod}/assets";
                            $public : "${BASE.prod}";
                          `,
                        },
                    },
                ],
            },
        ],
    },
});

module.exports = new Promise((resolve, reject) => {
    resolve(buildWebpackConfig);
});
