const headerButtons = document.querySelector('.header__buttons');
const headerMenu = document.querySelector('.header__menu');
const headerInner = document.querySelector('.header__inner');
function moveHeaderButtons() {
  if (window.innerWidth < 769) {
    headerMenu.appendChild(headerButtons);
  } else {
    headerInner.appendChild(headerButtons);
  }
}
moveHeaderButtons();
window.addEventListener('resize', moveHeaderButtons);

const headerBurger = document.querySelector('.header__burger');
const header = document.querySelector('.header');
headerBurger.addEventListener('click', () => {
  header.classList.toggle('menu-show');
});



let wedoSlider = new Swiper(".wedo__slider", {
    loop: false,
    spaceBetween: 82,
    slidesPerView: 'auto',
    autoHeight: true,
	  navigation: {
        nextEl: ".wedo__next",
    },
    breakpoints: {
        769: {
            spaceBetween: 57,
            slidesPerView: 'auto',
			      initialSlide: 0,
            autoHeight: false,
        },
        1441: {
          autoHeight: false,
			      initialSlide: 1,
        },
    },
});

let membershipSlider = new Swiper(".membership__slider", {
    loop: false,
    spaceBetween: 20,
    slidesPerView: 1,
	  navigation: {
        nextEl: ".membership__next",
    },
    breakpoints: {
        480: {
            spaceBetween: 59,
            slidesPerView: 2,
        },
        769: {
            spaceBetween: 59,
            slidesPerView: 4,
        },
		    1441: {
            spaceBetween: 65,
            slidesPerView: 5,
        },
    },
});

let teaserSlider = new Swiper(".teaser__slider", {
    loop: false,
    spaceBetween: 20,
    slidesPerView: 1,
	navigation: {
        nextEl: ".teaser__next",
    },
    breakpoints: {
        480: {
            spaceBetween: 20,
            slidesPerView: 1.02,
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
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
resizeHeight();
window.addEventListener('resize', resizeHeight);

document.addEventListener("DOMContentLoaded", () => {
  const applyBlock = document.querySelector(".header__apply");
  const applyBtn = document.querySelector(".header__apply-btn");

  document.addEventListener("click", (e) => {
    const clickedButton = applyBtn?.contains(e.target);
    const clickedInsideBlock = applyBlock?.contains(e.target);

    if (clickedButton) {
      applyBlock.classList.toggle("active");
    } else if (applyBlock?.classList.contains("active") && !clickedInsideBlock) {
      applyBlock.classList.remove("active");
    }
  });
});

gsap.registerPlugin(ScrollTrigger);

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

const heroTitleSpan = document.querySelector(".hero__title span:nth-of-type(1)");
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

document.querySelectorAll(".hero__descr").forEach(span => {
  wrapText(span);
  const letters = span.querySelectorAll(".letter");

  gsap.set(letters, {
    yPercent: 100,
    opacity: 0
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: span,
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });

  tl.to(letters, {
    yPercent: 0,
    opacity: 1,
    duration: 0.04,
    ease: "power4.out",
    stagger: 0.02,
  });
});

const otherTitleSpans = document.querySelectorAll(".hero__title > span:not(:first-of-type)");
if (otherTitleSpans.length) {
  gsap.set(otherTitleSpans, {
    x: -50,
    opacity: 0
  });

  gsap.timeline({
    scrollTrigger: {
      trigger: ".hero__title",
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  })
  .to(otherTitleSpans, {
    x: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.2
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
      ease: "power1.out"
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
      ease: "power1.out"
    });
  });
}

const heroLogo = document.querySelector(".hero__block .hero__logo");
const heroConf = document.querySelector(".hero__block .hero__conf");

if (heroLogo && heroConf) {
  gsap.set([heroLogo, heroConf], {
    y: 50,
    opacity: 0
  });

  const tlBlock = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero__block",
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });

  tlBlock.to(heroLogo, {
    y: 0,
    opacity: 1,
    duration: 0.6,
    ease: "power3.out"
  })
  .to(heroConf, {
    y: 0,
    opacity: 1,
    duration: 0.6,
    ease: "power3.out"
  }, "<+=0.1");
}

const heroName = document.querySelector(".hero__name");

if (heroName) {
  gsap.set(heroName, {
    x: -100,
    opacity: 0
  });

  gsap.to(heroName, {
    x: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: heroName,
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
}


const blocks = document.querySelectorAll('.hero, .another-block, .third-block');
const mouse = document.querySelector('.mouse-btn-hover');
let mouseX = 0;
let mouseY = 0;

function checkMousePosition() {
    let show = false;

    blocks.forEach(block => {
        const rect = block.getBoundingClientRect();
        if (
            mouseX >= rect.left &&
            mouseX <= rect.right &&
            mouseY >= rect.top &&
            mouseY <= rect.bottom
        ) {
            show = true;
        }
    });

    if (show) {
        mouse.style.display = 'block';
    } else {
        mouse.style.display = 'none';
    }
}

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    checkMousePosition();
    mouse.style.left = mouseX + 'px';
    mouse.style.top = mouseY + 'px';
});
window.addEventListener('scroll', () => {
    checkMousePosition();
});

const faqItems = document.querySelectorAll('.faq__item');
faqItems.forEach(item => {
  const title = item.querySelector('.faq__item-title');
  title.addEventListener('click', () => {
    if (item.classList.contains('active')) {
      item.classList.remove('active');
    } else {
      faqItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    }
  });
});


window.addEventListener('load', checkScroll);
window.addEventListener('resize', checkScroll);
window.addEventListener('scroll', checkScroll);
function checkScroll() {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}


function createScrollAnimation(selector, animationProps, trigger = null) {
    const elements = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector];

    if (elements.length > 1 && animationProps.stagger) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: trigger || elements[0],
                start: "top 70%",
                end: "bottom 10%",
                toggleActions: "play reverse play reverse",
            }
        });
        tl.fromTo(elements,
            animationProps.from,
            { ...animationProps.to, stagger: animationProps.stagger }
        );
    } else {
        elements.forEach(el => {
            gsap.set(el, animationProps.from);
            gsap.to(el, {
                ...animationProps.to,
                scrollTrigger: {
                    trigger: trigger || el,
                    start: "top 70%",
                    end: "bottom 10%",
                    toggleActions: "play reverse play reverse",
                }
            });
        });
    }
}
createScrollAnimation('.hero__descr', {
    from: { x: -100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
}, '.hero');

createScrollAnimation('.hero__block', {
    from: { scale: 0.8, opacity: 0, rotation: -20 },
    to: { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" }
}, '.hero');

createScrollAnimation('.hero__apply', {
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
}, '.hero');
createScrollAnimation('.hero__image-top', {
    from: { x: 200, rotation: -15, opacity: 1 },
    to: { x: 0, rotation: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
}, '.hero');

createScrollAnimation('.hero__image-bottom', {
    from: { x: 200, rotation: 15, opacity: 1 },
    to: { x: 0, rotation: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
}, '.hero');

createScrollAnimation('.membership__title', {
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
}, '.membership');
createScrollAnimation('.membership__next', {
    from: { x: -100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
}, '.membership');
document.querySelectorAll('.membership__item').forEach((card, i) => {
    createScrollAnimation(card, {
        from: { y: 200, opacity: 0, rotation: (i - 2) * 10 },
        to: { y: 0, opacity: 1, rotation: 0, duration: 1.2, ease: "power3.out", delay: i * 0.1 }
    }, '.membership');
});
createScrollAnimation('.creditcard__hand', {
    from: { x: -300, rotation: 30, opacity: 1 },
    to: { x: 0, rotation: 0, opacity: 1, duration: 1.8, ease: "power4.out" }
}, '.creditcard');
document.querySelectorAll('.teaser__slide').forEach((slide, i) => {
    createScrollAnimation(slide, {
        from: { x: i % 2 === 0 ? -200 : 200, opacity: 0 },
        to: { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: i * 0.1 }
    }, '.teaser');
});
createScrollAnimation('.whowe__about-image', {
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
}, '.whowe');

createScrollAnimation('.whowe__about-title', {
    from: { y: 80, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
}, '.whowe');

createScrollAnimation('.whowe__content', {
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
}, '.whowe');

createScrollAnimation('.whowe__title', {
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.4 }
}, '.whowe');

createScrollAnimation('.whowe__descr', {
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 }
}, '.whowe');

createScrollAnimation('.whowe__image', {
    from: { x: -150, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.7 }
}, '.whowe');

createScrollAnimation('.whowe__apply', {
    from: { y: -100, scale: 0.7, opacity: 0 },
    to: { y: 0, scale: 1, opacity: 1, duration: 0.8, ease: "back.out(2)" }
}, '.whowe');
createScrollAnimation('.wedo__title', {
    from: { x: 100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
}, '.wedo');
createScrollAnimation('.wedo__next', {
    from: { x: -100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
}, '.wedo');
createScrollAnimation('.wedo__descr', {
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
}, '.wedo');
document.querySelectorAll('.wedo__slide').forEach((slide, i) => {
    createScrollAnimation(slide, {
        from: { y: 100, opacity: 0 },
        to: { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: i * 0.2 }
    }, '.wedo');
});
const howItTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.howit',
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play reverse play reverse",
    }
});
howItTimeline.from('.howit__image', {
    x: -200,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});
howItTimeline.from('.howit__title', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
}, "-=0.5");
howItTimeline.from('.howit__icon', {
    y: -50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
}, "-=0.6");
howItTimeline.from('.howit__block .howit__item', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.2
}, "-=0.5");
howItTimeline.from('.howit__discover', {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
}, "-=0.3");



createScrollAnimation('.stories__title', {
    from: { x: 100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
}, '.stories');
createScrollAnimation('.stories__next', {
    from: { x: -100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
}, '.stories');

document.querySelectorAll('.stories__item').forEach((item, i) => {
    const content = item.querySelector('.stories__item-content');
    const image = item.querySelector('.stories__item-image');
    const isEven = i % 2 === 0;
    gsap.set(content, { x: isEven ? -200 : 200, opacity: 0 });
    gsap.set(image, { x: isEven ? 200 : -200, opacity: 0 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: item,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play reverse play reverse",
        }
    });

    tl.to(content, { x: 0, opacity: 1, duration: 1, ease: "power3.out" })
      .to(image, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.7"); 
});


createScrollAnimation('.stories__more', {
    from: { y: -50, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
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
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                type();
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(el);
}
typewriterEffectFromHTML('.creditcard__descr', 20);


createScrollAnimation('.teaser__title', {
    from: { x: 100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
}, '.teaser');
createScrollAnimation('.teaser__next', {
    from: { x: -100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
}, '.teaser');
createScrollAnimation('.faq__image', {
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
}, '.faq');
gsap.to('.faq__image', {
  y: -20,         
  duration: 2,    
  ease: "power1.inOut", 
  repeat: -1, 
  yoyo: true
});

createScrollAnimation('.faq__title', {
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
}, '.faq');
document.querySelectorAll('.faq__item').forEach((item, i) => {
    gsap.set(item, { y: 50, opacity: 0 });
    createScrollAnimation(item, {
        from: { y: 50, opacity: 0 },
        to: { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: i * 0.1 }
    }, '.faq');
});



const moreButtons = document.querySelectorAll('.header__more-open');
moreButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (window.innerWidth < 769) {
      const menuLink = button.closest('.header__menu-link');
      menuLink.classList.toggle('active-more');
    }
  });
});
