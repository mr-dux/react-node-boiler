'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

const appDirectory = fs.realpathSync(process.cwd());
const envPublicUrl = process.env.PUBLIC_URL;

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

function ensureSlash(path, needsSlash) {
    const hasSlash = path.endsWith('/');
    if (hasSlash && !needsSlash) {
        return path.substr(path, path.length - 1);
    } else if (!hasSlash && needsSlash) {
        return `${path}/`;
    } else {
        return path;
    }
}

const getPublicUrl = appPackageJson =>{
   return envPublicUrl || require(appPackageJson).homepage};

function getServedPath(appPackageJson) {
    const publicUrl = getPublicUrl(appPackageJson);
    const servedUrl =
        envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
    return ensureSlash(servedUrl, true);
}

module.exports = {
    //app
    appBuild: resolveApp('build/app'),
    appIndexJs: resolveApp('app/src/index.js'),
    servedPath: getServedPath(resolveApp('package.json')),
    appSrc: resolveApp('app/src'),
    appHtml: resolveApp('app/public/index.html'),
    appPublic: resolveApp('app/public'),
    publicUrl: getPublicUrl(resolveApp('package.json')),
    testsSetup: resolveApp('src/setupTests.js'),
    //server
    serverStartJs: resolveApp('server/server.js'),
    serverBuild: resolveApp('build/server'),
    serverSrc: resolveApp('server'),
    serverBundleName: 'server.js',
    //all
    appPackageJson: resolveApp('package.json'),
    appNodeModules: resolveApp('node_modules'),
    yarnLockFile: resolveApp('yarn.lock'),
    dotenv: resolveApp('.env'),
};
