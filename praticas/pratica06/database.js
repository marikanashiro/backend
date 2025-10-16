const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://marikanashiro:<MARIalmeida1234>@cluster0.nehg8uc.mongodb.net/';

const client = new MongoClient(url);

async function conectarDb() {
  await client.connect();
  return client.db('agenda');
}

module.exports = { conectarDb };