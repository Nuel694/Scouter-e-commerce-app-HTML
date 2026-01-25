
/*This code is for toggling the menu links*/

const menuToggle = document.querySelector(".menu-toggle");

/* document → the entire web page

querySelector() → finds one element in the page

".menu-toggle" → a CSS selector (class) */



const navLinks = document.querySelector(".nav-links");

/*This is to select the hamburger button

This is to select the navigation links.

Same idea:

Finds the <ul> that contains your menu links

Stores it so we can change its behavior

At this point:

menuToggle → the ☰ button

navLinks → the hidden menu list*/



menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

/*This is the code that runs when you click the hamburger button.

addEventListener → waits for something to happen

"click" → the event we care about

() => {} → a function that runs when the click happens

'HOW CSS AND JAVASCRIPT WORK TOGETHER HERE'
eg.
 .nav-links {
  display: none;
}

.nav-links.active {
  display: flex;
}*/
