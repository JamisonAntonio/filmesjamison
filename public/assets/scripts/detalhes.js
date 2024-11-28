const API_KEY = '70e168104f5129f470175c08c511751a';
const BASE_URL = 'https://api.themoviedb.org/3';
const JSON_SERVER_URL = 'http://localhost:3000';

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

async function fetchMovieDetails(id) {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`);
  const data = await response.json();
  displayMovieDetails(data);
  fetchMovieCast(id);
}

function displayMovieDetails(movie) {
  document.getElementById('movie-title').innerText = movie.title;
  document.getElementById('movie-poster').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  document.getElementById('movie-overview').innerText = movie.overview;
  document.getElementById('movie-release').innerText = movie.release_date;
  document.getElementById('movie-language').innerText = movie.original_language;
  document.getElementById('movie-rating').innerText = movie.vote_average;
  document.getElementById('movie-popularity').innerText = movie.popularity;

  // Configurar botão de favoritos
  const favButton = document.getElementById('fav-btn');
  favButton.addEventListener('click', () => addToFavorites(movie));
}

async function fetchMovieCast(id) {
  const response = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=pt-BR`);
  const data = await response.json();
  displayMovieCast(data.cast);
}

function displayMovieCast(cast) {
  const carouselContent = document.getElementById('carousel-cast-content');
  let active = true;
  cast.forEach((actor, index) => {
    const isActive = active ? 'active' : '';
    if (index % 5 === 0) {
      carouselContent.innerHTML += `<div class="carousel-item ${isActive}"><div class="d-flex justify-content-around">`;
      active = false;
    }
    carouselContent.innerHTML += `
      <div class="text-center mx-3">
        <img src="https://image.tmdb.org/t/p/w200${actor.profile_path}" class="rounded-circle mb-2" alt="${actor.name}">
        <p class="mb-0"><strong>${actor.name}</strong></p>
        <p class="text-muted small">${actor.character}</p>
      </div>
    `;
    if (index % 5 === 4 || index === cast.length - 1) {
      carouselContent.innerHTML += `</div></div>`;
    }
  });
}

async function addToFavorites(movie) {
  try {
    const response = await fetch(`${JSON_SERVER_URL}/seriesFavoritas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        overview: movie.overview,
        release_date: movie.release_date
      })
    });
    if (response.ok) {
      alert('Filme adicionado aos favoritos com sucesso!');
    } else {
      alert('Erro ao adicionar aos favoritos.');
    }
  } catch (error) {
    console.error('Erro ao adicionar aos favoritos:', error);
  }
}

fetchMovieDetails(movieId);