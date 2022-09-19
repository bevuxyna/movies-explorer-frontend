import React from 'react';
import StudentImage from '../../../images/student.jpg'

function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__title" id="student">Студент</h2>
            <div className="about-me__container">
                <div className="about-me__info">
                    <h3 className="about-me__name">Влада</h3>
                    <p className="about-me__subtitle">Фронтенд-разработчик, 26 лет</p>
                    <p className="about-me__description">Я родилась в городе Байконур. Живу в Москве. В 2020 году окончила МГТУ им. Н.Э. Баумана</p>
                    <a href="https://github.com/bevuxyna" className="about-me__contact-link" target="_blank">Github</a>
                </div>
                <img className="about-me__image" alt="Фотография девушки" src={StudentImage}/>
            </div>
        </section>
    )
}

export default AboutMe;