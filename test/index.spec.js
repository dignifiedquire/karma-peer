/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
const peer = window.peer
const socket = peer.socket

function plan (count, done) {
  return () => {
    count--
    console.log('  Finish ' + count)
    if (count === 0) {
      done()
    }
  }
}

describe('peer', function () {
  this.timeout(5000)

  it('should work', (done) => {
    const finish = plan(3, done)
    const msgId = Math.random()

    socket.on('/peer/browsersready', () => {
      console.log('  browsersready', socket.id)

      console.log('  Sending sum')
      socket.emit('/peer/msg', {
        id: socket.id,
        msgId: msgId,
        method: 'sum',
        args: [1, 2]
      })
      finish()
    })

    socket.on('/peer/msg', (msg) => {
      console.log('  Recieved msg')
      if (msg.method === 'sum') {
        console.log('  Recieved msg sum')
        const result = msg.args[0] + msg.args[1]

        socket.emit('/peer/msg', {
          id: socket.id,
          msgId: msg.msgId,
          target: msg.id,
          result: result
        })

        finish()
      }

      if (msg.result && msg.msgId === msgId) {
        console.log('  Recieved msg result')
        expect(msg.result).to.be.eql(3)
        finish()
      }
    })

    // socket.emit('/peer/ready', {id: socket.id})
  })
})
