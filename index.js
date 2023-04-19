const express = require('express');
const app = express();
const DB = require('./database.js');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get('/teams', async (_req, res) => {
  const leaderboardTeams = await DB.getTeams();
  res.send(leaderboardTeams);
});

apiRouter.post('/team', async (req, res) => {
  DB.addTeam(req.body);
  const leaderboardTeams = await DB.getTeams();
  res.send(leaderboardTeams);
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
