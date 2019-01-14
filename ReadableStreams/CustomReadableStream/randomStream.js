/* eslint-disable no-useless-constructor */
const stream = require('stream')
const chance = require('chance').Chance()

/**
 * custom stream that generates random strings randomly
 */
class RandomStream extends stream.Readable {
  /**
   *
   * @param {Object} options
   * @param {String|null} options.encoding convert Buffers to Strings
   * @param {Boolean} options.objectMode enables object mode if true
   * @param {String} options.highWaterMark upper limit of the data
   * stored in the internal buffer defaults to 16KB
   */
  constructor (options) {
    super(options)
  }

  /**
   *
   * @param {*} size
   *
   * @return {*} null
   */
  _read (size) {
    // Generate a random string using chance
    const chunk = chance.string()
    console.log(`Pushing chunk of size:${chunk.length}: ${chunk}`)

    // fill the internal buffer with the string using push method
    // if this.push returns false, it means the internal
    // buffer has reached the 'highWaterMark' limit
    this.push(chunk, 'utf8')

    // terminate the stream randomly, with a likelihood
    // of 5 percent, by pushing null into the internal buffer
    // to indicate an EOF situation(end of stream)s
    if (chance.bool({ likelihood: 5 })) {
      this.push(null)
    }
  }
}

module.exports = RandomStream
