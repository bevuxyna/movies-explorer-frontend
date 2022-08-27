import React from "react";
import {Route, Routes} from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";

function App() {

    return (
            <div className="page">
                    <Header />

                    <Routes>
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

                    </Routes>

                    <Footer/>

            </div>
    );
}

export default App;
