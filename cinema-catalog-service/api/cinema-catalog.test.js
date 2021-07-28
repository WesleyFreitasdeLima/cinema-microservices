const test = require('tape');
const supertest = require('supertest');
const server = require('../server/server');
const repository = require('../repository/repository');
const cinemaCatalog = require('./cinema-catalog');

function runTests() {

    //let app = null;
    server.start(cinemaCatalog, repository, (err, app) => {
        const cityId = '5fa505e407995e710cc8352e';
        const cinemaId = '5fa505e407995e710cc8352c';
        const movieId = '5aefc5029ce83b1eb6b89e57';

        test('GET /cities', (t) => {
            try {
                supertest(app)
                    .get('/cities')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        t.assert(!err && res.body, 'All Cities returned')
                        t.end();
                    })

            } catch (error) {
                t.end(error);
            }
        })

        test('GET /cities/:city/movies', (t) => {
            try {
                supertest(app)
                    .get(`/cities/${cityId}/movies`)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        t.assert(!err && res.body, 'Movies By City Id returned')
                        t.end();
                    })

            } catch (error) {
                t.end(error);
            }
        })

        test('GET /cities/:city/movies/:movie', (t) => {
            try {
                supertest(app)
                    .get(`/cities/${cityId}/movies/${movieId}`)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        t.assert(!err && res.body, 'Movie Sessions by City Id returned')
                        t.end();
                    })

            } catch (error) {
                t.end(error);
            }
        })

        test('GET /cities/:city/cinemas', (t) => {
            try {
                supertest(app)
                    .get(`/cities/${cityId}/cinemas`)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        t.assert(!err && res.body, 'Cinemas by City Id returned')
                        t.end();
                    })

            } catch (error) {
                t.end(error);
            }
        })

        test('GET /cinemas/:cinema/movies', (t) => {
            try {
                supertest(app)
                    .get(`/cinemas/${cinemaId}/movies`)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        t.assert(!err && res.body, 'Movies by Cinema Id returned')
                        t.end();
                    })

            } catch (error) {
                t.end(error);
            }
        })

        test('GET /cinemas/:cinema/movies/:movie', (t) => {
            try {
                supertest(app)
                    .get(`/cinemas/${cinemaId}/movies/${movieId}`)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        t.assert(!err && res.body, 'Movie Sessions by Cinema Id returned')
                        t.end();
                    })

            } catch (error) {
                t.end(error);
            }
        })

        repository.disconnect();
        
    });

    server.stop();
}

module.exports = { runTests }