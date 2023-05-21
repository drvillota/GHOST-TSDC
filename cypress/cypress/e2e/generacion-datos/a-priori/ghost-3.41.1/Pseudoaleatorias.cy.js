const ghostUrl = "http://test.denkitronik.com:2368"; // URL de Ghost 3.41.1
const apiUser = "/users_schema.json"; // API de Mockaroo para generar datos de usuarios de Ghost
const apiPostPage = "/posts_schema.json"; // API de Mockaroo para generar datos de Posts y Pages
const apiTags = "/tags_schema.json"; // API de Mockaroo para generar datos de Posts y Pages
const proxyMockarooUrl = "http://localhost:3000"; // URL del proxy CORS apuntando a Mockaroo
const apiMockarooKey = "?key=af4f0e30"; // API Key de Mockaroo
var dataPool; // Variable para almacenar el pool de datos de las entidades provenientes de Mockaroo (JSON)
var fileName; // Nombre del archivo que contiene los datos de Mockaroo
var loginData; // Variable para almacenar los datos de login y clave válidos
const timestamp = new Date().toISOString().replace(/[:.]/g, "-"); // Genera una marca de tiempo única

/**
 * Pruebas pseudoaleatorias de Ghost 3.41.1 de tipo Login
 */
context("Pruebas a priori de Ghost 3.41.1 de tipo Login", () => {
  // Generar los datos pseudoaleatorios con Mockaroo y guardarlos en un data pool
  before(() => {
    fileName = `data_${timestamp}.json`; // Agrega la marca de tiempo al nombre del archivo

    // Generar los datos pseudoaleatorios con Mockaroo de la entidad User y guardarlos en un data pool
    cy.request("GET", proxyMockarooUrl + apiUser + apiMockarooKey).then(
      (response) => {
        expect(response.status).to.eq(200); // Verificar que la respuesta sea exitosa
        // Acceder a los datos del JSON
        const dataPool = JSON.stringify(response.body); // Convierte la respuesta en string JSON
        cy.writeFile(`cypress/fixtures/data_pool/login/${fileName}`, dataPool); // Guarda los datos en un archivo
        cy.log("Se recibio de Mockaroo: " + dataPool);
      }
    );

    // Leer los datos del data pool de Mockaroo y guardarlos en una variable (jsonData)
    cy.readFile(`cypress/fixtures/data_pool/login/${fileName}`).then(
      (fileContent) => {
        dataPool = fileContent;
        cy.log(fileContent); // Imprimir el contenido del archivo en la consola de Cypress
      }
    );

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
    cy.visit(ghostUrl + "/ghost/#/signin");
  });

  // Escenario 1: Inicio de sesión con datos inválidos - Random email y password
  it("1. Ingresar Random email & password", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length);
    var randomEmail = dataPool[aprioriIndex].email;
    var randomPass = dataPool[aprioriIndex].password;
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
    cy.screenshot(`apriori/${timestamp}/scn1`);
  });

  // Escenario 2: Inicio de sesión con datos inválidos - Valid email y random password
  it("2. Ingresar Valid email & Random password", () => {
    const aprioriIndex = const aprioriIndex = Math.floor(Math.random()*dataPool.length);;
    var validEmail = loginData.email;
    var randomPass = dataPool[aprioriIndex].password;
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
    cy.screenshot(`apriori/${timestamp}/scn2`);
  });

  // Escenario 3: Inicio de sesión con datos inválidos - Random email y naughty password
  it("3. Ingresar Random email & Naughty password", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length);
    var randomEmail = dataPool[aprioriIndex].email;
    var naughtyPass = dataPool[aprioriIndex].naughty_password;
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
    cy.screenshot(`apriori/${timestamp}/scn3`);
  });

  // Escenario 4: Inicio de sesión con datos inválidos - Random email y empty password
  it("4. Ingresar Random email & Empty password", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length);
    var randomEmail = dataPool[aprioriIndex].email;
    cy.log(
      "Usaremos el email " + randomEmail + " y la contraseña vacia (empty)"
    );
    cy.get('input[name="identification"]').type(randomEmail, { force: true });
    cy.get('button[type="submit"]').click();
    // Verificar que se muestre el mensaje de error
    cy.get("p.main-error") // Selecciona el elemento <p> con la clase "main-error"
      .contains("Please fill out the form to sign in.") // Verifica que contenga el texto "Please fill out the form to sign in."
      .should("be.visible"); // Verifica que el elemento sea visible en la página
    cy.screenshot(`apriori/${timestamp}/scn4`);
  });

  // Escenario 5: Inicio de sesión con datos inválidos - Empty email y random password
  it("5. Ingresar Empty email & random password", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length);
    var randomPass = dataPool[aprioriIndex].password;
    cy.log("Usaremos el email vacio (empty) y la contraseña " + randomPass);
    cy.get('input[name="password"]').type(randomPass, { force: true });
    cy.get('button[type="submit"]').click();
    // Verificar que se muestre el mensaje de error
    cy.get("p.main-error") // Selecciona el elemento <p> con la clase "main-error"
      .contains("Please fill out the form to sign in.") // Verifica que contenga el texto "Please fill out the form to sign in."
      .should("be.visible"); // Verifica que el elemento sea visible en la página
    cy.screenshot(`apriori/${timestamp}/scn5`);
  });

  // Escenario 6: Inicio de sesión con datos inválidos - Valid email & invalid kanji password
  it("6. Ingresar Valid email & invalid kanji password", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length);
    var validEmail = loginData.email;
    var randomPass = dataPool[aprioriIndex].kanji;
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
    cy.screenshot(`apriori/${timestamp}/scn6`);
  });

  // Escenario 7: Inicio de sesión con datos inválidos - Naughty email & random password
  it("7. Ingresar Naughty email & random password", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length);
    var naughtyEmail = dataPool[aprioriIndex].naughty_email;
    var randomPass = dataPool[aprioriIndex].password;
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
    cy.screenshot(`apriori/${timestamp}/scn7`);
  });

  // Escenario 8: Inicio de sesión con datos inválidos - Empty email & Naughty password
  it("8. Ingresar Empty email & Naughty password", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length);
    var naughtyPass = dataPool[aprioriIndex].naughty_password;
    cy.log("Usaremos el email vacio (empty) y la contraseña " + naughtyPass);
    cy.get('input[name="password"]').type(naughtyPass, { force: true });
    cy.get('button[type="submit"]').click();
    // Verificar que se muestre el mensaje de error
    cy.get("p.main-error") // Selecciona el elemento <p> con la clase "main-error"
      .contains("Please fill out the form to sign in.") // Verifica que contenga el texto "Please fill out the form to sign in."
      .should("be.visible"); // Verifica que el elemento sea visible en la página
    cy.screenshot(`apriori/${timestamp}/scn8`);
  });

  // Escenario 9: Inicio de sesión con datos inválidos - Valid email & Naughty password
  it("9. Ingresar Valid email & Naughty password", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length);
    var naughtyPass = dataPool[aprioriIndex].naughty_password;
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
    cy.screenshot(`apriori/${timestamp}/scn9`);
  });

  // Escenario 10: Inicio de sesión con datos inválidos - Naughty email & Valid password
  it("10. Ingresar Naughty email & Valid password", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length);
    var naughtyEmail = dataPool[aprioriIndex].naughty_email;
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
    cy.screenshot(`apriori/${timestamp}/scn10`);
  });
});

/**
 * Pruebas a priori de Ghost 3.41.1 de Posts y Pages
 */
context("Pruebas a priori de Ghost 3.41.1 de Posts y Pages", () => {
  // Generar los datos pseudoaleatorios con Mockaroo y guardarlos en un data pool
  before(() => {
    fileName = `data_${timestamp}.json`; // Agrega la marca de tiempo al nombre del archivo

    // Generar los datos pseudoaleatorios con Mockaroo de entidades Post y Page y guardarlos en un data pool
    cy.request("GET", proxyMockarooUrl + apiPostPage + apiMockarooKey).then(
      (response) => {
        expect(response.status).to.eq(200); // Verificar que la respuesta sea exitosa
        // Acceder a los datos del JSON
        const dataPool = JSON.stringify(response.body); // Convierte la respuesta en string JSON
        cy.writeFile(
          `cypress/fixtures/data_pool/posts-pages/${fileName}`,
          dataPool
        ); // Guarda los datos en un archivo
        cy.log("Se recibio de Mockaroo: " + dataPool);
      }
    );

    // Leer los datos del data pool de Mockaroo y guardarlos en una variable (jsonData)
    cy.readFile(`cypress/fixtures/data_pool/posts-pages/${fileName}`).then(
      (fileContent) => {
        dataPool = fileContent;
        cy.log(fileContent); // Imprimir el contenido del archivo en la consola de Cypress
      }
    );

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

  // Escenario 11: Crear Post con titulo aleatorio
  it("11. Crear Post con titulo aleatorio", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length); // Indice del data pool a utilizar
    cy.get("#ember28").click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/posts");
    cy.get('a[href*="editor/post"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/editor/post");
    let title = dataPool[aprioriIndex].title;
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
    cy.screenshot(`apriori/${timestamp}/scn11`);
  });

  // Escenario 12: Crear Post con titulo naughty
  it("12. Crear Post con titulo naughty", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length); // Indice del data pool a utilizar
    cy.get("#ember28").click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/posts");
    cy.get('a[href*="editor/post"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/editor/post");
    let title = dataPool[aprioriIndex].naughty_title;
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
    cy.screenshot(`apriori/${timestamp}/scn12`);
  });

  // Escenario 13: Crear Post con titulo caracteres chinos
  it("13. Crear Post con titulo caracteres chinos", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length); // Indice del data pool a utilizar
    cy.get("#ember28").click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/posts");
    cy.get('a[href*="editor/post"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/editor/post");
    let title = dataPool[aprioriIndex].chinese_title;
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
    cy.screenshot(`apriori/${timestamp}/scn13`);
  });

  // Escenario 14: Crear Post con titulo de mas de 255 caracteres
  it("14. Crear Post con titulo de mas de 255 caracteres", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length); // Indice del data pool a utilizar
    cy.get("#ember28").click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/posts");
    cy.get('a[href*="editor/post"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/editor/post");
    let title = dataPool[aprioriIndex].long_title;
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
    cy.screenshot(`apriori/${timestamp}/scn14`);
  });

  // Escenario 15: Crear Post con excerpt mayor a 300 caracteres
  it("15. Crear Post con excerpt mayor a 300 caracteres", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length); // Indice del data pool a utilizar
    let inputExcerpt = dataPool[aprioriIndex].long_excerpt;
    let title = dataPool[aprioriIndex].title;
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
      .type(dataPool[aprioriIndex].long_excerpt)
      .should("have.value", dataPool[aprioriIndex].long_excerpt);
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
    cy.screenshot(`apriori/${timestamp}/scn15`);
  });

  // Escenario 16: Crear Post con titulo URL
  it("16. Crear Post con titulo URL", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length);// Indice del data pool a utilizar
    cy.get("#ember28").click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/posts");
    cy.get('a[href*="editor/post"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/editor/post");
    let title = dataPool[aprioriIndex].url_title;
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
    cy.screenshot(`apriori/${timestamp}/scn16`);
  });

  // Escenario 17: Crear Page con titulo aleatorio
  it("17. Crear Page con titulo aleatorio", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length); // Indice del data pool a utilizar
    cy.get('a[href*="#/pages/"]').first().click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/pages");
    cy.get('a[href*="#/editor/page"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/editor/page");
    let title = dataPool[aprioriIndex].random_title;
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
    cy.screenshot(`apriori/${timestamp}/scn17`);
  });

  // Escenario 18: Crear Page con titulo naughty
  it("18. Crear Page con titulo naughty", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length);// Indice del data pool a utilizar
    cy.get('a[href*="#/pages/"]').first().click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/pages");
    cy.get('a[href*="#/editor/page"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/editor/page");
    let title = dataPool[aprioriIndex].naughty_title;
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
    cy.screenshot(`apriori/${timestamp}/scn18`);
  });

  // Escenario 19: Crear Page con titulo caracteres chinos
  it("19. Crear Page con titulo caracteres chinos", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length); // Indice del data pool a utilizar
    cy.get('a[href*="#/pages/"]').first().click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/pages");
    cy.get('a[href*="#/editor/page"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/editor/page");
    let title = dataPool[aprioriIndex].chinese_title;
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
    cy.screenshot(`apriori/${timestamp}/scn19`);
  });

  // Escenario 20: Crear Page con titulo de mas de 255 caracteres
  it("20. Crear Page con titulo de mas de 255 caracteres", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length); // Indice del data pool a utilizar
    cy.get('a[href*="#/pages/"]').first().click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/pages");
    cy.get('a[href*="#/editor/page"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/editor/page");
    let title = dataPool[aprioriIndex].long_title;
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
    cy.screenshot(`apriori/${timestamp}/scn20`);
  });

  // Escenario 21: Crear Page con excerpt mayor a 300 caracteres
  it("21. Crear Page con excerpt mayor a 300 caracteres", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length); // Indice del data pool a utilizar
    let inputExcerpt = dataPool[aprioriIndex].long_excerpt;
    let title = dataPool[aprioriIndex].title;
    // Ingresamos al menu de Pages
    cy.get('a[href*="#/pages/"]').first().click();
    // Verificamos que la url sea la correcta
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/pages");
    cy.get('a[href*="#/editor/page"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/editor/page");
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
      .type(dataPool[aprioriIndex].long_excerpt)
      .should("have.value", dataPool[aprioriIndex].long_excerpt);
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
    cy.screenshot(`apriori/${timestamp}/scn21`);
  });

  // Escenario 22: Crear Page con titulo URL
  it("22. Crear Page con titulo URL", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length);// Indice del data pool a utilizar
    cy.get('a[href*="#/pages/"]').first().click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/pages");
    cy.get('a[href*="#/editor/page"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/editor/page");
    let title = dataPool[aprioriIndex].url_title;
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
    cy.screenshot(`apriori/${timestamp}/scn22`);
  });
});

/**
 * Pruebas a priori de Ghost 3.41.1 de Posts y Pages
 */
context("Pruebas a priori de Ghost 3.41.1 de Tags", () => {
  // Generar los datos pseudoaleatorios con Mockaroo y guardarlos en un data pool
  before(() => {
    fileName = `data_${timestamp}.json`; // Agrega la marca de tiempo al nombre del archivo

    // Generar los datos pseudoaleatorios con Mockaroo de entidades Post y Page y guardarlos en un data pool
    cy.request("GET", proxyMockarooUrl + apiTags + apiMockarooKey).then(
      (response) => {
        expect(response.status).to.eq(200); // Verificar que la respuesta sea exitosa
        // Acceder a los datos del JSON
        const dataPool = JSON.stringify(response.body); // Convierte la respuesta en string JSON
        cy.writeFile(`cypress/fixtures/data_pool/tags/${fileName}`, dataPool); // Guarda los datos en un archivo
        cy.log("Se recibio de Mockaroo: " + dataPool);
      }
    );

    // Leer los datos del data pool de Mockaroo y guardarlos en una variable (jsonData)
    cy.readFile(`cypress/fixtures/data_pool/tags/${fileName}`).then(
      (fileContent) => {
        dataPool = fileContent;
        cy.log(fileContent); // Imprimir el contenido del archivo en la consola de Cypress
      }
    );

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

  // Escenario 23: Crear Tag con nombre aleatorio
  it("23. Crear Tag name aleatorio", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length); // Indice del data pool a utilizar
    cy.get('a[href*="#/tags/"]').first().click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/tags");
    cy.get('a[href*="#/tags/new"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/tags/new");
    let name = dataPool[aprioriIndex].random_name;
    let slug = dataPool[aprioriIndex].slug;
    let description = dataPool[aprioriIndex].description;
    cy.get('input[name="name"]')
      .type(name)
      .should("exist")
      .should("have.value", name);
    cy.get('input[name="slug"]')
      .should("exist") // Verificar que el elemento exista en el DOM
      .should("be.visible")
      .scrollIntoView() // Desplazar al elemento al viewport si está oculto
      .type("{selectall}{backspace}")
      .type(slug, { force: true })
      .should("exist")
      .should("have.value", slug);
    cy.wait(2000);
    cy.get('textarea[name="description"]')
      .type(description)
      .should("exist")
      .should("have.value", description);
    // Damos clic en New para generar un evento de guardado
    cy.get("button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view").first().click();
    cy.get("button.gh-btn.gh-btn-red.gh-btn-icon.mb15").should("exist");

    cy.screenshot(`apriori/${timestamp}/scn23`);
  });

  // Escenario 24: Crear Tag con nombre naughty
  it("24. Crear Tag con name naughty", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length); // Indice del data pool a utilizar
    cy.get('a[href*="#/tags/"]').first().click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/tags");
    cy.get('a[href*="#/tags/new"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/tags/new");
    let name = dataPool[aprioriIndex].naughty_name;
    let slug = dataPool[aprioriIndex].slug;
    let description = dataPool[aprioriIndex].description;
    cy.get('input[name="name"]')
      .type(name)
      .should("exist")
      .should("have.value", name);
    cy.get('input[name="slug"]')
      .should("exist") // Verificar que el elemento exista en el DOM
      .should("be.visible")
      .scrollIntoView() // Desplazar al elemento al viewport si está oculto
      .type("{selectall}{backspace}")
      .type(slug, { force: true })
      .should("exist")
      .should("have.value", slug);
    cy.wait(2000);
    cy.get('textarea[name="description"]')
      .type(description)
      .should("exist")
      .should("have.value", description);
    // Damos clic en New para generar un evento de guardado
    cy.get("button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view").first().click();
    cy.get("button.gh-btn.gh-btn-red.gh-btn-icon.mb15").should("exist");

    cy.screenshot(`apriori/${timestamp}/scn24`);
  });

  // 25. Crear Tag con name valido
  it("25. Crear Tag con name valido", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length);// Indice del data pool a utilizar
    cy.get('a[href*="#/tags/"]').first().click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/tags");
    cy.get('a[href*="#/tags/new"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/tags/new");
    let name = dataPool[aprioriIndex].name;
    let slug = dataPool[aprioriIndex].slug;
    let description = dataPool[aprioriIndex].description;
    cy.get('input[name="name"]')
      .type(name)
      .should("exist")
      .should("have.value", name);
    cy.get('input[name="slug"]')
      .should("exist") // Verificar que el elemento exista en el DOM
      .should("be.visible")
      .scrollIntoView() // Desplazar al elemento al viewport si está oculto
      .type("{selectall}{backspace}")
      .type(slug, { force: true })
      .should("exist")
      .should("have.value", slug);
    cy.wait(2000);
    cy.get('textarea[name="description"]')
      .type(description)
      .should("exist")
      .should("have.value", description);
    // Damos clic en New para generar un evento de guardado
    cy.get("button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view").first().click();
    cy.get("button.gh-btn.gh-btn-red.gh-btn-icon.mb15").should("exist");

    cy.screenshot(`apriori/${timestamp}/scn25`);
  });

  // 26. Crear Tag con name con formato URL
  it("26. Crear Tag con name URL", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length); // Indice del data pool a utilizar
    cy.get('a[href*="#/tags/"]').first().click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/tags");
    cy.get('a[href*="#/tags/new"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/tags/new");
    let name = dataPool[aprioriIndex].url_as_name;
    let slug = dataPool[aprioriIndex].slug;
    let description = dataPool[aprioriIndex].description;
    cy.get('input[name="name"]')
      .type(name)
      .should("exist")
      .should("have.value", name);
    cy.get('input[name="slug"]')
      .should("exist") // Verificar que el elemento exista en el DOM
      .should("be.visible")
      .scrollIntoView() // Desplazar al elemento al viewport si está oculto
      .type("{selectall}{backspace}")
      .type(slug, { force: true })
      .should("exist")
      .should("have.value", slug);
    cy.wait(2000);
    cy.get('textarea[name="description"]')
      .type(description)
      .should("exist")
      .should("have.value", description);
    // Damos clic en New para generar un evento de guardado
    cy.get("button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view").first().click();
    cy.get("button.gh-btn.gh-btn-red.gh-btn-icon.mb15").should("exist");

    cy.screenshot(`apriori/${timestamp}/scn26`);
  });

  // 27. Crear Tag con name con formato de correo
  it("27. Crear Tag con name email", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length); // Indice del data pool a utilizar
    cy.get('a[href*="#/tags/"]').first().click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/tags");
    cy.get('a[href*="#/tags/new"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/tags/new");
    let name = dataPool[aprioriIndex].email_as_name;
    let slug = dataPool[aprioriIndex].slug;
    let description = dataPool[aprioriIndex].description;
    cy.get('input[name="name"]')
      .type(name)
      .should("exist")
      .should("have.value", name);
    cy.get('input[name="slug"]')
      .should("exist") // Verificar que el elemento exista en el DOM
      .should("be.visible")
      .scrollIntoView() // Desplazar al elemento al viewport si está oculto
      .type("{selectall}{backspace}")
      .type(slug, { force: true })
      .should("exist")
      .should("have.value", slug);
    cy.wait(2000);
    cy.get('textarea[name="description"]')
      .type(description)
      .should("exist")
      .should("have.value", description);
    // Damos clic en New para generar un evento de guardado
    cy.get("button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view").first().click();
    cy.get("button.gh-btn.gh-btn-red.gh-btn-icon.mb15").should("exist");

    cy.screenshot(`apriori/${timestamp}/scn27`);
  });

  // 28. Crear Tag con name con formato de fecha
  it("28. Crear Tag con name Date", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length); // Indice del data pool a utilizar
    cy.get('a[href*="#/tags/"]').first().click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/tags");
    cy.get('a[href*="#/tags/new"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/tags/new");
    let name = dataPool[aprioriIndex].date_as_name;
    let slug = dataPool[aprioriIndex].slug;
    let description = dataPool[aprioriIndex].description;
    cy.get('input[name="name"]')
      .type(name)
      .should("exist")
      .should("have.value", name);
    cy.get('input[name="slug"]')
      .should("exist") // Verificar que el elemento exista en el DOM
      .should("be.visible")
      .scrollIntoView() // Desplazar al elemento al viewport si está oculto
      .type("{selectall}{backspace}")
      .type(slug, { force: true })
      .should("exist")
      .should("have.value", slug);
    cy.wait(2000);
    cy.get('textarea[name="description"]')
      .type(description)
      .should("exist")
      .should("have.value", description);
    // Damos clic en New para generar un evento de guardado
    cy.get("button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view").first().click();
    cy.get("button.gh-btn.gh-btn-red.gh-btn-icon.mb15").should("exist");

    cy.screenshot(`apriori/${timestamp}/scn28`);
  });

  // 29. Crear Tag con texto mayor a 191 caracteres
  it("29. Crear Tag con texto mayor a 191 caracteres", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length); // Indice del data pool a utilizar
    cy.get('a[href*="#/tags/"]').first().click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/tags");
    cy.get('a[href*="#/tags/new"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/tags/new");
    let name = dataPool[aprioriIndex].long_name;
    let slug = dataPool[aprioriIndex].slug;
    let description = dataPool[aprioriIndex].description;
    cy.get('input[name="name"]')
      .type(name)
      .should("exist")
      .should("have.value", name);
    cy.get('input[name="slug"]')
      .should("exist") // Verificar que el elemento exista en el DOM
      .should("be.visible")
      .scrollIntoView() // Desplazar al elemento al viewport si está oculto
      .type("{selectall}{backspace}")
      .type(slug, { force: true })
      .should("exist")
      .should("have.value", slug);
    cy.wait(2000);
    cy.get('textarea[name="description"]')
      .type(description)
      .should("exist")
      .should("have.value", description);
    // Damos clic en New para generar un evento de guardado
    cy.get("button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view").first().click();
    cy.get(".response")
      .first()
      .should(($p) => {
        expect($p.first()).to.contain(
          // Verificar que el elemento contenga el texto
          "Tag names cannot be longer than 191 characters."
        );
      });
    cy.screenshot(`apriori/${timestamp}/scn29`);
  });

  // 30. Crear Tag con name valido y Description mayor a 500 caracteres
  it("30. Crear Tag con name valido y Description mayor a 500 caracteres", () => {
    const aprioriIndex = Math.floor(Math.random()*dataPool.length); // Indice del data pool a utilizar
    cy.get('a[href*="#/tags/"]').first().click();
    cy.url()
      .should("exist")
      .should("eq", ghostUrl + "/ghost/#/tags");
    cy.get('a[href*="#/tags/new"]').first().click();
    cy.url().should("eq", ghostUrl + "/ghost/#/tags/new");
    let name = dataPool[aprioriIndex].name;
    let slug = dataPool[aprioriIndex].slug;
    let description = dataPool[aprioriIndex].long_description;
    cy.get('input[name="name"]')
      .type(name)
      .should("exist")
      .should("have.value", name);
    cy.get('input[name="slug"]')
      .should("exist") // Verificar que el elemento exista en el DOM
      .should("be.visible")
      .scrollIntoView() // Desplazar al elemento al viewport si está oculto
      .type("{selectall}{backspace}")
      .type(slug, { force: true })
      .should("exist")
      .should("have.value", slug);
    cy.wait(2000);
    cy.get('textarea[name="description"]')
      .type(description)
      .should("exist")
      .should("have.value", description);
    // Damos clic en New para generar un evento de guardado
    cy.get("button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view").first().click();
    cy.contains(
      "div p.response",
      "Description cannot be longer than 500 characters."
    ).click();

    cy.screenshot(`apriori/${timestamp}/scn30`);
  });
});