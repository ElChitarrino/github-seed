let expressSession = require('express-session');

class Session implements ISession {
    public get() {
        return expressSession({
            secret: process.env.SESSION_SECRET,
            saveUninitialized: true,
            resave: false,
            cookie: {
                maxAge: 20 * 365 * 24 * 60 * 60 * 1000
            }
        });
    }
}

export = new Session;
