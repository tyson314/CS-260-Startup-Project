function login() {
  const nameEl = document.querySelector('#name');
  localStorage.setItem('userName', nameEl.value);
  window.location.href = "create.html";
}

function loadPlayerStat() {
  let playerID = Math.floor(Math.random() * 500) + 1;
  let url = 'https://www.balldontlie.io/api/v1/players/' + playerID;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const quoteText = document.querySelector('#PlayerStat');
      const firstName = data.first_name;
      const lastName = data.last_name;
      const teamName = data.team.full_name;
      const position = data.position;
      const height = data.height_feet + '\' ' + data.height_inches + '\"';
      const fullName = firstName + ' ' + lastName;

      if (data.height_feet === null) {
        quoteText.textContent = fullName + ', ' + teamName + ', ' + position;
      }
      else {
        quoteText.textContent = fullName + ', ' + teamName + ', ' + height + ' ' + position;

      }
    })
}

loadPlayerStat();