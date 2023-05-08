/// <reference types="cypress" />

const URL_GHOST_BASE = "http://localhost:2368/ghost";
const URL_GHOST_SIGNIN = URL_GHOST_BASE + "/#/signin";
const GHOST_USERNAME = "lasherone@hotmail.com";
const GHOST_PASSWORD = "Pruebas12345";
const NEWPOST_TITLE = "Test POST";
const NEWPOST_CONTENT =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const UPDATE_POST_TITLE = "Test POST";

describe("Publishing a new page", () => {
  beforeEach(() => {
    cy.visit(URL_GHOST_SIGNIN);
    cy.wait(2000);
    cy.get("#identification").type(GHOST_USERNAME);
    cy.get("#password").type(GHOST_PASSWORD);
    cy.get("button[data-test-button='sign-in']").click();
    cy.wait(3000);
  });

  it("Test Create new Page", () => {
    // I click on the Pages sidebar button
    cy.get("a[href='#/pages/']").click();

    // I filter by published pages
    cy.get("div.gh-contentfilter > div:nth-child(1)").click();
    cy.get("ul[role='listbox'] > li:nth-child(3)").click();

    // I selected the first page in the list
    cy.get(
      "div.posts-list.gh-list > div:nth-child(1) > li > a:nth-child(1)"
    ).click();

    // I click on the Unpublish Button
    cy.get("button.gh-unpublish-trigger").click();

    // I click on the Unpublish and revert Button
    cy.get("button.gh-revert-to-draft").click();

    // I check page status to be draft
    cy.get("div.gh-editor-post-status > span > div")
      .first()
      .should(($element) => {
        expect($element).to.contain("Draft");
      });
  });
});
