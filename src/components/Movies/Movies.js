import React from 'react';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

function Movies() {
    return (
        <section className="movies">
            <SearchForm />
            <MoviesCardList/>
            {/*<Preloader />*/}
        </section>
    )
}

export default Movies;