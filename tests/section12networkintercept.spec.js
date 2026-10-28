//to modify the response before sending to the browser we can use route method of playwright.This helps in mocking the response of the api call and we can modify the response before sending to the browser. This is useful in testing scenarios where we want to simulate different responses from the server without actually making a network request.
//This is only for that particular api call and not for all the api calls. We can use route method to intercept the request and modify the response before sending it to the browser. This is useful in testing scenarios where we want to simulate different responses from the server without actually making a network request.
// for example , to very the message when no orders are present in the order page, we can use route method to intercept the request and modify the response before sending it to the browser. This is useful in testing scenarios where we want to simulate different responses from the server without actually making a network request.



const {test, expect, request} = require('@playwright/test');

const {APIUtils} = require('../utils/APIUtils');

const loginpayload = {userEmail: "client123@gmail.com", userPassword: "Test@123"}; //get this key value pair from payload

 
const orderpayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};

let responseOrderidToken;

const fakeorderpayload = {data:[],message:"No Orders"};


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

// In https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a8fe24a21054ba465f6637d - 
//we have to write * instead of id(6a8fe24a21054ba465f6637d) because id is dynamic and it will change every time we run the test. 

// For all the route related method , refer the documentione - https://playwright.dev/docs/api/class-route
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
       const fethedresponse = await  page.request.fetch(route.request());
       let body = JSON.stringify(fakeorderpayload); // converting javascript object to json string

       route.fulfill( 
        {
            fethedresponse,
            body,             //body is the modified response which we want to send to the browser.It is mandatory to send the body in the response. If we dont send the body, the browser will not get any response and it will show an error.


        } );
    }
) ;

await page.locator("li [routerlink='/dashboard/myorders']").click();
await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
console.log(await page.locator(".mt-4").textContent());

})