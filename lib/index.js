'use strict'

const path = require('path')

function peerFramework (
  /* config.files */ files,
  /* config.peer */ peerConfig,
  /* config.browsers */ browserConfig,
  socketServer,
  logger
) {
  const log = logger.create('peer')

  files.unshift({
    pattern: path.resolve(__dirname, 'adapter.js'),
    included: true,
    served: true,
    watched: true // false
  })

  let browsersReady = 0
  const sockets = socketServer.sockets

  sockets.on('connection', (socket) => {
    const types = [
      '/peer/msg'
    ]

    types.forEach((type) => {
      socket.on(type, (msg) => {
        if (msg.target) {
          socket.in(`/#${msg.target}`).emit(type, msg)
        } else {
          socket.broadcast.emit(type, msg)
        }
      })
    })

    // Ensure all browsers are ready and have started
    // their test run
    socket.on('/peer/ready', (msg) => {
      browsersReady++
      log.debug('ready', msg)

      if (browsersReady === browserConfig.length) {
        browsersReady = 0
        log.debug('emitting ready')
        sockets.emit('/peer/browsersready')
      }
    })
  })
}

module.exports = peerFramework
