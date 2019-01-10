const fs = require('fs')

const buf = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f])

/**
 * toString() function takes an encoding parameter that tells
 * Node.js how you want to interpret your buffer
 */

// print a buffer to hexadecimal
buf.toString('hex') // 48656c6c6f

// Nodejs supports several encoding for buffers

// Base64 encoding
buf.toString('base64') // SGVsbG8=

// utf8 encoding
buf.toString('utf8') // Hello

// ascii encoding
buf.toString('ascii') // Hello

/**
 * Unless you specify an encoding, Node.js' fs.readFileSync() function returns a buffer.
 */
fs.readFileSync('./test.txt') // <Buffer 54 65 72 75 6e 67 77 61 0d 0a>

// hexadecimal encoding
fs.readFileSync('./test.txt').toString('hex') // 546572756e6777610d0a

// utf8 encoding
fs.readFileSync('./test.txt').toString('utf8') // Terungwa

/**
 * Buffers are similar to arrays:
 * You can take the byte at position 0 or iterate over a buffer using a for/of loop.
 */
// buf[0] === 0x48 true
// for (const v of buf) { console.log(v) } '72 101 108 108 111'
