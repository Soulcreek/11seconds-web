/* ══════════════════════════════════════════════════════════════════════
   11 Seconds — Scroll animations & nav behavior
   ══════════════════════════════════════════════════════════════════════ */

// ── Scroll-triggered entrance animations ────────────────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, Number(delay));
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));

// ── Nav scroll state ────────────────────────────────────────────────
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('nav--scrolled', y > 40);
  lastScroll = y;
}, { passive: true });

// ── Smooth anchor scroll ────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Timer countdown animation (visual only) ─────────────────────────
const timerValue = document.querySelector('.hero__timer-value');
if (timerValue) {
  let count = 11;
  const tick = () => {
    timerValue.textContent = count;
    count--;
    if (count < 0) count = 11;
  };
  setInterval(tick, 1000);
}
