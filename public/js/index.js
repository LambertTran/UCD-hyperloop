'strict mode';
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

var box = document.querySelectorAll('.effect');
var animation = " fadeInUp";
window.addEventListener('scroll', function(){
  box.forEach(function(el){
    if (IsElementInView(el) && !el.classList.contains(animation.trim())){
      el.className += animation;
      el.style.opacity = '1';
    } 
  })
})

function IsElementInView(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom*0.9 <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

