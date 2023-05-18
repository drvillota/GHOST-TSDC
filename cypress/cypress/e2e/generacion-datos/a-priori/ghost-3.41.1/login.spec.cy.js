const ghostUrl = "http://test.denkitronik.com:2368"; // URL de Ghost 3.41.1
const apiEmailInvalidPass = "/email_invalid_pass.json?key="; // API de Mockaroo para generar datos de correo y contraseña inválidos
const proxyMockarooUrl = "http://localhost:3000"; // URL del proxy CORS apuntando a Mockaroo
const apiMockarooKey = "af4f0e30"; // API Key de Mockaroo
var jsonData; // Variable para almacenar los datos de Mockaroo (JSON)
var fileName;
var loginData


// Inicio de sesión con datos inválidos (contraseña)
context("Interacciones con campos de texto", () => {

  // Generar los datos apriori con Mockaroo y guardarlos en un data pool
  before(() => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Genera una marca de tiempo única
    fileName = `data_${timestamp}.json`; // Agrega la marca de tiempo al nombre del archivo

    // Generar los datos apriori con Mockaroo y guardarlos en un data pool
    cy.request("GET", proxyMockarooUrl + apiEmailInvalidPass + apiMockarooKey).then(
      (response) => {
        expect(response.status).to.eq(200); // Verificar que la respuesta sea exitosa
        // Acceder a los datos del JSON
        const dataPool = JSON.stringify(response.body); // Convierte los datos JSON en una cadena
        cy.writeFile(`cypress/fixtures/data_pool/${fileName}`, dataPool); // Guarda los datos en un archivo
        cy.log("Se recibio de Mockaroo: " + dataPool);
      }
    );

    // Leer los datos del data pool de Mockaroo y guardarlos en una variable (jsonData)
    cy.readFile(`cypress/fixtures/data_pool/${fileName}`).then((fileContent) => {
      jsonData=fileContent;
      cy.log(fileContent); // Imprimir el contenido del archivo en la consola de Cypress
    });

    // Leer los datos del data pool de login y clave válidos
    cy.readFile("cypress/fixtures/data_pool/login_clave.json").then((fileContent) => {
      loginData=fileContent;
      cy.log("Valid login"+fileContent); // Imprimir el contenido del archivo en la consola de Cypress
    });
  });

  // Ingresar a la página de inicio de sesión de Ghost
  beforeEach(() => {
    cy.visit(ghostUrl + "/ghost/#/signin");
  });

  // Escenario 1: Inicio de sesión con datos inválidos (contraseña) - Random email y password
  it("Scn1. Random email and password", () => {
    var randomEmail =
      jsonData[Math.floor(Math.random() * jsonData.length)].email;
    var randomPass =
      jsonData[Math.floor(Math.random() * jsonData.length)].password;
    cy.log(
      "Usaremos el email " + randomEmail + " y la contraseña " + randomPass
    );
    cy.get("#ember8").type(randomEmail, { force: true });
    cy.get("#ember10").type(randomPass, { force: true });
    cy.get("#ember12").click();
    // Verificar que se muestre el mensaje de error
    cy.screenshot("usuarios/invalid_pass/scn1_1");
    cy.get("p.main-error") // Selecciona el elemento <p> con la clase "main-error"
      .contains("Unknown error") // Verifica que contenga el texto "Unknown error"
      .should("be.visible"); // Verifica que el elemento sea visible en la página
    cy.screenshot("usuarios/invalid_pass/scn1_2");
  });


  // Escenario 2: Inicio de sesión con email valido y password invalido - Random email y naughty password
  it("Scn2. Valid email and random password", () => {
    var validEmail = loginData.email;
    var randomPass =
      jsonData[Math.floor(Math.random() * jsonData.length)].password;
    cy.log(
      "Usaremos el email " + validEmail + " y la contraseña " + randomPass
    );
    cy.get("#ember8").type(validEmail, { force: true });
    cy.get("#ember10").type(randomPass, { force: true });
    cy.get("#ember12").click();
    // Verificar que se muestre el mensaje de error
    cy.screenshot("usuarios/invalid_pass/scn1_1");
    cy.get("p.main-error") // Selecciona el elemento <p> con la clase "main-error"
      .contains("Unknown error") // Verifica que contenga el texto "Unknown error"
      .should("be.visible"); // Verifica que el elemento sea visible en la página
    cy.screenshot("usuarios/invalid_pass/scn1_2");
  });



  // Escenario 1: Inicio de sesión con datos inválidos (contraseña) - Naughty password y random email
  it("Scn3. Naughty password and random email", () => {
    var randomEmail =
      jsonData[Math.floor(Math.random() * jsonData.length)].email;
    var naughtyPass =
      jsonData[Math.floor(Math.random() * jsonData.length)].naughty_password;
    cy.log(
      "Usaremos el email " + randomEmail + " y la contraseña " + naughtyPass
    );
    cy.get("#ember8").type(randomEmail, { force: true });
    cy.get("#ember10").type(naughtyPass, { force: true });
    cy.get("#ember12").click();
    // Verificar que se muestre el mensaje de error
    cy.screenshot("usuarios/invalid_pass/scn1_1");
    cy.get("p.main-error") // Selecciona el elemento <p> con la clase "main-error"
      .contains("Unknown error") // Verifica que contenga el texto "Unknown error"
      .should("be.visible"); // Verifica que el elemento sea visible en la página
    cy.screenshot("usuarios/invalid_pass/scn1_2");
  });

  // Escenario 3: Inicio de sesión con datos inválidos (contraseña) - Random email y empty password
  it("Scn4. Empty password", () => {
    var randomEmail =
      jsonData[Math.floor(Math.random() * jsonData.length)].email;
    cy.log(
      "Usaremos el email " + randomEmail + " y la contraseña vacia (empty)"
    );
    cy.get("#ember8").type(randomEmail, { force: true });
    cy.get("#ember12").click();
    // Verificar que se muestre el mensaje de error
    cy.screenshot("usuarios/invalid_pass/scn1_1");
    cy.get("p.main-error") // Selecciona el elemento <p> con la clase "main-error"
      .contains("Please fill out the form to sign in.") // Verifica que contenga el texto "Please fill out the form to sign in."
      .should("be.visible"); // Verifica que el elemento sea visible en la página
    cy.screenshot("usuarios/invalid_pass/scn1_2");
  });
  // Escenario 4: Inicio de sesión con datos inválidos (contraseña) - Empty email y random password
  it("Scn5. Empty email", () => {
    var randomPass =
      jsonData[Math.floor(Math.random() * jsonData.length)].password;
    cy.log("Usaremos el email vacio (empty) y la contraseña " + randomPass);
    cy.get("#ember10").type(randomPass, { force: true });
    cy.get("#ember12").click();
    // Verificar que se muestre el mensaje de error
    cy.screenshot("usuarios/invalid_pass/scn1_1");
    cy.get("p.main-error") // Selecciona el elemento <p> con la clase "main-error"
      .contains("Please fill out the form to sign in.") // Verifica que contenga el texto "Please fill out the form to sign in."
      .should("be.visible"); // Verifica que el elemento sea visible en la página
    cy.screenshot("usuarios/invalid_pass/scn1_2");
  });
});
