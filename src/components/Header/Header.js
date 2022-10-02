import React, {useState} from 'react';
import logo from '../../images/logo.svg';
import {Link, NavLink, Route, Switch} from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from "../BurgerMenu/BurgerMenu";

function Header({loggedIn}) {
    const burgerMenuEndpoints = ["/movies", "/saved-movies", "/profile", "/"];
    const authEndpoints = ["/movies", "/saved-movies", "/profile"];

    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

    function handleOpenBurgerMenu() {
        setIsBurgerMenuOpen(true);
        console.log(isBurgerMenuOpen)
    }

    function handleCloseBurgerMenu() {
        setIsBurgerMenuOpen(false);
    }

    return (
        <header className="header">
            <Switch>
                <Route exact path="/">
                    {loggedIn ? (
                        <div className="header__auth-container">
                            <Link to='/'><img src={logo} alt="Логотип" className="logo" /></Link>
                            <div className="header__auth-navigation">
                                <Navigation/>
                            </div>
                            <button
                                className="header__burger-menu-button"
                                onClick={handleOpenBurgerMenu}
                            />
                        </div>
                    ) : (
                        <div className="header__container">
                            <Link to='/'><img src={logo} alt="Логотип" className="logo" /></Link>
                            <div className="header__navigation">
                                <NavLink to="/sign-up" className="header__register-link">Регистрация</NavLink>
                                <NavLink to="/sign-in" className="header__login-link">Войти</NavLink>
                            </div>
                        </div>
                    )}
                </Route>

                <Route exact path={authEndpoints}>
                    <div className="header__auth-container">
                        <Link to='/'><img src={logo} alt="Логотип" className="logo" /></Link>
                        <div className="header__auth-navigation">
                            <Navigation/>
                        </div>
                        <button
                            className="header__burger-menu-button"
                            onClick={handleOpenBurgerMenu}
                        />
                    </div>
                </Route>

                <Route exact path={burgerMenuEndpoints}>
                    <BurgerMenu
                        isOpen={isBurgerMenuOpen}
                        onCloseBurgerMenu={handleCloseBurgerMenu}
                    />
                </Route>

            </Switch>
        </header>
    )
}

export default Header;