const mariadb = require('mariadb');

const config = require('../config/config.json');

const db = mariadb.createPool({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password,
});

module.exports = db;