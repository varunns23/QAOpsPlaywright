const {test, expect} = require('@playwright/test');
const {pageobjectmanager} = require('../pageobjects/pageobjectmanager');//importing the pageobjectmanager class from the pageobjects folder to access the methods of the class
const testData = JSON.parse(JSON.stringify(require('../utils/clientappE2EPOM_testdata.json')));//importing the test data from the utils folder to use in the test case
// here json -> string -> javascript object. we are doing this because the test data is in json format and we need to convert it to javascript object to use it in the test case. we are using JSON.stringify() to convert the json to string and then using JSON.parse() to convert the string to javascript object.
const {customtest} = require('../utils/clientappCustomfixture')//importing the custom fixture from the utils folder to use in the test case




//sending data to the test case using json file. we can use the test data in the test case by importing the json file. we can use any name for the json file but it is recommended to use the same name as the test case name to avoid confusion.

//TEST1----------------------------------------------------------------------------

test.describe.configure({ mode: 'parallel' }); //to run the test cases in parallel. we can also set it to serial to run the test cases in serial.
//if({ mod: 'serial' }) is given, then test cases will run in serial. in this case if first case is failed, then second case will not run. This mode is used when there interdependency between test cases.
//But if we dont give any mode, then test cases will run serial by default but there wont be any dependency.

for(const data of testData) {            // here for loop is used to iterate through the test data and run the test case for each data set. this is called data driven testing. we are using for of loop because it is more readable and easy to understand. we can also use f
     
test(`client app E2E test case ${data.productname}`, async ({page}) => { //here we are using template literals to print the product name in the test case name. this is called dynamic test case name.Instead of '' , we have to use `` to use template literals.
//we are writing test case name like this to ensure each test case name is unique.

const  PageObjectManager = new pageobjectmanager(page); //to create an object of the pageobjectmanager class to access the methods of the class



//LOGIN PAGE------------------------------------------------
const Loginpage = PageObjectManager.getLoginpage(); //to create an object of the loginpage class to access the methods of the class
await  Loginpage.navigateToLoginPage(); //to navigate to the login page
await Loginpage.login(data.username, data.password); //to login to the application


//DASHBOARD PAGE------------------------------------------------

const Dashboardpage = PageObjectManager.getDashboardpage(); //to create an object of the dashboard class to access the methods of the class
await Dashboardpage.addProductToCart(data.productname); //to add the product to the cart
await Dashboardpage.navigateToCartPage(); //to navigate to the cart page



//CART PAGE------------------------------------------------
const CartAndCheckout = PageObjectManager.getCartAndCheckout(); //to create an object of the cartAndCheckout class to access the methods of the class
await CartAndCheckout.verifyProductAddedToCart(data.productname); //to verify the product is added to the cart or not

await CartAndCheckout.checkoutAndPlaceOrder(data.countryname, data.username); //callling the checkoutAndPlaceOrder method to checkout and place the order

 // thankyou page
 const trimmedorderid = await CartAndCheckout.verifyThankyouPageAndOrderId();
 console.log("The orderid is "+trimmedorderid);
 await CartAndCheckout.navigateToMyOrdersPage(); //to navigate to the my orders page



 //ORDERS HISTORY PAGE------------------------------------------------
const OrdersHistoryPage = PageObjectManager.getOrdersHistoryPage(); //to create an object of the ordershistorypage class to access the methods of the class
await OrdersHistoryPage.viewOrderDetails(trimmedorderid); //to view the order details of the order placed

await expect(page.locator("div.col-text")).toHaveText(trimmedorderid); //to verify the order id in the order details page is same as the order id in the thankyou page
//or
//await const orderIdDetails = page.locator("div.col-text").textContent();
// await expect(orderId.includes(orderIdDetails)).toBeTruthy();


}
)
}


//testing git











//sending data to the test case using custom fixture. we can use the fixture name to access the fixture in the test case. we can use any name for the fixture. we can also use the same name for multiple fixtures but it is not recommended because it will create confusion.
//TEST2------------------------------------------------

//@web => this is called tag. we can use the tag to run the test cases with the same tag. we can use any name for the tag but it is recommended to use the same name as the test case name to avoid confusion.
//Like this we can tag anything for different test cases and run them with --grep tagname.
customtest('@web client app E2E test case with custom fixture', async ({page, testdatafororder}) => { //here we are using custom fixture to pass the test data to the test case. we can use the fixture name to access the fixture in the test case. we can use any name for the fixture. we can also use the same name for multiple fixtures but it is not recommended because it will create confusion.
//we are writing test case name like this to ensure each test case name is unique.

const  PageObjectManager = new pageobjectmanager(page); //to create an object of the pageobjectmanager class to access the methods of the class



//LOGIN PAGE------------------------------------------------
const Loginpage = PageObjectManager.getLoginpage(); //to create an object of the loginpage class to access the methods of the class
await  Loginpage.navigateToLoginPage(); //to navigate to the login page
await Loginpage.login(testdatafororder.username, testdatafororder.password); //to login to the application


//DASHBOARD PAGE------------------------------------------------

const Dashboardpage = PageObjectManager.getDashboardpage(); //to create an object of the dashboard class to access the methods of the class
await Dashboardpage.addProductToCart(testdatafororder.productname); //to add the product to the cart
await Dashboardpage.navigateToCartPage(); //to navigate to the cart page



//CART PAGE------------------------------------------------
const CartAndCheckout = PageObjectManager.getCartAndCheckout(); //to create an object of the cartAndCheckout class to access the methods of the class
await CartAndCheckout.verifyProductAddedToCart(testdatafororder.productname); //to verify the product is added to the cart or not

await CartAndCheckout.checkoutAndPlaceOrder(testdatafororder.countryname, testdatafororder.username); //callling the checkoutAndPlaceOrder method to checkout and place the order

 // thankyou page
 const trimmedorderid = await CartAndCheckout.verifyThankyouPageAndOrderId();
 console.log("The orderid is "+trimmedorderid);
 await CartAndCheckout.navigateToMyOrdersPage(); //to navigate to the my orders page



 //ORDERS HISTORY PAGE------------------------------------------------
const OrdersHistoryPage = PageObjectManager.getOrdersHistoryPage(); //to create an object of the ordershistorypage class to access the methods of the class
await OrdersHistoryPage.viewOrderDetails(trimmedorderid); //to view the order details of the order placed

await expect(page.locator("div.col-text")).toHaveText(trimmedorderid); //to verify the order id in the order details page is same as the order id in the thankyou page
//or
//await const orderIdDetails = page.locator("div.col-text").textContent();
// await expect(orderId.includes(orderIdDetails)).toBeTruthy();


}
)
