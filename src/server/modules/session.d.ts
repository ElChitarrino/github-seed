interface ISession {
    getExpressSession();
    getSession(mongooseConnection, mongoStore);
}
