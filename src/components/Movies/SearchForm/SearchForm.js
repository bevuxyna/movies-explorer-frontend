import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../../images/search_icon.svg';

function SearchForm ({onSearch, onSubmitCheckbox}) {
    const [inputValue, setInputValue] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const location = useLocation();

    // Берем из хранилища название фильма и состояние чекбокса
    useEffect(() => {
        if (location.pathname === "/movies") {
            setInputValue(localStorage.getItem("movieName"));
            setIsChecked(JSON.parse(localStorage.getItem("checkboxStatus")));
        } else if (location.pathname === "/saved-movies") {
            const checkboxStatus = JSON.parse(localStorage.getItem("checkboxStatusSavedMovies"));
            setIsChecked(checkboxStatus);
            onSubmitCheckbox(checkboxStatus);
        }
    }, [location]);

    function handleInputChange(evt) {
        setInputValue(evt.target.value);
    }

    function handleSubmitSearch(evt) {
        evt.preventDefault();
        onSearch(inputValue, isChecked);
    }

    return (
        <div className="search-form">
            <form
                className="search-form__container"
                onSubmit={handleSubmitSearch}
            >
                <img
                    className="search-form__container_icon"
                    src={searchIcon}
                    alt="Лупа"
                ></img>
                <input
                    className="search-form__container_input"
                    placeholder="Фильм"
                    required
                    name="movie"
                    type="text"
                    value={inputValue || ""}
                    onChange={handleInputChange}
                ></input>
                <button
                    className="search-form__container_button"
                    type="submit"
                />
            </form>

            <FilterCheckbox
                onSubmitCheckbox={onSubmitCheckbox}
            />
        </div>
    )
}

export default SearchForm;