(function () {
  function getRandomBackground() {
    const bgImages = [
      'URL TO IMAGE',
      'URL TO IMAGE',
      'URL TO IMAGE'
    ];
    const index = Math.floor(Math.random() * bgImages.length);
    return bgImages[index];
  }

  function setRandomBackground() {
    const bg = getRandomBackground();
    document.body.style.backgroundImage = "url('" + bg + "')";
  }

  function ensureParticlesContainer() {
    let container = document.getElementById('particles-js');
    if (!container) {
      container = document.createElement('div');
      container.id = 'particles-js';
      if (document.body.firstChild) {
        document.body.insertBefore(container, document.body.firstChild);
      } else {
        document.body.appendChild(container);
      }
    }
    return container;
  }

  function loadParticles() {
    const container = ensureParticlesContainer();
    if (!container) return;

    if (window._hailsParticlesLoaded) return;
    window._hailsParticlesLoaded = true;

    const coreScript = document.createElement('script');
    coreScript.src = 'https://LINK_TO/particlejs/particles.js';
    coreScript.onload = function () {
      const configScript = document.createElement('script');
      configScript.src = 'https://LINK_TO/particlejs/script.js';
      document.body.appendChild(configScript);
    };
    document.body.appendChild(coreScript);
  }

  function start() {
    setRandomBackground();
    loadParticles();
  }
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start);
})();

(function () {
  if (window._hailsCursorLoaded) return;
  window._hailsCursorLoaded = true;

  var SVG = `
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="fyGlow">
          <stop offset="0"   stop-color="#ffffff" stop-opacity="1"/>
          <stop offset=".14" stop-color="#FFD9E6" stop-opacity=".78"/>
          <stop offset=".30" stop-color="#F096A9" stop-opacity=".44"/>
          <stop offset=".48" stop-color="#F096A9" stop-opacity=".24"/>
          <stop offset=".68" stop-color="#EE7FA8" stop-opacity=".11"/>
          <stop offset=".85" stop-color="#E86FA0" stop-opacity=".04"/>
          <stop offset="1"   stop-color="#E86FA0" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="fyCore">
          <stop offset="0"   stop-color="#fff"/>
          <stop offset=".55" stop-color="#FFEAF2"/>
          <stop offset="1"   stop-color="#F096A9"/>
        </radialGradient>
        <linearGradient id="fyWing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0"   stop-color="#ffffff" stop-opacity=".62"/>
          <stop offset=".55" stop-color="#BFEAFB" stop-opacity=".38"/>
          <stop offset="1"   stop-color="#35B8ED" stop-opacity=".18"/>
        </linearGradient>
      </defs>

      <g class="bob">
        <circle class="glow" cx="20" cy="20" r="19" fill="url(#fyGlow)"/>

        <g class="wingL">
          <path d="M20 20 C15 10 5 7.5 5.5 14 C6 19.5 14 21.5 20 20 Z" fill="url(#fyWing)"
                stroke="rgba(255,255,255,.5)" stroke-width=".5"/>
          <path d="M20 20 C16.5 24.5 9 28 10.5 31 C12 33.5 18.5 26.5 20 20 Z" fill="url(#fyWing)"
                stroke="rgba(255,255,255,.38)" stroke-width=".4"/>
        </g>

        <g class="wingR">
          <path d="M20 20 C25 10 35 7.5 34.5 14 C34 19.5 26 21.5 20 20 Z" fill="url(#fyWing)"
                stroke="rgba(255,255,255,.5)" stroke-width=".5"/>
          <path d="M20 20 C23.5 24.5 31 28 29.5 31 C28 33.5 21.5 26.5 20 20 Z" fill="url(#fyWing)"
                stroke="rgba(255,255,255,.38)" stroke-width=".4"/>
        </g>

        <circle cx="20" cy="20" r="4.8" fill="none" stroke="#35B8ED" stroke-opacity=".4" stroke-width=".7"/>
        <circle cx="20" cy="20" r="3.9" fill="url(#fyCore)"/>
        <circle cx="18.8" cy="18.8" r="1.2" fill="#fff" opacity=".97"/>
      </g>
    </svg>`;

  function injectCursor() {
    var cur = document.getElementById('hailsCursor');
    if (!cur) {
      cur = document.createElement('div');
      cur.id = 'hailsCursor';
      cur.setAttribute('aria-hidden', 'true');
      cur.innerHTML = SVG;
      document.body.appendChild(cur);
    }
    return cur;
  }

  function initCursor() {
    var cur = injectCursor();
    if (!cur) return;

    if (window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches) {
      cur.style.display = 'none';
      return;
    }

    document.body.classList.add('hails-cursor-active');

    var x = 0, y = 0, lx = 0, ly = 0, sx = 0, sy = 0, seen = false, vel = 0;
    var ang = 0, aim = 0;

    var wings = [];
    var wingEls = cur.querySelectorAll('.wingL,.wingR');
    for (var i = 0; i < wingEls.length; i++) {
      if (wingEls[i].getAnimations) wings = wings.concat(wingEls[i].getAnimations());
    }

    document.addEventListener('mousemove', function (e) {
      x = e.clientX; y = e.clientY;
      if (!seen) {
        seen = true;
        lx = x; ly = y; sx = x; sy = y;
        cur.style.opacity = '1';
      }
    });

    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var MAX = 60, STEP = 14, alive = [];
    function sparkle(px, py) {
      if (reduced) return;
      while (alive.length >= MAX) {
        var old = alive.shift();
        if (old) old.remove();
      }
      var s = document.createElement('div');
      s.className = 'fairy-sparkle';
      s.style.left = px + 'px';
      s.style.top = py + 'px';
      s.style.setProperty('--dx', (Math.random() * 14 - 7).toFixed(1) + 'px');
      s.style.setProperty('--dy', (6 + Math.random() * 12).toFixed(1) + 'px');
      s.style.setProperty('--s', (0.6 + Math.random() * 0.6).toFixed(2));
      document.body.appendChild(s);
      alive.push(s);

      var gone = false;
      function done() {
        if (gone) return;
        gone = true;
        s.remove();
        var i = alive.indexOf(s);
        if (i > -1) alive.splice(i, 1);
      }
      s.addEventListener('animationend', done);
      setTimeout(done, 1800);
    }

    function frame() {
      if (seen) {
        var dx = x - lx, dy = y - ly;
        lx = x; ly = y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        vel = vel * 0.85 + dist * 0.15;

        if (dist > 1.2) aim = Math.atan2(dy, dx) * 180 / Math.PI + 90;
        var turn = ((aim - ang + 540) % 360) - 180;
        ang += turn * 0.18;

        cur.style.transform =
          'translate(' + x + 'px,' + y + 'px) translate(-50%,-50%) rotate(' + ang.toFixed(1) + 'deg)';

        var rate = Math.min(5.5, 1 + vel * 0.22);
        for (var i = 0; i < wings.length; i++) wings[i].playbackRate = rate;

        var tx = x - sx, ty = y - sy;
        var gap = Math.sqrt(tx * tx + ty * ty);
        if (gap > STEP) {
          var n = Math.min(Math.floor(gap / STEP), 10);
          for (var k = 1; k <= n; k++) {
            var f = k * STEP / gap;
            sparkle(sx + tx * f, sy + ty * f);
          }
          var moved = n * STEP / gap;
          sx += tx * moved;
          sy += ty * moved;
        }
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if (document.readyState === 'complete') initCursor();
  else window.addEventListener('load', initCursor);
})();

(function () {
  if (window._hailsServedLoaded) return;
  window._hailsServedLoaded = true;

  function injectServed() {
    var el = document.getElementById('served');
    if (!el) {
      el = document.createElement('div');
      el.id = 'served';
      document.body.appendChild(el);
    }
    return el;
  }

  function activate(el) {
    function split() {
      var text = el.getAttribute('data-text') || el.textContent.trim();
      if (!text) return false;
      el.setAttribute('data-text', text);
      el.setAttribute('aria-label', text);
      el.textContent = '';
      for (var i = 0; i < text.length; i++) {
        var s = document.createElement('span');
        s.textContent = text[i];
        if (text[i] === ' ') s.className = 'sp';
        s.setAttribute('aria-hidden', 'true');
        el.appendChild(s);
      }
      return true;
    }

    function measure() {
      var spans = el.children, W = el.offsetWidth;
      if (!W) return;
      el.style.setProperty('--w', W + 'px');
      el.style.setProperty('--bw', (W * 2) + 'px');
      for (var i = 0; i < spans.length; i++) {
        spans[i].style.setProperty('--o', (-spans[i].offsetLeft) + 'px');
      }
    }

    if (split()) measure();

    var t;
    window.addEventListener('resize', function () {
      clearTimeout(t);
      t = setTimeout(measure, 150);
    });
  }

  function startServed() {
    var el = injectServed();
    var s = document.createElement('script');
    s.src = 'https://LINK_TO/served.js';
    s.onload = function () { activate(el); };
    s.onerror = function () { activate(el); };
    document.body.appendChild(s);
  }
  if (document.readyState === 'complete') startServed();
  else window.addEventListener('load', startServed);
})();
