const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjQ1NjExMDI5OGIyZGQ1YmRjNDAzY2IyMjliNDIxNSIsInN1YiI6IjY1MzczNmUxMWY3NDhiMDEwNDhlNjY2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8N2fKzrnaqBwtbufWq0lFqJ-A_2KzDUGDOJ5LKKQpjg",
  },
};

const imgurl = "http://image.tmdb.org/t/p/w500/";

// Function to fetch movies based on search query
function fetchMoviesBySearch(query) {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  )
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((err) => console.error(err));
}

// Initial fetch API call
fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((resp) => {
    console.log(resp.results[0]);
    resp.results.forEach(function (e) {
      add_movies(e.poster_path, e.title, e.vote_average, e.overview);
    });
  })
  .catch((err) => console.error(err));

const container = document.getElementById("container");
const movies = document.getElementById("movies");
const form = document.getElementById("form");
const input = document.getElementById("input");

function add_movies(img, title, rating, overview) {
  const movie = document.createElement("div");
  movie.classList.add("movies");

  movie.innerHTML = `
  <img
    src="${imgurl + img}"
    alt="${title}"
  />
  <div class="footer">
    <h3>${title}</h3>
    <span>${rating.toFixed(1)}</span>
  </div>
  <div class = "overview" >
  <h4>Overview</h4>
  ${overview}</div>
  `;

  container.appendChild(movie);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (query !== "") {
    container.innerHTML = "";
    const results = await fetchMoviesBySearch(query);
    results.forEach((e) => {
      add_movies(e.poster_path, e.title, e.vote_average);
    });
  }
});
