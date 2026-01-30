/*ENSURING JAVASCRIPT IS WORKING--------------------------------------------------------------------*/

console.log("script loaded");

/*CART STATE----------------------------------------------------------------------------------*/

let cart = [];

const cartItemsContainer = document.getElementById("cart-items");

const cartTotalElement = document.getElementById("cart-total");

function calculateCartTotal() {
  let total = 0;

  cart.forEach((item) => {
    console.log(
      "price:",
      item.price,
      "| type:",
      typeof item.price,
      "| quantity:",
      item.quantity,
    );

    total += item.price * item.quantity;
  });

  console.log("TOTAL:", total);
  return total;
}

/*MENU TOGGLE LOGIC--------------------------------------------------------------------------------------------*/

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

/*PRODUCT CART LOGIC---------------------------------------------------------------------------*/

const addToCartButtons = document.querySelectorAll(".product-card button");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const product = {
      id: button.dataset.id,
      name: button.dataset.name,
      price: Number(button.dataset.price),
      quantity: 1,
    };

    addToCart(product);
  });
});

function addToCart(product) {
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push(product);
  }

  renderCart();

  console.log(cart);
}

function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>No items in your cart yet.</p>";
    cartTotalElement.textContent = "";
    return;
  }

  cart.forEach((item) => {
    const cartItem = document.createElement("div");

    cartItem.innerHTML = `
      <p>
        ${item.name} — ₦${item.price} × ${item.quantity}
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </p>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  attachRemoveHandlers();
}

function attachRemoveHandlers() {
  const removeButtons = document.querySelectorAll(".remove-btn");

  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      removeFromCart(id);
    });
  });
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
  console.log(cart);
}

const total = calculateCartTotal();
cartTotalElement.textContent = `Total: ₦${total.toLocaleString()}`;
