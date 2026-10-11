// Aldo Ruiz · Backend Jr — consola solo navega, bilingüe ES/EN
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

let lang = localStorage.getItem("lang") || "es";

const I18N = {
  es: {
    "nav.about": "sobre-mí", "nav.edu": "formación", "nav.stack": "stack",
    "nav.projects": "proyectos", "nav.contact": "contacto",
    "hero.tag": "Estudiante de último año de Ing. en Sistemas. Construyo APIs REST con Java + Spring Boot y MySQL.",
    "hero.open": "abierto a prácticas / trainee · Michoacán, México · remoto",
    "hero.btnProjects": "ver proyectos", "hero.btnContact": "contactar",
    "about.title": "sobre mí",
    "about.p1": "Tengo 20 años y curso el último año de Ingeniería en Sistemas (2024 — 2027/28). Programo en Java: POO, programación funcional, collections y exceptions. En backend uso Spring Boot con APIs REST, persistencia, validaciones y seguridad.",
    "about.p2": "Busco mi primera oportunidad como trainee o practicante para aportar en APIs reales.",
    "edu.title": "formación",
    "edu.e1t": "Ing. en Sistemas Computacionales · último año",
    "edu.e1": "2024 — 2027/28 · POO, estructuras de datos, bases de datos y backend con Java.",
    "edu.e2t": "Certificado en SQL · aprendesql.dev",
    "edu.e2": "ver certificado ↗",
    "edu.e3t": "Buscando prácticas / trainee backend",
    "edu.e3": "Java + Spring Boot · MySQL · Git. Disponibilidad inmediata.",
    "stack.title": "stack",
    "stack.fund": "Fundamentos",
    "stack.term": "bash · navegación · permisos",
    "proj.title": "proyectos",
    "proj.sub": "3 APIs en mejora continua. Código abierto en GitHub.",
    "proj.p1": "API REST con Spring Boot para comercio electrónico: catálogo, carrito y pedidos, usuarios y stock, con JPA/Hibernate, validaciones y MySQL. Segura con Spring Security: JWT, roles y sesiones.",
    "proj.p2": "API REST con Spring Boot para gastos compartidos: registro de gastos entre usuarios, cálculo de saldos y deudas, con validaciones y MySQL. Segura con JWT, roles y sesiones.",
    "proj.p3": "API REST con Spring Boot para eventos: creación y publicación, reserva y venta de boletos y validación de entradas para control de acceso, con MySQL. Segura con JWT, roles y sesiones.",
    "contact.title": "contacto",
    "contact.sub": "¿Tienes prácticas o una vacante trainee? Respondo en menos de 24h.",
    "contact.soon": "próximamente",
    "form.name": "nombre", "form.msg": "mensaje",
  },
  en: {
    "nav.about": "about-me", "nav.edu": "education", "nav.stack": "stack",
    "nav.projects": "projects", "nav.contact": "contact",
    "hero.tag": "Final-year Systems Engineering student. I build REST APIs with Java + Spring Boot and MySQL.",
    "hero.open": "open to internships / trainee · Michoacán, Mexico · remote",
    "hero.btnProjects": "view projects", "hero.btnContact": "contact",
    "about.title": "about me",
    "about.p1": "I'm 20 and in my final year of Systems Engineering (2024 — 2027/28). I code in Java: OOP, functional programming, collections and exceptions. On the backend I use Spring Boot with REST APIs, persistence, validation and security.",
    "about.p2": "I'm looking for my first trainee/intern role to contribute to real APIs.",
    "edu.title": "education",
    "edu.e1t": "Systems Engineering · final year",
    "edu.e1": "2024 — 2027/28 · OOP, data structures, databases and Java backend.",
    "edu.e2t": "SQL Certificate · aprendesql.dev",
    "edu.e2": "view certificate ↗",
    "edu.e3t": "Looking for backend internship / trainee",
    "edu.e3": "Java + Spring Boot · MySQL · Git. Immediate availability.",
    "stack.title": "stack",
    "stack.fund": "Fundamentals",
    "stack.term": "bash · navigation · permissions",
    "proj.title": "projects",
    "proj.sub": "3 APIs under active improvement. Open source on GitHub.",
    "proj.p1": "REST API with Spring Boot for e-commerce: catalog, cart and orders, users and stock, with JPA/Hibernate, validation and MySQL. Secured with Spring Security: JWT, roles and sessions.",
    "proj.p2": "REST API with Spring Boot for shared expenses: expense tracking between users, balance and debt calculation, with validation and MySQL. Secured with JWT, roles and sessions.",
    "proj.p3": "REST API with Spring Boot for events: creation and publishing, ticket booking/sales and ticket validation for access control, with MySQL. Secured with JWT, roles and sessions.",
    "contact.title": "contact",
    "contact.sub": "Have an internship or trainee opening? I reply within 24h.",
    "contact.soon": "coming soon",
    "form.name": "name", "form.msg": "message",
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
    contacto: "#contacto", contact: "#contacto", email: "#contacto",
  };
  if (cmd === "help" || cmd === "ayuda") {
    print(lang === "es"
      ? "ve a: sobre-mi · formación · stack · proyectos · contacto — o lang en"
      : "go to: about · education · stack · projects · contact — or lang es");
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

$$("[data-copy]").forEach((b) => {
  b.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); } catch {}
    toast("copiado: " + b.dataset.copy);
  });
});

// CV y LinkedIn desactivados por ahora (solo placeholders visuales).

const io = new IntersectionObserver((es) => {
  es.forEach((e) => e.isIntersecting && e.target.classList.add("visible"));
}, { threshold: 0.1 });
$$(".reveal").forEach((el) => io.observe(el));
$("#year").textContent = new Date().getFullYear();

applyLang(lang, true);
print(lang === "es" ? "escribe help para navegar" : "type help to navigate");
