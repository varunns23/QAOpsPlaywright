
class dashboard {

    constructor(page) {
        this.page = page;
        this.allproducts = page.locator(".card-body");
        this.cartButton = page.locator("[routerlink = '/dashboard/cart']");
    }


    async addProductToCart(productname) {

        const count = await this.allproducts.count(); //to get the count of all the products in the page


        for (let i = 0; i < count; i++) {

            if (await this.allproducts.nth(i).locator("b").textContent() === productname) {

                await this.allproducts.nth(i).locator("text= Add To Cart").click();
                // here better approach  = await this.allproducts.nth(i).getByRole('button', { name: 'Add To Cart' }).click();

                break;

            }
        }

    }

    async navigateToCartPage() {
        await this.cartButton.click();
        await this.page.locator("li.items").first().waitFor(); //to wait for the first item in the cart to be visible before proceeding to the next step. This is to ensure that the product is added to the cart before proceeding to the next step.
    }

}


module.exports = { dashboard };