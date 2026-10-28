// playwright inspector ('npx playwright test --debug' command to run the test in debug mode) is only for UI testing. It is not for API testing. 
// for API part, we have to npx terminal command in package.json file.Here we have to put a debug point and 'ctrl+shift+p' and select 'Debug: Start Debugging' option. Then we can see the debug point in the terminal. 
// in package.json  file- scripts - "test": "npx playwright test tests/section11apiUtils.spec.js"
// for this kind of debug , better to increase the timeout in config file


const {test, expect, request} = require('@playwright/test');

const {APIUtils} = require('../utils/APIUtils');

const loginpayload = {userEmail: "client123@gmail.com", userPassword: "Test@123"}; //get this key value pair from payload

 
const orderpayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};

let responseOrderidToken;


test.beforeAll( async()=>{   //executes before all the test methods

const newapicontext = await  request.newContext();


const apiutils = new APIUtils(newapicontext, loginpayload);
 responseOrderidToken = await apiutils.createorder(orderpayload);


});



test('to verify orderid using APIuits', async ({page}) => {

    //Handling login using API token

await page.addInitScript(tokenvalue =>{    //here running one javascript to taken token.tokenvalue is one dummy variable to token's value

window.localStorage.setItem('token',tokenvalue); //javsscript to insert item in the local storage.It accepts key value pair.token is the key abd tokenvalue is pair

}, responseOrderidToken.token ); //tokenvalue's values is token(taken from test.beforeall());



await page.goto("https://rahulshettyacademy.com/client"); //to navigate to the url

await page.locator("li [routerlink='/dashboard/myorders']").click();
 
await page.waitForLoadState('networkidle');
await page.locator("tr.ng-star-inserted").first().waitFor();

const allorderid = await page.locator("tr.ng-star-inserted");
const orderidscount = await allorderid.count();

for(let i=0;i<orderidscount;i++){

    const textcont = await allorderid.nth(i).locator("th").textContent();

    //or if(textcont === trimmedorderid){
     if(responseOrderidToken.orderId.includes(textcont))   {
        await allorderid.nth(i).locator("td button.btn-primary").click(); //to click respective veiw button
        //or allorderid.nth(i).locator("button").first().click();
        break;
    }
}

///console.log(await page.locator("div.col-text").textContent());
///await expect(page.locator("div.col-text")).toHaveText(trimmedorderid);
///or
 const orderIdDetails = await page.locator("div.col-text").textContent();
 await expect(responseOrderidToken.orderId.includes(orderIdDetails)).toBeTruthy();


})