const { test,expect } = require('@playwright/test');
 
 
test('@QW Security test request intercept', async ({ page }) => {
 
    //login and reach orders page
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
 
    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    async route =>{
        //Using continue to send worng url to the browser and test whether it will show error in the browser
        route.continue({url : 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=640c9f0e1a2b3d6f5c8e4b7d'});
    }
    )
    
    await page.locator("Button:has-text('View')").first().click(); //This can be used for button
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

}

)