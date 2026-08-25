/* script.js — Field Notes */

document.documentElement.style.scrollBehavior = "smooth";

/* Page Loader */
window.addEventListener("load", () => {
  const loader = document.getElementById("pageLoader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 1400);
  }
});

/* Dot Grid Canvas */
const canvas = document.getElementById("dotGrid");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let w, h;
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  function drawDots() {
    ctx.clearRect(0, 0, w, h);
    const spacing = 45;
    const time = Date.now() * 0.0005;
    for (let x = spacing; x < w; x += spacing) {
      for (let y = spacing; y < h; y += spacing) {
        const dist = Math.sin(x * 0.008 + time) * Math.cos(y * 0.008 + time);
        const size = 0.6 + dist * 0.4;
        const alpha = 0.15 + dist * 0.1;
        ctx.fillStyle = `rgba(108,106,97,${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    requestAnimationFrame(drawDots);
  }
  drawDots();
}

/* Artifact hover */
const artifacts = document.querySelectorAll(".artifact");
artifacts.forEach((artifact, i) => {
  artifact.addEventListener("mouseenter", () => {
    artifact.style.transition = "transform .25s ease";
    artifact.style.transform = i % 2 === 0 ? "translateX(3px)" : "translateX(-3px)";
  });
  artifact.addEventListener("mouseleave", () => {
    artifact.style.transform = "translateX(0)";
  });
});

/* Photo parallax */
const photo = document.querySelector(".photo-frame img");
if (photo) {
  photo.addEventListener("mousemove", (e) => {
    const rect = photo.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    photo.style.transform = `translate(${x * 3}px, ${y * 3}px) scale(1.02)`;
    photo.style.transition = "transform .1s ease-out";
  });
  photo.addEventListener("mouseleave", () => {
    photo.style.transform = "translate(0,0) scale(1)";
    photo.style.transition = "transform .4s ease";
  });
}

/* Scroll reveals */
const revealItems = document.querySelectorAll(
  ".note, .chrono-row, .artifact, .currently-card"
);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      setTimeout(() => {
        entry.target.animate(
          [
            { opacity: 0, transform: "translateY(18px)" },
            { opacity: 1, transform: "translateY(0)" }
          ],
          { duration: 600, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" }
        );
      }, i * 80);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.08 }
);
revealItems.forEach((item) => observer.observe(item));

/* Count-up animation for stats */
const statNumbers = document.querySelectorAll(".stat-number[data-count]");
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      let current = 0;
      const step = () => {
        current++;
        el.textContent = current;
        if (current < target) setTimeout(step, 150);
      };
      step();
      statObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
statNumbers.forEach((el) => statObserver.observe(el));

/* Smooth header background on scroll */
const header = document.querySelector(".site-header");
if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.background = "rgba(233,229,218,.97)";
      header.style.boxShadow = "0 1px 10px rgba(0,0,0,.06)";
    } else {
      header.style.background = "rgba(233,229,218,.92)";
      header.style.boxShadow = "none";
    }
  });
}

/* Console Easter egg */
console.log(`
────────────────────────────────────────

DEV ADHIKARI / FIELD NOTES

You found the back of the page.
There isn't anything important here.
Probably.

────────────────────────────────────────
`);