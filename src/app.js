document.addEventListener("DOMContentLoaded", function () {
  // Плавное появление резюме
  const resumeWrapper = document.querySelector(".resume-wrapper");
  if (resumeWrapper) {
    resumeWrapper.style.opacity = "0";
    resumeWrapper.style.display = "flex";

    let opacity = 0;
    const fadeIn = () => {
      opacity += 0.05;
      resumeWrapper.style.opacity = opacity;
      if (opacity < 1) {
        requestAnimationFrame(fadeIn);
      }
    };
    fadeIn();
  }

  // Анимация навыков
  function animateSkills() {
    const skillLevels = document.querySelectorAll(".skill-level");
    skillLevels.forEach((level) => {
      const style = level.getAttribute("style");
      let width = 0;

      if (style) {
        const match = style.match(/width:\s*(\d+)%/);
        if (match && match[1]) {
          width = parseInt(match[1]);
        }
      }

      level.style.width = "0";
      level.style.transition = "width 1s ease-in-out";

      setTimeout(() => {
        level.style.width = width + "%";
      }, 100);
    });
  }
  animateSkills();

  // Мобильное меню
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const sidebar = document.querySelector(".resume-sidebar");
  const overlay = document.createElement("div");
  overlay.className = "sidebar-overlay";
  document.body.appendChild(overlay);

  function toggleMenu() {
    menuToggle.classList.toggle("active");
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.style.overflow = sidebar.classList.contains("active")
      ? "hidden"
      : "";
  }

  menuToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  overlay.addEventListener("click", toggleMenu);

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && sidebar.classList.contains("active")) {
      toggleMenu();
    }
  });

  // Обработка аватарки
  const avatar = document.getElementById("profile-avatar");
  if (avatar) {
    const modal = document.createElement("div");
    modal.className = "avatar-modal";

    modal.innerHTML = `
      <span class="avatar-modal-close">&times;</span>
      <img class="avatar-modal-content" src="${
        avatar.querySelector("img").src
      }" alt="Увеличенное фото">
    `;

    document.body.appendChild(modal);

    avatar.addEventListener("click", function (e) {
      e.preventDefault();
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    });

    modal
      .querySelector(".avatar-modal-close")
      .addEventListener("click", function () {
        modal.classList.remove("show");
        document.body.style.overflow = "";
      });

    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.remove("show");
        document.body.style.overflow = "";
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("show")) {
        modal.classList.remove("show");
        document.body.style.overflow = "";
      }
    });
  }

  // Плавная прокрутка
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    var target = $(this).attr("href");
    if ($(target).length) {
      $("html, body").animate({ scrollTop: $(target).offset().top - 20 }, 500);
    }
  });
});
