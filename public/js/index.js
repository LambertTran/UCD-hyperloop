/** active navigation bar for admin page **/
// navbarActivate("nav-admin","nav-admin-active");
/** active navbar for  **/
navbarActivate("nav-client","nav-client-active");

function navbarActivate(element,activeClass){
  var ul = document.getElementById(element).getElementsByTagName('a');
  for(var i=0; i<ul.length; ++i){
    ul[i].addEventListener("click",addActiveClass);
  }
  function addActiveClass(){
    el = document.querySelector('.' +activeClass);
    console.log(this)
    if( el != null){
      el.classList.remove(activeClass);
    }
    this.className = activeClass;
  }
}
