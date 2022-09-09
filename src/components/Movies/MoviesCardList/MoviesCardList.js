import {Route} from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
    return (
        <div className="movies-card-list">
            <div className="movies-card-list__container">
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
            </div>
        </div>
    );
}

export default MoviesCardList;