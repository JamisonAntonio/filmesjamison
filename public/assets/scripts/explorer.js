const API_KEY = '70e168104f5129f470175c08c511751a';
const BASE_URL = 'https://api.themoviedb.org/3';





document.getElementById('search-button').addEventListener('click', async () => {
  const query = document.getElementById('search-query').value;
  const response = await fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&include_adult=false&language=pt-BR&query=${query}`);
  const data = await response.json();
  displaySearchResults(data.results);
});

function displaySearchResults(results) {
  const resultsContainer = document.getElementById('search-results-cards');
  resultsContainer.innerHTML = '';
  results.forEach(result => {
    resultsContainer.innerHTML += `
      <div class="col-md-4 mb-3">
        <div class="card">
          <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" class="card-img-top" alt="${result.name}">
          <div class="card-body">
            <h5 class="card-title">${result.name}</h5>
            <p class="card-text">${result.overview || 'Sem descrição disponível.'}</p>
            <a href="detalhes.html?id=${result.id}" class="btn btn-primary">Detalhes</a>
          </div>
        </div>
      </div>
    `;
  });
}