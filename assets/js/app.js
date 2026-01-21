(function(){
  "use strict";

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const products = (window.CONTENT && Array.isArray(window.CONTENT.products)) ? window.CONTENT.products : [];

  const grid = document.querySelector("[data-products-grid]");
  if (grid && products.length) {
    grid.innerHTML = products.map((p,i)=>`
      <article class="card" role="listitem" aria-labelledby="prod-${i}">
        <h3 id="prod-${i}">${esc(p.title)}</h3>
        <p>${esc(p.desc || "")}</p>
        <p class="price" aria-label="Τιμή">${esc(p.price || "—")}</p>
        <a class="btn btn--small" href="./product.html?slug=${encodeURIComponent(p.slug)}"
           aria-label="Δες λεπτομέρειες για ${esc(p.title)}">Δες προϊόν</a>
      </article>
    `).join("");
  }

  const slug = new URLSearchParams(window.location.search).get("slug");
  const titleEl = document.querySelector("[data-product-title]");
  if (slug && titleEl) {
    const item = products.find(p => p.slug === slug);
    const descEl = document.querySelector("[data-product-desc]");
    const priceEl = document.querySelector("[data-product-price]");
    const ctaEl = document.querySelector("[data-product-cta]");

    if (!item) {
      titleEl.textContent = "Το προϊόν δεν βρέθηκε";
      if (descEl) descEl.textContent = "Επιστροφή στη λίστα προϊόντων.";
      return;
    }

    document.title = `${item.title} | Μελισσοκόμος Κρήτης`;
    titleEl.textContent = item.title;
    if (descEl) descEl.textContent = item.desc || "";
    if (priceEl) priceEl.textContent = item.price || "—";
    if (ctaEl && window.CONTENT.contact && window.CONTENT.contact.whatsapp) {
  const phone = window.CONTENT.contact.whatsapp;
  const message = encodeURIComponent(
    `Θέλω πληροφορίες για το προϊόν: ${item.title}`
  );
  ctaEl.textContent = item.cta || "Παραγγελία στο WhatsApp";
  ctaEl.href = `https://wa.me/${phone}?text=${message}`;
  ctaEl.target = "_blank";
  ctaEl.rel = "noopener";
}


  function esc(s){
    return String(s)
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }
})();
