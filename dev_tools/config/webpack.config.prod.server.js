const paths = require('./paths');
const path = require('path');
const webpack = require('webpack');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getClientEnvironment = require('./env');

const publicPath = paths.servedPath;
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
    throw new Error('Production builds must have NODE_ENV=production.');
}

module.exports = {
    bail: true,
    entry: paths.serverStartJs,
    output: {
        path: paths.serverBuild,
        filename: paths.serverBundleName
    },
    target: "node",
    resolve: {
        modules: ['node_modules', paths.appNodeModules].concat(
            process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
        ),
        extensions: ['.js', '.json'],
        plugins: [
            new ModuleScopePlugin(paths.serverSrc, [paths.appPackageJson]),
        ],
    },
    context: paths.serverSrc,

    module: {
        strictExportPresence: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify("production")
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ]
};
