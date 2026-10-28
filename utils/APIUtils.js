class APIUtils{

constructor(newapicontext, loginpayload)
{
this.newapicontext = newapicontext; //this ensures this.newapicontext can be used in enitire class
this.loginpayload = loginpayload;
}

/////////////////////method for token
async getToken() {

const apiresponse = await this.newapicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",  //using post method
    {
        data: this.loginpayload    //sending data
    } 
)

    const loginresponsejson = await apiresponse.json(); //gets json of response
    const token = loginresponsejson.token; //response has token,userid,message. Extracting token here
    console.log("token = "+token);
    return token;

}


///////////////////method to create order
async createorder(orderpayload) {

    let response = {};

    response.token = await this.getToken();

    const orderapiresponse = await this.newapicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {

        data: orderpayload,
        headers:{
            'Authorization': response.token,
             'Content-Type': 'application/json'

                }
        
    });

 const orderresponsejson = await orderapiresponse.json();
console.log(orderresponsejson);
const orderId = orderresponsejson.orders[0];
response.orderId = orderId;
return response;

}


}

module.exports = {APIUtils};