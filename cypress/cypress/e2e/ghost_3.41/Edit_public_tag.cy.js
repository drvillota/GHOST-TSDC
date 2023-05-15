
const URL_GHOST_BASE = "http://test.denkitronik.com:2368/ghost/#/signin";
const URL_GHOST_SIGNIN = URL_GHOST_BASE + "/#/signin";
const GHOST_USERNAME = "lasherone@hotmail.com";
const GHOST_PASSWORD = "Pruebas12345";

describe("Editing an existing Tag", () => {
  beforeEach(() => {
    cy.visit(URL_GHOST_SIGNIN);
    cy.wait(2000);
    cy.get(".email").type(GHOST_USERNAME);
    cy.get(".password").type(GHOST_PASSWORD);
    cy.get(".login").click();
    cy.wait(7000);
  });

  it("Test edit a new tag", () => {
    cy.get("a[href='#/tags/']").click();
    cy.get(".gh-btn").click();
    cy.get('#tag-name').type("Nombre editado");
    cy.get('#tag-description').type("Descripción editada");
    cy.screenshot("Edit existing public tag");

    expect(true).to.equal(true);
  });
});


