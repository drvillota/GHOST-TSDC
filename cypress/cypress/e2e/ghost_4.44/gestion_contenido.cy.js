const selectors = {
  postButton: "span",
  titleTextarea: "textarea[placeholder='Post title']",
  postContentArea: "[contenteditable]",
  publishMenu: "[class=\'gh-publishmenu ember-view\']",
  scheduleOption: "[class='gh-publishmenu-radio-button']",
  publishButton: "[class=\'gh-btn gh-btn-black gh-publishmenu-button gh-btn-icon ember-view\']",
  publishButton2: "[class=\'gh-btn gh-btn-black gh-btn-icon ember-view\']",
  updateButton: "//button[contains(span/text(),'Update')]",
  pickPost: "[class=\'gh-list-row gh-posts-list-item\']",
  postTitle: "[class=\'gh-content-entry-title\']",
};

const host = "http://test.denkitronik.com:3002";

describe("Gestion de contenido", () => {
  beforeEach(() => {
    // Realizar el inicio de sesión antes de cada escenario
    cy.visit(host + "/ghost/#/signin");
    cy.get("#ember7").clear().type("lasherone@hotmail.com");
    cy.get("#ember9").clear().type("Pruebas12345");
    //Screenshot de inicio de sesion de usuario admin
    cy.screenshot("contenido/inicio_sesion_admin");
    cy.get("#ember11").click();
  });

  describe("Como usuario puedo publicar un post", () => {
    beforeEach(() => {
      // Navegar a la página de gestión de contenido
      cy.visit(host + "/ghost/#/posts");
      //Screenshot de la pagina de contenido
      cy.screenshot("contenido/crear_post/posts");
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
      cy.screenshot("contenido/crear_post/new_post");

      // Actualizar los campos
      // Título del post
      cy.get(selectors.titleTextarea).clear().type(newTitle);
      // Contenido del post
      cy.get(selectors.postContentArea)
        .should("exist") // Verificar que el elemento exista en el DOM
        .scrollIntoView() // Desplazar al elemento al viewport si está oculto
        .type(newContent, { force: true });
      // Screenshot de la pagina de nuevo post editado
      cy.screenshot("contenido/crear_post/new_post_editado");

      cy.wait(3000);

      // Despliega las opciones de publicar
      cy.get(selectors.publishMenu) // Verificar que el elemento exista en el DOM
        .children('div')
        .children('span')
        .scrollIntoView() // Desplazar al elemento al viewport si está oculto
        .click({force:true});
      // Screenshot de la pagina de nuevo post editado
      cy.screenshot("contenido/crear_post/publish_options");

      cy.wait(3000);

      // Busca el botón 'Publish' y lo clickea para guardar el nuevo post
      cy.get(selectors.publishButton).scrollIntoView().click({force:true});
      //Screenshot de la pagina de usuario ghost actualizado
      cy.screenshot("contenido/crear_post/publish_post");

      cy.wait(3000);

      // Busca el botón 'Publish' para confirmar la publicación y lo clickea para guardar el nuevo post
      cy.get(selectors.publishButton2).scrollIntoView().click({force:true});
      //Screenshot de la pagina de usuario ghost actualizado
      cy.screenshot("contenido/crear_post/publish_post_confirmation");

      cy.wait(3000);

      // Navegar a la página de gestión de contenido
      cy.visit(host + "/ghost/#/posts");
      //Screenshot de la pagina de usuario ghost actualizado
      cy.screenshot("contenido/crear_post/final_posts_view");

      cy.wait(3000);

      // Verificar que el post se haya publicado correctamente
      cy.get('span').contains('few seconds');
    });
  });

  describe("Como usuario puedo crear un draft", () => {
    beforeEach(() => {
      // Navegar a la página de gestión de contenido
      cy.visit(host + "/ghost/#/posts");
      //Screenshot de la pagina de contenido
      cy.screenshot("contenido/crear_draft/posts");
    });

    it("Crear un draft", () => {
      // Generar valores aleatorios con Faker.js
      const newTitle = "New draft";
      const newContent = "This is the draft content";

      // Busca el botón 'New post' y se clickea para empezar a crear un nuevo draft
      cy.get(selectors.postButton)
        .contains("New post")
        .should("be.visible")
        .click();
      // Screenshot de la pagina de nuevo post
      cy.screenshot("contenido/crear_draft/new_draft");

      // Actualizar los campos
      // Título del draft
      cy.get(selectors.titleTextarea).clear().type(newTitle);
      // Contenido del draft
      cy.get(selectors.postContentArea)
        .should("exist") // Verificar que el elemento exista en el DOM
        .scrollIntoView() // Desplazar al elemento al viewport si está oculto
        .type(newContent, { force: true });
      // Screenshot de la pagina de nuevo post editado
      cy.screenshot("contenido/crear_draft/new_draft_editado");

      cy.wait(3000);

      // Navegar a la página de gestión de contenido
      cy.visit(host + "/ghost/#/posts");
      //Screenshot de la pagina de usuario ghost actualizado
      cy.screenshot("contenido/crear_draft/final_drafts_view");

      cy.wait(3000);

      // Verificar que el post se haya publicado correctamente
      cy.get('span').contains('few seconds');
    });
  });

  describe("Como usuario puedo crear un post scheduled (programada)", () => {
    beforeEach(() => {
      // Navegar a la página de gestión de contenido
      cy.visit(host + "/ghost/#/posts");
      //Screenshot de la pagina de contenido
      cy.screenshot("contenido/schedule_post/posts");
    });

    it("Publicar un post", () => {
      // Generar valores aleatorios con Faker.js
      const newTitle = "New schedule post";
      const newContent = "This is the schedule content";

      // Busca el botón 'New post' y se clickea para empezar a crear un nuevo post
      cy.get(selectors.postButton)
        .contains("New post")
        .should("be.visible")
        .click();
      // Screenshot de la pagina de nuevo post
      cy.screenshot("contenido/schedule_post/new_post");

      // Actualizar los campos
      // Título del post
      cy.get(selectors.titleTextarea).clear().type(newTitle);
      // Contenido del post
      cy.get(selectors.postContentArea)
        .should("exist") // Verificar que el elemento exista en el DOM
        .scrollIntoView() // Desplazar al elemento al viewport si está oculto
        .type(newContent, { force: true });
      // Screenshot de la pagina de nuevo post editado
      cy.screenshot("contenido/schedule_post/new_post_editado");

      cy.wait(3000);

      // Despliega las opciones de publicar
      cy.get(selectors.publishMenu) // Verificar que el elemento exista en el DOM
        .children('div')
        .children('span')
        .scrollIntoView() // Desplazar al elemento al viewport si está oculto
        .click({force:true});
      // Screenshot de la pagina de nuevo post editado
      cy.screenshot("contenido/schedule_post/publish_options");

      cy.wait(3000);

      // Busca la opción 'Schedule it for later' y lo clickea para seleccionar la opción de programar
      cy.get(selectors.scheduleOption).last().scrollIntoView().click({force:true});
      //Screenshot de la pagina de usuario ghost actualizado
      cy.screenshot("contenido/schedule_post/schedule_option");

      cy.wait(3000);

      // Busca el botón 'Schedule' y lo clickea para programar el nuevo post
      cy.get(selectors.publishButton).scrollIntoView().click({force:true});
      //Screenshot de la pagina de usuario ghost actualizado
      cy.screenshot("contenido/schedule_post/publish_schedule_post");

      cy.wait(3000);

      // Busca el botón 'Schedule' para confirmar la programación de la publicación y lo clickea para guardar el nuevo post
      cy.get(selectors.publishButton2).scrollIntoView().click({force:true});
      //Screenshot de la pagina de usuario ghost actualizado
      cy.screenshot("contenido/schedule_post/publish_schedule_post_confirmation");

      cy.wait(3000);

      // Navegar a la página de gestión de contenido
      cy.visit(host + "/ghost/#/posts");

      cy.wait(3000);

      // Verificar que el post se haya publicado correctamente
      cy.get('span').contains('few seconds');
    });
  });

  describe("Como usuario puedo actualizar un post", () => {
    beforeEach(() => {
      // Navegar a la página de gestión de contenido
      cy.visit(host + "/ghost/#/posts");
      //Screenshot de la pagina de contenido
      cy.screenshot("contenido/actualizar_post/posts");
    });

    it("Actualizar un post", () => {
      // Generar valores aleatorios con Faker.js
      const newTitle = "Post actualizado";
      const newContent = "This is the updated content";

      // Busca un post y se clickea para empezar a actualizarlo
      cy.get(selectors.pickPost).last().click()
      // Screenshot de la pagina de nuevo post
      cy.screenshot("contenido/actualizar_post/pick_post");

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
      cy.screenshot("contenido/actualizar_post/updated_post_editado");

      cy.wait(3000);

      // Despliega las opciones de publicar
      cy.get(selectors.publishMenu) // Verificar que el elemento exista en el DOM
        .children('div')
        .children('span')
        .scrollIntoView() // Desplazar al elemento al viewport si está oculto
        .click({force:true});
      // Screenshot de la pagina de nuevo post editado
      cy.screenshot("contenido/actualizar_post/update_options");

      cy.wait(3000);

      // Busca el botón 'Publish' y lo clickea para guardar el nuevo post
      cy.get(selectors.publishButton).scrollIntoView().click({force:true});
      //Screenshot de la pagina de usuario ghost actualizado
      cy.screenshot("contenido/actualizar_post/update_post");

      cy.wait(3000);

      // Navegar a la página de gestión de contenido
      cy.visit(host + "/ghost/#/posts");
      //Screenshot de la pagina de usuario ghost actualizado
      cy.screenshot("contenido/actualizar_post/final_posts_view");

      cy.wait(3000);

      // Verificar que el post se haya publicado correctamente
      cy.get('span').contains('few seconds');
    });
  });
});
