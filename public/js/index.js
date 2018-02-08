'strict mode';

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
  setTimeout(() => {
    message.style.opacity = '1';
  }, 500);
  setTimeout(() => {
    message.style.opacity = '0';
  }, 3000);
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

/** Handle background video */
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('video', {
    height: '100%',
    width: '100%',
    videoId: 'Czrc1JfIBRw',
    playerVars:{
      autoplay:1,
      controls:0,
      showinfor:0,
      modetbranding:1,
      loop:1,
      fs:0,
      cc_load_policy:0,
      iv_load_policy:3,
      autohide:1,
      mute:1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(replayVideo, 24000);
    // done = true;
  }
}
function replayVideo() {
  player.seekTo(1);
}


/** Toggle text */
handleScreenSizeChange();
function handleScreenSizeChange(){
  var vpWidth = document.body.clientWidth;
  if (vpWidth < 768) {
    toggleText();
  }
}
window.addEventListener('resize',handleScreenSizeChange);

function toggleText(){
  var toggleText = document.querySelector('.toggle-text');
  var mainText = document.querySelector('.main-text');
  var expanded = false;
  toggleText.style.height = mainText.scrollHeight + 'px';
  mainText.addEventListener('click', handleToggleText );
  
  function handleToggleText(){
    var toggleBtn = document.querySelector('#toggle-text-btn');
    var parent = this.parentNode;
    if (expanded){
      expanded = false;
      toggleBtn.style.transform= 'rotate(0deg)';
      parent.style.height = mainText.scrollHeight + 'px';
      return;
    }
    expanded = true;
    parent.style.height = toggleText.scrollHeight + 'px';
    toggleBtn.style.transform= 'rotate(180deg)';
  }
}
