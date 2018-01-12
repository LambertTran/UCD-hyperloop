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

/** Animation effect on scroll */
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

/** Display message */
var message = document.querySelector('.message');
if (message) {
  message.style.opacity = '1';
  setTimeout(() => {
    message.style.opacity = '0';
  }, 2000);
}

/** Modal */
var uploadBtn = document.querySelectorAll('#upload-btn');
var cancelBtn = document.querySelectorAll('#cancel');
if (uploadBtn && uploadBtn.length > 0) {
  uploadBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => HandleOpenModal(event));
  })
}

if (cancelBtn) {
  cancelBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => HandleCloseModal(event));
  })
}

function HandleCloseModal(event) {
  const modal = document.querySelector('.show-modal');
  modal.classList.remove('show-modal');
}

function HandleOpenModal(event){
  const targetModal = event.target.getAttribute('name');
  let modal;
  switch (targetModal) {
    case 'detail':
      modal = document.getElementById('upload-subteam-detail');
      modal.classList.add('show-modal');
      break;
    case 'image':
      modal = document.getElementById('upload-subteam-img');
      modal.classList.add('show-modal');
      break;
  }
}

function IsElementInView(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom*0.9 <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

