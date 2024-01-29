const events = require('events')
const log = require('../pubSub/logger')

const eventEmitter = new events.EventEmitter()

eventEmitter.on('request', (eventData) => {
    console.log('on request - ' + eventData);
})

eventEmitter.emit('request', 'Request emitted')