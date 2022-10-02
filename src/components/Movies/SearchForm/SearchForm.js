import React, {useState} from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../../images/search_icon.svg';

function SearchForm ({onSearch, onSubmitCheckbox}) {
    const [inputValue, setInputValue] = useState("");

    function handleInputChange(evt) {
        setInputValue(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onSearch(inputValue);
    }

    return (
        <div className="search-form">
            <form
                className="search-form__container"
                onSubmit={handleSubmit}
            >
                <img className="search-form__container_icon" src={searchIcon} alt="Лупа"></img>
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