const { By, Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");

When("I enter email {string}", async function (email) {
  let element = await this.driver.$("#ember8");
  return await element.setValue(email);
});

When("I enter password {string}", async function (password) {
  let element = await this.driver.$("#ember10");
  return await element.setValue(password);
});

When("I click on staff link", async function () {
  await this.driver.url("http://test.denkitronik.com:2368/ghost/#/staff/");
});

When("I click on user {kraken-string}", async function (user) {
  const header = await this.driver.$('//h3[text()="'+user+'"]');
  header.waitForExist({ timeout: 8000 });
  const element = await header
    .parentElement()
    .parentElement()
    .parentElement()
    .parentElement();
  return await element.click();
});

When("I click on user slug", async function () {
  let element = await this.driver.$("#user-slug");
  return await element.click();
});

When("I update the email to {kraken-string}", async function (newEmail) {
  let emailInput = await this.driver.$("#user-email");
  await emailInput.clearValue();
  return await emailInput.setValue(newEmail);
});

When("I update the bio to {kraken-string}", async function (newBio) {
  let bioSaved = await this.driver.$("#user-bio");
  await bioSaved.clearValue();
  return await bioSaved.setValue(newBio);
});

When("I update the slug to {kraken-string}", async function (newSlug) {
  let slugSaved = await this.driver.$("#user-slug");
  await slugSaved.clearValue();
  return await slugSaved.setValue(newSlug);
});

When("I click on user email", async function () {
  let element = await this.driver.$("#user-email");
  return await element.click();
});

When("I click on user bio", async function () {
  let element = await this.driver.$("#user-bio");
  return await element.click();
});

When("I click on login button", async function () {
  let element = await this.driver.$("#ember12");
  return await element.click();
});

When("I click on Save button", async function () {
  const span = await this.driver.$('//span[text()="Save"]');
  const element = await span.parentElement();
  return await element.click();
});

Then(
  "The Ghost user must contain the slug {kraken-string}",
  async function (slugExpected) {
    let slugSaved = await this.driver.$("#user-slug").getValue();
    assert.equal(slugExpected, slugSaved);
  }
);

Then(
  "The Ghost user must contain the bio {kraken-string}",
  async function (bioExpected) {
    let bioSaved = await this.driver.$("#user-bio").getValue();
    assert.equal(bioExpected, bioSaved);
  }
);

Then(
  "The Ghost user must contain the email {kraken-string}",
  async function (emailExpected) {
    let emailSaved = await this.driver.$("#user-email").getValue();
    assert.equal(emailExpected, emailSaved);
  }
);

When("I click on user settings", async function () {
  let button = await this.driver.$("button.gh-btn.gh-btn-white.gh-btn-icon.only-has-icon.user-actions-cog");
  await button.click();
});

When("I click on suspend user", async function () {
  //const button = await this.driver.$('//button[text()="Suspend"]');
  let button = await this.driver.$("button.suspend");
  button.waitForExist({ timeout: 8000 });
  await button.click();
});


When("I click on confirm suspend user", async function () {
  const span = await this.driver.$('//span[text()="Suspend"]');
  const button = await span.parentElement();
  await button.click();
});

Then("I verify that the user is suspended", async function () {
  const span = await this.driver.$('span.gh-badge.suspended');
  const badge = await span.getText();
  assert.equal(badge, 'SUSPENDED');
});


When("I click on un-suspend user", async function () {
  let button = await this.driver.$("button.unsuspend");
  button.waitForExist({ timeout: 8000 });
  await button.click();
});


When("I click on confirm un-suspend user", async function () {
  const span = await this.driver.$('//span[text()="Un-suspend"]');
  span.waitForExist({ timeout: 8000 });
  const button = await span.parentElement();
  button.waitForExist({ timeout: 8000 });
  await button.click();
});


Then("I verify that the user is unsuspended", async function () {
  const span = await this.driver.$('a[href*="#/staff/a-simple-slug/"] span.gh-badge.author');
  const badge = await span.getText();
  assert.equal(badge, 'AUTHOR');
});

When("I enter the New Password field with {kraken-string}", async function (password) {
  let passwordNewInput = await this.driver.$("#user-password-new");
  await passwordNewInput.clearValue();
  return await passwordNewInput.setValue(password);
});

When("I enter the Verify Password field with {kraken-string}", async function (password) {
  let passwordNewInput = await this.driver.$("#user-new-password-verification");
  await passwordNewInput.clearValue();
  return await passwordNewInput.setValue(password);
});

When("I click on Change Password button", async function () {
  const span = await this.driver.$('//span[text()="Change Password"]');
  const button = await span.parentElement();
  await button.click();
});

Then("I verify that the password was changed", async function () {
  const span = await this.driver.$('//span[text()="Password updated"]');
  span.waitForExist({ timeout: 8000 });
  const message = await span.getText();
  assert.equal(message, 'Password updated');
});