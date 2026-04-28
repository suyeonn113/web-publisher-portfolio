import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";

let cursor = null;
let keyIcon = null;
let hasMoved = false;
let lastX = 0;
let lastY = 0;
let hoverTargets = [];

function createCursor() {
  const existingCursor = document.querySelector(".cursor-satellite");

  if (existingCursor) {
    cursor = existingCursor;
    keyIcon = cursor.querySelector(".key-cursor");
    return;
  }

  cursor = document.createElement("div");
  cursor.className = "cursor-satellite";

  cursor.innerHTML = `
    <svg class="key-cursor" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M25 5 C 10 4, 2 15, 5 30 C 8 45, 20 48, 35 42 C 45 38, 48 20, 40 10 C 35 5, 30 6, 25 5 Z M 25 15 C 32 15, 35 22, 35 25 C 35 32, 28 35, 25 35 C 18 35, 15 28, 15 25 C 15 18, 22 15, 25 15 Z"/>
      <rect x="42" y="22" width="45" height="6"/>
      <rect x="70" y="28" width="6" height="8"/>
      <rect x="81" y="28" width="6" height="8"/>
    </svg>
  `;

  document.body.appendChild(cursor);
  keyIcon = cursor.querySelector(".key-cursor");

  gsap.set(cursor, {
    x: 0,
    y: 0,
    xPercent: 60,
    yPercent: -10,
    autoAlpha: 0,
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 9999
  });

  gsap.set(keyIcon, {
    rotate: 0,
    transformOrigin: "25% 50%"
  });
}

function bindHoverTargets() {
  hoverTargets.forEach((el) => {
    el.removeEventListener("mouseenter", handleMouseEnter);
    el.removeEventListener("mouseleave", handleMouseLeave);
    el.removeEventListener("click", resetCursorHover);
  });

  hoverTargets = Array.from(
    document.querySelectorAll("a, button, select, .char--key-hole, .float-wrap")
  );

  hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("click", resetCursorHover);
  });
}

function handleMouseEnter() {
  const isKeyHole = this.matches(
    "body[data-page='home'] .hero .char--key-hole"
  );
  cursor?.classList.add("is-hover");

  gsap.to(cursor, {
    scale: 1.25,
    duration: 0.28,
    ease: "power2.out"
  });

  gsap.to(keyIcon, {
    rotate: 25,
    duration: 0.25,
    ease: "power2.out"
  });

  if (isKeyHole) {
    cursor?.classList.add("is-key-hole");
    const svgO = this.querySelector(".svg-o");

    gsap.to(svgO, {
      scale: 1.15,
      rotate: 2,
      duration: 0.18,
      ease: "power2.out",
      transformOrigin: "50% 50%"
    });

    gsap.to(keyIcon, {
      scale: 1.8,
      duration: 0.2,
      ease: "power2.out"
    });

    gsap.to(keyIcon, {
      rotate: 180,
      x: 12,
      duration: 0.35,
      ease: "power2.inOut",
      transformOrigin: "50% 50%"
    });
  }
}

function handleMouseLeave() {
  cursor?.classList.remove("is-key-hole");
  const isKeyHole = this.matches(
    "body[data-page='home'] .hero .char--key-hole"
  );

  cursor?.classList.remove("is-hover");

  gsap.to(cursor, {
    scale: 1,
    duration: 0.28,
    ease: "power2.out"
  });

  if (isKeyHole) {
    const svgO = this.querySelector(".svg-o");

    gsap.killTweensOf(svgO);
    gsap.killTweensOf(keyIcon);

    gsap.to(svgO, {
      scale: 1,
      rotate: 0,
      x: 0,
      y: 0,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto"
    });

    gsap.to(keyIcon, {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      duration: 0.28,
      ease: "elastic.out(1, 0.45)",
      overwrite: "auto"
    });

    return;
  }

  gsap.to(keyIcon, {
    rotate: 0,
    duration: 0.25,
    ease: "power2.out",
    overwrite: "auto"
  });
}

function resetCursorHover() {
  cursor?.classList.remove("is-key-hole");
  cursor?.classList.remove("is-hover");

  gsap.killTweensOf(keyIcon);

  gsap.to(cursor, {
    scale: 1,
    duration: 0.18,
    ease: "power2.out",
    overwrite: "auto"
  });

  gsap.to(keyIcon, {
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    duration: 0.18,
    ease: "power2.out",
    overwrite: "auto"
  });
}

function handleMouseMove(e) {
  if (!cursor || !keyIcon) return;

  const currentX = e.clientX;
  const currentY = e.clientY;

  if (!hasMoved) {
    hasMoved = true;
    lastX = currentX;
    lastY = currentY;

    gsap.set(cursor, {
      x: currentX,
      y: currentY,
      autoAlpha: 1
    });

    return;
  }

  const deltaX = currentX - lastX;
  const deltaY = currentY - lastY;
  const isHover = cursor.classList.contains("is-hover");
  const isKeyHoleHover = cursor.classList.contains("is-key-hole");
  const baseRotate = isKeyHoleHover ? 180 : isHover ? 180 : 0;
  const swing = gsap.utils.clamp(-18, 18, deltaX * 0.45 + deltaY * 0.18);

  lastX = currentX;
  lastY = currentY;

  gsap.to(cursor, {
    x: currentX,
    y: currentY,
    duration: 0.32,
    ease: "power2.out",
    overwrite: "auto"
  });

  gsap.to(keyIcon, {
    rotate: baseRotate + swing,
    duration: 0.18,
    ease: "power2.out",
    overwrite: "auto"
  });

  gsap.to(keyIcon, {
    rotate: baseRotate,
    duration: 0.75,
    delay: 0.08,
    ease: "elastic.out(1, 0.45)",
    overwrite: "auto"
  });
}

export function initCursor() {
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isTouchDevice || prefersReducedMotion) return;

  createCursor();
  bindHoverTargets();

  window.removeEventListener("mousemove", handleMouseMove);
  window.addEventListener("mousemove", handleMouseMove);
}