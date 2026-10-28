//first we have to import one annoatation called test from playwright module to launch the browser and to run the test cases
const {test} = require('@playwright/test');
const {expect} = require('@playwright/test'); //importing expect annotation from playwright module to use assertion in test cases

//write a test case
test('First playwright test case', async ({browser}) => {
//javascript is a synchronous language so we have to use async and await keywords to make it asynchronous
//in newer versions, for anonymous functions, we can use ()=> instead of function keyword
//browser is a global fixture which is provided by playwright to launch the browser.we should send the browser as a parameter to test function
//If wrappped in a {} then it is recognised as a playwright test fixture which is provided by playwright


const newcontext = await browser.newContext(); //to create a new browser context or instance of the browser
const page =  await newcontext.newPage(); //to create a new page in the browser context
await page.goto("https://rahulshettyacademy.com/"); //to navigate to the url

});


//instead of browser, we can also use page directly as a parameter to test function which is also a global fixture provided by playwright to launch the browser and create a new page in the browser context
//if we give as test.only then only that test case will be executed and all other test cases will be ignored
test('page playwright test case', async ({page}) => {
await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); //to navigate to the url

 console.log(await page.title());//to get and print the title of the page in the console
await expect(await page.title()).toBe("LoginPage Practise | Rahul Shetty Academy"); //to assert the title of the page

await page.locator("input#username").fill("rahulshettyacademy"); //to fill the username field
await page.locator("[id='password']").fill("testpassword")
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