(function () {
  "use strict";

  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Content
  const products =
    window.CONTENT && Array.isArray(window.CONTENT.products)
      ? window.CONTENT.products
      : [];

  // --------------------------
  // INDEX: render products grid
  // --------------------------
  const grid = document.querySelector("[data-products-grid]");
  if (grid) {
    if (!products.length) {
      grid.innerHTML = `<p class="note">Δεν υπάρχουν προϊόντα ακόμη.</p>`;
    } else {
      grid.innerHTML = products
        .map(
          (p, i) => `
          <article class="card" role="listitem" aria-labelledby="prod-${i}">
            <h3 id="prod-${i}">${esc(p.title)}</h3>
            <p>${esc(p.desc || "")}</p>
            <p class="price" aria-label="Τιμή">${esc(p.price || "—")}</p>
            <a class="btn btn--small"
               href="./product.html?slug=${encodeURIComponent(p.slug)}"
               aria-label="Δες λεπτομέρειες για ${esc(p.title)}">
               Δες προϊόν
            </a>
          </article>
        `
        )
        .join("");
    }
  }

  // --------------------------
  // PRODUCT: render single item
  // --------------------------
  const slug = new URLSearchParams(window.location.search).get("slug");
  const titleEl = document.querySelector("[data-product-title]");
  const descEl = document.querySelector("[data-product-desc]");
  const priceEl = document.querySelector("[data-product-price]");
  const ctaEl = document.querySelector("[data-product-cta]");

  if (slug && titleEl) {
    const item = products.find((p) => p.slug === slug);

    if (!item) {
      titleEl.textContent = "Το προϊόν δεν βρέθηκε";
      if (descEl) descEl.textContent = "Επιστροφή στη λίστα προϊόντων.";
      if (priceEl) priceEl.textContent = "";
      return;
    }

    document.title = `${item.title} | Μελισσοκόμος Κρήτης`;
    titleEl.textContent = item.title;
    if (descEl) descEl.textContent = item.desc || "";
    if (priceEl) priceEl.textContent = item.price || "—";

    // WhatsApp CTA (only if configured)
    if (ctaEl && window.CONTENT.contact && window.CONTENT.contact.whatsapp) {
      const phone = String(window.CONTENT.contact.whatsapp).trim();
      const message = encodeURIComponent(
        `Θέλω πληροφορίες για το προϊόν: ${item.title}`
      );

      ctaEl.textContent = item.cta || "Παραγγελία στο WhatsApp";
      ctaEl.href = `https://wa.me/${phone}?text=${message}`;
      ctaEl.target = "_blank";
      ctaEl.rel = "noopener";
    }
  }
  // Mobile menu toggle
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.getElementById("site-nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close on link click (mobile)
    nav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      nav.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
    });

    // Close if click outside
    document.addEventListener("click", (e) => {
      if (e.target.closest(".headeif (e.target.closest(".header")) return;
      nav.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  }

  // Escape HTML
  function esc(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
