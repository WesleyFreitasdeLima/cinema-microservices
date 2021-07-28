module.exports = (app, repository) => {

    // lista todas cidades onde a rede possui cinema
    app.get('/cities', async (req, res, next) => {
        try {
            const cities = await repository.getAllCities();
            res.status(200).json(cities);

        } catch (error) {
            return res.status(500).json(error);
        }
    });

    // lista todos os filmes em exibição na cidade especificada
    app.get('/cities/:city/movies', async (req, res, next) => {
        try {
            const cityId = req.params.city;
            const moviesByCityId = await repository.getMoviesByCityId(cityId);
            res.status(200).json(moviesByCityId);

        } catch (error) {
            return res.status(500).json(error);
        }
    });

    // lista todos as sessões do filme escolhido na cidade especificada
    app.get('/cities/:city/movies/:movie', async (req, res, next) => {
        try {
            const cityId = req.params.city;
            const movieId = req.params.movie;
            const sessions = await repository.getMovieSessionsByCityId(movieId, cityId);
            res.status(200).json(sessions);

        } catch (error) {
            return res.status(500).json(error);
        }
    });

    // lista todos os cinemas em determinada cidade
    app.get('/cities/:city/cinemas', async (req, res, next) => {
        try {
            const cityId = req.params.city;
            const cinemasByCityId = await repository.getCinemasByCityId(cityId);
            res.status(200).json(cinemasByCityId);

        } catch (error) {
            return res.status(500).json(error);
        }
    });

    // lista todos os filmes em exibição no cinema especificado
    app.get('/cinemas/:cinema/movies', async (req, res, next) => {
        try {
            const cinemaId = req.params.cinema;
            const moviesByCinemaId = await repository.getMoviesByCinemaId(cinemaId);
            res.status(200).json(moviesByCinemaId);

        } catch (error) {
            return res.status(500).json(error);
        }
    });

    // lista todas as sessões do filme escolhido no cinema especificado
    app.get('/cinemas/:cinema/movies/:movie', async (req, res, next) => {
        try {
            const cinemaId = req.params.cinema;
            const movieId = req.params.movie;
            const sessions = await repository.getMovieSessionsByCinemaId(movieId, cinemaId);
            res.status(200).json(sessions);

        } catch (error) {
            return res.status(500).json(error);
        }
    });

}