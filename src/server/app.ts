import * as http from "http";
import * as path from "path";
import * as express from "express";

var app = express();

app.use('/', express.static(path.join(__dirname, '..', 'client')));
app.use('/node_modules', express.static(path.join(__dirname, '..', '..', 'node_modules')));

app.all('/*', function(req, res) {
    var filePath;
    if (req.user) {
        filePath = path.join(__dirname, '..', 'client', 'main.html');
    }
    else {
        filePath = path.join(__dirname, '..', 'client', 'login.html');
    }
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    res.status(200).sendFile(filePath);
});

var server = http.createServer(app);
server.listen(4000);
