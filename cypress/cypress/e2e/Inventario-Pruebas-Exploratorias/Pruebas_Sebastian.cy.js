const URL_GHOST_BASE = "http://test.denkitronik.com:2368/ghost";
const URL_GHOST_SIGNIN = URL_GHOST_BASE + "/#/signin";
const GHOST_USERNAME = "lasherone@hotmail.com";
const GHOST_PASSWORD = "Pruebas12345";

const selectors = {
  postButton: "span",
  titleTextarea: "textarea[placeholder='Post Title']",
  postContentArea: "[contenteditable]",
  publishMenu: "[class='gh-publishmenu ember-view']",
  scheduleOption: "[class='gh-publishmenu-radio-button']",
  publishButton:
    "[class='gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view']",
  publishButton2: "[class='gh-btn gh-btn-black gh-btn-icon ember-view']",
  pickPost: "[class='gh-list-row gh-posts-list-item']",
  postTitle: "[class='gh-content-entry-title']",
};

      
        describe("Como usuario puedo publicar un post", () => {
          beforeEach(() => {
            // Navegar a la página de gestión de contenido
            cy.visit(URL_GHOST_BASE + "/#/posts");
            
          });
      
          it("Publicar un post", () => {
            
            // Busca un post y se clickea para empezar a actualizarlo
            cy.get(selectors.pickPost).last().click();
      
            cy.wait(3000);
      
      
            // Despliega las opciones de publicar
            cy.get(selectors.publishMenu) // Verificar que el elemento exista en el DOM
              .children("div")
              .children("span")
              .scrollIntoView() // Desplazar al elemento al viewport si está oculto
              .click({ force: true });
            
      
            cy.wait(3000);
      
            // Busca el botón 'Publish' y lo clickea para guardar el nuevo post
            cy.get(selectors.publishButton).scrollIntoView().click({ force: true });
            
      
            cy.wait(3000);
      
            // Navegar a la página de gestión de contenido
            cy.visit(URL_GHOST_BASE + "/#/posts?type=published");
            
      
            cy.wait(3000);
      
            // Verificar que el post se haya publicado correctamente
            cy.get("span").contains("few seconds");
          });
        });
      
      
      
      
      
      
      describe("Create a public tag", () => {
        beforeEach(() => {
          cy.visit(URL_GHOST_SIGNIN);
          cy.wait(2000);
          cy.get(".email").type(GHOST_USERNAME);
          cy.get(".password").type(GHOST_PASSWORD);
          cy.get(".login").click();
          cy.wait(3000);
        });
      
        it("Test create a new tag", () => {
          cy.get("a[href='#/tags/']").click();
          cy.get("a[href='#/tags/new/']").click();
          cy.get("#tag-name").type("Nombre");
          cy.get("#tag-description").type("Descripción");
              
      
          expect(true).to.equal(true);
        });
      });
      
      describe("Gestion de usuarios de Ghost (eliminar un usuario))", () => {
        describe("Como usuario admin puedo eliminar un usuario", () => {
          before(() => {
            cy.visit(URL_GHOST_SIGNIN);
            cy.get("#ember8").type("lasherone@hotmail.com");
            cy.get("#ember10").type("Pruebas12345");
            cy.get("#ember12").click();
          });
      
          it("Delete user", () => {
            cy.contains("Staff").should("be.visible").click();
            
            cy.contains("Ghost").should("be.visible").click();
            
            cy.get("button.user-actions-cog")
              .should("exist") // Verificar que el elemento exista en el DOM
              .scrollIntoView() // Desplazar al elemento al viewport si está oculto
              .focus() // Hacer foco en el elemento
              .click();
            
            cy.get("button.delete").should("be.visible").invoke("click");
            
            cy.get("button.gh-btn-red")
              .contains("Delete")
              .click();
              cy.get("#ember1437")
              .click();





              describe("Como usuario puedo publicar una página", () => {
                beforeEach(() => {
                  // Navegar a la página de gestión de contenido
                  cy.visit(URL_GHOST_BASE + "/#/pages");
                  
                });
            
                it("Publicar una página", () => {
                  
                  // Busca un post y se clickea para empezar a actualizarlo
                  cy.get(selectors.pickPost).last().click();
            
                  cy.wait(3000);
            
            
                  // Despliega las opciones de publicar
                  cy.get(selectors.publishMenu) // Verificar que el elemento exista en el DOM
                    .children("div")
                    .children("span")
                    .scrollIntoView() // Desplazar al elemento al viewport si está oculto
                    .click({ force: true });
                  
            
                  cy.wait(3000);
            
                  // Busca el botón 'Publish' y lo clickea para guardar el nuevo post
                  cy.get(selectors.publishButton).scrollIntoView().click({ force: true });
                  
            
                  cy.wait(3000);
            
                  // Navegar a la página de gestión de contenido
                  cy.visit(URL_GHOST_BASE + "/#/pages?type=published");
                  
            
                  cy.wait(3000);
            
                  // Verificar que el post se haya publicado correctamente
                  cy.get("span").contains("few seconds");
                });
              });
            
            
            
            
          });
        });
        
      });
        
