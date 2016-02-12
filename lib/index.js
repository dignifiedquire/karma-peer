'use strict'

const path = require('path')

function peerFramework (
  /* config.files */ files,
  /* config.peer */ peerConfig,
  socketServer
) {

  files.unshift({
    pattern: path.resolve(__dirname, 'adapter.js'),
    included: true,
    served: true,
    watched: true // false
  })
  const sockets = socketServer.sockets
  sockets.on('connection', (socket) => {
    socket.on('/peer/client/msg', (msg) => {
      socket.broadcast.emit('/peer/server/msg', msg)
    })
  })
}

module.exports = peerFramework
