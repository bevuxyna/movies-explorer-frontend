import React from 'react';
import logo from '../../images/logo.svg';
import {Link, NavLink, Route, Switch} from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Navigation from '../Navigation/Navigation';

function Header({loggedIn}) {
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
                            <button className="header__burger-menu-button" type="button" />
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

                <Route exact path={["/movies", "/saved-movies", "/profile"]}>
                    <div className="header__auth-container">
                        <Link to='/'><img src={logo} alt="Логотип" className="logo" /></Link>
                        <div className="header__auth-navigation">
                            <Navigation/>
                        </div>
                        <button className="header__burger-menu-button" type="button" />
                    </div>
                </Route>

                <Route exact path={["/movies", "/saved-movies", "/profile"]}>
                    <BurgerMenu />
                </Route>

            </Switch>
        </header>
    )
}

export default Header;