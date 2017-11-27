/** active navigation bar for admin page **/
var ul = document.getElementById("navbar-admin").getElementsByTagName('li');
// ul.forEach.addEventListener("click",addActiveClass);
for(var i=0; i<ul.length; ++i){
  ul[i].addEventListener("click",addActiveClass);
}
function addActiveClass(e){
  el = document.querySelector('.navbar-active');
  if( el != null){
    el.classList.remove('navbar-active');
  }
  e.target.className = "navbar-active";
}