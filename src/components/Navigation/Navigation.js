import {NavLink} from 'react-router-dom';

function Navigation() {
    return (
            <nav className="navigation">
                <div className="navigation__movies">
                    <NavLink
                        className="navigation__movies-link"
                        activeClassName="navigation__movies-link_active"
                        to="/movies"
                    >
                        Фильмы
                    </NavLink>

                    <NavLink
                        className="navigation__movies-link"
                        activeClassName="navigation__movies-link_active"
                        to="/saved-movies"
                    >
                        Сохранённые фильмы
                    </NavLink>
                </div>

                <div className="navigation__account">
                    <NavLink
                        className="navigation__account-link"
                        to="/profile"
                    >
                        Аккаунт
                    </NavLink>
                    <button className="navigation__account-icon"/>
                </div>
            </nav>
    );
}

export default Navigation;