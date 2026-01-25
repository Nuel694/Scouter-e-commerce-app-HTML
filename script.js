console.log("script loaded");

/* Cart state */
let cart = [];

/* Menu toggle logic */
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

navItems.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

/* Product cart logic */
const addToCartButtons = document.querySelectorAll(".product-card button");

addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const product = {
      id: button.dataset.id,
      name: button.dataset.name,
      price: Number(button.dataset.price),
      quantity: 1
    };

    addToCart(product);
  });
});

function addToCart(product) {
  const existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push(product);
  }

  console.log(cart);
}
