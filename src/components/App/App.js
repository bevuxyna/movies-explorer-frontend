import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";

import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import * as auth from '../../utils/auth.js';

function App() {

    const headerEndpoints = ["/movies", "/saved-movies", "/profile", "/"];
    const footerEndpoints = ["/movies", "/saved-movies", "/"];

    return (
            <div className="page">
                <Route exact path={headerEndpoints}>
                    <Header />
                </Route>

                <Switch>
                    <Route exact path="/">
                        <Main />
                    </Route>

                    <Route exact path="/sign-up">
                        <Register />
                    </Route>

                    <Route exact path="/sign-in">
                        <Login />
                    </Route>

                    <Route exact path="/profile">
                        <Profile />
                    </Route>

                    <Route exact path="/movies">
                        <Movies />
                    </Route>

                    <Route exact path="/saved-movies">
                        <SavedMovies />
                    </Route>

                    <Route path="*">
                        <PageNotFound />
                    </Route>
                </Switch>

                <Route exact path={footerEndpoints}>
                    <Footer/>
                </Route>

            </div>
    );
}

export default App;
