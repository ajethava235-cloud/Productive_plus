// =========================================================
// Productive+ — Home page interactions
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll for in-page nav links
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId.length > 1) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });

          // Collapse mobile navbar after clicking a link
          const navCollapse = document.getElementById("mainNav");
          if (navCollapse && navCollapse.classList.contains("show")) {
            const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navCollapse);
            bsCollapse.hide();
          }
        }
      }
    });
  });

  // Contact form submit handling (front-end only demo)
  const contactForm = document.getElementById("contactForm");
  const successMsg = document.getElementById("formSuccessMsg");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.classList.add("was-validated");
        return;
      }

      // Simulate a successful send — replace with a real API call as needed
      successMsg.classList.remove("d-none");
      contactForm.reset();
      contactForm.classList.remove("was-validated");

      setTimeout(function () {
        successMsg.classList.add("d-none");
      }, 4000);
    });
  }

  // Add a subtle shadow to the header once the page is scrolled
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 10) {
      header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.35)";
    } else {
      header.style.boxShadow = "none";
    }
  });
});