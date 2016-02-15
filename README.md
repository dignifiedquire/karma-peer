# karma-peer

> Test peer to peer communication between browsers using karma.


## API

There is an object `peer` exposed on `window` which gives you the following

* `peer.ready(cb)`: This should be run to ensure all browsers are in sync before each test is started.
* `peer.done`: This should be run after every test to clean up state.
* `peer.send(msg)`: This is used to send a message to all other browsers. `msg` is an object.
* `peer.socket`: The underlying socket.io socket.
