import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';

function Register({onRegister, isLoading}) {
    const [userData, setUserData] = useState({
        name: {
            value: "",
            isValid: false,
            errorMessage: ""
        },
        email: {
            value: "",
            isValid: false,
            errorMessage: ""
        },
        password: {
            value: "",
            isValid: false,
            errorMessage: ""
        }
    });

    const isValid =
        userData.name.isValid &&
        userData.email.isValid &&
        userData.password.isValid;

    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        isLoading ? setDisabled(true) : setDisabled(false);
    }, [isLoading]);

    useEffect(() => {
        isValid ? setDisabled(false) : setDisabled(true);
    }, [isValid]);

    const handleChange = (evt) => {
        const { name, value, validity, validationMessage } = evt.target;

        setUserData((prevState) => ({
            ...prevState,
            [name]: {
                ...userData[name],
                value,
                isValid: validity.valid,
                errorMessage: validationMessage
            }
        }));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onRegister({
            name: userData.name.value,
            email: userData.email.value,
            password: userData.password.value
        });
    }

    return (
        <section className="register">
            <Link to='/'><img src={logo} alt="Логотип" className="logo" /></Link>
            <h2 className="register__title">Добро пожаловать!</h2>
            <form className="register__form" onSubmit={handleSubmit}>
                <label className="register__form-label">Имя</label>
                <input
                    className={`register__form-input ${
                        userData.name.errorMessage && "register__form-input_error"
                    }`}
                    name="name"
                    type="text"
                    required
                    minLength="2"
                    maxLength="20"
                    value={userData.name.value || ""}
                    onChange={handleChange}
                />
                <span className="register__form-error">
                    {userData.name.errorMessage}
                </span>

                <label className="register__form-label">E-mail</label>
                <input
                    className={`register__form-input ${
                        userData.email.errorMessage && "register__form-input_error"
                    }`}
                    name="email"
                    type="email"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    value={userData.email.value || ""}
                    onChange={handleChange}
                />
                <span className="register__form-error">
                    {userData.email.errorMessage}
                </span>

                <label className="register__form-label">Пароль</label>
                <input
                    className={`register__form-input ${
                        userData.password.errorMessage && "register__form-input_error"
                    }`}
                    name="password"
                    type="password"
                    required
                    value={userData.password.value || ""}
                    onChange={handleChange}
                />
                <span className="register__form-error">
                    {userData.password.errorMessage}
                </span>

                <button
                    className={`register__form-button-submit ${
                        isValid && !isLoading ? "" : "register__form-button-submit_disabled"
                    }`}
                    type="submit"
                    disabled={disabled}
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