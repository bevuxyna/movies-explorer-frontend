import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../../images/search_icon.svg';

function SearchForm () {
    return (
        <div className="search-form">
            <form className="search-form__container">
                <img className="search-form__container_icon" src={searchIcon} alt="Лупа"></img>
                <input className="search-form__container_input" placeholder="Фильм" required></input>
                <button className="search-form__container_button" type="submit" />
            </form>

            <FilterCheckbox/>
        </div>
    )
}

export default SearchForm;