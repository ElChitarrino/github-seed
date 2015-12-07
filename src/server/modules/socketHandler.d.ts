interface ISocketHandler {
    initialize(io);
    getOnlineUsers(req: Express.Request, res: Express.Response);
}

interface IResponse {
    value: Object;
}
