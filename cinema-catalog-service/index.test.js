require('dotenv-safe').config();
require("./config/mongodb.test").runTest();
require("./server/server.test").runTest();
require("./repository/resository.test").runTest();
require("./api/cinema-catalog.test").runTests();