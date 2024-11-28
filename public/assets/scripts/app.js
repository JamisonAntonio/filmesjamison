const API_KEY = '70e168104f5129f470175c08c511751a';
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchPopularSeries() {
  const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=pt-BR`);
  const data = await response.json();
  populateCarousel(data.results);
}

function populateCarousel(series) {
  const carouselContent = document.getElementById('carousel-content');
  series.forEach((serie, index) => {
    const isActive = index === 0 ? 'active' : '';
    carouselContent.innerHTML += `
      <div class="carousel-item ${isActive}">
        <img src="https://image.tmdb.org/t/p/w500${serie.poster_path}" class="d-block w-100" alt="${serie.name}">
        <div class="carousel-caption d-none d-md-block">
          <h5>${serie.name}</h5>
          <p>${serie.overview}</p>
        </div>
      </div>
    `;
  });
}

fetchPopularSeries();