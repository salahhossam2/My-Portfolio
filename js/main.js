/* =========================================================
   SALAH HOSSAM - CYBER SECURITY PORTFOLIO
   ========================================================= */

/* ================= ELEMENTS ================= */

const menuBtn = document.getElementById("menuBtn");

const navbar = document.getElementById("navbar");

const navLinks = document.querySelectorAll(".nav-link");

const themeBtn = document.getElementById("themeBtn");

const backTop = document.getElementById("backTop");

const typingText = document.getElementById("typingText");

const counters = document.querySelectorAll(".counter");

const skills = document.querySelectorAll(".skill-bar span");

const revealElements = document.querySelectorAll(".reveal");

const filterButtons = document.querySelectorAll(".filter-btn");

const projectCards = document.querySelectorAll(".project-card");

const contactForm = document.getElementById("contactForm");

const formStatus = document.getElementById("formStatus");

const testimonialTrack = document.getElementById("testimonialTrack");

const prevTestimonial = document.getElementById("prevTestimonial");

const nextTestimonial = document.getElementById("nextTestimonial");

const sliderDots = document.querySelectorAll(".slider-dots span");

const currentYear = document.getElementById("currentYear");

const header = document.getElementById("header");

/* ================= CURRENT YEAR ================= */

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* ================= MOBILE MENU ================= */

if (menuBtn && navbar) {
  menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("open");

    const icon = menuBtn.querySelector("i");

    if (navbar.classList.contains("open")) {
      icon.classList.remove("fa-bars");

      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");

      icon.classList.add("fa-bars");
    }
  });

  /* Close menu after clicking */

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("open");

      const icon = menuBtn.querySelector("i");

      icon.classList.remove("fa-xmark");

      icon.classList.add("fa-bars");
    });
  });
}

/* ================= ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {
  const scrollPosition = window.scrollY + 150;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;

    const sectionHeight = section.offsetHeight;

    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNav);

/* ================= TYPING EFFECT ================= */

const typingWords = [
  "SOC Analyst",
  "Threat Detection",
  "Security Operations",
  "Incident Response",
];

let wordIndex = 0;

let characterIndex = 0;

let deleting = false;

function typeEffect() {
  if (!typingText) return;

  const currentWord = typingWords[wordIndex];

  if (!deleting) {
    typingText.textContent = currentWord.substring(0, characterIndex + 1);

    characterIndex++;

    if (characterIndex === currentWord.length) {
      deleting = true;

      setTimeout(typeEffect, 1800);

      return;
    }
  } else {
    typingText.textContent = currentWord.substring(0, characterIndex - 1);

    characterIndex--;

    if (characterIndex === 0) {
      deleting = false;

      wordIndex = (wordIndex + 1) % typingWords.length;
    }
  }

  setTimeout(
    typeEffect,

    deleting ? 45 : 85,
  );
}

typeEffect();

/* ================= REVEAL ON SCROLL ================= */

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          observer.unobserve(entry.target);
        }
      });
    },

    {
      threshold: 0.12,
    },
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

/* ================= COUNTERS ================= */

let countersStarted = false;

if (counters.length && "IntersectionObserver" in window) {
  const stats = document.querySelector(".stats");

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;

          counters.forEach((counter) => {
            const target = Number(counter.dataset.target);

            let current = 0;

            const increment = Math.max(1, Math.ceil(target / 50));

            function updateCounter() {
              current += increment;

              if (current >= target) {
                counter.textContent = target;

                return;
              }

              counter.textContent = current;

              requestAnimationFrame(updateCounter);
            }

            updateCounter();
          });

          observer.disconnect();
        }
      });
    },

    {
      threshold: 0.4,
    },
  );

  if (stats) {
    counterObserver.observe(stats);
  }
}

/* ================= SKILL BARS ================= */

if (skills.length && "IntersectionObserver" in window) {
  const skillsSection = document.getElementById("skills");

  const skillObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skills.forEach((skill) => {
            const progress = skill.dataset.progress;

            skill.style.width = `${progress}%`;
          });

          observer.disconnect();
        }
      });
    },

    {
      threshold: 0.3,
    },
  );

  if (skillsSection) {
    skillObserver.observe(skillsSection);
  }
}

/* ================= PORTFOLIO FILTER ================= */

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.dataset.filter;

    projectCards.forEach((card) => {
      const category = card.dataset.category;

      if (filter === "all" || category === filter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

/* ================= TESTIMONIAL SLIDER ================= */

let currentSlide = 0;

const testimonialCards = document.querySelectorAll(".testimonial-card");

const totalSlides = testimonialCards.length;

function updateSlider() {
  if (!testimonialTrack || totalSlides === 0) {
    return;
  }

  testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

  sliderDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

if (nextTestimonial && prevTestimonial && totalSlides > 0) {
  nextTestimonial.addEventListener("click", () => {
    currentSlide++;

    if (currentSlide >= totalSlides) {
      currentSlide = 0;
    }

    updateSlider();
  });

  prevTestimonial.addEventListener("click", () => {
    currentSlide--;

    if (currentSlide < 0) {
      currentSlide = totalSlides - 1;
    }

    updateSlider();
  });

  sliderDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;

      updateSlider();
    });
  });

  /* Auto slider */

  setInterval(() => {
    currentSlide++;

    if (currentSlide >= totalSlides) {
      currentSlide = 0;
    }

    updateSlider();
  }, 6000);
}

/* ================= DARK / LIGHT MODE ================= */

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light" && themeBtn) {
  document.body.classList.add("light-mode");

  themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    const isLight = document.body.classList.contains("light-mode");

    if (isLight) {
      localStorage.setItem("portfolio-theme", "light");

      themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      localStorage.setItem("portfolio-theme", "dark");

      themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  });
}

/* ================= BACK TO TOP ================= */

window.addEventListener("scroll", () => {
  if (!backTop) return;

  if (window.scrollY > 500) {
    backTop.classList.add("show");
  } else {
    backTop.classList.remove("show");
  }
});

if (backTop) {
  backTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  });
}

/* ================= CONTACT FORM ================= */

function showError(input, message) {
  const error = input.parentElement.querySelector(".error-message");

  input.classList.add("error");

  if (error) {
    error.textContent = message;
  }
}

function clearError(input) {
  const error = input.parentElement.querySelector(".error-message");

  input.classList.remove("error");

  if (error) {
    error.textContent = "";
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name");

    const email = document.getElementById("email");

    const subject = document.getElementById("subject");

    const message = document.getElementById("message");

    let valid = true;

    /* NAME */

    if (name.value.trim().length < 2) {
      showError(name, "Please enter your name.");

      valid = false;
    } else {
      clearError(name);
    }

    /* EMAIL */

    if (!isValidEmail(email.value.trim())) {
      showError(email, "Please enter a valid email.");

      valid = false;
    } else {
      clearError(email);
    }

    /* SUBJECT */

    if (subject.value.trim().length < 3) {
      showError(subject, "Please enter a subject.");

      valid = false;
    } else {
      clearError(subject);
    }

    /* MESSAGE */

    if (message.value.trim().length < 10) {
      showError(message, "Message must be at least 10 characters.");

      valid = false;
    } else {
      clearError(message);
    }

    if (!valid) {
      if (formStatus) {
        formStatus.textContent = "Please fix the errors above.";

        formStatus.className = "form-status error";
      }

      return;
    }

    /*
        Frontend validation is complete.

        Connect this form to a backend,
        Formspree, EmailJS, or another
        email service to actually send it.
      */

    if (formStatus) {
      formStatus.textContent =
        "Message validated successfully. Connect the form to a backend/email service to send it.";

      formStatus.className = "form-status success";
    }

    contactForm.reset();
  });

  /* REAL-TIME VALIDATION */

  const formInputs = contactForm.querySelectorAll("input, textarea");

  formInputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value.trim() !== "") {
        clearError(input);
      }
    });
  });
}

/* ================= HEADER SHADOW ================= */

window.addEventListener("scroll", () => {
  if (!header) return;

  if (window.scrollY > 20) {
    header.style.boxShadow = "0 10px 40px rgba(0,0,0,0.15)";
  } else {
    header.style.boxShadow = "none";
  }
});

/* ================= INITIALIZE ================= */

updateActiveNav();

updateSlider();
