# Project WebTest

## Description

- Small project checking different automation frameworks for E2E testing.
- Tests are going to be performed against a TODO web application.
- Frameworks are separated by languages: javascript, python, ...
- Each framework will be used to test one simple test scenario for E2E

### Test Scenario

- Test scenario to automate in all the test frameworks
- Goal: check the basic functionality of the APP in one test case

#### Steps:

1. Created two items in the TODO app (`create repo` and `push first commit`)
2. Completed item `create repo` and check it is set as completed
3. Delete incomplete item `push first commit`
4. Delete completed item `create repo`

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
