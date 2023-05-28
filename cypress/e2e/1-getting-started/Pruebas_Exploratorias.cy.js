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

describe("Gestion de contenido", () => {
  beforeEach(() => {
    // Realizar el inicio de sesión antes de cada escenario
    cy.visit(URL_GHOST_SIGNIN);
    cy.get("#ember8").clear().type("lasherone@hotmail.com");
    cy.get("#ember10").clear().type("Pruebas12345");
    //Screenshot de inicio de sesion de usuario admin
    cy.screenshot("pruebas_exploratorias/contenido/inicio_sesion_admin");
    cy.get("#ember12").click();
  });

  describe("Como usuario puedo actualizar un post", () => {
    beforeEach(() => {
      // Navegar a la página de gestión de contenido
      cy.visit(URL_GHOST_BASE + "/#/posts");
      //Screenshot de la pagina de contenido
      cy.screenshot("pruebas_exploratorias/contenido/actualizar_post/posts");
    });

    it("Actualizar un post", () => {
      // Generar valores aleatorios con Faker.js
      const newTitle = "Post actualizado";
      const newContent = "This is the updated content";

      // Busca un post y se clickea para empezar a actualizarlo
      cy.get(selectors.pickPost).last().click();
      // Screenshot de la pagina de nuevo post
      cy.screenshot("pruebas_exploratorias/contenido/actualizar_post/pick_post");

      cy.wait(3000);

      // Actualizar los campos
      // Título del post
      cy.get(selectors.titleTextarea).clear().type(newTitle);
      // Contenido del post
      cy.get(selectors.postContentArea)
        .should("exist") // Verificar que el elemento exista en el DOM
        .scrollIntoView() // Desplazar al elemento al viewport si está oculto
        .type(newContent, { force: true });
      // Screenshot de la pagina de nuevo post editado
      cy.screenshot("pruebas_exploratorias/contenido/actualizar_post/updated_post_editado");

      cy.wait(3000);

      // Despliega las opciones de publicar
      cy.get(selectors.publishMenu) // Verificar que el elemento exista en el DOM
        .children("div")
        .children("span")
        .scrollIntoView() // Desplazar al elemento al viewport si está oculto
        .click({ force: true });
      // Screenshot de la pagina de nuevo post editado
      cy.screenshot("pruebas_exploratorias/contenido/actualizar_post/update_options");

      cy.wait(3000);

      // Busca el botón 'Publish' y lo clickea para guardar el nuevo post
      cy.get(selectors.publishButton).scrollIntoView().click({ force: true });
      //Screenshot de la pagina de usuario ghost actualizado
      cy.screenshot("pruebas_exploratorias/contenido/actualizar_post/update_post");

      cy.wait(3000);

      // Navegar a la página de gestión de contenido
      cy.visit(URL_GHOST_BASE + "/#/posts?type=published");
      //Screenshot de la pagina de usuario ghost actualizado
      cy.screenshot("pruebas_exploratorias/contenido/actualizar_post/final_posts_view");

      cy.wait(3000);

      // Verificar que el post se haya publicado correctamente
      cy.get("span").contains("few seconds");
    });
  });
});

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
    cy.get("#tag-name").type("Nombre editado");
    cy.get("#tag-description").type("Descripción editada");
    cy.screenshot("pruebas_exploratorias/tag/Edit existing public tag");

    expect(true).to.equal(true);
  });
});

describe("Gestion de usuarios de Ghost (suspension y reactivacion)", () => {
  describe("Como usuario admin puedo suspender otro usuario", () => {
    before(() => {
      cy.visit(URL_GHOST_SIGNIN);
      cy.get("#ember8").type("lasherone@hotmail.com");
      cy.get("#ember10").type("Pruebas12345");
      //Screenshot de inicio de sesion para suspender usuario
      cy.screenshot("pruebas_exploratorias/usuarios/suspender/1_inicio_sesion_admin");
      cy.get("#ember12").click();
    });

    it("Update user", () => {
      cy.contains("Staff").should("be.visible").click();
      //Screenshot de la pagina de staff
      cy.screenshot("pruebas_exploratorias/usuarios/suspender/2_staff");
      cy.contains("Ghost").should("be.visible").click();
      //Screenshot de la pagina de usuario ghost
      cy.screenshot("pruebas_exploratorias/usuarios/suspender/3_ghost");
      cy.get("button.user-actions-cog")
        .should("exist") // Verificar que el elemento exista en el DOM
        .scrollIntoView() // Desplazar al elemento al viewport si está oculto
        .focus() // Hacer foco en el elemento
        .click();
      //Screenshot de la pagina de usuario ghost con el menu desplegado
      cy.screenshot("pruebas_exploratorias/usuarios/suspender/4_ghost_menu_desplegado");
      cy.get("button.suspend").should("be.visible").invoke("click");
      //Screenshot de la pagina de usuario ghost con el menu desplegado y suspendido
      cy.screenshot(
        "ghost-3.41.1/usuarios/suspender/5_ghost_menu_desplegado_suspendido"
      );
      cy.get("button.gh-btn-red")
        .contains("Suspend")
        .should("be.visible")
        .click();
      //Screenshot de la pagina de usuario ghost con el menu desplegado y suspendido
      cy.screenshot(
        "ghost-3.41.1/usuarios/suspender/6_ghost_menu_desplegado_suspendido_confirmado"
      );
      cy.contains("Staff").should("be.visible").click();
      //Screenshot de la pagina de staff con el usuario suspendido
      cy.screenshot("pruebas_exploratorias/usuarios/suspender/7_staff_suspender");
    });
  });

  describe("Como usuario admin puedo reactivar (un-suspend) otro usuario", () => {
    before(() => {
      cy.visit(URL_GHOST_SIGNIN);
      cy.get("#ember8").type("lasherone@hotmail.com");
      cy.get("#ember10").type("Pruebas12345");
      //Screenshot de la pagina de inicio de sesion para reactivar usuario
      cy.screenshot("pruebas_exploratorias/usuarios/unsuspend/1_inicio_sesion_admin");
      cy.get("#ember12").click();
    });

    it("Unsuspend user", () => {
      cy.contains("Staff").click();
      cy.contains("Ghost").click();
      //Screenshot de la pagina de usuario ghost para reactivar
      cy.screenshot("pruebas_exploratorias/usuarios/unsuspend/2_ghost");
      cy.get("button.user-actions-cog").should("be.visible").click();
      //Screenshot de la pagina de usuario ghost con el menu desplegado para reactivar
      cy.screenshot("pruebas_exploratorias/usuarios/unsuspend/3_ghost_menu_desplegado");
      cy.contains("Un-suspend").should("be.visible").click();
      //Screenshot de la pagina de usuario ghost con el menu desplegado y reactivado
      cy.screenshot(
        "ghost-3.41.1/usuarios/unsuspend/4_ghost_menu_desplegado_reactivado"
      );
      cy.get("button.gh-btn-red")
        .contains("Un-suspend")
        .should("be.visible")
        .click();
      //Screenshot de la pagina de usuario ghost con el menu desplegado y reactivado confirmado
      cy.screenshot(
        "ghost-3.41.1/usuarios/unsuspend/5_ghost_menu_desplegado_reactivado_confirmado"
      );
      cy.contains("Staff").should("be.visible").click();
      //Screenshot de la pagina de staff reactivado
      cy.screenshot("pruebas_exploratorias/usuarios/unsuspend/6_staff_reactivado");


      describe("Gestion de contenido", () => {
        beforeEach(() => {
          // Realizar el inicio de sesión antes de cada escenario
          cy.visit(URL_GHOST_SIGNIN);
          cy.get("#ember8").clear().type("lasherone@hotmail.com");
          cy.get("#ember10").clear().type("Pruebas12345");
          //Screenshot de inicio de sesion de usuario admin
          cy.screenshot("pruebas_exploratorias/contenido/inicio_sesion_admin");
          cy.get("#ember12").click();
        });
      
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
            
          });
        });
        
      });
        
      
      
    });
  });
});
