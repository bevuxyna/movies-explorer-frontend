import React, {useState} from 'react';

function FilterCheckbox ({onSubmitCheckbox}) {
    const [isChecked, setIsChecked] = useState(false);

    function handleChangeCheckbox() {
        setIsChecked(!isChecked);
        onSubmitCheckbox(!isChecked);
    }

    return (
            <label className="filter-checkbox">
                <div className="filter-checkbox__container">
                    <input
                        className="filter-checkbox__input"
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleChangeCheckbox}
                    />
                    <span className="filter-checkbox__tumbler" />
                </div>
                <p className="filter-checkbox__text">Короткометражки</p>
            </label>
    )
}

export default FilterCheckbox;