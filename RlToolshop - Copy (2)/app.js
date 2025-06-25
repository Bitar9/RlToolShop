// === RL Toolshop SPA Renderer ===
window.addEventListener('DOMContentLoaded', () => {
  // Wait for content.js to load
  if (!window.RL_CONTENT) {
    setTimeout(() => location.reload(), 500); // fallback reload if content.js fails
    return;
  }
  const C = window.RL_CONTENT;

  // --- Render Navigation ---
  const nav = document.getElementById('spa-nav');
  nav.innerHTML = `
    <nav class="navbar glass">
      <div class="container">
        <a href="#home" class="logo orbitron">RL Toolshop</a>
        <ul class="nav-links">
          ${C.nav.map(n => `<li><a href="#${n.id}" class="nav-link" data-nav="${n.id}">${n.label}</a></li>`).join('')}
        </ul>
        <a href="${C.contact.discord}" target="_blank" class="discord-btn">Join Discord</a>
      </div>
    </nav>
  `;

  // --- Render Hero ---
  document.getElementById('spa-hero').innerHTML = `
    <div class="hero-section section">
      <div class="hero-content">
        <h1 class="hero-title gradient-text orbitron">${C.hero.title}</h1>
        <p class="hero-desc">${C.hero.desc}</p>
        <a href="#boosting" class="cta-btn">${C.hero.cta}</a>
        <div class="trusted-banner">${C.hero.trusted}</div>
      </div>
      <div class="hero-art">
        <img src="${C.hero.carImg}" alt="Rocket League Car" class="car-art animated-car">
      </div>
    </div>
  `;

  // --- Render Partners ---
  document.getElementById('spa-partners').innerHTML = `
    <section class="section partners-section">
      <h2 class="section-title gradient-text orbitron">Featured In / Our Partners</h2>
      <div class="partners-logos">
        ${C.partners.map(p => `<img src="${p.img}" alt="${p.alt}" class="partner-logo">`).join('')}
      </div>
    </section>
  `;

  // --- Render Boosting & Coaching (Mega Section) ---
  document.getElementById('spa-boosting').innerHTML = `
    <section class="section boosting-section mega-section">
      <h2 class="section-title gradient-text orbitron">Boosting & Coaching</h2>
      <div id="boosting-mega-grid" class="card-grid mega-grid"></div>
    </section>
  `;
  renderBoostingMega(C.boosting, 'boosting-mega-grid');

  // --- Render Mods & Tricks (Mega Section) ---
  document.getElementById('spa-mods').innerHTML = `
    <section class="section mods-section mega-section">
      <h2 class="section-title gradient-text orbitron">Mods & Tricks</h2>
      <div id="mods-mega-grid" class="card-grid mega-grid"></div>
    </section>
  `;
  renderModsMega(C.mods, 'mods-mega-grid');

  // --- Render Community ---
  document.getElementById('spa-community').innerHTML = `
    <section class="section community-section">
      <h2 class="section-title gradient-text orbitron">Join the RL Community</h2>
      <div class="community-content">
        <div class="discord-widget">
          <iframe src="${C.community.discordWidget}" width="350" height="300" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
        </div>
        <div class="community-info">
          <p>${C.community.desc}</p>
          <a href="${C.contact.discord}" target="_blank" class="cta-btn">Join Discord</a>
        </div>
      </div>
    </section>
  `;

  // --- Render Testimonials ---
  document.getElementById('spa-testimonials').innerHTML = `
    <section class="section testimonials-section">
      <h2 class="section-title gradient-text orbitron">What Players Say</h2>
      <div id="testimonials-grid" class="testimonials-grid"></div>
    </section>
  `;
  renderTestimonials(C.testimonials);

  // --- Render FAQ ---
  document.getElementById('spa-faq').innerHTML = `
    <section class="section faq-section">
      <h2 class="section-title gradient-text orbitron">Frequently Asked Questions</h2>
      <div class="faq-list" id="faq-list"></div>
    </section>
  `;
  renderFAQ(C.faq);

  // --- Render Contact ---
  document.getElementById('spa-contact').innerHTML = `
    <section class="section contact-section">
      <h2 class="section-title gradient-text orbitron">Contact & Purchase</h2>
      <p class="contact-desc">${C.contact.desc}</p>
      <a href="${C.contact.discord}" target="_blank" class="cta-btn">Join Discord</a>
      <p class="contact-fallback">Prefer email? <a href="mailto:${C.contact.email}">${C.contact.email}</a></p>
    </section>
  `;

  // --- Render Footer ---
  document.getElementById('spa-footer').innerHTML = `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-links">
          ${C.nav.map((n, i) => `<a href="#${n.id}">${n.label}</a>${i < C.nav.length-1 ? ' | ' : ''}`).join('')}
        </div>
        <div class="footer-socials">
          <a href="${C.contact.discord}" target="_blank">Discord</a>
        </div>
        <div class="footer-legal">&copy; ${C.copyright}</div>
        <button id="back-to-top" class="back-to-top">↑ Back to top</button>
      </div>
    </footer>
  `;

  // --- Splash Screen Hide ---
  setTimeout(() => {
    const splash = document.getElementById('splash-screen');
    if (splash) splash.classList.add('hide');
  }, 1200);

  // --- SPA Navigation (scroll to section) ---
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.getElementById('spa-' + this.dataset.nav);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Modal Logic ---
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalCta = document.getElementById('modal-cta');
  document.body.addEventListener('click', e => {
    if (e.target.classList.contains('card-btn')) {
      if (modalTitle && modalDesc && modal && modalCta) {
        modalTitle.textContent = e.target.dataset.title;
        modalDesc.textContent = e.target.dataset.desc;
        modalCta.href = C.contact.discord;
        modal.classList.remove('hidden');
      }
    }
    if (e.target && (e.target.id === 'modal-close' || e.target === modal)) {
      if (modal) modal.classList.add('hidden');
    }
  });
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal) modal.classList.add('hidden');
  });

  // --- Back to Top Button ---
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// === Render Cards ===
function renderCards(arr, gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = '';
  arr.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.img}" alt="${item.title}" class="card-img">
      <div class="card-title orbitron">${item.title}</div>
      <div class="card-desc">${item.desc}</div>
      <div class="card-price">${item.price}</div>
      <button class="card-btn" data-title="${item.title}" data-desc="${item.desc}">Contact on Discord</button>
    `;
    grid.appendChild(card);
  });
}

// === Testimonials Data & Render ===
function renderTestimonials(arr) {
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;
  grid.innerHTML = '';
  arr.forEach(t => {
    const card = document.createElement('div');
    card.className = 'testimonial-card glass';
    card.innerHTML = `
      <div class="testimonial-user orbitron">${t.user}</div>
      <div class="testimonial-text">${t.text}</div>
    `;
    grid.appendChild(card);
  });
}

// === FAQ Data & Render ===
function renderFAQ(arr) {
  const faqList = document.getElementById('faq-list');
  if (!faqList) return;
  faqList.innerHTML = '';
  arr.forEach((f, i) => {
    const item = document.createElement('div');
    item.className = 'faq-item glass';
    item.innerHTML = `
      <div class="faq-question">${f.q}</div>
      <div class="faq-answer">${f.a}</div>
    `;
    item.addEventListener('click', () => {
      item.classList.toggle('open');
    });
    faqList.appendChild(item);
  });
}

// === Smooth Scroll ===
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});

// === Parallax & Particles ===
const bgParallax = document.getElementById('bg-parallax');
const particles = document.getElementById('particles');
if (particles) {
  function createParticles() {
    for (let i = 0; i < 60; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.top = Math.random() * 100 + 'vh';
      p.style.width = p.style.height = (Math.random() * 6 + 4) + 'px';
      p.style.background = `radial-gradient(circle, #00f0ff 0%, #a259ff 80%, transparent 100%)`;
      p.style.opacity = Math.random() * 0.5 + 0.2;
      p.style.position = 'absolute';
      p.style.borderRadius = '50%';
      p.style.filter = 'blur(1px)';
      particles.appendChild(p);
    }
  }
  createParticles();
  function animateParticles() {
    const ps = particles.children;
    for (let i = 0; i < ps.length; i++) {
      let p = ps[i];
      let t = parseFloat(p.style.top);
      t += 0.03 + Math.random() * 0.07;
      if (t > 100) t = -2;
      p.style.top = t + 'vh';
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}
// Parallax effect for hero car
const carArt = document.querySelector('.car-art');
if (carArt) {
  window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    carArt.style.transform = `translate(${x}px, ${y}px) scale(1.08)`;
  });
  window.addEventListener('mouseleave', () => {
    carArt.style.transform = '';
  });
}

// === SPA-like Navigation: Active Link Highlight ===
const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(document.querySelectorAll('section')).filter(s => s.id);
function setActiveNav() {
  let scrollPos = window.scrollY + 120;
  let current = sections.length ? sections[0].id : null;
  for (const section of sections) {
    if (section.offsetTop <= scrollPos) {
      current = section.id;
    }
  }
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current || link.getAttribute('href') === window.location.pathname.split('/').pop());
  });
}
window.addEventListener('scroll', setActiveNav);
setActiveNav();

// --- Render Boosting Mega Section ---
function renderBoostingMega(arr, gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = '';
  arr.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'card boosting-card' + (item.highlight ? ' boosting-highlight' : '');
    card.innerHTML = `
      <img src="${item.img}" alt="${item.title}" class="card-img">
      <div class="card-title orbitron">${item.title}</div>
      <div class="card-desc">${item.desc}</div>
      <div class="card-price">${item.price}</div>
      ${item.details ? `<div class="card-details">${item.details}</div>` : ''}
      <button class="card-btn" data-title="${item.title}" data-desc="${item.desc}">Contact on Discord</button>
    `;
    grid.appendChild(card);
  });
}

// --- Render Mods Mega Section ---
function renderModsMega(arr, gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = '';
  arr.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'card mods-card' + (item.featured ? ' mods-featured' : '');
    card.innerHTML = `
      <img src="${item.img}" alt="${item.title}" class="card-img">
      <div class="card-title orbitron">${item.title}</div>
      <div class="card-desc">${item.desc}</div>
      <div class="card-price">${item.price}</div>
      ${item.details ? `<div class="card-details">${item.details}</div>` : ''}
      <button class="card-btn" data-title="${item.title}" data-desc="${item.desc}">Contact on Discord</button>
    `;
    grid.appendChild(card);
  });
} 