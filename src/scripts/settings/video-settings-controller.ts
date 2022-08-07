const dropDowns = document.querySelectorAll(".dropdown");
//loop through all dropdown element
dropDowns.forEach((dropDown) => {
 //get inner elements from each dropdown
 const select = dropDown.querySelector(".select");
 const arrow = dropDown.querySelector(".arrow");
 const menu = dropDown.querySelector(".menu");
 const menuItems = dropDown.querySelectorAll(".menu > li");
 const selectTitle = dropDown.querySelector<HTMLSpanElement>(".select-title");

 //add a click event to the select element
 select.addEventListener("click", () => {
  //add the clicked select style to the select element
  select.classList.toggle("select-clicked");
  //rotate arrow up
  arrow.classList.toggle("arrow-rotate");
  //add the open stye to the menu element
  menu.classList.toggle("menu-open");
 });

 // loop throught all item element
 menuItems.forEach((item:HTMLLIElement) => {
  // add click event to item element
  item.addEventListener("click", () => {
   // change selected inner text to clicked item inner text
   selectTitle.textContent = item.textContent;
   //add the clicked select style to the select element
   select.classList.remove("select-clicked");
   // rotate arrow down
   arrow.classList.remove("arrow-rotate");
   //close the menu element
   menu.classList.remove("menu-open");
   //remove active class from all menuitems elements
   menuItems.forEach((item) => {
    item.classList.remove("active-dropdown");
   });
   //add active class to clicked item element
   item.classList.add("active-dropdown");
  });
 });
});
