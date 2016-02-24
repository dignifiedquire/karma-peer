# karma-peer
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

[![Build Status](https://img.shields.io/travis/dignifiedquire/karma-peer/master.svg?style=flat-square)](https://travis-ci.org/dignifiedquire/karma-peer) [![Dependency Status](https://img.shields.io/david/dignifiedquire/karma-peer.svg?style=flat-square)](https://david-dm.org/dignifiedquire/karma-peer) [![devDependency Status](https://img.shields.io/david/dev/dignifiedquire/karma-peer.svg?style=flat-square)](https://david-dm.org/dignifiedquire/karma-peer#info=devDependencies)

> Test peer to peer communication between browsers using karma.


## API

There is an object `peer` exposed on `window` which gives you the following

* `peer.ready(cb)`: This should be run to ensure all browsers are in sync before each test is started.
* `peer.done`: This should be run after every test to clean up state.
* `peer.send(msg)`: This is used to send a message to all other browsers. `msg` is an object.
* `peer.socket`: The underlying socket.io socket.
* `peer.spawn(name)`: Spawn a new browser with `name`
* `peer.id(cb)`: Get the id of the current browser
