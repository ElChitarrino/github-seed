class SocketHandler implements ISocketHandler {
    private sockets: Object = {};
    private users: Object = {};

    public initialize(io) {
        io.on('connection', (socket) => {
            if (!socket.handshake.session.passport || !socket.handshake.session.passport.user) {
                return;
            }
            // copy user, delete token and attach to socket
            let user = JSON.parse(JSON.stringify(socket.handshake.session.passport.user));
            delete user.token;
            socket.user = user;
            socket.login = socket.user.login;

            if (typeof this.sockets[socket.login] === 'undefined') {
                this.sockets[socket.login] = socket;
            }

            if (typeof this.users[socket.login] === 'undefined') {
                this.users[socket.login] = socket.user;
                console.log('emit update users');
                io.emit('update', 'user');
            }

            socket.on('disconnect', () => {
                if (typeof this.users[socket.login] !== 'undefined') {
                    delete this.users[socket.login];
                    io.emit('update', 'user');
                }
                if (typeof this.sockets[socket.login] !== 'undefined') {
                    delete this.sockets[socket.login];
                }
            });
        });
    }

    public getOnlineUsers(req, res) {
        res.status(200).send(this.users);
    }
}

export = new SocketHandler;
