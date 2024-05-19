fetch("https://api.github.com/users")
  .then((resp) => resp.json())
  .then((resp) => console.log(resp))
  .catch((err) => console.error(err));

function getapiInfo(search) {
  return fetch(`https://api.github.com/users/${search}`)
    .then((resp) => resp.json())
    .catch((err) => console.error(err));
}

function getrepos(username) {
  return fetch(`https://api.github.com/users/${username}/repos`)
    .then((resp) => resp.json())
    .then((resp) => {
      // Sorting the repositories by the number of stars in descending order
      resp.sort((a, b) => b.stargazers_count - a.stargazers_count);
      // Return only the first 9 repositories
      return resp.slice(0, 8);
    })
    .catch((err) => console.error(err));
}
const input = document.getElementById("input");
const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const existingCard = document.querySelector(".card");
  if (existingCard) {
    existingCard.remove();
  }
  try {
    const cards = await getapiInfo(input.value);
    const repos = await getrepos(input.value);
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = "";
    card.innerHTML = `
    <div class="image">
      <img src="${cards.avatar_url}" alt=""> </img>
      </div>
      <div class="git-info">
        <h3>${cards.name}</h3>
        <p>${cards.bio}</p>
        <ul class="info">
          <li>Followers: ${cards.followers}</li>
          <li>Follwing: ${cards.following}</li>
          <li>Public Repos: ${cards.public_repos}</li>
        </ul>
        <h4>Repos:</h4>
        <div id="elements" class= "elements">s</div>
      </div>
      `;

    document.body.appendChild(card);

    const elements = document.getElementById("elements");
    elements.innerHTML = "";
    repos.forEach((e) => {
      const ele = document.createElement("a");
      ele.classList.add("repo");
      ele.href = e.html_url;
      ele.target = "_blank";
      ele.innerText = e.name;
      elements.appendChild(ele);
    });
  } catch (err) {
    console.error(err);
  }
});
