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

/** Admin page SPA */
var subteam = document.querySelector(".subteam-navbar");
if (subteam) {
  subteam.addEventListener("click", function(event){
    const el = event.target.getAttribute("name");
    switch (el) {
      case "img":
        console.log("yes");
        break;
      default:
        handleSubTeamDetail();
        break;
    }
  });
};

function handleSubTeamImg(){
  
}
function handleSubTeamDetail(){
  const subTeamBody = document.querySelector('.subteam-body');
  let newEl = '<div class="subteam-des">';
  newEl += '<p>{{team_detail}}</p>';
  newEl += '</div>';
  const data = Handlebars.compile(newEl);
  subTeamBody.insertAdjacentHTML('beforeend',data);
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

