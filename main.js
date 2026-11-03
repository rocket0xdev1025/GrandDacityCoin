const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");

menuBtn.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  menuBtn.setAttribute("aria-label", open ? "Close Navigation Menu" : "Expand Navigation Menu");
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Expand Navigation Menu");
  });
});

const lightbox = document.querySelector("#lightbox");
const lightboxImg = lightbox.querySelector("img");
const lightboxCap = lightbox.querySelector("figcaption");

function openOverlay(overlay) {
  overlay.classList.add("open");
  overlay.querySelector(".close-x").focus();
  document.body.style.overflow = "hidden";
}

function closeOverlay(overlay) {
  overlay.classList.remove("open");
  if (!document.querySelector(".overlay.open") && !document.body.classList.contains("menu-open")) {
    document.body.style.overflow = "";
  }
}

function showLightbox(src, label) {
  lightboxImg.src = src;
  lightboxImg.alt = label || "";
  lightboxCap.textContent = label || "";
  openOverlay(lightbox);
}

document.querySelectorAll(".shot").forEach((button) => {
  button.addEventListener("click", () => {
    const img = button.querySelector("img");
    showLightbox(img.currentSrc || img.src, button.getAttribute("aria-label"));
  });
});

document.querySelectorAll(".place").forEach((button) => {
  button.addEventListener("click", () => {
    const img = button.querySelector(".place-photo");
    showLightbox(img.currentSrc || img.src, button.getAttribute("aria-label"));
  });
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => closeOverlay(button.closest(".overlay")));
});

document.querySelectorAll(".overlay").forEach((overlay) => {
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeOverlay(overlay);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  document.querySelectorAll(".overlay.open").forEach(closeOverlay);
  if (document.body.classList.contains("menu-open")) menuBtn.click();
});

const order = document.querySelector("#order");
document.querySelectorAll("[data-order]").forEach((button) => {
  button.addEventListener("click", () => openOverlay(order));
});

const news = document.querySelector(".news");
news.querySelector(".news-toggle").addEventListener("click", () => {
  news.classList.add("open");
  news.querySelector("input").focus();
});

news.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = news.querySelector("input");
  if (!input.value.trim()) {
    input.focus();
    return;
  }
  news.classList.add("done");
});

const cookies = document.querySelector("#cookies");
document.querySelector("[data-cookies]").addEventListener("click", () => openOverlay(cookies));
