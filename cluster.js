/**
 * Created by ryan on 6/21/16.
 */
    //MADE WITH GUIDE https://www.sitepoint.com/how-to-create-a-node-js-cluster-for-speeding-up-your-apps/
const express = require('express');
const app = express();
const port = 3000;
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

//If masterNode
if (cluster.isMaster) {
    console.log(`Cluster creating ${numCPUs} workers`);

    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log(`Worker ${worker.process.pid} online`)
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
        cluster.fork();
    });
} else {

    app.use(express.static('www'));

    app.get('/', function (req, res) {
        res.sendFile(`${__dirname}/www/index.html`)
    });

    app.get('/sample', function (req, res) {
        res.sendFile(`${__dirname}/www/sample.html`)
    });

    app.listen(port, function() {
        console.log(`Process ${process.pid} is listening to all incoming requests on port ${port}`);
    });
}