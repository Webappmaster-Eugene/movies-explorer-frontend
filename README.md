# Проект: VideoCollector - авторизация, регистрация, контент, взаимодействие с сервером

Это фронтенд проекта VideoCollector на React, HTML5, CSS3.

Конкретно в проекте использовались: функционал на React (CRA, Router, generate-react-cli, index.js для прокидывания компонентов, eslint), для стилей - SCSS (css-modules, файл vars.scss для общего доступа ко всем константам, миксинам и общим стилям).

Тут добавлены многие и многие фичи, некоторый допфункционал вроде лоадера, бургера и адаптивной версии форм.
Домен для фронтенда дипломного проекта: numart.nomoredomains.work
IP-сервера для обращений и тестирования: 158.160.41.95
Полностью работоспособная верстка для приложения создания коллекции фильмов.
Макет в Figma: https://www.figma.com/file/ZcvzJ5ZZ4iUFtCcw5CGhCL/Diploma-FINAL-VERSION?type=design&node-id=891%3A3857&mode=design&t=LJl8wLl6LMRQPSGP-1
Kanban разработки: https://github.com/users/Numarta/projects/1/views/1

Ссылка на .fig макет на Яндекс.Диск для проверки - https://disk.yandex.lt/d/jkJwAxqFHoFjLQ

`/build` — папка со всеми файлами и страницами для итогового размещения файлов
`/public` — папка для работы CRA по дефолту
`/src` — папка с файлами разработки
`/components` — папка со всеми основными компонентами и их CSS
`/utils` — папка с дополнительными функциями
`/images` — все изображения для проекта
`/vendor` — файлы посторонних разрабов, в т.ч. шрифты

### Содержание

- Ссылка на сайт
- Описание
- Нюансы
- Итог

**Ссылка на сайт**

- [Это ссылка на мой сайт на сервере](https://numart.nomoredomains.work)

**Описание**

Этот проект - полноценное веб-приложение для коллекционирования фильмов и размещения информации о них.
Он сделан по макету в Figma, сайт полностью адаптивен на разрешениях до 320px и даже ниже, выглядит хорошо на самых распространённых разрешениях экранов.

**Нюансы**

Здесь есть попапчики для взаимодействия, форма отправляется с данными, которые потом появляются на фронте.
Все очищается, есть валидация инпутов. Работает лоадер, есть бургер-меню, роутинг. В общем - это полноценный SPA.

**Итог**

Все проверено на ошибки, проверки по чек-листу пройдены, на низком старте к прохождению ревью.

Мой репозиторий в GitHub:
https://github.com/Numarta/movies-explorer-frontend.git

## Available Scripts

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run eject`

Note: this is a one-way operation. Once you `eject`, you can't go back!\*\*
