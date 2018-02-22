const express = require('express');
const path = require('path');
const fs = require('fs');
const constants = require('./config');
const proxy = require('http-proxy-middleware');
const historyFallback = require('connect-history-api-fallback');

const app = express();

const ENV = process.env;
const PORT = ENV.PORT ? ENV.PORT : constants.defPort;
const NODE_ENV = ENV.NODE_ENV;
console.log('NODE_ENV: ' + NODE_ENV);

const serverDir = fs.realpathSync(process.cwd());
const appDirectory = getAppDirectory(NODE_ENV, serverDir);
console.log('App directory: ' + appDirectory);

app.use('/api', proxy(constants.proxyOptions));
app.use(historyFallback());

if (NODE_ENV === "production") {
    app.use(express.static(path.join(appDirectory)));
    app.use('/^', function (req, res) {
        res.sendFile(path.join(appDirectory, 'index.html'));
    });
} else {
    const wpPath = path.join(fs.realpathSync('dev_tools/config'), 'webpackDevMiddleware');
    console.log("WP middleware paths: " + wpPath);
    console.log("Compiling app...");
    const webpackDevMiddleware = require(wpPath);
    app.use(webpackDevMiddleware);
}

app.listen(PORT);
console.log("listen on " + PORT + " port");

function getAppDirectory(nodeEnv, serverDir) {
    switch (nodeEnv) {
        case "production":
            return path.resolve(serverDir, constants.appPaths.prodPath);
        default:
            return path.resolve(serverDir, constants.appPaths.devPath);
    }
}

