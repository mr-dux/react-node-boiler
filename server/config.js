const ENV = process.env;

let proxyTarget = 'http://127.0.0.1:8080';

if (ENV.PROXY) proxyTarget = ENV.PROXY;

module.exports = {
    appPaths: {prodPath: '../app', devPath: ''},
    defPort: 3000,
    proxyOptions: {
        context: ['/tasks'],
        target: proxyTarget,
        pathRewrite: {'^/api/' : '/'}
    }
};
