const { By, Given, When, Then } = require("@cucumber/cucumber");

Then("I click on the first conversation", async function () {
  let element = await this.driver.$(
    ".x1av1boa > div:nth-child(1) > div:nth-child(1)"
  );
  return await element.click();
});

Then("I click on the redact message inputbox", async function () {
  let element = await this.driver.$("p.xat24cr");
  return await element.click();
});

Then("I send the message", async function () {
  let element = await this.driver.$("span.x3nfvp2:nth-child(3)");
  return await element.click();
});
