const API_KEY = "70e168104f5129f470175c08c511751a";
const BASE_URL = "https://api.themoviedb.org/3";
const JSON_SERVER_URL = "http://localhost:3000";

async function fetchFeaturedMovies() {
  const response = await fetch(
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=pt-BR&page=1`,
  );
  const data = await response.json();
  displayMovies(data.results.slice(0, 10), "movie-list"); // Mostrar apenas as 10 primeiras series
}

async function fetchNewReleases() {
  const response = await fetch(
    `${BASE_URL}/tv/now_playing?api_key=${API_KEY}&language=pt-BR&page=1`,
  );
  const data = await response.json();
  displayMovies(data.results.slice(0, 10), "release-list"); // Mostrar apenas os 10 primeiros lançamentos
}

async function fetchPopularSeries() {
  const response = await fetch(
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=pt-BR`,
  );
  const data = await response.json();
  populateCarousel(data.results);
}

function displayMovies(movies, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  movies.forEach((movie) => {
    container.innerHTML += `
      <div class="col-md-2 mb-4">
        <div class="card h-100">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
          <div class="card-body">
            <h5 class="card-title">${movie.name}</h5>
            <p class="card-text">${movie.overview.substring(0, 50)}...</p>
            <a href="detalhes.html?id=${movie.id}" class="btn btn-primary btn-sm">Ver Detalhes</a>
          </div>
        </div>
      </div>
    `;
  });
}

function populateCarousel(series) {
  const carouselContent = document.getElementById("carousel-content");
  series.forEach((serie, index) => {
    const isActive = index === 0 ? "active" : "";
    carouselContent.innerHTML += `
      <div class="carousel-item ${isActive}">
        <img src="https://image.tmdb.org/t/p/w500${serie.backdrop_path}" class="d-block w-100" alt="${serie.name}">
        <div class="carousel-caption d-none d-md-block">
          <h5>${serie.name}</h5>
          <p>${serie.overview.substring(0, 50)}...</p>
        </div>
      </div>
    `;
  });
}

async function fetchProfileData() {
  try {
    const response = await fetch(`${JSON_SERVER_URL}/perfil`);
    const data = await response.json();
    displayProfileData(data[0]); // Considera que só há um perfil no db.json
  } catch (error) {
    console.error("Erro ao buscar os dados do perfil:", error);
  }
}

function displayProfileData(profile) {
  document.getElementById("profile-name").innerText = profile.nome;
  document.getElementById("profile-course").innerText = profile.curso;
  document.getElementById("profile-email").innerText = profile.email;
  document.getElementById("profile-bio").innerText = profile.bio;
  document.getElementById("profile-facebook").href = profile.facebook;
  document.getElementById("profile-twitter").href = profile.twitter;
  document.getElementById("profile-instagram").href = profile.instagram;
}

async function fetchFavoriteSeries() {
  try {
    const response = await fetch(`${JSON_SERVER_URL}/seriesFavoritas`);
    const data = await response.json();
    displayFavoriteSeries(data);
  } catch (error) {
    console.error("Erro ao buscar as séries favoritas:", error);
  }
}

function displayFavoriteSeries(series) {
  const container = document.getElementById("favorite-series-list");
  container.innerHTML = "";
  series.forEach((serie) => {
    container.innerHTML += `
      <div class="col-md-3 mb-4">
        <div class="card h-100">
          <img src="https://image.tmdb.org/t/p/w500${serie.poster_path}" class="card-img-top" alt="${serie.title}">
          <div class="card-body">
            <h5 class="card-title">${serie.title}</h5>
            <p class="card-text">${serie.overview.substring(0, 50)}...</p>
            
          </div>
        </div>
      </div>
    `;
  });
}

// Carregar os dados do perfil e das séries favoritas ao carregar a página
fetchProfileData();
fetchFavoriteSeries();

fetchFeaturedMovies();
fetchNewReleases();
fetchPopularSeries();
