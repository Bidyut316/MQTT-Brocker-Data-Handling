const { Pool, Client } = require("pg");

const client = new Client({
 user: 'postgres',
 host: 'localhost',
 database: 'brockerData',
 password: '1234',
 port: 5432,
})
client.connect()


// client.end()


module.exports.client = client;
