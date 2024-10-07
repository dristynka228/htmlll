let movies = [];

function addMovie() {
    const title = document.getElementById('movie-title').value;
    const director = document.getElementById('movie-director').value;
    const year = document.getElementById('movie-year').value;


    if (title === '' || director === '' || year === '' || year < 1800 || year > new Date().getFullYear()) {
        return;
    }

    const movie = {
        id: Date.now(),
        title: title,
        director: director,
        year: year
    };

    movies.push(movie);

  
    clearForm();

    displayMovies();
}

function clearForm() {
    document.getElementById('movie-title').value = '';
    document.getElementById('movie-director').value = '';
    document.getElementById('movie-year').value = '';
}

function displayMovies() {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';

    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.className = 'movie-item';

        movieItem.innerHTML = `
            <span><strong>${movie.title}</strong> (${movie.year}) by ${movie.director}</span>
            <button class="edit-btn" onclick="editMovie(${movie.id})">Edit</button>
            <button class="delete-btn" onclick="deleteMovie(${movie.id})">Delete</button>
        `;

        movieList.appendChild(movieItem);
    });
}

function deleteMovie(id) {
    movies = movies.filter(movie => movie.id !== id);
    displayMovies();
}

function editMovie(id) {
    const movie = movies.find(movie => movie.id === id);

    if (movie) {
        document.getElementById('movie-title').value = movie.title;
        document.getElementById('movie-director').value = movie.director;
        document.getElementById('movie-year').value = movie.year;

        deleteMovie(id);
    }
}
