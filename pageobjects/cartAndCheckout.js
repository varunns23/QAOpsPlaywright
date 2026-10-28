const {expect} = require('@playwright/test');

class cartAndCheckout {

    constructor(page) {
        this.page = page;
        this.checkoutButton = page.locator("text=Checkout");
        this.countryInput = page.locator("[placeholder='Select Country']");
        this.dropdownresultsSection = page.locator("section.ta-results");
        this.dropdownresultsButtons = page.locator("section.ta-results").locator("button");
        this.usernameverification = page.locator("div.user__name [type='text']").first();
       this.placeorderbutton = page.locator("text=Place Order ");
       this.thankyoutext = page.locator(".hero-primary");
       this.orderidtext = page.locator(".em-spacer-1 .ng-star-inserted");
       this.ordersbutton = page.locator("li [routerlink='/dashboard/myorders']");


    }


    async verifyProductAddedToCart(productname) {
        const bool = await this.page.locator(`h3:has-text("${productname}")`).isVisible(); ////this is not css selector but a text selector which is provided by playwright to locate the element based on the text content of the element using the taganme.h3 is the tagname.
       //to make any variable value dynamic we can use $variableName in the text selector. here $productname is a variable which will be replaced by the value of the variable productname at runtime. this is called string interpolation. we can also use ${variableName} in the text selector but it is not recommended because it is less readable and hard to understand.

       await expect(bool).toBeTruthy(); //to assert that the product is added to the cart or not. toBeTruthy() is used to check if the value is true or not. If the value is true then the test case will pass otherwise it will fail.
       await this.checkoutButton.click();
}  


async checkoutAndPlaceOrder(countryname, username) {

     await this.countryInput.pressSequentially("ind");
 //This step may occasionally fail if the application server is slow due to heavy traffic. In such cases, 
 // you can introduce a delay and rewrite the step as = 
 //await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
 await this.dropdownresultsSection.waitFor();
 const count2 = await this.dropdownresultsButtons.count();

for(let i=0;i<count2;i++){

     const text = await this.dropdownresultsButtons.nth(i).textContent();

     if(text===countryname){

        await this.dropdownresultsButtons.nth(i).click();
         break;
     }

 }

 await expect(this.usernameverification).toHaveText(username);//to verify username populated
 await this.placeorderbutton.click(); //to click place order button

}


async verifyThankyouPageAndOrderId() {
await expect(this.thankyoutext).toHaveText(" Thankyou for the order. ");// to verify text


 const orderid = await this.orderidtext.textContent();
//const trimmedorderid = orderid.split(" ");
//console.log(trimmedorderid[2]);
            //OR
 const orderidsplit = await  orderid.split("|");
const trimmedorderid = await  orderidsplit[1].trim();
return trimmedorderid;

}

async navigateToMyOrdersPage() {
    await this.ordersbutton.click();
    await this.page.waitForLoadState('networkidle');
await this.page.locator("tr.ng-star-inserted").first().waitFor();

}

}

module.exports = { cartAndCheckout };