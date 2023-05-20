const selectors = {
  Staff: '//a[contains(@class, "ember-view") and contains(text(), "Staff")]',
  Design: '//a[@href="#/settings/design/"]',
  slug: "#user-slug",
  email: "#user-email",
  bio: "#user-bio",
};

const host = "http://test.denkitronik.com:2368";

describe("Gestion de usuarios", () => {
  beforeEach(() => {
    // Realizar el inicio de sesión antes de cada escenario
    cy.visit(host+"/ghost/#/signin");
    cy.get('input[name="identification"]').clear().type("lasherone@hotmail.com");
    cy.get('input[name="password"]').clear().type("Pruebas12345");
    //Screenshot de inicio de sesion de usuario admin
    cy.screenshot("ghost-3.41.1/usuarios/inicio_sesion_admin");  
    cy.get('button[type="submit"]').click();
  });

  describe("Como usuario admin puedo actualizar la información de un usuario", () => {
    beforeEach(() => {
      // Navegar a la página de gestión de usuarios
      cy.contains("a", "Staff").click();
      //Screenshot de la pagina de staff de usuarios
      cy.screenshot("ghost-3.41.1/usuarios/actualizar_usuario/1_staff");  
      cy.contains("h3", "Ghost").click();
      //Screenshot de la pagina de usuario ghost
      cy.screenshot("ghost-3.41.1/usuarios/actualizar_usuario/2_ghost");  
    });

    it("Actualizar información del usuario", () => {
      // Generar valores aleatorios con Faker.js
      const newBio = "Biografia de prueba";
      const newSlug = "a-simple-slug";
      const newEmail = "pruebas@gmail.com";

      // Actualizar los campos
      cy.get(selectors.bio).clear().type(newBio);
      cy.get(selectors.slug)
        .should("exist") // Verificar que el elemento exista en el DOM
        .scrollIntoView() // Desplazar al elemento al viewport si está oculto
        .focus() // Hacer foco en el elemento
        .clear({ force: true }) // Limpiar el campo forzando la interacción
        .type(newSlug, { force: true }); // Escribir en el campo forzando la interacción
      cy.get(selectors.email)
        .should("exist") // Verificar que el elemento exista en el DOM
        .scrollIntoView() // Desplazar al elemento al viewport si está oculto
        .focus() // Hacer foco en el elemento
        .clear({ force: true }) // Limpiar el campo forzando la interacción
        .type(newEmail, { force: true }); // Escribir en el campo forzando la interacción
        //Screenshot de la pagina de usuario ghost editado
        cy.screenshot("ghost-3.41.1/usuarios/actualizar_usuario/1_ghost_editado");  
      // Guardar los cambios
      cy.contains("span", "Save").parent().click();
      //Screenshot de la pagina de usuario ghost actualizado
      cy.screenshot("ghost-3.41.1/usuarios/actualizar_usuario/2_ghost_actualizado");  
      // Verificar que la información se haya actualizado correctamente
      cy.get(selectors.slug).scrollIntoView();
      cy.get(selectors.slug).should("have.value", newSlug);
      cy.get(selectors.bio).should("have.value", newBio);
      cy.get(selectors.email).should("have.value", newEmail);
    });
  });

  describe("Como usuario admin puedo cambiar la contraseña de otro usuario", () => {
    beforeEach(() => {
      // Navegar a la página de gestión de usuarios
      cy.contains("a", "Staff").click();
      cy.contains("h3", "Ghost").click();
      //Screenshot de la pagina de ghost de cambio de clave
      cy.screenshot("ghost-3.41.1/usuarios/actualizar_clave/1_ghost");  
    });

    it("Cambiar la contraseña del usuario", () => {
      // Generar una nueva contraseña aleatoria con Faker.js
      const newPassword = "Pruebas123456";

      // Ingresar la nueva contraseña
      cy.get("#user-password-new").clear().type(newPassword);
      cy.get("#user-new-password-verification").clear().type(newPassword);
      //Screenshot de la pagina de ghost de cambio de clave con la nueva clave
      cy.screenshot("ghost-3.41.1/usuarios/actualizar_clave/2_clave_nueva");
      cy.contains("span", "Change Password").parent().click();
      //Screenshot de la pagina de ghost de cambio de clave con la nueva clave cambiada
      cy.screenshot("ghost-3.41.1/usuarios/actualizar_clave/3_clave_cambiada");  
      // Verificar que la contraseña se haya cambiado correctamente
      cy.contains("span", "Password updated").should("exist");
    });
  });
});

describe("Gestion de usuarios de Ghost (suspension y reactivacion)", () => {
  describe("Como usuario admin puedo suspender otro usuario", () => {
    before(() => {
      cy.visit(host+"/ghost/#/signin");
      cy.get("#ember8").type("lasherone@hotmail.com");
      cy.get("#ember10").type("Pruebas12345");
      //Screenshot de inicio de sesion para suspender usuario
      cy.screenshot("ghost-3.41.1/usuarios/suspender/1_inicio_sesion_admin");  
      cy.get("#ember12").click();
    });

    it("Update user", () => {
      cy.contains("Staff").should("be.visible").click();
      //Screenshot de la pagina de staff
      cy.screenshot("ghost-3.41.1/usuarios/suspender/2_staff"); 
      cy.contains("Ghost").should("be.visible").click();
      //Screenshot de la pagina de usuario ghost
      cy.screenshot("ghost-3.41.1/usuarios/suspender/3_ghost");
      cy.get("button.user-actions-cog")
        .should("exist") // Verificar que el elemento exista en el DOM
        .scrollIntoView() // Desplazar al elemento al viewport si está oculto
        .focus() // Hacer foco en el elemento
        .click();
      //Screenshot de la pagina de usuario ghost con el menu desplegado
      cy.screenshot("ghost-3.41.1/usuarios/suspender/4_ghost_menu_desplegado");
      cy.get("button.suspend").should("be.visible").invoke("click");
      //Screenshot de la pagina de usuario ghost con el menu desplegado y suspendido
      cy.screenshot("ghost-3.41.1/usuarios/suspender/5_ghost_menu_desplegado_suspendido");
      cy.get("button.gh-btn-red")
        .contains("Suspend")
        .should("be.visible")
        .click();
      //Screenshot de la pagina de usuario ghost con el menu desplegado y suspendido
      cy.screenshot("ghost-3.41.1/usuarios/suspender/6_ghost_menu_desplegado_suspendido_confirmado");
      cy.contains("Staff").should("be.visible").click();
      //Screenshot de la pagina de staff con el usuario suspendido
      cy.screenshot("ghost-3.41.1/usuarios/suspender/7_staff_suspender");
      cy.get('a[href="#/staff/a-simple-slug/"]') // Selector basado en el atributo href del elemento <a>
        .within(() => {
          cy.get(".gh-badge").contains("Suspended").should("exist");
        });
    });
  });

  describe("Como usuario admin puedo reactivar (un-suspend) otro usuario", () => {
    before(() => {
      cy.visit(host+"/ghost/#/signin");
      cy.get("#ember8").type("lasherone@hotmail.com");
      cy.get("#ember10").type("Pruebas12345");
      //Screenshot de la pagina de inicio de sesion para reactivar usuario
      cy.screenshot("ghost-3.41.1/usuarios/unsuspend/1_inicio_sesion_admin");
      cy.get("#ember12").click();
    });

    it("Unsuspend user", () => {
      cy.contains("Staff").click();
      cy.contains("Ghost").click();
      //Screenshot de la pagina de usuario ghost para reactivar
      cy.screenshot("ghost-3.41.1/usuarios/unsuspend/2_ghost");
      cy.get("button.user-actions-cog").should("be.visible").click();
      //Screenshot de la pagina de usuario ghost con el menu desplegado para reactivar
      cy.screenshot("ghost-3.41.1/usuarios/unsuspend/3_ghost_menu_desplegado");
      cy.contains("Un-suspend").should("be.visible").click();
      //Screenshot de la pagina de usuario ghost con el menu desplegado y reactivado
      cy.screenshot("ghost-3.41.1/usuarios/unsuspend/4_ghost_menu_desplegado_reactivado");
      cy.get("button.gh-btn-red")
        .contains("Un-suspend")
        .should("be.visible")
        .click();
      //Screenshot de la pagina de usuario ghost con el menu desplegado y reactivado confirmado
      cy.screenshot("ghost-3.41.1/usuarios/unsuspend/5_ghost_menu_desplegado_reactivado_confirmado");
      cy.contains("Staff").should("be.visible").click();
      //Screenshot de la pagina de staff reactivado
      cy.screenshot("ghost-3.41.1/usuarios/unsuspend/6_staff_reactivado");
      cy.get('a[href="#/staff/a-simple-slug/"]') // Selector basado en el atributo href del elemento <a>
        .within(() => {
          cy.get(".gh-badge").contains("Author").should("exist");
        });
    });
  });
});
describe("Gestion de Diseño", () => {
  describe("Como usuario puedo actualizar un item de navegacion", () => {
    beforeEach(() => {
      cy.visit(host+"/ghost/#/signin");
      cy.get("#ember8").type("lasherone@hotmail.com");
      cy.get("#ember10").type("Pruebas12345");
      //Screenshot de la pagina de inicio de sesion para actualizar un item de navegacion
      cy.screenshot("ghost-3.41.1/diseño/actualizar/1_inicio_sesion_admin");
      cy.get("#ember12").click();
    });

    it("Como usuario puedo actualizar un item de navegacion", () => {
      const randomLabel = `Nav-${Date.now()}`;
      cy.contains("Design").click();
      //Screenshot de la pagina de diseño
      cy.screenshot("ghost-3.41.1/diseño/actualizar/2_menu_diseño");
      cy.get("input")
        .filter((index, el) => el.value === "")
        .first()
        .type(randomLabel);
      //Screenshot de la pagina de diseño con el item de navegacion actualizado
      cy.screenshot("ghost-3.41.1/diseño/actualizar/3_diseño_item_navegacion_actualizado");
      cy.contains("button", "Save").click();
      cy.contains("Design").click();
      //Screenshot de la pagina de diseño con el item de navegacion actualizado y guardado
      cy.screenshot("ghost-3.41.1/diseño/actualizar/4_diseño_item_navegacion_actualizado_guardado");
      cy.get("input")
        .filter((index, el) => el.value === randomLabel)
        .first()
        .invoke("val")
        .should("eq", randomLabel);
    });
  });
});
