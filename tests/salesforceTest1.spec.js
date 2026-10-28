const {test, expect}=require('@playwright/test');

test('salesfore login', async({page}) => {

await page.goto("https://login.salesforce.com/");
await page.locator("#username").fill("varun@wipro.com");
await page.getByRole("button", {name: 'Log In'}).click();

await page.locator("#password").waitFor();
await page.locator("#password").fill("Upskill@12345");
await page.getByRole("button", {name: 'Log In'}).click();
page.pause();
});