const {test, expect} = require('@playwright/test');
const { link } = require('node:fs');


test('more validations tc', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goBack();
    await page.goForward();
    await page.pause();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden(); //to check whether the element is hidden
    
    page.on('dialog',dailog => dailog.accept()); // will accept whenever the pop-up appears in entire testcase. these are for java based pop-ups.
    await page.locator("#confirmbtn").click(); //on clicking this button pop-up will apear
    await page.locator("#mousehover").hover(); //for just hovering
    await page.locator(".mouse-hover-content ").getByRole("link", {name: 'Top'}).click();

    //Switching to different frame
    const framepage = page.frameLocator("#courses-iframe");
    await framepage.locator("li a[href*='lifetime-access']:visible").click(); //Here 2 elements were found for this locator.one is visible and one was not visible. In this case, we can write ': visible' after locator.
    const framepagetext  = await framepage.locator(".text h2").textContent();
    await console.log(framepagetext.split(" ")[1]);

});