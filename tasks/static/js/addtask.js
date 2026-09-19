document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // Tag chips
    // =====================================================

    const tagInput = document.getElementById("tagInput");
    const tagChipWrap = document.getElementById("tagChipWrap");

    const chipColors = [
        "tag-chip-yellow",
        "tag-chip-pink",
        "tag-chip-purple"
    ];

    function escapeHtml(str) {
        const div = document.createElement("div");
        div.textContent = str;
        return div.innerHTML;
    }

    function addTagChip(text) {

        text = text.trim();

        if (!text) {
            return;
        }

        const chip = document.createElement("span");

        const color =
            chipColors[Math.floor(Math.random() * chipColors.length)];

        chip.className = `tag-chip ${color}`;

        chip.innerHTML = `
            ${escapeHtml(text)}
            <button
                type="button"
                class="chip-remove"
                aria-label="Remove tag">
                ×
            </button>
        `;

        tagChipWrap.appendChild(chip);
    }

    // Add tag when Enter is pressed
    if (tagInput) {

        tagInput.addEventListener("keydown", function (e) {

            if (e.key === "Enter") {

                e.preventDefault();

                addTagChip(tagInput.value);

                tagInput.value = "";
            }
        });
    }


    // Remove tag
    if (tagChipWrap) {

        tagChipWrap.addEventListener("click", function (e) {

            if (e.target.classList.contains("chip-remove")) {

                const chip = e.target.closest(".tag-chip");

                if (chip) {
                    chip.remove();
                }
            }
        });
    }


    // =====================================================
    // Color swatch selection
    // =====================================================

    const swatchWrap = document.getElementById("colorSwatchWrap");
    const colorInput = document.getElementById("taskColor");


    if (swatchWrap) {

        swatchWrap.addEventListener("click", function (e) {

            const swatch = e.target.closest(".color-swatch");

            if (!swatch) {
                return;
            }


            // Remove selected class from all colors
            swatchWrap
                .querySelectorAll(".color-swatch")
                .forEach(function (s) {

                    s.classList.remove("selected");
                });


            // Select clicked color
            swatch.classList.add("selected");


            // Get selected color
            const selectedColor = swatch.dataset.color;


            // Store color in hidden input
            if (colorInput) {
                colorInput.value = selectedColor;
            }
        });
    }

// =====================================================
// Customized Category
// =====================================================

const categorySelect = document.getElementById("taskCategory");
const customCategoryBox = document.getElementById("customCategoryBox");
const customCategoryInput = document.getElementById("customCategory");

if (categorySelect) {

    categorySelect.addEventListener("change", function () {

        if (this.value === "Customized") {

            customCategoryBox.classList.remove("d-none");

        } else {

            customCategoryBox.classList.add("d-none");
            customCategoryInput.value = "";
        }

    });
}

// =====================================================
// Customized Reminder Time
// =====================================================

const reminderSelect = document.getElementById("reminderTime");
const customReminderBox = document.getElementById("customReminderBox");
const customReminderInput = document.getElementById("customReminderTime");

if (reminderSelect) {

    reminderSelect.addEventListener("change", function () {

        if (this.value === "Customized") {

            customReminderBox.classList.remove("d-none");

        } else {

            customReminderBox.classList.add("d-none");
            customReminderInput.value = "";
        }

    });
}
    // =====================================================
    // Cancel button
    // =====================================================

    const cancelBtn = document.getElementById("cancelTaskBtn");
    const form = document.getElementById("addTaskForm");


    if (cancelBtn && form) {

        cancelBtn.addEventListener("click", function () {

            form.reset();


            // Remove dynamically added tags
            if (tagChipWrap) {
                tagChipWrap.innerHTML = "";
            }


            // Reset color to first color
            if (swatchWrap) {

                const swatches =
                    swatchWrap.querySelectorAll(".color-swatch");

                swatches.forEach(function (s, i) {

                    s.classList.toggle("selected", i === 0);
                });
            }


            // Reset hidden color
            if (colorInput) {
                colorInput.value = "#c084fc";
            }


            // Go back to dashboard
            window.location.href = "/dashboard/";
        });
    }


    // =====================================================
    // Form validation
    // =====================================================

    if (form) {

        form.addEventListener("submit", function (e) {

            const titleInput =
                document.getElementById("taskTitle");


            // Validate title
            if (!titleInput.value.trim()) {

                e.preventDefault();

                titleInput.focus();

                titleInput.classList.add("is-invalid");

                return;
            }


            titleInput.classList.remove("is-invalid");


            // =================================================
            // Prepare tags before Django receives the form
            // =================================================

            const existingTagInput =
                document.querySelector('input[name="t_tags"]');

            if (existingTagInput) {

                const chips =
                    tagChipWrap.querySelectorAll(".tag-chip");

                const tags = [];

                chips.forEach(function (chip) {

                    const button =
                        chip.querySelector(".chip-remove");

                    let text = chip.textContent;

                    if (button) {
                        text = text.replace(button.textContent, "");
                    }

                    text = text.trim();

                    if (text) {
                        tags.push(text);
                    }
                });


                existingTagInput.value = tags.join(", ");
            }


            // IMPORTANT:
            // Do NOT use e.preventDefault() here.
            //
            // Django will now receive the POST request.
        });
    }

});
