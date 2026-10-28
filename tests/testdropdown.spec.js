const {test} = require('@playwright/test');
const {expect} = require('@playwright/test'); 


test('page playwright test case', async ({page}) => {
await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); //to navigate to the url

 
const username = page.locator("input#username") //to fill the username field
const pass = page.locator("[id='password']")
const dropdown = page.locator("select.form-control");

await dropdown.selectOption("teach"); //to select the option from the dropdown
//await page.pause(); //to pause the execution of the test case and to inspect the page in the browser
await page.locator("span.checkmark").last().click(); //to click on the last checkbox in the page
await page.locator("#okayBtn").click(); //to click on the okay button in the alert popup

console.log(await page.locator("span.checkmark").last().isChecked()); //to check if the last checkbox is checked or not
expect(await page.locator("span.checkmark").last()).toBeChecked(); //to assert that the last checkbox is checked


//checkboxes
await page.locator("input#terms").click(); //to click on the checkbox
await expect(page.locator("input#terms")).toBeChecked(); //to assert that the checkbox is checked
await page.locator("input#terms").uncheck();
expect(await page.locator("input#terms").last().isChecked()).toBeFalsy(); //to check if the checkbox is unchecked or not

//await should be used wherever actions are performed either inside the bracket or outside the bracket.



});




//test to click ink and open new page do some actions and come back to the original page
test('First playwright test case', async ({browser}) => {

const newcontext = await browser.newContext(); //to create a new browser context or instance of the browser
const page =  await newcontext.newPage(); //to create a new page in the browser context
await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 


const blinkinglink = page.locator("[href*='https://rahulshettyacademy.com/documents-request']");
await expect( blinkinglink).toHaveAttribute("class", "blinkingText"); //to assert the attribute of the blinking link. This shows whether link is blinking or not.


//If we want two operations to be performed asynchronously then we can use Promise.all() array. It will wait for both the operations to be completed before moving to the next step.
 const [newpage]= await Promise.all([
   newcontext.waitForEvent('page'), //to wait for the new page to be opened 
 blinkinglink.click() //to click on the blinking link
]);


const text = await newpage.locator("p.red").textContent(); //to get the text content of the paragraph in the new page
console.log(text); //to print the text content in the console

const email = await text.split("@")[1].split(" ")[0]; //to split the text content and get the email id
console.log(email); //to print the email id in the console
await page.locator("[id='username']").fill(email); //to type the email id in the username field of the original page
//await page.pause();
console.log(await page.locator("[id='username']").inputValue()); //to get the text content of the username field
// inputValue() is used instead of textContent() because textContent() is used to get the text content of the element but inputValue() is used to get the value of the input field.
//textContent() is used to get the text content of the element when it is attached to the DOM, but inputValue() is used to get the value of the input field when its is updated during the execution of the test case. So, we should use inputValue() to get the value of the input field after it is updated during the execution of the test case.

});

