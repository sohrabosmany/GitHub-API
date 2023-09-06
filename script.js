// For API

const APIURL = "https://api.github.com/users/";

const main = document.getElementById("about");
const form = document.getElementById("form");
const search = document.getElementById("search");

getUser("sohrabosmany");

async function getUser(username) {
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();

    createUserCard(respData);

    getRepos(username);
}

async function getRepos(username) {
    const resp = await fetch(APIURL + username + "/repos");
    const respData = await resp.json();

    addReposToCard(respData);
}

function createUserCard(user) {
    const cardHTML = `
        <div class="card-header">
          <div class="card-cover" style="background-image: url('${user.avatar_url}')"></div>
          <img class="card-avatar" src="${user.avatar_url}" alt="${user.name}" />
          <h1 class="card-fullname">${user.name}</h1>
          <h2 class="card-jobtitle">${user.bio}</h2>
        </div>
        <div class="card-main">
            <div class="card-section is-active" id="about">
              <div class="card-content">
                <div class="card-subtitle"><strong></strong></div>
                <div class="info">
                    <p class="card-desc"><strong> Followers ${user.followers} </strong></p>
                    <p class="card-desc"><strong> Following ${user.following} </strong></p>
                    <p class="card-desc"><strong> Repository ${user.public_repos} </strong></p>
                </div>
              </div>
              <div id="repos" class="parentRepos">
                
              </div>
            </div>
        </div>
    `;

    main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    const reposEl = document.getElementById("repos");

    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
        .forEach((repo) => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");

            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;

            reposEl.appendChild(repoEl);
        });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);

        search.value = "";
    }
});


// For CARD
const buttons = document.querySelectorAll(".card-buttons button");
const sections = document.querySelectorAll(".card-section");
const card = document.querySelector(".card");

const handleButtonClick = e => {
  const targetSection = e.target.getAttribute("data-section");
  const section = document.querySelector(targetSection);
  targetSection !== "#about" ?
  card.classList.add("is-active") :
  card.classList.remove("is-active");
  card.setAttribute("data-state", targetSection);
  sections.forEach(s => s.classList.remove("is-active"));
  buttons.forEach(b => b.classList.remove("is-active"));
  e.target.classList.add("is-active");
  section.classList.add("is-active");
};

buttons.forEach(btn => {
  btn.addEventListener("click", handleButtonClick);
});