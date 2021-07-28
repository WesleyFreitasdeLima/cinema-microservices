const test = require('tape');
const supertest = require('supertest');
const movies = require('./movies');
const server = require('../server/server');
const repository = require('../repository/repository');

function runTest() {

    const filmeTeste = {
        titulo: 'Filme teste',
        sinopse: 'Apenas um filme de teste',
        duracao: '120',
        dataLancamento: new Date(),
        imagem: 'http://www.filme.net/cartaz.png',
        categorias: [
            "Aventura"
        ]
    }
    let id = null;
    
    server.start(movies, repository, (err, app) => {
        test('api /movies', (t) => {
            supertest(app)
                .get('/movies')
                .expect(200)
                .end((err, res) => {
                    if (res.body && res.body.length > 0)
                        id = res.body[0]._id;

                    t.assert(!err && res.body && res.body.length > 0, 'Todos filmes retornados')
                    t.end();
                })
        });

        test('api /movies', (t) => {
            supertest(app)
                .post('/movies')
                .send(filmeTeste)
                .expect(200)
                .end((err, res) => {
                    if (res.body && res.body.length > 0)
                        id = res.body[0]._id;

                    t.assert(!err && res.body && res.body.length > 0, 'Filme adicionado')
                    t.end();
                })
        });

        test('api /movies/premieres', (t) => {
            supertest(app)
                .get('/movies/premieres')
                .expect(200)
                .end((err, res) => {
                    t.assert(!err && res.body, 'Todos filmes lançamentos retornados')
                    t.end();
                })
        });

        test('api /movies/:id', (t) => {
            supertest(app)
                .get('/movies/' + id)
                .expect(200)
                .end((err, res) => {
                    t.assert(!err && res.body, 'Filme por id retornados')
                    t.end();
                })
        });
    })

    server.stop();

}

module.exports = { runTest }