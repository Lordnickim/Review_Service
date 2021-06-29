import { FastifyRegister } from "fastify";
import { Knex } from 'knex';

const fastify = require('fastify')({
  logger: {
    level: 'info',
    prettyPrint: true,
  },
});
const fp: FastifyRegister = require('fastify-plugin');
const db: Knex = require('./db/');
const Reviews = require('./reviews/service');

async function decorateFastifyInstance(): Promise<void> {
  const reviews = new Reviews(db);
  fastify.decorate('reviews', reviews);
}

fastify
  .register(fp(decorateFastifyInstance))
  .register(require('./reviews'), { prefix: '/reviews' });

fastify.listen(3000)
  .then((address: string) => console.log('listening on ', address))
  .catch((err: ErrorEvent) => {
    console.log('error starting server', err);
    process.exit(1);
  });
