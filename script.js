
/*This code is for toggling the menu links*/

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a"); 


/*This code is for toggling on and off menu link*/

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

/*This code is for when you click a link in the nav menu
 and the toggle resets or closes  automatically*/

navItems.forEach(link => {
  link.addEventListener("click", () => {
     navItems.forEach(item => item.classList.remove("active"));
  });
});


