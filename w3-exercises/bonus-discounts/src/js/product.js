import {
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage,
  getParam,
  loadHeaderFooter,
} from "./utils.mjs";
import ProductData from "./ProductData.mjs"; // gives us the json file we need
import ProductDetails from "./ProductDetails.mjs"; // gathers the data from the json file
loadHeaderFooter();

const productId = getParam("product");
const dataSource = new ProductData("tents");
console.log(productId);

const product = new ProductDetails(productId, dataSource);
product.init();

// add to cart has been moved to productdetails.mjs
