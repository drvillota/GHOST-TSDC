const ghostUrl = "http://test.denkitronik.com:2368"; // URL de Ghost 3.41.1
const apiUser = "/users_schema.json"; // API de Mockaroo para generar datos de usuarios de Ghost
const apiPostPage = "/posts_schema.json"; // API de Mockaroo para generar datos de Posts y Pages
const proxyMockarooUrl = "http://localhost:3000"; // URL del proxy CORS apuntando a Mockaroo
const apiMockarooKey = "?key=af4f0e30"; // API Key de Mockaroo
var dataPool; // Variable para almacenar el pool de datos de las entidades provenientes de Mockaroo (JSON)
var fileName; // Nombre del archivo que contiene los datos de Mockaroo
var loginData; // Variable para almacenar los datos de login y clave válidos
const timestamp = new Date().toISOString().replace(/[:.]/g, "-"); // Genera una marca de tiempo única

/**
 * Pruebas a priori de Ghost 3.41.1 de Tags y Staff
 */
context("Pruebas a priori de Ghost 3.41.1 de Tags y Staff", () => {
  // Generar los datos apriori con Mockaroo y guardarlos en un data pool
  before(() => {
    fileName = `data_${timestamp}.json`; // Agrega la marca de tiempo al nombre del archivo

    // Generar los datos apriori con Mockaroo de entidades Post y Page y guardarlos en un data pool
    cy.request("GET", proxyMockarooUrl + apiPostPage + apiMockarooKey).then(
      (response) => {
        expect(response.status).to.eq(200); // Verificar que la respuesta sea exitosa
        // Acceder a los datos del JSON
        const dataPool = JSON.stringify(response.body); // Convierte la respuesta en string JSON
        cy.writeFile(
          `cypress/fixtures/data_pool/Tags-Staff/${fileName}`,
          dataPool
        ); // Guarda los datos en un archivo
        cy.log("Se recibio de Mockaroo: " + dataPool);
      }
    );

    // Leer los datos del data pool de Mockaroo y guardarlos en una variable (jsonData)
    cy.readFile(`cypress/fixtures/data_pool/Tags-Staff/${fileName}`).then(
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

  it("31. Crear Tag con name valido y Description naughty", () => {
    const aprioriIndex = 31; // Indice del data pool a utilizar
    cy.get("a[href='#/tags/']").click();
    cy.get("a[href='#/tags/new/']").click();
    cy.wait(1000);
    let name = dataPool[aprioriIndex].title;
    cy.get("#tag-name").type(name);
    let description = dataPool[aprioriIndex].naughty_title;
    cy.get("#tag-description").type(description);

    // Guardamos los cambios del nuevo tag
    cy.get("[class='gh-btn gh-btn-blue gh-btn-icon ember-view']")
      .children("span")
      .click();

    cy.wait(1000);

    // Verificamos que el estado sea Save y Saved para verificar que se guardo
    cy.get("[class='gh-btn gh-btn-blue gh-btn-icon ember-view']")
      .children("span")
      .should(($span) => {
        expect($span.text().trim()).to.match(/(?:Save|\"Saved\")\s*/g);
      });
    cy.screenshot(`apriori/${timestamp}/scn31`);
  });

  it("32. Crear Tag con Slug naughty", () => {
    const aprioriIndex = 32; // Indice del data pool a utilizar
    cy.get("a[href='#/tags/']").click();
    cy.get("a[href='#/tags/new/']").click();
    let name = dataPool[aprioriIndex].title;
    cy.get("#tag-name").type(name);
    let slug = dataPool[aprioriIndex].naughty_title;
    cy.get("#tag-slug").type(slug);
    let description = dataPool[aprioriIndex].type;
    cy.get("#tag-description").type(description);

    // Guardamos los cambios del nuevo tag
    cy.get("[class='gh-btn gh-btn-blue gh-btn-icon ember-view']")
      .children("span")
      .click();

    cy.wait(1000);

    // Verificamos que el estado sea Save y Saved para verificar que se guardo
    cy.get("[class='gh-btn gh-btn-blue gh-btn-icon ember-view']")
      .children("span")
      .should(($span) => {
        expect($span.text().trim()).to.match(/(?:Save|\"Saved\")\s*/g);
      });
    cy.screenshot(`apriori/${timestamp}/scn32`);
  });

  it("33. Crear Tag con Slug texto con espacios", () => {
    const aprioriIndex = 33; // Indice del data pool a utilizar
    cy.get("a[href='#/tags/']").click();
    cy.get("a[href='#/tags/new/']").click();
    let name = dataPool[aprioriIndex].title;
    cy.get("#tag-name").type(name);
    let slug = dataPool[aprioriIndex].title;
    cy.get("#tag-slug").type(slug);
    let description = dataPool[aprioriIndex].type;
    cy.get("#tag-description").type(description);

    // Guardamos los cambios del nuevo tag
    cy.get("[class='gh-btn gh-btn-blue gh-btn-icon ember-view']")
      .children("span")
      .click();

    cy.wait(1000);

    // Verificamos que el estado sea Save y Saved para verificar que se guardo
    cy.get("[class='gh-btn gh-btn-blue gh-btn-icon ember-view']")
      .children("span")
      .should(($span) => {
        expect($span.text().trim()).to.match(/(?:Save|\"Saved\")\s*/g);
      });
    cy.screenshot(`apriori/${timestamp}/scn33`);
  });

  it("34. Crear Tag con Slug extenso", () => {
    const aprioriIndex = 34; // Indice del data pool a utilizar
    cy.get("a[href='#/tags/']").click();
    cy.get("a[href='#/tags/new/']").click();
    let name = dataPool[aprioriIndex].title;
    cy.get("#tag-name").type(name);
    let slug = dataPool[aprioriIndex].long_title;
    cy.get("#tag-slug").type(slug);
    let description = dataPool[aprioriIndex].type;
    cy.get("#tag-description").type(description);

    // Guardamos los cambios del nuevo tag
    cy.get("[class='gh-btn gh-btn-blue gh-btn-icon ember-view']")
      .children("span")
      .click();

    cy.wait(1000);

    // Verificamos que el estado sea Save y Saved para verificar que se guardo
    cy.get("[class='gh-btn gh-btn-blue gh-btn-icon ember-view']")
      .children("span")
      .should(($span) => {
        expect($span.text().trim()).to.match(/(?:Save|\"Saved\")\s*/g);
      });
    cy.screenshot(`apriori/${timestamp}/scn34`);
  });

  it("35. Crear Tag con Slug valido", () => {
    const aprioriIndex = 35; // Indice del data pool a utilizar
    cy.get("a[href='#/tags/']").click();
    cy.get("a[href='#/tags/new/']").click();
    let name = dataPool[aprioriIndex].title;
    cy.get("#tag-name").type(name);
    let description = dataPool[aprioriIndex].type;
    cy.get("#tag-description").type(description);

    // Guardamos los cambios del nuevo tag
    cy.get("[class='gh-btn gh-btn-blue gh-btn-icon ember-view']")
      .children("span")
      .click();

    cy.wait(1000);

    // Verificamos que el estado sea Save y Saved para verificar que se guardo
    cy.get("[class='gh-btn gh-btn-blue gh-btn-icon ember-view']")
      .children("span")
      .should(($span) => {
        expect($span.text().trim()).to.match(/(?:Save|\"Saved\")\s*/g);
      });
    cy.screenshot(`apriori/${timestamp}/scn35`);
  });

  it("36. Crear Staff user con email aleatorio valido", () => {
    const aprioriIndex = 36; // Indice del data pool a utilizar
    cy.get("a[href='#/staff/']").click();
    cy.get("span").contains("Invite people").click();
    let email = dataPool[aprioriIndex].email;
    cy.get("#new-user-email").type(email);

    // Guardamos los cambios del nuevo staff user
    cy.get("[class='gh-btn gh-btn-green gh-btn-icon ember-view']").click();

    cy.visit(ghostUrl + "/ghost/#/signin");
    cy.wait(2000);

    cy.wait(1000);
    // Verificamos que el staff user se haya agregado
    cy.get("article.apps-card-app")
      .children("div.apps-card-left")
      .children("div.apps-card-meta")
      .children("h3")
      .should(($h3) => {
        expect($h3).to.contain(email);
      });
    cy.screenshot(`apriori/${timestamp}/scn36`);
  });

  it("37. Crear Staff user con email naughty", () => {
    const aprioriIndex = 37; // Indice del data pool a utilizar
    cy.get("a[href='#/staff/']").click();
    cy.get("span").contains("Invite people").click();
    let email = dataPool[aprioriIndex].naughty_title;
    cy.get("#new-user-email").type(email);

    // Guardamos los cambios del nuevo staff user
    cy.get("span").contains("Send invitation now").click();

    cy.wait(1000);
    // Verificamos que el staff user se haya agregado
    cy.get("p.response").should(($p) => {
      expect($p).to.contain("Invalid Email.");
    });
    cy.screenshot(`apriori/${timestamp}/scn37`);
  });

  it("38. Crear Staff user con email extenso", () => {
    const aprioriIndex = 38; // Indice del data pool a utilizar
    cy.get("a[href='#/staff/']").click();
    cy.get("span").contains("Invite people").click();
    let email = dataPool[aprioriIndex].long_title;
    cy.get("#new-user-email").type(email + "@gmail.com");

    // Guardamos los cambios del nuevo staff user
    cy.get("span").contains("Send invitation now").click();

    cy.wait(1000);
    // Verificamos que el staff user se haya agregado
    cy.get("p.response").should(($p) => {
      expect($p).to.contain("Invalid Email.");
    });
    cy.screenshot(`apriori/${timestamp}/scn38`);
  });

  it("39. Crear Staff user con email duplicado", () => {
    const aprioriIndex = 39; // Indice del data pool a utilizar
    cy.get("a[href='#/staff/']").click();
    cy.get("span").contains("Invite people").click();
    let email = dataPool[aprioriIndex].email;
    cy.get("#new-user-email").type(email);

    // Guardamos los cambios del nuevo staff user
    cy.get("span").contains("Send invitation now").click();

    cy.visit(ghostUrl + "/ghost/#/signin");
    cy.wait(2000);

    // Creamos un staff user con los datos anteriores
    cy.get("span").contains("Invite people").click();
    cy.get("#new-user-email").type(email);

    // Guardamos los cambios del nuevo staff user
    cy.get("span").contains("Send invitation now").click();

    cy.wait(1000);
    // Verificamos que el staff user se haya agregado
    cy.get("p.response").should(($p) => {
      expect($p).to.contain(
        "A user with that email address was already invited."
      );
    });
    cy.screenshot(`apriori/${timestamp}/scn39`);
  });

  it("40. Crear Staff user con email URL", () => {
    const aprioriIndex = 40; // Indice del data pool a utilizar
    cy.get("a[href='#/staff/']").click();
    cy.get("span").contains("Invite people").click();
    let email = dataPool[aprioriIndex].url_title;
    cy.get("#new-user-email").type(email + "@gmail.com");

    // Guardamos los cambios del nuevo staff user
    cy.get("span").contains("Send invitation now").click();

    cy.wait(1000);
    // Verificamos que el staff user se haya agregado
    cy.get("p.response").should(($p) => {
      expect($p).to.contain("Invalid Email.");
    });
    cy.screenshot(`apriori/${timestamp}/scn40`);
  });
});
