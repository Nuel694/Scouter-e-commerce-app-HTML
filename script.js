/* =========================================================
   ENSURE JAVASCRIPT IS LOADED
========================================================= */
console.log("script loaded");

/* =========================================================
   CART STATE & STORAGE
========================================================= */

let cart = [];

const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");

/* Load cart */
const storedCart = localStorage.getItem("cart");
if (storedCart) {
  cart = JSON.parse(storedCart);
}

/* Save cart */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* =========================================================
   CART CALCULATIONS
========================================================= */

function calculateCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (!cartCount) return;

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartCount.textContent = totalQuantity;
}

/* =========================================================
   MENU TOGGLE
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

/* =========================================================
   ADD TO CART
========================================================= */

document.querySelectorAll(".product-card button").forEach((button) => {
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
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push(product);
  }

  saveCart();
  renderCart();
}

/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {
  if (!cartItemsContainer || !cartTotalElement) return;

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>No items in your cart.</p>";
    cartTotalElement.textContent = "";
    updateCartCount();
    return;
  }

  cart.forEach((item) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <p>
        ${item.name} — ₦${item.price.toLocaleString()}
        <button class="qty-btn decrease" data-id="${item.id}" ${item.quantity === 1 ? "disabled" : ""}>−</button>
        <span>${item.quantity}</span>
        <button class="qty-btn increase" data-id="${item.id}">+</button>
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </p>
    `;

    cartItemsContainer.appendChild(div);
  });

  cartTotalElement.textContent = `Total: ₦${calculateCartTotal().toLocaleString()}`;

  attachQuantityHandlers();
  attachRemoveHandlers();
  updateCartCount();
}

/* =========================================================
   REMOVE ITEM
========================================================= */

function attachRemoveHandlers() {
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      cart = cart.filter((item) => item.id !== btn.dataset.id);
      saveCart();
      renderCart();
    });
  });
}

/* =========================================================
   QUANTITY CONTROLS
========================================================= */

function attachQuantityHandlers() {
  document.querySelectorAll(".increase").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = cart.find((i) => i.id === btn.dataset.id);
      item.quantity++;
      saveCart();
      renderCart();
    });
  });

  document.querySelectorAll(".decrease").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = cart.find((i) => i.id === btn.dataset.id);
      if (item.quantity > 1) {
        item.quantity--;
        saveCart();
        renderCart();
      }
    });
  });
}

/* =========================================================
   CLEAR CART
========================================================= */

const clearCartButton = document.getElementById("clear-cart");

if (clearCartButton) {
  clearCartButton.addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
  });
}


/* =========================================================
   INITIAL RENDER
========================================================= */

renderCart();
