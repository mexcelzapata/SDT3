const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.POSTGRESQL_USERNAME,
    password: process.env.POSTGRESQL_PASSWORD,
    host: process.env.POSTGRESQL_MASTER_HOST,
    port: process.env.POSTGRESQL_MASTER_PORT_NUMBER,
    database: process.env.POSTGRESQL_DATABASE
});

module.exports = pool;