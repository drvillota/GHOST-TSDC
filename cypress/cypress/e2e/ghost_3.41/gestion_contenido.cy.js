const selectors = {
  postButton: "span",
  titleTextarea: "textarea[placeholder='Post Title']",
  postContentArea: "[contenteditable]",
  publishMenu: "[class=\'gh-publishmenu ember-view\']",
  scheduleOption: "//div[@class='gh-publishmenu-radio-button']",
  scheduleButton: "//button[contains(span/text(),'Schedule')]",
  publishButton: "button.gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view",
  updateButton: "//button[contains(span/text(),'Update')]",
  post1: "//span[@class='gh-content-entry-meta']",
  post2: "//li[@class='gh-list-row gh-posts-list-item'])[last()-1]",
  postTitle: "//h3[@class='gh-content-entry-title']",
};

const host = "http://test.denkitronik.com:2368";

describe("Gestion de contenido", () => {
  beforeEach(() => {
    // Realizar el inicio de sesión antes de cada escenario
    cy.visit(host + "/ghost/#/signin");
    cy.get("#ember8").clear().type("lasherone@hotmail.com");
    cy.get("#ember10").clear().type("Pruebas12345");
    //Screenshot de inicio de sesion de usuario admin
    cy.screenshot("ghost-3.41/contenido/inicio_sesion_admin");
    cy.get("#ember12").click();
  });

  describe("Como usuario puedo publicar un post", () => {
    beforeEach(() => {
      // Navegar a la página de gestión de contenido
      cy.visit(host + "/ghost/#/posts");
      //Screenshot de la pagina de contenido
      cy.screenshot("ghost-3.41/contenido/crear_post/posts");
    });

    it("Publicar un post", () => {
      // Generar valores aleatorios con Faker.js
      const newTitle = "New post";
      const newContent = "This is the content";

      // Busca el botón 'New post' y se clickea para empezar a crear un nuevo post
      cy.get(selectors.postButton)
        .contains("New post")
        .should("be.visible")
        .click();
      // Screenshot de la pagina de nuevo post
      cy.screenshot("ghost-3.41/contenido/crear_post/new_post");

      // Actualizar los campos
      // Título del post
      cy.get(selectors.titleTextarea).clear().type(newTitle);
      // Contenido del post
      cy.get(selectors.postContentArea)
        .should("exist") // Verificar que el elemento exista en el DOM
        .scrollIntoView() // Desplazar al elemento al viewport si está oculto
        .type(newContent, { force: true });
      // Screenshot de la pagina de nuevo post editado
      cy.screenshot("ghost-3.41/contenido/crear_post/new_post_editado");

      // Despliega las opciones de publicar
      cy.get(selectors.publishMenu) // Verificar que el elemento exista en el DOM
        .children('div')
        .children('span')
        .scrollIntoView() // Desplazar al elemento al viewport si está oculto
        .click({force:true});
      // Screenshot de la pagina de nuevo post editado
      cy.screenshot("ghost-3.41/contenido/crear_post/publish_options");

      // Busca el botón 'Publish' y lo clickea para guardar el nuevo post
      cy.get(selectors.publishButton).scrollIntoView().click({force:true});
      //Screenshot de la pagina de usuario ghost actualizado
      cy.screenshot("ghost-3.41/contenido/crear_post/publish_post");

      // Navegar a la página de gestión de contenido
      cy.visit(host + "/ghost/#/posts");
      // Verificar que el post se haya publicado correctamente
      cy.get(selectors.postTitle).should("have.value", newTitle);
    });
  });
});
