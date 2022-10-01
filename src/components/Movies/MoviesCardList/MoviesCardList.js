import {Route, useLocation} from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import {useEffect, useState} from "react";
import { DEVICE_WIDTH_1280, DEVICE_WIDTH_1100, DEVICE_WIDTH_768, DEVICE_WIDTH_480, MAX_CARDS} from "../../../utils/constants";

function MoviesCardList({foundMovies, onSaveMovie, onDeleteMovie, savedMovies}) {
    const location = useLocation();

    //max количество карточек в блоке при первом поиске
    const [maxCards, setMaxCards] = useState(12);

    //Блок результатов появляется только после обработки запроса.
    // Если пользователь ещё ничего не искал, блока с карточками на странице нет.
    const [renderedMovies, setRenderedMovies] = useState([]);

    //ширина экрана устройства
    const [deviceWidth, setDeviceWidth] = useState(1280);

    useEffect(() => {
        setMovies();
    }, [maxCards]);

    useEffect(() => {
        checkDeviceWidth();
    }, [deviceWidth, foundMovies, location]);

    // Проверка ширины экрана устройства при монтировании компонента результатов
    useEffect(() => {
        onSubscribe();
        return () => offSubscribe();
    }, []);

    // Количество найденных фильмов в блоке результата
    function setFoundMovies(count) {
        setMaxCards(count);
        let movies = [];
        foundMovies.forEach((item, i) => {
            if (i < count) {
                movies.push(item);
            }
        });
        setRenderedMovies(movies);
    }

    function checkDeviceWidth() {
        if (deviceWidth < DEVICE_WIDTH_768) {
            setFoundMovies(5);
        } else if (deviceWidth < DEVICE_WIDTH_1100) {
            setFoundMovies(6);
        } else if (deviceWidth < DEVICE_WIDTH_1280) {
            setFoundMovies(9);
        } else {
            setFoundMovies(12);
        }
        if (location.pathname === "/saved-movies") {
            setMaxCards(MAX_CARDS);
        }
    }

    function handleSubscribe() {
        setDeviceWidth(window.innerWidth);
    }

    function onSubscribe() {
        // Пользователь может изменять ширину экрана своего устройства.
        // Например, переводя телефон из портретной ориентации в альбомную, и наоборот.
        // Это событие можно отслеживать с помощью слушателя "resize".
        // Чтобы колбэк-функция слушателя не срабатывала слишком часто,
        // например, при изменении ширины экрана в отладчике, устанавливаем setTimeout
        // на вызов этой функции внутри слушателя "resize".
        window.addEventListener("resize", function () {
            setTimeout(handleSubscribe, 3000);
        });
    }

    function offSubscribe() {
        window.removeEventListener("resize", function () {
            setTimeout(handleSubscribe, 3000);
        });
    }

    function setMovies() {
        let movies = [];
        foundMovies.forEach((item, i) => {
            if (i < maxCards) {
                movies.push(item);
            }
        });
        setRenderedMovies(movies);
    }

    function handleAddButtonClick() {
        if (deviceWidth < DEVICE_WIDTH_1280) {
            //Ширина 1280px — 12 карточек по 3 в ряд. Кнопка «Ещё» загружает по 3 карточки.
            setMaxCards(maxCards + 3);
        } else if (deviceWidth < DEVICE_WIDTH_1100) {
            //Ширина 768px — 8 карточек по 2 в ряд. Кнопка «Ещё» загружает по 2 карточки
            setMaxCards(maxCards + 2);
        } else if (deviceWidth < DEVICE_WIDTH_480) {
            //Ширина от 320px до 480px — 5 карточек по 1 в ряд. Кнопка «Ещё» загружает по 2 карточки.
            setMaxCards(maxCards + 2);
        } else {
            setMaxCards(maxCards + 3);
        }
    }


    return (
        <div className="movies-card-list">
            <p className="movies-card-list__not-found">Фильмы не найдены</p>
            <ul className="movies-card-list__container">
                {renderedMovies.map((item) => (
                    <MoviesCard
                        movie={item}
                        key={item.id || item._id}
                        onSaveMovie={onSaveMovie}
                        onDeleteMovie={onDeleteMovie}
                        savedMovies={savedMovies}
                    />
                ))}
            </ul>

            {foundMovies.length !== renderedMovies.length ? (
                <Route path="/movies">
                    <button
                        className="movies-card-list__button"
                        type="button"
                        onClick={handleAddButtonClick}
                    >
                        Ещё
                    </button>
                </Route>
            ) : (
                // Когда все карточки отрисованы, кнопка «Ещё» должна пропасть.
                ""
            )}
        </div>
    );
}

export default MoviesCardList;