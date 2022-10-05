import React from 'react';
import {Route} from 'react-router-dom';
import {BASE_BEATFILMMOVIES_URL, handleMovieDuration} from "../../../utils/constants";

function MoviesCard({movie, onSaveMovie, onDeleteMovie, savedMovies}) {
    const isSaved = savedMovies.find((item) => item.movieId === movie.id);

    function handleSaveMovie() {
        if (!isSaved) {
            onSaveMovie(movie);
        } else {
            onDeleteMovie(movie);
        }
    }

    function handleDeleteMovie() {
        onDeleteMovie(movie);
    }

    return (
        <li className="movies-card">
            <a href={movie.trailerLink} target="blank">
                <img
                    className="movies-card__image"
                    src={movie.image.url ? `${BASE_BEATFILMMOVIES_URL}/${movie.image.url}` : movie.image}
                    alt={`Постер фильма "${movie.nameRU}"`}
                />
            </a>

            <div className="movies-card__info">
                <h2 className="movies-card__container-title">{movie.nameRU}</h2>
                <p className="movies-card__container-duration">{handleMovieDuration(movie.duration, movie)}</p>
            </div>

            <div className="movies-card__button">
                <Route path="/movies">
                    <button
                        className={isSaved ? "movies-card__button-saved" : "movies-card__button-save"}
                        type="button"
                        onClick={handleSaveMovie}
                    >
                        {!isSaved ? "Сохранить" : ""}
                    </button>
                </Route>

                <Route path="/saved-movies">
                    <button
                        className="movies-card__button-delete"
                        type="button"
                        onClick={handleDeleteMovie}
                    />
                </Route>
            </div>
        </li>
    );
}

export default MoviesCard;