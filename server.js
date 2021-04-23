// Require the framework and instantiate it
const notepack = require("notepack.io")
const fastify = require('fastify')({ logger: true })

fastify.addContentTypeParser("application/x-msgpack", { parseAs: "buffer" }, (req, body, done) => {
    try {
        const decoded = notepack.decode(body);
        done(null, decoded);
    } catch (err) {
        console.error(err);
        done(err);
    }
});

// Declare a route
fastify.get('/', async (request, reply) => {
  return notepack.encode({ hello: 'world' })
})


// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()