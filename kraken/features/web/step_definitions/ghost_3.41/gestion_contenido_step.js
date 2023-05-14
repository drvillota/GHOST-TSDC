
const { By, Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");

When("I click on post link", async function () {
    await this.driver.url("http://test.denkitronik.com:2368/ghost/#/posts");
});

When("I click on New post button", async function () {
    let button = await this.driver.$("(//span[text()='New post'])");
    return await button.click();
});

//Encontrar el área de texto con un placeholder con el texto "Post Title"
When("I enter a post title: {kraken-string}", async function (Title) {
    let textArea = await this.driver.$("(//textarea[@placeholder='Post Title'])");
    return await textArea.setValue(Title);
});

//Encontrar el area de texto para agregar contenido al post
When("I begin writing the post: {kraken-string}", async function (Content) {
    let p = await this.driver.$("(//p[not(@class)])");
    p.setValue(Content)
    return await p.click();
});

When("I display the publish options", async function () {
    let publishOptions = await this.driver.$("(//div[@class='gh-publishmenu ember-view'])");
    return await publishOptions.click();
});

When("I display the update options", async function () {
    let publishOptions = await this.driver.$("(//div[@class='gh-publishmenu ember-view'])");
    return await publishOptions.click();
});

When("I click in the schedule option", async function () {
    let publishButton = await this.driver.$("//div[@class='gh-publishmenu-radio-button']");
    return await publishButton.click();
});

When("I click in the schedule button", async function () {
    let publishButton = await this.driver.$("//button[contains(span/text(),'Schedule')]");
    return await publishButton.click();
});

When("I click in the publish button", async function () {
    let publishButton = await this.driver.$("//button[contains(span/text(),'Publish')]");
    return await publishButton.click();
});

When("I click in the update button", async function () {
    let publishButton = await this.driver.$("//button[contains(span/text(),'Update')]");
    return await publishButton.click();
});

When("I click on a post", async function () {
    let post = await this.driver.$("(//li[@class='gh-list-row gh-posts-list-item'])[last()-1]");
    return await post.click();
});

Then("I should see the post few seconds ago", async function () {
    const post = await [this.driver.$("//span[@class='gh-content-entry-meta']")];
    let bool = false

    post.forEach(element => {
            if(element.includes("few seconds"))
            {
                bool = true
                assert.ok(bool);
            }
        });
});