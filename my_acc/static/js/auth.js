document.addEventListener("DOMContentLoaded", function () {

  // ---- Password visibility toggle (works for any .auth-toggle-visibility) ----
  document.querySelectorAll(".auth-toggle-visibility").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const input = document.getElementById(btn.dataset.target);
      if (!input) return;

      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";

      const icon = btn.querySelector("i");
      icon.classList.toggle("bi-eye-fill", !isHidden);
      icon.classList.toggle("bi-eye-slash-fill", isHidden);
    });
  });

  // ---- Form submit handling ----
  const form = document.getElementById("authForm");
  if (!form) return;

  const isSignUp = !!document.getElementById("fullName");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    // Clear previous error states
    form.querySelectorAll(".auth-input-wrap").forEach(function (wrap) {
      wrap.classList.remove("auth-input-error");
    });

    // Validate required text/email/password fields
    form.querySelectorAll(".auth-input[required]").forEach(function (input) {
      const wrap = input.closest(".auth-input-wrap");
      const value = input.value.trim();
      let fieldValid = value.length > 0;

      if (input.type === "email" && fieldValid) {
        fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }
      if (input.type === "password" && fieldValid && input.minLength > 0) {
        fieldValid = value.length >= input.minLength;
      }

      if (!fieldValid) {
        valid = false;
        if (wrap) wrap.classList.add("auth-input-error");
      }
    });

    // Sign up only: terms checkbox must be checked
    const agreeTerms = document.getElementById("agreeTerms");
    if (agreeTerms && !agreeTerms.checked) {
      valid = false;
    }

    if (!valid) {
      showToast("Please fill in all fields correctly.");
      return;
    }

    const submitBtn = form.querySelector(".auth-submit-btn");
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = isSignUp ? "Creating account..." : "Signing in...";
  });
  //   // Simulate an auth request — replace with a real API call when ready
  //   setTimeout(function () {
  //     showToast(isSignUp ? "Account created! Redirecting..." : "Welcome back! Redirecting...");
  //     setTimeout(function () {
  //       window.location.href = "dashboard.html";
  //     }, 700);
  //   }, 900);
  // });

//   function showToast(message) {
//     let toast = document.querySelector(".auth-toast");
//     if (!toast) {
//       toast = document.createElement("div");
//       toast.className = "auth-toast";
//       document.body.appendChild(toast);
//     }
//     toast.textContent = message;
//     requestAnimationFrame(function () {
//       toast.classList.add("show");
//     });
//     setTimeout(function () {
//       toast.classList.remove("show");
//     }, 2500);
//   }
// });
})