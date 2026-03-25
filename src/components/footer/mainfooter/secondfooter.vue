<template>
    <footer class="footer-wrapper">
        <!-- PART 1: INFO BAR -->
        <div class="footer-top">
            <!-- Left: Logo + Company Title -->
            <div class="footer-brand">
                <div class="footer-logo">
                    <!-- Replace with your logo image if you want -->
                    <!-- <img src="/your-logo.png" alt="Company Logo" /> -->
                    <img src="/logolapnet/fullcircle.png" alt="">
                </div>
                <div class="footer-company-title">
                    <div class="company-chip">LAPNet</div>
                    <h2>Lao National Payment Network CO., LTD</h2>
                    <p>Anywhere Anytime Any Payment Channels.</p>
                </div>
            </div>

            <!-- Right: Contact Info -->
            <div class="footer-contact">
                <div class="contact-item">
                    <div class="contact-icon">
                        <i class="fa-solid fa-phone"></i>
                    </div>
                    <span>021 417915</span>
                </div>
                <div class="contact-item">
                    <div class="contact-icon">
                        <i class="fa-solid fa-envelope"></i>
                    </div>
                    <span>info@lapnet.com.la</span>
                </div>
                <a href="https://maps.app.goo.gl/1vFyBWXpvdsicM767" target="_blank">
                <div class="contact-item">
                    <div class="contact-icon">
                        <i class="fa-solid fa-location-dot"></i>
                    </div>
                    <span>Kaysone Phomvihane Avenue, Vientiane, Laos</span>
                </div>
                </a>
            </div>
        </div>

        <!-- PART 2: MAIN FOOTER (with background image) -->
        <div class="footer-main" :style="{ backgroundImage: `url(${footerBg})` }">
            <div class="footer-overlay"></div>
            <div class="footer-orb orb-left"></div>
            <div class="footer-orb orb-right"></div>

            <div class="footer-main-inner">
                <!-- Column 1: Company info + Facebook button -->
                <div class="footer-column column-1">
                    <h3>ກ່ຽວກັບບໍລິສັດ</h3>
                    <p>
                        ພັດທະນາລະບົບການຊໍາລະທຸລະກຳຍ່ອຍ ໃຫ້ເປັນສູນກາງການຊໍາລະຂອງບັນດາຜູ້ໃຫ້ບໍລິການຊໍາລະ ທັງພາຍໃນ ແລະ ສາກົນ, ແນໃສ່ໃຫ້ປະຊາຊົນລາວໄດ້ໃຊ້ບໍລິການຊໍາລະທີ່ສະດວກວ່ອງໄວ, ທັນສະໄໝ, ປອດໄພ ແລະ ຕົ້ນທືນຕໍ່າ.
                    </p>
                    <div class="footer-badges">
                        <span class="badge">19 ທະນາຄານສະມາຊິກ</span>
                        <span class="badge">2 Fintech</span>
                    </div>
                    <a href="https://web.facebook.com/laonationalpaymentnetwork/" target="_blank"> <button
                            class="btn-facebook">
                            <i class="fa-brands fa-facebook-f"></i>
                            <span>Follow us on Facebook</span>
                        </button>
                    </a>

                </div>

                <!-- Column 2: Products (6 items) -->
                <div class="footer-column column-2">
                    <h3>ຜະລິດຕະພັນ ແລະ ການບໍລິການ</h3>
                    <ul class="footer-list">
                          <li>
                            <RouterLink to="/products_service/allproduct">ຜະລິດຕະພັນ ແລະ ການບໍລິການ ທັງໝົດ</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/products_service/atm-inquiry">ກວດຍອດເງິນຂ້າມທະນາຄານຜ່ານຕູ້ ATM</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/products_service/atm-cash-withdraw">ຖອນເງິນສົດຂ້າມທະນາຄານຜ່ານຕູ້ ATM</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/products_service/atm-transfer">ໂອນເງິນຂ້າມທະນາຄານຜ່ານຕູ້ ATM</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/products_service/mobile-transfer">ໂອນເງິນຂ້າມທະນາຄານເທິງມືຖື</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/products_service/qr-payment">ຊຳລະຂ້າມທະນາຄານຜ່ານ LAPNet</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/products_service/crossborder">ຊຳລະຂ້າມແດນຜ່ານ QR CODE </RouterLink>
                        </li>
                    </ul>
                </div>

                <!-- Column 3: Menu with dropdowns -->
                <div class="footer-column column-3">
                    <h3>ເມນູ</h3>
                    <ul class="footer-menu">
                        <li>
                            <RouterLink to="/bloggrid">ຂ່າວສານ ແລະ ກິດຈະກຳ</RouterLink>
                        </li>

                        <!-- Member dropdown -->
                        <li class="has-dropdown">
                            <button class="dropdown-toggle" @click="toggleDropdown('member')">
                                <span>ສະມາຊິກ</span>
                                <i :class="['fa-solid', isMemberOpen ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
                            </button>
                            <ul v-if="isMemberOpen" class="dropdown-list dropdown-member">
                                <li>
                                    <RouterLink to="/member/membercardATM">ສະມາຊິກລະບົບບັດທະນາຄານຮ່ວມກັນ</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/member/mobile_banking">ສະມາຊິກລະບົບຊຳລະຂ້າມທະນາຄານເທິງມືຖື</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/member/crossborder">ສະມາຊິກລະບົບຊຳລະຂ້າມແດນຜ່ານ QR Code
                                       </RouterLink>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <RouterLink to="/joinus">ຮ່ວມງານກັບເຮົາ</RouterLink>
                        </li>

                        <!-- About dropdown -->
                        <li class="has-dropdown">
                            <button class="dropdown-toggle" @click="toggleDropdown('about')">
                                <span>ກ່ຽວກັບພວກເຮົາ</span>
                                <i :class="['fa-solid', isAboutOpen ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
                            </button>
                            <ul v-if="isAboutOpen" class="dropdown-list dropdown-about">
                                <li>
                                    <RouterLink to="/aboutus/vision">ວິໄສທັດ ແລະ ພາລະກິດ</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/aboutus/role">ພາລະບົດບາດ</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/aboutus/history">ຄວາມເປັນມາ</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/aboutus/board_director">ສະພາບໍລິຫານ</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/aboutus/companystructureimage">ໂຄ່ງຮ່າງການຈັດຕັ້ງ</RouterLink>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <RouterLink to="/contactus">ຕິດຕໍ່ພວກເຮົາ</RouterLink>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Bottom small line -->
            <div class="footer-bottom">
                <span>Copyright © {{ year }} LAPNet Co., Ltd. </span>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { gsap } from 'gsap'
import { RouterLink } from 'vue-router'
import footerBg from '../../../assets/footer/backgroundfooter.png' // 👈 your image here

const isMemberOpen = ref(false)
const isAboutOpen = ref(false)

const year = computed(() => new Date().getFullYear())

const animateDropdownOpen = async (selector) => {
    await nextTick()
    const el = document.querySelector(selector)
    if (!el) return

    gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
            height: el.scrollHeight,
            opacity: 1,
            duration: 0.35,
            ease: 'power2.out',
            onComplete: () => {
                gsap.set(el, { height: 'auto' })
            }
        }
    )
}

const toggleDropdown = (section) => {
    if (section === 'member') {
        const opening = !isMemberOpen.value
        isMemberOpen.value = opening
        if (opening) {
            animateDropdownOpen('.dropdown-member')
        }
    }

    if (section === 'about') {
        const opening = !isAboutOpen.value
        isAboutOpen.value = opening
        if (opening) {
            animateDropdownOpen('.dropdown-about')
        }
    }
}

onMounted(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from('.footer-wrapper', {
        opacity: 0,
        y: 40,
        duration: 0.8
    })
        .from(
            '.footer-top',
            {
                opacity: 0,
                y: 30,
                duration: 0.7
            },
            '-=0.3'
        )
        .from(
            '.footer-brand',
            {
                opacity: 0,
                x: -20,
                duration: 0.6
            },
            '-=0.4'
        )
        .from(
            '.footer-contact .contact-item',
            {
                opacity: 0,
                x: 20,
                duration: 0.45,
                stagger: 0.1
            },
            '-=0.4'
        )
        .from(
            '.footer-main-inner',
            {
                opacity: 0,
                y: 30,
                duration: 0.7
            },
            '-=0.25'
        )
        .from(
            '.footer-column',
            {
                opacity: 0,
                y: 20,
                duration: 0.6,
                stagger: 0.15
            },
            '-=0.3'
        )
        .from(
            '.footer-bottom',
            {
                opacity: 0,
                y: 10,
                duration: 0.5
            },
            '-=0.4'
        )

    // Floating logo animation
    gsap.to('.footer-logo', {
        y: -6,
        duration: 2.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
    })

    // Pulsing Facebook button glow
    gsap.to('.btn-facebook', {
        boxShadow: '0 0 24px rgba(24, 119, 242, 0.7)',
        duration: 1.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1
    })

    // Subtle floating columns for modern feel
    gsap.to('.footer-column', {
        y: -6,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: {
            each: 0.4,
            from: 'center'
        }
    })

    // Soft glow motion on orb backgrounds
    gsap.to('.footer-orb', {
        y: -15,
        x: 10,
        duration: 6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
    })
})
</script>

<style scoped>
.column-1 p{
    
    width: 90%;
    text-align: justify;
}
.footer-wrapper {
    color: var(--theme-text);
    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    position: relative;
    overflow: hidden;
}

/* PART 1: gradient bar */
.footer-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 26px 8vw;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(240, 247, 255, 0.82));
    border-top: 1px solid var(--theme-border);
    border-bottom: 1px solid var(--theme-border);
    box-shadow: 0 20px 48px rgba(18, 61, 138, 0.08);
    gap: 32px;
    position: relative;
}

.footer-top::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
        radial-gradient(circle at top right, rgba(103, 232, 249, 0.18), transparent 55%),
        linear-gradient(120deg, rgba(59, 130, 246, 0.05), transparent 45%);
    opacity: 0.9;
    pointer-events: none;
}

/* Brand */
.footer-brand {
    display: flex;
    align-items: center;
    gap: 18px;
    position: relative;
    z-index: 1;
}

.footer-logo {
    width: 60px;
    height: auto;
    border-radius: 999px;
    border: 1px solid rgba(18, 74, 156, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(12px);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(232, 243, 255, 0.9));
    box-shadow: 0 16px 32px rgba(18, 61, 138, 0.08);
}

.footer-logo img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.logo-text {
    font-weight: 800;
    letter-spacing: 0.12em;
    font-size: 14px;
    /* 13 -> 14 */
    text-transform: uppercase;
}

.footer-company-title h2 {
    font-size: 24px;
    margin: 2px 0 2px;
    color: var(--theme-text);
}

.footer-company-title p {
    margin: 0;
    font-size: 14px;
    color: var(--theme-text-soft);
}

.company-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(33, 93, 248, 0.08);
    border: 1px solid rgba(33, 93, 248, 0.14);
    color: var(--theme-text-soft);
    text-transform: uppercase;
    letter-spacing: 0.12em;
}

/* Contact info */
.footer-contact {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 260px;
    position: relative;
    z-index: 1;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    color: var(--theme-text-soft);
}

.contact-icon {
    width: 28px;
    height: 28px;
    border-radius: 10px;
    background: rgba(33, 93, 248, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(33, 93, 248, 0.14);
    color: var(--theme-blue);
}

.contact-item i {
    font-size: 15px;
    /* 14 -> 15 */
}

/* PART 2: Main footer with background image */
.footer-main {
    position: relative;
    padding: 46px 8vw 22px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    color: #ffffff;
}

.footer-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg,
            rgba(7, 20, 52, 0.94) 0%,
            rgba(6, 18, 46, 0.96) 55%,
            rgba(4, 12, 28, 0.92) 100%);
    pointer-events: none;
}

.footer-orb {
    position: absolute;
    width: 220px;
    height: 220px;
    border-radius: 999px;
    filter: blur(40px);
    opacity: 0.7;
    pointer-events: none;
}

.orb-left {
    left: 4%;
    top: 20%;
    background: radial-gradient(circle, rgba(0, 188, 255, 0.9), transparent 60%);
}

.orb-right {
    right: 6%;
    bottom: 8%;
    background: radial-gradient(circle, rgba(92, 132, 255, 0.9), transparent 60%);
}

.footer-main-inner {
    position: relative;
    display: grid;
    grid-template-columns: 2fr 1.4fr 1.4fr;
    gap: 40px;
    z-index: 1;
    border-radius: 26px;
    padding: 26px 24px 24px;
    background: linear-gradient(135deg,
            rgba(255, 255, 255, 0.08),
            rgba(255, 255, 255, 0.03)) border-box;
    border: 1px solid rgba(170, 209, 255, 0.16);
    box-shadow:
        0 18px 45px rgba(0, 0, 0, 0.45),
        0 0 0 1px rgba(255, 255, 255, 0.02) inset;
    backdrop-filter: blur(22px);
}

/* Columns */
.footer-column h3 {
    font-size: 25px;
    margin: 0 0 12px;
    text-transform: uppercase;
    font-weight: bold;
    opacity: 0.9;
}

.footer-column p {
    font-size: 15px;
    line-height: 1.7;
    margin: 0 0 16px;
    opacity: 0.85;
}

.footer-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
}

.badge {
    font-size: 12px;
    padding: 4px 10px;
    border-radius: 999px;
    border: 1px solid rgba(170, 209, 255, 0.24);
    backdrop-filter: blur(14px);
    background: linear-gradient(135deg,
            rgba(255, 255, 255, 0.12),
            rgba(103, 232, 249, 0.05));
}

/* Facebook Button */
.btn-facebook {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: 1px solid rgba(170, 209, 255, 0.18);
    border-radius: 999px;
    padding: 11px 22px;
    font-size: 15px;
    /* 14 -> 15 */
    cursor: pointer;
    background: linear-gradient(135deg, #0f4dd4, #49c7ff);
    color: #fff;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.btn-facebook i {
    font-size: 18px;
    /* 16 -> 18 */
}

.btn-facebook:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 12px 30px rgba(10, 43, 102, 0.42);
    background: linear-gradient(135deg, #1660f0, #63d8ff);
}

/* Lists */
.footer-list,
.footer-menu,
.dropdown-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-list li,
.footer-menu li,
.dropdown-list li {
    margin-bottom: 8px;
}

/* smooth height animation needs overflow hidden */
.dropdown-list {
    overflow: hidden;
}

/* Style RouterLink like <a> */
.footer-list a,
.footer-menu>li>a,
.dropdown-list a,
.footer-list :deep(a),
.footer-menu :deep(a),
.dropdown-list :deep(a) {
    font-size: 15px;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.88);
    position: relative;
    padding-bottom: 2px;
    transition: color 0.2s ease, transform 0.2s ease;
}

.footer-list a::after,
.footer-menu>li>a::after,
.dropdown-list a::after,
.footer-list :deep(a)::after,
.footer-menu :deep(a)::after,
.dropdown-list :deep(a)::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px;
    width: 0;
    background: rgba(255, 255, 255, 0.9);
    transition: width 0.2s ease;
}

.footer-list a:hover,
.footer-menu>li>a:hover,
.dropdown-list a:hover,
.footer-list :deep(a:hover),
.footer-menu :deep(a:hover),
.dropdown-list :deep(a:hover) {
    color: #ffffff;
    transform: translateX(2px);
}

.footer-list a:hover::after,
.footer-menu>li>a:hover::after,
.dropdown-list a:hover::after,
.footer-list :deep(a:hover)::after,
.footer-menu :deep(a:hover)::after,
.dropdown-list :deep(a:hover)::after {
    width: 100%;
}

/* Dropdowns (Member & About) */
.has-dropdown {
    margin-bottom: 10px;
}

.dropdown-toggle {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: transparent;
    border: none;
    padding: 0;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.9);
    cursor: pointer;
    margin-bottom: 4px;
}

.dropdown-toggle i {
    font-size: 13px;
    /* 12 -> 13 */
}

.dropdown-list {
    padding-left: 10px;
    border-left: 1px solid rgba(255, 255, 255, 0.18);
    margin-top: 4px;
}

/* Bottom bar */
.footer-bottom {
    position: relative;
    margin-top: 32px;
    padding-top: 18px;
    border-top: 1px solid rgba(255, 255, 255, 0.18);
    z-index: 1;
    display: flex;
    justify-content: center;
    font-size: 13px;
    opacity: 0.78;
}

/* Responsive */
@media (max-width: 992px) {
    .footer-top {
        flex-direction: column;
        align-items: flex-start;
    }

    .footer-contact {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px 20px;
    }

    .footer-main-inner {
        grid-template-columns: 1.4fr 1fr;
        padding: 22px 20px 20px;
    }

    .column-3 {
        grid-column: 1 / -1;
    }
}

@media (max-width: 640px) {
    .footer-top {
        padding: 20px 5vw;
    }

    .footer-main {
        padding: 30px 5vw 18px;
    }

    .footer-main-inner {
        grid-template-columns: 1fr;
        padding: 18px 16px 16px;
        gap: 24px;
    }

    .footer-contact {
        flex-direction: column;
    }
}
@media (max-width:444px) {
    .badge{
        color:#000000c2;
        background-color: #fff;
    }
    
    
}
</style>
