'use strict'

const path = require('path')

function peerFramework (
  /* config.files */ files,
  /* config.peer */ peerConfig,
  /* config.browsers */ browserConfig,
  /* config.customLaunchers */ customLaunchers,
  launcher,
  socketServer,
  logger,
  injector,
  emitter
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
  let ids = {}
  let counter = 0
  let expectedBrowsers = browserConfig.length

  emitter.on('browser_complete', () => {
    log.info('browser finished')
    browsersReady--
    expectedBrowsers--
  })

  sockets.on('connection', (socket) => {
    ids[socket.id] = counter
    counter++

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

    socket.on('/peer/id/get', () => {
      socket.emit('/peer/id', {id: ids[socket.id]})
    })

    // Spawn browsers dynamically
    socket.on('/peer/spawn', (msg) => {
      log.info('Spawning')

      browserConfig.push(msg.browser)

      expectedBrowsers++
      injector.invoke(launcher.launchSingle, launcher)(msg.browser, true)
    })

    // Ensure all browsers are ready and have started
    // their test run
    socket.on('/peer/ready', (msg) => {
      browsersReady++

      if (browsersReady === expectedBrowsers) {
        browsersReady = 0
        log.info('All browsers ready')
        sockets.emit('/peer/browsersready')
      }
    })
  })
}

module.exports = peerFramework
