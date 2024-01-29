const fs = require('fs')
const zlib = require('zlib')

// const readWriteStream =fs.readWriteStream()

const readStream = fs.createReadStream('./data/input.txt', { encoding: 'utf-8', highWaterMark: 1000 })
const writeStream = fs.createWriteStream('./data/transform.txt', 'utf-8')

const gzipTransformStream = zlib.createGzip()

readStream.pipe(gzipTransformStream).pipe(writeStream)