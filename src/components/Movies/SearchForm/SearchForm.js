import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../../images/search_icon.svg';

function SearchForm ({onSearch, onSubmitCheckbox}) {
    const [inputValue, setInputValue] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [searchError, setSearchError] = useState({
        errorMessage: "",
        isValid: true
    });

    const location = useLocation();

    // Берем из хранилища название фильма и состояние чекбокса
    useEffect(() => {
        if (location.pathname === "/movies") {
            setInputValue(localStorage.getItem("searchWord"));
            setIsChecked(JSON.parse(localStorage.getItem("checkboxStatus")));
        } else if (location.pathname === "/saved-movies") {
            const checkboxStatus = JSON.parse(localStorage.getItem("checkboxStatusSavedMovies"));
            setIsChecked(checkboxStatus);
            onSubmitCheckbox(checkboxStatus);
        }
    }, [location]);

    useEffect(() => {
        searchError.isValid && setSearchError({errorMessage: "", isValid: true});
    }, []);

    function handleInputChange(evt) {
        setInputValue(evt.target.value);

        if (evt.target.value.length === 0) {
            setSearchError({
                isValid: evt.target.validity.valid,
                errorMessage: "Нужно ввести ключевое слово"
            });
        } else {
            setSearchError({
                isValid: evt.target.validity.valid,
                errorMessage: ""
            });
        }
    }

    function handleSubmitSearch(evt) {
        evt.preventDefault();

        if (!inputValue) {
            return setSearchError({
                isValid: false,
                errorMessage: "Нужно ввести ключевое слово"
            });
        }

        onSearch(inputValue, isChecked);
    }

    function handleChangeCheckbox() {
        setIsChecked(!isChecked);
        onSubmitCheckbox(!isChecked);
    }

    return (
        <div className="search-form">
            <form
                className="search-form__container"
                onSubmit={handleSubmitSearch}
                noValidate
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

            <span className="search-form__error">{searchError.errorMessage}</span>

            <FilterCheckbox
                isChecked={isChecked}
                onSubmitCheckbox={handleChangeCheckbox}
            />
        </div>
    )
}

export default SearchForm;