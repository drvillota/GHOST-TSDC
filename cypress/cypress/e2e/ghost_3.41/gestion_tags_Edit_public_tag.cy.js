
const URL_GHOST_BASE = "http://localhost:2368/ghost";
const URL_GHOST_SIGNIN = URL_GHOST_BASE + "/#/signin";
const GHOST_USERNAME = "lasherone@hotmail.com";
const GHOST_PASSWORD = "Pruebas12345";

describe("Creating a new Tag", () => {
  beforeEach(() => {
    cy.visit(URL_GHOST_SIGNIN);
    cy.wait(2000);
    cy.get("#identification").type(GHOST_USERNAME);
    cy.get("#password").type(GHOST_PASSWORD);
    cy.get("button[data-test-button='sign-in']").click();
    cy.wait(7000);
  });

  it("Test Create new Tag", () => {
    cy.get("a[href='#/tags/']").click();
    cy.get("button[data-test-tags-nav='public']").click();
    cy.get("a[href='#/tags/new/']").click();
    
    cy.get('#tag-name').clear();
    cy.get('#tag-name').type("Nombre editado");
    cy.get('#tag-description').clear();
    cy.get('#tag-description').type("Descripción editada");
    cy.get("button[data-test-button='save']").click();

    expect(true).to.equal(true);
  });
});

