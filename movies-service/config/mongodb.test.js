const tape = require('tape');
const test = require('tape');
const mongodb = require('./mongodb')

function runTest() {
    test('MongoDB connect', (t) => {
        mongodb.connect()
            .then(conn => {
                t.assert(conn, 'Conectado com sucessso');
                t.end();
            })
            .catch(err => {
                t.error(err.message);
            });
    })

    test('MongoDB disconnect', (t) => {
        t.assert(mongodb.disconnect(), 'Desconectado com sucessso');
        t.end();
    })

}

module.exports = { runTest }