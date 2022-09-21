import React, {useState} from 'react';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';

function Login({onLogin}) {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setUserData({
            ...userData, [name]: value
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onLogin(userData);
        setUserData({email: '', password: ''});
    }

    return (
        <section className="login">
            <Link to='/'><img src={logo} alt="Логотип" className="logo" /></Link>
            <h2 className="login__title">Рады видеть!</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <label className="login__form-label">E-mail</label>
                <input
                    className="login__form-input"
                    name="email"
                    type="email"
                    id="email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                />

                <label className="login__form-label">Пароль</label>
                <input
                    className="login__form-input"
                    name="password"
                    type="password"
                    id="password"
                    value={userData.password}
                    onChange={handleChange}
                    required
                />

                <button
                    className="login__form-button-submit"
                    type="submit"
                >
                    Войти
                </button>
            </form>

            <div className="login__form-signup-block">
                <p className="login__form-signup-text">Еще не зарегистрированы? </p>
                <Link className="login__form-signup-link" to="/sign-up">Регистрация</Link>
            </div>
        </section>
    )
}

export default Login;