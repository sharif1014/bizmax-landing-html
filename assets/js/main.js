(function ($) {
  "use strict";

  /*--------------------------------------------------------------
    Scripts initialization
  --------------------------------------------------------------*/
  $.exists = function (selector) {
    return $(selector).length > 0;
  };
  $(function () {
    $(window).trigger('resize');
    mainNav();
    stickyHeader();
    dynamicBackground();
  });
  /*-----------------------------------------------------------------------
  Window loading functionality trigger
  ------------------------------------------------------------------------*/
  $(window).on("load", function () {
    $(window).trigger('resize');
    //preloader();
    calculateWindowLoadTime();
  });
  /*--------------------------------------------------------------
     Window scrolling functionality trigger
     -------------------------------------------------------------*/
  $(window).on("scroll", function () {

  });
  //window load time calculation
  function calculateWindowLoadTime() {
    if (window.performance && window.PerformanceNavigationTiming) {
      const timing = window.PerformanceNavigationTiming;
      const loadTime = timing.navigationStart - timing.loadEventEnd;
      return loadTime;
    } else {
      textContent = 'Performance API is not supported in this browser.';
    }
  }

  /*--------------------------------------------------------------
    1. Mobile Menu
  --------------------------------------------------------------*/
  function mainNav() {
    $(".cs_nav").append('<span class="cs_menu_toggle"><span></span></span>');
    $(".menu_item_has_children").append(
      '<span class="cs_menu_dropdown_toggle"></span>'
    );
    $(".cs_menu_toggle").on("click", function () {
      $(this)
        .toggleClass("cs_toggle_active")
        .siblings(".cs_nav_list")
        .slideToggle();
    });
    $(".cs_menu_dropdown_toggle").on("click", function (e) {
      e.preventDefault();
      $(this).toggleClass("active").siblings("ul").slideToggle();
      $(this).parent().toggleClass("active");
    });
  }
  /*--------------------------------------------------------------
    2. Sticky Header
  --------------------------------------------------------------*/
  function stickyHeader() {
    var $window = $(window);
    var lastScrollTop = 0;
    var $header = $(".cs_sticky_header");
    var headerHeight = $header.outerHeight() + 30;

    $window.scroll(function () {
      var windowTop = $window.scrollTop();
      if (windowTop >= headerHeight) {
        $header.addClass("cs_gescout_sticky");
      } else {
        $header.removeClass("cs_gescout_sticky");
        $header.removeClass("cs_gescout_show");
      }

      if ($header.hasClass("cs_gescout_sticky")) {
        if (windowTop < lastScrollTop) {
          $header.addClass("cs_gescout_show");
        } else {
          $header.removeClass("cs_gescout_show");
        }
      }

      lastScrollTop = windowTop;
    });
  }
  /*--------------------------------------------------------------
      3. Dynamic Background
    --------------------------------------------------------------*/
  function dynamicBackground() {
    $('[data-src]').each(function () {
      var src = $(this).attr('data-src');
      $(this).css({
        'background-image': 'url(' + src + ')',
      });
    });
  }
  /*--------------------------------------------------------------
      13. Loading page Animation
    --------------------------------------------------------------*/
  function preloader() {
    const preloader = document.querySelector(".preloader");
    const loader_container = document.querySelector(".loader_container"),
      percent = document.querySelector("#percent");
    let perVal = 0;
    let increament = setInterval(() => {
      perVal++;
      percent.textContent = `${perVal}%`;
      if (perVal = 100) {
        clearInterval(increament);
        loader_container.classList.remove("active");
        preloader.classList.add("hide");
      }
    }, calculateWindowLoadTime());
  }

})(jQuery); // End of use strict