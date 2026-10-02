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

document.getElementById("scrollToForm").addEventListener("click", function () {
  scrollToSection("form");
});

document
  .getElementById("scrollToPremios")
  .addEventListener("click", function () {
    scrollToSection("premios");
  });

document.getElementById("top").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// GSAP
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// const windowWidth = window.innerWidth; // La pongo debajo de la sección para que funcione con cambios en resizeo de pantalla

function horizontalScrollTitle() {
  const windowWidth = window.innerWidth;
  const sectionWidth = document.querySelector("#title > p").offsetWidth;

  if (windowWidth < sectionWidth) {
    gsap.to("#title > p", {
      //x: () => -(sectionWidth - windowWidth) + "px",
	  x: () => -(sectionWidth - windowWidth + 24) + "px",
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
  const cardsContainer = document.querySelector(".cards-container");
  const cards = gsap.utils.toArray(".cards-container > div");
  const horizontalTween = gsap.to(cardsContainer, {
    x: window.innerWidth - cardsContainer.scrollWidth,
    duration: cards.length,
    ease: "none",
    scrollTrigger: {
      trigger: ".pin-panel",
      start: "top top",
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
  const windowWidth = window.innerWidth;
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

// Cambio esta:
// initFunctions();
// Por esta:
document.fonts.ready.then(() => {
  initFunctions();
});


// 02/10/2026 Añadimos lógica para que el año se obtenga del servidor de NEtlify
 
// PASOS QUE HEMOS REALIZADO:
// 1º Se crea el archivo en el raiz netlify.toml (ver código)
// 2º Se crea get-year.js en \netlify\functions\
// 3º este código de abajo
  fetch("/.netlify/functions/get-year")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("current-year").textContent = data.year;
    })
    .catch(() => {
      // Si falla la petición, se queda el valor por defecto del span (2024)
    });