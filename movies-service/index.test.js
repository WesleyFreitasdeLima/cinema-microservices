require('dotenv-safe').config();

require('./config/mongodb.test').runTest();
require('./repository/repository.test').runTest();
require('./server/server.test').runTest();
require('./api/movies.test').runTest();