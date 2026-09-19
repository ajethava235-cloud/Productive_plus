document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // Password show / hide
    // =========================

    document.querySelectorAll(".auth-toggle-visibility").forEach(function (btn) {

        btn.addEventListener("click", function () {

            const input = document.getElementById(btn.dataset.target);
            const icon = btn.querySelector("i");

            if (!input) return;

            if (input.type === "password") {

                input.type = "text";

                icon.classList.remove("bi-eye-fill");
                icon.classList.add("bi-eye-slash-fill");

            } else {

                input.type = "password";

                icon.classList.remove("bi-eye-slash-fill");
                icon.classList.add("bi-eye-fill");
            }
        });
    });


    // =========================
    // Form
    // =========================

    const form = document.getElementById("authForm");

    if (!form) return;


    // =========================
    // Fields
    // =========================

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const username = document.getElementById("username");
    const email = document.getElementById("authEmail");
    const password = document.getElementById("authPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    const terms = document.getElementById("agreeTerms");


    // =========================
    // Error
    // =========================

    function showError(input, message) {

        const field = input.closest(".auth-field");

        let error = field.querySelector(".auth-error");

        if (!error) {

            error = document.createElement("small");

            error.className = "auth-error";

            field.appendChild(error);
        }

        error.textContent = message;

        input.classList.add("auth-input-error");
    }


    function clearError(input) {

        const field = input.closest(".auth-field");

        const error = field.querySelector(".auth-error");

        if (error) {
            error.remove();
        }

        input.classList.remove("auth-input-error");
    }


    // =========================
    // First Name
    // =========================

    function validateFirstName() {

        const value = firstName.value.trim();

        if (value === "") {

            showError(firstName, "First name is required.");

            return false;
        }

        if (!/^[A-Za-z]+$/.test(value)) {

            showError(firstName, "Only letters are allowed.");

            return false;
        }

        if (value.length < 2 || value.length > 30) {

            showError(firstName, "Name must be 2-30 characters.");

            return false;
        }

        clearError(firstName);

        return true;
    }


    // =========================
    // Last Name
    // =========================

    function validateLastName() {

        const value = lastName.value.trim();

        if (value === "") {

            showError(lastName, "Last name is required.");

            return false;
        }

        if (!/^[A-Za-z]+$/.test(value)) {

            showError(lastName, "Only letters are allowed.");

            return false;
        }

        if (value.length < 2 || value.length > 30) {

            showError(lastName, "Name must be 2-30 characters.");

            return false;
        }

        clearError(lastName);

        return true;
    }


    // =========================
    // Username
    // =========================

    function validateUsername() {

        const value = username.value.trim();

        if (value === "") {

            showError(username, "Username is required.");

            return false;
        }

        if (!/^[A-Za-z0-9_]+$/.test(value)) {

            showError(
                username,
                "Only letters, numbers and _ are allowed."
            );

            return false;
        }

        if (value.length < 3 || value.length > 30) {

            showError(
                username,
                "Username must be 3-30 characters."
            );

            return false;
        }

        clearError(username);

        return true;
    }


    // =========================
    // Email
    // =========================

    function validateEmail() {

        const value = email.value.trim();

        if (value === "") {

            showError(email, "Email is required.");

            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {

            showError(
                email,
                "Enter a valid email address."
            );

            return false;
        }

        clearError(email);

        return true;
    }


    // =========================
    // Password
    // =========================

    function validatePassword() {

        const value = password.value;

        if (value === "") {

            showError(password, "Password is required.");

            return false;
        }

        if (value.length < 8) {

            showError(
                password,
                "Password must be at least 8 characters."
            );

            return false;
        }

        if (!/^[A-Za-z0-9!@#$%]+$/.test(value)) {

            showError(
                password,
                "Only A-Z, a-z, 0-9 and ! @ # $ % are allowed."
            );

            return false;
        }

        clearError(password);

        return true;
    }


    // =========================
    // Confirm Password
    // =========================

    function validateConfirmPassword() {

        if (confirmPassword.value === "") {

            showError(
                confirmPassword,
                "Please confirm your password."
            );

            return false;
        }

        if (confirmPassword.value !== password.value) {

            showError(
                confirmPassword,
                "Passwords do not match."
            );

            return false;
        }

        clearError(confirmPassword);

        return true;
    }


    // =========================
    // Live validation
    // =========================

    firstName.addEventListener("input", validateFirstName);

    lastName.addEventListener("input", validateLastName);

    username.addEventListener("input", validateUsername);

    email.addEventListener("input", validateEmail);

    password.addEventListener("input", validatePassword);

    confirmPassword.addEventListener(
        "input",
        validateConfirmPassword
    );


    // =========================
    // Submit
    // =========================

    form.addEventListener("submit", function (e) {

        const valid =
            validateFirstName() &&
            validateLastName() &&
            validateUsername() &&
            validateEmail() &&
            validatePassword() &&
            validateConfirmPassword() &&
            terms.checked;

        if (!valid) {

            e.preventDefault();

            // No alert box.
            // Errors are displayed directly below the fields.

            return;
        }

        /*
            DO NOT use e.preventDefault() here.

            Django will receive the POST request
            and process the registration.
        */
    });

});