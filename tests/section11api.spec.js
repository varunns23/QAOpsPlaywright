const {test, expect, request} = require('@playwright/test');

const loginpayload = {userEmail: "client123@gmail.com", userPassword: "Test@123"}; //get this key value pair from payload
let token; // initia;izing here to use this globally
 
const orderpayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let orderId;  //if you dont initialize immediately use 'let'


test.beforeAll( async()=>{   //executes before all the test methods
//for login ----------------------------
const newapicontext = await  request.newContext();

const apiresponse = await newapicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",  //using post method
    {
        data: loginpayload    //sending data
    } 
)

    await expect(await apiresponse.ok()).toBeTruthy();  //200 201... checks whether the response is 200ok

    const loginresponsejson = await apiresponse.json(); //gets json of response
    token = loginresponsejson.token; //response has token,userid,message. Extracting token here
    console.log("token = "+token);


   //for orderid---------------------------------
const orderapiresponse = await newapicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {

        data: orderpayload,
        headers:{
            'Authorization': token,
             'Content-Type': 'application/json'

                },
        
    })

 const orderresponsejson = await orderapiresponse.json();
console.log(orderresponsejson);
orderId = orderresponsejson.orders[0];


});





test('client app E2E test case', async ({page}) => {

    //Handling login using API token

await page.addInitScript(tokenvalue =>{    //here running one javascript to taken token.tokenvalue is one dummy variable to token's value

window.localStorage.setItem('token',tokenvalue); //javsscript to insert item in the local storage.It accepts key value pair.token is the key abd tokenvalue is pair

}, token ); //tokenvalue's values is token(taken from test.beforeall());


await page.goto("https://rahulshettyacademy.com/client"); //to navigate to the url

// await page.locator("input#userEmail").fill("client123@gmail.com"); //to fill the username field
// await page.locator("[type='password']").fill("Test@123");
// await page.locator("input#login").click(); //to click on the sign in button

// await page.waitForLoadState('networkidle');
//  await page.locator(".card-body").first().waitFor();

// const allproducts = page.locator(".card-body");
// const count = await allproducts.count(); //to get the count of all the products in the page
// const productname = 'ZARA COAT 3'; 


// for (let i=0;i<count;i++){

//   if( await allproducts.nth(i).locator("b").textContent() === productname){

//    await allproducts.nth(i).locator("text= Add To Cart").click();
//    //// here better approach  = await allproducts.nth(i).getByRole('button', { name: 'Add To Cart' }).click();
 
//    break; 

// }   
// }
// await page.locator("[routerlink = '/dashboard/cart']").click(); //to click on the cart link in the header to navigate to the cart page
// await page.locator("li.items").first().waitFor(); //to wait for the first item in the cart to be visible before proceeding to the next step. This is to ensure that the product is added to the cart before proceeding to the next step.
// const bool =await page.locator("h3:has-text('Zara coat 3')").isVisible();//this is not css selector but a text selector which is provided by playwright to locate the element based on the text content of the element using the taganme.h3 is the tagname.
// await expect(bool).toBeTruthy(); //to assert that the product is added to the cart or not. toBeTruthy() is used to check if the value is true or not. If the value is true then the test case will pass otherwise it will fail.
////Also you can use  = await expect(page.locator("h3:has-text('Zara coat 3')")).toBeVisible();
// await page.locator("text=Checkout").click();


//  await page.locator("[placeholder='Select Country']").pressSequentially("ind");
 ///This step may occasionally fail if the application server is slow due to heavy traffic. In such cases, 
 /// you can introduce a delay and rewrite the step as = 
 ///await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
//  const dropdownresults = await page.locator("section.ta-results");
//  await dropdownresults.waitFor();
//  const count2 = await dropdownresults.locator("button").count();

//  for(let i=0;i<count2;i++){

//      const text = await dropdownresults.locator("button").nth(i).textContent();

//      if(text===" India"){

//         await dropdownresults.locator("button").nth(i).click();
//          break;
//      }

//  }

//  await expect(page.locator("div.user__name [type='text']").first()).toHaveText("client123@gmail.com");//to verify username populated
//  await page.locator("text=Place Order ").click(); //to click place order button
//  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");// to verify text
//  const orderid = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
//  console.log("The orderid is "+orderid);


 ///orders page---------------------------------------------
///const trimmedorderid = orderid.split(" ");
///console.log(trimmedorderid[2]);
            ///OR
//  const orderidsplit = await  orderid.split("|");
// const trimmedorderid = await  orderidsplit[1].trim();
// console.log("Orderid after trimming the spaces is "+trimmedorderid);

await page.locator("li [routerlink='/dashboard/myorders']").click();
 

await page.waitForLoadState('networkidle');
await page.locator("tr.ng-star-inserted").first().waitFor();

const allorderid = await page.locator("tr.ng-star-inserted");
const orderidscount = await allorderid.count();

for(let i=0;i<orderidscount;i++){

    const textcont = await allorderid.nth(i).locator("th").textContent();

    //or if(textcont === trimmedorderid){
     if(orderId.includes(textcont))   {
        await allorderid.nth(i).locator("td button.btn-primary").click(); //to click respective veiw button
        //or allorderid.nth(i).locator("button").first().click();
        break;
    }
}

///console.log(await page.locator("div.col-text").textContent());
///await expect(page.locator("div.col-text")).toHaveText(trimmedorderid);
///or
 const orderIdDetails = await page.locator("div.col-text").textContent();
 await expect(orderId.includes(orderIdDetails)).toBeTruthy();


})