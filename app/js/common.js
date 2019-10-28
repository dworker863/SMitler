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