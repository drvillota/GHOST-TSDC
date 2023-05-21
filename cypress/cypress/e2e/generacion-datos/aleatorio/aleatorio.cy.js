const ghostUrl = "http://test.denkitronik.com:2368"; // URL de Ghost 3.41.1
const apiUser = "/users_schema.json"; // API de Mockaroo para generar datos de usuarios de Ghost
const apiPostPage = "/posts_schema.json"; // API de Mockaroo para generar datos de Posts y Pages
var loginData; // Variable para almacenar los datos de login y clave válidos
const timestamp = new Date().toISOString().replace(/[:.]/g, "-"); // Genera una marca de tiempo única
import { faker as fakerEnglish } from "@faker-js/faker";
import { faker as fakerChinese } from "@faker-js/faker/locale/zh_CN";
import naughty from "big-list-of-naughty-strings";

context("Pruebas a priori de Ghost 3.41.1 de tipo Login", () => {
  // Leer datos de login
  before(() => {
    // Leer los datos del data pool de login y clave válidos
    cy.readFile("cypress/fixtures/data_pool/login_clave.json").then(
      (fileContent) => {
        loginData = fileContent;
        cy.log("Valid login" + fileContent); // Imprimir el contenido del archivo en la consola de Cypress
      }
    );

    // fakerEnglish.seed(0);
    // fakerChinese.seed(0);
  });

  // Ingresar a la página de inicio de sesión de Ghost
  beforeEach(() => {
    cy.visit(ghostUrl + "/ghost/#/signin");
  });

  // Escenario 1: Inicio de sesión con datos inválidos - Random email y password
  it("1. Ingresar Random email & password", () => {
    var randomEmail = fakerEnglish.internet.email();
    var randomPass = fakerEnglish.internet.password();
    cy.log(
      "Usaremos el email " + randomEmail + " y la contraseña " + randomPass
    );
    cy.get('input[name="identification"]').type(randomEmail, { force: true });
    cy.get('input[name="password"]').type(randomPass, { force: true });
    cy.get('button[type="submit"]').click();
    // Verificar que se muestre el mensaje de error
    cy.get("p.main-error") // Selecciona el elemento <p> con la clase "main-error"
      .contains("There is no user with that email address.") // Verifica que contenga el texto "Unknown error"
      .should("be.visible"); // Verifica que el elemento sea visible en la página
    cy.screenshot(`aleatorio/${timestamp}/scn1`);
  });

  // Escenario 2: Inicio de sesión con datos inválidos - Valid email y random password
  it("2. Ingresar Valid email & Random password", () => {
    const aprioriIndex = 2;
    var validEmail = loginData.email;
    var randomPass = fakerEnglish.internet.password();
    cy.log(
      "Usaremos el email " + validEmail + " y la contraseña " + randomPass
    );
    cy.get('input[name="identification"]').type(validEmail, { force: true });
    cy.get('input[name="password"]').type(randomPass, { force: true });
    cy.get('button[type="submit"]').click();
    // Verificar que se muestre el mensaje de error
    cy.get("p.main-error") // Selecciona el elemento <p> con la clase "main-error"
      .should(($element) => {
        const text = $element.text();
        expect(text).to.match(
          /Your password is incorrect\.|Too many login attempts\.|Please fill out the form to sign in.\./
        );
      })
      .should("be.visible"); // Verifica que el elemento sea visible en la página
    cy.screenshot(`aleatorio/${timestamp}/scn2`);
  });

  // Escenario 3: Inicio de sesión con datos inválidos - Random email y naughty password
  it("3. Ingresar Random email & Naughty password", () => {
    var randomEmail = fakerEnglish.internet.email();
    var naughtyPass = fakerEnglish.helpers.arrayElement(naughty);
    cy.log(
      "Usaremos el email " + randomEmail + " y la contraseña " + naughtyPass
    );
    cy.get('input[name="identification"]').type(randomEmail, { force: true });
    cy.get('input[name="password"]').type(naughtyPass, { force: true });
    cy.get('button[type="submit"]').click();
    // Verificar que se muestre el mensaje de error
    cy.get("p.main-error") // Selecciona el elemento <p> con la clase "main-error"
      .contains("There is no user with that email address.") // Verifica que contenga el texto "Unknown error"
      .should("be.visible"); // Verifica que el elemento sea visible en la página
    cy.screenshot(`aleatorio/${timestamp}/scn3`);
  });

  // Escenario 4: Inicio de sesión con datos inválidos - Random email y empty password
  it("4. Ingresar Random email & Empty password", () => {
    const randomEmail = fakerEnglish.internet.email();
    cy.log(
      "Usaremos el email " + randomEmail + " y la contraseña vacia (empty)"
    );
    cy.get('input[name="identification"]').type(randomEmail, { force: true });
    cy.get('button[type="submit"]').click();
    // Verificar que se muestre el mensaje de error
    cy.get("p.main-error") // Selecciona el elemento <p> con la clase "main-error"
      .contains("Please fill out the form to sign in.") // Verifica que contenga el texto "Please fill out the form to sign in."
      .should("be.visible"); // Verifica que el elemento sea visible en la página
    cy.screenshot(`aleatorio/${timestamp}/scn4`);
  });

  // Escenario 5: Inicio de sesión con datos inválidos - Empty email y random password

  it("5. Ingresar Empty email & random password", () => {
    const randomPass = fakerEnglish.internet.password();
    cy.log("Usaremos el email vacio (empty) y la contraseña " + randomPass);
    cy.get('input[name="password"]').type(randomPass, { force: true });
    cy.get('button[type="submit"]').click();
    // Verificar que se muestre el mensaje de error
    cy.get("p.main-error") // Selecciona el elemento <p> con la clase "main-error"
      .contains("Please fill out the form to sign in.") // Verifica que contenga el texto "Please fill out the form to sign in."
      .should("be.visible"); // Verifica que el elemento sea visible en la página
    cy.screenshot(`aleatorio/${timestamp}/scn5`);
  });

  // Escenario 6: Inicio de sesión con datos inválidos - Valid email & invalid kanji password
  it("6. Ingresar Valid email & invalid kanji password", () => {
    var validEmail = loginData.email;
    var randomPass = fakerChinese.internet.password();
    cy.log(
      "Usaremos el email " + validEmail + " y la contraseña " + randomPass
    );
    cy.get('input[name="identification"]').type(validEmail, { force: true });
    cy.get('input[name="password"]').type(randomPass, { force: true });
    cy.get('button[type="submit"]').click();
    // Verificar que se muestre el mensaje de error
    cy.get("p.main-error") // Selecciona el elemento <p> con la clase "main-error"
      .should(($element) => {
        const text = $element.text();
        expect(text).to.match(
          /Your password is incorrect\.|Too many login attempts\.|Please fill out the form to sign in.\./
        );
      })
      .should("be.visible"); // Verifica que el elemento sea visible en la página
    cy.screenshot(`aleatorio/${timestamp}/scn6`);
  });

  // Escenario 7: Inicio de sesión con datos inválidos - Naughty email & random password
  it("7. Ingresar Naughty email & random password", () => {
    var naughtyEmail = fakerEnglish.helpers.arrayElement(naughty);
    var randomPass = fakerEnglish.internet.password();
    cy.log(
      "Usaremos el email " + naughtyEmail + " y la contraseña " + randomPass
    );
    cy.get('input[name="identification"]').type(naughtyEmail, { force: true });
    cy.get('input[name="password"]').type(randomPass, { force: true });
    cy.get('button[type="submit"]').click();
    // Verificar que se muestre el mensaje de error
    cy.get("p.main-error") // Selecciona el elemento <p> con la clase "main-error"
      .contains("Please fill out the form to sign in.") // Verifica que contenga el texto "Please fill out the form to sign in."
      .should("be.visible"); // Verifica que el elemento sea visible en la página
    cy.screenshot(`aleatorio/${timestamp}/scn7`);
  });

  // Escenario 8: Inicio de sesión con datos inválidos - Empty email & Naughty password
  it("8. Ingresar Empty email & Naughty password", () => {
    var naughtyPass = fakerEnglish.helpers.arrayElement(naughty);
    cy.log("Usaremos el email vacio (empty) y la contraseña " + naughtyPass);
    cy.get('input[name="password"]').type(naughtyPass, { force: true });
    cy.get('button[type="submit"]').click();
    // Verificar que se muestre el mensaje de error
    cy.get("p.main-error") // Selecciona el elemento <p> con la clase "main-error"
      .contains("Please fill out the form to sign in.") // Verifica que contenga el texto "Please fill out the form to sign in."
      .should("be.visible"); // Verifica que el elemento sea visible en la página
    cy.screenshot(`aleatorio/${timestamp}/scn8`);
  });

  // Escenario 9: Inicio de sesión con datos inválidos - Valid email & Naughty password
  it("9. Ingresar Valid email & Naughty password", () => {
    var naughtyPass = fakerEnglish.helpers.arrayElement(naughty);
    var validEmail = loginData.email;
    cy.log(
      "Usaremos el email " + validEmail + " y la contraseña " + naughtyPass
    );
    cy.get('input[name="identification"]').type(validEmail, { force: true });
    cy.get('input[name="password"]').type(naughtyPass, { force: true });
    cy.get('button[type="submit"]').click();
    // Verificar que se muestre el mensaje de error
    cy.get("p.main-error") // Selecciona el elemento <p> con la clase "main-error"
      .should(($element) => {
        const text = $element.text();
        expect(text).to.match(
          /Your password is incorrect\.|Too many login attempts\.|Please fill out the form to sign in.\./
        );
      })
      .should("be.visible"); // Verifica que el elemento sea visible en la página
    cy.screenshot(`aleatorio/${timestamp}/scn9`);
  });

  // Escenario 10: Inicio de sesión con datos inválidos - Naughty email & Valid password
  it("10. Ingresar Naughty email & Valid password", () => {
    var naughtyEmail = fakerEnglish.helpers.arrayElement(naughty);
    var validPass = loginData.password;
    cy.log(
      "Usaremos el email " + naughtyEmail + " y la contraseña " + validPass
    );
    cy.get('input[name="identification"]').type(naughtyEmail, { force: true });
    cy.get('input[name="password"]').type(validPass, { force: true });
    cy.get('button[type="submit"]').click();
    // Verificar que se muestre el mensaje de error
    cy.get("p.main-error") // Selecciona el elemento <p> con la clase "main-error"
      .contains("Please fill out the form to sign in.") // Verifica que contenga el texto "Please fill out the form to sign in."
      .should("be.visible"); // Verifica que el elemento sea visible en la página
    cy.screenshot(`aleatorio/${timestamp}/scn10`);
  });
});

/**
 * Pruebas aleatorias de Ghost 3.41.1 de Posts y Pages
 */
context("Pruebas aleatorias de Ghost 3.41.1 de Posts y Pages", () => {
  // Leer datos de login
  before(() => {
    // Leer los datos del data pool de login y clave válidos
    cy.readFile("cypress/fixtures/data_pool/login_clave.json").then(
      (fileContent) => {
        loginData = fileContent;
        cy.log("Valid login" + fileContent); // Imprimir el contenido del archivo en la consola de Cypress
      }
    );
  });

  // Ingresar a la página de inicio de sesión de Ghost
  beforeEach(() => {
    // Realizar el inicio de sesión antes de los escenarios
    cy.visit(ghostUrl + "/ghost/#/signin");
    cy.get('input[name="identification"]').clear().type(loginData.email);
    cy.get('input[name="password"]').clear().type(loginData.password);
    cy.get('button[type="submit"]').click();
  });

  it("11. Crear Post con titulo aleatorio", () => {
    cy.get("#ember28").click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/posts");
    cy.get('a[href*="editor/post"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/editor/post");

    let title = fakerEnglish.string.sample();
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view")
      .type(title)
      .should("exist")
      .should("have.value", title);

    // Damos clic en New para generar un evento de guardado
    cy.get("span.fw4.midgrey-l2 div")
      .should(($div) => {
        const text = $div.text().trim();
        expect(text.includes("New")).to.be.true;
      })
      .click();

    // Verificamos que el estado sea Saving y luego Draft para verificar que se guardo
    cy.get("span.fw4.midgrey-l2 div").should(($div) => {
      expect($div.text().trim()).to.match(/(?:Saving\.\.\.|Draft)\s*/g);
    });
    cy.screenshot(`aleatorio/${timestamp}/scn11`);
  });

  it("12. Crear Post con titulo naughty", () => {
    cy.get("#ember28").click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/posts");
    cy.get('a[href*="editor/post"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/editor/post");
    let title = fakerEnglish.helpers.arrayElement(naughty);
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view")
      .type(title)
      .should("exist")
      .should("have.value", title);
    // Damos clic en New para generar un evento de guardado
    cy.get("span.fw4.midgrey-l2 div")
      .should(($div) => {
        const text = $div.text().trim();
        expect(text.includes("New")).to.be.true;
      })
      .click();

    // Verificamos que el estado sea Saving y luego Draft para verificar que se guardo
    cy.get("span.fw4.midgrey-l2 div").should(($div) => {
      expect($div.text().trim()).to.match(/(?:Saving\.\.\.|Draft)\s*/g);
    });
    cy.screenshot(`aleatorio/${timestamp}/scn12`);
  });

  it("13. Crear Post con titulo caracteres chinos", () => {
    fakerChinese.seed(0);
    cy.get("#ember28").click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/posts");
    cy.get('a[href*="editor/post"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/editor/post");

    let title = fakerChinese.internet.userName();
    console.log(title);
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view")
      .type(title)
      .should("exist")
      .should("have.value", title);
    // Damos clic en New para generar un evento de guardado
    cy.get("span.fw4.midgrey-l2 div")
      .should(($div) => {
        const text = $div.text().trim();
        expect(text.includes("New")).to.be.true;
      })
      .click();
    // Verificamos que el estado sea Saving y luego Draft para verificar que se guardo
    cy.get("span.fw4.midgrey-l2 div").should(($div) => {
      expect($div.text().trim()).to.match(/(?:Saving\.\.\.|Draft)\s*/g);
    });
    cy.screenshot(`aleatorio/${timestamp}/scn13`);
  });

  it("14. Crear Post con titulo de mas de 255 caracteres", () => {
    cy.get("#ember28").click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/posts");
    cy.get('a[href*="editor/post"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/editor/post");

    let title = fakerEnglish.string.alphanumeric({
      length: { min: 256, max: 1000 },
    });
    // Ingresamos el titulo de mas de 255 caracteres
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view")
      .type(title)
      .should("exist")
      .should("have.value", title);
    // Damos clic en New para generar un evento de guardado
    cy.get("span.fw4.midgrey-l2 div")
      .should(($div) => {
        const text = $div.text().trim();
        expect(text.includes("New")).to.be.true;
      })
      .click();
    // Verificamos que el estado sigue en New para indicar que no se guardo
    cy.get("span.fw4.midgrey-l2 div").should(($div) => {
      const text = $div.text().trim();
      expect(text.includes("New")).to.be.true;
    });
    cy.screenshot(`aleatorio/${timestamp}/scn14`);
  });

  it("15. Crear Post con excerpt mayor a 300 caracteres", () => {
    let inputExcerpt = fakerEnglish.string.alphanumeric({
      length: { min: 400, max: 2 ** 10 },
    });
    let title = fakerEnglish.string.sample();
    // Ingresamos al menu de posts
    cy.get('a[href*="editor/post"]').first().click();
    // Verificamos que la url sea la correcta
    cy.url().should("eq", ghostUrl + "/ghost/#/editor/post");
    // Ingresamos el titulo del post valido
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view")
      .type(title)
      .should("exist")
      .should("have.value", title);
    // Damos clic en el icono de configuracion
    cy.get("button.post-settings").first().click({ force: true });
    // Verificamos que el menu de configuracion este visible
    cy.get(
      ".settings-menu-pane-out-right.settings-menu.settings-menu-pane"
    ).should("be.visible"); // Espera hasta que el elemento span esté visible
    // Espera hasta que el elemento excerpt esté visible y desplazar el excerpt al viewport si está oculto
    cy.wait(4000);
    cy.get("#custom-excerpt")
      .should("exist") // Verificar que el elemento exista en el DOM
      .scrollIntoView() // Desplazar al elemento al viewport si está oculto
      .focus()
      .click(); // Hacer foco en el elemento
    // Seleccionamos el input del excerpt y escribimos el texto y verificamos que se haya escrito
    cy.get("#custom-excerpt")
      .clear()
      .should("be.visible")
      .type(inputExcerpt)
      .should("have.value", inputExcerpt);
    // Se hace clic en el fondo del menu para que dispare la validacion del excerpt
    cy.get(".settings-menu-header")
      .first()
      .should("exist")
      .click({ force: true });

    // Espera hasta que el elemento span esté visible y espera hasta que el elemento contenga el texto "Excerpt cannot be longer than 300 characters."
    cy.get(".response")
      .first()
      .should(($p) => {
        expect($p.first()).to.contain(
          // Verificar que el elemento contenga el texto
          "Excerpt cannot be longer than 300 characters."
        );
      });
    cy.screenshot(`aleatorio/${timestamp}/scn15`);
  });

  it("16. Crear Post con titulo URL", () => {
    cy.get("#ember28").click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/posts");
    cy.get('a[href*="editor/post"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/editor/post");
    let title = fakerEnglish.internet.url();
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view")
      .type(title)
      .should("exist")
      .should("have.value", title);
    // Damos clic en New para generar un evento de guardado
    cy.get("span.fw4.midgrey-l2 div")
      .should(($div) => {
        const text = $div.text().trim();
        expect(text.includes("New")).to.be.true;
      })
      .click();
    // Verificamos que el estado sea Saving y luego Draft para verificar que se guardo
    cy.get("span.fw4.midgrey-l2 div").should(($div) => {
      expect($div.text().trim()).to.match(/(?:Saving\.\.\.|Draft)\s*/g);
    });
    cy.screenshot(`aleatorio/${timestamp}/scn16`);
  });

  it("17. Crear Page con titulo aleatorio", () => {
    cy.get('a[href*="#/pages/"]').first().click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/pages");
    cy.get('a[href*="#/editor/page"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/editor/page");
    let title = fakerEnglish.string.sample({ min: 300, max: 1000 });
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view")
      .type(title, { parseSpecialCharSequences: false })
      .should("exist")
      .should("have.value", title);
    // Damos clic en New para generar un evento de guardado
    cy.get("span.fw4.midgrey-l2 div")
      .should(($div) => {
        const text = $div.text().trim();
        expect(text.includes("New")).to.be.true;
      })
      .click();
    // Verificamos que el estado sea Saving y luego Draft para verificar que se guardo
    cy.get("span.fw4.midgrey-l2 div").should(($div) => {
      expect($div.text().trim()).to.match(/(?:Saving\.\.\.|Draft|New)\s*/g);
    });
    cy.screenshot(`aleatorio/${timestamp}/scn17`);
  });

  it("18. Crear Page con titulo naughty", () => {
    cy.get('a[href*="#/pages/"]').first().click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/pages");
    cy.get('a[href*="#/editor/page"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/editor/page");
    let title = fakerEnglish.helpers.arrayElement(naughty);
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view")
      .type(title)
      .should("exist")
      .should("have.value", title); // Verificar que el elemento contenga el texto

    // Damos clic en New para generar un evento de guardado
    cy.get("span.fw4.midgrey-l2 div")
      .should(($div) => {
        const text = $div.text().trim();
        expect(text.includes("New")).to.be.true;
      })
      .click();
    // Verificamos que el estado sea Saving y luego Draft para verificar que se guardo
    cy.get("span.fw4.midgrey-l2 div").should(($div) => {
      expect($div.text().trim()).to.match(/(?:Saving\.\.\.|Draft)\s*/g);
    });
    cy.screenshot(`aleatorio/${timestamp}/scn18`);
  });

  it("19. Crear Page con titulo caracteres chinos", () => {
    cy.get('a[href*="#/pages/"]').first().click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/pages");
    cy.get('a[href*="#/editor/page"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/editor/page");
    let title = fakerChinese.string.sample();
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view")
      .type(title)
      .should("exist")
      .should("have.value", title);
    // Damos clic en New para generar un evento de guardado
    cy.get("span.fw4.midgrey-l2 div")
      .should(($div) => {
        const text = $div.text().trim();
        expect(text.includes("New")).to.be.true;
      })
      .click();
    // Verificamos que el estado sea Saving y luego Draft para verificar que se guardo
    cy.get("span.fw4.midgrey-l2 div").should(($div) => {
      expect($div.text().trim()).to.match(/(?:Saving\.\.\.|Draft)\s*/g);
    });
    cy.screenshot(`aleatorio/${timestamp}/scn19`);
  });

  it("20. Crear Page con titulo de mas de 255 caracteres", () => {
    cy.get('a[href*="#/pages/"]').first().click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/pages");
    cy.get('a[href*="#/editor/page"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/editor/page");
    let title = fakerEnglish.string.alphanumeric({
      length: { min: 256, max: 1000 },
    });
    // Escribimos el titulo de mas de 255 caracteres
    cy.get(".gh-editor-title.ember-text-area.gh-input.ember-view")
      .type(title)
      .should("exist")
      .should("have.value", title);
    // Damos clic en New para generar un evento de guardado
    cy.get("span.fw4.midgrey-l2 div")
      .should(($div) => {
        const text = $div.text().trim();
        expect(text.includes("New")).to.be.true;
      })
      .click();
    // Verificamos que el estado sea New indicando que no se guardo
    cy.get("span.fw4.midgrey-l2 div").should(($div) => {
      const text = $div.text().trim();
      expect(text.includes("New")).to.be.true;
    });
    cy.screenshot(`aleatorio/${timestamp}/scn20`);
  });
});
