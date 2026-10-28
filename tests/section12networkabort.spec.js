//test to abort the network requests and check whether the page is loaded or not   


const {test} = require('@playwright/test');
const {expect, request} = require('@playwright/test'); //importing expect annotation from playwright module to use assertion in test cases



test('page playwright test case', async ({page}) => {

page
    
await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); //to navigate to the url

 await page.route('**/*.css', route => route.abort()); //to abort all the css files from loading in the browser
await page.route('**/*.{png,jpg,jpeg}', route => route.abort()); //to abort all the image files from loading in the browser
page.on('request', request => console.log(request.url())); //to log all the requests made by the browser in the console
page.on('response', response => console.log(response.url(), response.status())); //to log all the responses received by the browser in the console

await page.locator("input#username").fill("rahulshettyacademy"); //to fill the username field
await page.locator("[id='password']").fill("testpassword");
await page.locator("#signInBtn").click(); //to click on the sign in button
 console.log(await page.locator("[style='display: block;']").textContent()); //to get the text content of the error message
await expect(page.locator("[style='display: block;']")).toContainText("Incorrect"); //to assert the error message

//original details
await page.locator("input#username").fill(""); //to clear the username field
await page.locator("input#username").type("rahulshettyacademy");
await page.locator("[id='password']").fill(""); //to clear the password field
await page.locator("[id='password']").type("Learning@830$3mK2");
await page.locator("#signInBtn").click();


console.log(await page.locator("div.card-body a").first().textContent()); //to get the text content of the first link in the card body
console.log(await page.locator("div.card-body a").nth(2).textContent()); //to get the text content of the third link in the card body
console.log(await page.locator("div.card-body a").allTextContents()); //to get the text content of all the links in the card body





});