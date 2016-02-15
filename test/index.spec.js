/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
const SimplePeer = require('simple-peer')
const peer = window.peer
const socket = peer.socket

function plan (count, done) {
  let counter = count
  return () => {
    counter--
    console.log('COUNTER', counter)
    if (counter === 0) {
      done()
    }
  }
}

describe('peer', function () {
  this.timeout(20000)

  beforeEach((done) => {
    peer.ready(done)
  })

  afterEach(() => {
    peer.done()
  })

  it('sum', (done) => {
    const finish = plan(2, done)
    const msgId = Math.random()

    peer.send({
      msgId: msgId,
      method: 'sum',
      args: [1, 2]
    })

    socket.on('/peer/msg', (msg) => {
      console.log('Recieved msg')
      if (msg.method === 'sum') {
        console.log('Recieved msg sum')
        const result = msg.args[0] + msg.args[1]

        peer.send({
          msgId: msg.msgId,
          target: msg.id,
          result: result
        })

        finish()
      }

      if (msg.result && msg.msgId === msgId) {
        console.log('Recieved msg result')
        expect(msg.result).to.be.eql(3)
        finish()
      }
    })
  })

  it('simple webrtc', (done) => {
    console.log('starting webrtc')
    const finish = plan(3, done)

    const isInit = !!window.parent.location.href.match(/Chrome\-1/)
    const p = new SimplePeer({
      initiator: isInit,
      trickle: false
    })

    p.on('error', (err) => {
      console.error(err)
      throw err
    })

    socket.on('/peer/msg', (msg) => {
      console.log('recieved')
      if (msg.method === 'signal') {
        p.signal(msg.data)
      }
    })

    const sendSignal = (data) => {
      console.log('sending')

      peer.send({
        method: 'signal',
        data
      })
    }

    p.on('signal', (data) => {
      sendSignal(data)
      finish()
    })

    p.once('connect', () => {
      console.log('connected, sending')
      // wait for 'connect' event before using the data channel
      p.send('hey peer2, how is it going?')
      finish()
    })

    p.once('data', (data) => {
      // got a data channel message
      console.log('got a message from peer1: ' + data)
      expect(data).to.be.eql('hey peer2, how is it going?')
      finish()
    })
  })
})
