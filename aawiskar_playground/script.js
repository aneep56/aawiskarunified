/* ===== AAWISKAR PLAYGROUND — GLOBAL SCRIPT ===== */

// ── Toast notifications ──────────────────────────────────────────────────────
function showToast(msg, type = 'info', icon = '') {
  const container = document.getElementById('toast-container') || (() => {
    const el = document.createElement('div');
    el.id = 'toast-container';
    document.body.appendChild(el);
    return el;
  })();
  const icons = { info: '💡', success: '✅', error: '❌', xp: '⭐' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icon || icons[type] || icons.info}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3100);
}

// ── XP / Level System ────────────────────────────────────────────────────────
const XP_KEY = 'aawiskar_xp';
const XP_PER_LEVEL = 100;

function getXP() { return parseInt(localStorage.getItem(XP_KEY) || '0'); }
function setXP(val) { localStorage.setItem(XP_KEY, val); }
function addXP(amount, reason = '') {
  const prev = getXP();
  const next = prev + amount;
  setXP(next);
  const prevLevel = Math.floor(prev / XP_PER_LEVEL);
  const nextLevel = Math.floor(next / XP_PER_LEVEL);
  showToast(`+${amount} XP${reason ? ' — ' + reason : ''}`, 'xp', '⭐');
  if (nextLevel > prevLevel) {
    setTimeout(() => showToast(`LEVEL UP! You're now Level ${nextLevel + 1} 🚀`, 'success', '🎮'), 500);
  }
  updateXPBar();
}

function getLevel() { return Math.floor(getXP() / XP_PER_LEVEL) + 1; }
function getLevelXP() { const xp = getXP(); return xp % XP_PER_LEVEL; }
function getLevelProgress() { return (getLevelXP() / XP_PER_LEVEL) * 100; }

function updateXPBar() {
  document.querySelectorAll('.xp-level').forEach(el => el.textContent = 'LVL ' + getLevel());
  document.querySelectorAll('.xp-fill').forEach(el => el.style.width = getLevelProgress() + '%');
  document.querySelectorAll('.xp-count').forEach(el => el.textContent = getLevelXP() + '/' + XP_PER_LEVEL + ' XP');
}

// ── Mobile Menu ───────────────────────────────────────────────────────────────
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!hamburger || !menu) return;
  hamburger.addEventListener('click', () => menu.classList.toggle('open'));
  document.querySelector('.mobile-menu-close')?.addEventListener('click', () => menu.classList.remove('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

// ── Active Nav Link ───────────────────────────────────────────────────────────
function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    a.classList.toggle('active', href === page || (page === '' && href === 'index.html'));
  });
}

// ── Copy to Clipboard ─────────────────────────────────────────────────────────
function copyToClipboard(text, label = 'Copied') {
  navigator.clipboard.writeText(text).then(() => showToast(label + ' to clipboard!', 'success'));
}

// ── Typing Effect ─────────────────────────────────────────────────────────────
function typeEffect(el, text, speed = 35, callback) {
  let i = 0;
  el.textContent = '';
  const timer = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) { clearInterval(timer); callback?.(); }
  }, speed);
}

// ── Animate on Scroll ─────────────────────────────────────────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.observe').forEach(el => observer.observe(el));
}

// ── Card Mouse Glow ───────────────────────────────────────────────────────────
function initCardGlow() {
  document.querySelectorAll('.algo-card, .card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100) + '%');
    });
  });
}

// ── Keyboard Shortcuts ────────────────────────────────────────────────────────
function initKeyboardShortcuts() {
  document.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey) {
      switch(e.key) {
        case '1': e.preventDefault(); window.location.href = 'index.html'; break;
        case '2': e.preventDefault(); window.location.href = 'python.html'; break;
        case '3': e.preventDefault(); window.location.href = 'ml.html'; break;
        case '4': e.preventDefault(); window.location.href = 'block.html'; break;
      }
    }
  });
}

// ── Theme particle effect ─────────────────────────────────────────────────────
function spawnParticle(x, y, color) {
  const p = document.createElement('div');
  p.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:4px;height:4px;border-radius:50%;background:${color};pointer-events:none;z-index:9999;animation:particleUp .8s ease forwards`;
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 800);
}

if (!document.querySelector('#particle-style')) {
  const style = document.createElement('style');
  style.id = 'particle-style';
  style.textContent = '@keyframes particleUp{0%{transform:translate(0,0) scale(1);opacity:1}100%{transform:translate(var(--dx,0),calc(-60px + var(--dy,0))) scale(0);opacity:0}}';
  document.head.appendChild(style);
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateXPBar();
  setActiveNav();
  initMobileMenu();
  initScrollAnimations();
  initCardGlow();
  initKeyboardShortcuts();
});
