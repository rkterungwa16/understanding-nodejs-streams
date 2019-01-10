process.stdin
  .on('readable', () => {
    const chunk = process.stdin.read()
    console.log('New data available')
    while ((chunk) !== null) {
      console.log(
        `Chunk read: (${chunk.length}) "${
          chunk.toString()}"`
      )
    }
  })
  .on('end', () => {
    console.log('end of stream')
    process.stdout.write('End of stream')
  })
