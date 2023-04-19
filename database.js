const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const teamCollection = client.db('startup').collection('team');
const userCollection = client.db('startup').collection('user');

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}



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

module.exports = {addTeam, getTeams, getUser, getUserByToken, createUser};