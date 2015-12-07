import * as http from 'http';
import * as path from 'path';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

let sharedSession = require('express-socket.io-session');
let pageSwitch = require('./modules/pageSwitch');
let githubAuthentication = require('./modules/githubAuthentication');
let githubApi = require('./modules/githubApi');

// constants
const SRC = '../../src/client';
const DIST = '../../dist/client';
const NPM = '../../node_modules';

// load certificates
require('./modules/certs').loadCertificates(path.join(__dirname, '../../certs'));

// db connection
mongoose.connect(process.env.MONGODB, { server: { socketOptions: { keepAlive: 1 } } });

// express setup
let app = express();
let myCookieParser = cookieParser();
let session = require('./modules/session');
let mongoStore = require('connect-mongo')(session.getExpressSession());
let mySession = session.getSession(mongoose.connection, mongoStore);
app.use(bodyParser.json(), myCookieParser, mySession, githubAuthentication.initialize(), githubAuthentication.session());
app.get('/auth/github', (req, res, next) => githubAuthentication.checkReturnTo(req, res, next), githubAuthentication.authenticate());
app.get('/auth/callback', githubAuthentication.callback());
app.get('/auth/logout', (req, res, next) => githubAuthentication.logout(req, res, next));

// static files
app.use('/client', express.static(path.join(__dirname, SRC)), express.static(path.join(__dirname, DIST)));
app.use('/node_modules', express.static(path.join(__dirname, NPM)));

// serve main page
app.get('/', (req, res) => pageSwitch.get(req, res, path.join(__dirname, SRC, 'login.html'), path.join(__dirname, SRC, 'main.html')));

// apis
app.get('/following', (req, res) => githubApi.following(req, res));

// start server
let server = http.createServer(app).listen(4000);

// start socket connection
let io = require('socket.io')(server);
io.use(sharedSession(mySession, myCookieParser));
