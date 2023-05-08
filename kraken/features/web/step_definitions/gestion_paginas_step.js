const { Given, When, Then } = require("@cucumber/cucumber");

When("I enter email {kraken-string}", async function (email) {
  let element = await this.driver.$("#identification");
  return await element.setValue(email);
});

When("I enter password {kraken-string}", async function (password) {
  let element = await this.driver.$("#password");
  return await element.setValue(password);
});

When("I click next", async function () {
  let element = await this.driver.$('button[data-test-button="sign-in"]');
  return await element.click();
});

Then("I click on the Pages sidebar button", async function () {
  let element = await this.driver.$('a[href="#/pages/"]');
  return await element.click();
});

Then("I click on the New Page button", async function () {
  let element = await this.driver.$('a[href="#/editor/page/"]');
  return await element.click();
});

// Page Creation
Then(
  "I complete page content {kraken-string} {kraken-string}",
  async function (title, content) {
    let titleElement = await this.driver.$(
      'textarea[placeholder="Page title"]'
    );
    let contentElement = await this.driver.$(
      'div[data-placeholder="Begin writing your page..."] > p'
    );

    await titleElement.setValue(title);
    return await contentElement.setValue(content);
  }
);

Then("I complete New Page Title {kraken-string}", async function (title) {
  let element = await this.driver.$('textarea[placeholder="Page title"]');
  return await element.setValue(title);
});

Then("I complete New Page Content {kraken-string}", async function (content) {
  let element = await this.driver.$(
    "article > div.koenig-editor__editor-wrapper > div > p"
  );
  return await element.setValue(content);
});

Then("I click on the Back Page Editor Button", async function () {
  let element = await this.driver.$("a.gh-editor-back-button");
  return await element.click();
});

Then("I click on the Back Page Publish Button", async function () {
  let element = await this.driver.$("button.gh-publish-back-button");
  return await element.click();
});

Then("I click on the Publish Page Button", async function () {
  let element = await this.driver.$("button.gh-publish-trigger");
  return await element.click();
});

Then("I click on the Continue Publication Button", async function () {
  let element = await this.driver.$("button[data-test-button='continue']");
  return await element.click();
});

Then("I click on the Confirm Publication Button", async function () {
  let element = await this.driver.$(
    "button[data-test-button='confirm-publish']"
  );
  return await element.click();
});

Then("I click on the BackToEditor Button", async function () {
  let element = await this.driver.$("button.gh-back-to-editor");
  return await element.click();
});

Then("I filter by draft pages", async function () {
  let pagesTypeFilters = await this.driver.$(
    "div.gh-contentfilter > div:nth-child(1)"
  );
  await pagesTypeFilters.click();
  let draftPagesFilter = await this.driver.$(
    "ul[role='listbox'] > li:nth-child(2)"
  ); // Asumming its the 3rd child
  return await draftPagesFilter.click();
});

Then("I filter by published pages", async function () {
  let pagesTypeFilters = await this.driver.$(
    "div.gh-contentfilter > div:nth-child(1)"
  );
  await pagesTypeFilters.click();
  let publishedPagesFilter = await this.driver.$(
    "ul[role='listbox'] > li:nth-child(3)"
  ); // Asumming its the 3rd child
  return await publishedPagesFilter.click();
});

Then("I filter by scheduled pages", async function () {
  let pagesTypeFilters = await this.driver.$(
    "div.gh-contentfilter > div:nth-child(1)"
  );
  await pagesTypeFilters.click();
  let scheduledPagesFilter = await this.driver.$(
    "ul[role='listbox'] > li:nth-child(4)"
  ); // Asumming its the 4th child
  return await scheduledPagesFilter.click();
});

Then(
  "I check the page is the first in the list is {kraken-string}",
  async function (expectedTitle) {
    let element = await this.driver.$(
      "div.posts-list.gh-list > div:nth-child(1) h3"
    );

    let tituloPrimerElemento = await element.getText();
    if (tituloPrimerElemento !== expectedTitle)
      throw new Error("Titulo inesperado");
    return tituloPrimerElemento === expectedTitle;
  }
);

Then(
  "I click on the Publish Settings to Schedule after 3 days",
  async function () {
    let publishAtButton = await this.driver.$(
      "div.gh-publish-settings > div[data-test-setting='publish-at'] > button"
    );
    await publishAtButton.click();

    let publishScheduleButton = await this.driver.$("div.gh-publish-schedule");
    await publishScheduleButton.click();

    let datePicker = await this.driver.$(
      "div.gh-date-time-picker-date > input"
    );
    await datePicker.setValue("2023-10-15");

    return;
  }
);

Then("I selected the first page in the list", async function () {
  let element = await this.driver.$(
    "div.posts-list.gh-list > div:nth-child(1) > li > a:nth-child(1)"
  );
  return await element.click();
});

Then("I click on the UpdatePage Button", async function () {
  let updatePageButton = await this.driver.$(
    "button[data-test-button='publish-save']"
  );
  return await updatePageButton.click();
});

Then("I click on the Unpublish Button", async function () {
  let unpublishButton = await this.driver.$("button.gh-unpublish-trigger");
  return await unpublishButton.click();
});

Then("I click on the Unpublish and revert Button", async function () {
  let revertButton = await this.driver.$("button.gh-revert-to-draft");
  return await revertButton.click();
});

Then("I check page status to be draft", async function () {
  let pageStatusElem = await this.driver.$(
    "div.gh-editor-post-status > span > div"
  );
  let status = await pageStatusElem.getText();
  if (!status.includes("Draft")) throw new Error("Page should be Draft");
  return true;
});
