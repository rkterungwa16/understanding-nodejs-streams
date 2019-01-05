const fs = require('fs')
const zlib = require('zlib')

const filePath = process.argv[2]

/**
 * Create a read stream for a file in 'filePath'
 * For each chunk of file recieved pipe to a compression stream
 * Then pipe the compressed chunk stream to a write stream to a file path
 */
fs.createReadStream(filePath)
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream(`${filePath}.gz`))
  .on('finish', () => {
    console.log('File successfully compressed')
  })
