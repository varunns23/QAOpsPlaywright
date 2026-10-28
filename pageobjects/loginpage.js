

class loginpage{

constructor(page){

 this.page = page;   
 this.username =  page.locator("input#userEmail");
 this.password = page.locator("[type='password']");
 this.loginButton = page.locator("input#login");

}

async navigateToLoginPage(){
    await this.page.goto("https://rahulshettyacademy.com/client"); //to navigate to the url
}


async login(username, password){
   await this.username.type(username);
    await this.password.type(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
await this.page.locator(".card-body").first().waitFor();
}

}

module.exports = {loginpage};