
# Movies Explorer

Сервис, в котором можно найти фильмы по запросу и сохранить в личном кабинете. Проект был реализован в рамках дипломной работы на платформе [Яндекс.Практикум](https://practicum.yandex.ru/profile/web/).


## Tech Stack

![HTML](https://img.shields.io/badge/-HTML-05122A?style=flat&logo=HTML5)&nbsp;
![CSS](https://img.shields.io/badge/-CSS-05122A?style=flat&logo=CSS3&logoColor=1572B6)&nbsp;
![JavaScript](https://img.shields.io/badge/-JavaScript-05122A?style=flat&logo=javascript)&nbsp;
![React](https://img.shields.io/badge/-React-05122A?style=flat&logo=react)&nbsp;
![React-router](https://img.shields.io/badge/-React_Router-05122A?style=flat&logo=react-router)&nbsp;
![Webpack](https://img.shields.io/badge/-Webpack-05122A?style=flat&logo=webpack)&nbsp;
![Git](https://img.shields.io/badge/-Git-05122A?style=flat&logo=git)&nbsp;


## Demo

Стартовая страница, содержащая краткую информацию о проекте, технологиях и авторе.

![start-page.gif](https://s9.gifyu.com/images/start-page.gif)

Основной функционал проекта вкдючает в себя возможность поиска фильмов со стороннего API и 
сохранение/удаление найденных фильмов к себе в аккаунт.

![main-functionality.gif](https://s9.gifyu.com/images/main-functionality.gif)


При нажатии на кнопку «Регистрация» в шапке сайта на главной странице происходит переход на страницу регистрации по маршруту /signup.

![registration.gif](https://s9.gifyu.com/images/registration.gif)


При нажатии на кнопку «Войти» в шапке сайта на главной странице происходит переход на страницу авторизации по маршруту /signin.

![login918484a1fc094a08.gif](https://s9.gifyu.com/images/login918484a1fc094a08.gif)


У авторизованного пользователя в шапке сайта отображается кнопка «Аккаунт». При клике происходит переход на страницу редактирования профиля. На ней пользователь может изменить свои данные.

![edit-profile.gif](https://s3.gifyu.com/images/edit-profile.gif)


При клике на кнопку «Выйти из аккаунта» происходит редирект на главную страницу и удаление JWT из локального хранилища или куки. Чтобы войти на сайт заново, пользователю потребуется повторно авторизоваться.

![sign-out.gif](https://s9.gifyu.com/images/sign-out.gif)




## Backend

Backend часть проекта располагается на [Github](https://github.com/bevuxyna/movies-explorer-api).
## Installation

Клонировать репозиторий:

```
  gh repo clone bevuxyna/movies-explorer-frontend
```

Установить зависимости:

```
  npm install
```

Запустить сервер:

```
  npm run start
```

Запустить сервер с hot-reload:

```
  npm run dev
```
## Guidelines for the project

[Чек лист](https://code.s3.yandex.net/web-developer/static/new-program/web-diploma-criteria-2.0/index.html) для проверки дипломного проекта.

Сторонний API [BeatfilmMoviesApi](https://api.nomoreparties.co/beatfilm-movies)

[Макет проекта в Figma](https://www.figma.com/file/jkKUfJIDqPbySW5SyGDKMa/Diploma-(Copy)?node-id=891%3A3857&t=vQAZgSun6juRsfTK-0)
