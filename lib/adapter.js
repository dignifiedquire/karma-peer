;(function (window) {
  'use strict'

  window.peer = {}

  function setupPeer (karma) {
    const socket = karma.socket
    const listeners = {
      ready: [],
      message: []
    }

    window.peer.on = function (name, cb) {
      listeners[name].push(cb)
    }

    socket.on('/peer/server/msg', (msg) => {
      if (msg.id === socket.id) return
      console.log('got msg from', msg.id, msg.data)

      listeners.forEach((cb) => {
        console.log('calling listener')
        cb(msg.id, msg.data)
      })
    })

    window.peer.send = function (msg) {
      socket.emit('/peer/client/msg', {
        id: socket.id,
        data: msg
      })
    }
  }

  setupPeer(window.__karma__)
})(window)
