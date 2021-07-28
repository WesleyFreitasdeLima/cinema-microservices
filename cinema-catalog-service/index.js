require('dotenv-safe').config({example: __dirname + '/.env.example'});
const cinemaCatalog = require('./api/cinema-catalog');
const server = require('./server/server');
const repository = require('./repository/repository');

server.start(cinemaCatalog, repository, (err, app) => {
    console.log('Servidor em execução')
});