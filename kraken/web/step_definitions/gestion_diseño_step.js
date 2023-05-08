
const { By, Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");

When("I click on design link", async function () {
    await this.driver.url("http://test.denkitronik.com:2368/ghost/#/settings/design");
});

//Encontrar el primer input que encuentre que tenga un placeholder con el texto "Label"
When("I enter a new design label: {kraken-string}", async function (label) {
    let input = await this.driver.$("(//input[@placeholder='Label'])[last()-1]");
    return await input.setValue(label);
});

//Click en el botón que tiene un atributo data-ember-action-145="145"
When("I click on save design button", async function () {
    let saveButton = await this.driver.$("//button[contains(span/text(),'Save')]");
    return await saveButton.click();
});

Then("I should see the design label {kraken-string}", async function (label) {
    const link = await this.driver.$(`//a[contains(text(),'${label}')]`);
    const linkText = await link.getText();
    assert.strictEqual(linkText.toLowerCase(), label.toLowerCase());
});

