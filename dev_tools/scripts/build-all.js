require('./build-server-prod.js');
console.log("\nServer build complete!\n");

require('./build-app-prod.js');

process.on('unhandledRejection', err => {
    console.log("Build filed");
});