const test = require('tape');
const repository = require('./repository');

function runTest() {
    const cityId = '5fa505e407995e710cc8352e';
    const cinemaId = '5fa505e407995e710cc8352b';
    const movieId = '5aefc5029ce83b1eb6b89e59';

    test('Repository getAllCities', async (t) => {
        try {
            t.ok(await repository.getAllCities(), 'getAllCities OK');
            t.end();
        } catch (error) {
            t.end(error);
        }
    });

    test('Repository getCinemasByCityId', async (t) => {
        try {
            t.ok(await repository.getCinemasByCityId(cityId), 'getCinemasByCityId OK');
            t.end();
        } catch (error) {
            t.end(error);
        }
    });


    test('Repository getMoviesByCinemaId', async (t) => {
        try {
            t.ok(await repository.getMoviesByCinemaId(cinemaId), 'getMoviesByCinemaId OK');
            t.end();
        } catch (error) {
            t.end(error);
        }
    });

    test('Repository getMoviesByCityId', async (t) => {
        try {
            t.ok(await repository.getMoviesByCityId(cityId), 'getMoviesByCityId OK');
            t.end();
        } catch (error) {
            t.end(error);
        }
    });

    test('Repository getMovieSessionsByCityId', async (t) => {
        try {
            t.ok(await repository.getMovieSessionsByCityId(movieId, cityId), 'getMovieSessionsByCityId OK');
            t.end();
        } catch (error) {
            t.end(error);
        }
    });

    test('Repository getMovieSessionsByCinemaId', async (t) => {
        try {
            t.ok(await repository.getMovieSessionsByCinemaId(movieId, cinemaId), 'getMovieSessionsByCinemaId OK');
            t.end();
        } catch (error) {
            t.end(error);
        }
    });

    test('Repository disconnect', (t) => {
        try {
            t.ok(repository.disconnect(), 'disconnect OK');
            t.end();
        } catch (error) {
            t.end(error);
        }
    });

}

module.exports = { runTest }