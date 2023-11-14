document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".menu-button");
  const navbar = document.querySelector(".navbar");
  const scrollHeader = document.getElementById("scroll-header-appear");

  menuButton.addEventListener("click", function () {
    this.classList.toggle("opened");
    navbar.classList.toggle("active");
  });

  // Fermer le menu lorsque l'utilisateur clique en dehors de la div du menu
  document.addEventListener("click", function (event) {
    const targetElement = event.target;

    if (
      !targetElement.closest(".navbar") &&
      !targetElement.closest(".menu-button")
    ) {
      menuButton.classList.remove("opened");
      navbar.classList.remove("active");
    }
  });

  // Fermer le menu lorsque l'utilisateur clique sur l'un des liens du menu
  const menuALinks = document.querySelectorAll(".menu li");
  menuALinks.forEach((link) => {
    link.addEventListener("click", function () {
      menuButton.classList.remove("opened");
      navbar.classList.remove("active");
    });
  });

  // Text deleting and re writing
  const textElement = document.getElementById("animated-text");
  const messages = ["Software developer", "Sport addict"];
  const firstSectionImage = document.getElementById("profil-picture");

  let messageIndex = 0;
  let message = "";
  let isDeleting = false;
  let typingSpeed = 100; // typing speed in milisec
  let deletingSpeed = 100; // deleting speed in milisec
  let pauseTime = 1000; // delay before starting deleting

  function typeAndDelete() {
    const currentMessage = messages[messageIndex].toLocaleUpperCase();

    if (isDeleting) {
      message = currentMessage.substring(0, message.length - 1);
    } else {
      message = currentMessage.substring(0, message.length + 1);
    }

    textElement.textContent = message;

    if (!isDeleting && message === currentMessage) {
      isDeleting = true;
      typingSpeed = deletingSpeed;

      setTimeout(() => {
        isDeleting = true;
        typingSpeed = deletingSpeed;
        setTimeout(typeAndDelete, typingSpeed);
      }, pauseTime);
    } else if (isDeleting && message === "") {
      isDeleting = false;
      typingSpeed = 100;
      messageIndex = (messageIndex + 1) % messages.length;
      if (currentMessage !== "SPORT ADDICT") {
        firstSectionImage.src = "img/streetWorkout.png";
      } else {
        firstSectionImage.src = "img/Cv_picture.jpeg";
      }
      firstSectionImage.classList.add("active");
      setTimeout(() => {
        firstSectionImage.classList.remove("active");
      }, 500);
      setTimeout(typeAndDelete, typingSpeed);
    } else {
      setTimeout(typeAndDelete, typingSpeed);
    }
  }

  typeAndDelete();

  // Menu on click scrolling

  const menuLinks = document.querySelectorAll(".menu li");
  menuLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("ref");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const targetPosition = targetSection.offsetTop - 50;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Skills apparition
  const skills = document.querySelectorAll(".competence");
  const skillOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  skills.forEach((skill, index) => {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            skill.classList.add("visible");
          }, index * 150);
          skillObserver.unobserve(entry.target);
        }
      });
    }, skillOptions);
    skillObserver.observe(skill);
  });
  // hover an icon
  const iconContainers = document.querySelectorAll(".footer-icon-container");
  const hiddenBlock = document.getElementById("hidden-block");
  const github = document.querySelector(".fa-github");
  const linkedin = document.querySelector(".fa-linkedin");
  let isEnvelop = false;
  iconContainers.forEach((container) => {
    const icon = container.querySelector("i");
    container.addEventListener("mouseover", () => {
      if (icon.className === "fa-regular fa-envelope") {
        hiddenBlock.classList.add("hovered");
        github.style.transition = "transform 0.2s";
        github.style.transitionDelay = "0.1s";
        github.style.transform = "translateY(-29px)";

        linkedin.style.transition = "transform 0.2s";
        linkedin.style.transitionDelay = "0.3s";
        linkedin.style.transform = "translateY(-29px)";
        isEnvelop = true;
      }
      icon.classList.add("hovered");
    });

    container.addEventListener("mouseout", () => {
      if (isEnvelop) {
        linkedin.style.transitionDelay = "0.6s";
        github.style.transitionDelay = "0.9s";
        isEnvelop = false;
      } else {
        linkedin.style.transition = " ease-in-out 0.2s";
        github.style.transition = " ease-in-out 0.2s";
      }
      github.style.transform = "translateY(0px)";
      linkedin.style.transform = "translateY(0px)";
      icon.classList.remove("hovered");
      hiddenBlock.classList.remove("hovered");
    });
  });
  // hover a project
  const projectContainers = document.querySelectorAll(".project-container");

  projectContainers.forEach((projectContainer) => {
    projectContainer.addEventListener("click", () => {
      if (
        projectContainer.querySelector(".project-name").innerHTML ===
        "Foodiz back-office"
      ) {
        window.location.href =
          "https://www.youtube.com/watch?v=WsnK3pN9a30&ab_channel=OhBLZ";
      } else {
        window.location.href =
          "https://www.youtube.com/watch?v=3QgRMd7t87M&abchannel=OhBLZ";
      }
    });
    const projectDescription = projectContainer.querySelector(
      ".project-description"
    );
    const projectContainerContent = projectContainer.querySelector(
      ".project-container-content"
    );
    const rightArrow = projectContainer.querySelector(".arrow-right");

    const projectImage = projectContainer.querySelector(".project-img");
    projectContainer.addEventListener("mouseover", () => {
      projectDescription.classList.add("hovered");
      projectContainerContent.classList.add("hovered");
      rightArrow.classList.add("hovered");
      projectContainer.classList.add("hovered");
      projectImage.classList.add("hovered");
    });

    projectContainer.addEventListener("mouseout", () => {
      projectDescription.classList.remove("hovered");
      rightArrow.classList.remove("hovered");
      projectContainerContent.classList.remove("hovered");
      projectContainer.classList.remove("hovered");
      projectImage.classList.remove("hovered");
    });
  });

  //Send mail function
  const sendMail = (listener) => {
    listener.addEventListener("click", () => {
      const emailAddress = "mehdigobbe@hotmail.com";
      const subject = "Demande de contact";

      const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(
        subject
      )}`;
      window.location.href = mailtoLink;
    });
  };
  //Send mail buttons + listeners
  const contactButton = document.getElementById("contact-me");
  const hireMe = document.getElementById("hire-me");
  sendMail(contactButton);
  sendMail(hireMe);

  //Download CV
  const box = document.querySelector(".box.bar");
  const dowloadIcon = document.querySelector(".fa-download");

  box.addEventListener("mouseenter", function () {
    dowloadIcon.classList.add("hovered");
  });

  box.addEventListener("mouseleave", function () {
    dowloadIcon.classList.remove("hovered");
  });
  //Menu
  const menuItems = document.querySelectorAll(".menu li");
  const sections = document.querySelectorAll(".section");
  //
  const spacer = document.getElementById("spacer");
  // spacer height
  const heightOffset = scrollHeader.clientHeight;
  var marginBottomNumericValue = 0;
  function updateMarginBottom() {
    var marginBottomValue = window.getComputedStyle(scrollHeader).marginBottom;
    marginBottomNumericValue = parseInt(marginBottomValue, 10); // 10 spécifie la base de conversion décimale
  }
  //
  window.addEventListener("resize", updateMarginBottom);
  // Appelez la fonction pour la première fois pour définir la valeur initiale
  updateMarginBottom();

  // Fonction pour vérifier quelle section est actuellement visible à l'écran
  function checkActiveSection() {
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const windowHeight = window.innerHeight;

      // Calculez le point médian vertical de la fenêtre
      const windowMid = window.scrollY + windowHeight / 2;

      // Vérifiez si le point médian de la fenêtre est dans la section
      const isSectionActive =
        windowMid >= sectionTop && windowMid <= sectionTop + sectionHeight;

      if (isSectionActive) {
        // La section est active, ajoutez une classe "active" à l'élément de menu correspondant
        if (menuItems[index]) {
          menuItems[index].classList.add("active-section");
        }

        if (section.id !== "home") {
          scrollHeader.classList.add("active");
          spacer.style.display = "block";
          spacer.style.height = heightOffset + marginBottomNumericValue + "px";
          navbar.style.position = "relative";
          menuALinks;
        } else {
          scrollHeader.classList.remove("active");
          spacer.style.display = "none";
          navbar.style.position = "absolute";
        }
      } else {
        // La section n'est pas active, supprimez la classe "active" de l'élément de menu
        if (menuItems[index]) {
          menuItems[index].classList.remove("active-section");
        }
      }
    });
  }

  // Appelez la fonction checkActiveSection une première fois pour initialiser le menu
  checkActiveSection();

  // Ajoutez un gestionnaire d'événement de défilement pour appeler la fonction checkActiveSection
  window.addEventListener("scroll", checkActiveSection);

  //
  window.addEventListener("scroll", function () {
    // Vérifiez si la navbar a la classe "active"
    if (navbar.classList.contains("active")) {
      // Si la navbar est active, supprimez la classe "active"
      navbar.classList.remove("active");
      menuButton.classList.remove("opened");
    }
  });

  //Dl/watch CV (click propagation)
  document.getElementById("dl-btn").addEventListener("click", function () {
    var parent = document.getElementById("dl-btn");
    var enfants = parent.children;

    for (var i = 0; i < enfants.length; i++) {
      var enfant = enfants[i];
      if (enfant !== this) {
        enfant.click();
      }
    }
  });

  //
  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      const entryImg = entry.target.querySelector("img");
      const entrySpan = entry.target.querySelector("span");
      const entryH4 = entry.target.querySelector("h4");
      const faSkills = entry.target.querySelectorAll(".fa-skills");
      const isPairStartingFrom2nd = entryH4.classList.contains(
        "second-project-title"
      );
      const projectSkillsInfo = entry.target.querySelector(
        ".bullets-project-info"
      );
      const projectSkillsInfoUnpair = entry.target.querySelector(
        ".bullets-project-info-unpair"
      );
      if (entry.isIntersecting) {
        entryImg.classList.add("active");
        entryH4.classList.add("active");
        entrySpan.classList.add("active");
        if (!isPairStartingFrom2nd) {
          projectSkillsInfo.classList.add("active");
          faSkills.forEach((faSkill, index) => {
            setTimeout(() => {
              faSkill.classList.add("active");
            }, index * 100);
          });
        } else {
          for (let i = 0; i < faSkills.length; i++) {
            projectSkillsInfoUnpair.classList.add("active");
            setTimeout(() => {
              faSkills[i].classList.add("active");
            }, (faSkills.length - i - 1) * 100);
          }
        }
      } else {
        entryImg.classList.remove("active");
        entryH4.classList.remove("active");
        entrySpan.classList.remove("active");
        if (isPairStartingFrom2nd) {
          for (let i = 0; i < faSkills.length; i++) {
            projectSkillsInfoUnpair.classList.remove("active");
            setTimeout(() => {
              faSkills[i].classList.remove("active");
            }, i * 100);
          }
        } else {
          for (let i = faSkills.length - 1; i >= 0; i--) {
            projectSkillsInfo.classList.remove("active");
            setTimeout(() => {
              faSkills[i].classList.remove("active");
            }, (faSkills.length - 1 - i) * 100);
          }
        }
      }
    });
  }
  const skillsTitle = document.querySelector(".recent-projects-title");
  const hiddenTitleBlock = document.querySelector(
    ".hidden-block-project-title"
  );
  function handleTitleInteraction(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        skillsTitle.classList.add("active");
      }
    });
  }

  const imgAppearOnScroll = document.querySelectorAll(
    ".about-me-img-and-btn-container"
  );

  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.5,
  });
  const observerProjectTitle = new IntersectionObserver(
    handleTitleInteraction,
    {
      threshold: 0.5,
    }
  );

  // Observer la div
  imgAppearOnScroll.forEach((div) => {
    observer.observe(div);
  });
  observerProjectTitle.observe(hiddenTitleBlock);
});
