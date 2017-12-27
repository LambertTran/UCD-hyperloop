/** active navigation bar for admin **/
// navbarActivate("nav-admin","nav-admin-active");
/** active navbar for client site **/
// navbarActivate("nav-client","nav-client-active");


// // add active class to navbar
// function navbarActivate(element,activeClass){
//   var ul = document.getElementById(element).getElementsByTagName('li');
//   for(var i=0; i<ul.length; ++i){
//     ul[i].addEventListener("click",addActiveClass);
//   }
//   function addActiveClass(){
//     el = document.querySelector('.' +activeClass);
//     if( el != null){
//       el.classList.remove(activeClass);
//     }
//     this.className = activeClass;
//   }
// }
window.sr = ScrollReveal();
sr.reveal('.fadeInUp');

