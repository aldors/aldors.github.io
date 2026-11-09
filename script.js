// Aldo Ruiz · Desarrollador Backend — consola solo navega, bilingüe ES/EN
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

let lang = localStorage.getItem("lang") || "es";

const themeBtn = $("#theme-btn");
const metaTheme = $("#theme-color");

function syncThemeLabel() {
  if (!themeBtn) return;
  const isLight = document.documentElement.dataset.theme === "light";
  const label = lang === "en"
    ? (isLight ? "Switch to dark theme" : "Switch to light theme")
    : (isLight ? "Cambiar a tema oscuro" : "Cambiar a tema claro");
  themeBtn.setAttribute("aria-label", label);
  themeBtn.setAttribute("title", label);
  themeBtn.setAttribute("aria-pressed", String(isLight));
}

function applyTheme(t, silent = true) {
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem("theme", t); } catch {}
  if (metaTheme) metaTheme.setAttribute("content", t === "light" ? "#f4f5f2" : "#030605");
  syncThemeLabel();
  if (!silent) toast(lang === "es"
    ? (t === "light" ? "tema: claro" : "tema: oscuro")
    : (t === "light" ? "theme: light" : "theme: dark"));
}

themeBtn?.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  applyTheme(next, false);
});

const I18N = {
  es: {
    "nav.about": "sobre-mí", "nav.edu": "formación", "nav.stack": "stack",
    "nav.projects": "proyectos",
    "hero.sub": "— Desarrollador Backend · Java 21 + Spring Boot",
    "hero.tag": "Construyo APIs REST con Java 21, Spring Boot y MySQL, con JWT, testing y documentación OpenAPI.",
    "hero.open": "disponible para trabajar · Michoacán, México · inglés B1",
    "hero.btnProjects": "ver proyectos",
    "about.title": "sobre mí",
    "about.p1": "Desarrollador Backend enfocado en Java 21 y Spring Boot. Construyo APIs REST con JWT, persistencia en MySQL, testing y documentación OpenAPI.",
    "about.p2": "Trabajo con arquitectura en capas, DTOs y manejo global de excepciones; me enfoco en APIs mantenibles y seguras.",
    "edu.title": "formación",
    "edu.e1t": "Ing. en Sistemas Computacionales",
    "edu.e2t": "Certificado en SQL · aprendesql.dev",
    "edu.e2": "ver certificado",
    "edu.e3t": "Formación continua · Backend",
    "stack.title": "stack",
    "proj.title": "proyectos",
    "proj.sub": "3 proyectos backend con Java 21, Spring Boot, JWT y MySQL.",
    "proj.featured": "destacado",
    "proj.statusDev": "en desarrollo",
    "proj.statusDone": "completado",
    "proj.role": "Backend Developer · proyecto personal",
    "proj.repo": "ver repositorio",
    "proj.p1": "API REST para el ciclo completo de boletos: eventos, reservas, pago con Stripe en modo test, PDF con QR y validación en puerta.",
    "proj.h1a": "Reservas con expiración de 15 minutos y tareas programadas para liberar stock.",
    "proj.h1b": "Roles, refresh tokens, Swagger/OpenAPI y verificación pública de boletos.",
    "proj.p2": "API REST para gestionar gastos compartidos: grupos, invitaciones, movimientos y cálculo automático de balances por miembro.",
    "proj.h2a": "Dashboard con lo que debes, lo que te deben y tu balance por grupo.",
    "proj.h2b": "Roles USER/ADMIN y roles internos de grupo con protección BOLA.",
    "proj.p3": "API REST de comercio electrónico: catálogo, carrito persistente, órdenes e historial, con JWT (access + refresh), roles y paginación.",
    "proj.h3a": "Testing unitario con JUnit 5, Mockito y MockMvc.",
    "proj.h3b": "Swagger/OpenAPI, validaciones, soft delete y manejo global de excepciones.",
  },
  en: {
    "nav.about": "about-me", "nav.edu": "education", "nav.stack": "stack",
    "nav.projects": "projects",
    "hero.sub": "— Backend Developer · Java 21 + Spring Boot",
    "hero.tag": "I build REST APIs with Java 21, Spring Boot and MySQL, including JWT, testing and OpenAPI documentation.",
    "hero.open": "available for work · Michoacán, Mexico · English B1",
    "hero.btnProjects": "view projects",
    "about.title": "about me",
    "about.p1": "Backend Developer focused on Java 21 and Spring Boot. I build REST APIs with JWT, MySQL persistence, testing and OpenAPI documentation.",
    "about.p2": "I work with layered architecture, DTOs and global exception handling; I focus on maintainable and secure APIs.",
    "edu.title": "education",
    "edu.e1t": "Systems Engineering",
    "edu.e2t": "SQL Certificate · aprendesql.dev",
    "edu.e2": "view certificate",
    "edu.e3t": "Continuous learning · Backend",
    "stack.title": "stack",
    "proj.title": "projects",
    "proj.sub": "3 backend projects with Java 21, Spring Boot, JWT and MySQL.",
    "proj.featured": "featured",
    "proj.statusDev": "in progress",
    "proj.statusDone": "completed",
    "proj.role": "Backend Developer · personal project",
    "proj.repo": "view repository",
    "proj.p1": "REST API for the full ticket lifecycle: events, reservations, Stripe test payments, QR PDFs and door validation.",
    "proj.h1a": "15-minute reservation expiry with scheduled jobs to release stock.",
    "proj.h1b": "Roles, refresh tokens, Swagger/OpenAPI and public ticket verification.",
    "proj.p2": "REST API to manage shared expenses: groups, invitations, movements and automatic balance calculation per member.",
    "proj.h2a": "Dashboard showing what you owe, what you are owed and your balance per group.",
    "proj.h2b": "USER/ADMIN roles and group-level roles with BOLA protection.",
    "proj.p3": "E-commerce REST API: catalog, persistent cart, orders and history, with JWT (access + refresh), roles and pagination.",
    "proj.h3a": "Unit testing with JUnit 5, Mockito and MockMvc.",
    "proj.h3b": "Swagger/OpenAPI, validation, soft delete and global exception handling.",
  }
};

function applyLang(l, silent = false) {
  lang = l;
  localStorage.setItem("lang", l);
  document.documentElement.lang = l;
  $$("[data-i18n]").forEach((el) => {
    const k = el.getAttribute("data-i18n");
    if (I18N[l][k]) el.textContent = I18N[l][k];
  });
  $("#btn-es").classList.toggle("active", l === "es");
  $("#btn-en").classList.toggle("active", l === "en");
  syncThemeLabel();
  if (!silent) toast(l === "es" ? "idioma: español" : "language: english");
}

$("#btn-es").addEventListener("click", () => applyLang("es"));
$("#btn-en").addEventListener("click", () => applyLang("en"));
$("#menu-btn").addEventListener("click", () => $("#mobile-nav").classList.toggle("open"));
$$("#mobile-nav a").forEach((a) => a.addEventListener("click", () => $("#mobile-nav").classList.remove("open")));

// consola: solo navega
const out = $("#term-output");
const form = $("#term-form");
const input = $("#term-input");

function print(html) {
  const d = document.createElement("div");
  d.innerHTML = html;
  out.appendChild(d);
  out.scrollTop = out.scrollHeight;
}
function go(sel) { document.querySelector(sel)?.scrollIntoView({ behavior: "smooth" }); }

function runCmd(raw) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return;
  print(`<span style="color:var(--text)">${raw.replace(/</g, "&lt;")}</span>`);
  const routes = {
    "sobre-mi": "#sobre-mi", about: "#sobre-mi", whoami: "#sobre-mi",
    "formacion": "#formacion", "formación": "#formacion", education: "#formacion",
    stack: "#stack", skills: "#stack",
    proyectos: "#proyectos", projects: "#proyectos", ls: "#proyectos",
    contacto: "#hero", contact: "#hero", email: "#hero",
  };
  if (cmd === "help" || cmd === "ayuda") {
    print(lang === "es"
      ? "ve a: proyectos · stack · sobre-mi · formación — o lang en"
      : "go to: projects · stack · about · education — or lang es");
    return;
  }
  if (cmd === "clear" || cmd === "cls") { out.innerHTML = ""; return; }
  if (cmd === "lang en") { applyLang("en"); return; }
  if (cmd === "lang es") { applyLang("es"); return; }
  if (routes[cmd]) { go(routes[cmd]); print("→ " + routes[cmd]); return; }
  print(lang === "es" ? `no encontrado: ${cmd} — prueba help` : `not found: ${cmd} — try help`);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  runCmd(input.value);
  input.value = "";
});

function toast(msg) {
  const t = $("#toast");
  t.textContent = "$ " + msg;
  t.classList.add("show");
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove("show"), 2000);
}

// CV y LinkedIn desactivados por ahora (solo placeholders visuales).

const io = new IntersectionObserver((es) => {
  es.forEach((e) => e.isIntersecting && e.target.classList.add("visible"));
}, { threshold: 0.1 });
$$(".reveal").forEach((el) => io.observe(el));

const navLinks = $$(".nav a, .mobile-nav a");
const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    const active = Boolean(id) && link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  });
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setActiveLink(entry.target.id === "hero" ? null : entry.target.id);
    }
  });
}, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
$$("main section[id]").forEach((section) => sectionObserver.observe(section));

$$(".project-media img").forEach((img) => {
  const removeBroken = () => {
    if (img.naturalWidth === 0) img.remove();
  };
  img.addEventListener("error", removeBroken);
  if (img.complete) removeBroken();
});

/* Carruseles y visor de imágenes */
const lightbox = $("#lightbox");
const lightboxImg = $("#lightbox-img");
const lightboxCaption = $("#lightbox-caption");
const lightboxPrev = $("#lightbox-prev");
const lightboxNext = $("#lightbox-next");
let galleryItems = [];
let galleryIndex = 0;

function renderLightbox() {
  if (!lightbox || !galleryItems.length) return;
  const item = galleryItems[galleryIndex];
  lightboxImg.src = item.src;
  lightboxImg.alt = item.alt;
  const multiple = galleryItems.length > 1;
  lightboxPrev.hidden = !multiple;
  lightboxNext.hidden = !multiple;
  lightboxCaption.hidden = !multiple;
  lightboxCaption.textContent = `${galleryIndex + 1} / ${galleryItems.length}`;
}

function openLightbox(items, index) {
  if (!lightbox || !items.length) return;
  galleryItems = items;
  galleryIndex = index;
  renderLightbox();
  if (!lightbox.open) lightbox.showModal();
}

function stepLightbox(step) {
  if (galleryItems.length < 2) return;
  galleryIndex = (galleryIndex + step + galleryItems.length) % galleryItems.length;
  renderLightbox();
}

$("#lightbox-close")?.addEventListener("click", () => lightbox?.close());
lightboxPrev?.addEventListener("click", () => stepLightbox(-1));
lightboxNext?.addEventListener("click", () => stepLightbox(1));
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target.classList.contains("lightbox-inner")) lightbox.close();
});
lightbox?.addEventListener("close", () => {
  galleryItems = [];
  lightboxImg.removeAttribute("src");
});
lightbox?.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") { e.preventDefault(); stepLightbox(-1); }
  if (e.key === "ArrowRight") { e.preventDefault(); stepLightbox(1); }
});

$$("[data-carousel]").forEach((carousel) => {
  const track = carousel.querySelector(".carousel-track");
  const slides = [...track.children].filter((slide) => slide.querySelector("img"));
  const dotsWrap = carousel.querySelector(".carousel-dots");
  const prevBtn = carousel.querySelector(".carousel-btn.prev");
  const nextBtn = carousel.querySelector(".carousel-btn.next");
  const zoomBtn = carousel.querySelector(".carousel-zoom");
  const items = slides.map((slide) => {
    const img = slide.querySelector("img");
    return { src: img.getAttribute("src"), alt: img.getAttribute("alt") };
  });
  const imgs = slides.map((slide) => slide.querySelector("img"));
  let index = 0;
  const multiple = slides.length > 1;

  const dots = multiple && dotsWrap
    ? slides.map((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", `Imagen ${i + 1} de ${slides.length}`);
        dot.addEventListener("click", () => go(i));
        dotsWrap.appendChild(dot);
        return dot;
      })
    : [];

  function paintDots() {
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  function syncHeight() {
    const img = imgs[index];
    if (!img) return;
    const w = Number(img.getAttribute("width")) || img.naturalWidth;
    const h = Number(img.getAttribute("height")) || img.naturalHeight;
    if (w && h) track.style.aspectRatio = `${w} / ${h}`;
  }

  function go(i) {
    index = (i + slides.length) % slides.length;
    syncHeight();
    track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
    paintDots();
  }

  prevBtn?.addEventListener("click", () => go(index - 1));
  nextBtn?.addEventListener("click", () => go(index + 1));
  zoomBtn?.addEventListener("click", () => openLightbox(items, index));

  track.addEventListener("scroll", () => {
    const next = Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / track.clientWidth)));
    if (next !== index) {
      index = next;
      syncHeight();
      paintDots();
    }
  }, { passive: true });

  window.addEventListener("resize", () => {
    track.scrollLeft = index * track.clientWidth;
  });

  slides.forEach((slide, i) => {
    const img = slide.querySelector("img");
    const open = () => openLightbox(items, i);
    img.addEventListener("click", open);
    img.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
    img.tabIndex = 0;
    img.draggable = false;
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", `Ampliar: ${img.alt}`);
  });

  imgs.forEach((img) => img.addEventListener("load", syncHeight));
  syncHeight();
  paintDots();
});

$("#year").textContent = new Date().getFullYear();

applyTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark", true);
applyLang(lang, true);
print(lang === "es" ? "escribe help para navegar" : "type help to navigate");
