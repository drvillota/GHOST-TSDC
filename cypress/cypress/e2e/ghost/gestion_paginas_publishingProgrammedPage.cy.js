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

    // I click on the New Page button
    cy.get("a[href='#/editor/page/']").click();

    // I complete New Page Title "<NEWPOST_TITLE>"
    cy.get('textarea[placeholder="Page title"]').type(NEWPOST_TITLE);

    // I click on the Back Page Editor Button
    cy.get("div.gh-editor-post-status > span > div").click();

    // I click on the Publish Page Button
    cy.get("button.gh-publish-trigger").click();

    // I click on the Publish Settings to Schedule after 3 days
    cy.get(
      "div.gh-publish-settings > div[data-test-setting='publish-at'] > button"
    ).click();
    cy.get("div.gh-publish-schedule").click();
    cy.get("div.gh-date-time-picker-date > input").type("2023-10-15");

    // I click on the Continue Publication Button
    cy.get("button[data-test-button='continue']").click();

    // I click on the Confirm Publication Button
    cy.get("button[data-test-button='confirm-publish']").click();

    // I click on the Back Page Publish Button
    cy.get("button.gh-publish-back-button").click();

    // I click on the Back Page Editor Button
    cy.get("a.gh-editor-back-button").click();

    // I filter by scheduled pages
    cy.get("div.gh-contentfilter > div:nth-child(1)").click();
    cy.get("ul[role='listbox'] > li:nth-child(4)").click();

    // I check the page is the first in the list is "<NEWPOST_TITLE>"
    cy.get("div.posts-list.gh-list > div:nth-child(1) h3")
      .first()
      .should(($element) => {
        expect($element).to.contain(NEWPOST_TITLE);
      });
  });
});
