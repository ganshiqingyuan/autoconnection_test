const autocannon = require('autocannon')
const notepack = require("notepack.io")

autocannon({
  url: 'http://localhost:3000',
  connections: 1, //default
  amount: 1,
  pipelining: 1, // default
  duration: 10, // default
  requests:[
      {
          path: '/',
          setupRequest: function (client) {
//             client.body = notepack.encode({
//                 a:123
//             })
            return client
          },
          onResponse: function (status,body, context) {
            const decodeStr = notepack.decode(body);
            console.log(decodeStr)
            context.hello = decodeStr.hello
          }
      }
  ]
}, console.log)
