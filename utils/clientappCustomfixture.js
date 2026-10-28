const base = require('@playwright/test');

exports.customtest = base.test.extend(
{
testdatafororder : {   //this is the name of the fixture. we can use this name to access the fixture in the test case. we can use any name for the fixture. we can also use the same name for multiple fixtures but it is not recommended because it will create confusion.
username : "client123@gmail.com",
password : "Test@123",
productname : "ZARA COAT 3",
countryname : " India"


}


}


)