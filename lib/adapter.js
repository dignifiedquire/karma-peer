;(function (window) {
  'use strict'

  var socket = window.__karma__.socket

  window.peer = {
    socket: window.__karma__.socket,
    ready: function (done) {
      socket.once('/peer/browsersready', () => {
        done()
      })
      socket.emit('/peer/ready')
    },
    done: function () {
      socket.removeAllListeners('/peer/msg')
    },
    send: function (msg) {
      socket.emit('/peer/msg', Object.assign({}, {
        id: socket.id
      }, msg))
    }
  }
})(window)
