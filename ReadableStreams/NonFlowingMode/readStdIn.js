/* eslint-disable no-cond-assign */

/**
 * Attach a listener for the 'readable' event that
 * signal the availability of new data to read.
 */
process.stdin.on('readable', () => {
  // Readall the data until the internal buffer is emptied

  // read() method synchronously reads from the internal
  // buffers and returns a Buffer or String object
  // representing a chunk of data

  // read() method is a synchronous operation that
  // pulls a data chunk from the internal buffers of the
  // Readable stream
  let chunk
  while (chunk = process.stdin.read()) {
    console.log(
      `Chunk read: (${chunk.length}) "${
        chunk.toString()}"`
    )
  }
})
process.stdin.on('end', () => {
  process.stdout.write('End of stream')
})
