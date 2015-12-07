let expressSession = require('express-session');

class Session implements ISession {
    public getExpressSession() {
        return expressSession;
    }

    public getSession(mongooseConnection, mongoStore) {
        return expressSession({
            secret: process.env.SESSION_SECRET,
            saveUninitialized: true,
            resave: false,
            cookie: {
                maxAge: 20 * 365 * 24 * 60 * 60 * 1000
            },
            store: new mongoStore({
                mongooseConnection: mongooseConnection,
                collection : 'loginSession'
            })
        });
    }
}

export = new Session;
