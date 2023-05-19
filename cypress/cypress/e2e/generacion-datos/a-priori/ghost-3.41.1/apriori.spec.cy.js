const ghostUrl = "http://test.denkitronik.com:2368"; // URL de Ghost 3.41.1
const apiEmailInvalidPass = "/email_invalid_pass.json?key="; // API de Mockaroo para generar datos de correo y contraseña inválidos
const proxyMockarooUrl = "http://localhost:3000"; // URL del proxy CORS apuntando a Mockaroo
const apiMockarooKey = "af4f0e30"; // API Key de Mockaroo
var jsonData; // Variable para almacenar los datos de Mockaroo (JSON)
var fileName; // Nombre del archivo que contiene los datos de Mockaroo
var loginData;// Variable para almacenar los datos de login y clave válidos
const timestamp = new Date().toISOString().replace(/[:.]/g, "-"); // Genera una marca de tiempo única

// Inicio de sesión con datos inválidos (contraseña)
context("Pruebas a priori de Ghost 3.41.1", () => {
  // Generar los datos apriori con Mockaroo y guardarlos en un data pool
  before(() => {
    
    fileName = `data_${timestamp}.json`; // Agrega la marca de tiempo al nombre del archivo

    // Generar los datos apriori con Mockaroo y guardarlos en un data pool
    cy.request(
      "GET",
      proxyMockarooUrl + apiEmailInvalidPass + apiMockarooKey
    ).then((response) => {
      expect(response.status).to.eq(200); // Verificar que la respuesta sea exitosa
      // Acceder a los datos del JSON
      const dataPool = JSON.stringify(response.body); // Convierte los datos JSON en una cadena
      cy.writeFile(`cypress/fixtures/data_pool/${fileName}`, dataPool); // Guarda los datos en un archivo
      cy.log("Se recibio de Mockaroo: " + dataPool);
    });

    // Leer los datos del data pool de Mockaroo y guardarlos en una variable (jsonData)
    cy.readFile(`cypress/fixtures/data_pool/${fileName}`).then(
      (fileContent) => {
        jsonData = fileContent;
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
    const aprioriIndex = 1;
    var randomEmail = jsonData[aprioriIndex].email;
    var randomPass = jsonData[aprioriIndex].password;
    cy.log(
      "Usaremos el email " + randomEmail + " y la contraseña " + randomPass
    );
    cy.get("#ember8").type(randomEmail, { force: true });
    cy.get("#ember10").type(randomPass, { force: true });
    cy.get("#ember12").click();
    // Verificar que se muestre el mensaje de error
    cy.get("p.main-error") // Selecciona el elemento <p> con la clase "main-error"
      .contains("There is no user with that email address.") // Verifica que contenga el texto "Unknown error"
      .should("be.visible"); // Verifica que el elemento sea visible en la página
    cy.screenshot(`apriori/${timestamp}/scn1`);
  });

  // Escenario 2: Inicio de sesión con datos inválidos - Valid email y random password
  it("2. Ingresar Valid email & Random password", () => {
    const aprioriIndex = 2;
    var validEmail = loginData.email;
    var randomPass = jsonData[aprioriIndex].password;
    cy.log(
      "Usaremos el email " + validEmail + " y la contraseña " + randomPass
    );
    cy.get("#ember8").type(validEmail, { force: true });
    cy.get("#ember10").type(randomPass, { force: true });
    cy.get("#ember12").click();
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
    const aprioriIndex = 3;
    var randomEmail = jsonData[aprioriIndex].email;
    var naughtyPass = jsonData[aprioriIndex].naughty_password;
    cy.log(
      "Usaremos el email " + randomEmail + " y la contraseña " + naughtyPass
    );
    cy.get("#ember8").type(randomEmail, { force: true });
    cy.get("#ember10").type(naughtyPass, { force: true });
    cy.get("#ember12").click();
    // Verificar que se muestre el mensaje de error
    cy.get("p.main-error") // Selecciona el elemento <p> con la clase "main-error"
      .contains("There is no user with that email address.") // Verifica que contenga el texto "Unknown error"
      .should("be.visible"); // Verifica que el elemento sea visible en la página
    cy.screenshot(`apriori/${timestamp}/scn3`);
  });

  // Escenario 4: Inicio de sesión con datos inválidos - Random email y empty password
  it("4. Ingresar Random email & Empty password", () => {
    const aprioriIndex = 4;
    var randomEmail = jsonData[aprioriIndex].email;
    cy.log(
      "Usaremos el email " + randomEmail + " y la contraseña vacia (empty)"
    );
    cy.get("#ember8").type(randomEmail, { force: true });
    cy.get("#ember12").click();
    // Verificar que se muestre el mensaje de error
    cy.get("p.main-error") // Selecciona el elemento <p> con la clase "main-error"
      .contains("Please fill out the form to sign in.") // Verifica que contenga el texto "Please fill out the form to sign in."
      .should("be.visible"); // Verifica que el elemento sea visible en la página
    cy.screenshot(`apriori/${timestamp}/scn4`);
  });

  // Escenario 5: Inicio de sesión con datos inválidos - Empty email y random password
  it("5. Ingresar Empty email & random password", () => {
    const aprioriIndex = 5;
    var randomPass = jsonData[aprioriIndex].password;
    cy.log("Usaremos el email vacio (empty) y la contraseña " + randomPass);
    cy.get("#ember10").type(randomPass, { force: true });
    cy.get("#ember12").click();
    // Verificar que se muestre el mensaje de error
    cy.get("p.main-error") // Selecciona el elemento <p> con la clase "main-error"
      .contains("Please fill out the form to sign in.") // Verifica que contenga el texto "Please fill out the form to sign in."
      .should("be.visible"); // Verifica que el elemento sea visible en la página
    cy.screenshot(`apriori/${timestamp}/scn5`);
  });

  // Escenario 6: Inicio de sesión con datos inválidos - Valid email & invalid kanji password
  it("6. Ingresar Valid email & invalid kanji password", () => {
    const aprioriIndex = 6;
    var validEmail = loginData.email;
    var randomPass = jsonData[aprioriIndex].kanji;
    cy.log(
      "Usaremos el email " + validEmail + " y la contraseña " + randomPass
    );
    cy.get("#ember8").type(validEmail, { force: true });
    cy.get("#ember10").type(randomPass, { force: true });
    cy.get("#ember12").click();
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
    const aprioriIndex = 7;
    var naughtyEmail = jsonData[aprioriIndex].naughty_email;
    var randomPass = jsonData[aprioriIndex].password;
    cy.log(
      "Usaremos el email " + naughtyEmail + " y la contraseña " + randomPass
    );
    cy.get("#ember8").type(naughtyEmail, { force: true });
    cy.get("#ember10").type(randomPass, { force: true });
    cy.get("#ember12").click();
    // Verificar que se muestre el mensaje de error
    cy.get("p.main-error") // Selecciona el elemento <p> con la clase "main-error"
      .contains("Please fill out the form to sign in.") // Verifica que contenga el texto "Please fill out the form to sign in."
      .should("be.visible"); // Verifica que el elemento sea visible en la página
    cy.screenshot(`apriori/${timestamp}/scn7`);
  });

  // Escenario 8: Inicio de sesión con datos inválidos - Empty email & Naughty password
  it("8. Ingresar Empty email & Naughty password", () => {
    const aprioriIndex = 8;
    var naughtyPass = jsonData[aprioriIndex].naughty_password;
    cy.log("Usaremos el email vacio (empty) y la contraseña " + naughtyPass);
    cy.get("#ember10").type(naughtyPass, { force: true });
    cy.get("#ember12").click();
    // Verificar que se muestre el mensaje de error
    cy.get("p.main-error") // Selecciona el elemento <p> con la clase "main-error"
      .contains("Please fill out the form to sign in.") // Verifica que contenga el texto "Please fill out the form to sign in."
      .should("be.visible"); // Verifica que el elemento sea visible en la página
    cy.screenshot(`apriori/${timestamp}/scn8`);
  });

  // Escenario 9: Inicio de sesión con datos inválidos - Valid email & Naughty password
  it("9. Ingresar Valid email & Naughty password", () => {
    const aprioriIndex = 9;
    var naughtyPass = jsonData[aprioriIndex].naughty_password;
    var validEmail = loginData.email;
    cy.log(
      "Usaremos el email " + validEmail + " y la contraseña " + naughtyPass
    );
    cy.get("#ember8").type(validEmail, { force: true });
    cy.get("#ember10").type(naughtyPass, { force: true });
    cy.get("#ember12").click();
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
    const aprioriIndex = 10;
    var naughtyEmail = jsonData[aprioriIndex].naughty_email;
    var validPass = loginData.password;
    cy.log(
      "Usaremos el email " + naughtyEmail + " y la contraseña " + validPass
    );
    cy.get("#ember8").type(naughtyEmail, { force: true });
    cy.get("#ember10").type(validPass, { force: true });
    cy.get("#ember12").click();
    // Verificar que se muestre el mensaje de error
    cy.get("p.main-error") // Selecciona el elemento <p> con la clase "main-error"
      .contains("Please fill out the form to sign in.") // Verifica que contenga el texto "Please fill out the form to sign in."
      .should("be.visible"); // Verifica que el elemento sea visible en la página
    cy.screenshot(`apriori/${timestamp}/scn10`);
  });
});
