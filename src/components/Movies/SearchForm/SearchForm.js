import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../../images/search_icon.svg';

function SearchForm () {
    return (
        <div className="search-form">
            <div className="search-form__container">
                <img className="search-form__container_icon" src={searchIcon} alt="Лупа"></img>
                <input className="search-form__container_input" placeholder="Фильм" required></input>
                <button className="search-form__container_button" />
            </div>

            <FilterCheckbox/>
        </div>
    )
}

export default SearchForm;