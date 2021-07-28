const mongodb = require('../config/mongodb');
const { ObjectId } = require('mongodb');

function disconnect() {
    return mongodb.disconnect();
}

function getAllCities() {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await mongodb.connect();

            db.collection('cinemaCatalog').find({}, { uf: 1, pais: 1, cidade: 1 }).toArray((err, result) => {
                if (err)
                    return reject(err);

                console.log(result);
                return resolve(result);
            });

        } catch (error) {
            return reject(error);
        }
    })
}

function getCinemasByCityId(cityId) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await mongodb.connect();
            db.collection("cinemaCatalog").find({ _id: ObjectId(cityId) }, { cinemas: 1 }).toArray((err, result) => {
                if (err)
                    return reject(err);

                console.log(result);
                return resolve(result);
            });

        } catch (error) {
            return reject(error);
        }
    })
}

function getMoviesByCinemaId(cinemaId) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await mongodb.connect();
            db.collection("cinemaCatalog").aggregate([
                {
                    $match: {
                        "cinemas._id": ObjectId(cinemaId)
                    }
                },
                { $unwind: "$cinemas" },
                { $unwind: "$cinemas.salas" },
                { $unwind: "$cinemas.salas.sessoes" },
                {
                    $group: {
                        _id: {
                            filme: "$cinemas.salas.sessoes.filme",
                            idFilme: "$cinemas.salas.sessoes.idFilme"
                        }
                    }
                }
            ]).toArray((err, result) => {
                if (err)
                    return reject(err);

                console.log(result);
                return resolve(result);
            });

        } catch (error) {
            return reject(error);
        }
    })
}

function getMoviesByCityId(cityId) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await mongodb.connect();
            db.collection("cinemaCatalog").aggregate([
                {
                    $match: {
                        "_id": ObjectId(cityId)
                    }
                },
                { $unwind: "$cinemas" },
                { $unwind: "$cinemas.salas" },
                { $unwind: "$cinemas.salas.sessoes" },
                {
                    $group: {
                        _id: {
                            filme: "$cinemas.salas.sessoes.filme",
                            idFilme: "$cinemas.salas.sessoes.idFilme"
                        }
                    }
                }
            ]).toArray((err, result) => {
                if (err)
                    return reject(err);

                const sessions = result.map(item => {
                    return {
                        idFilme: item._id.idFilme,
                        filme: item._id.filme
                    }
                });

                console.log(sessions);
                return resolve(sessions);
            });

        } catch (error) {
            return reject(error);
        }
    })
}

function getMovieSessionsByCityId(movieId, cityId) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await mongodb.connect();
            db.collection("cinemaCatalog").aggregate([
                {
                    $match: {
                        "_id": ObjectId(cityId)
                    }
                },
                { $unwind: "$cinemas" },
                { $unwind: "$cinemas.salas" },
                { $unwind: "$cinemas.salas.sessoes" },
                {
                    $match: {
                        "cinemas.salas.sessoes.idFilme": ObjectId(movieId)
                    }
                },
                {
                    $group: {
                        _id: {
                            filme: "$cinemas.salas.sessoes.filme",
                            idFilme: "$cinemas.salas.sessoes.idFilme",
                            idCinema: "$cinemas._id",
                            sala: "$cinemas.salas.nome",
                            sessao: "$cinemas.salas.sessoes"
                        }
                    }
                }
            ]).toArray((err, result) => {
                if (err)
                    return reject(err);

                const sessions = result.map(item => {
                    return {
                        idFilme: item._id.idFilme,
                        filme: item._id.filme,
                        idCinema: item._id.idCinema,
                        sala: item._id.sala,
                        sessao: item._id.sessao
                    }
                });

                console.log(sessions);
                return resolve(sessions);
            });

        } catch (error) {
            return reject(error);
        }
    })
}

function getMovieSessionsByCinemaId(movieId, cinemaId) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await mongodb.connect();
            db.collection("cinemaCatalog").aggregate([
                {
                    $match: {
                        "cinemas._id": ObjectId(cinemaId)
                    }
                },
                { $unwind: "$cinemas" },
                { $unwind: "$cinemas.salas" },
                { $unwind: "$cinemas.salas.sessoes" },
                {
                    $match: {
                        "cinemas.salas.sessoes.idFilme": ObjectId(movieId)
                    }
                },
                {
                    $group: {
                        _id: {
                            filme: "$cinemas.salas.sessoes.filme",
                            idFilme: "$cinemas.salas.sessoes.idFilme",
                            sala: "$cinemas.salas.nome",
                            sessao: "$cinemas.salas.sessoes"
                        }
                    }
                }]).toArray((err, result) => {
                    if (err)
                        return reject(err);

                    const sessions = result.map(item => {
                        return {
                            idFilme: item._id.idFilme,
                            filme: item._id.filme,
                            idCinema: item._id.idCinema,
                            sala: item._id.sala,
                            sessao: item._id.sessao
                        }
                    });

                    console.log(sessions);
                    return resolve(sessions);
                });

        } catch (error) {
            return reject(error);
        }
    })
}

module.exports = {
    disconnect,
    getAllCities,
    getCinemasByCityId,
    getMoviesByCinemaId,
    getMoviesByCityId,
    getMovieSessionsByCityId,
    getMovieSessionsByCinemaId
}