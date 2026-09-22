document.addEventListener('DOMContentLoaded', function () {

  // ---- mobile nav toggle ----
  var btn = document.querySelector('.nav-toggle');
  var nav = document.querySelector('nav.primary');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      btn.classList.toggle('active', isOpen);
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // close menu when a link is tapped
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        btn.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- sticky header shadow on scroll ----
  var header = document.querySelector('header.site');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---- hero photo carousel ----
  var hero = document.getElementById('hero-carousel');
  if (hero) {
    var slides = hero.querySelectorAll('.slide');
    var dots = hero.querySelectorAll('.dot');
    var idx = 0;
    var timer;

    function show(i) {
      slides.forEach(function (s, si) { s.classList.toggle('active', si === i); });
      dots.forEach(function (d, di) { d.classList.toggle('active', di === i); });
      idx = i;
    }
    function next() { show((idx + 1) % slides.length); }
    function prev() { show((idx - 1 + slides.length) % slides.length); }
    function restart() {
      clearInterval(timer);
      timer = setInterval(next, 5500);
    }

    var nextBtn = hero.querySelector('.hc-next');
    var prevBtn = hero.querySelector('.hc-prev');
    if (nextBtn) nextBtn.addEventListener('click', function () { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); restart(); });
    dots.forEach(function (d) {
      d.addEventListener('click', function () { show(parseInt(d.dataset.i, 10)); restart(); });
    });
    hero.addEventListener('mouseenter', function () { clearInterval(timer); });
    hero.addEventListener('mouseleave', restart);
    restart();
  }

  // ---- infinite auto-scrolling marquee (services cards) ----
  document.querySelectorAll('.marquee-track').forEach(function (track) {
    var originals = Array.prototype.slice.call(track.children);
    originals.forEach(function (node) {
      track.appendChild(node.cloneNode(true));
    });
  });

  // ---- scroll-reveal animations ----
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('in-view'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  // ---- stagger index for grid children inside .reveal-stagger ----
  document.querySelectorAll('.reveal-stagger').forEach(function (group) {
    Array.prototype.slice.call(group.children).forEach(function (child, i) {
      child.style.setProperty('--i', i);
    });
  });
});
