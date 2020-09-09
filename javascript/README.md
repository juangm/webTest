# WebTest - Javascript

## Description

- POC to check different javascript frameworks for E2E testing.
- Follow the same TC described in the main repository.
- List of frameworks to check/implement:
  - puppeteer
  - playwright
  - cypress

## Installation

- NodeJS
- Run in the working directory `yarn install`

## Frameworks to compare

### Puppeteer

#### Puppeteer without any test runner

- Run puppeteer test: `yarn bare:pup`

#### Puppeteer with JEST as test runner

- Run puppeteer test: `yarn jest:pup`

### Playwright

#### Playwright without any test runner

- Run playwright test: `yarn bare:play`

#### Playwright with JEST as test runner

- Run playwright test: `yarn jest:play`

### Cypress

#### Running from cypress GUI

- Start cypress `yarn cypress open`
- Run the test from the GUI

#### Cypress from CLI

- Run test case with electron `yarn cy:electron`
- Run test case with chrome `yarn cy:chrome`
