const isDev = process.env.NODE_ENV === 'development';
const dataEnv = isDev ? require('./data.dev') : require('./data.prod');
const BASE = require('../../../webpack/configs/base');
const basePath = isDev ? BASE.dev : BASE.prod;
const dataCommon = {
    assets: basePath + '/assets',
    public: basePath + '',
};

module.exports = {
    ...dataCommon,
    ...dataEnv,
};
