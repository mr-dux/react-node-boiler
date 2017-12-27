process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

process.on('unhandledRejection', err => {throw err;});

require('../config/env');

const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const {choosePort} = require('react-dev-utils/WebpackDevServerUtils');
const paths = require('../config/paths');

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs, paths.serverStartJs])) {
    process.exit(1);
}

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

choosePort(HOST, DEFAULT_PORT)
    .then(() => {
        const server = require(paths.serverStartJs);

        ['SIGINT', 'SIGTERM'].forEach(function (sig) {
            process.on(sig, function () {
                //server.close();
                process.exit();
            });
        });
    })
    .catch(err => {
        if (err && err.message) {
            console.log(err.message);
        }
        process.exit(1);
    });