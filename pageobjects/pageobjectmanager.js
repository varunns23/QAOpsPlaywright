const {loginpage} = require('../pageobjects/loginpage');//importing the loginpage class from the pageobjects folder to access the methods of the class
const {dashboard} = require('../pageobjects/dashboard');//importing the dashboard class from the pageobjects folder to access the methods of the class
const {cartAndCheckout} = require('../pageobjects/cartAndCheckout');//importing the cartAndCheckout class from the pageobjects folder to access the methods of the class
const {ordershistorypage} = require('../pageobjects/ordershistorypage');//importing the ordershistorypage class from the pageobjects folder to access the methods of the class

class pageobjectmanager{
    constructor(page){
        this.page = page;
        this.Loginpage = new loginpage(page); //to create an object of the loginpage class to access the methods of the class
        this.Dashboardpage = new dashboard(page); //to create an object of the dashboard class to access the methods of the class
        this.CartAndCheckout = new cartAndCheckout(page); //to create an object of the cartAndCheckout class to access the methods of the class
        this.OrdersHistoryPage = new ordershistorypage(page); //to create an object of the ordershistorypage class to access the methods of the class
    }

    getLoginpage(){
        return this.Loginpage;
    }

    getDashboardpage(){
        return this.Dashboardpage;
    }

    getCartAndCheckout(){
        return this.CartAndCheckout;
    }

    getOrdersHistoryPage(){
        return this.OrdersHistoryPage;
    }

}

module.exports = {pageobjectmanager};