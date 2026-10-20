
/* =========================================================
   PORTFOLIO JAVASCRIPT
   Navigation, scroll reveals, active sections, hero text,
   back-to-top, and progressive enhancements.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(
  ".nav-links a"
);
  const navbar = document.querySelector(".navbar");
  const sections = document.querySelectorAll("main section[id]");
  const year = document.getElementById("year");
  const scrollTopButton = document.querySelector(".scroll-to-top");
  const typedText = document.querySelector(".typed-text");

  /* =========================================================
     1. MOBILE NAVIGATION
  ========================================================= */

  const closeMenu = () => {
    if (navLinks) {
      navLinks.classList.remove("active", "open");
    }

    if (menuButton) {
      menuButton.classList.remove("active", "open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  };

  if (menuButton && navLinks) {
    menuButton.setAttribute("aria-expanded", "false");

    menuButton.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen =
        navLinks.classList.contains("active") ||
        navLinks.classList.contains("open");

      closeMenu();

      if (!isOpen) {
        navLinks.classList.add("active", "open");
        menuButton.classList.add("active", "open");
        menuButton.setAttribute("aria-expanded", "true");
      }
    });

    navItems.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    document.addEventListener("click", (event) => {
      if (
        !navLinks.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 991) {
        closeMenu();
      }
    });
  }

  /* =========================================================
     2. SCROLL REVEAL ANIMATIONS
     Home content is visible immediately.
  ========================================================= */

  const revealItems = document.querySelectorAll(
    ".reveal, .reveal-on-scroll"
  );

  revealItems.forEach((item) => {
    if (item.closest("#home")) {
      item.classList.add("is-visible");
    }
  });

  const otherRevealItems = Array.from(revealItems).filter(
    (item) => !item.closest("#home")
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px 50px 0px"
      }
    );

    otherRevealItems.forEach((item) => {
      revealObserver.observe(item);
    });
  } else {
    otherRevealItems.forEach((item) => {
      item.classList.add("is-visible");
    });
  }

  /* =========================================================
     3. ACTIVE NAVIGATION SECTION
  ========================================================= */

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navItems.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isActive);

            if (isActive) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  /* =========================================================
     4. NAVBAR SCROLL EFFECT AND BACK-TO-TOP BUTTON
  ========================================================= */

  const updateScrollState = () => {
    const scrollY = window.scrollY;

    if (navbar) {
      navbar.classList.toggle("navbar-scrolled", scrollY > 40);
    }

    if (scrollTopButton) {
      // The CSS uses .scroll-to-top.show.
      scrollTopButton.classList.toggle("show", scrollY > 400);
    }
  };

  window.addEventListener("scroll", updateScrollState, {
    passive: true
  });

  updateScrollState();

  if (scrollTopButton) {
    scrollTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* =========================================================
     5. ROTATING HERO TEXT
  ========================================================= */

  if (typedText) {
    const phrases = [
      "Machine Learning",
      "Data Analytics",
      "Fullstack Developer",
      "Digital Innovation",
      "Business Analyst"
    ];

    let phraseIndex = 0;

    window.setInterval(() => {
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typedText.textContent = phrases[phraseIndex];
    }, 3000);
  }

  /* =========================================================
     6. DYNAMIC COPYRIGHT YEAR
  ========================================================= */

  if (year) {
    year.textContent = new Date().getFullYear();
  }

});
