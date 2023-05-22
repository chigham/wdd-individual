import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();
const category = getParam("category");
const dataSource = new ExternalServices(category);
const element = document.querySelector(".product-list");
//console.log(category);
//console.log(dataSource);
//console.log(element);
const listing = new ProductList(category, dataSource, element);

listing.init();
