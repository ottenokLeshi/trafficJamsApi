/**
 * Конфигурация базы данных
 */
const pg = require('pg');

const config = {
    host: 'localhost',
    port: 5432,
    database: 'SPb_map',
    user: 'postgres',
    password: null
};

const pool = new pg.Pool(config);

pool.connect();

module.exports = pool;
