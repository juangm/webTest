/// <reference types="Cypress" />

describe("TodoList App", () => {
  it("shows learn link", function () {
    cy.visit("http://localhost:5000/index.html");
  });
});
