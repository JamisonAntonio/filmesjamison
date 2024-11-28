const API_KEY = '70e168104f5129f470175c08c511751a';
const BASE_URL = 'https://api.themoviedb.org/3';

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

async function fetchMovieDetails(id) {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`);
  const data = await response.json();
  displayMovieDetails(data);
}

function displayMovieDetails(movie) {
  document.getElementById('movie-title').innerText = movie.title;
  document.getElementById('movie-poster').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  document.getElementById('movie-overview').innerText = movie.overview;
  document.getElementById('movie-release').innerText = movie.release_date;
  document.getElementById('movie-language').innerText = movie.original_language;
  document.getElementById('movie-rating').innerText = movie.vote_average;
  document.getElementById('movie-popularity').innerText = movie.popularity;
}

fetchMovieDetails(movieId);