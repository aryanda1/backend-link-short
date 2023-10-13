// const mongoose = require("mongoose");
const postgres = require('postgres');
require('dotenv').config();
// const async = require('async');
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const config = {
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
};
// hlo
async function connect() {
  const client = postgres(config);

  await client`CREATE TABLE IF NOT EXISTS url (shortId VARCHAR(5) PRIMARY KEY,redirectURL VARCHAR(1000))`;

  return client;
}

module.exports = {
  connect,
};
