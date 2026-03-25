<template>
  <section class="page">
    <div ref="cardEl" class="card">
      <!-- CONTENT PANEL -->
      <div ref="contentEl" class="panel content">
        <div class="contentInner">
          <!-- Brand INSIDE content -->
          <div class="brandBar" aria-label="Company brand">
            <div class="brandLeft">
              <img
                v-if="logoSrc"
                :src="logoSrc"
                class="brandLogo"
                alt="LAPNet logo"
              />
              <div class="brandText">
                <div class="brandName">{{ companyName }}</div>
                <div class="brandSub">LAO NATIONAL PAYMENT NETWORK CO., LTD</div>
              </div>
            </div>

            <div class="brandRight">
              <span class="brandChip">
                {{ current === 0 ? labelA : labelB }}
              </span>
            </div>
          </div>

          <!-- Title area (modern) -->
          <div class="titleArea">
            <div class="kickerRow">
              <span class="kickerDot" aria-hidden="true"></span>
              <div class="kicker">ABOUT US</div>
              <span class="kickerLine" aria-hidden="true"></span>
            </div>

            <h1 class="headline">
              {{ current === 0 ? "Our Vision" : "Our Mission" }}
            </h1>

            <p class="desc">
              {{ current === 0 ? visionHint : missionHint }}
            </p>
          </div>

          <!-- Content swap panes -->
          <div ref="stackEl" class="contentStack">
            <div ref="contentA" class="contentPane">
              <slot name="content1" />
            </div>
            <div ref="contentB" class="contentPane">
              <slot name="content2" />
            </div>
          </div>

          <!-- Button bottom of content -->
          <div class="contentFooter">
            <button
              ref="btnEl"
              class="switchBtn"
              :disabled="animating"
              @click="toggle"
              @mouseenter="onBtnEnter"
              @mouseleave="onBtnLeave"
            >
              <span class="btnText">
                {{ current === 0 ? switchLabel : backLabel }}
              </span>

              <!-- Arrow icon (FontAwesome) -->
              <span class="btnIcon" aria-hidden="true">
                <!-- ✅ base icon is RIGHT, then flip to LEFT by scaleX(-1) -->
                <i class="fa-solid fa-arrow-right"></i>
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- IMAGE PANEL -->
      <div ref="imageEl" class="panel image" aria-label="Image panel">
        <div class="imageStack">
          <img ref="imgA" class="bgImg" :src="image1" alt="Image 1" />
          <img ref="imgB" class="bgImg" :src="image2" alt="Image 2" />
          <div class="imgOverlay" aria-hidden="true"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { gsap } from "gsap";

const props = defineProps({
  companyName: { type: String, default: "YOUR COMPANY" },
  logoSrc: { type: String, default: "" },

  image1: { type: String, required: true },
  image2: { type: String, required: true },

  labelA: { type: String, default: "VISION" },
  labelB: { type: String, default: "MISSION" },
  switchLabel: { type: String, default: "OUR MISSION" },
  backLabel: { type: String, default: "OUR VISION" },

  visionHint: { type: String, default: "" },
  missionHint: { type: String, default: "" },
});

const cardEl = ref(null);
const contentEl = ref(null);
const imageEl = ref(null);

const stackEl = ref(null);
const contentA = ref(null);
const contentB = ref(null);
const imgA = ref(null);
const imgB = ref(null);

const btnEl = ref(null);

const current = ref(0);
const animating = ref(false);

/** responsive mode */
const stacked = ref(false);
let mql;
let ro; // ResizeObserver (fix content cut on responsive)
let lastStackH = 0;

function setArrowDirection(dir, immediate = false) {
  // dir: 1 = right, -1 = left
  if (!btnEl.value) return;
  const icon = btnEl.value.querySelector(".btnIcon");
  if (!icon) return;

  if (immediate) {
    gsap.set(icon, { scaleX: dir });
    return;
  }
  gsap.to(icon, { scaleX: dir, duration: 0.25, ease: "power2.out" });
}

function arrowNudge(dir = 1) {
  if (!btnEl.value) return;
  const icon = btnEl.value.querySelector(".btnIcon");
  if (!icon) return;

  gsap.fromTo(
    icon,
    { x: 0 },
    {
      x: 6 * dir, // ✅ nudge follows arrow direction
      duration: 0.22,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    }
  );
}

function onBtnEnter() {
  if (!btnEl.value) return;
  gsap.to(btnEl.value, { y: -1, duration: 0.18, ease: "power2.out" });
}
function onBtnLeave() {
  if (!btnEl.value) return;
  gsap.to(btnEl.value, { y: 0, duration: 0.18, ease: "power2.out" });
}

/** ✅ IMPORTANT FIX:
 *  - On responsive, panes are absolute -> getBoundingClientRect() = parent height (wrong)
 *  - Use scrollHeight to get real content height so it won't be cut/hidden
 */
function getPaneHeight(el) {
  if (!el) return 0;
  const h = el.scrollHeight; // real content height
  return Math.max(1, Math.ceil(h));
}

function setStackHeight(idx = current.value, immediate = true) {
  if (!stackEl.value) return;

  // desktop uses original flex behavior
  if (!stacked.value) {
    stackEl.value.style.height = "";
    lastStackH = 0;
    return;
  }

  const pane = idx === 0 ? contentA.value : contentB.value;
  if (!pane) return;

  const h = getPaneHeight(pane);

  // guard to avoid endless resize loops
  if (Math.abs(h - lastStackH) < 2) return;
  lastStackH = h;

  if (immediate) gsap.set(stackEl.value, { height: h });
  else gsap.to(stackEl.value, { height: h, duration: 0.35, ease: "power2.out" });
}

function applyState(immediate = true) {
  const goingToB = current.value === 1;

  // panel placement
  if (stacked.value) {
    gsap.set(contentEl.value, { xPercent: 0, borderRadius: "24px 24px 0 0" });
    gsap.set(imageEl.value, { xPercent: 0, borderRadius: "0 0 24px 24px" });
  } else {
    gsap.set(contentEl.value, {
      xPercent: goingToB ? 100 : 0,
      borderRadius: goingToB ? "0 24px 24px 0" : "24px 0 0 24px",
    });
    gsap.set(imageEl.value, {
      xPercent: goingToB ? -100 : 0,
      borderRadius: goingToB ? "24px 0 0 24px" : "0 24px 24px 0",
    });
  }

  // panes
  gsap.set(contentA.value, {
    autoAlpha: goingToB ? 0 : 1,
    y: goingToB ? -10 : 0,
    filter: goingToB ? "blur(10px)" : "blur(0px)",
    pointerEvents: goingToB ? "none" : "auto",
  });
  gsap.set(contentB.value, {
    autoAlpha: goingToB ? 1 : 0,
    y: goingToB ? 0 : 10,
    filter: goingToB ? "blur(0px)" : "blur(10px)",
    pointerEvents: goingToB ? "auto" : "none",
  });

  // images
  gsap.set(imgA.value, { autoAlpha: goingToB ? 0 : 1, scale: goingToB ? 1.08 : 1.03 });
  gsap.set(imgB.value, { autoAlpha: goingToB ? 1 : 0, scale: goingToB ? 1.03 : 1.08 });

  // ✅ arrow: Vision (0) => right, Mission (1) => left
  setArrowDirection(current.value === 0 ? 1 : -1, immediate);

  nextTick(() => setStackHeight(current.value, true));
}

function setInitial() {
  applyState(true);
}

function animateTo(next) {
  animating.value = true;
  const goingToB = next === 1;

  // ✅ direction for the state we're moving TO
  const dirTo = goingToB ? -1 : 1; // Mission => left, Vision => right
  setArrowDirection(dirTo);

  const tl = gsap.timeline({
    defaults: { duration: 0.9, ease: "expo.inOut" },
    onComplete: () => {
      current.value = next;
      animating.value = false;
      nextTick(() => setStackHeight(current.value, false));
      arrowNudge(dirTo);
    },
  });

  // ✅ mobile stacked: do NOT swap panel positions, but ensure content height always fits
  if (stacked.value) {
    const hNext = getPaneHeight(goingToB ? contentB.value : contentA.value);
    lastStackH = hNext;

    tl.to(stackEl.value, { height: hNext, duration: 0.35, ease: "power2.out" }, 0);

    // content crossfade
    tl.to(
      contentA.value,
      {
        autoAlpha: goingToB ? 0 : 1,
        y: goingToB ? -10 : 0,
        filter: goingToB ? "blur(10px)" : "blur(0px)",
        pointerEvents: goingToB ? "none" : "auto",
        duration: 0.5,
        ease: "power2.out",
      },
      0
    ).to(
      contentB.value,
      {
        autoAlpha: goingToB ? 1 : 0,
        y: goingToB ? 0 : 10,
        filter: goingToB ? "blur(0px)" : "blur(10px)",
        pointerEvents: goingToB ? "auto" : "none",
        duration: 0.6,
        ease: "power2.out",
      },
      0.12
    );

    // image crossfade + subtle zoom
    tl.to(
      imgA.value,
      { autoAlpha: goingToB ? 0 : 1, scale: goingToB ? 1.08 : 1.03, duration: 0.75 },
      0
    );
    tl.to(
      imgB.value,
      { autoAlpha: goingToB ? 1 : 0, scale: goingToB ? 1.03 : 1.08, duration: 0.8 },
      0.06
    );

    // title micro motion + card pop
    const titleArea = cardEl.value?.querySelector(".titleArea");
    if (titleArea) {
      tl.fromTo(
        titleArea,
        { y: 0 },
        { y: -6, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" },
        0.08
      );
    }
    tl.fromTo(
      cardEl.value,
      { scale: 1 },
      { scale: 1.01, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" },
      0.1
    );

    return;
  }

  // ✅ desktop/tablet: original swap panels animation
  tl.to(
    contentEl.value,
    {
      xPercent: goingToB ? 100 : 0,
      borderRadius: goingToB ? "0 24px 24px 0" : "24px 0 0 24px",
    },
    0
  ).to(
    imageEl.value,
    {
      xPercent: goingToB ? -100 : 0,
      borderRadius: goingToB ? "24px 0 0 24px" : "0 24px 24px 0",
    },
    0
  );

  // content crossfade
  tl.to(
    contentA.value,
    {
      autoAlpha: goingToB ? 0 : 1,
      y: goingToB ? -10 : 0,
      filter: goingToB ? "blur(10px)" : "blur(0px)",
      pointerEvents: goingToB ? "none" : "auto",
      duration: 0.5,
      ease: "power2.out",
    },
    0
  );

  tl.to(
    contentB.value,
    {
      autoAlpha: goingToB ? 1 : 0,
      y: goingToB ? 0 : 10,
      filter: goingToB ? "blur(0px)" : "blur(10px)",
      pointerEvents: goingToB ? "auto" : "none",
      duration: 0.6,
      ease: "power2.out",
    },
    0.12
  );

  // image crossfade + subtle zoom
  tl.to(
    imgA.value,
    { autoAlpha: goingToB ? 0 : 1, scale: goingToB ? 1.08 : 1.03, duration: 0.75 },
    0
  );

  tl.to(
    imgB.value,
    { autoAlpha: goingToB ? 1 : 0, scale: goingToB ? 1.03 : 1.08, duration: 0.8 },
    0.06
  );

  // title micro motion
  const titleArea = cardEl.value?.querySelector(".titleArea");
  if (titleArea) {
    tl.fromTo(
      titleArea,
      { y: 0 },
      { y: -6, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" },
      0.08
    );
  }

  // tiny card pop
  tl.fromTo(
    cardEl.value,
    { scale: 1 },
    { scale: 1.01, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" },
    0.1
  );
}

function toggle() {
  if (animating.value) return;
  animateTo(current.value === 0 ? 1 : 0);
}

function updateLayoutMode() {
  if (!mql) return;
  const next = !!mql.matches;
  if (stacked.value === next) return;
  stacked.value = next;
  nextTick(() => applyState(true));
}

onMounted(() => {
  mql = window.matchMedia("(max-width: 860px)");
  stacked.value = !!mql.matches;

  if (mql.addEventListener) mql.addEventListener("change", updateLayoutMode);
  else mql.addListener(updateLayoutMode);

  // ✅ ResizeObserver: if slot content changes height (wrap/image load), auto-fix stack height
  if (window.ResizeObserver) {
    ro = new ResizeObserver(() => {
      if (!stacked.value) return;
      // wait layout settle
      requestAnimationFrame(() => setStackHeight(current.value, true));
    });

    // observe both panes
    nextTick(() => {
      if (contentA.value) ro.observe(contentA.value);
      if (contentB.value) ro.observe(contentB.value);
    });
  }

  nextTick(() => setInitial());
});

onBeforeUnmount(() => {
  if (ro) ro.disconnect();
  if (!mql) return;
  if (mql.removeEventListener) mql.removeEventListener("change", updateLayoutMode);
  else mql.removeListener(updateLayoutMode);
});
</script>

<style scoped>
.page{
  min-height: 80vh;
  display:flex;
  align-items:center;
  justify-content:center;
  padding: 24px;
  position: relative;
}

.card{
  position: relative;
  width: min(1380px, 96vw);
  height: 560px;
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid var(--theme-border);
  box-shadow: 0 30px 70px rgba(18, 61, 138, 0.12);
  background: linear-gradient(180deg, rgba(255,255,255,.96), rgba(239,246,255,.84));
}

.panel{
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  will-change: transform;
}

/* Content left */
.content{
  left: 0;
  background: linear-gradient(180deg, rgba(255,255,255,.96), rgba(240,247,255,.9));
}
.contentInner{
  height: 100%;
  display:flex;
  flex-direction: column;
  padding: 22px 30px 28px;
}

/* Brand bar INSIDE content (modern) */
.brandBar{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding: 12px 14px;
  border-radius: 18px;
  border: 1px solid var(--theme-border);
  background: linear-gradient(180deg, rgba(255,255,255,.98), rgba(244,249,255,.9));
  box-shadow: 0 12px 24px rgba(18, 61, 138, .06);
  margin-bottom: 16px;
}

.brandLeft{
  display:flex;
  align-items:center;
  gap: 12px;
  color: var(--theme-text);
  min-width: 0;
}

.brandLogo{
  width: 42px;
  height: 42px;
  border-radius: 999px;
  object-fit: cover;
  border: 1px solid rgba(18, 74, 156, .12);
  background: linear-gradient(180deg, rgba(255,255,255,.96), rgba(236,245,255,.88));
  box-shadow: 0 10px 18px rgba(18, 61, 138, 0.08);
}

.brandText{
  display:flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}
.brandName{
  font-weight: 900;
  letter-spacing: .1px;
  font-size: 14px;
  line-height: 1.15;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.brandSub{
  font-size: 11px;
  color: var(--theme-text-dim);
  letter-spacing: .7px;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.brandChip{
  color: var(--theme-text-soft);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 1px;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid rgba(33, 93, 248, .14);
  background: rgba(33, 93, 248, .08);
}

/* Title area (bigger + modern) */
.titleArea{
  padding: 8px 2px 10px;
  margin-bottom: 6px;
}

.kickerRow{
  display:flex;
  align-items:center;
  gap: 10px;
  margin-bottom: 10px;
}
.kickerDot{
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 30%, rgba(95,220,255,1), rgba(15,77,212,1));
  box-shadow: 0 8px 18px rgba(33, 93, 248, .14);
}
.kicker{
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 1.4px;
  color: rgba(15, 77, 212, .88);
  text-transform: uppercase;
}
.kickerLine{
  height: 1px;
  flex: 1;
  background: linear-gradient(90deg, rgba(33,93,248,.35), rgba(33,93,248,0));
}

.headline{
  margin: 0 0 10px;
  font-size: 34px;
  line-height: 1.1;
  letter-spacing: -0.8px;
  color: var(--theme-text);
}

.desc{
  margin: 0;
  font-size: 14px;
  line-height: 1.75;
  color: var(--theme-text-soft);
  max-width: 58ch;
}

/* Content swap panes */
.contentStack{
  position: relative;
  flex: 1;
  overflow: auto;
  padding-top: 12px;
}
.contentPane{
  position: absolute;
  inset: 0;
}

/* make slot text look better */
.contentStack :deep(h1){
  margin: 0 0 10px;
  font-size: 22px;
  letter-spacing: -.2px;
  color: var(--theme-text);
}
.contentStack :deep(p){
  margin: 0;
  font-size: 14px;
  line-height: 1.9;
  color: var(--theme-text-soft);
}

/* Footer button */
.contentFooter{
  margin-top: 18px;
  display:flex;
  justify-content:flex-start;
}

.switchBtn{
  height: 48px;
  padding: 0 18px;
  border-radius: 16px;
  border: 1px solid rgba(15, 77, 212, .16);
  cursor: pointer;
  font-weight: 900;
  letter-spacing: .2px;
  color: #ffffff;
  background: linear-gradient(135deg, #0f4dd4, #2170ff 58%, #5fdcff 100%);
  display: inline-flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 16px 30px rgba(21, 76, 184, .18);
  transform: translateZ(0);
}

.switchBtn:hover{ filter: brightness(1.03); }
.switchBtn:active{ transform: translateY(1px); }
.switchBtn:disabled{
  opacity: .6;
  cursor: not-allowed;
}

.btnText{ white-space: nowrap; }

/* FontAwesome arrow */
.btnIcon{
  width: 18px;
  height: 18px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  transform-origin: center;
}
.btnIcon i{
  font-size: 16px;
  line-height: 1;
}

/* Image right (full cover) */
.image{
  left: 50%;
  background:
    radial-gradient(circle at 18% 18%, rgba(95,220,255,.18), transparent 26%),
    linear-gradient(160deg, rgba(8,24,58,.98), rgba(10,40,96,.94) 56%, rgba(16,83,165,.88));
}
.imageStack{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.bgImg{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform-origin: center;
}
.imgOverlay{
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgba(3, 10, 26, 0.1), rgba(3, 10, 26, 0.4)),
    linear-gradient(90deg, rgba(3, 10, 26, 0), rgba(3, 10, 26, 0.12));
}

/* =========================
   Responsive (ไม่เปลี่ยนสไตล์)
   ========================= */
@media (max-width: 1200px){
  .card{ height: 520px; }
  .contentInner{ padding: 20px 24px 24px; }
  .headline{ font-size: 32px; }
}
@media (max-width: 1024px){
  .card{ height: 500px; }
  .headline{ font-size: 30px; }
}
@media (max-width: 860px){
  .page{ padding: 16px; }

  .card{
    height: auto;
    width: min(720px, 100%);
    display: flex;
    flex-direction: column;
  }

  .panel{
    position: relative;
    width: 100%;
    height: auto;
  }

  .content{ left: 0; }
  .image{
    left: 0;
    height: 260px;
  }

  .contentInner{
    height: auto;
    padding: 18px 18px 20px;
  }

  /* ✅ FIX: do not hide content on mobile */
  .contentStack{
    flex: none;
    overflow: visible; /* was hidden -> content got cut */
    padding-top: 10px;
  }

  .headline{ font-size: 28px; }
  .desc{ max-width: 68ch; }
}
@media (max-width: 480px){
  .brandBar{ padding: 10px 12px; border-radius: 16px; }
  .brandLogo{ width: 38px; height: 38px; }
  .headline{ font-size: 24px; }

  .contentFooter{ justify-content: stretch; }
  .switchBtn{
    width: 100%;
    justify-content: center;
  }
}
@media (max-width: 495px){
 .brandChip{
  display: none;
 }
}

/* optional: user prefers reduced motion */
@media (prefers-reduced-motion: reduce){
  .panel{ will-change: auto; }
}
</style>
