/* eslint-env mocha */
'use strict'

const expect = require('chai').expect

const peer = window.peer

describe('peer', function () {
  this.timeout(50000)

  it('should work', (done) => {
    peer.on((id, msg) => {
      console.log('got', id, msg)
      expect(msg).to.be.eql('hello')
      done()
    })
    peer.send('hello')
  })
})
