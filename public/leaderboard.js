async function loadTeams() {
  let teams = [];


  try {

    const response = await fetch('/api/teams');
    teams = await response.json();
    console.log(teams);
  } catch { 

   const teamsText = localStorage.getItem('leaderboard');
   if (teamsText) {
     teams = JSON.parse(teamsText);
   }
  }

  const tableBodyEl = document.querySelector('#teams');

  if (teams.length) {
    for (const [i, team] of teams.entries()) {
      const positionTdEl = document.createElement('td');
      const nameTdEl = document.createElement('td');
      const teamTdEl = document.createElement('td');
      const powerTdEl = document.createElement('td');

      positionTdEl.textContent = i + 1;
      nameTdEl.textContent = team.owner;
      //teamTdEl.textContent = score.score;
      powerTdEl.textContent = team.power;

      const rowEl = document.createElement('tr');
      rowEl.appendChild(positionTdEl);
      rowEl.appendChild(nameTdEl);
      rowEl.appendChild(teamTdEl);
      createTeamElement(team, teamTdEl);
      rowEl.appendChild(powerTdEl);

      tableBodyEl.appendChild(rowEl);
    }
  } else {
    tableBodyEl.innerHTML = '<tr><td colSpan=4>Be the first to submit a team</td></tr>';
  }
}

function createTeamElement(team, tableElement) {
  const teamNameEl = document.createElement('p');
  const pgEl = document.createElement('p');
  const sgEl = document.createElement('p');
  const sfEl = document.createElement('p');
  const pfEl = document.createElement('p');
  const centerEl = document.createElement('p');
  const coachEl = document.createElement('p');

  teamNameEl.textContent = team.teamName;
  pgEl.textContent = 'PG: ' + team.pg;
  sgEl.textContent = 'SG: ' + team.sg;
  sfEl.textContent = 'SF: ' + team.sf;
  pfEl.textContent = 'PF: ' + team.pf;
  centerEl.textContent = "Center: " + team.center;
  coachEl.textContent = "Coach: " + team.coach; 
   
  tableElement.appendChild(teamNameEl);
  tableElement.appendChild(pgEl);
  tableElement.appendChild(sgEl);
  tableElement.appendChild(sfEl);
  tableElement.appendChild(pfEl);
  tableElement.appendChild(centerEl);
  tableElement.appendChild(coachEl);
}

loadTeams();