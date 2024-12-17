<h1>Проект автоматизации тестирования приложения <a target="_blank" href="https://ohmywishes.ru/"> Ohmywishes </a> </h1>

<p align="center">
<img alt="Ohmywishes" src="media/ohmywishes.png"  >
</p>

## Содержание
+ [Описание](#Описание)
+ [Технологии и инструменты](#Технологии-и-инструменты)


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
