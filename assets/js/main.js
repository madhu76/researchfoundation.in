(function ($) {
  "use strict";

  // Preloader (if the #preloader div exists)
  $(window).on("load", function () {
    if ($("#preloader").length) {
      $("#preloader")
        .delay(100)
        .fadeOut("slow", function () {
          $(this).remove();
        });
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500,
      "easeInOutExpo"
    );
    return false;
  });

  // Header scroll class
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      //after scroll
      $("#header").addClass("header-scrolled");
      $("#headermain").addClass("header-scrolled");
      $("#img-logo").attr("height","60px");

      // $("#main-nav").removeClass("header-color a");
      // $("#headerlogo").removeClass("headerlogocolor ");
      $("#main-navheader").addClass("main-navhome-black a");
      $('#headermain img').attr('src','assets/logo/FSRTI_ Logo.png');
    } else {
      //afterscroll-rest position
      $("#header").removeClass("header-scrolled");
      $("#headermain").removeClass("header-scrolled");
      $("#img-logo").attr("height","300px");
      // $("#main-nav").addClass("header-color");
      $("#main-navheader").addClass("main-navhome a");
      $("#main-navheader").removeClass("main-navhome-black a");
      $('#headermain img').attr('src','assets/logo/FSRTI_ Logo_w.png');

      // $("#main-nav").addClass("header-color a");
      // $("#headerlogo").addClass("headerlogocolor ");
      
    }
  });

  if ($(window).scrollTop() > 50) {
    $("#header").addClass("header-scrolled");
    $("#headermain").addClass("header-scrolled");

    $("#main-navheader").addClass("header-color");
    $("#headerlogo").addClass("headerlogocolor ");
    $("#headermainlogo").addClass("headerlogocolor ");

  }

  var scrolltoOffset = $("#header").outerHeight() - 21;
  var scrolltoOffsett = $("#headermain").outerHeight() - 21;

  if (window.matchMedia("(max-width: 991px)").matches) {
    scrolltoOffset += 20;
    scrolltoOffsett += 20;
  }
  $(document).on("click", ".main-nav a, .mobile-nav a, .scrollto", function (
    e
  ) {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == "#header") {
          scrollto = 0;
        }

        $("html, body").animate(
          {
            scrollTop: scrollto,
          },
          1500,
          "easeInOutExpo"
        );

        if ($(this).parents(".main-nav, .mobile-nav").length) {
          $(".main-nav .active, .mobile-nav .active").removeClass("active");
          $(this).closest("li").addClass("active");
        }

        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass("fa-times fa-bars");
          $(".mobile-nav-overly").fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function () {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $("html, body").animate(
          {
            scrollTop: scrollto,
          },
          1500,
          "easeInOutExpo"
        );
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $("section");
  var main_nav = $(".main-nav, .mobile-nav");

  $(window).on("scroll", function () {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function () {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find("li").removeClass("active");
        }
        main_nav
          .find('a[href="#' + $(this).attr("id") + '"]')
          .parent("li")
          .addClass("active");
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass("active");
      }
    });
  });

  // Mobile Navigation
  if ($(".main-nav").length) {
    var $mobile_nav = $(".main-nav").clone().prop({
      class: "mobile-nav d-lg-none",
    });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" class="mobile-nav-toggle d-lg-none"><i class="fa fa-bars"></i></button>'
    );
    $("body").append('<div class="mobile-nav-overly"></div>');

    $(document).on("click", ".mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");
      $(".mobile-nav-toggle i").toggleClass("fa-times fa-bars");
      $(".mobile-nav-overly").toggle();
    });

    $(document).on("click", ".mobile-nav .drop-down > a", function (e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass("active");
    });

    $(document).click(function (e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass("fa-times fa-bars");
          $(".mobile-nav-overly").fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // jQuery counterUp (used in Whu Us section)
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000,
  });

  // Porfolio isotope and filter
  $(window).on("load", function () {
    var portfolioIsotope = $(".portfolio-container").isotope({
      itemSelector: ".portfolio-item",
    });
    $("#portfolio-flters li").on("click", function () {
      $("#portfolio-flters li").removeClass("filter-active");
      $(this).addClass("filter-active");

      portfolioIsotope.isotope({
        filter: $(this).data("filter"),
      });
      aos_init();
    });
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1,
  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function () {
    $(".venobox").venobox();
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1,
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }
  $(window).on("load", function () {
    aos_init();
  });
})(jQuery);
