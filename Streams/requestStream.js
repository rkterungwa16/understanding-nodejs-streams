const request = require('request')

request('https://fettblog.eu').pipe(process.stdout)
