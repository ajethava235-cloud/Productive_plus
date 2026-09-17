// =========================================================
// Productive+ — Dashboard interactions
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
  // ---- Mobile sidebar toggle ----
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("sidebarToggle");

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", function () {
      sidebar.classList.toggle("open");
    });

    document.addEventListener("click", function (e) {
      const isClickInsideSidebar = sidebar.contains(e.target);
      const isClickOnToggle = toggleBtn.contains(e.target);
      if (
        window.innerWidth < 992 &&
        sidebar.classList.contains("open") &&
        !isClickInsideSidebar &&
        !isClickOnToggle
      ) {
        sidebar.classList.remove("open");
      }
    });
  }

  // ---- Task checkbox toggling (visual only, front-end demo) ----
  document.querySelectorAll(".task-item input[type='checkbox']").forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      const item = this.closest(".task-item");
      item.classList.toggle("task-item-done", this.checked);
      updateTaskCount();
    });
  });

  function updateTaskCount() {
    const total = document.querySelectorAll(".task-item").length;
    const done = document.querySelectorAll(".task-item input[type='checkbox']:checked").length;
    const countPill = document.querySelector(".panel .count-pill");
    if (countPill) {
      countPill.textContent = `${done}/${total}`;
    }
  }

  // ---- Productivity chart (Chart.js) ----
  const chartCanvas = document.getElementById("productivityChart");
  if (chartCanvas && window.Chart) {
    const ctx = chartCanvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, 220);
    gradient.addColorStop(0, "rgba(178, 81, 253, 0.45)");
    gradient.addColorStop(1, "rgba(178, 81, 253, 0)");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Completed",
            data: [3, 5, 4, 7, 6, 8, 6],
            borderColor: "#b251fd",
            backgroundColor: gradient,
            tension: 0.45,
            fill: true,
            pointRadius: 3,
            pointBackgroundColor: "#b251fd",
          },
          {
            label: "Added",
            data: [4, 4, 6, 6, 5, 7, 7],
            borderColor: "#e8ceff",
            backgroundColor: "transparent",
            tension: 0.45,
            fill: false,
            pointRadius: 3,
            pointBackgroundColor: "#e8ceff",
            borderDash: [6, 4],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#0c042b",
            titleColor: "#ffffff",
            bodyColor: "#ddb3fd",
            borderColor: "rgba(255,255,255,0.2)",
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            grid: { color: "rgba(255,255,255,0.06)" },
            ticks: { color: "#bcaee0" },
          },
          y: {
            grid: { color: "rgba(255,255,255,0.06)" },
            ticks: { color: "#bcaee0" },
            beginAtZero: true,
          },
        },
      },
    });
  }
});