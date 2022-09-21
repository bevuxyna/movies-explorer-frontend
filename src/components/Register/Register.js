import React, {useState} from 'react';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';

function Register({onRegister}) {
    const [userData, setUserData] = useState({
        name: '',
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
        onRegister(userData);
    }

    return (
        <section className="register">
            <Link to='/'><img src={logo} alt="Логотип" className="logo" /></Link>
            <h2 className="register__title">Добро пожаловать!</h2>
            <form className="register__form" onSubmit={handleSubmit}>
                <label className="register__form-label">Имя</label>
                <input
                    className="register__form-input"
                    name="name"
                    type="text"
                    id="name"
                    required
                    value={userData.name}
                    onChange={handleChange}
                />

                <label className="register__form-label">E-mail</label>
                <input
                    className="register__form-input"
                    name="email"
                    type="email"
                    id="email"
                    required
                    value={userData.email}
                    onChange={handleChange}
                />

                <label className="register__form-label">Пароль</label>
                <input
                    className="register__form-input"
                    name="password"
                    type="password"
                    id="password"
                    required
                    value={userData.password}
                    onChange={handleChange}
                />

                <button
                    className="register__form-button-submit"
                    type="submit"
                >
                    Зарегистрироваться
                </button>
            </form>

            <div className="register__form-signin-block">
                <p className="register__form-signin-text">Уже зарегистрированы? </p>
                <Link className="register__form-signin-link" to="/sign-in">Войти</Link>
            </div>
        </section>
    )
}

export default Register;