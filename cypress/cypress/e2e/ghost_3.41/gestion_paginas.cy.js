/// <reference types="cypress" />

const URL_GHOST_BASE = "http://test.denkitronik.com:2368/ghost";
const URL_GHOST_SIGNIN = URL_GHOST_BASE + "/#/signin";
const GHOST_USERNAME = "lasherone@hotmail.com";
const GHOST_PASSWORD = "Pruebas12345";
const NEWPOST_TITLE = "Test POST";
const NEWPOST_CONTENT =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const UPDATE_POST_TITLE = "Test POST" + Math.random() * 10000;

describe("Gestión de páginas", () => {
  beforeEach(() => {
    cy.visit(URL_GHOST_SIGNIN);
    cy.wait(2000);
    cy.get(".email").type(GHOST_USERNAME);
    cy.get(".password").type(GHOST_PASSWORD);
    cy.get("button.login").click();
    cy.wait(3000);
  });

  it("Update published page old", () => {
    // I click on the Pages sidebar button
    cy.get("a[href='#/pages/']").click();
    cy.wait(2000);

    cy.screenshot("Update published page old - Listado de Páginas");

    // I filter by published pages
    cy.get(
      "div.gh-contentfilter-menu.gh-contentfilter-type > div:nth-child(1)"
    ).click();
    cy.wait(1000);
    cy.get("ul[role='listbox'] > li:nth-child(3)").click();

    cy.wait(2000);
    cy.screenshot("Update published page old - Filtro de páginas publicadas");

    // I selected the first page in the list
    cy.get("ol.gh-list > li:nth-child(2)").click();

    // I complete New Page Title "<UPDATE_POST_TITLE>"
    cy.wait(1000);
    cy.get('textarea[placeholder="Page Title"]').type(UPDATE_POST_TITLE);

    cy.screenshot(
      "Update published page old - Modificar titulo de la primer página"
    );

    // I click on the UpdatePage Button
    cy.get("div.gh-publishmenu").click();
    cy.screenshot("Update published page old - Click botón actualizar");
    cy.get("button.gh-publishmenu-button").click();

    // I cvisit pages page
    cy.visit(URL_GHOST_BASE + "/#/pages");
    cy.wait(2000);

    // I filter by published pages
    cy.get("div.gh-contentfilter-menu.gh-contentfilter-type").click();
    cy.wait(1000);
    cy.get("ul[role='listbox'] > li:nth-child(3)").click();

    // I check the page is the first in the list is "<UPDATE_POST_TITLE>"
    cy.get("ol.gh-list > li:nth-child(2) h3")
      .first()
      .should(($element) => {
        expect($element).to.contain(UPDATE_POST_TITLE);
      });
    cy.screenshot("Update published page old - Página con nuevo nombre");
  });

  it("Move Published to Draft Page old", () => {
    // I click on the Pages sidebar button
    cy.get("a[href='#/pages/']").click();
    cy.wait(2000);

    cy.screenshot("Move Published to Draft Page old - Listado de Páginas");

    // I filter by published pages
    cy.get(
      "div.gh-contentfilter-menu.gh-contentfilter-type > div:nth-child(1)"
    ).click();
    cy.wait(1000);
    cy.get("ul[role='listbox'] > li:nth-child(3)").click();

    cy.screenshot(
      "Move Published to Draft Page old - Filtro de páginas publicadas"
    );

    // I selected the first page in the list
    cy.get("ol.gh-list > li:nth-child(2)").click();

    // I click on the Unpublish Button and update
    cy.get("div.gh-publishmenu").click();
    cy.get(
      "section.gh-publishmenu-content.gh-publishmenu-section > div:nth-child(1)"
    ).click();
    cy.screenshot("Move Published to Draft Page old - Click botón unpublished");
    cy.get("button.gh-publishmenu-button").click();

    cy.wait(4000);

    // I check page status to be draft
    cy.get("header > div > div:nth-child(2) > span > div")
      .first()
      .should(($element) => {
        expect($element).to.contain("Draft");
      });
  });

  it("Publishing page old", () => {
    // I click on the Pages sidebar button
    cy.get("a[href='#/pages/']").click();
    cy.wait(2000);

    // I click on the New Page button
    cy.get("a[href='#/editor/page/']").click();

    // I complete New Page Title "<NEWPOST_TITLE>"
    cy.get('textarea[placeholder="Page Title"]').type(NEWPOST_TITLE);

    // CLick the header
    cy.get("header > div > div:nth-child(2)").click();

    // I click on the Publish Page Button
    cy.get("div.gh-publishmenu").click();
    cy.screenshot("Publishing page old - Click botón Publish");
    cy.get("button.gh-publishmenu-button").click();

    // I click on the Back Page Editor Button
    cy.wait(2000);
    cy.get("header > div > div:nth-child(1)").click();
    cy.wait(1000);

    // I filter by published pages
    cy.get("div.gh-contentfilter-menu.gh-contentfilter-type").click();
    cy.wait(1000);
    cy.get("ul[role='listbox'] > li:nth-child(3)").click();

    cy.screenshot("Publishing page old - Paginas publicadas");

    // I check the page is the first in the list is "<NEWPOST_TITLE>"
    cy.get("ol.gh-list > li:nth-child(2) h3")
      .first()
      .should(($element) => {
        expect($element).to.contain(NEWPOST_TITLE);
      });
  });

  it("Publishing Programmed Page old", () => {
    // I click on the Pages sidebar button
    cy.get("a[href='#/pages/']").click();
    cy.wait(2000);

    // I click on the New Page button
    cy.get("a[href='#/editor/page/']").click();

    // I complete New Page Title "<NEWPOST_TITLE>"
    cy.get('textarea[placeholder="Page Title"]').type(NEWPOST_TITLE);

    // CLick the header
    cy.get("header > div > div:nth-child(2)").click();

    // I click on the Publish Page Menu
    cy.get("div.gh-publishmenu").click();
    cy.screenshot("Publishing Programmed Page old - Click botón Publish");

    // I click on the Publish Settings to Schedule after 3 days
    cy.get("div.gh-publishmenu-section > div:nth-child(2)").click();

    cy.get("div.gh-date-time-picker-date > input").first().type("2023-10-15");
    cy.screenshot("Publishing Programmed Page old - Setting publication Date");

    // I click on the Publish Button
    cy.get("button.gh-publishmenu-button").click();

    // I cvisit pages page
    cy.visit(URL_GHOST_BASE + "/#/pages");
    cy.wait(2000);

    // I filter by scheduled pages
    cy.get("div.gh-contentfilter-menu.gh-contentfilter-type").click();
    cy.wait(1000);
    cy.get("ul[role='listbox'] > li:nth-child(4)").click();
    cy.screenshot("Publishing Programmed Page old - Listing Scheduled Pages");

    // I check the page is the first in the list is "<NEWPOST_TITLE>"
    cy.get("ol.gh-list > li:nth-child(2) h3")
      .first()
      .should(($element) => {
        expect($element).to.contain(NEWPOST_TITLE);
      });
  });
});
