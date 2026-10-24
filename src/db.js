const {Pool} = require("pg");

const pool = new Pool({
 user: "postgres",
 host: "localhost",
 database: "craftudy_tasks",
 port:5432
});

module.exports = pool;
