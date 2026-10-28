 //first we have to import one annoatation called test from playwright module to launch the browser and to run the test cases
 const {test} = require('@playwright/test');
 const {expect} = require('@playwright/test'); //importing expect annotation from playwright module to use assertion in test cases
 
 
 
 //instead of browser, we can also use page directly as a parameter to test function which is also a global fixture provided by playwright to launch the browser and create a new page in the browser context
 //if we give as test.only then only that test case will be executed and all other test cases will be ignored
 test('page playwright test case', async ({page}) => {
 await page.goto("https://rahulshettyacademy.com/client"); //to navigate to the url

 await page.locator("input#userEmail").fill("anshika@gmail.com"); //to fill the username field
    await page.locator("[type='password']").fill("Iamking@000");
 await page.locator("#login").click(); //to click on the sign in button


 // await page.waitForLoadState('networkidle'); //to wait for the network to be idle before proceeding to the next step.That means that the page has finished loading and there are no more network requests in progress.
 await page.locator(".card-body").first().waitFor(); //This is alernative for waitforloadstate method.To wait for the first card body to be visible before proceeding to the next step. waitforload method is flaky sometimes so we can use this method instead of waitforload state method
 const titles =await page.locator(".card-body b").allTextContents(); //to get the text content of all the links in the card body
console.log(titles); //to print the titles of all the products in the console

 });


 