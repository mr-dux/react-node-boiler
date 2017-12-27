const express = require('express');
const path = require('path');
const fs = require('fs');
const constants = require('./some-directory/constants');

const app = express();

const NODE_ENV = process.env.NODE_ENV;
console.log('NODE_ENV: ' + NODE_ENV);

const serverDir = fs.realpathSync(process.cwd());
const appDirectory = getAppDirectory(NODE_ENV, serverDir);
console.log('App directory: ' + appDirectory);


if (NODE_ENV === "production") {
    app.use(express.static(path.join(appDirectory)));
    app.get('/', function (req, res) {
        res.sendFile(path.join(appDirectory, 'index.html'));
    });
} else {
    const wpPath = path.join(fs.realpathSync('dev_tools/config'),'webpackDevMiddleware');
    console.log("WP middleware paths: " + wpPath);
    const webpackDevMiddleware = require(wpPath);
    app.use(webpackDevMiddleware);
}

app.listen(constants.defPort);
console.log("listen on " + constants.defPort + " port");

function getAppDirectory(nodeEnv, serverDir) {
    switch (nodeEnv) {
        case "production":
            return path.resolve(serverDir, constants.appPaths.prodPath);
        default:
            return path.resolve(serverDir, constants.appPaths.devPath);
    }
}

