const { Given, When, Then } = require("@cucumber/cucumber");

When("I enter email {kraken-string}", async function (email) {
  let element = await this.driver.$("#identification");
  return await element.setValue(email);
});

When("I enter password {kraken-string}", async function (password) {
  let element = await this.driver.$("#password");
  return await element.setValue(password);
});

When("I click sign in button  ", async function () {
  let element = await this.driver.$('button[data-test-button="sign-in"]');
  return await element.click();
});


Then("I click on the Pages sidebar button", async function () {
  let element = await this.driver.$('a[href="#/tags/"]');
  return await element.click();
});

Then("I click public tag", async function () {
  let element = await this.driver.$('button[data-test-tags-nav="internal"]');
  return await element.click();
});

Then("I click on the New tag button", async function () {
  let element = await this.driver.$('a[href="#/tags/new"]');
  return await element.click();
});


// Tag Creation
Then(
  "I complete tag creation {kraken-string} {kraken-string}",
  async function (name, description) {
    let nameElement = await this.driver.$(
      '#tag-name'
    );
    let descriptionElement = await this.driver.$(
      '#tag-description'
    );
  
  Then("I click save button", async function () {
      let element = await this.driver.$('button[data-test-button="save"]');
      return await element.click();
  });
    
    await nameElement.setValue(name);
    return await descriptionElement.setValue(description);
  }
);
