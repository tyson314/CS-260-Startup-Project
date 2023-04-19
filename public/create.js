let userName;
let teamPower = 0;
window.onload = function() {
  var playerName = localStorage.getItem('userName') ?? 'Mystery player';
  var playerSpan = document.querySelector('.player-name');
  userName = playerName;
  playerSpan.textContent = playerName;
}


let ballPlayers = [
  { name:"Yoda", picture:"yoda.png", iq:8, speed:5, strength:2, skill:8 },
  { name:"Snoop Dogg", picture:"snoopdogg.jpeg", iq:3, speed:5, strength:5, skill:4 },
  { name:"Dancing Pyramid", picture:"pyramidman.jpeg", iq:1, speed:3, strength:6, skill:6 },
  { name:"Bad Bunny", picture:"badbunny.jpeg", iq:4, speed:5, strength:4, skill:6 },
  { name:"Tucker Carlson", picture:"tuckercarlson.jpeg", iq:9, speed:3, strength:2, skill:2 },
  { name:"LEGO Hulk", picture:"legohulk.jpeg", iq:0, speed:3, strength:10, skill:2 },
  { name:"Genghis Kahn", picture:"genghiskhan.jpg", iq:5, speed:6, strength:6, skill:4 },
  { name:"Larry the Cucumber", picture:"larry.png", iq:4, speed:2, strength:2, skill:9 },
  { name:"King Tut", picture:"kingtut.png", iq:6, speed:3, strength:3, skill:7 },
  { name:"Albert Einstein", picture:"alberteinstein.jpeg", iq:12, speed:1, strength:1, skill:3 },
  { name:"Burton Guster", picture:"burtonguster.webp", iq:8, speed:4, strength:6, skill:4 },
  { name:"Teddy Roosevelt", picture:"tedddddy.jpg", iq:8, speed:4, strength:4, skill:7 },
  { name:"Flynn Rider", picture:"flynnrider.jpeg", iq:2, speed:7, strength:3, skill:6 },
  { name:"John Wick", picture:"johnwick.jpeg", iq:6, speed:3, strength:3, skill:8 },
  { name:"Enderman", picture:"enderman.jpeg", iq:0, speed:7, strength:1, skill:7 },
  { name:"Draco Malfoy (Kid)", picture:"dracomalfoy.jpeg", iq:8, speed:5, strength:1, skill:8 },
  { name:"Waluigi", picture:"waluigi.jpeg", iq:1, speed:1, strength:1, skill:10 },
  { name:"Light Yagami", picture:"lightyagami.jpeg", iq:10, speed:2, strength:2, skill:5 },
  { name:"Jotaro Kujo", picture:"jotarokujo.jpeg", iq:5, speed:7, strength:7, skill:7 },
  { name:"Michael Jackson", picture:"michaeljackson.png", iq:1, speed:3, strength:3, skill:5 },
  { name:"Arthur", picture:"arthur.jpeg", iq:7, speed:3, strength:6, skill:2 },
  { name:"Bruce Lee", picture:"brucelee.avif", iq:4, speed:8, strength:5, skill:8 },
  { name:"Rock Lee", picture:"rocklee.jpeg", iq:3, speed:9, strength:6, skill:2 },
  { name:"Ash Ketchum", picture:"ashketchum.jpeg", iq:5, speed:5, strength:1, skill:7 },
  { name:"Jake the Dog", picture:"jakethedog.jpeg", iq:2, speed:2, strength:2, skill:2 }
]

let teamNames = [
  { name:"Sizzling Sharks", picture:"spicysharks.jpeg"},
  { name:"Rampaging Rhinos", picture:"rhino.jpeg"},
  { name:"Prancing Penguins", picture:"penguin.jpeg"},
  { name:"Kooky Koalas", picture:"koala.jpeg"},
  { name:"Team Rocket", picture:"teamrocket.jpeg"},
  { name:"Cosmic Cobras", picture:"cobra.jpeg"},
  { name:"Wacky Wizards", picture:"wizard.png"}
]

let usedTeam = -1;
let usedPlayers = { 
  coach: -1, 
  pg: -1, 
  sg: -1,
  sf: -1,
  pf: -1,
  center: -1 }

async function changePlayer(positionTag) {
  for (let i = 0; i < Math.floor(Math.random() * 5) + 3; i++) {
    await new Promise((resolve) => setTimeout(resolve, 100 + (i * 30)));
    changeInfo(positionTag);
    computePower(usedPlayers);
  }
}

async function changeTeam() {
  for (let i = 0; i < Math.floor(Math.random() * 5) + 3; i++) {
    await new Promise((resolve) => setTimeout(resolve, 100 + (i * 30)));

    let newTeam = usedTeam;
    while (newTeam === usedTeam) {
      newTeam = Math.floor(Math.random() * teamNames.length);
    }
    usedTeam = newTeam;

    var changeEl = document.querySelector('#teamnameleft');
    changeEl.textContent = teamNames[usedTeam].name;

    changeEl = document.querySelector('#teamnameright');
    changeEl.textContent = teamNames[usedTeam].name;

    changeEl = document.querySelector('#teampic');
    changeEl.src = 'teamimage/' + teamNames[usedTeam].picture;
  }

}

function getUniquePlayer() {
  let newPlayer;
  let isUnique = false;
  while (!isUnique) {
    newPlayer = Math.floor(Math.random() * ballPlayers.length);
    isUnique = true;
    for (let player in usedPlayers) {
      if (usedPlayers[player] === newPlayer) {
        isUnique = false;
      }
    }
  }
  return newPlayer;
}


function changeInfo(positionTag) {
  usedPlayers[positionTag] = getUniquePlayer();
  let newPlayer = ballPlayers[usedPlayers[positionTag]];
  let nameString = newPlayer.name + " SPD: " + newPlayer.speed + " STR: " + newPlayer.strength +
        " SKL: " + newPlayer.skill + " IQ: " + newPlayer.iq;

  var changeEl = document.querySelector('#' + positionTag + 'Info');
  changeEl.textContent = nameString;

  changeEl = document.getElementById(positionTag + 'Pic');
  changeEl.src = 'playerimage/' + newPlayer.picture;

  changeEl = document.querySelector('#' + positionTag + "Name");
  changeEl.textContent = newPlayer.name;

}

function computePower(team) {
  let power = 0;

  const coach = ballPlayers[team['coach']];
  const pg = ballPlayers[team['pg']];
  const sg = ballPlayers[team['sg']];
  const sf = ballPlayers[team['sf']];
  const pf = ballPlayers[team['pf']];
  const center = ballPlayers[team['center']];
  console.log(sg);

  
  
  if (team.pg > -1) power += pg.speed * 3 + pg.skill * 3 + pg.strength + pg.iq * 3;
  if (team.sg > -1) power += sg.speed * 3 + sg.skill * 5 + sg.strength + sg.iq;
  if (team.sf > -1) power += sf.speed * 2 + sf.skill * 4 + sf.strength * 3 + sf.iq;
  if (team.pf > -1) power += pf.speed + pf.skill * 4 + pf.strength * 4 + pf.iq;
  if (team.center > -1) power += center.speed + center.skill * 2 + center.strength * 6 + center.iq;
  if (team.coach > -1) power += coach.speed + coach.skill + coach.strength + coach.iq * 7;

  var changeEl = document.getElementById('teampower');
  changeEl.textContent = 'Power: ' + power;
  teamPower = power;
}

class FinishedTeam {
  pg;
  sg;
  sf;
  pf;
  center;
  coach;
  power;
  owner;
  teamName;

  constructor(pg, sg, sf, pf, center, coach, power, owner, teamName) {
    this.pg = pg;
    this.sg = sg;
    this.sf = sf;
    this.pf = pf;
    this.center = center;
    this.coach = coach;
    this.power = power;
    this.owner = owner;
    this.teamName = teamName;
  }
}
async function onSubmit() {
    teamToSubmit = new FinishedTeam(ballPlayers[usedPlayers.pg].name, ballPlayers[usedPlayers.sg].name,
      ballPlayers[usedPlayers.sf].name, ballPlayers[usedPlayers.pf].name, ballPlayers[usedPlayers.center].name,
      ballPlayers[usedPlayers.coach].name,teamPower, userName, teamNames[usedTeam].name);

    console.log(JSON.stringify(teamToSubmit));
  let createdTeams = [];
    try {
      const response = await fetch('/api/team', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(teamToSubmit),
      });

      const teams = await response.json();
      console.log(JSON.stringify(teams));
      //localStorage.setItem('leaderboard', JSON.stringify(scores));
    } catch {

      
      const createdTeamsJSON = localStorage.getItem('leaderboard');
      if (createdTeamsJSON) {
        createdTeams = JSON.parse(createdTeamsJSON);
      }
      
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
    }



  localStorage.setItem('leaderboard', JSON.stringify(createdTeams));
  window.location.href = "leaderboard.html";
}

function logout() {
  fetch(`/api/auth/logout`, {
    method: 'delete',
  }).then(() => (window.location.href = '/'));
}