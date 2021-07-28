require('dotenv-safe').config({example: __dirname + '/.env.example'});
const movies = require('./api/movies');
const server = require('./server/server');
const repository = require('./repository/repository');

server.start(movies, repository, (err, app) => {
    console.log('Servidor em execução')
});