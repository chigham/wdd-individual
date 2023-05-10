import { getLocalStorage, clearLocalStorage, setLocalStorage} from "./utils.mjs";

let cartIndex = 0;

//Moved this in global scope so I don't have to do it in showTotal function
const cartItems = getLocalStorage("so-cart");

export function renderCartContents() {
  
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

// Call function to compute total
showTotal(cartItems);

// Compute the total cost of the items in the cart
function showTotal(cartItems) {

  let totalDiv = document.querySelector(".cart-footer");
  let totalSpan = document.createElement('span');
  let p = document.querySelector(".cart-total");

  if (cartItems == null)
  {
    totalDiv.style.display="none";
  }

  else {

    totalDiv.style.display="block";

    let itemCost = 0;
    let total = 0;

    cartItems.forEach((item) => {

      itemCost = item.FinalPrice;
      total += itemCost;

    });
    
    totalSpan.textContent = `$${total.toFixed(2)}`;
    p.appendChild(totalSpan);
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>
<p class="cart-card__remove" id ="${cartIndex}">remove<p>`; // added a removal button
cartIndex = cartIndex +1;

  return newItem;
}



//clear the contents of the cart 
// Add event listener to the "Clear Cart" button
document.getElementById('clear-cart').addEventListener('click', function() {
  // Call the clear() function to clear the contents of the cart
  clear();
});

function clear() {
  //call the clear local storage
  clearLocalStorage();
  // reload new content
  location.reload();
}


// remove item from index
function removeItem(index){
  index = parseInt(index);
  let products =[];
  products = getLocalStorage("so-cart");
  //console.log(products);
  products.splice(index,1);
  console.log("removed item number: " + index)
  console.log(products);
  setLocalStorage("so-cart", products);
  renderCartContents();
}

// Add a click event listener to the parent element that contains all the remove buttons
document.querySelector('.product-list').addEventListener('click', function(event) {
  // Check if the clicked element is a remove button
  if (event.target.classList.contains('cart-card__remove')) {
    // Get the index of the clicked remove button
    const index = parseInt(event.target.id);
    // Remove the corresponding item from the cart
    removeItem(index);
    location.reload();
  }
});