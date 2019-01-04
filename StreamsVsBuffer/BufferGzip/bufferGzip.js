const fs = require('fs')
const zlib = require('zlib')

const file = process.argv[2]

fs.readFile(file, (readFileErr, readFileBuffer) => {
  if (readFileErr) {
    throw readFileErr
  }
  zlib.gzip(readFileBuffer, (gzipErr, gzipBuffer) => {
    if (gzipErr) {
      throw gzipErr
    }
    fs.writeFile(`${file}.gz`, gzipBuffer, (writeFileErr) => {
      if (writeFileErr) {
        throw writeFileErr
      }
      console.log('File successfully compressed')
    })
  })
})
