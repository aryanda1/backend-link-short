// const mongoose = require("mongoose");
var pg = require("pg");
// const async = require('async');

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  ssl: {
    rejectUnauthorized: true,
    ca: Buffer.from(process.env.DB_CERT, "base64").toString("ascii"),
  },
  connectionTimeoutMillis: 5000,
};

async function connect() {
  const client = new pg.Client(config);

  await client.connect();

  const sql =
    "CREATE TABLE IF NOT EXISTS url (shortId VARCHAR(5) PRIMARY KEY,redirectURL VARCHAR(1000))";
  await client.query(sql);

  return client;
}

module.exports = {
  connect,
};
