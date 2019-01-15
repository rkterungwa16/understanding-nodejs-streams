const chance = require('chance').Chance()
require('http').createServer((req, res) => {
  // Write the head of the http response
  res.writeHead(200, { 'Content-Type': 'text/plain' })

  // Start a loop that terminates with a likelihood of 5%
  while (chance.bool({ likelihood: 95 })) {
    // Write random string into the stream
    res.write(`${chance.string()}\n`)
  }

  // Once the loop terminates, call end on the stream
  // indicating that no more data will be written
  // Provide a final string to be written into the stream
  // Before ending it.
  res.end('\nThe end...\n')

  // Register a finish event, which will be fired when
  // all the data has been flushed into the underlying socket
  res.on('finish', () => {
    console.log('All data was sent')
  })
}).listen(8080, () => {
  console.log('Listening')
})
