/*ENSURING JAVASCRIPT IS WORKING--------------------------------------------------------------------*/

console.log("script loaded");

/*CART STATE----------------------------------------------------------------------------------*/

let cart = [];

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

  console.log(cart);
}
