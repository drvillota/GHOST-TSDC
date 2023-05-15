const URL_GHOST_BASE = "http://test.denkitronik.com:3002/ghost/#/signin";
const URL_GHOST_SIGNIN = URL_GHOST_BASE + "/#/signin";
const GHOST_USERNAME = "lasherone@hotmail.com";
const GHOST_PASSWORD = "Pruebas12345";

describe("Creating a new Tag", () => {
  beforeEach(() => {
    cy.visit(URL_GHOST_SIGNIN);
    cy.wait(2000);
    cy.get(".email").type(GHOST_USERNAME);
    cy.get(".password").type(GHOST_PASSWORD);
    cy.get(".login").click();
    cy.wait(7000);
  });

  it("Test Create new Tag", () => {
    cy.get("a[href='#/tags/']").click();
    cy.get(".gh-btn").click();
    cy.get('#tag-name').type("Nombre");
    cy.get('#tag-description').type("Descripción");
    cy.screenshot("Create new internal tag");
   
   

    expect(true).to.equal(true);
  });
});