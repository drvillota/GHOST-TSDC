const selectors = {
  Staff: '//a[contains(@class, "ember-view") and contains(text(), "Staff")]',
  Design: '//a[@href="#/settings/design/"]',
  slug: "#user-slug",
  email: "#user-email",
  bio: "#user-bio",
};

const host = "http://test.denkitronik.com:3002";

describe("Gestion de usuarios", () => {
  describe("Como usuario admin puedo actualizar la información de un usuario", () => {
    beforeEach(() => {
      // Realizar el inicio de sesión antes de cada escenario
      cy.visit(host + "/ghost/#/signin");
      cy.get("#ember7").clear().type("lasherone@hotmail.com");
      cy.get("#ember8").clear().type("Pruebas12345");
      //Screenshot de inicio de sesion de usuario admin
      cy.screenshot("ghost-4.40/usuarios/inicio_sesion_admin");
      cy.get("#ember11").click();
      cy.wait(2000);
    });

    it("Seleccionar el usuario Ghost", () => {
      // Navegar a la página de gestión de usuarios
      cy.get('a[href="#/settings/"]').should("be.visible").click();
      cy.wait(3000).then(() => {
        cy.get('a[href="#/settings/staff/"]').should("be.visible").click();
      });
      //Screenshot de la pagina de staff de usuarios
      cy.screenshot("ghost-4.40/usuarios/actualizar_usuario/1_staff");
      cy.get('a[href="#/settings/staff/a-simple-slug/')
        .should("be.visible")
        .click();
      //Screenshot de la pagina de usuario ghost
      cy.screenshot("ghost-4.40/usuarios/actualizar_usuario/2_ghost");
      // });

      // it("Actualizar información del usuario", () => {
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
      cy.screenshot("ghost-4.40/usuarios/actualizar_usuario/1_ghost_editado");
      // Guardar los cambios
      cy.contains("span", "Save").parent().click();
      //Screenshot de la pagina de usuario ghost actualizado
      cy.screenshot(
        "ghost-4.40/usuarios/actualizar_usuario/2_ghost_actualizado"
      );
      // Verificar que la información se haya actualizado correctamente
      cy.get(selectors.slug).scrollIntoView();
      cy.get(selectors.slug).should("have.value", newSlug);
      cy.get(selectors.bio).should("have.value", newBio);
      cy.get(selectors.email).should("have.value", newEmail);
    });
  });

  describe("Como usuario admin puedo cambiar la contraseña de otro usuario", () => {
    beforeEach(() => {
      // Realizar el inicio de sesión antes de cada escenario
      cy.visit(host + "/ghost/#/signin");
      cy.get("#ember7").clear().type("lasherone@hotmail.com");
      cy.get("#ember8").clear().type("Pruebas12345");
      //Screenshot de inicio de sesion de usuario admin
      cy.screenshot("ghost-4.40/usuarios/actualizar_clave/1_ghost");
      cy.get("#ember11").click();
      cy.wait(2000);
    });

    it("Cambiar la contraseña del usuario", () => {
      // Generar una nueva contraseña aleatoria con Faker.js
      const newPassword = "Pruebas123456";

      // Navegar a la página de gestión de usuarios
      cy.get('a[href="#/settings/"]').should("be.visible").click();
      cy.wait(3000).then(() => {
        cy.get('a[href="#/settings/staff/"]').should("be.visible").click();
      });
      cy.get('a[href="#/settings/staff/a-simple-slug/')
        .should("be.visible")
        .click();
      //Screenshot de la pagina de usuario ghost
      cy.screenshot("ghost-4.40/usuarios/actualizar_clave/1_ghost");

      // Ingresar la nueva contraseña
      cy.get("#user-password-new").clear().type(newPassword);
      cy.get("#user-new-password-verification").clear().type(newPassword);
      //Screenshot de la pagina de ghost de cambio de clave con la nueva clave
      cy.screenshot("ghost-4.40/usuarios/actualizar_clave/2_clave_nueva");
      cy.contains("span", "Change Password").parent().click();
      //Screenshot de la pagina de ghost de cambio de clave con la nueva clave cambiada
      cy.screenshot("ghost-4.40/usuarios/actualizar_clave/3_clave_cambiada");
      // Verificar que la contraseña se haya cambiado correctamente
      cy.contains("span", "Password updated").should("exist");
    });
  });

  describe("Como usuario admin puedo suspender otro usuario", () => {
    beforeEach(() => {
      // Realizar el inicio de sesión antes de cada escenario
      cy.visit(host + "/ghost/#/signin");
      cy.get("#ember7").clear().type("lasherone@hotmail.com");
      cy.get("#ember8").clear().type("Pruebas12345");
      //Screenshot de inicio de sesion de usuario admin
      cy.screenshot("ghost-4.40/usuarios/suspender/1_inicio_sesion_admin");
      cy.get("#ember11").click();
      cy.wait(2000);
    });

    it("Update user", () => {
      // Navegar a la página de gestión de usuarios
      cy.get('a[href="#/settings/"]').should("be.visible").click();
      cy.wait(3000).then(() => {
        cy.get('a[href="#/settings/staff/"]').should("be.visible").click();
      });
      //Screenshot de la pagina de staff
      cy.screenshot("usuarios/suspender/2_staff");
      cy.get('a[href="#/settings/staff/a-simple-slug/')
        .should("be.visible")
        .click();
      //Screenshot de la pagina de usuario ghost
      cy.screenshot("usuarios/suspender/3_ghost");
      cy.get("button.user-actions-cog")
        .should("exist") // Verificar que el elemento exista en el DOM
        .scrollIntoView() // Desplazar al elemento al viewport si está oculto
        .focus() // Hacer foco en el elemento
        .click();
      //Screenshot de la pagina de usuario ghost con el menu desplegado
      cy.screenshot("usuarios/suspender/4_ghost_menu_desplegado");
      cy.get("button.suspend").should("be.visible").invoke("click");
      //Screenshot de la pagina de usuario ghost con el menu desplegado y suspendido
      cy.screenshot("usuarios/suspender/5_ghost_menu_desplegado_suspendido");
      cy.get("button.gh-btn-red")
        .contains("Suspend")
        .should("be.visible")
        .click();
      //Screenshot de la pagina de usuario ghost con el menu desplegado y suspendido
      cy.screenshot(
        "usuarios/suspender/6_ghost_menu_desplegado_suspendido_confirmado"
      );
      cy.contains("Staff").should("be.visible").click();
      //Screenshot de la pagina de staff con el usuario suspendido
      cy.screenshot("usuarios/suspender/7_staff_suspender");
      cy.get('a[href="#/settings/staff/a-simple-slug/"]')
        .find(".gh-badge")
        .should("have.text", "Suspended");
    });
  });
  describe("Como usuario admin puedo reactivar (un-suspend) otro usuario", () => {
    beforeEach(() => {
      // Realizar el inicio de sesión antes de cada escenario
      cy.visit(host + "/ghost/#/signin");
      cy.get("#ember7").clear().type("lasherone@hotmail.com");
      cy.get("#ember8").clear().type("Pruebas12345");
      //Screenshot de inicio de sesion de usuario admin
      cy.screenshot("ghost-4.40/usuarios/inicio_sesion_admin");
      cy.get("#ember11").click();
      cy.wait(2000);
    });

    it("Unsuspend user", () => {
      // Navegar a la página de gestión de usuarios
      cy.get('a[href="#/settings/"]').should("be.visible").click();
      cy.wait(3000).then(() => {
        cy.get('a[href="#/settings/staff/"]').should("be.visible").click();
      });
      cy.get('a[href="#/settings/staff/a-simple-slug/')
        .should("be.visible")
        .click();
      //Screenshot de la pagina de usuario ghost para reactivar
      cy.screenshot("usuarios/unsuspend/2_ghost");
      cy.get("button.user-actions-cog").should("be.visible").click();
      //Screenshot de la pagina de usuario ghost con el menu desplegado para reactivar
      cy.screenshot("usuarios/unsuspend/3_ghost_menu_desplegado");
      cy.contains("Un-suspend").should("be.visible").click();
      //Screenshot de la pagina de usuario ghost con el menu desplegado y reactivado
      cy.screenshot("usuarios/unsuspend/4_ghost_menu_desplegado_reactivado");
      cy.get("button.gh-btn-red")
        .contains("Un-suspend")
        .should("be.visible")
        .click();
      //Screenshot de la pagina de usuario ghost con el menu desplegado y reactivado confirmado
      cy.screenshot(
        "usuarios/unsuspend/5_ghost_menu_desplegado_reactivado_confirmado"
      );
      cy.contains("Staff").should("be.visible").click();
      //Screenshot de la pagina de staff reactivado
      cy.screenshot("usuarios/unsuspend/6_staff_reactivado");
      cy.get('a[href="#/settings/staff/a-simple-slug/"]')
      .find('.gh-badge')
      .should('have.text', 'Author');
    });
  });
});

describe("Gestion de Diseño", () => {
  describe("Como usuario puedo actualizar un item de navegacion", () => {
    beforeEach(() => {
      // Realizar el inicio de sesión antes de cada escenario
      cy.visit(host + "/ghost/#/signin");
      cy.get("#ember7").clear().type("lasherone@hotmail.com");
      cy.get("#ember8").clear().type("Pruebas12345");
      //Screenshot de inicio de sesion de usuario admin
      cy.screenshot("ghost-4.40/diseño/1_inicio_sesion_admin");
      cy.get("#ember11").click();
      cy.wait(2000);
    });

    it("Como usuario puedo actualizar un item de navegacion", () => {
      const randomLabel = `Nav-${Date.now()}`;

      // Navegar a la página de gestión de usuarios
      cy.get('a[href="#/settings/"]').should("be.visible").click();
      cy.wait(3000).then(() => {
        cy.get('a[href="#/settings/navigation/"]').should("be.visible").click();
      });
      //Screenshot de la pagina de diseño
      cy.screenshot("diseño/actualizar/2_menu_diseño");
      cy.get("input")
        .filter((index, el) => el.value === "")
        .first()
        .type(randomLabel);
      //Screenshot de la pagina de diseño con el item de navegacion actualizado
      cy.screenshot("diseño/actualizar/3_diseño_item_navegacion_actualizado");
      cy.contains("button", "Save").click();
      cy.visit(host + "/ghost/#/settings/navigation");
      //Screenshot de la pagina de diseño con el item de navegacion actualizado y guardado
      cy.screenshot(
        "diseño/actualizar/4_diseño_item_navegacion_actualizado_guardado"
      );
      cy.get("input")
        .filter((index, el) => el.value === randomLabel)
        .first()
        .invoke("val")
        .should("eq", randomLabel);
    });
  });
});
