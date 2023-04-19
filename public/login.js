(async () => {
  let authenticated = false;
  const userName = localStorage.getItem('userName');
  if (userName) {
    const nameEl = document.querySelector('#userName');
    nameEl.value = userName;
    const user = await getUser(nameEl.value);
    authenticated = user?.authenticated;
  }

  if (authenticated) {
    document.querySelector('#playerName').textContent = userName;
    setDisplay('loginControls', 'none');
    setDisplay('playControls', 'block');
  } else {
    setDisplay('loginControls', 'block');
    setDisplay('playControls', 'none');
  }
})();

async function loginUser() {
  loginOrCreate(`/api/auth/login`);
}

async function createUser() {
  loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint) {
  const userName = document.querySelector('#userName')?.value;
  const password = document.querySelector('#userPassword')?.value;
  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({ email: userName, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const body = await response.json();

  if (response?.status === 200) {
    localStorage.setItem('userName', userName);
    window.location.href = 'create.html';
  } else {
    const modalEl = document.querySelector('#msgModal');
    modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
    const msgModal = new bootstrap.Modal(modalEl, {});
    msgModal.show();
  }
}

function play() {
  window.location.href = 'create.html';
}

function logout() {
  fetch(`/api/auth/logout`, {
    method: 'delete',
  }).then(() => (window.location.href = '/'));
}

async function getUser(email) {
  const response = await fetch(`/api/user/${email}`);
  if (response.status === 200) {
    return response.json();
  }

  return null;
}

function setDisplay(controlId, display) {
  const playControlEl = document.querySelector(`#${controlId}`);
  if (playControlEl) {
    playControlEl.style.display = display;
  }
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