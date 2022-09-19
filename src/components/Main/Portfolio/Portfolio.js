import React from 'react';

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__item">
                    <a
                        href="https://github.com/bevuxyna/how-to-learn"
                        className="portfolio__link"
                        target="_blank"
                    >
                        Статичный сайт
                        <p className="portfolio__link-arrow">&#8599;</p>
                    </a>
                </li>

                <li className="portfolio__item">
                    <a
                        href="https://github.com/bevuxyna/russian-travel"
                        className="portfolio__link"
                        target="_blank"
                    >
                        Адаптивный сайт
                        <p className="portfolio__link-arrow">&#8599;</p>
                    </a>
                </li>

                <li className="portfolio__item">
                    <a
                        href="https://bevuxyna.students.nomoredomains.sbs"
                        className="portfolio__link"
                        target="_blank"
                    >
                        Одностраничное приложение
                        <p className="portfolio__link-arrow">&#8599;</p>
                    </a>
                </li>

            </ul>

        </section>
    )
}

export default Portfolio;