/// <reference types="Cypress" />

describe('TodoList App', () => {
  it('shows learn link', function () {
    cy.visit('http://localhost:5000/index.html');

    // Create two items
    cy.get('#item').type('create repo');
    cy.get('#add').click();
    cy.get('#item').type('push first commit');
    cy.get('#add').click();

    // Complete first task
    cy.xpath('//ul[@id="todo"]/li[text()="create repo"]//button[@class="complete"]').click();

    // Complete second task
    cy.xpath('//ul[@id="todo"]/li[text()="push first commit"]//button[@class="complete"]').click();

    // Delete both tasks
    cy.xpath('//ul[@id="completed"]/li[text()="create repo"]//button[@class="remove"]').click();
    cy.xpath(
      '//ul[@id="completed"]/li[text()="push first commit"]//button[@class="remove"]'
    ).click();
  });
});
