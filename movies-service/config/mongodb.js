const mongoClient = require('mongodb').MongoClient;

const connectionString = process.env.MONGO_CONNECTION;
const database = process.env.DATABASE;
let connection = null;
let db = null;

function connect() {
    return new Promise((resolve, reject) => {
        if (connection)
            return resolve(connection);

        mongoClient.connect(connectionString, { useUnifiedTopology: true },
            (err, conn) => {
                if (err)
                    return reject(err);

                connection = conn;
                db = connection.db(database);
                return resolve(db);
            })
    })
}

function disconnect() {
    if (!connection)
        return true;

    connection.close();
    connection = null;
    db = null;
    return true;
}

module.exports = {
    connect, disconnect
}