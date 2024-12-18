<h1>Проект автоматизации тестирования приложения <a target="_blank" href="https://ohmywishes.ru/"> Ohmywishes </a> </h1>

<p align="center">
<img alt="Ohmywishes" src="media/ohmywishes.png"  >
</p>

## Содержание
+ Описание
+ Технологии и инструменты

## Описание
Ohmywishes — бесплатный сервис вишлистов. Здесь вы можете создавать собственные списки желаний подарков и следить за мечтами друзей.

Проект автоматизации состоит из 2 частей:
- UI-тесты на WEB-приложение
- API-тесты на WEB-приложение 

## Технологии и инструменты
В этом проекте используются следующие технологии и инструменты:
<p align="center">
<img src="https://github.com/devicons/devicon/blob/master/icons/playwright/playwright-original.svg" title="Playwright" alt="Playwright" width="40" height="40"/>
<img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2hhc3JqaDgyN3JibTdnaG5najE5bGthcWw3YWpiZmtjNDNyNW9leCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SvFocn0wNMx0iv2rYz/giphy.gif" width="40"/>
<img src="https://github.com/devicons/devicon/blob/master/icons/git/git-original.svg" title="Git" alt="Git" width="40" height="40"/>
<img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWVleDFxZzBoZThhd2dxZXI3MXFycm82MTBiczJnYmdqaDJ0eXRhbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/ZcdZ7ldgeIhfesqA6E/giphy.gif" width="40" height="40"/>
<img src="https://softfinder.ru/upload/styles/logo/public/logo/logo-2605.png?itok=vqVq1c7j" width="40" height="40"/>
<img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDdrcXF4am14YWVxeGp4MnJmMThjOThpcjQ5Zm50bXc3dHRyaXY5ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/du3J3cXyzhj75IOgvA/giphy.gif" title="GitHub" alt="GitHub" width="40" height="40"/>
<img src="https://github.com/allure-framework/allure2/blob/main/.idea/icon.png" title="Allure Report" alt="Allure Report" width="40" height="40"/>
<img src="https://github.com/devicons/devicon/blob/master/icons/jenkins/jenkins-original.svg" title="Jenkins" alt="Jenkins" width="40" height="40"/>
<img src="https://fakerjs.dev/logo.svg" width="40" height="40"/>
</p>

Тесты написаны на языке <code>JavaScript</code> с использованием фреймворка для автоматизации тестирования <code>[Playwright](https://playwright.dev)</code>. 
Для написания UI-тестов был использован паттерн Page Object, для API-тестов было использовано разделение api приложения на отдельные сервисы. Для тестовых данных была использована генерация данных с помощью <code>[faker-js](https://fakerjs.dev)</code> и паттерна Builder.

Для организации удалённого запуска тестов предусмотрены интеграции с <code>[Jenkins](https://www.jenkins.io/)</code> и <code>[GitHub Actions](https://docs.github.com/en/actions)</code>. 
После запуска тестов генерируется отчёт Allure и отправляется в <code>[Allure TestOps](https://qameta.io/)</code> для отображения результатов прогона.
Отчет с результатами отправляется ботом в специальный чат <code>Telegram</code>. Для уведомлений в Telegram используется библиотека <code>[allure-notifications](https://github.com/qa-guru/allure-notifications)</code>.

## Реализованные проверки
### UI
<b>Авторизация по электронной почте</b>
> - [x] Авторизация с валидными почтой и паролем
> - [x] Неуспешная авторизация с некорректной почтой
> - [x] Неуспешная авторизация с некорректным паролем

<b>Доступ к странице авторизации</b>
> - [x] Переход по кнопке "Войти"
> - [x] Редирект со страницы "Мои желания"

<b>Добавление желания</b>
> - [x] Нельзя добавить желание без названия
> - [x] Пользователь может добавить желание
> - [x] Пользователь может добавить желание только с названием

### API
<b>Авторизация по электронной почте</b>
> - [x] Успешная авторизация с валидными credentials (201)
> - [x] Попытка авторизации с неверным паролем (400)
> - [x] Попытка авторизации с username вместо email-a (400)
> - [x] Попытка авторизации с неверным email (400)
> - [x] Попытка авторизации без payload c credentials (400)

## Запуск тестов
Автотесты могут быть запущены как локально, так и удаленно.
### Запуск тестов удаленно
Для запуска тестов удаленно настроены два варианта: Github Actions и Jenkins.
- В Github Actions запуск тестов в проекте настроен автоматически на создание merge request-а в ветку main и на обновление ветки main.
Результаты тестов публикуются в виде [Allure отчета в github pages](https://olemoreflipflop.github.io/finalProject/)<br>
Для корректного выполнения тестов, в проекте указаны Secrets с переменными .env
<p align="center">
<img alt="githubActions" src="media/githubActions.png"  >
</p>

- В Jenkins создана отдельная задача с указанными параметрами сборки и настроенным репортингом в Allure Testops и краткими уведомлениями в Telegram.
  Собрать и запустить тесты можно нажатием кнопки «Собрать сейчас»/«Build now».
<p align="center">
<img alt="jenkins" src="media/jenkins.png"  >
</p>

### Запуск тестов локально из терминала
Для запуска тестов локально необходимо скачать проект и добавить в корень проекта .env файл по примеру:

```
BASE_URL = 'https://demourl.com'
USER_EMAIL = 'user@email.com'
USER_PASSWORD = 'userPassword'
```
Далее необходимо установить зависимости:
```
npm install
npx playwright install --with-deps
```
После чего для запуска всех тестов следует использовать команду :
```
npm test
```
Для запуска только API тестов:
```
npm run runApiTests
```
Для запуска только UI тестов:
```
npm run runUiTests 
```

HTML-отчеты Playwright генерируются автоматически после прогона тестов. Для просмотра данного отчета следует использовать команду:
```
 npx playwright show-report
```
Для генерации и просмотра отчета Allure по результатам прогона используйте команду:
```
npm run allure
```

## <img src="https://github.com/allure-framework/allure2/blob/main/.idea/icon.png" title="Allure Report" alt="Allure Report" width="40" height="40"/> </a> Интеграция с <a target="_blank" href="https://jenkins.autotests.cloud/"> Allure </a>
<p align="center">
<img title="Allure Report" src="media/allureReport.png">
</p>

## <img src="https://softfinder.ru/upload/styles/logo/public/logo/logo-2605.png?itok=vqVq1c7j" width="40" height="40"/> Интеграция с <a target="_blank" href="https://allure.autotests.cloud/launch/43117/"> Allure TestOps </a>
<p align="center">
<img title="Allure TestOps Report" src="media/allureTestopsReport.png">
</p>

## Пример выполнения теста


## <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWVleDFxZzBoZThhd2dxZXI3MXFycm82MTBiczJnYmdqaDJ0eXRhbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/ZcdZ7ldgeIhfesqA6E/giphy.gif" width="40" height="40"/> Уведомления в Telegram
После завершения сборки в Jenkins, бот, созданный в <code>Telegram</code>, автоматически обрабатывает и отправляет сообщение с отчетом
о прогоне тестов в указанный чат.
<p align="center">
<img alt="createWishTestGif" src="media/create_wish.gif"  >
</p>
