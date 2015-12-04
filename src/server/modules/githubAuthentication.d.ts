interface IGitHubAuthentication {
    initialize();
    session();
    checkReturnTo(req: any, res: any, next: any);
    callback();
    authenticate();
    logout(req: any, res: any, next: any);
}
