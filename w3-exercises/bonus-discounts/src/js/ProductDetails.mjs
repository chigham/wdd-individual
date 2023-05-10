// this class is meant to handle adding the details to the page from the 
// desiired data source


// constructor(): This is recommended for classes.
// init(): There are a few things that need to happen before our class can be used. Some 
// will happen in the constructor and will happen automatically. Others it is nice 
// to have more control over and so we will place them into an init method.
// addToCart(): This is the function that is currently in product.js. Move it here.
// renderProductDetails(): Method to generate the HTML to display our product.


import { setLocalStorage, getLocalStorage, clearLocalStorage } from "./utils.mjs";

// create a function that will add the product to our new index page
function productTemplate(product){
    return `
    <section class="product-detail">
      <h3>${product.Brand.Name}</h3>

      <h2 class="divider">${product.NameWithoutBrand}</h2>

      <img
        class="divider"
        src="${product.Image}"
        alt="${product.NameWithoutBrand}"
      />

      <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>

      <p class="product__color">${product.Colors[0].ColorName}</p>

      <p class="product__description">${product.DescriptionHtmlSimple}</p>

      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
    </section>
  `;
}

export default class ProductDetails {
    constructor(productID, dataSource) {
    this.productID = productID;
    this.dataSource = dataSource;
    this.product = null;
  }

  addToCart(){
  const cart = getLocalStorage("so-cart") || []; // retrieve current cart data or create a new empty array if it doesn't exist
  
  cart.push(this.product); // add new product to cart array
  setLocalStorage("so-cart", cart); // save updated cart array to local storage
  //clearLocalStorage(); // clear storage if needed if you start with any values that are not desired you will need to
  }

  async init(){
    this.product = await this.dataSource.findProductById(this.productID);
    console.log(this.product);

    // create the html for the page
    const productHtml = productTemplate(this.product);
    document.getElementById('productDetails').innerHTML = productHtml;

    document.getElementById('addToCart')
    .addEventListener('click', () => this.addToCart()); // I needed to create an 'anonomys function
    // without it the code would just execute add to cart on load
    // this is cause addEventListener() method expects a function as its second argument, but this.addToCart(product) is a function call. 
    // By wrapping this.addToCart(product) inside an anonymous function we are making a new function that is assosiated with the add to cart button 

//     you can use the bind() method to bind the addToCart() method to the ProductDetails instance and pass the product object as an argument, like this:
// document.getElementById('addToCart')
//   .addEventListener('click', this.addToCart.bind(this, product));
// In this code, this.addToCart.bind(this, product) returns a new function that calls the 
//addToCart() method with the ProductDetails instance as this and the product object as the first argument.
  }


}
