const fs = require('fs')
const zlib = require('zlib')

const filePath = process.argv[2]

/**
 * Read a file from path 'filePath'
 * After the file is fully read into a buffer 'readFileBuffer'
 * Compress the read file into a buffer
 * After the file is fully compressed in a gzipBuffer
 * write the compressed buffer into a file path 'filePath'
 *
 * Buffer api is sequential: One operation must start before the next
 */
fs.readFile(filePath, (readFileErr, readFileBuffer) => {
  if (readFileErr) {
    throw readFileErr
  }
  zlib.gzip(readFileBuffer, (gzipErr, gzipBuffer) => {
    if (gzipErr) {
      throw gzipErr
    }
    fs.writeFile(`${filePath}.gz`, gzipBuffer, (writeFileErr) => {
      if (writeFileErr) {
        throw writeFileErr
      }
      console.log('File successfully compressed')
    })
  })
})
