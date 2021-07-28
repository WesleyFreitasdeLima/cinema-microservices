const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');

let server = null;

function start(api, repository, callback) {
    const app = express();
    app.use(morgan('dev'));
    app.use(helmet());
    app.use(bodyParser.json())
    app.use((err, req, res, next) => {
        callback(new Error('Algo deu errado, erro: ' + err), null)
        res.status(500).send('Algo deu errado');
    });
    api(app, repository);
    
    server = http.createServer(app);
    server.listen(process.env.PORT, (err) => {
        if (err)
            return callback(new Error('Algo deu errado, erro: ' + err), null);

        return callback(null, server);
    });
}

function stop() {
    if (!server)
        return true;

    return server.close();

}

module.exports = {
    start, stop
}