const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.POSTGRESQL_REPLICATION_USER,
    password: process.env.POSTGRESQL_REPLICATION_PASSWORD,
    host: process.env.POSTGRESQL_SLAVE_HOST,
    port: process.env.POSTGRESQL_SLAVE_PORT_NUMBER,
    database: process.env.POSTGRESQL_DATABASE
});

module.exports = pool;