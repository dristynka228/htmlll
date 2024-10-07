class Movie {
    constructor(title, genre, rating) {
        this.title = title;
        this.genre = genre;
        this.rating = rating;
    }
}

class MovieManager {
    constructor() {
        this.movies = [];
        this.selectedMovieIndex = null;
    }

    addMovie(movie) {
        this.movies.push(movie);
        this.updateMovieList();
    }

    editMovie(index, movie) {
        this.movies[index] = movie;
        this.updateMovieList();
    }

    deleteMovie(index) {
        this.movies.splice(index, 1);
        this.updateMovieList();
    }

    updateMovieList() {
        const movieList = document.getElementById('movie-list');
        movieList.innerHTML = '';

        this.movies.forEach((movie, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <span>
                    <strong>${movie.title}</strong> - ${movie.genre} - Рейтинг: ${movie.rating}/10
                </span>
                <div>
                    <button class="btn btn-sm btn-warning me-2" onclick="editMovie(${index})">Редактировать</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteMovie(${index})">Удалить</button>
                </div>
            `;
            movieList.appendChild(li);
        });
    }
}

const movieManager = new MovieManager();

const movieForm = document.getElementById('movie-form');
const movieTitleInput = document.getElementById('movie-title');
const movieGenreInput = document.getElementById('movie-genre');
const movieRatingInput = document.getElementById('movie-rating');
const submitBtn = document.getElementById('submit-btn');

movieForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = movieTitleInput.value;
    const genre = movieGenreInput.value;
    const rating = movieRatingInput.value;

    if (movieManager.selectedMovieIndex === null) {
        const movie = new Movie(title, genre, rating);
        movieManager.addMovie(movie);
    } else {
        const movie = new Movie(title, genre, rating);
        movieManager.editMovie(movieManager.selectedMovieIndex, movie);
        submitBtn.textContent = 'Добавить фильм';
        movieManager.selectedMovieIndex = null;
    }

    movieTitleInput.value = '';
    movieGenreInput.value = '';
    movieRatingInput.value = '';
});

function editMovie(index) {
    const movie = movieManager.movies[index];
    movieTitleInput.value = movie.title;
    movieGenreInput.value = movie.genre;
    movieRatingInput.value = movie.rating;

    movieManager.selectedMovieIndex = index;
    submitBtn.textContent = 'Сохранить изменения';
}

function deleteMovie(index) {
    movieManager.deleteMovie(index);
}
