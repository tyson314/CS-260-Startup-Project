const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get('/teams', (_req, res) => {
  res.send(leaderboardTeams);
});

apiRouter.post('/team', (req, res) => {
  leaderboardTeams = updateTeams(req.body, leaderboardTeams);
  res.send(leaderboardTeams);
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

let leaderboardTeams = [];
function updateTeams(teamToSubmit, createdTeams) {
  let found = false;
  for (const [i, prevScore] of createdTeams.entries()) {
    console.log()
    if (teamToSubmit.power > prevScore.power) {
      createdTeams.splice(i, 0, teamToSubmit);
      found = true;
      break;
    }
  }

  if (!found) {
    createdTeams.push(teamToSubmit);
  }

  if (createdTeams.length > 10) {
    createdTeams.length = 10;
  }

  return createdTeams;
}