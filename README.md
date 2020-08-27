# Project WebTest

## Description

- Small project checking different automation frameworks for E2E testing.
- Tests are going to be performed against a TODO web application.
- Frameworks are separated by languages: javascript, python, ...

## :warning: Security Warning

- This program was created for educational purposes

## :clipboard: TODO List APP

### Requirements

- `docker`
- `docker-compose`

### Structure

- mysql: database for the application
- todoApp/frontend: code related to the frontend application
- todoApp/api: api to connect the frontend with the DB

### Starting the APP

Build (if you didn't build before) and start the services:

- `docker-compose up -d`

Wait for mysql start and set the DB (it takes a few seconds) and start again the API service:

- `docker-compose start todo-api`

Check all the services are working properly:

- `docker-compose ps`

## Javascript E2E frameworks

### Puppeteer

#### :construction: In progress....

### Cypress

#### :construction: In progress....

### PlayWright

#### :construction: In progress....

## :snake: Python E2E frameworks

### :construction: In progress....

## :diamonds: Ruby E2E frameworks

### :construction: In progress....
