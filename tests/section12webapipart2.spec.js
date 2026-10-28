//// This is to show how to use the storage state to preserve the login state across multiple test runs. This is useful for E2E testing where you want to test the application without having to log in every time.
/// This is useful when you have multiple test cases that require the user to be logged in. Instead of logging in for each test case, you can log in once and save the storage state to a file. Then, you can use that storage state in subsequent test cases to avoid logging in again.
// This is mainly useful when login cookkies are complex and have lot of keys and values. Instead of writing all the cookies in the test case, you can save the storage state to a file and use that file in subsequent test cases. This will make the test cases cleaner and easier to maintain.

const {test, expect} = require('@playwright/test');

let webcontext;


test.beforeAll( async({browser})=>{   //executes before all the test methods

const browserContext = await browser.newContext(); //to create a new browser context
const page = await browserContext.newPage(); //to create a new page in the browser context
await page.goto("https://rahulshettyacademy.com/client"); //to navigate to the url
await page.locator("input#userEmail").fill("client123@gmail.com"); //to fill the username field
await page.locator("[type='password']").fill("Test@123");
await page.locator("input#login").click(); //to click on the sign in button
await page.waitForLoadState('networkidle');
await page.locator(".card-body").first().waitFor();

await browserContext.storageState({ path: 'state.json' }); //to save the storage state of the browser context to a file named state.json. This file will contain all the cookies, local storage, and session storage data for the current browser context. This is useful for preserving the login state across multiple test runs.
webcontext = await browser.newContext({storageState: 'state.json'}); //to create a new browser context using the storage state saved in the state.json file. This will allow us to reuse the login state from the previous test run without having to log in again.

})





test('client app E2E test case', async () => {


const page = await webcontext.newPage(); //to create a new page in the browser context
await page.goto("https://rahulshettyacademy.com/client"); //to navigate to the url
const allproducts = await page.locator(".card-body");
const count = await allproducts.count(); //to get the count of all the products in the page
const productname = 'ZARA COAT 3'; 


for (let i=0;i<count;i++){

  if( await allproducts.nth(i).locator("b").textContent() === productname){

   await allproducts.nth(i).locator("text= Add To Cart").click();
   // here better approach  = await allproducts.nth(i).getByRole('button', { name: 'Add To Cart' }).click();
 
   break; 

}   
}
await page.locator("[routerlink = '/dashboard/cart']").click(); //to click on the cart link in the header to navigate to the cart page
await page.locator("li.items").first().waitFor(); //to wait for the first item in the cart to be visible before proceeding to the next step. This is to ensure that the product is added to the cart before proceeding to the next step.
const bool =await page.locator("h3:has-text('Zara coat 3')").isVisible();//this is not css selector but a text selector which is provided by playwright to locate the element based on the text content of the element using the taganme.h3 is the tagname.
await expect(bool).toBeTruthy(); //to assert that the product is added to the cart or not. toBeTruthy() is used to check if the value is true or not. If the value is true then the test case will pass otherwise it will fail.
//Also you can use  = await expect(page.locator("h3:has-text('Zara coat 3')")).toBeVisible();
await page.locator("text=Checkout").click();


 await page.locator("[placeholder='Select Country']").pressSequentially("ind");
 //This step may occasionally fail if the application server is slow due to heavy traffic. In such cases, 
 // you can introduce a delay and rewrite the step as = 
 //await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
 const dropdownresults = await page.locator("section.ta-results");
 await dropdownresults.waitFor();
 const count2 = await dropdownresults.locator("button").count();

 for(let i=0;i<count2;i++){

     const text = await dropdownresults.locator("button").nth(i).textContent();

     if(text===" India"){

        await dropdownresults.locator("button").nth(i).click();
         break;
     }

 }

 await expect(page.locator("div.user__name [type='text']").first()).toHaveText("client123@gmail.com");//to verify username populated
 await page.locator("text=Place Order ").click(); //to click place order button
 await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");// to verify text
 const orderid = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
 console.log("The orderid is "+orderid);


 //orders page---------------------------------------------
//const trimmedorderid = orderid.split(" ");
//console.log(trimmedorderid[2]);
            //OR
 const orderidsplit = await  orderid.split("|");
const trimmedorderid = await  orderidsplit[1].trim();
console.log("Orderid after trimming the spaces is "+trimmedorderid);

await page.locator("li [routerlink='/dashboard/myorders']").click();
 
page.pause();

await page.waitForLoadState('networkidle');
await page.locator("tr.ng-star-inserted").first().waitFor();

const allorderid = await page.locator("tr.ng-star-inserted");
const orderidscount = await allorderid.count();

for(let i=0;i<count;i++){

    const textcont = await allorderid.nth(i).locator("th").textContent();

    if(textcont === trimmedorderid){
    //or if(orderid.includes(textcont))    
        await allorderid.nth(i).locator("td button.btn-primary").click();
        //or allorderid.nth(i).locator("button").first().click();
        break;
    }
}

console.log(await page.locator("div.col-text").textContent());
await expect(page.locator("div.col-text")).toHaveText(trimmedorderid);
//or
//await const orderIdDetails = page.locator("div.col-text").textContent();
// await expect(orderId.includes(orderIdDetails)).toBeTruthy();


})