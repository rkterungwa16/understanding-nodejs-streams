const stream = require('stream')
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')

/**
 * Writable stream that saves a string
 * content to a file path
 */
class ToFileStream extends stream.Writable {
  /**
   * Initial parent constructor
   * options.objectMode Ensure stream runs in object mode (true)
   *
   * options.highWaterMark (default 16KB) controls back-pressure
   * limit
   *
   * options.decodeStrings (default to true) enables automatic
   * decoding of strings into binary buffers before passing to
   * the _write() method. This option is ignored in object mode
   */
  constructor () {
    super({ objectMode: true })
  }

  /**
   *
   * @param {String} chunk data chunk
   * @param {String} encoding data encoding
   * @param {Function} callback
   *
   * @return {null|Function} error callback or null
   */
  _write (chunk, encoding, callback) {
    mkdirp(path.dirname(chunk.path), (err) => {
      if (err) {
        return callback(err)
      }
      fs.writeFile(chunk.path, chunk.content, callback)
    })
  }
}

module.exports = ToFileStream
