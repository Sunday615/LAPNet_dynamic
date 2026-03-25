<template>
  <div class="page">
    <!-- ✅ GSAP Loading Overlay (Glow Logo) -->
    <div class="loaderOverlay" v-show="loading" ref="loaderRef" aria-busy="true" aria-live="polite">
      <div class="loaderCard">
        <div class="logoWrap">
          <div class="halo" ref="haloRef" aria-hidden="true"></div>

          <img class="loaderLogo" :src="logoSrc" alt="LAPNet" ref="loaderLogoRef" draggable="false" />
        </div>

        <div class="loaderMeta">
          <div class="loaderTitle">Lao National Payment Network CO., LTD</div>

          <div class="loaderBar" aria-hidden="true">
            <div class="loaderBarFill" ref="barFillRef"></div>
          </div>

          <div class="loaderDots" ref="dotsRef" aria-hidden="true">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- ✅ Sidebar -->
    <homepage_sidebar v-model="sidebarOpen" />

    <div class="wrap">
      <!-- Top Nav -->
      <header class="topbar" ref="navRef">
        <div class="brand">
          <span class="brandDot" aria-hidden="true" style="width: 60px; height: 60px">
            <img src="/logolapnet/fullcircle.png" alt="" />
          </span>
          <span style="font-size: var(--fs-lapnet)">LAPNet</span>
        </div>

        <nav class="nav" @keydown.esc="closeMenu">
          <productDropdown />
          <memberdropdown />

          <router-link to="/bloggrid" class="navLink">ຂ່າວສານ ແລະ ກິດຈະກຳ</router-link>
          <router-link to="/joinus" class="navLink">ຮ່ວມງານກັບເຮົາ</router-link>
          <aboutusdropdown />

          <router-link to="/contactus" class="navLink">ຕິດຕໍ່ພວກເຮົາ</router-link>
        </nav>

        <div class="actions">
          <!-- ✅ hamburger: click -> open sidebar -->
          <button class="hamburger" type="button" aria-label="Open menu" @click="openSidebar">
            <i class="fa-solid fa-bars" aria-hidden="true"></i>
            <span class="hamburgerText">ເມນູ</span>
          </button>

          <!-- Facebook -->
          <a class="iconLink" href="https://www.facebook.com/laonationalpaymentnetwork" target="_blank" rel="noopener"
            aria-label="Facebook" title="Facebook">
            <i class="fa-brands fa-facebook-f"></i>
          </a>

          <!-- Email -->
          <a class="iconLink" href="http://103.27.200.222/roundcube/" target="_blank" aria-label="Email" title="Email">
            <i class="fa-solid fa-envelope"></i>
          </a>

          <!-- Login -->
          <a href="http://localhost:5173/login" target="_blank"> 
                <button class="btn btnGhost">ເຂົ້າສູ່ລະບົບ</button>

                </a>
         
       
      
        </div>
      </header>

      <!-- Hero -->
      <main class="hero">
        <div class="orbs" aria-hidden="true">
          <div class="orb orbA" ref="orbARef"></div>
          <div class="orb orbB" ref="orbBRef"></div>
          <div class="gridGlow" ref="gridRef"></div>
          <div class="sparkles" ref="sparklesRef"></div>
        </div>

        <div class="heroGrid">
          <section class="heroLeft">
            <div class="badge" ref="badgeRef">Lao National Payment Network</div>

            <h1 class="heroTitle" ref="titleRef">
              <span class="line">Anywhere <br> Anytime </span>
              <span class="line"><span class="ai"><br>Any Payment Channels</span></span>
            </h1>

            <p class="heroPara" ref="paraRef">
              ພັດທະນາລະບົບການຊໍາລະທຸລະກຳຍ່ອຍ ໃຫ້ເປັນສູນກາງການຊໍາລະຂອງບັນດາຜູ້ໃຫ້ບໍລິການຊໍາລະ ທັງພາຍໃນ ແລະ ສາກົນ, ແນໃສ່ໃຫ້ປະຊາຊົນລາວໄດ້ໃຊ້ບໍລິການຊໍາລະທີ່ສະດວກວ່ອງໄວ, ທັນສະໄໝ, ປອດໄພ ແລະ ຕົ້ນທືນຕໍ່າ.
            </p>

            <div class="ctaRow" ref="ctaRef">
              <router-link to="/products_service/allproduct">
                <button class="btn btnPrimary">ຜະລິດຕະພັນ ແລະ ການບໍລິການ ທັງໝົດ</button>
              </router-link>
              <router-link to="/contactus">
                <button class="btn btnOutline">ຕິດຕໍ່ພວກເຮົາ</button>
              </router-link>
            </div>
          </section>

          <section class="heroRight" ref="rightRef">
            <div class="mockupSlot" ref="mockupRef">

              <div class="mockupInner" :style="mockupInnerStyle">
                <atmmockup class="mockupFill" />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref, reactive, onMounted, onBeforeUnmount, watch, nextTick, computed } from "vue"
import gsap from "gsap"

import homepage_sidebar from "../../components/sidebar/homepage_sidebar.vue"
import productDropdown from "../../components/dropdown-homepage/product-dropdown.vue"
import memberdropdown from "../../components/dropdown-homepage/memberdropdown.vue"
import aboutusdropdown from "../../components/dropdown-homepage/aboutusdropdown.vue"

const atmmockup = defineAsyncComponent(() => import("../../components/mockup/atmmockup.vue"))
onMounted(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
});
/** ✅ Logo path */
const logoSrc = "/logolapnet/fullcircle.png"
const LOADING_MS = 500

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

/** ✅ Loader state + refs */
const loading = ref(true)
const loaderRef = ref(null)
const loaderLogoRef = ref(null)
const haloRef = ref(null)
const barFillRef = ref(null)
const dotsRef = ref(null)

let loaderLoopTweens = []

/** ✅ LOW POWER (mobile / reduce-motion) */
const isClient = typeof window !== "undefined"
const reduceMotion =
  isClient && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches

const viewportW = ref(isClient ? window.innerWidth : 1200)

const isMobile = computed(() => viewportW.value <= 980)
const lowPower = computed(() => !!(reduceMotion || isMobile.value))

/** ✅ ลดความละเอียด mockup บน mobile (ปรับได้ตามต้องการ) */
const mockupRenderScale = computed(() => {
  const w = viewportW.value
  if (w <= 520) return 0.72   // หนักมาก ลดเยอะ
  if (w <= 980) return 0.82   // mobile/tablet ลดกลาง ๆ
  return 1
})

const mockupInnerStyle = computed(() => {
  const s = mockupRenderScale.value
  const inv = 1 / s
  return {
    width: `${s * 100}%`,
    height: `${s * 100}%`,
    transform: `translate(-50%, -50%) scale(${inv})`,
  }
})

/** ✅ Keep intro tweens to kill later (กัน memory leak / crash) */
let introTL = null
let introTweens = []

function killAllGsap() {
  loaderLoopTweens.forEach((t) => t?.kill?.())
  loaderLoopTweens = []

  introTL?.kill?.()
  introTL = null

  introTweens.forEach((t) => t?.kill?.())
  introTweens = []

  gsap.killTweensOf([
    loaderRef.value,
    loaderLogoRef.value,
    haloRef.value,
    barFillRef.value,
    navRef.value,
    badgeRef.value,
    titleRef.value,
    paraRef.value,
    ctaRef.value,
    mockupRef.value,
    orbARef.value,
    orbBRef.value,
    gridRef.value,
    sparklesRef.value,
  ])
}

async function playLoaderAnim() {
  const overlay = loaderRef.value
  const logo = loaderLogoRef.value
  const halo = haloRef.value
  const bar = barFillRef.value
  if (!overlay || !logo || !halo || !bar) return

  const dots = dotsRef.value?.querySelectorAll?.(".dot") ?? []

  gsap.set(overlay, { autoAlpha: 1 })

  // ✅ lowPower: ไม่ loop / ไม่ทำงานหนัก
  if (lowPower.value) {
    gsap.set([logo, halo], { autoAlpha: 1, clearProps: "transform" })
    gsap.set(bar, { width: "100%" })
    return
  }

  gsap.set(logo, { autoAlpha: 0, scale: 0.92, y: 8 })
  gsap.set(halo, { autoAlpha: 0, scale: 0.85 })
  gsap.set(bar, { width: "0%" })

  loaderLoopTweens = [
    gsap.to(halo, { autoAlpha: 0.78, scale: 1.22, duration: 0.9, yoyo: true, repeat: -1, ease: "sine.inOut" }),
    gsap.to(logo, { y: -2, duration: 1.0, yoyo: true, repeat: -1, ease: "sine.inOut" }),
    gsap.to(dots, { y: -6, duration: 0.32, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.12 }),
  ]

  await new Promise((resolve) => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: resolve })
    tl.to([logo, halo], { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.06 })
      .to(bar, { width: "100%", duration: 0.6, ease: "power2.inOut" }, "<0.05")
  })
}

async function hideLoader() {
  const overlay = loaderRef.value
  if (!overlay) {
    loading.value = false
    return
  }

  // ✅ kill loops ก่อน fade ออก (ลดโหลดบน mobile)
  loaderLoopTweens.forEach((t) => t?.kill?.())
  loaderLoopTweens = []

  await new Promise((resolve) => {
    gsap.to(overlay, { autoAlpha: 0, duration: 0.22, ease: "power2.out", onComplete: resolve })
  })

  loading.value = false
}

/** ✅ Sidebar state */
const sidebarOpen = ref(false)
function openSidebar() {
  sidebarOpen.value = true
  closeMenu()
}

/** refs */
const navRef = ref(null)
const badgeRef = ref(null)
const titleRef = ref(null)
const paraRef = ref(null)
const ctaRef = ref(null)
const mockupRef = ref(null)

const orbARef = ref(null)
const orbBRef = ref(null)
const gridRef = ref(null)
const sparklesRef = ref(null)

/** dropdown state */
const openMenu = ref(null)
const visible = reactive({ products: false, about: false, member: false })

const productsPanelRef = ref(null)
const memberPanelRef = ref(null)
const aboutPanelRef = ref(null)

const panelMap = {
  products: productsPanelRef,
  about: aboutPanelRef,
  member: memberPanelRef,
}

const canHover = isClient && window.matchMedia?.("(hover: hover)").matches

function closeMenu() {
  openMenu.value = null
}

function smartPosition(name) {
  const el = panelMap[name]?.value
  if (!el) return

  el.style.left = "0px"
  el.style.right = "auto"

  const pad = 12
  const rect = el.getBoundingClientRect()
  if (rect.right > window.innerWidth - pad) {
    el.style.left = "auto"
    el.style.right = "0px"
  }

  const rect2 = el.getBoundingClientRect()
  if (rect2.left < pad) {
    el.style.left = "0px"
    el.style.right = "auto"
  }
}

function animateIn(name) {
  const el = panelMap[name]?.value
  if (!el) return

  // ✅ lowPower: ไม่ใช้ blur/filter
  if (lowPower.value) {
    gsap.killTweensOf(el)
    gsap.set(el, { autoAlpha: 1, y: 0, scale: 1 })
    return
  }

  gsap.killTweensOf(el)
  gsap.set(el, { transformOrigin: "top center" })
  gsap.fromTo(
    el,
    { autoAlpha: 0, y: 10, scale: 0.985, filter: "blur(6px)" },
    { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.22, ease: "power3.out" }
  )
}

function animateOut(name, done) {
  const el = panelMap[name]?.value
  if (!el) return done?.()

  if (lowPower.value) {
    gsap.set(el, { autoAlpha: 0 })
    return done?.()
  }

  gsap.killTweensOf(el)
  gsap.to(el, { autoAlpha: 0, y: 10, scale: 0.985, filter: "blur(6px)", duration: 0.16, ease: "power2.in", onComplete: () => done?.() })
}

watch(openMenu, async (to, from) => {
  if (to) {
    visible[to] = true
    await nextTick()
    smartPosition(to)
    animateIn(to)
  }
  if (from) {
    animateOut(from, () => (visible[from] = false))
  }
})

function onDocPointerDown(e) {
  if (!navRef.value) return
  if (!navRef.value.contains(e.target)) closeMenu()
}

function onResize() {
  viewportW.value = window.innerWidth
  if (openMenu.value) smartPosition(openMenu.value)
}

/** ✅ Premium intro AFTER loader (atmmockup: NO BLUR) */
function runIntroPremium() {
  const lines = titleRef.value?.querySelectorAll(".line") ?? []

  const nav = navRef.value
  const badge = badgeRef.value
  const para = paraRef.value
  const cta = ctaRef.value
  const mock = mockupRef.value

  const textTargets = [badge, ...lines, para, cta].filter(Boolean)
  const allTargets = [nav, ...textTargets, mock].filter(Boolean)

  // ✅ lowPower: no blur/filter, no infinite background loops
  if (lowPower.value) {
    gsap.set(allTargets, { autoAlpha: 0, y: 12 })

    introTL = gsap.timeline({ defaults: { ease: "power3.out" } })
    introTL
      .to(nav, { autoAlpha: 1, y: 0, duration: 0.35 })
      .to(badge, { autoAlpha: 1, y: 0, duration: 0.28 }, "-=0.18")
      .to(lines, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.08 }, "-=0.12")
      .to(para, { autoAlpha: 1, y: 0, duration: 0.3 }, "-=0.18")
      .to(cta, { autoAlpha: 1, y: 0, duration: 0.3 }, "-=0.22")
      .to(mock, { autoAlpha: 1, y: 0, duration: 0.4 }, "-=0.22")

    return
  }

  // ✅ desktop/full: blur เฉพาะ text, mockup ไม่ blur
  gsap.set(allTargets, { autoAlpha: 0 })
  gsap.set(textTargets, { y: 18, filter: "blur(12px)" })
  gsap.set(nav, { y: 10, filter: "blur(6px)" })
  gsap.set(mock, { y: 22, scale: 0.98 }) // ✅ NO blur on mockup

  introTL = gsap.timeline({ defaults: { ease: "power3.out" } })
  introTL
    .to(nav, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.55 })
    .to(badge, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.45 }, "-=0.25")
    .to(lines, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.12 }, "-=0.15")
    .to(para, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.5 }, "-=0.28")
    .to(cta, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.5 }, "-=0.32")
    .to(mock, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7 }, "-=0.45") // ✅ NO blur animate

  // ✅ loop animations (store for kill)
  if (mock) {
    introTweens.push(
      gsap.to(mock, { y: -10, rotation: 0.6, duration: 4.8, yoyo: true, repeat: -1, ease: "sine.inOut" })
    )
  }
  introTweens.push(gsap.to(orbARef.value, { x: 18, y: -14, duration: 7.2, yoyo: true, repeat: -1, ease: "sine.inOut" }))
  introTweens.push(gsap.to(orbBRef.value, { x: -14, y: 16, duration: 8.4, yoyo: true, repeat: -1, ease: "sine.inOut" }))
  introTweens.push(gsap.to(gridRef.value, { opacity: 0.52, duration: 3.2, yoyo: true, repeat: -1, ease: "sine.inOut" }))
  introTweens.push(gsap.to(sparklesRef.value, { backgroundPosition: "260px 0px", duration: 12, repeat: -1, ease: "none" }))
}

onMounted(async () => {
  await nextTick()
  viewportW.value = window.innerWidth

  if (lowPower.value) {
    loading.value = false
    runIntroPremium()
  } else {
    const start = performance.now()

    await playLoaderAnim()

    const elapsed = performance.now() - start
    const remain = Math.max(0, LOADING_MS - elapsed)
    if (remain) await sleep(remain)

    await hideLoader()
    runIntroPremium()
  }

  // ✅ use boolean capture so removeEventListener works reliably
  document.addEventListener("pointerdown", onDocPointerDown, true)
  window.addEventListener("resize", onResize)
})

onBeforeUnmount(() => {
  killAllGsap()
  document.removeEventListener("pointerdown", onDocPointerDown, true)
  window.removeEventListener("resize", onResize)
})
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

* {
  box-sizing: border-box;
}

/* ✅ Loader (Glow Logo) */

.loaderOverlay {
  position: fixed;
  inset: 0;
  z-index: 4000;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(900px 560px at 50% 40%, rgba(43, 109, 255, 0.22), transparent 62%),
    radial-gradient(700px 520px at 20% 60%, rgba(86, 204, 255, 0.14), transparent 58%),
    rgba(4, 8, 23, 1);
  backdrop-filter: blur(14px);
}

/* ✅ Modern Primary Button */
.btnPrimary {
  position: relative;
  border: 1px solid rgba(28, 105, 222, 0.18);
  color: #f8fbff;
  background: linear-gradient(135deg, #0f4dd4 0%, #2170ff 58%, #5fdcff 100%);
  box-shadow:
    0 18px 34px rgba(21, 76, 184, 0.2),
    0 10px 22px rgba(15, 44, 92, 0.12);
  transform: translateZ(0);
  transition:
    transform 0.18s ease,
    filter 0.18s ease,
    box-shadow 0.18s ease;
}

/* subtle “shine” */
.btnPrimary::before {
  content: "";
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  background: radial-gradient(160px 70px at 25% 18%, rgba(255, 255, 255, 0.28), transparent 65%);
  opacity: 0.85;
  pointer-events: none;
}

.btnPrimary:hover {
  transform: translateY(-1px);
  filter: brightness(1.05) saturate(1.05);
  box-shadow:
    0 24px 50px rgba(21, 76, 184, 0.24),
    0 16px 26px rgba(15, 44, 92, 0.14);
}

.btnPrimary:active {
  transform: translateY(0px) scale(0.99);
  filter: brightness(0.98);
}

.btnPrimary:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 3px rgba(103, 232, 249, 0.28),
    0 18px 44px rgba(21, 76, 184, 0.22);
}

.btnPrimary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
}

.loaderCard {
  width: min(520px, 92vw);
  padding: 26px 22px 20px;
  border-radius: 22px;
  border: 1px solid rgba(117, 169, 255, 0.22);
  background: rgba(255, 255, 255, 0.16);
  box-shadow: 0 24px 70px rgba(0, 28, 82, 0.22);
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 18px;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.loaderCard::before {
  content: "";
  position: absolute;
  inset: -1px;
  background: radial-gradient(600px 180px at 30% 10%, rgba(255, 255, 255, 0.22), transparent 65%);
  pointer-events: none;
}


.logoWrap {
  position: relative;
  width: 150px;
  height: 150px;
  display: grid;
  place-items: center;
}

.halo {
  position: absolute;
  inset: -18px;
  border-radius: 999px;
  background: radial-gradient(circle at 50% 50%, rgba(86, 204, 255, 0.22) 0%, rgba(43, 109, 255, 0.12) 35%, transparent 70%);
  filter: blur(10px);
  mix-blend-mode: screen;
  pointer-events: none;
}

.loaderLogo {
  width: 86px;
  height: 86px;
  object-fit: contain;
  filter: drop-shadow(0 0 22px rgba(43, 109, 255, 0.28)) drop-shadow(0 0 40px rgba(86, 204, 255, 0.12));
  user-select: none;
}

.loaderMeta {
  position: relative;
  z-index: 1;
}

.loaderTitle {
  font-weight: 700;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.96);
  font-size: 13px;
  margin-bottom: 12px;
}

.loaderBar {
  height: 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.loaderBarFill {
  height: 100%;
  width: 0%;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(43, 109, 255, 0.95), rgba(86, 204, 255, 0.35));
  box-shadow: 0 12px 28px rgba(43, 109, 255, 0.22);
}

.loaderDots {
  display: inline-flex;
  gap: 8px;
  margin-top: 12px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: rgba(86, 204, 255, 0.75);
  box-shadow: 0 0 16px rgba(86, 204, 255, 0.2);
}

/* Dark Blue Theme */
.page {
  --bg: var(--theme-bg-main);
  --text: var(--theme-text);
  --muted: var(--theme-text-soft);
  --stroke: var(--theme-border);
  --stroke2: var(--theme-border-strong);
  --blue: var(--theme-blue);
  --cyan: var(--theme-cyan);
  --shadow: var(--theme-shadow-lg);
  min-height: 100vh;
  position: relative;
  isolation: isolate;
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: var(--text);
  overflow-x: hidden;
  background: transparent;
}

.page::before,
.page::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.page::before {
  z-index: 0;
  background:
    radial-gradient(980px 640px at 10% 0%, rgba(59, 130, 246, 0.14), transparent 58%),
    radial-gradient(920px 620px at 88% 10%, rgba(103, 232, 249, 0.14), transparent 56%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.46), rgba(255, 255, 255, 0));
}

.page::after {
  z-index: 0;
  opacity: 0.3;
  background-image:
    linear-gradient(var(--theme-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--theme-grid) 1px, transparent 1px);
  background-size: 112px 112px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.55), transparent 86%);
}

.wrap {
  position: relative;
  z-index: 1;
  width: min(1380px, 92vw);
  margin: 0 auto;
  padding: 28px 0 70px;
}

/* Nav */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 18px;
  position: relative;
  z-index: 999;
  overflow: visible;
  border-radius: 999px;
  border: 1px solid var(--stroke);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(244, 249, 255, 0.7));
  box-shadow:
    0 16px 40px rgba(7, 31, 78, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(18px);
}

.topbar::before {
  content: "";
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.48), rgba(255, 255, 255, 0));
  pointer-events: none;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  letter-spacing: 0.16em;
  font-weight: 700;
  font-size: 13px;
  user-select: none;
  color: var(--theme-text-soft);
}

.brandDot {
  width: 60px;
  height: 60px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 999px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(232, 242, 255, 0.88));
  border: 1px solid rgba(67, 115, 204, 0.16);
  box-shadow:
    0 16px 32px rgba(18, 61, 138, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.brandDot img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 10px 20px rgba(59, 130, 246, 0.18));
}

.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  flex: 1 1 auto;
  max-width: 860px;
  padding: 10px 16px;
  border: 1px solid rgba(31, 101, 214, 0.1);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.56);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.76);
  backdrop-filter: blur(14px);
  position: relative;
  z-index: 999;
  overflow: visible;
}

.navLink {
  position: relative;
  color: var(--theme-text-soft);
  text-decoration: none;
  font-size: var(--fs-xs);
  font-weight: 600;
  transition: color 0.2s ease, text-shadow 0.2s ease;
}

.navLink::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -8px;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(33, 93, 248, 0), rgba(33, 93, 248, 0.95), rgba(95, 220, 255, 0));
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.22s ease;
}

.navLink:hover {
  color: var(--theme-text);
  text-shadow: 0 0 18px rgba(33, 93, 248, 0.12);
}

.navLink:hover::after {
  transform: scaleX(1);
}

.btn {
  border: 1px solid rgba(18, 74, 156, 0.14);
  border-radius: 999px;
  padding: 11px 16px;
  font-weight: 600;
  font-size: 13px;
  color: var(--theme-text);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.86), rgba(238, 245, 255, 0.72));
  cursor: pointer;
  box-shadow:
    0 10px 24px rgba(18, 61, 138, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(10px);
  transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.btn:hover {
  transform: translateY(-1px);
  border-color: var(--stroke2);
  box-shadow:
    0 14px 28px rgba(18, 61, 138, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.92);
}

.btnGhost {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(241, 247, 255, 0.88));
}

.btnOutline {
  background: rgba(255, 255, 255, 0.48);
  border-color: rgba(33, 93, 248, 0.16);
}

.btnOutline:hover {
  background: rgba(255, 255, 255, 0.82);
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.iconLink {
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid rgba(18, 74, 156, 0.12);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(239, 246, 255, 0.66));
  color: var(--theme-text);
  box-shadow: 0 12px 24px rgba(18, 61, 138, 0.08);
  backdrop-filter: blur(10px);
  text-decoration: none;
}

.iconLink:hover {
  transform: translateY(-1px);
  border-color: var(--stroke2);
}

.hamburger {
  min-width: 92px;
  height: 42px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(18, 74, 156, 0.14);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(239, 246, 255, 0.75));
  color: var(--theme-text);
  display: none;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 12px 24px rgba(18, 61, 138, 0.08);
  backdrop-filter: blur(10px);
}

.hamburgerText {
  font-weight: 700;
  letter-spacing: 0.12em;
}

/* Hero */
.hero {
  position: relative;
  margin-top: 24px;
  padding: clamp(30px, 4vw, 42px);
  z-index: 1;
  border-radius: 36px;
  border: 1px solid rgba(18, 74, 156, 0.1);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(241, 247, 255, 0.82)),
    radial-gradient(circle at top right, rgba(103, 232, 249, 0.18), transparent 34%);
  box-shadow:
    0 30px 70px rgba(18, 61, 138, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  overflow: hidden;
}

.hero::before,
.hero::after {
  content: "";
  position: absolute;
  pointer-events: none;
}

.hero::before {
  inset: 0;
  background-image:
    linear-gradient(rgba(91, 139, 229, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(91, 139, 229, 0.1) 1px, transparent 1px);
  background-size: 96px 96px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.55), transparent 86%);
  opacity: 0.42;
}

.hero::after {
  width: 420px;
  height: 420px;
  top: -120px;
  right: -80px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.16), transparent 64%);
  filter: blur(6px);
}

.heroGrid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: clamp(28px, 4vw, 54px);
  align-items: center;
}

.heroLeft {
  position: relative;
  z-index: 2;
}

.heroRight {
  position: relative;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid rgba(18, 74, 156, 0.12);
  background: rgba(255, 255, 255, 0.74);
  box-shadow: 0 12px 28px rgba(18, 61, 138, 0.08);
  backdrop-filter: blur(10px);
  font-size: 12px;
  color: var(--theme-text-soft);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.badge::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(135deg, #215df8, #67e8f9);
  box-shadow: 0 0 0 8px rgba(33, 93, 248, 0.08);
}

.heroTitle {
  margin: 16px 0 10px;
  max-width: 11ch;
  font-size: clamp(48px, 6vw, 82px);
  line-height: 0.96;
  letter-spacing: -0.03em;
  font-weight: 700;
  color: #071933;
  text-shadow: 0 18px 40px rgba(18, 61, 138, 0.08);
}

.line {
  display: block;
}

.ai {
  background: linear-gradient(135deg, #0f4dd4 0%, #2170ff 52%, #5fdcff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  width: 100%;
  font-size: inherit;
  text-shadow: 0 0 40px rgba(43, 109, 255, 0.14);
}

.heroPara {
  margin: 0;
  max-width: 570px;
  font-size: 15px;
  text-align: justify;
  hyphens: auto;
  line-height: 1.85;
  color: var(--theme-text-soft);
}

.ctaRow {
  display: flex;
  gap: 14px;
  margin-top: 24px;
  flex-wrap: wrap;
}

/* ✅ mockup: NO BLUR (ทั้ง desktop+mobile) */
.mockupSlot {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: clamp(460px, 58vw, 720px);
  height: 720px;
  border-radius: 32px;
  border: 1px solid rgba(112, 167, 255, 0.2);
  background:
    radial-gradient(circle at 20% 18%, rgba(103, 232, 249, 0.16), transparent 26%),
    radial-gradient(circle at 78% 20%, rgba(255, 255, 255, 0.12), transparent 26%),
    linear-gradient(135deg, rgba(9, 24, 58, 0.96), rgba(11, 41, 94, 0.92) 52%, rgba(16, 83, 165, 0.9));
  box-shadow:
    0 36px 80px rgba(17, 56, 125, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.16);
  opacity: 0;
  transform: translateY(22px) scale(0.98);
  will-change: transform, opacity;
  position: relative;
  overflow: hidden;
}

.mockupSlot::before,
.mockupSlot::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.mockupSlot::before {
  background-image:
    linear-gradient(rgba(148, 197, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 197, 255, 0.08) 1px, transparent 1px);
  background-size: 86px 86px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.7), transparent 92%);
}

.mockupSlot::after {
  inset: 18px;
  border-radius: 24px;
  border: 1px solid rgba(188, 224, 255, 0.12);
}

/* ✅ render smaller on mobile via inline style, then scale up */
.mockupInner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: center;
  will-change: transform;
}

.mockupFill {
  width: 100%;
  height: 100%;
  display: block;
}

/* background ornaments */
.orbs {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.orb {
  position: absolute;
  width: 520px;
  height: 520px;
  border-radius: 999px;
  filter: blur(44px);
  opacity: 0.48;
}

.orbA {
  left: -140px;
  top: 40px;
  background: radial-gradient(circle, rgba(103, 232, 249, 0.42), transparent 62%);
}

.orbB {
  right: -90px;
  bottom: 20px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.34), transparent 62%);
}

.gridGlow {
  position: absolute;
  inset: 0;
  opacity: 0.52;
  background:
    radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.16), transparent 18%),
    linear-gradient(180deg, rgba(33, 93, 248, 0.06), transparent 30%);
}

.sparkles {
  position: absolute;
  inset: 0;
  opacity: 0.35;
  background-image:
    radial-gradient(circle at 10% 18%, rgba(255, 255, 255, 0.7) 0 1px, transparent 1.5px),
    radial-gradient(circle at 32% 24%, rgba(103, 232, 249, 0.58) 0 1px, transparent 1.5px),
    radial-gradient(circle at 64% 18%, rgba(255, 255, 255, 0.66) 0 1px, transparent 1.5px),
    radial-gradient(circle at 78% 34%, rgba(103, 232, 249, 0.6) 0 1px, transparent 1.5px),
    radial-gradient(circle at 22% 68%, rgba(255, 255, 255, 0.52) 0 1px, transparent 1.5px),
    radial-gradient(circle at 72% 76%, rgba(95, 220, 255, 0.46) 0 1px, transparent 1.5px);
  background-size: 220px 220px;
  background-position: 0 0;
}

/* responsive */
@media (max-width: 980px) {
  .nav {
    display: none;
  }

  .hamburger {
    display: inline-flex;
  }

  .heroGrid {
    grid-template-columns: 1fr;
  }

  .mockupSlot {
    height: 420px;
  }

  .sparkles {
    display: none;
    /* ✅ ตัดของหนักบนมือถือ */
  }
}

@media (max-width: 520px) {
  .ctaRow {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    width: 100%;
  }

  .mockupSlot {
    height: 340px;
  }
}

@media (max-width: 533px) {
  .iconLink {
    display: none;
  }
}

@media (max-width: 424px) {
  .btnGhost {
    display: none;
  }

}

/* ✅ fallback: ถ้าไม่รองรับ backdrop-filter ให้ปิด blur */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {

  .loaderOverlay,
  .nav,
  .badge,
  .btn,
  .iconLink,
  .hamburger {
    backdrop-filter: none !important;
  }
}
</style>
