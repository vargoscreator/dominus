const headerButtons = document.querySelector(".header__buttons");
const headerMenu = document.querySelector(".header__menu");
const headerInner = document.querySelector(".header__inner");
function moveHeaderButtons() {
  const isMobile = window.innerWidth < 769;
  const isMoved = headerMenu.contains(headerButtons);

  if (isMobile && !isMoved) {
    headerMenu.appendChild(headerButtons);
    ScrollTrigger.refresh();
  } else if (!isMobile && isMoved) {
    headerInner.appendChild(headerButtons);
    ScrollTrigger.refresh();
  }
}
moveHeaderButtons();
window.addEventListener("resize", moveHeaderButtons);

const headerBurger = document.querySelector(".header__burger");
const header = document.querySelector(".header");
headerBurger.addEventListener("click", () => {
  header.classList.toggle("menu-show");
});

let wedoSlider = new Swiper(".wedo__slider", {
  loop: false,
  spaceBetween: 82,
  slidesPerView: "auto",
  autoHeight: true,
  navigation: {
    nextEl: ".wedo__next",
  },
  breakpoints: {
    769: {
      spaceBetween: 57,
      slidesPerView: "auto",
      initialSlide: 0,
      autoHeight: false,
    },
    1441: {
      autoHeight: false,
      initialSlide: 1,
    },
  },
});

let teamSlider = new Swiper(".team__slider", {
  loop: false,
  spaceBetween: 18,
  slidesPerView: 1,
  navigation: {
    nextEl: ".team__next",
  },
  breakpoints: {
    481: {
      slidesPerView: 2,
    },
    769: {
      spaceBetween: 20,
      slidesPerView: 3,
      initialSlide: 0,
    },
    1441: {
      spaceBetween: 20,
      slidesPerView: 4,
    },
  },
});

document.querySelectorAll(".membership").forEach((section) => {
  const sliderEl = section.querySelector(".membership__slider");
  const nextBtn = section.querySelector(".membership__next");
  const paginationEl = section.querySelector(".membership__pagination");

  if (!sliderEl) return;

  const isIncluded = sliderEl.classList.contains("membership__slider-included");

  new Swiper(sliderEl, {
    loop: false,
    speed: 600,
    spaceBetween: 20,
    slidesPerView: 1,
    watchSlidesProgress: true,
    navigation: {
      nextEl: nextBtn,
    },
    pagination: {
      el: paginationEl,
      clickable: true,
    },
    breakpoints: {
      481: {
        spaceBetween: isIncluded ? 20 : 59,
        slidesPerView: 2,
      },
      769: {
        spaceBetween: isIncluded ? 20 : 59,
        slidesPerView: 4,
      },
      1441: {
        spaceBetween: isIncluded ? 20 : 65,
        slidesPerView: isIncluded ? 4 : 5,
      },
    },
    on: {
      init() {},
    },
  });
});

let teaserSlider = new Swiper(".teaser__slider", {
  loop: false,
  spaceBetween: 20,
  slidesPerView: 1,
  navigation: {
    nextEl: ".teaser__next",
  },
  breakpoints: {
    481: {
      spaceBetween: 20,
      slidesPerView: 1,
    },
    769: {
      spaceBetween: 20,
      slidesPerView: 2.5,
    },
    1441: {
      spaceBetween: 23,
      slidesPerView: 2.5,
    },
  },
});

function resizeHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
resizeHeight();
window.addEventListener("resize", resizeHeight);

document.addEventListener("DOMContentLoaded", () => {
  const applyBlock = document.querySelector(".header__apply");
  const applyBtn = document.querySelector(".header__apply-btn");

  document.addEventListener("click", (e) => {
    const clickedButton = applyBtn?.contains(e.target);
    const clickedInsideBlock = applyBlock?.contains(e.target);

    if (clickedButton) {
      applyBlock.classList.toggle("active");
    } else if (
      applyBlock?.classList.contains("active") &&
      !clickedInsideBlock
    ) {
      applyBlock.classList.remove("active");
    }
  });
});

gsap.registerPlugin(ScrollTrigger);
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});

function wrapText(element) {
  const content = element.innerHTML.replace(/<br\s*\/?>/gi, "[[BR]]");
  const parts = content.split(/(\[\[BR\]\])/);

  element.innerHTML = parts
    .map((part) => {
      if (part === "[[BR]]") {
        return "<br>";
      }
      return part
        .split("")
        .map((char) =>
          char === " " ? "&nbsp;" : `<span class="letter">${char}</span>`
        )
        .join("");
    })
    .join("");
}

const heroTitleSpan = document.querySelector(
  ".hero__title span:nth-of-type(1)"
);
if (heroTitleSpan) {
  wrapText(heroTitleSpan);

  gsap.set(".hero__title span:nth-of-type(1) .letter", {
    y: "100%",
    opacity: 0,
  });

  gsap.to(".hero__title span:nth-of-type(1) .letter", {
    y: "0%",
    opacity: 1,
    duration: 0.6,
    ease: "power4.out",
    stagger: 0.03,
    scrollTrigger: {
      trigger: ".hero__inner",
      start: "top 50%",
      toggleActions: "play none none reverse",
    },
  });
}

document.querySelectorAll(".hero__descr").forEach((span) => {
  wrapText(span);
  const letters = span.querySelectorAll(".letter");

  gsap.set(letters, {
    yPercent: 100,
    opacity: 0,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: span,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  tl.to(letters, {
    yPercent: 0,
    opacity: 1,
    duration: 0.04,
    ease: "power4.out",
    stagger: 0.02,
  });
});

const otherTitleSpans = document.querySelectorAll(
  ".hero__title > span:not(:first-of-type)"
);
if (otherTitleSpans.length) {
  gsap.set(otherTitleSpans, {
    x: -50,
    opacity: 0,
  });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".hero__title",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    })
    .to(otherTitleSpans, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.2,
    });
}

const heroImage = document.querySelector(".hero__image-top");
if (heroImage) {
  document.addEventListener("mousemove", (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 20;
    const y = (e.clientY / innerHeight - 0.5) * 20;

    gsap.to(heroImage, {
      x: x,
      y: y,
      duration: 0.5,
      ease: "power1.out",
    });
  });
}

const heroImageBottom = document.querySelector(".hero__image-bottom");
if (heroImageBottom) {
  document.addEventListener("mousemove", (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 20;
    const y = (e.clientY / innerHeight - 0.5) * 20;

    gsap.to(heroImageBottom, {
      x: x,
      y: y,
      duration: 0.5,
      ease: "power1.out",
    });
  });
}

const heroLogo = document.querySelector(".hero__block .hero__logo");
const heroConf = document.querySelector(".hero__block .hero__conf");

if (heroLogo && heroConf) {
  gsap.set([heroLogo, heroConf], {
    y: 50,
    opacity: 0,
  });

  const tlBlock = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero__block",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  tlBlock
    .to(heroLogo, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
    })
    .to(
      heroConf,
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      },
      "<+=0.1"
    );
}

const heroName = document.querySelector(".hero__name");

if (heroName) {
  gsap.set(heroName, {
    x: -100,
    opacity: 0,
  });

  gsap.to(heroName, {
    x: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: heroName,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
}


const mouse = document.querySelector('.mouse-btn-hover');
const blocks = document.querySelectorAll('.hero, .service, .whowe');
if (blocks.length > 0 && mouse) {
  let mouseX = 0;
  let mouseY = 0;
  let isInsideBlock = false;
  let rAFScheduled = false;
  function updateMousePosition() {
    mouse.style.left = mouseX + "px";
    mouse.style.top = mouseY + "px";
    if (isInsideBlock) {
      mouse.style.display = "block";
    } else {
      mouse.style.display = "none";
    }

    rAFScheduled = false;
  }
  function scheduleUpdate() {
    if (!rAFScheduled) {
      requestAnimationFrame(updateMousePosition);
      rAFScheduled = true;
    }
  }
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    scheduleUpdate();
  });
  blocks.forEach((block) => {
    block.addEventListener("mouseenter", () => {
      isInsideBlock = true;
      scheduleUpdate();
    });
    block.addEventListener("mouseleave", () => {
      isInsideBlock = false;
      scheduleUpdate();
    });
  });
}

const faqItems = document.querySelectorAll(".faq__item");
faqItems.forEach((item) => {
  const title = item.querySelector(".faq__item-title");
  title.addEventListener("click", () => {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    } else {
      faqItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
    }
  });
});

window.addEventListener("load", checkScroll);
window.addEventListener("resize", checkScroll);
window.addEventListener("scroll", checkScroll);
function checkScroll() {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

function createScrollAnimation(selector, animationProps, trigger = null) {
  const elements =
    typeof selector === "string"
      ? document.querySelectorAll(selector)
      : [selector];

  if (elements.length > 1 && animationProps.stagger) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger || elements[0],
        start: "top 70%",
        end: "bottom 10%",
        toggleActions: "play reverse play reverse",
        invalidateOnRefresh: true,
      },
    });
    tl.fromTo(elements, animationProps.from, {
      ...animationProps.to,
      stagger: animationProps.stagger,
    });
  } else {
    elements.forEach((el) => {
      gsap.set(el, animationProps.from);
      gsap.to(el, {
        ...animationProps.to,
        scrollTrigger: {
          trigger: trigger || el,
          start: "top 70%",
          end: "bottom 10%",
          toggleActions: "play reverse play reverse",
          invalidateOnRefresh: true,
        },
      });
    });
  }
}
createScrollAnimation(
  ".hero__descr",
  {
    from: { x: -100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
  },
  ".hero"
);

createScrollAnimation(
  ".hero__block",
  {
    from: { scale: 0.8, opacity: 0, rotation: -20 },
    to: {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.5)",
    },
  },
  ".hero"
);

createScrollAnimation(
  ".hero__apply",
  {
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
  },
  ".hero"
);
createScrollAnimation(
  ".hero__image-top",
  {
    from: { x: 200, rotation: -15, opacity: 1 },
    to: { x: 0, rotation: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
  },
  ".hero"
);

createScrollAnimation(
  ".hero__image-bottom",
  {
    from: { x: 200, rotation: 15, opacity: 1 },
    to: { x: 0, rotation: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
  },
  ".hero"
);

document.querySelectorAll(".membership").forEach((membershipSection) => {
  const title = membershipSection.querySelector(".membership__title");
  if (title) {
    createScrollAnimation(
      title,
      {
        from: { x: 100, opacity: 0 },
        to: { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
      },
      membershipSection
    );
  }
  const next = membershipSection.querySelector(".membership__next");
  if (next) {
    createScrollAnimation(
      next,
      {
        from: { x: -100, opacity: 0 },
        to: { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
      },
      membershipSection
    );
  }
  membershipSection.querySelectorAll(".membership__item").forEach((card, i) => {
    createScrollAnimation(
      card,
      {
        from: { y: 200, opacity: 0 },
        to: {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: i * 0.1,
        },
      },
      membershipSection
    );
  });
});

createScrollAnimation(
  ".creditcard__hand",
  {
    from: { x: -300, rotation: 30, opacity: 1 },
    to: { x: 0, rotation: 0, opacity: 1, duration: 1.8, ease: "power4.out" },
  },
  ".creditcard"
);
document.querySelectorAll(".teaser__slide").forEach((slide, i) => {
  createScrollAnimation(
    slide,
    {
      from: { x: i % 2 === 0 ? -200 : 200, opacity: 0 },
      to: { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: i * 0.1 },
    },
    ".teaser"
  );
});
createScrollAnimation(
  ".whowe__about-image",
  {
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
  },
  ".whowe"
);

createScrollAnimation(
  ".whowe__about-title",
  {
    from: { y: 80, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 },
  },
  ".whowe"
);

createScrollAnimation(
  ".whowe__content",
  {
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 },
  },
  ".whowe"
);

createScrollAnimation(
  ".whowe__title",
  {
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.4 },
  },
  ".whowe"
);

createScrollAnimation(
  ".whowe__descr",
  {
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 },
  },
  ".whowe"
);

createScrollAnimation(
  ".whowe__image",
  {
    from: { x: -150, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.7 },
  },
  ".whowe"
);

createScrollAnimation(
  ".whowe__apply",
  {
    from: { y: -100, scale: 0.7, opacity: 0 },
    to: { y: 0, scale: 1, opacity: 1, duration: 0.8, ease: "back.out(2)" },
  },
  ".whowe"
);
createScrollAnimation(
  ".wedo__title",
  {
    from: { x: 100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
  },
  ".wedo"
);
createScrollAnimation(
  ".wedo__next",
  {
    from: { x: -100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
  },
  ".wedo"
);
createScrollAnimation(
  ".wedo__descr",
  {
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
  },
  ".wedo"
);
// document.querySelectorAll('.wedo__slide').forEach((slide, i) => {
//     createScrollAnimation(slide, {
//         from: { y: 100, opacity: 0 },
//         to: { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: i * 0.2 }
//     }, '.wedo');
// });
const howItTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".howit",
    start: "top 70%",
    end: "bottom 30%",
    toggleActions: "play reverse play reverse",
  },
});
howItTimeline.from(".howit__image", {
  x: -200,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});
howItTimeline.from(
  ".howit__title",
  {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  },
  "-=0.5"
);
howItTimeline.from(
  ".howit__icon",
  {
    y: -50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  },
  "-=0.6"
);
howItTimeline.from(
  ".howit__block .howit__item",
  {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.2,
  },
  "-=0.5"
);
howItTimeline.from(
  ".howit__discover",
  {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  },
  "-=0.3"
);

document.querySelectorAll(".team").forEach((teamSection) => {
  const title = teamSection.querySelector(".team__title");
  if (title) {
    createScrollAnimation(
      title,
      {
        from: { x: 100, opacity: 0 },
        to: { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
      },
      teamSection
    );
  }
  const next = teamSection.querySelector(".team__next");
  if (next) {
    createScrollAnimation(
      next,
      {
        from: { x: -100, opacity: 0 },
        to: { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
      },
      teamSection
    );
  }
  const descr = teamSection.querySelector(".team__descr");
  if (descr) {
    createScrollAnimation(
      descr,
      {
        from: { y: 100, opacity: 0 },
        to: { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      },
      teamSection
    );
  }
  const selectBtns = teamSection.querySelectorAll(".team__select-btn");
  if (selectBtns.length) {
    createScrollAnimation(
      selectBtns,
      {
        from: { y: 80, opacity: 0 },
        to: {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
        },
      },
      teamSection.querySelector(".team__select") || teamSection
    );
  }
  const slides = teamSection.querySelectorAll(".team__slide");
  if (slides.length) {
    slides.forEach((slide) => {
      createScrollAnimation(slide, {
        from: { y: 100, opacity: 0 },
        to: { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      });
    });
  }
});

createScrollAnimation(
  ".tiers__title",
  {
    from: { x: 100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
  },
  ".tiers"
);
createScrollAnimation(
  ".tiers__descr",
  {
    from: { x: -100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
  },
  ".tiers"
);
createScrollAnimation(
  ".tiers__table",
  {
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
  },
  ".tiers"
);

createScrollAnimation(
  ".stories__title",
  {
    from: { x: 100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
  },
  ".stories"
);
createScrollAnimation(
  ".stories__next",
  {
    from: { x: -100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
  },
  ".stories"
);
document.querySelectorAll(".stories__item").forEach((item, i) => {
  const content = item.querySelector(".stories__item-content");
  const image = item.querySelector(".stories__item-image");
  const isEven = i % 2 === 0;
  gsap.set(content, { x: isEven ? -200 : 200, opacity: 0 });
  gsap.set(image, { x: isEven ? 200 : -200, opacity: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: item,
      start: "top 70%",
      end: "bottom 30%",
      toggleActions: "play reverse play reverse",
    },
  });

  tl.to(content, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }).to(
    image,
    { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
    "-=0.7"
  );
});

createScrollAnimation(
  ".whymembership__title",
  {
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
  },
  ".whymembership"
);
document.querySelectorAll(".whymembership").forEach((item, i) => {
  const content = item.querySelector(".whymembership__content");
  const image = item.querySelector(".whymembership__image");
  const isEven = i % 2 === 0;
  gsap.set(content, { x: isEven ? -200 : 200, opacity: 0 });
  gsap.set(image, { x: isEven ? 200 : -200, opacity: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: item,
      start: "top 70%",
      end: "bottom 30%",
      toggleActions: "play reverse play reverse",
    },
  });

  tl.to(content, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }).to(
    image,
    { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
    "-=0.7"
  );
});
createScrollAnimation(".stories__more", {
  from: { y: -50, opacity: 0 },
  to: { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
});
createScrollAnimation(".imageBanner img", {
  from: { y: 0, opacity: 0, scale: 1.2 },
  to: { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" },
});
document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(".infoblock");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.01) {
          gsap.fromTo(
            entry.target,
            { y: 100, opacity: 1 },
            { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
          );
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: [0.01],
    }
  );

  blocks.forEach((block) => observer.observe(block));
});

function typewriterEffectFromHTML(selector, speed = 20) {
  const el = document.querySelector(selector);
  if (!el) return;

  const fullText = el.textContent.trim();
  el.textContent = "";

  let index = 0;

  function type() {
    if (index < fullText.length) {
      el.textContent += fullText.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          type();
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(el);
}
typewriterEffectFromHTML(".creditcard__descr", 20);

createScrollAnimation(
  ".teaser__title",
  {
    from: { x: 100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
  },
  ".teaser"
);
createScrollAnimation(
  ".teaser__next",
  {
    from: { x: -100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
  },
  ".teaser"
);
createScrollAnimation(
  ".faq__image",
  {
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
  },
  ".faq"
);
gsap.to(".faq__image", {
  y: -20,
  duration: 2,
  ease: "power1.inOut",
  repeat: -1,
  yoyo: true,
});

createScrollAnimation(
  ".faq__title",
  {
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
  },
  ".faq"
);
document.querySelectorAll(".faq__item").forEach((item, i) => {
  gsap.set(item, { y: 50, opacity: 0 });
  createScrollAnimation(
    item,
    {
      from: { y: 50, opacity: 0 },
      to: { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: i * 0.1 },
    },
    ".faq"
  );
});

const moreButtons = document.querySelectorAll(".header__more-open");
moreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (window.innerWidth < 769) {
      const menuLink = button.closest(".header__menu-link");
      menuLink.classList.toggle("active-more");
    }
  });
});

if (document.querySelector(".footer__bottom-copy")) {
  const year = new Date().getFullYear();
  document.querySelector(
    ".footer__bottom-copy"
  ).innerHTML = `© ${year} Dominus. All rights reserved.`;
}

const membershipItems = document.querySelectorAll(".membership__item");
if (window.innerWidth < 769) {
  membershipItems.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });
}

if (document.querySelector(".contactpopup")) {
  const contactPopup = document.querySelector(".contactpopup");
  const popupInner = document.querySelector(".contactpopup__inner");
  const popupClose = document.querySelector(".contactpopup__close");
  const contactButtons = document.querySelectorAll(".contact-open");
  contactButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      contactPopup.classList.add("show");
    });
  });
  popupClose.addEventListener("click", () => {
    contactPopup.classList.remove("show");
  });
  contactPopup.addEventListener("click", (e) => {
    if (!popupInner.contains(e.target)) {
      contactPopup.classList.remove("show");
    }
  });
}

if (document.querySelector(".emailconfirm")) {
  const emailconfirmPopup = document.querySelector(".emailconfirm");
  const emailconfirmInner = document.querySelector(".emailconfirm__inner");
  const emailconfirmClose = document.querySelector(".emailconfirm__close");
  const emailconfirmButtons = document.querySelectorAll(".emailconfirm-open");
  emailconfirmButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      emailconfirmPopup.classList.add("show");
    });
  });
  emailconfirmClose.addEventListener("click", () => {
    emailconfirmPopup.classList.remove("show");
  });
  emailconfirmPopup.addEventListener("click", (e) => {
    if (!emailconfirmInner.contains(e.target)) {
      emailconfirmPopup.classList.remove("show");
    }
  });
}

if (document.querySelector(".successfulpay")) {
  const successfulpayPopup = document.querySelector(".successfulpay");
  const successfulpayInner = document.querySelector(".successfulpay__inner");
  const successfulpayClose = document.querySelector(".successfulpay__close");
  const successfulpayButtons = document.querySelectorAll(".successfulpay-open");
  successfulpayButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      successfulpayPopup.classList.add("show");
    });
  });
  successfulpayClose.addEventListener("click", () => {
    successfulpayPopup.classList.remove("show");
  });
  successfulpayPopup.addEventListener("click", (e) => {
    if (!successfulpayInner.contains(e.target)) {
      successfulpayPopup.classList.remove("show");
    }
  });
}

function splitTextAnimation(selector, delay = 0, speed = 0.05) {
  const el = document.querySelector(selector);
  if (!el) return;
  const text = el.textContent;
  el.textContent = "";
  const chars = text.split("");
  chars.forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.opacity = 0;
    el.appendChild(span);
  });

  gsap.to(el.querySelectorAll("span"), {
    opacity: 1,
    duration: 0.05,
    stagger: speed,
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
      toggleActions: "play reverse play reverse",
    },
    delay: delay,
  });
}
splitTextAnimation(".service__title", 0, 0.05);
splitTextAnimation(".service__descr", 0.1, 0.02);
splitTextAnimation(".service__name", 0.2, 0.02);
gsap.utils.toArray(".service__info, .service__apply").forEach((el) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play reverse play reverse",
      },
    }
  );
});

document.addEventListener("DOMContentLoaded", () => {
  const codeInputs = document.querySelectorAll(
    '.emailconfirm-confirm-inputs input[type="tel"]'
  );
  codeInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      if (e.target.value.length > 1) {
        e.target.value = e.target.value.slice(0, 1);
      }
      if (e.target.value.length === 1 && index < codeInputs.length - 1) {
        codeInputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && input.value === "" && index > 0) {
        codeInputs[index - 1].focus();
      }
    });

    input.addEventListener("paste", (e) => {
      e.preventDefault();
      const pasteData = (e.clipboardData || window.clipboardData).getData(
        "text"
      );
      const digits = pasteData
        .replace(/\D/g, "")
        .split("")
        .slice(0, codeInputs.length);

      digits.forEach((digit, i) => {
        if (codeInputs[i]) {
          codeInputs[i].value = digit;
        }
      });
      const focusIndex = Math.min(digits.length, codeInputs.length - 1);
      codeInputs[focusIndex].focus();
    });
  });
});

document
  .querySelectorAll(".emailconfirm-confirm-inputs input")
  .forEach((input) => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/[^0-9]/g, "");
    });
  });

document.addEventListener("DOMContentLoaded", () => {
  const emailConfirmForms = document.querySelectorAll(".emailconfirm__form");
  emailConfirmForms.forEach((form) => {
    const inputs = form.querySelectorAll(
      ".emailconfirm-confirm-inputs input.form-required"
    );
    const errorElement = form.querySelector(".auth-form__error");

    inputs.forEach((input) => {
      input.addEventListener("input", () => validateInputs());
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (validateInputs()) {
        form.submit();
      }
    });

    function validateInputs() {
      let valid = true;
      inputs.forEach((input) => {
        if (!input.value.match(/^\d$/)) {
          valid = false;
        }
      });

      if (!valid) {
        showError(errorElement, "* Required field");
      } else {
        hideError(errorElement);
      }

      return valid;
    }

    function showError(element, message) {
      if (!element) return;
      element.textContent = message;
      element.style.display = "block";
      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, 10);
    }

    function hideError(element) {
      if (!element) return;
      element.style.opacity = "0";
      element.style.transform = "translateY(-0.5vw)";
      setTimeout(() => {
        element.style.display = "none";
      }, 300);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const applyForms = document.querySelectorAll(".applyfor__form");
  applyForms.forEach((form) => {
    const inputs = form.querySelectorAll("input.form-required");

    inputs.forEach((input) => {
      input.addEventListener("input", () => validateField(input));
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      inputs.forEach((input) => {
        if (!validateField(input)) valid = false;
      });

      if (valid) form.submit();
    });

    function validateField(input) {
      const value = input.value.trim();
      const errorElement = input.nextElementSibling;

      if (!value) {
        showError(errorElement, "* Required field", input);
        return false;
      }

      if (input.name === "card_number") {
        const cardRegex = /^[0-9 ]{16,19}$/;
        if (!cardRegex.test(value)) {
          showError(errorElement, "* Invalid card number", input);
          return false;
        }
      }

      if (input.name === "expiry_date") {
        const expRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expRegex.test(value)) {
          showError(errorElement, "* Invalid date (MM/YY)", input);
          return false;
        }
      }

      if (input.name === "cvc") {
        const cvcRegex = /^\d{3}$/;
        if (!cvcRegex.test(value)) {
          showError(errorElement, "* Invalid CVC", input);
          return false;
        }
      }

      hideError(errorElement, input);
      return true;
    }

    function showError(element, message, input) {
      if (!element) return;
      element.textContent = message;
      input.classList.add("input-error");
      element.style.display = "block";
      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, 10);
    }

    function hideError(element, input) {
      if (!element) return;
      input.classList.remove("input-error");
      element.style.opacity = "0";
      element.style.transform = "translateY(-0.5vw)";
      setTimeout(() => {
        element.style.display = "none";
      }, 300);
    }
  });
});

const selects = document.querySelectorAll(".custom-select");

selects.forEach((select) => {
  const trigger = select.querySelector(".custom-select__trigger");
  const dropdown = select.querySelector(".custom-select__dropdown");
  const options = select.querySelectorAll(".custom-select__option");
  const span = trigger.querySelector("span");

  trigger.addEventListener("click", () => {
    selects.forEach((s) => s !== select && s.classList.remove("open"));
    select.classList.toggle("open");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      options.forEach((opt) => opt.classList.remove("selected"));
      option.classList.add("selected");
      span.textContent = option.textContent;
      select.classList.remove("open");
    });
  });

  document.addEventListener("click", (e) => {
    if (!select.contains(e.target)) {
      select.classList.remove("open");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".js-auth-form");

  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input[required]");
    const textareas = form.querySelectorAll("textarea.form-required");
    const selects = form.querySelectorAll("select.form-required");
    const fileInput = form.querySelector('input[type="file"]');
    const fileError = fileInput
      ? fileInput
          .closest(".auth-form__field")
          .querySelector(".auth-form__error")
      : null;
    const checkboxGroups = form.querySelectorAll(
      ".form-checkboxes.form-required"
    );

    inputs.forEach((input) => {
      input.addEventListener("input", () => validateField(input));
    });

    textareas.forEach((textarea) => {
      textarea.addEventListener("input", () => validateTextarea(textarea));
    });

    selects.forEach((select) => {
      select.addEventListener("change", () => validateSelect(select));
    });

    if (fileInput) {
      fileInput.addEventListener("change", () => {
        if (fileInput.files.length > 0 && fileError)
          hideError(fileError, fileInput);
      });
    }

    checkboxGroups.forEach((group) => {
      const checkboxes = group.querySelectorAll("input[type='checkbox']");
      checkboxes.forEach((cb) => {
        cb.addEventListener("change", () => {
          if (cb.checked)
            hideError(
              group
                .closest(".auth-form__field")
                .querySelector(".auth-form__error"),
              group
            );
        });
      });
    });

    function validateField(input) {
      const value = input.value.trim();
      const type = input.type;
      const errorElement = input.nextElementSibling;

      if (!value) {
        showError(errorElement, "* Required field", input);
        return false;
      }

      if (type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          showError(errorElement, "* Invalid email format", input);
          return false;
        }
      }

      if (type === "tel") {
        const phoneRegex = /^\+?[0-9\s\-()]{10,}$/;
        if (!phoneRegex.test(value)) {
          showError(errorElement, "* Invalid phone number", input);
          return false;
        }
      }

      if (type === "number") {
        if (isNaN(value) || value <= 0) {
          showError(errorElement, "* Invalid number", input);
          return false;
        }
      }

      hideError(errorElement, input);
      return true;
    }

    function validateTextarea(textarea) {
      const value = textarea.value.trim();
      const errorElement = textarea.nextElementSibling;

      if (!value) {
        showError(errorElement, "* Required field", textarea);
        return false;
      } else {
        hideError(errorElement, textarea);
        return true;
      }
    }

    function validateSelect(select) {
      const value = select.value;
      const errorElement = select
        .closest(".auth-form__field")
        .querySelector(".auth-form__error");

      if (!value) {
        showError(errorElement, "* Required field", select);
        return false;
      } else {
        hideError(errorElement, select);
        return true;
      }
    }

    function validateCheckboxGroup(group) {
      const checkboxes = group.querySelectorAll("input[type='checkbox']");
      const errorElement = group
        .closest(".auth-form__field")
        .querySelector(".auth-form__error");
      let checked = false;
      checkboxes.forEach((cb) => {
        if (cb.checked) checked = true;
      });

      if (!checked) {
        showError(errorElement, "* Required field", group);
        return false;
      } else {
        hideError(errorElement, group);
        return true;
      }
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      inputs.forEach((input) => {
        if (!validateField(input)) valid = false;
      });
      textareas.forEach((textarea) => {
        if (!validateTextarea(textarea)) valid = false;
      });
      selects.forEach((select) => {
        if (!validateSelect(select)) valid = false;
      });
      if (fileInput && fileInput.files.length === 0) {
        if (fileError) showError(fileError, "* Required field", fileInput);
        valid = false;
      }
      checkboxGroups.forEach((group) => {
        if (!validateCheckboxGroup(group)) valid = false;
      });

      if (valid) form.submit();
    });

    function showError(element, message, input) {
      if (!element) return;
      element.textContent = message;
      if (
        input instanceof HTMLInputElement ||
        input instanceof HTMLSelectElement ||
        input instanceof HTMLTextAreaElement
      )
        input.classList.add("input-error");
      else if (input.classList) input.classList.add("input-error");
      element.style.display = "block";
      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, 10);
    }

    function hideError(element, input) {
      if (!element) return;
      if (
        input instanceof HTMLInputElement ||
        input instanceof HTMLSelectElement ||
        input instanceof HTMLTextAreaElement
      )
        input.classList.remove("input-error");
      else if (input.classList) input.classList.remove("input-error");
      element.style.opacity = "0";
      element.style.transform = "translateY(-0.5vw)";
      setTimeout(() => {
        element.style.display = "none";
      }, 300);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const dobInput = document.getElementById("auth-rep-dob");
  if (dobInput) {
    dobInput.setAttribute("maxlength", "10");
    dobInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");
      let formattedValue = "";
      if (value.length > 0) {
        formattedValue += value.substring(0, 2);
      }
      if (value.length >= 3) {
        formattedValue += "." + value.substring(2, 4);
      }
      if (value.length >= 5) {
        formattedValue += "." + value.substring(4, 8);
      }
      e.target.value = formattedValue;
      if (e.target.value.length > 10) {
        e.target.value = e.target.value.slice(0, 10);
      }
    });
    dobInput.addEventListener("paste", (e) => {
      const pasteData = (e.clipboardData || window.clipboardData).getData(
        "text"
      );
      const digits = pasteData.replace(/\D/g, "");
      let formattedPaste = "";
      if (digits.length > 0) formattedPaste += digits.substring(0, 2);
      if (digits.length >= 3) formattedPaste += "." + digits.substring(2, 4);
      if (digits.length >= 5) formattedPaste += "." + digits.substring(4, 8);

      e.target.value = formattedPaste.slice(0, 10);
      e.preventDefault();
      dobInput.dispatchEvent(new Event("input"));
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const textInputs = document.querySelectorAll(".text-only");
  textInputs.forEach((input) => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, "");
    });
  });
});
const heroBtn = document.querySelector(".hero__discover");
const heroSection = document.querySelector(".hero");
if (heroBtn && heroSection) {
  heroBtn.addEventListener("click", () => {
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    window.scrollTo({
      top: heroBottom,
      behavior: "smooth",
    });
  });
}

function updatePlaceholder() {
  const input = document.querySelector(".footer__form-input");
  if (input && window.innerWidth < 769) {
    input.placeholder = "Email";
  } else {
    input.placeholder = "Email address";
  }
}
updatePlaceholder();
window.addEventListener("resize", updatePlaceholder);

document.querySelectorAll(".stories__item-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const currentItem = btn.closest(".stories__item");
    const allItems = Array.from(document.querySelectorAll(".stories__item"));
    const currentIndex = allItems.indexOf(currentItem);

    const nextItem = allItems[currentIndex + 1];
    if (nextItem) {
      nextItem.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    let nextSection = currentItem.closest("section")?.nextElementSibling;
    while (nextSection && nextSection.tagName.toLowerCase() !== "section") {
      nextSection = nextSection.nextElementSibling;
    }

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const observerForSeveralBlocks = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;

      if (el.classList.contains("svg-animated")) {
        entry.isIntersecting
          ? el.classList.add("is-visible")
          : el.classList.remove("is-visible");
      }
    });
  },
  { threshold: 0.1 }
);

document
  .querySelectorAll(".svg-animated")
  .forEach((svg) => observerForSeveralBlocks.observe(svg));
