/**
 * KUWAGOS at WORK — navigation & scroll behavior
 */
(function () {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (!selectEl) return;
    if (all) {
      selectEl.forEach((e) => e.addEventListener(type, listener));
    } else {
      selectEl.addEventListener(type, listener);
    }
  };

  const scrollto = (hash) => {
    const header = select("#header");
    const target = select(hash);
    if (!target) return;
    const offset = header ? header.offsetHeight : 0;
    window.scrollTo({
      top: target.offsetTop - offset,
      behavior: "smooth",
    });
  };

  const navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    if (!navbarlinks.length) return;
    const position = window.scrollY + 120;
    navbarlinks.forEach((link) => {
      if (!link.hash) return;
      const section = select(link.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  window.addEventListener("load", navbarlinksActive);
  document.addEventListener("scroll", navbarlinksActive, { passive: true });

  on("click", ".mobile-nav-toggle", function () {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  on(
    "click",
    ".scrollto",
    function (e) {
      if (!this.hash || !select(this.hash)) return;
      e.preventDefault();
      const navbar = select("#navbar");
      if (navbar && navbar.classList.contains("navbar-mobile")) {
        navbar.classList.remove("navbar-mobile");
        const toggle = select(".mobile-nav-toggle");
        if (toggle) {
          toggle.classList.add("bi-list");
          toggle.classList.remove("bi-x");
        }
      }
      scrollto(this.hash);
    },
    true
  );

  window.addEventListener("load", () => {
    if (window.location.hash && select(window.location.hash)) {
      scrollto(window.location.hash);
    }
  });

  const backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      backtotop.classList.toggle("active", window.scrollY > 200);
    };
    window.addEventListener("load", toggleBacktotop);
    document.addEventListener("scroll", toggleBacktotop, { passive: true });
  }
})();
