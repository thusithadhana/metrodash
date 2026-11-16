/**
 * METROPOLITAN MANAGEMENT INTELLIGENCE - DASHBOARD WEB APPLICATION
 * Motion.dev Physics Animation Controller Engine (https://motion.dev)
 * Powers Direction-Aware Smooth Page-by-Page Transitions, Staggered Card Entrances,
 * Animated Numeric Rollups, Fluid Springs & Reactive Micro-Physics
 */

const MotionController = {
  isTransitioning: false,

  get isAvailable() {
    return typeof window !== 'undefined' && !!window.Motion && typeof window.Motion.animate === 'function';
  },

  /**
   * Safe wrapper around Motion.animate with fallback
   */
  animate(targets, keyframes, options = {}) {
    if (!this.isAvailable || !targets) return Promise.resolve();
    try {
      return window.Motion.animate(targets, keyframes, options);
    } catch (err) {
      console.warn('[MotionController] animate error:', err);
      return Promise.resolve();
    }
  },

  /**
   * Safe wrapper around Motion.stagger
   */
  stagger(duration = 0.05, options = {}) {
    if (this.isAvailable && typeof window.Motion.stagger === 'function') {
      try {
        return window.Motion.stagger(duration, options);
      } catch (_e) { }
    }
    return (i) => i * duration;
  },

  /**
   * Initialize Global Motion.dev Listeners & Continuous Micro-Physics
   */
  init() {
    if (!this.isAvailable) {
      console.info('[MotionController] Motion.dev loaded in standard mode.');
      return;
    }
    console.info('[MotionController] Motion.dev Physics Engine active.');

    // Animate Header Ribbon, Slicers, Ticker & Dock on initial load with physics springs
    this.animate('.executive-glass-header', { opacity: [0, 1], y: [-20, 0] }, { type: 'spring', stiffness: 340, damping: 26 });
    this.animate('.modern-slicer-strip', { opacity: [0, 1], y: [-14, 0] }, { type: 'spring', stiffness: 320, damping: 26, delay: 0.08 });
    this.animate('.modern-ticker-strip', { opacity: [0, 1], y: [-10, 0] }, { type: 'spring', stiffness: 300, damping: 26, delay: 0.15 });
    this.animate('.executive-floating-dock', { opacity: [0, 1], y: [20, 0] }, { type: 'spring', stiffness: 340, damping: 26, delay: 0.22 });

    // Interactive button tap gesture bindings & interactive orb movement
    this.bindGlobalButtonGestures();
    this.initInteractiveOrb();
    this.initDockMagnification();
    this.initMagneticButtons();
  },

  /**
   * Smooth Page-by-Page Animation Transition using Motion.dev
   * Direction-aware fluid slide, spring settling, and component cascade
   */
  async transitionPage(viewport, renderCallback, options = {}) {
    if (!viewport) return;
    const { direction = 1, onComplete } = options;

    if (!this.isAvailable) {
      if (typeof renderCallback === 'function') renderCallback(viewport);
      if (typeof onComplete === 'function') onComplete();
      return;
    }

    const currentContent = viewport.firstElementChild;

    // First load / empty viewport: render directly and run entrance
    if (!currentContent) {
      if (typeof renderCallback === 'function') renderCallback(viewport);
      const newContent = viewport.firstElementChild;
      if (newContent) {
        this.animatePageEntrance(newContent);
      }
      if (typeof onComplete === 'function') onComplete();
      return;
    }

    this.isTransitioning = true;

    try {
      // 1. Directional Exit Animation for existing page content
      const exitDistance = 35 * (direction >= 0 ? 1 : -1);
      const exitAnim = this.animate(
        currentContent,
        {
          opacity: [1, 0],
          transform: ['translateX(0px) scale(1)', `translateX(${-exitDistance}px) scale(0.97)`],
          filter: ['blur(0px)', 'blur(8px)']
        },
        {
          duration: 0.22,
          easing: [0.4, 0, 0.2, 1]
        }
      );

      if (exitAnim && typeof exitAnim.then === 'function') {
        await exitAnim;
      } else {
        await new Promise(r => setTimeout(r, 220));
      }

      // 2. Render new page content
      if (typeof renderCallback === 'function') {
        renderCallback(viewport);
      }

      const newContent = viewport.firstElementChild;
      if (newContent) {
        // Set initial transform state for incoming page
        const enterDistance = 45 * (direction >= 0 ? 1 : -1);
        newContent.style.opacity = '0';
        newContent.style.transform = `translateX(${enterDistance}px) scale(0.97)`;
        newContent.style.filter = 'blur(8px)';

        // 3. Directional Spring Entrance Animation for incoming page
        this.animate(
          newContent,
          {
            opacity: [0, 1],
            transform: [`translateX(${enterDistance}px) scale(0.97)`, 'translateX(0px) scale(1)'],
            filter: ['blur(8px)', 'blur(0px)']
          },
          {
            type: 'spring',
            stiffness: 300,
            damping: 26,
            duration: 0.5
          }
        );

        // 4. Staggered cascade of cards, charts, leaderboards, meters, sparklines, and numeric counters
        this.animatePageEntrance(newContent);
      }
    } catch (err) {
      console.warn('[MotionController] transitionPage error:', err);
      if (typeof renderCallback === 'function') renderCallback(viewport);
    } finally {
      this.isTransitioning = false;
      if (typeof onComplete === 'function') onComplete();
    }
  },

  /**
   * Orchestrates the complete entrance sequence for any newly rendered dashboard page/panel
   */
  animatePageEntrance(container) {
    if (!container || !this.isAvailable) return;

    // 1. KPI Cards: Staggered spring pop-up with lift and scale
    const kpiCards = container.querySelectorAll('.kpi-card');
    if (kpiCards.length > 0) {
      this.animate(
        kpiCards,
        {
          opacity: [0, 1],
          transform: ['translateY(28px) scale(0.94)', 'translateY(0px) scale(1)']
        },
        {
          delay: this.stagger(0.05, { startDelay: 0.04 }),
          type: 'spring',
          stiffness: 350,
          damping: 24
        }
      );
    }

    // 2. Heavy Visual Cards (Radial Gauge, Concentric Wheel, Donut Chart, Bullet Bars, Leaderboards)
    const visualCards = container.querySelectorAll(
      '.radial-gauge-card, .concentric-wheel-card, .chart-card, .leaderboard-card, .award-card, .insight-card'
    );
    if (visualCards.length > 0) {
      this.animate(
        visualCards,
        {
          opacity: [0, 1],
          transform: ['translateY(24px) scale(0.96)', 'translateY(0px) scale(1)']
        },
        {
          delay: this.stagger(0.06, { startDelay: 0.08 }),
          type: 'spring',
          stiffness: 320,
          damping: 25
        }
      );
    }

    // 3. Leaderboard Rows: Cascading Staggered Entrance
    const lbRows = container.querySelectorAll('.leaderboard-row');
    if (lbRows.length > 0) {
      this.animate(
        lbRows,
        {
          opacity: [0, 1],
          transform: ['translateX(-22px)', 'translateX(0px)']
        },
        {
          delay: this.stagger(0.035, { startDelay: 0.12 }),
          type: 'spring',
          stiffness: 380,
          damping: 26
        }
      );
    }

    // 4. In-Cell Horizontal Progress Bars & Meters: Smooth Spring Extension
    const progressFills = container.querySelectorAll(
      '.row-progress-fill, .bar-fill, .bar-capsule-fill, .legend-mini-fill, .kpi-meter-fill'
    );
    progressFills.forEach((fill, idx) => {
      const targetWidth = fill.dataset.targetWidth || fill.style.width || '100%';
      this.animate(
        fill,
        {
          width: ['0%', targetWidth],
          opacity: [0.5, 1]
        },
        {
          duration: 0.95,
          delay: 0.08 + idx * 0.03,
          easing: [0.16, 1, 0.3, 1]
        }
      );
    });

    // 5. Speedometer Pointer Needle Spring Sweep
    const needles = container.querySelectorAll('.gauge-needle-group');
    needles.forEach((needle, idx) => {
      const targetAngle = needle.dataset.targetAngle || '135';
      this.animate(
        needle,
        {
          transform: ['rotate(135deg)', `rotate(${targetAngle}deg)`]
        },
        {
          type: 'spring',
          stiffness: 220,
          damping: 20,
          delay: 0.04 + idx * 0.05
        }
      );
    });

    // 6. Speedometer Luminous Gauge Arcs Draw-In
    const gaugeArcs = container.querySelectorAll('.gauge-arc-fill');
    gaugeArcs.forEach((arc, idx) => {
      const arcLen = parseFloat(arc.dataset.arcLength || arc.getAttribute('stroke-dasharray')?.split(' ')[0] || '292');
      const targetOff = parseFloat(arc.dataset.targetOffset || arc.getAttribute('stroke-dashoffset') || '0');
      this.animate(
        arc,
        {
          strokeDashoffset: [arcLen, targetOff]
        },
        {
          duration: 1.15,
          delay: 0.05 + idx * 0.06,
          easing: [0.34, 1.56, 0.64, 1]
        }
      );
    });

    // 7. Concentric Velocity Rings Staggered Dashoffset Draw-In
    const concentricRings = container.querySelectorAll('.concentric-ring-fill');
    concentricRings.forEach((ring, idx) => {
      const targetOffset = parseFloat(ring.dataset.targetOffset || ring.getAttribute('stroke-dashoffset') || '0');
      const totalCirc = parseFloat(ring.dataset.totalCircumference || ring.getAttribute('stroke-dasharray')?.split(' ')[0] || '500');
      this.animate(
        ring,
        {
          strokeDashoffset: [totalCirc, targetOffset]
        },
        {
          duration: 1.25,
          delay: 0.08 + idx * 0.08,
          easing: [0.34, 1.56, 0.64, 1]
        }
      );
    });

    // 8. Donut Chart Wedges Staggered Spring Pop
    const donutSlices = container.querySelectorAll('.donut-slice');
    if (donutSlices.length > 0) {
      this.animate(
        donutSlices,
        {
          opacity: [0, 1],
          transform: ['scale(0.85)', 'scale(1)']
        },
        {
          delay: this.stagger(0.06, { startDelay: 0.1 }),
          type: 'spring',
          stiffness: 320,
          damping: 22
        }
      );
    }

    // 9. Benchmark Target Indicator Lines Drop-Down
    const benchmarkLines = container.querySelectorAll('.bar-benchmark-line, .bar-benchmark-pin');
    benchmarkLines.forEach((line, idx) => {
      this.animate(
        line,
        {
          opacity: [0, 1],
          transform: ['scaleY(0)', 'scaleY(1)']
        },
        {
          type: 'spring',
          stiffness: 350,
          damping: 22,
          delay: 0.15 + idx * 0.04
        }
      );
    });

    // 10. Bar Chart Rank Badges Pop
    const rankBadges = container.querySelectorAll('.bar-rank-badge');
    if (rankBadges.length > 0) {
      this.animate(
        rankBadges,
        {
          opacity: [0, 1],
          transform: ['scale(0.7)', 'scale(1)']
        },
        {
          delay: this.stagger(0.035, { startDelay: 0.08 }),
          type: 'spring',
          stiffness: 400,
          damping: 22
        }
      );
    }

    // 11. SVG Sparkline Bézier Path Draw-In
    const sparklines = container.querySelectorAll('.sparkline-path-line');
    sparklines.forEach((path, idx) => {
      this.animate(
        path,
        {
          strokeDashoffset: [280, 0],
          opacity: [0.2, 1]
        },
        {
          duration: 0.95,
          delay: 0.1 + idx * 0.04,
          easing: [0.16, 1, 0.3, 1]
        }
      );
    });

    // 12. SVG Sparkline Area Fill Glow
    const sparklineAreas = container.querySelectorAll('.sparkline-path-area');
    if (sparklineAreas.length > 0) {
      this.animate(
        sparklineAreas,
        {
          opacity: [0, 0.32]
        },
        {
          duration: 1.1,
          delay: 0.22,
          easing: 'ease-out'
        }
      );
    }

    // 13. Pulsing Beacon Dots & Award Medals Spring Bounce
    const beaconDots = container.querySelectorAll('.sparkline-beacon-dot, .pulse-beacon-dot, .status-beacon-dot');
    if (beaconDots.length > 0) {
      this.animate(
        beaconDots,
        {
          transform: ['scale(0)', 'scale(1.5)', 'scale(1)'],
          opacity: [0, 1]
        },
        {
          duration: 0.5,
          delay: this.stagger(0.04, { startDelay: 0.3 }),
          type: 'spring',
          stiffness: 450,
          damping: 20
        }
      );
    }

    // 14. Award Winner Medallions (Spin & Pop Entrance)
    const medallions = container.querySelectorAll('.award-medallion-inner');
    if (medallions.length > 0) {
      this.animate(
        medallions,
        {
          transform: ['rotate(-45deg) scale(0.6)', 'rotate(0deg) scale(1)'],
          opacity: [0, 1]
        },
        {
          duration: 0.8,
          delay: this.stagger(0.1, { startDelay: 0.1 }),
          type: 'spring',
          stiffness: 300,
          damping: 18
        }
      );
    }

    // 15. Smooth numeric counter roll up with Motion.dev physics
    this.animateNumbers(container);

    // 16. Bind Real-Time Spring Hover & Tap Physics to All Interactive Cards
    this.bindCardGestures(container);
  },

  /**
   * Smooth number counter roll-up using requestAnimationFrame with cubic/spring ease
   */
  animateNumbers(container) {
    if (!container) return;
    const countEls = container.querySelectorAll('.animated-count-val');
    countEls.forEach((el, index) => {
      const rawText = el.getAttribute('data-raw') || el.textContent.trim();
      if (!rawText) return;

      const match = rawText.match(/^([^\d.-]*)([\d,.]+)(.*)$/);
      if (!match) return;

      const prefix = match[1] || "";
      const numStr = match[2].replace(/,/g, '');
      const suffix = match[3] || "";
      const targetVal = parseFloat(numStr);
      if (isNaN(targetVal)) return;

      const hasDecimals = numStr.includes('.');
      const decimalPlaces = hasDecimals ? (numStr.split('.')[1] || '').length : 0;
      const duration = 800;
      const startDelay = index * 30;
      const startTime = performance.now() + startDelay;

      const update = (now) => {
        const elapsed = now - startTime;
        if (elapsed < 0) {
          requestAnimationFrame(update);
          return;
        }
        const progress = Math.min(elapsed / duration, 1);
        const easeVal = 1 - Math.pow(1 - progress, 3);
        const currentNum = targetVal * easeVal;

        let formattedNum = "";
        if (match[2].includes(',') && !hasDecimals) {
          formattedNum = Math.round(currentNum).toLocaleString('en-US');
        } else {
          formattedNum = currentNum.toFixed(decimalPlaces);
        }

        el.textContent = `${prefix}${formattedNum}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = rawText;
        }
      };

      el.textContent = `${prefix}0${hasDecimals ? '.' + '0'.repeat(decimalPlaces) : ''}${suffix}`;
      requestAnimationFrame(update);
    });
  },

  /**
   * Binds Motion.dev spring physics gestures to dashboard cards
   * Features: Aceternity Spotlight coordinate tracking, Apple Vision Pro 3D Perspective Tilt & Fluid Ripple
   */
  bindCardGestures(container) {
    if (!this.isAvailable || !container) return;
    const cards = container.querySelectorAll(
      '.kpi-card, .chart-card, .radial-gauge-card, .concentric-wheel-card, .leaderboard-card, .award-card, .insight-card'
    );

    cards.forEach(card => {
      if (card.dataset.motionBound === 'true') return;
      card.dataset.motionBound = 'true';

      let rect = null;
      let rafId = null;

      const updateCardTiltAndSpotlight = (e) => {
        if (!rect) rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Aceternity Spotlight CSS coordinates
        card.style.setProperty('--mouse-x', `${mouseX}px`);
        card.style.setProperty('--mouse-y', `${mouseY}px`);

        // Apple Vision Pro 3D Perspective Tilt Parallax
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const tiltX = ((mouseY - centerY) / centerY) * -5.5; // Max 5.5deg
        const tiltY = ((mouseX - centerX) / centerX) * 5.5;  // Max 5.5deg

        MotionController.animate(
          card,
          {
            transform: `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-6px) scale3d(1.014, 1.014, 1.014)`,
            boxShadow: '0 20px 45px -8px rgba(0, 120, 212, 0.24)'
          },
          {
            type: 'spring',
            stiffness: 420,
            damping: 26
          }
        );
      };

      card.addEventListener('pointerenter', (e) => {
        rect = card.getBoundingClientRect();
        updateCardTiltAndSpotlight(e);
      });

      card.addEventListener('pointermove', (e) => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => updateCardTiltAndSpotlight(e));
      });

      card.addEventListener('pointerleave', () => {
        if (rafId) cancelAnimationFrame(rafId);
        rect = null;
        card.style.setProperty('--mouse-x', '-500px');
        card.style.setProperty('--mouse-y', '-500px');
        MotionController.animate(
          card,
          {
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)',
            boxShadow: '0 10px 30px -5px rgba(0, 56, 130, 0.08)'
          },
          {
            type: 'spring',
            stiffness: 450,
            damping: 26
          }
        );
      });

      card.addEventListener('pointerdown', (e) => {
        MotionController.animate(
          card,
          {
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-2px) scale3d(0.985, 0.985, 0.985)'
          },
          {
            type: 'spring',
            stiffness: 600,
            damping: 30
          }
        );
        MotionController.createRipple(card, e);
      });

      card.addEventListener('pointerup', () => {
        MotionController.animate(
          card,
          {
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-6px) scale3d(1.014, 1.014, 1.014)'
          },
          {
            type: 'spring',
            stiffness: 500,
            damping: 24
          }
        );
      });
    });
  },

  /**
   * Binds global button tap and hover spring gestures
   */
  bindGlobalButtonGestures() {
    if (!this.isAvailable) return;
    const buttons = document.querySelectorAll(
      '.modern-action-btn, .dock-nav-btn, .dock-tab-item, .splash-skip-btn, .modern-slicer-pill, .btn-primary, .btn-secondary, .icon-button'
    );

    buttons.forEach(btn => {
      btn.addEventListener('pointerdown', () => {
        MotionController.animate(btn, { transform: 'scale(0.92)' }, { type: 'spring', stiffness: 600, damping: 25 });
      });
      btn.addEventListener('pointerup', () => {
        MotionController.animate(btn, { transform: 'scale(1)' }, { type: 'spring', stiffness: 500, damping: 22 });
      });
      btn.addEventListener('pointerleave', () => {
        MotionController.animate(btn, { transform: 'scale(1)' }, { type: 'spring', stiffness: 500, damping: 25 });
      });
    });
  },

  /**
   * Apple macOS Dock Proximity Magnification with Motion.dev Springs
   */
  initDockMagnification() {
    const dockContainer = document.getElementById('paginationPillsContainer') || document.querySelector('.dock-tabs-scroll-area');
    if (!dockContainer || !this.isAvailable) return;

    let dockRaf = null;

    const handleDockMove = (e) => {
      const tabs = dockContainer.querySelectorAll('.dock-tab-item');
      if (!tabs.length) return;

      const cursorX = e.clientX;
      const sigma = 62; // Bell curve spread in pixels
      const maxScale = 0.26; // Maximum +26% magnification

      tabs.forEach(tab => {
        const rect = tab.getBoundingClientRect();
        const tabCenterX = rect.left + rect.width / 2;
        const dist = Math.abs(cursorX - tabCenterX);
        const scale = 1 + maxScale * Math.exp(-(dist * dist) / (2 * sigma * sigma));
        const lift = (scale - 1) * -14;

        tab.style.transform = `translateY(${lift.toFixed(1)}px) scale(${scale.toFixed(3)})`;
        tab.style.zIndex = Math.round(scale * 10);
      });
    };

    dockContainer.addEventListener('pointermove', (e) => {
      if (dockRaf) cancelAnimationFrame(dockRaf);
      dockRaf = requestAnimationFrame(() => handleDockMove(e));
    });

    dockContainer.addEventListener('pointerleave', () => {
      if (dockRaf) cancelAnimationFrame(dockRaf);
      const tabs = dockContainer.querySelectorAll('.dock-tab-item');
      tabs.forEach(tab => {
        MotionController.animate(
          tab,
          { transform: 'translateY(0px) scale(1)' },
          { type: 'spring', stiffness: 450, damping: 25 }
        );
        tab.style.zIndex = '';
      });
    });
  },

  /**
   * Vercel / Stripe Magnetic Buttons with Spring Attraction & Snap-Back
   */
  initMagneticButtons() {
    if (!this.isAvailable) return;
    const magneticSelector = '.modern-action-btn, .dock-nav-btn, .splash-skip-btn, #btnPlayPause, #btnThemeToggle, #btnFullscreen, .modern-slicer-pill, .magnetic-btn';

    const bindMagneticElement = (btn) => {
      if (btn.dataset.magneticBound === 'true') return;
      btn.dataset.magneticBound = 'true';

      let rect = null;

      btn.addEventListener('pointerenter', () => {
        rect = btn.getBoundingClientRect();
      });

      btn.addEventListener('pointermove', (e) => {
        if (!rect) rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const pull = 0.26; // Magnetic pull strength
        const deltaX = (e.clientX - centerX) * pull;
        const deltaY = (e.clientY - centerY) * pull;

        MotionController.animate(
          btn,
          {
            transform: `translate(${deltaX.toFixed(1)}px, ${deltaY.toFixed(1)}px) scale(1.05)`
          },
          {
            type: 'spring',
            stiffness: 450,
            damping: 22
          }
        );
      });

      btn.addEventListener('pointerleave', () => {
        rect = null;
        MotionController.animate(
          btn,
          {
            transform: 'translate(0px, 0px) scale(1)'
          },
          {
            type: 'spring',
            stiffness: 500,
            damping: 24
          }
        );
      });

      btn.addEventListener('pointerdown', (e) => {
        MotionController.createRipple(btn, e);
      });
    };

    document.querySelectorAll(magneticSelector).forEach(bindMagneticElement);

    const observer = new MutationObserver(() => {
      document.querySelectorAll(magneticSelector).forEach(bindMagneticElement);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  },

  /**
   * Modern Material 3 / Fluid Expanding Ripple Click Micro-interaction
   */
  createRipple(element, event) {
    if (!element || !event) return;
    try {
      const rect = element.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'modern-fluid-ripple';

      const size = Math.max(rect.width, rect.height) * 1.8;
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      element.appendChild(ripple);

      this.animate(
        ripple,
        {
          transform: ['scale(0)', 'scale(1)'],
          opacity: [0.45, 0]
        },
        {
          duration: 0.55,
          easing: 'ease-out'
        }
      ).then(() => {
        if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
      });
    } catch (_err) { }
  },

  /**
   * Smoothly animates bottom navigation tab activation
   */
  animateTabActivation(activePill) {
    if (!this.isAvailable || !activePill) return;
    this.animate(
      activePill,
      {
        transform: ['scale(0.92)', 'scale(1.08)', 'scale(1)']
      },
      {
        duration: 0.35,
        type: 'spring',
        stiffness: 500,
        damping: 22
      }
    );
  },

  /**
   * Interactive Ambient Glow Orb following pointer with fluid physics & multi-layer 3D depth parallax
   */
  initInteractiveOrb() {
    const orb = document.getElementById('interactiveOrb');
    const bgOrbs = document.querySelectorAll('.ambient-orb:not(.ambient-orb-interactive)');
    if (!orb || !this.isAvailable) return;

    let rafId = null;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;

    window.addEventListener('pointermove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          rafId = null;
          // Smooth spring follower for the primary interactive beam
          MotionController.animate(
            orb,
            {
              transform: `translate(${targetX}px, ${targetY}px)`
            },
            {
              type: 'spring',
              stiffness: 140,
              damping: 22,
              mass: 0.6
            }
          );

          // Multi-layer depth parallax drift for ambient background orbs
          const normX = (targetX / window.innerWidth - 0.5) * 35;
          const normY = (targetY / window.innerHeight - 0.5) * 35;
          bgOrbs.forEach((bgOrb, idx) => {
            const factor = (idx + 1) * 0.4;
            bgOrb.style.transform = `translate(${normX * factor}px, ${normY * factor}px)`;
          });
        });
      }
    }, { passive: true });
  },

  /**
   * Modal Open Animation with Motion.dev spring scale
   */
  animateModalOpen(modalCard) {
    if (!this.isAvailable || !modalCard) return;
    this.animate(
      modalCard,
      {
        opacity: [0, 1],
        transform: ['translateY(32px) scale(0.92)', 'translateY(0px) scale(1)']
      },
      {
        duration: 0.45,
        type: 'spring',
        stiffness: 380,
        damping: 25
      }
    );
  },

  /**
   * Modal Close Animation
   */
  animateModalClose(modalCard, onFinish) {
    if (!this.isAvailable || !modalCard) {
      if (typeof onFinish === 'function') onFinish();
      return;
    }
    const anim = this.animate(
      modalCard,
      {
        opacity: [1, 0],
        transform: ['scale(1)', 'scale(0.94) translateY(16px)']
      },
      {
        duration: 0.2,
        easing: 'ease-in'
      }
    );
    if (anim && typeof anim.then === 'function') {
      anim.then(onFinish);
    } else {
      setTimeout(onFinish, 200);
    }
  }
};
