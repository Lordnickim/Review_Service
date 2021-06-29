import { FastifyRegister } from 'fastify';
import { Knex } from 'knex';

const fastify = require('fastify')({
  logger: {
    level: 'info',
    prettyPrint: true,
  },
});
const fp: FastifyRegister = require('fastify-plugin');
const db: Knex = require('./db');
const Reviews = require('./reviews/service');

async function decorateFastifyInstance(): Promise<void> {
  const reviews = new Reviews(db);
  fastify.decorate('reviews', reviews);
}

fastify.get('/loaderio-9ee76fa756f5763e5e7b57e2b19af2bf/', (req, reply) => {
  reply.send('loaderio-9c92b2210fc2c3b1db84778c3ad2ad6f');
});

fastify
  .register(fp(decorateFastifyInstance))
  .register(require('./reviews'), { prefix: '/reviews' });

fastify.listen(3000)
  .then((address: string) => console.log('listening on ', address))
  .catch((err: ErrorEvent) => {
    console.log('error starting server', err);
    process.exit(1);
  });
