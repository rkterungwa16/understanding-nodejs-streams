const http = require('http')
const fs = require('fs')

/**
 * pipe() method is called on the file stream
 * Take the source, and pipe it into a destination
 *
 * call pipe() on the source stream
 * file stream is piped to the HTTP response.
 *
 * Return value of the pipe() method is the destination stream
 * This lets us chain multiple pipe() calls
 */
const server = http.createServer((req, res) => {
  const stream = fs.createReadStream(`${__dirname}/data.txt`)
  stream.pipe(res)
})
server.listen(3000)
