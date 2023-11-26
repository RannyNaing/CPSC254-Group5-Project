const API_URL_MOVIES = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=78769b78ad0491a0fd8e751518a5cfa3&page=1';
const API_URL_TVSHOWS = 'https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=78769b78ad0491a0fd8e751518a5cfa3&page=1';
const IMG_PATH ='https://image.tmdb.org/t/p/w1280';
const SEARCH_API_MOVIE = 'https://api.themoviedb.org/3/search/movie?api_key=78769b78ad0491a0fd8e751518a5cfa3&query=';
const SEARCH_API_TV = 'https://api.themoviedb.org/3/search/tv?api_key=78769b78ad0491a0fd8e751518a5cfa3&query=';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let currentMediaType = 'movie'; // 'movie' or 'tv'
let currentPage = 1;
let lastSearch = "";

// Function to fetch and display media (movies or TV shows)
async function getMedia(url) {
    const res = await fetch(url);
    const data = await res.json();
    displayMedia(data.results);
}

// Function to display media on the page
function displayMedia(media) {
    main.innerHTML = '';
    media.forEach((item) => {
        const { title, name, poster_path, vote_average, overview } = item;
        const mediaTitle = title || name; // TV shows have 'name', movies have 'title'
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${mediaTitle}">
            <div class="movie-info">
                <h3>${mediaTitle}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        main.appendChild(movieEl);
    });
}

// Function to get the class for rating
function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green';
    } else if(vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

// Function to update the title colors
function updateTitleColors() {
    if (currentMediaType === 'movie') {
        document.getElementById('moviesTitle').classList.add('movie-title-color');
        document.getElementById('tvShowsTitle').classList.remove('tvshow-title-color');
    } else {
        document.getElementById('moviesTitle').classList.remove('movie-title-color');
        document.getElementById('tvShowsTitle').classList.add('tvshow-title-color');
    }
}

// Call updateTitleColors on initial load
updateTitleColors();

// Function to load the initial page of movies or TV shows
function loadMedia(type) {
    currentPage = 1;
    lastSearch = "";
    currentMediaType = type;
    const url = type === 'movie' ? API_URL_MOVIES : API_URL_TVSHOWS;
    getMedia(url);
    updateTitleColors();
}

// Event listeners for the movies and tv shows buttons
document.getElementById('moviesTitle').addEventListener('click', (e) => {
    e.preventDefault();
    loadMedia('movie');
});

document.getElementById('tvShowsTitle').addEventListener('click', (e) => {
    e.preventDefault();
    loadMedia('tv');
});

// Function to update the page number and fetch media
function updatePage(increment) {
    currentPage += increment;
    if (lastSearch) {
        // If there was a last search, use the search API
        const searchURL = currentMediaType === 'movie' ? SEARCH_API_MOVIE : SEARCH_API_TV;
        getMedia(searchURL + lastSearch + '&page=' + currentPage);
    } else {
        // If there was no last search, use the standard API
        const apiURL = currentMediaType === 'movie' ? API_URL_MOVIES : API_URL_TVSHOWS;
        getMedia(apiURL + '&page=' + currentPage);
    }
}

// Event listener for the search form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm && searchTerm !== '') {
        lastSearch = searchTerm;
        currentPage = 1;
        updatePage(0); // Fetch the first page of search results
    }
});

// Event listeners for pagination buttons
nextButton.addEventListener('click', () => {
    updatePage(1); // Increment page and fetch the next page of results
});

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        updatePage(-1); // Decrement page and fetch the previous page of results
    }
});

// Call loadMedia on initial load to start with the first page of movies
loadMedia('movie');
