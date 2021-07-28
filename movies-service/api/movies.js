const repository = require("../repository/repository");
const schemas = require('./schemas');

module.exports = (app, repository) => {

    app.get('/movies', (req, res, next) => {
        return repository.getAllMovies()
            .then(movies => {
                res.status(200).json(movies);
            })
            .catch(err => {
                next(err);
            });
    })

    app.get('/movies/premieres', (req, res, next) => {
        return repository.getMoviePremieres()
            .then(movies => {
                res.status(200).json(movies);
            })
            .catch(err => {
                next(err);
            });
    })

    app.get('/movies/:id', (req, res, next) => {
        const id = req.params.id;
        return repository.getMovieById(id)
            .then(movie => {
                res.status(200).json(movie);
            })
            .catch(err => {
                next(err);
            });
    })

    app.post('/movies', (res, req, next) => {
        const validacao = schemas.movieSchema.validate(req.body)

        if (validacao.error)
            return next(validacao.error);
            
        console.log(validacao.value);

        const titulo = req.body.titulo;
        const sinopse = req.body.sinopse;
        const duracao = req.body.duracao;
        const dataLancamento = req.body.dataLancamento;
        const imagem = req.body.imagem;
        const categorias = req.body.categorias;

        repository.addMovie({ titulo, sinopse, duracao, dataLancamento, imagem, categorias }, (err, result) => {
            if (err)
                return next(err);

            return res.json(result);
        })
    })
}