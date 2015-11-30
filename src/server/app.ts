///<reference path="../../typings/tsd.d.ts"/>

import * as http from 'http';
import * as path from 'path';
import * as express from 'express';

let app = express();

const SRC = '../../src/client';
const DIST = '../../dist/client';
const NPM = '../../node_modules';

app.use('/client', express.static(path.join(__dirname, DIST)));
app.use('/client', express.static(path.join(__dirname, SRC)));
app.use('/node_modules', express.static(path.join(__dirname, NPM)));

app.get('/', function(req, res, next) {
    let filePath;
    if (req.user) {
        filePath = path.join(__dirname, SRC, 'main.html');
    }
    else {
        filePath = path.join(__dirname, SRC, 'login.html');
    }
    res.status(200).sendFile(filePath);
});

let server = http.createServer(app);
server.listen(4000);
