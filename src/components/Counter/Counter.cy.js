import React from "react";
import Counter from "./Counter";

describe("<Counter /> with CY", () => {
  it("renders", () => {
    cy.mount(<Counter />);
  });

  it("increments the count", () => {
    cy.mount(<Counter />);
    cy.get('[data-testid="increment"]').click();
    cy.get('[data-testid="count"]').contains("1");
  });

  it("decrements the count", () => {
    cy.mount(<Counter />);
    cy.get('[data-testid="increment"]').click();
    cy.get('[data-testid="decrement"]').click();
    cy.get('[data-testid="count"]').contains("0");
  });

  it("resets the count", () => {
    cy.mount(<Counter />);
    cy.get('[data-testid="increment"]').click();
    cy.get('[data-testid="reset"]').click();
    cy.get('[data-testid="count"]').contains("0");
  });
});
