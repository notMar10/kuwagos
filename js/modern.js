/**
 * KUWAGOS at WORK — modern site scripts
 */
(function () {
  "use strict";

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const header = document.getElementById("header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("header-scrolled", window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  const navbar = document.getElementById("navbar");
  const navToggle = document.querySelector(".mobile-nav-toggle");
  const body = document.body;

  const setNavOpen = (open) => {
    if (!body.classList.contains("site-modern")) return;
    body.classList.toggle("nav-open", open);
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
  };

  const syncNavOpen = () => {
    setNavOpen(navbar && navbar.classList.contains("navbar-mobile"));
  };

  if (navbar && navToggle) {
    navToggle.addEventListener("click", () => {
      requestAnimationFrame(syncNavOpen);
    });

    navbar.querySelectorAll(".scrollto").forEach((link) => {
      link.addEventListener("click", () => {
        requestAnimationFrame(syncNavOpen);
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navbar.classList.contains("navbar-mobile")) {
        navToggle.click();
      }
    });
  }

  if (typeof AOS !== "undefined") {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    window.addEventListener("load", () => {
      AOS.init({
        duration: prefersReducedMotion ? 0 : 700,
        easing: "ease-out-cubic",
        once: true,
        offset: isMobile ? 20 : 40,
        disable: prefersReducedMotion ? true : false,
      });
    });
  }
})();
