export let cart = JSON.parse(localStorage.getItem("cart"));
if (cart == null) {
  cart = [];
}
export function addToCart(productId) {
  let itemMatch;
  const quantity = parseInt(
    document.querySelector(`.js-quantity-selector-${productId}`).value,
  );
  cart.forEach((product) => {
    if (product.productId === productId) {
      const numProduct = parseInt(
        document.querySelector(`.js-quantity-selector-${product.productId}`)
          .value,
      );
      product.quantity += numProduct;
      itemMatch = true;
    }
  });
  if (!itemMatch) {
    cart.push({
      productId,
      quantity,
    });
    console.log(cart);
  }
  saveToLocalStorage();
}

export function saveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
