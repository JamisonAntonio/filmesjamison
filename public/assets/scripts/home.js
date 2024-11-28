const API_KEY = '70e168104f5129f470175c08c511751a';
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchFeaturedMovies() {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`);
  const data = await response.json();
  displayMovies(data.results.slice(0, 10), 'movie-list'); // Mostrar apenas os 10 primeiros filmes
}

async function fetchNewReleases() {
  const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=pt-BR&page=1`);
  const data = await response.json();
  displayMovies(data.results.slice(0, 10), 'release-list'); // Mostrar apenas os 10 primeiros lançamentos
}

async function fetchPopularSeries() {
  const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=pt-BR`);
  const data = await response.json();
  populateCarousel(data.results);
}

function displayMovies(movies, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  movies.forEach(movie => {
    container.innerHTML += `
      <div class="col-md-2 mb-4">
        <div class="card h-100">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">${movie.overview.substring(0, 50)}...</p>
            <a href="detalhes.html?id=${movie.id}" class="btn btn-primary btn-sm">Ver Detalhes</a>
          </div>
        </div>
      </div>
    `;
  });
}

function populateCarousel(series) {
  const carouselContent = document.getElementById('carousel-content');
  series.forEach((serie, index) => {
    const isActive = index === 0 ? 'active' : '';
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

fetchFeaturedMovies();
fetchNewReleases();
fetchPopularSeries();