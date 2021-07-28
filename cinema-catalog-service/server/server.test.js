const test = require('tape');
const server = require('./server');

function apiMock(app, repo) {
    console.log('faz nada')
}

function runTest() {
    test('Server start', (t) => {
        server.start(apiMock, null, (err, server) => {
            t.assert(!err && server, 'Servidor iniciado');
            t.end();
        })
    });

    test('Server stop', (t) => {
        t.assert(server.stop(), 'Servidor parado');
        t.end();
    });
}

module.exports = {
    runTest
}