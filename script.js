"use strict";

const nav = document.querySelector(".nav");
const header = document.querySelector(".header");

const navHeight = nav.getBoundingClientRect().height;

const allSections = document.querySelectorAll(".section");

const footerLinks = document.querySelectorAll(".footer__link");

const btnCloseModal = document.querySelector(".close--btn");

const modal = document.querySelector(".modal");

const overlay = document.querySelector(".overlay");

const navLinks = document.querySelector(".nav__links");

const burgerMenu = document.querySelector(".menu-icon");

// implementing sticky navigation

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

footerLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });
});

btnCloseModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

const toggleMenu = () => {
  const src = burgerMenu.getAttribute("src");
  const iconName =
    src === "assets/burger-menu.svg"
      ? "assets/close.svg"
      : "assets/burger-menu.svg";

  navLinks.style.opacity = src === "assets/burger-menu.svg" ? 1 : 0;
  overlay.classList.toggle("hidden");
  burgerMenu.setAttribute("src", iconName);
};

burgerMenu.addEventListener("click", toggleMenu);
