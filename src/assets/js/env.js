const isProd = window.location.host.indexOf('e7friendly') > -1;

module.exports = {
    domain: isProd ? 'https://e7friendly.eden.org.tw' : window.location.host,
    // domain: 'http://e9459eab3953.ngrok.io',
    domain_api: 'https://e7friendly.eden.org.tw',
    cookie_expire: {
        expires: 1, // 一天清除
        path: '',
    },
};
