'use strict';
'strict mode';
/** Check if document is loaded */

if (checkLoaded) {
  var loader = document.querySelector('.loader-container');
  setTimeout(function () {
    loader.style.display = "none";
  }, 1000);
}

function checkLoaded() {
  return document.readyState === 'complete';
}

/** Animation effect on scroll */
var box = document.querySelectorAll('.effect');
var animation = " fadeInUp";
window.addEventListener('scroll', function () {
  box.forEach(function (el, index) {
    setTimeout(function () {
      if (IsElementInView(el) && !el.classList.contains(animation.trim())) {
        el.className += animation;
        el.style.opacity = '1';
      }
    }, 500 * index);
  });
  function IsElementInView(element) {
    var rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom * 1.1 <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  }
});

/** Display message */
var message = document.querySelector('.message');
if (message) {
  setTimeout(function () {
    message.style.opacity = '1';
  }, 500);
  setTimeout(function () {
    message.style.opacity = '0';
  }, 3000);
}

/** Modal */
var uploadBtn = document.querySelectorAll('#upload-btn');
var cancelBtn = document.querySelectorAll('#cancel');
if (uploadBtn && uploadBtn.length > 0) {
  uploadBtn.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
      return HandleOpenModal(event);
    });
  });
}

if (cancelBtn) {
  cancelBtn.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
      return HandleCloseModal(event);
    });
  });
}

function HandleCloseModal(event) {
  var modal = document.querySelector('.show-modal');
  modal.classList.remove('show-modal');
}

function HandleOpenModal(event) {
  var targetModal = event.target.getAttribute('name');
  var modal = void 0;
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
    playerVars: {
      autoplay: 1,
      controls: 0,
      showinfor: 0,
      modetbranding: 1,
      loop: 1,
      fs: 0,
      cc_load_policy: 0,
      iv_load_policy: 3,
      autohide: 1,
      mute: 1
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
var text2Toggle = document.querySelector('.toggle-text');
var mainText = document.querySelector('.main-text');
if (text2Toggle && mainText) {
  toggleText();
}

function toggleText() {
  var expanded = false;
  text2Toggle.style.height = mainText.scrollHeight + 40 + 'px'; // account for margin and padding
  mainText.addEventListener('click', handleToggleText);

  function handleToggleText() {
    var toggleBtn = document.querySelector('#toggle-text-btn');
    var parent = this.parentNode;
    if (expanded) {
      expanded = false;
      toggleBtn.style.transform = 'rotate(0deg)';
      // account for margin and padding
      parent.style.height = mainText.scrollHeight + 30 + 'px';
      return;
    }
    expanded = true;
    parent.style.height = text2Toggle.scrollHeight + 'px';
    toggleBtn.style.transform = 'rotate(180deg)';
  }
}