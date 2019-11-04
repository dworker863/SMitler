"use strict";

document.addEventListener("DOMContentLoaded", () => {
    let menu = new Mmenu("#my-menu", {
        extensions: ["theme-black", "fx-menu-slide", "pagedim-black", "position-right"],
        navbar: {
            title: "<img src=\"img/src/logo-1.svg\">"
        },
    });

    let api = menu.API;

    api.bind("open:finish", () => {
        $(".hamburger").addClass("is-active");
    });

    api.bind("close:finish", () => {
        $(".hamburger").removeClass("is-active");
    })
});

$(document).ready(() => {
  $(".carousel-services").on("initialized.owl.carousel", () => {
    setTimeout(() => {
      carouselServices();
    }, 150);    
  });

  $(".carousel-services").owlCarousel({
    loop: true,
    nav: true,
    dots: false,
    smartSpeed: 700,
    navText: ["<i class=\"fas fa-angle-double-left\"></i>", "<i class=\"fas fa-angle-double-right\"></i>"],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1
      },
      800: {
        items: 2
      },
      1200: {
        items: 3
      }
    }
  });

  function carouselServices() {
    $(".carousel-services-content").each(function() {
      let elem = $(this);
      let height = elem.outerHeight();
      $(".carousel-services-image").css("min-height", height);
    });
  }

  $(".carousel-services-content .h3").each(function() {
    let elem = $(this);
    elem.html(elem.html().replace(/(\S+)\s*$/, "<span>$1</span>"));
  });

  $("section .h2").each(function() {
    let elem = $(this);
    elem.html(elem.html().replace(/^(\S+)/, "<span>$1</span>"));
  });

  function onResize() {
    $(".carousel-services-content").equalHeights({
      useOuterHeight:true
    });
  }onResize();
  
  // window.onResize = function() {
  //   onResize();
  // }
})