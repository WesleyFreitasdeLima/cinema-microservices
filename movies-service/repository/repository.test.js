const test = require('tape');
const repository = require('./repository');

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

    test('addMovie', async (t) => {
        t.assert(await repository.addMovie(filmeTeste), 'Adicionado filme');
        t.end();
    });

    test('getAllMovies', async (t) => {
        t.assert(await repository.getAllMovies(), 'Obtido todos filmes');
        t.end();
    });

    test('getMovieById', async (t) => {
        t.assert(await repository.getMovieById('5f6fe615e08719c489c62fe0'), 'Obtido filme por ID');
        t.end();
    });

    test('getMoviePremieres', async (t) => {
        t.assert(await repository.getMoviePremieres(), 'Obtido filme por ID');
        t.end();
    });

    test('disconnect', (t) => {
        t.assert(repository.disconnect(), 'Desconectado');
        t.end();
    });
}

module.exports = { runTest }