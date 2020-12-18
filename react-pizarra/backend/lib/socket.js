const io = require('socket.io');
const users = require('./users');

/**
 * Initialize when a connection is made
 * @param {SocketIO.Socket} socket
 */
function initSocket(socket) {
  let id;
  socket
    .on('init', async (user) => {
      await users.create(socket, user);
      socket.emit('init', { id: user });
    })
    .on('request', (data) => {
      const receiver = users.get(data.to);
      if (receiver) {
        receiver.emit('request', { from: data.from });
      }
    })
    .on('call', (data) => {
      const receiver = users.get(data.to);
      if (receiver) {
        receiver.emit('call', { ...data, from: data.from });
      } else {
        socket.emit('failed');
      }
    })
    .on('end', (data) => {
      const receiver = users.get(data.to);
      if (receiver) {
        receiver.emit('end');
      }
    })
    /*.on('disconnect', () => {
      users.remove(socket.id);
      console.log(user, 'disconnected');
    });*/
}

module.exports = (server) => {
  io({ path: '/bridge', serveClient: false })
    .listen(server, { log: true })
    .on('connection', initSocket);
};
