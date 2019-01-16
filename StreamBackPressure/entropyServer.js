const chance = require('chance').Chance()

require('http').createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })

  /**
   * Produces data at a very high rate, faster
   * than the underlying socket can handle
   * @return {Object} response object
   */
  function generateMore () {
    while (chance.bool({ likelihood: 95 })) {
      const shouldContinue = res.write(
        // size of data chunk is 16KB - 1
        // default highWaterMark limit is 16KB
        chance.string({ length: (16 * 1024) - 1 })
      )
      // After writing a chunk of data to the buffer
      // we check the return value of write.
      // If false is return it means the internal buffer is full
      // and we should top sending more data and exit from
      // the function, and register another cycle of writes
      // for when the drain event is emitted.
      if (!shouldContinue) {
        console.log('Backpressure')
        return res.once('drain', generateMore)
      }
    }
    res.end('\nThe end...\n', () => {
      console.log('All data was sent')
    })
  }

  generateMore()
}).listen(8080, () => {
  console.log('Listening')
})
