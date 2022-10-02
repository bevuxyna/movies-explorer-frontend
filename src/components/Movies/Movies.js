import React from 'react';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

function Movies({onSearch, onSubmitCheckbox, foundMovies, onSaveMovie, onDeleteMovie, savedMovies, preloaderStatus}) {
    return (
        <section className="movies">
            <SearchForm
                onSearch={onSearch}
                onSubmitCheckbox={onSubmitCheckbox}
            />

            {preloaderStatus ? (
                <Preloader />
            ) : (
                <MoviesCardList
                    foundMovies={foundMovies}
                    onSaveMovie={onSaveMovie}
                    onDeleteMovie={onDeleteMovie}
                    savedMovies={savedMovies}
                />
            )}
        </section>
    )
}

export default Movies;