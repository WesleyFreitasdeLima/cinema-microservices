const mongodb = require('../config/mongodb');
const { ObjectId } = require('mongodb');

function getAllMovies() {
    return mongodb.connect()
        .then(db => db.collection('movies').find().toArray())
        .catch(err => err);
}

function getMovieById(id) {
    return mongodb.connect()
        .then(db => db.collection('movies').findOne({ _id: ObjectId(id) }))
        .catch(err => err);
}

function getMoviePremieres() {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 6);
    monthAgo.setHours(0, 0, 0);
    monthAgo.setMilliseconds(0);

    return mongodb.connect()
        .then(db => db.collection('movies').find({ dataLancamento: { $gte: monthAgo } }.toArray()))
        .catch(err => err);
}

function addMovie(movie) {
    return mongodb.connect()
        .then(db => db.collection('movies').insertOne(movie))
        .catch(err => err);
}

function disconnect() {
    return mongodb.disconnect();
}

module.exports = {
    addMovie,
    getAllMovies,
    getMovieById,
    getMoviePremieres,
    disconnect
}