

class ordershistorypage{
    constructor(page){
        this.page = page;
        this.allorderids = page.locator("tr.ng-star-inserted");
    }


async viewOrderDetails(trimmedorderid) {

    const orderidscount = await this.allorderids.count();
    
    for(let i=0;i<orderidscount;i++){
    
        const textcont = await this.allorderids.nth(i).locator("th").textContent();
    
        if(textcont === trimmedorderid){
        //or if(trimmedorderid.includes(textcont))    
            await this.allorderids.nth(i).locator("td button.btn-primary").click();
            //or this.allorderids.nth(i).locator("button").first().click();
            break;
        }
    }


}
}

module.exports = {ordershistorypage};