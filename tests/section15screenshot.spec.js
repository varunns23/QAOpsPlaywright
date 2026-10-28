const {test, expect} = require('@playwright/test');

test('to test the screenshot functionality', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/"); //to navigate to the url
    await page.screenshot({path: 'fullpagescreenshot.png'}); //to take the screenshot of the full page and save it in the project folder with the name fullpagescreenshot.png})
 await page.locator("#displayed-text").screenshot({path: 'elementsscreenshot.png'}); //to take the screenshot of the specific element and save it in the project folder with the name elementsscreenshot.png

});




test('to test the screenshop compare functionality', async ({page}) => {

await page.goto("https://google.com/"); //to navigate to the url

//await page.screenshot({path: 'googlehomepage.png'});//to take the screenshot of the full page and save it in the project folder with the name googlehomepage.png
expect(await page.screenshot()).toMatchSnapshot('googlehomepage.png'); //to compare the screenshot taken with the existing screenshot in the project folder with the name googlehomepage.png

});