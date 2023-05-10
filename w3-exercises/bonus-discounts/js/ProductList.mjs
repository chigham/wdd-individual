import {renderListWithTemplate} from "./utils.mjs"


// ProductList.mjs
function productCardTemplate(product) {
    if (product.ListPrice === product.FinalPrice) {
        return `<li class="product-card">
            <a href="product_pages/index.html?product=${product.Id}">
            <img src="${product.Image}" alt="Image of ${product.Name}">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
        </li>`;
    } else {
        return `<li class="product-card">
            <a href="product_pages/index.html?product=${product.Id}">
            <img src="${product.Image}" alt="Image of ${product.Name}">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price"><span class="crossout">$${product.ListPrice}</span> <span class="discount-price">$${product.FinalPrice}</span></p>
        </a>
        </li>`;
    }
}
    
export default class ProductListing{
    constructor(catagory, dataSource, listElement){
        this.catagory = catagory;
        this.dataSource = dataSource; //json file
        this.listElement = listElement; // location in html it will be added to
    }
    async init(){
        const list = await this.dataSource.getData();
        console.log(list);
        this.renderList(list);
        
    }
    
    renderList(list){
        renderListWithTemplate(productCardTemplate,this.listElement,list);
    }
}