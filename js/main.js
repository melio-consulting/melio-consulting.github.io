/*jshint esversion: 6 */

$(document).ready(function () {

  // Text typing
  let TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  TxtRotate.prototype.tick = function () {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    let that = this;
    let delta = 180 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  };

  let elements = document.getElementsByClassName('txt-rotate');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";

  document.body.appendChild(css);

  // Header Scroll
  // $(window).on('scroll', function() {
  //  var scroll = $(window).scrollTop();
  // 
  //  if ($('#header').data('home')) {
  //    if (scroll >= 50) {
  //      $('#header').addClass('fixed');
  //    } else {
  //      $('#header').removeClass('fixed');
  //    }
  //  }
  // });


  $(window).on('scroll', () => {
    if ($('#homePage').data('home')) {
      requestAnimationFrame(function () {
        let window_height = $(window).height();
        let window_top_position = $(window).scrollTop();
        let window_bottom_position = (window_top_position + window_height);

        let $mlops_element = $('#mlops-svg');
        let mlops_element_height = $mlops_element.outerHeight();
        let mlops_element_top_position = $mlops_element.offset().top;
        let mlops_element_bottom_position = (mlops_element_top_position + mlops_element_height);

        //check to see if this current container is within viewport
        if ((mlops_element_bottom_position >= window_top_position) &&
          (mlops_element_top_position <= window_bottom_position)) {
          $('#devops-mask-circle').attr('cx', (index, currentValue) => {
            devops_value = 100 + (window_bottom_position - mlops_element_top_position) * (200 / mlops_element_height);
            return devops_value < 350 ? devops_value : 350;
          });
          $('#ml-mask-circle').attr('cx', (index, currentValue) => {
            ml_value = 300 - (window_bottom_position - mlops_element_top_position) * (200 / mlops_element_height);
            return ml_value < 50 ? 50 : ml_value;
          });
          $('#devops-mask-circle-text').attr('x', (index, currentValue) => {
            devops_value = (window_bottom_position - mlops_element_top_position) * (200 / mlops_element_height) + 50;
            return devops_value < 270 ? devops_value : 270;
          });
          $('#ml-mask-circle-text').attr('x', (index, currentValue) => {
            ml_value = 320 - (window_bottom_position - mlops_element_top_position) * (200 / mlops_element_height);
            return ml_value < 100 ? 100 : ml_value;
          });
        }
      });
    }
  });


  // Fancybox
  // $('.work-box').fancybox();

  // Flexslider
  // $('.flexslider').flexslider({
  //  animation: "fade",
  //  directionNav: false,
  // });

  // Page Scroll
  var sections = $('section');
  nav = $('nav[role="navigation"]');

  // $(window).on('scroll', function () {
  //  var cur_pos = $(this).scrollTop();
  //  sections.each(function() {
  //    var top = $(this).offset().top - 76;
  //        bottom = top + $(this).outerHeight();
  //    if (cur_pos >= top && cur_pos <= bottom) {
  //        nav.find('a').removeClass('active');
  //        nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
  //    }
  //  });
  // });
  nav.find('a').not('.dropdown-toggle').on('click', function () {
    var $el = $(this);
    id = $el.attr('href');
    $('html, body').animate({
      scrollTop: $(id).offset().top
    }, 500);
    return false;
  });

  // Mobile Navigation
  // $('.nav-toggle').on('click', function() {
  //  $(this).toggleClass('close-nav');
  //  nav.toggleClass('open');
  //  return false;
  // });
  // nav.find('a').on('click', function() {
  //  $('.nav-toggle').toggleClass('close-nav');
  //  nav.toggleClass('open');
  // });
});


const mlops = document.querySelectorAll('.mlops-anim');
observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      entry.target.style.animation = `${entry.target.dataset.transition} 1s forwards ease-out`;
    } else {
      entry.target.style.animation = 'none';
    }
  });
}, {
  rootMargin: "0px 0px -350px 0px"
});

mlops.forEach(image => {
  observer.observe(image);
});

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// function eraseCookie(name) {
//     document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
// }

function cookieConsent() {
  if (!getCookie('allowCookies')) {
    $('.toast').toast('show')
  }
}

// $('#btnDeny').click(()=>{
//     eraseCookie('allowCookies')
//     $('.toast').toast('hide')
// })

$('#btnAccept').click(() => {
  setCookie('allowCookies', '1', 730)
  $('.toast').toast('hide')
})

// load
cookieConsent()

// for demo / testing only
$('#btnReset').click(() => {
  // clear cookie to show toast after acceptance
  eraseCookie('allowCookies')
  $('.toast').toast('show')
})

