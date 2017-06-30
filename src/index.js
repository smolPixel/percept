/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
//const port = app.get('port');
const server = app.listen('3000');
//I'm not sure to understand here why we need app.get('port') what even is the module port I can't 
//find any ref of it on the web

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info(`Feathers application started on ${app.get('host')}`)
);
 
