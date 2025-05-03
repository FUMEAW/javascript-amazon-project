import { addToCart, cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCents } from "./utils/utils.js";

let elements = "";

products.forEach((product) => {
  const templateString = `
        <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src=${product.image}>
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${formatCents(product.priceCents)}
        </div>

        <div class="product-quantity-container">
          <select class= "js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-cart" data-product-name="${product.name}"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>`;
  elements += templateString;
});

document.querySelector(".js-product-grid").innerHTML = elements;

function updateCart(timeout, productId, cartQuantity) {
  if (!(timeout === undefined)) {
    clearTimeout(timeout);
  }
  cart.forEach((product) => {
    cartQuantity += product.quantity;
  });
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  document
    .querySelector(`.js-added-to-cart-${productId}`)
    .classList.add("added-to-cart-active");
  timeout = setTimeout(
    () =>
      document
        .querySelector(`.js-added-to-cart-${productId}`)
        .classList.remove("added-to-cart-active"),
    2000,
  );
  return timeout;
}
document.querySelectorAll(".js-add-cart").forEach((button) => {
  let timeout;
  let cartQuantity = 0;
  const { productId } = button.dataset;
  button.addEventListener("click", () => {
    addToCart(productId);

    timeout = updateCart(timeout, productId, cartQuantity);
  });
});
