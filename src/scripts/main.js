// Scroll to a specific section
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
}

// document.getElementById("scrollToForm").addEventListener("click", function () {
//   scrollToSection("form");
// });

// document
//   .getElementById("scrollToPremios")
//   .addEventListener("click", function () {
//     scrollToSection("premios");
//   });

// document.getElementById("top").addEventListener("click", function () {
//   window.scrollTo({
//     top: 0,
//     behavior: "smooth",
//   });
// });

// // Girl positions
// const girl = document.getElementById("girl");
// const windowSize = window.innerHeight;
// const bodyHeight = document.body.offsetHeight;
// const maxScrollPosition = bodyHeight - windowSize - windowSize;

// function handleScroll() {
//   const scrollPosition = window.scrollY;

//   if (scrollPosition >= maxScrollPosition) {
//     girl.style.position = "fixed";
//   } else {
//     girl.style.position = "-webkit-sticky";
//     girl.style.position = "sticky";
//   }
// }

// window.addEventListener("scroll", handleScroll);

// GSAP
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const windowWidth = window.innerWidth;

function horizontalScrollTitle() {
  const sectionWidth = document.querySelector("#title > p").offsetWidth;

  if (windowWidth < sectionWidth) {
    gsap.to("#title > p", {
      x: () => -(sectionWidth - windowWidth) + "px",
      ease: "none",
      scrollTrigger: {
        trigger: "#title",
        pin: true,
        scrub: true,
        start: "25% 25%",
        end: "+=100%",
      },
    });
  }
}

function horizontalScrollChallenges() {
  const cards = gsap.utils.toArray(".card");
  const cardsContainer = document.querySelector(".cards-container");
  const horizontalTween = gsap.to(cardsContainer, {
    x: window.innerWidth - cardsContainer.scrollWidth,
    duration: cards.length,
    ease: "none",
    scrollTrigger: {
      trigger: ".pin-panel",
      start: "top 89px",
      end: "+=200%",
      pin: true,
      scrub: true,
    },
  });
  cards.shift();

  cards.forEach((card) =>
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: "left 90%",
        end: "center 90%",
        scrub: true,
        containerAnimation: horizontalTween,
      },
    })
  );
}

function initFunctions() {
  horizontalScrollTitle();
  if (windowWidth > 768) {
    horizontalScrollChallenges();
  }
}

function onResize() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
  initFunctions();
}

window.addEventListener("resize", onResize);
initFunctions();

// Lenis
import Lenis from "lenis";
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
