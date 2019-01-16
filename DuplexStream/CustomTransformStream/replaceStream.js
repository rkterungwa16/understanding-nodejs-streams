const stream = require('stream')

/**
 * Transform duplex stream replaces
 * all the occurrence of a given string
 */
class ReplaceStream extends stream.Transform {
  /**
   *
   * @param {String} searchString string to match
   * @param {String} replaceString string to be used as
   * replacement
   */
  constructor (searchString, replaceString) {
    super()
    this.searchString = searchString
    this.replaceString = replaceString
    this.tailPiece = ''
  }

  /**
   * Search and replace a string in a buffer
   * Search and replace a string when data is streaming
   * - possible matches might be distributed across
   *   multiple chunks
   *
   * Similar to write() but does not write
   * data to underlying resource
   * It pushes data into the internal buffer using this.push()
   * @param {String} chunk
   * @param {String} encoding
   * @param {Function} callback
   *
   * @return {*} null
   */
  _transform (chunk, encoding, callback) {

    // Split the chunk using the searchString as separator
    const pieces = (this.tailPiece + chunk)
      .split(this.searchString)
    // Take the last item in the array just generated
    const lastPiece = pieces[pieces.length - 1]
    const tailPieceLen = this.searchString.length - 1

    this.tailPiece = lastPiece.slice(-tailPieceLen)
    pieces[pieces.length - 1] = lastPiece.slice(0, -tailPieceLen)

    this.push(pieces.join(this.replaceString))
    callback()
  }

  /**
   * @param {Function} callback
   *
   * @return {*} null
   */
  _flush (callback) {
    this.push(this.tailPiece)
    callback()
  }
}


module.exports = ReplaceStream
