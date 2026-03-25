<template>
  <!-- Desktop links -->
  
  <!-- <popupoverlay
  :debugAlwaysShow="true"
  /> -->
  <popupoverlay/>

 

  <div class="herosectionhomepage" id="hero">
    <mockupherosectionpage />
  </div>

  <div class="vision" id="vision">
    <SwitchSplit
      company-name="LAPNet"
      logo-src="/logolapnet/fullcircle.png"
      image1="/homepage/Vision.png"
      image2="/homepage/missionhome.png"
      label-a="VISION"
      label-b="MISSION"
    >
      <template #content1>
        <p style="margin: 0; opacity: 0.7">
          ພັດທະນາລະບົບການຊໍາລະທຸລະກຳຍ່ອຍ ໃຫ້ເປັນສູນກາງການຊໍາລະຂອງບັນດາຜູ້ໃຫ້ບໍລິການຊໍາລະ ທັງພາຍໃນ ແລະ ສາກົນ, ແນໃສ່ໃຫ້ປະຊາຊົນລາວໄດ້ໃຊ້ບໍລິການຊໍາລະທີ່ສະດວກວ່ອງໄວ, ທັນສະໄໝ, ປອດໄພ ແລະ ຕົ້ນທືນຕໍ່າ.
        </p>
      </template>

      <template #content2>
        <p style="margin: 0; opacity: 0.7">
          ພັດທະນາລະບົບການຊໍາລະໃຫ້ມີຄວາມຫຼາກຫຼາຍ, ທັນສະໄໝ, ຕອບຮັບໄດ້ທຸກຊ່ອງທາງການຊໍາລະທີ່ເກີດຂື້ນ,
          ເຕົ້າໂຮມເອົາບັນດາທະນາຄານທຸລະກິດ, ສະຖາບັນການເງິນ ແລະ ບໍລິສັດ Fintech ທີ່ເປັນຜູ້ໃຫ້ບໍລິການຊໍາລະ
          ໃຫ້ເຂົ້າມາເປັນສະມາຊີກຂອງບໍລິສັດ ເພື່ອພ້ອມກັນໃຫ້ບໍລິການລະບົບການຊໍາລະແກ່ສັງຄົມ,
          ຫັນເອົາການເຊື່ອມຕໍ່ສາກົນທີ່ມີລັກສະນະກະແຈກກະຈາຍລວມສູນເຂົ້າມາເຊື່ອມຕໍ່ເປັນຮູບແບບລະບົບປະຕູດຽວເພື່ອຫຼຸດຜ່ອນຕົ້ນທືນລວມຂອງທົ່ວລະບົບ,
          ເສີມຂະຫຍາຍຄວາມຮູ້-ເຂົ້າໃຈໃຫ້ແກ່ມວນຊົນໄດ້ຮັບຮູ້ເຖິງຄວາມສຳຄັນ ແລະ
          ປະໂຫຍກຂອງການນຳໃຊ້ລະບົບການຊໍາລະເອເລັກໂຕຣນິກຢ່າງຖ່ອງແທ້ ເພື່ອເຮັດໃຫ້ມວນຊົນໄດ້ນຳໃຊ້ລະບົບການຊໍາລະຢ່າງຖືກຕ້ອງ
          ແລະ ປອດໄພ ເປັນການເສີມສ້າງຄວາມໝັ້ນໃຈໃຫ້ແກ່ມວນຊົນ.
        </p>
      </template>
    </SwitchSplit>
  </div>

  <div class="whytus" id="why">
    <whychooseus
      title="Why choose LAPNET"
      description="ບໍລິສັດ ລາວເນ ເຊີນນໍ ເພເມັ້ນ ເນັດເວີກ ຈຳກັດ (LAPNet)  ເປັນຜູ້ໃຫ້ບໍລິການລະບົບ ຊໍາລະທຸລະກໍາຍ່ອຍທົ່ວໄປ ຕາມທີ່ໄດ້ກໍານົດໄວ້ໃນກົດໝາຍວ່າດ້ວຍລະບົບການຊໍາລະ. ຊຶ່ງເຮັດໜ້າທີ່ເປັນໂຕກາງໃນການ ເຊື່ອມໂຍງກັບທຸກຂະແໜງການຊຳລະທີ່ເປັນທະນາຄານ, ສະຖາບັນການເງິນ ແລະ ຜູ້ໃຫ້ບໍລິການ ການຊຳລະແຫ່ງດຽວໃນ ສປປ ລາວ;"
      :stat1Value="19"
      stat1Label="Commercial Bank"
      stat1Suffix=""
      :stat2Value="2"
      stat2Label="Fintech"
      stat2Suffix=""
    />
  </div>

  <div class="memberscroll" id="members">
    <allmemberscrolling />
  </div>

  <div class="heroproduct" id="products">
    <productherosectionhomepage />
  </div>

  <div class="boxpadding" style="width: 100%; height: 15vh"></div>

  <div class="bloghomepage" id="blog">
    <bloghomepage />
  </div>

  <div class="boxpadding" style="width: 100%; height: 15vh"></div>

  <secondfooter id="footer" />

  
</template>

<style scoped>
.herosectionhomepage {
  width: 100%;
  height: auto;
  position: relative;
  padding-bottom: 30px;
}

.globemockup {
  width: 100%;
  height: auto;
  background-color: transparent;
}

.bloghomepage {
  width: min(1380px, 94vw);
  height: auto;
  margin: 28px auto 0;
  padding: clamp(18px, 2.4vw, 28px);
  border-radius: 32px;
  border: 1px solid var(--theme-border);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(238, 246, 255, 0.68));
  box-shadow: 0 28px 64px rgba(18, 61, 138, 0.08);
  position: relative;
  overflow: hidden;
}

.heroproduct {
  width: min(1380px, 94vw);
  height: auto;
  margin: 28px auto 0;
  position: relative;
  padding: clamp(14px, 2vw, 22px);
  border-radius: 36px;
  border: 1px solid var(--theme-border);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(238, 246, 255, 0.7));
  box-shadow: 0 28px 64px rgba(18, 61, 138, 0.08);
  overflow: hidden;
}

.memberscroll {
  width: min(1380px, 94vw);
  height: auto;
  margin: 28px auto 0;
  padding: clamp(18px, 2.4vw, 28px);
  border-radius: 32px;
  border: 1px solid var(--theme-border);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.84), rgba(240, 247, 255, 0.7));
  box-shadow: 0 28px 64px rgba(18, 61, 138, 0.08);
  position: relative;
  overflow: hidden;
}

.whytus {
  width: min(1380px, 94vw);
  height: auto;
  margin: 28px auto 0;
  position: relative;
  padding: clamp(14px, 2vw, 22px);
  border-radius: 36px;
  border: 1px solid var(--theme-border);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(238, 246, 255, 0.7));
  box-shadow: 0 28px 64px rgba(18, 61, 138, 0.08);
  overflow: hidden;
}

.vision {
  width: min(1380px, 94vw);
  height: auto;
  margin: 22px auto 0;
  position: relative;
}

.bloghomepage::before,
.memberscroll::before,
.heroproduct::before,
.whytus::before,
.vision::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
}

.bloghomepage::before,
.memberscroll::before {
  background:
    radial-gradient(480px 180px at 12% 0%, rgba(59, 130, 246, 0.14), transparent 72%),
    radial-gradient(460px 180px at 88% 100%, rgba(103, 232, 249, 0.14), transparent 72%);
}

.heroproduct::before,
.whytus::before,
.vision::before {
  background:
    radial-gradient(520px 160px at 50% 0%, rgba(59, 130, 246, 0.08), transparent 72%);
}

/* =========================
   ✅ Bottom-left Eye Viewer
   Glassmorphism + Modern Blue
   ========================= */

</style>

<script setup>
import mockupherosectionpage from "./mockupherosectionpage.vue"
import bloghomepage from "../../components/blog/hompage/bloghomepage.vue"
import SwitchSplit from "./visionherosection.vue"
import whychooseus from "./whychooseus.vue"
import allmemberscrolling from "../../components/swiper/memberscrolling/allmemberscrolling.vue"
import productherosectionhomepage from "./productherosectionhomepage.vue"
import secondfooter from "../../components/footer/mainfooter/secondfooter.vue"
import popupoverlay from "../../components/popup/popupoverlay.vue"

import { ref, onMounted, onBeforeUnmount, nextTick, watch } from "vue"
import { gsap } from "gsap"

/** ✅ TEST MODE: 3 Hour per show  */
// const INTERVAL_MS = 3 * 60 * 60 * 1000 // 3 hours
const INTERVAL_MS = 1 * 60 * 1000 // 3 hours

const KEY_LAST = "home_popups_last_shown_ts_test"
const KEY_STATE = "home_two_popups_state_test"

const show1 = ref(false)
const show2 = ref(false)

function getNumber(key) {
  try {
    const v = localStorage.getItem(key)
    if (!v) return null
    const n = Number(v)
    return Number.isFinite(n) ? n : null
  } catch {
    return null
  }
}

function setValue(key, val) {
  try {
    localStorage.setItem(key, String(val))
  } catch {}
}

function shouldShowNow() {
  const last = getNumber(KEY_LAST)
  if (!last) return true
  return Date.now() - last >= INTERVAL_MS
}

function markShownNow() {
  setValue(KEY_LAST, Date.now())
}

function setState(val) {
  setValue(KEY_STATE, val)
}

onMounted(() => {
  if (!shouldShowNow()) return
  markShownNow()
  setState("step1")
  setTimeout(() => {
    show1.value = true
  }, 500)
})

function handleClosed1() {
  show1.value = false
  setState("step2")
  setTimeout(() => {
    show2.value = true
  }, 200)
}

function handleClosed2() {
  show2.value = false
  setState("done")
}

/* ===========================
   ✅ Viewer Today + Week (static now)
   =========================== */
const viewerToday = ref(300)
const viewerWeek = ref(300)

const viewerOpen = ref(false)

const viewerWrapRef = ref(null)
const viewerPanelRef = ref(null)
const eyeIconRef = ref(null)

function toggleViewer() {
  viewerOpen.value = !viewerOpen.value
}
function closeViewer() {
  viewerOpen.value = false
}
function refreshViewer() {
  // future: fetch again, for now pulse animation
  pulseViewer()
}

/**
 * ✅ FUTURE (DB/API example):
 * async function loadViews() {
 *   const res = await fetch("/api/views") // { today: number, week: number }
 *   const data = await res.json()
 *   viewerToday.value = data.today
 *   viewerWeek.value = data.week
 * }
 */

function pulseViewer() {
  const wrap = viewerWrapRef.value
  if (!wrap) return

  gsap.fromTo(
    wrap,
    { y: 0 },
    { y: -6, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }
  )

  if (eyeIconRef.value) {
    gsap.fromTo(
      eyeIconRef.value,
      { scale: 1 },
      { scale: 1.08, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }
    )
  }
}

function onKeydown(e) {
  if (e.key === "Escape") closeViewer()
}

onMounted(async () => {
  window.addEventListener("keydown", onKeydown)
  await nextTick()

  // entrance
  if (viewerWrapRef.value) {
    gsap.from(viewerWrapRef.value, {
      y: 18,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.1,
    })
  }

  // panel initial (no padding on wrapper to allow true height 0)
  if (viewerPanelRef.value) {
    gsap.set(viewerPanelRef.value, {
      height: 0,
      autoAlpha: 0,
      y: 8,
      pointerEvents: "none",
      overflow: "hidden",
    })
  }
})

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown)
})

watch(viewerOpen, async (open) => {
  await nextTick()
  const panel = viewerPanelRef.value
  if (!panel) return

  gsap.killTweensOf(panel)

  if (open) {
    gsap.set(panel, { pointerEvents: "auto" })
    gsap.fromTo(
      panel,
      { height: 0, autoAlpha: 0, y: 10 },
      { height: "auto", autoAlpha: 1, y: 0, duration: 0.32, ease: "power2.out" }
    )
    pulseViewer()
  } else {
    gsap.to(panel, {
      height: 0,
      autoAlpha: 0,
      y: 8,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => gsap.set(panel, { pointerEvents: "none" }),
    })
  }
})
</script>
