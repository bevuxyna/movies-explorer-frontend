import React, {useEffect, useState} from "react";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import * as auth from '../../utils/auth.js';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import imageError from '../../images/image_error.svg';
import imageSuccess from '../../images/image_success.svg';
import {SHORT_MOVIE_DURATION} from "../../utils/constants";

function App() {
    const history = useHistory();

    const headerEndpoints = ["/movies", "/saved-movies", "/profile", "/"];
    const footerEndpoints = ["/movies", "/saved-movies", "/"];

    const [currentUser, setCurrentUser] = useState({
        name: "",
        email: "",
        _id: ""
    });
    const [loggedIn, setLoggedIn] = useState(false);
    const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
    const [infoTooltipImage, setInfoTooltipImage] = useState(imageSuccess);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [allMovies, setAllMovies] = useState([]); // загруженные фильмы при первом поиске
    const [foundMovies, setFoundMovies] = useState([]); // найденные фильмы
    const [savedMovies, setSavedMovies] = useState([]); // сохраненные фильмы
    const [savedMoviesList, setSavedMoviesList] = useState([]);

    const [isPreloader, setIsPreloader] = useState(false);

    useEffect(() => {
        tokenCheck();
    }, []);

    useEffect(() => {
        if (!localStorage.getItem("jwt")) {
            handleSignOut();
        }
    }, []);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("searchedMovies"))) {
            if (localStorage.getItem("searchedMovies")) {
                setAllMovies(JSON.parse(localStorage.getItem("searchedMovies")));
            }
        }
    }, [])

    useEffect(() => {
        if (localStorage.getItem("searchedMovies") && localStorage.getItem("checkboxStatus")) {
            const checkboxStatus = JSON.parse(localStorage.getItem("checkboxStatus"));
            handleCheckboxMovies(checkboxStatus);
        }
    }, []);

    useEffect(() => {
        if (loggedIn && currentUser) {
            getSavedMovies();
        }
    }, [loggedIn, currentUser]);

    //проверка наличия у пользователя токена
    function tokenCheck() {
        const token = localStorage.getItem("jwt");
        if (token) {
            mainApi.getUserInfo()
                .then((res) => {
                    if (res) {
                        setCurrentUser({
                            name: res.name,
                            email: res.email,
                            _id: res._id
                        });
                        setLoggedIn(true);
                    }
                })
                .catch((err) => {
                    if (err.status === 401) {
                        handleSignOut();
                    } else {
                        handleSignOut();
                    }
                });
        }
    }

    // Регистрация пользователя
    function handleRegister({name, password, email}) {
        setIsLoading(true);
        auth.register({name, password, email})
            .then(() => {
                //Попап успешной регистрации
                // setInfoTooltipImage(imageSuccess);
                // setMessage('Вы успешно зарегистрировались!');
                // setInfoTooltipOpen(true);

                handleLogin({password, email});
                history.push('/movies');
            })
            .catch((err) => {
                //Попап ошибки регистрации
                setInfoTooltipImage(imageError);
                setMessage('Что-то пошло не так! Попробуйте ещё раз.');
                setInfoTooltipOpen(true);

                console.log(`Ошибка ${err}`);
            });
    }

    // Авторизация пользователя
    function handleLogin({password, email}) {
        auth.authorize({password, email})
            .then((res) => {
                if (res.token) {
                    setLoggedIn(true);
                    localStorage.setItem("jwt", res.token);
                    tokenCheck();

                    //Попап успешного логина
                    setInfoTooltipImage(imageSuccess);
                    setMessage('Вы успешно авторизованы!');
                    setInfoTooltipOpen(true);

                    //Переадресация пользователя на основную страницу со всей функциональностью приложения
                    history.push('/movies');
                }
            })
            .catch((err) => {
                //Попап ошибки входа
                setInfoTooltipImage(imageError);
                setMessage('Вы ввели неверный e-mail или пароль!');
                setInfoTooltipOpen(true);

                console.log(`Ошибка ${err}`);
            })
    }

    //Выход из системы, удаляем всё из localStorage
    function handleSignOut() {
        localStorage.clear();
        setLoggedIn(false);
        setCurrentUser({ name: "", email: "", _id: "" });
        setFoundMovies([]);
        setAllMovies([]);
        setSavedMovies([]);
        history.push("/");
    }

    // Обновление данных пользователя
    function handleUpdateUser({name, email}) {
        setIsLoading(true);
        mainApi.updateUserInfo({name, email})
            .then((res) => {
                //обновляем стейт currentUser из полученных данных
                setCurrentUser({
                    name: res.name,
                    email: res.email
                });

                //Попап успешного редактирования
                setInfoTooltipImage(imageSuccess);
                setMessage('Вы успешно изменили данные!');
                setInfoTooltipOpen(true);
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);

                //Попап ошибки редактирования
                setInfoTooltipImage(imageError);
                setMessage('Что-то пошло не так! Попробуйте ещё раз.');
                setInfoTooltipOpen(true);
            })
    }

    // Закрытие попапов
    function closeAllPopups() {
        setInfoTooltipOpen(false);
    }

    // Поиск фильмов
    function handleSearchMovies(movie, checked) {
        if (allMovies.length !== 0) {
            const searchMovies = allMovies.filter((item) =>
                // Поиск фильмов регистронезависимый
                item.nameRU.toLowerCase().includes(movie.toLowerCase()));

            if (searchMovies.length === 0) {
                setInfoTooltipImage(imageError);
                setMessage('По вашему запросу ничего не найдено');
                setInfoTooltipOpen(true);
            } else {
                // При поиске текст запроса, найденные фильмы и состояние переключателя короткометражек
                // сохраняются в хранилище.
                localStorage.setItem("searchWord", movie);
                localStorage.setItem("searchedMovies", JSON.stringify(searchMovies));
                localStorage.setItem("checkboxStatus", JSON.stringify(checked));

                setFoundMovies(searchMovies);
            }
        } else {
            setIsPreloader(true);

            // Запрос всех фильмов с сервиса beatfilm-movies производится только при первом поиске
            moviesApi.getInitialMovies()
                .then((requestMovies) => {
                    const searchMovies = requestMovies.filter((item) =>
                        // Поиск фильмов регистронезависимый
                        item.nameRU.toLowerCase().includes(movie.toLowerCase()));

                    if (searchMovies.length === 0) {
                        setInfoTooltipImage(imageError);
                        setMessage('По вашему запросу ничего не найдено');
                        setInfoTooltipOpen(true);
                    } else {
                        // При поиске текст запроса, найденные фильмы и состояние переключателя короткометражек
                        // сохраняются в хранилище.
                        localStorage.setItem("loadedMovies", JSON.stringify(requestMovies));
                        setAllMovies(requestMovies);
                        localStorage.setItem("searchWord", movie);
                        localStorage.setItem("searchedMovies", JSON.stringify(searchMovies));
                        localStorage.setItem("checkboxStatus", JSON.stringify(checked));
                        setFoundMovies(searchMovies);
                    }
                })
                .catch((err) => {
                    console.log(`Ошибка ${err}`);
                })
                .finally(() => setIsPreloader(false));
        }
    }

    // Поиск короткометражек, управление чекбоксом "Короткометражки"
    function handleCheckboxMovies(checkbox) {
        let shortMovies;

        let movies = JSON.parse(localStorage.getItem("searchedMovies"));

        if (checkbox) {
            shortMovies = movies.filter((item) => item.duration <= SHORT_MOVIE_DURATION);
        } else if (!checkbox) {
            shortMovies = movies;
        }
        setFoundMovies(shortMovies);
        // Сохраняем состояние переключателя короткометражек в хранилище.
        localStorage.setItem("checkboxStatus", JSON.stringify(checkbox));
    }

    // Сохранение фильма
    function handleSaveMovie(movie) {
        mainApi.createMovie(movie)
            .then((res) => {
                setSavedMovies(savedMovies.concat(res));
                setSavedMoviesList(savedMoviesList.concat(res));
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            });
    }

    // Удаление фильма
    function handleDeleteMovie(movie) {
        mainApi.deleteMovie(movie._id)
            .then(() => {
                const updatedMoviesList = savedMovies.filter((item) => item._id !== movie._id);
                setSavedMovies(updatedMoviesList);
                setSavedMoviesList(savedMoviesList.filter((item) => item._id !== movie._id));
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            });
    }

    // Загрузка сохраненных фильмов
    function getSavedMovies() {
        mainApi.getSavedMovies()
            .then((res) => {
                const savedMovies = res.filter((movie) => movie.owner === currentUser._id);
                setSavedMovies(savedMovies);
                setSavedMoviesList(savedMovies);
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            });
    }

    // Поиск по сохраненным фильмам
    function handleSearchSavedMovie(req, checkbox) {
        setIsPreloader(true);
        const searchMovies = savedMovies.filter((item) =>
            item.nameRU.toLowerCase().includes(req.toLowerCase()));

        if (searchMovies.length === 0) {
            setInfoTooltipImage(imageError);
            setMessage('По вашему запросу ничего не найдено');
            setInfoTooltipOpen(true);
            setIsPreloader(false);
        } else {
            // При поиске состояние переключателя короткометражек сохраняется в хранилище.
            localStorage.setItem("checkboxStatus", JSON.stringify(checkbox));
            setSavedMovies(searchMovies);
            setIsPreloader(false);
        }
    }

    // Поиск короткометражек в сохраненных фильмах, управление чекбоксом "Короткометражки"
    function handleCheckboxSavedMovies(checkbox) {
        if (checkbox) {
            setSavedMovies(savedMovies.filter((item) => item.duration <= SHORT_MOVIE_DURATION));
        } else if (!checkbox) {
            setSavedMovies(savedMoviesList);
        }
        // Сохраняем состояние переключателя короткометражек в хранилище.
        localStorage.setItem("checkboxStatusSavedMovies", JSON.stringify(checkbox));
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Route exact path={headerEndpoints}>
                    <Header
                        loggedIn={loggedIn}
                    />
                </Route>

                <Switch>
                    <Route exact path="/">
                        <Main />
                    </Route>

                    <Route exact path="/sign-up">
                        {loggedIn
                            ? <Redirect to="/" />
                            : (
                                <Register
                                    onRegister={handleRegister}
                                    isLoading={isLoading}
                                />
                            )
                        }
                    </Route>

                    <Route exact path="/sign-in">
                        {loggedIn
                            ? <Redirect to="/" />
                            : (
                                <Login onLogin={handleLogin} />
                            )
                        }
                    </Route>

                    <ProtectedRoute
                        exact path="/profile"
                        component={Profile}
                        onUpdateUser={handleUpdateUser}
                        isLoading={isLoading}
                        onSignout={handleSignOut}
                        loggedIn={loggedIn}
                    />

                    <ProtectedRoute
                        exact path="/movies"
                        component={Movies}
                        onSearch={handleSearchMovies}
                        foundMovies={foundMovies}
                        onSaveMovie={handleSaveMovie}
                        onDeleteMovie={handleDeleteMovie}
                        savedMovies={savedMovies}
                        onSubmitCheckbox={handleCheckboxMovies}
                        preloaderStatus={isPreloader}
                    />

                    <ProtectedRoute
                        exact path="/saved-movies"
                        component={SavedMovies}
                        onSearch={handleSearchSavedMovie}
                        onSaveMovie={handleSaveMovie}
                        onDeleteMovie={handleDeleteMovie}
                        savedMovies={savedMovies}
                        onSubmitCheckbox={handleCheckboxSavedMovies}
                        preloaderStatus={isPreloader}
                    />

                    <Route path="*">
                        <PageNotFound />
                    </Route>
                </Switch>

                <Route exact path={footerEndpoints}>
                    <Footer/>
                </Route>

                <InfoTooltip
                    isOpen={infoTooltipOpen}
                    onClose={closeAllPopups}
                    image={infoTooltipImage}
                    message={message}
                />

            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
