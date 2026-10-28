const {test, expect} = require('@playwright/test');


test('section 7 test case', async ({page}) => {

await page.goto("https://rahulshettyacademy.com/angularpractice/");
 await page.getByLabel("Check me out if you Love IceCreams!").click(); //checkbox using label - only for playwright not css
 await page.getByLabel("Student").check(); // radio button
 await page.getByLabel("Gender").selectOption("Female"); // dropdown if it has select tagname.
 await page.getByPlaceholder("Password").type("test"); //using placeholder value
 //can use await page.getByLable("password").type("add");  --- only in few places where label is associcated with editbox in html 
await page.getByRole("button", {name: 'Submit'}).click(); //either tagname should be button or class should have btn

//await page.getByText("Success! The Form has been submitted successfully!.").isVisible(); //using text
//to put assertion as below
 await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10000});
 //tobevisible while using assertion.Default timeout for assertions is 5sec. If you want extra time for a step - then add timeout inside. 
 //If you want extra time globally for all test cases, then updtae timeout in playwright congig file.


await page.getByRole("link", {name: 'Shop'}).click(); //tagname should be 'a'
await page.locator("app-card").filter({hasText: 'Samsung Note 8'}).getByRole("button", {name: 'Add'}).click(); //instead of using for and if loops, we can direct use locator - filter - getbyrole
 await page.pause();

})





test('playwright testcase level timeout', async ({page}) => {


test.setTimeout(60000); //total timeout for a testcase to complete.If not given it will take global level timout(30sec)

//to have test case level timout for assertions
const slowexpect = expect.configure({timeout: 7000});    // can use assertions in the textcase need more than default 5sec.

page.setDefaultTimeout(9000); //timout for all actions in testcase level

await page.goto("https://rahulshettyacademy.com/angularpractice/");
 await page.getByLabel("Check me out if you Love IceCreams!").click(); //checkbox using label - only for playwright not css
 await page.getByLabel("Student").check(); // radio button
 await page.getByLabel("Gender").selectOption("Female"); // dropdown if it has select tagname.
 await page.getByPlaceholder("Password").type("test"); //using placeholder value
await page.getByRole("button", {name: 'Submit'}).click(); //either tagname should be button or class should have btn

//await page.getByText("Success! The Form has been submitted successfully!.").isVisible(); //using text
//to put assertion as below
 await slowexpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();
 //tobevisible while using assertion.Default timeout for assertions is 5sec. If you want extra time for a step - then add timeout inside. 
 //If you want extra time globally for all test cases, then updtae timeout in playwright congig file.


await page.getByRole("link", {name: 'Shop'}).click({timeout: 10000}); //tagname should be 'a'. Here timout added at action level.
await slowexpect(page.locator("h1.my-4")).toHaveText("Shop Name"); //can use containsText also
await page.locator("app-card").filter({hasText: 'Samsung Note 8'}).getByRole("button", {name: 'Add'}).click(); //instead of using for and if loops, we can direct use locator - filter - getbyrole


})
