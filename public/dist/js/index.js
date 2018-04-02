'use strict';
'strict mode';

document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    var HandleCloseModal = function HandleCloseModal(event) {
      var modal = document.querySelector('.show-modal');
      modal.classList.remove('show-modal');
    };

    var HandleOpenModal = function HandleOpenModal(event) {
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
    };

    /** Toggle text */


    var toggleText = function toggleText() {
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
    };

    /** Check if document is loaded */
    var isReady = false;
    var loader = document.querySelector('.loader-container');
    var wrapper = document.querySelector('.wrapper');
    setTimeout(function () {
      isReady = true;
      loader.style.display = 'none';
      wrapper.style.display = 'block';
    }, 100);

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

    var text2Toggle = document.querySelector('.toggle-text');
    var mainText = document.querySelector('.main-text');
    if (text2Toggle && mainText && document.readyState === 'complete') {
      setTimeout(function () {
        toggleText();
      }, 200);
    }
  }
};