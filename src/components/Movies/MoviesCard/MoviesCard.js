import React from 'react';
import {Route} from 'react-router-dom';
import movieCard from '../../../images/movie.png';

function MoviesCard() {
    return (
            <li className="movies-card">
                <img className="movies-card__image" src={movieCard} alt="Постер фильма" />

                <div className="movies-card__info">
                    <h2 className="movies-card__container-title">33 слова о дизайне</h2>
                    <p className="movies-card__container-duration">1ч 17м</p>
                </div>

                <div className="movies-card__button">
                    <Route path="/movies">
                        <button className="movies-card__button-save" type="button">Сохранить</button>
                    </Route>

                    <Route path="/movies">
                        <button className="movies-card__button-saved" type="button" />
                    </Route>

                    <Route path="/saved-movies">
                        <button className="movies-card__button-delete" type="button" />
                    </Route>
                </div>
            </li>
    );
}

export default MoviesCard;