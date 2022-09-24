import React, {useEffect, useState} from "react";
import {Route, Switch, useHistory} from "react-router-dom";
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

import mainApi from "../../utils/MainApi";
import * as auth from '../../utils/auth.js';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import imageError from '../../images/image_error.svg';
import imageSuccess from '../../images/image_success.svg';

function App() {
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

    const history = useHistory();

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
                    // if (err.status === 401) {
                    //     handleSignout();
                    // } else {
                    //     handleSignout();
                    //     setIsTooltipPopupOpen(true);
                    //     setSuccess(false);
                    //     setPopupText(`Ошибка ${err.statusText}`);
                    // }
                });
        }
    }

    useEffect(() => {
        tokenCheck();
    }, []);

    function handleRegister(registerData) {
        setIsLoading(true);
        auth.register(registerData)
            .then(() => {
                //Попап успешной регистрации
                setInfoTooltipImage(imageSuccess);
                setMessage('Вы успешно зарегистрировались!');
                setInfoTooltipOpen(true);

                //Переадресация пользователя на страницу входа
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

    function handleLogin(loginData) {
        auth.authorize(loginData)
            .then((res) => {
                if (res.token) {
                    setLoggedIn(true);
                    localStorage.setItem('jwt', res.token);
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

    //Выход из системы, удаляем JWT-токен из localStorage
    function handleSignOut() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
    }

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

    const closeAllPopups = () => {
        setInfoTooltipOpen(false);
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Route exact path={headerEndpoints}>
                    <Header />
                </Route>

                <Switch>
                    <Route exact path="/">
                        <Main />
                    </Route>

                    <Route exact path="/sign-up">
                        <Register
                            onRegister={handleRegister}
                            isLoading={isLoading}
                        />
                    </Route>

                    <Route exact path="/sign-in">
                        <Login onLogin={handleLogin} />
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
                    />

                    <ProtectedRoute
                        exact path="/saved-movies"
                        component={SavedMovies}
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
