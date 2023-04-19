const {MongoClient} = require('mongodb');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
// throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const teamCollection = client.db('startup').collection('team');

function addTeam(team) {
  teamCollection.insertOne(team);
}

function getTeams() {
  const query = {power: {$gt: 0}};
  const options = {
    sort: {power: -1},
    limit: 10,
  };
  const cursor = teamCollection.find(query, options);
  return cursor.toArray();
}

module.exports = {addTeam, getTeams};