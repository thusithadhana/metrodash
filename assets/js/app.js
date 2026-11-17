/**
 * METROPOLITAN MANAGEMENT INTELLIGENCE - DASHBOARD WEB APPLICATION
 * Master Coordinator, Presentation Auto-Slide Engine, Telemetry & Modals
 */

const App = {
  state: {
    currentPageIndex: 1,
    currentPanelIndex: 1,
    isPaused: false,
    isUserInteracting: false,
    isDarkTheme: false, // Default Light Theme
    isAudioEnabled: false, // Default muted for boardroom quiet
    panelDurationMs: 60000, // 60 Seconds per slide panel matching Smartboard presentation engine
    slideProgress: 0,
    intervalId: null,
    inactivityTimerId: null,
    autoSyncIntervalId: null,
    autoSyncIntervalMs: 60000 // Background auto-sync interval (default 60s)
  },

  elements: {},

  // Futuristic Web Audio Synthesizer (0 External Dependencies)
  audio: {
    ctx: null,
    init() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      } catch (_e) { }
    },
    playChime() {
      if (!App.state.isAudioEnabled || !this.ctx) return;
      try {
        if (this.ctx.state === 'suspended') this.ctx.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(784, this.ctx.currentTime); // G5
        osc.frequency.exponentialRampToValueAtTime(1046.5, this.ctx.currentTime + 0.08); // C6
        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.13);
      } catch (_e) { }
    },
    playClick() {
      if (!App.state.isAudioEnabled || !this.ctx) return;
      try {
        if (this.ctx.state === 'suspended') this.ctx.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1100, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
      } catch (_e) { }
    }
  },

  init() {
    this.audio.init();
    this.cacheDom();
    this.initTheme();
    this.initClock();
    this.initCursorTracking();
    if (window.MotionController) {
      MotionController.init();
    }
    this.bindEvents();
    this.startInitialSplash();
  },

  cacheDom() {
    this.elements = {
      app: document.getElementById('app'),
      viewport: document.getElementById('dashboardViewport'),
      splashScreen: document.getElementById('splashScreen'),
      splashProgressBar: document.getElementById('splashProgressBar'),
      splashStatusText: document.getElementById('splashStatusText'),
      splashSkipBtn: document.getElementById('splashSkipBtn'),
      interactiveOrb: document.getElementById('interactiveOrb'),

      // Header
      liveClockText: document.getElementById('liveClockText'),
      sheetsSyncPill: document.getElementById('sheetsSyncPill'),
      btnManualSync: document.getElementById('btnManualSync'),
      btnToggleTheme: document.getElementById('btnToggleTheme'),
      btnToggleAudio: document.getElementById('btnToggleAudio'),
      btnSlideGrid: document.getElementById('btnSlideGrid'),
      btnShortcutsGuide: document.getElementById('btnShortcutsGuide'),
      btnDiagnostics: document.getElementById('btnDiagnostics'),
      btnAdminSettings: document.getElementById('btnAdminSettings'),
      btnAbout: document.getElementById('btnAbout'),
      btnFullscreen: document.getElementById('btnFullscreen'),

      // Bottom Bar
      pageIndexBadge: document.getElementById('pageIndexBadge'),
      pageTitleLabel: document.getElementById('pageTitleLabel'),
      pausedBadge: document.getElementById('pausedBadge'),
      paginationPillsContainer: document.getElementById('paginationPillsContainer'),
      panelDotsContainer: document.getElementById('panelDotsContainer'),
      btnPrevSlide: document.getElementById('btnPrevSlide'),
      btnPlayPause: document.getElementById('btnPlayPause'),
      btnNextSlide: document.getElementById('btnNextSlide'),
      slideProgressFill: document.getElementById('slideProgressFill'),

      // Modals
      diagnosticsModal: document.getElementById('diagnosticsModal'),
      adminModal: document.getElementById('adminModal'),
      adminSyncFreqSelect: document.getElementById('adminSyncFreqSelect'),
      aboutModal: document.getElementById('aboutModal'),
      slideGridModal: document.getElementById('slideGridModal'),
      shortcutsModal: document.getElementById('shortcutsModal'),
      slideMatrixGridContainer: document.getElementById('slideMatrixGridContainer')
    };
  },

  initTheme() {
    const urlParams = new URLSearchParams(window.location.search);
    // Explicitly enforce light theme profile by default
    const isDark = urlParams.get('theme') === 'dark';
    this.setTheme(isDark);
  },

  setTheme(isDark) {
    this.state.isDarkTheme = isDark;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('metro_mi_theme', isDark ? 'dark' : 'light');

    if (this.elements.btnToggleTheme) {
      this.elements.btnToggleTheme.innerHTML = isDark
        ? `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>`;
    }
  },

  toggleTheme() {
    this.setTheme(!this.state.isDarkTheme);
    this.renderCurrentView();
  },

  initClock() {
    const updateTime = () => {
      const now = new Date();
      const pad = n => String(n).padStart(2, '0');
      const year = now.getFullYear();
      const month = pad(now.getMonth() + 1);
      const date = pad(now.getDate());
      const hours = pad(now.getHours());
      const mins = pad(now.getMinutes());
      const secs = pad(now.getSeconds());

      if (this.elements.liveClockText) {
        this.elements.liveClockText.textContent = `${year}-${month}-${date}  ${hours}:${mins}:${secs}`;
      }
    };
    updateTime();
    setInterval(updateTime, 1000);
  },

  bindEvents() {
    // Touch & User Inactivity Detection
    const onUserInteract = () => {
      this.state.isUserInteracting = true;
      clearTimeout(this.state.inactivityTimerId);
      this.state.inactivityTimerId = setTimeout(() => {
        this.state.isUserInteracting = false;
      }, 30000); // 30s inactivity timeout
    };

    window.addEventListener('click', onUserInteract);
    window.addEventListener('touchstart', onUserInteract, { passive: true });
    window.addEventListener('keydown', onUserInteract);

    // Header Actions
    this.elements.btnToggleTheme?.addEventListener('click', () => {
      this.toggleTheme();
      this.audio.playClick();
    });
    this.elements.btnToggleAudio?.addEventListener('click', () => this.toggleAudio());
    this.elements.btnSlideGrid?.addEventListener('click', () => {
      this.openSlideGridModal();
      this.audio.playClick();
    });
    this.elements.btnShortcutsGuide?.addEventListener('click', () => {
      this.openModal(this.elements.shortcutsModal);
      this.audio.playClick();
    });
    this.elements.btnManualSync?.addEventListener('click', () => {
      this.triggerManualSync();
      this.audio.playClick();
    });
    this.elements.sheetsSyncPill?.addEventListener('click', () => {
      this.openModal(this.elements.diagnosticsModal);
      this.audio.playClick();
    });
    this.elements.btnDiagnostics?.addEventListener('click', () => {
      this.openModal(this.elements.diagnosticsModal);
      this.audio.playClick();
    });
    this.elements.btnAdminSettings?.addEventListener('click', () => {
      this.openModal(this.elements.adminModal);
      this.audio.playClick();
    });
    this.elements.btnAbout?.addEventListener('click', () => {
      this.goToPage(11);
      this.audio.playClick();
    });
    document.getElementById('sidebarAboutBtn')?.addEventListener('click', () => {
      this.goToPage(11);
      this.audio.playClick();
    });
    document.getElementById('sidebarAvatarBtn')?.addEventListener('click', () => {
      this.goToPage(11);
      this.audio.playClick();
    });
    this.elements.btnFullscreen?.addEventListener('click', () => {
      this.toggleFullscreen();
      this.audio.playClick();
    });

    // Modern Slicers Change Listeners
    const handleSlicerChange = () => {
      this.audio.playChime();
      this.renderCurrentView();
    };
    document.getElementById('pbiSlicerPeriod')?.addEventListener('change', handleSlicerChange);
    document.getElementById('pbiSlicerDivision')?.addEventListener('change', handleSlicerChange);
    document.getElementById('pbiSlicerRegion')?.addEventListener('change', handleSlicerChange);

    // Mobile Sidebar Drawer Toggle & Backdrop Handlers
    const btnMobileMenu = document.getElementById('btnMobileMenu');
    const colorfulSidebar = document.getElementById('colorfulSidebar');
    const sidebarBackdrop = document.getElementById('sidebarBackdrop');

    const closeMobileSidebar = () => {
      colorfulSidebar?.classList.remove('open');
      sidebarBackdrop?.classList.remove('active');
    };

    btnMobileMenu?.addEventListener('click', () => {
      colorfulSidebar?.classList.toggle('open');
      sidebarBackdrop?.classList.toggle('active');
      this.audio.playClick();
    });

    sidebarBackdrop?.addEventListener('click', closeMobileSidebar);

    // Sidebar Navigation Buttons
    document.querySelectorAll('.sidebar-nav-item[data-page]').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = parseInt(btn.getAttribute('data-page'), 10);
        if (p) {
          if (window.innerWidth < 992) {
            closeMobileSidebar();
          }
          this.goToPage(p);
          this.audio.playClick();
        }
      });
    });

    document.getElementById('sidebarBtnSettings')?.addEventListener('click', () => {
      this.openModal(this.elements.adminModal);
      this.audio.playClick();
    });

    document.getElementById('sidebarLiveOpsBtn')?.addEventListener('click', () => {
      this.openModal(this.elements.diagnosticsModal);
      this.audio.playClick();
    });

    // Bottom Navigation
    this.elements.pageIndexBadge?.addEventListener('click', () => {
      this.openSlideGridModal();
      this.audio.playClick();
    });
    this.elements.pageTitleLabel?.addEventListener('click', () => {
      this.openSlideGridModal();
      this.audio.playClick();
    });
    this.elements.btnPrevSlide?.addEventListener('click', () => {
      this.previousSlide();
      this.audio.playClick();
    });
    this.elements.btnNextSlide?.addEventListener('click', () => {
      this.nextSlide();
      this.audio.playClick();
    });
    this.elements.btnPlayPause?.addEventListener('click', () => {
      this.togglePlayPause();
      this.audio.playClick();
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', e => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        this.nextSlide();
        this.audio.playClick();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        this.previousSlide();
        this.audio.playClick();
      } else if (e.code === 'Space') {
        e.preventDefault();
        this.togglePlayPause();
        this.audio.playClick();
      } else if (e.key === 't' || e.key === 'T') {
        this.toggleTheme();
        this.audio.playClick();
      } else if (e.key === 'f' || e.key === 'F') {
        this.toggleFullscreen();
        this.audio.playClick();
      } else if (e.key === 'g' || e.key === 'G') {
        this.openSlideGridModal();
        this.audio.playClick();
      } else if (e.key === 'm' || e.key === 'M') {
        this.toggleAudio();
      } else if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        this.openModal(this.elements.shortcutsModal);
        this.audio.playClick();
      } else if (e.key === 'Escape') {
        this.closeAllModals();
      } else if (e.key === 'd' || e.key === 'D') {
        this.openModal(this.elements.diagnosticsModal);
        this.audio.playClick();
      } else if (e.key === 'a' || e.key === 'A') {
        this.openModal(this.elements.adminModal);
        this.audio.playClick();
      } else if (e.key === 'i' || e.key === 'I') {
        this.goToPage(11);
        this.audio.playClick();
      }
    });

    // Touch Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;
    window.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    window.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 60) {
        if (diff < 0) this.nextSlide();
        else this.previousSlide();
      }
    }, { passive: true });

    // Modals Close Buttons
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => this.closeAllModals());
    });

    // Admin Sheet URL Save
    document.getElementById('btnSaveSheetUrl')?.addEventListener('click', () => {
      const input = document.getElementById('adminSheetUrlInput');
      const durationInput = document.getElementById('adminSlideDurationInput');

      if (durationInput && durationInput.value) {
        const secs = parseInt(durationInput.value);
        if (secs >= 10 && secs <= 300) {
          this.state.panelDurationMs = secs * 1000;
          this.startPresentationEngine();
        }
      }

      const freqSelect = document.getElementById('adminSyncFreqSelect');
      if (freqSelect && freqSelect.value) {
        const secs = parseInt(freqSelect.value, 10);
        if (!isNaN(secs) && secs >= 10) {
          this.state.autoSyncIntervalMs = secs * 1000;
          this.startAutoSync();
        }
      }

      if (input && input.value.trim()) {
        GoogleSheetsAPI.spreadsheetUrl = input.value.trim();
        this.closeAllModals();
        this.triggerManualSync();
      } else {
        this.closeAllModals();
      }
    });
  },

  async startInitialSplash() {
    // 1. Kick off Google Sheets live sync immediately in parallel with splash animation
    const syncPromise = Promise.race([
      GoogleSheetsAPI.syncAllSheets().catch(err => {
        console.warn("Initial Google Sheets sync notice:", err);
        return null;
      }),
      new Promise(resolve => setTimeout(resolve, 2000))
    ]);

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('nosplash') || urlParams.has('skip')) {
      await syncPromise;
      this.finishSplash();
      return;
    }

    const steps = [
      { progress: 20, text: "Initializing Metropolitan Intelligence Engine..." },
      { progress: 45, text: "Connecting to Live Google Sheets Telemetry..." },
      { progress: 75, text: "Synchronizing CSBM Budgets & Commercial Pipeline..." },
      { progress: 100, text: "Telemetry Synchronized. Launching Cockpit..." }
    ];

    let currentStep = 0;

    const runStep = async () => {
      if (currentStep < steps.length) {
        const s = steps[currentStep];
        if (this.elements.splashProgressBar) {
          this.elements.splashProgressBar.style.width = `${s.progress}%`;
        }
        if (this.elements.splashStatusText) {
          this.elements.splashStatusText.textContent = s.text;
        }
        currentStep++;

        // At step 3 (75%), wait for Google Sheets sync to complete before proceeding
        if (currentStep === 3) {
          await syncPromise;
        }

        setTimeout(runStep, 180);
      } else {
        setTimeout(() => this.finishSplash(), 150);
      }
    };

    runStep();

    this.elements.splashSkipBtn?.addEventListener('click', async () => {
      await syncPromise;
      this.finishSplash();
    });
  },

  finishSplash() {
    if (this.elements.splashScreen && !this.elements.splashScreen.classList.contains('finished')) {
      if (window.MotionController && MotionController.isAvailable) {
        MotionController.animate(
          this.elements.splashScreen,
          { opacity: [1, 0], transform: ['scale(1)', 'scale(1.03)'], filter: ['blur(0px)', 'blur(10px)'] },
          { duration: 0.35, easing: 'ease-out' }
        ).then(() => {
          this.elements.splashScreen.classList.add('finished');
        });
      } else {
        this.elements.splashScreen.classList.add('finished');
      }
    }

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('page')) {
      const p = parseInt(urlParams.get('page'), 10);
      if (p >= 1 && p <= 11) {
        this.state.currentPageIndex = p;
        if (p === 11) this.state.isPaused = true;
      }
    }
    if (urlParams.has('panel')) {
      const pan = parseInt(urlParams.get('panel'), 10);
      if (pan >= 1 && pan <= 4) this.state.currentPanelIndex = pan;
    }
    if (urlParams.has('pause')) {
      this.state.isPaused = true;
    }

    this.updateSyncBadges();
    this.renderPaginationPills();
    this.renderCurrentView();
    this.startPresentationEngine();
    this.startAutoSync();
  },

  startPresentationEngine() {
    clearInterval(this.state.intervalId);
    const totalSteps = 600; // 100ms per step over 60,000ms
    const stepDuration = this.state.panelDurationMs / totalSteps;
    let elapsed = 0;

    this.state.intervalId = setInterval(() => {
      // If currently on Page 11 (About System & Architect), do not auto-advance
      if (this.state.currentPageIndex === 11) {
        this.resetSlideProgress();
        return;
      }

      if (!this.state.isPaused && !this.state.isUserInteracting) {
        elapsed++;
        const pct = Math.min((elapsed / totalSteps) * 100, 100);
        this.state.slideProgress = pct;
        if (this.elements.slideProgressFill) {
          this.elements.slideProgressFill.style.width = `${pct}%`;
        }

        if (elapsed >= totalSteps) {
          elapsed = 0;
          this.advanceSlide();
        }
      }
    }, stepDuration);
  },

  resetSlideProgress() {
    this.state.slideProgress = 0;
    if (this.elements.slideProgressFill) {
      this.elements.slideProgressFill.style.width = `0%`;
    }
  },

  advanceSlide() {
    // If currently on Page 11 (About Page), never auto-advance
    if (this.state.currentPageIndex === 11) {
      return;
    }

    const page = DashboardPages.getPageByIndex(this.state.currentPageIndex);
    if (this.state.currentPanelIndex < page.totalPanels) {
      this.state.currentPanelIndex++;
    } else {
      this.state.currentPanelIndex = 1;
      // Loop strictly through pages 1 to 10
      this.state.currentPageIndex = (this.state.currentPageIndex % 10) + 1;
    }
    this.resetSlideProgress();
    this.renderCurrentView(1);
  },

  nextSlide() {
    if (this.state.currentPageIndex === 11) {
      this.goToPage(1, 1);
      return;
    }
    this.advanceSlide();
  },

  previousSlide() {
    if (this.state.currentPageIndex === 11) {
      this.goToPage(10, -1);
      return;
    }
    if (this.state.currentPanelIndex > 1) {
      this.state.currentPanelIndex--;
    } else {
      this.state.currentPageIndex = this.state.currentPageIndex > 1 ? this.state.currentPageIndex - 1 : 10;
      const prevPage = DashboardPages.getPageByIndex(this.state.currentPageIndex);
      this.state.currentPanelIndex = prevPage.totalPanels;
    }
    this.resetSlideProgress();
    this.renderCurrentView(-1);
  },

  goToPage(pageNumber, customDirection = null) {
    const targetPage = Math.min(Math.max(pageNumber, 1), 11);
    const direction = customDirection !== null ? customDirection : (targetPage >= this.state.currentPageIndex ? 1 : -1);
    this.state.currentPageIndex = targetPage;
    this.state.currentPanelIndex = 1;

    // About Page (Page 11) is strictly static: auto-pause slideshow
    if (targetPage === 11) {
      this.state.isPaused = true;
    }

    this.resetSlideProgress();
    this.renderCurrentView(direction);
  },

  goToPanel(panelIndex, customDirection = null) {
    const direction = customDirection !== null ? customDirection : (panelIndex >= this.state.currentPanelIndex ? 1 : -1);
    this.state.currentPanelIndex = panelIndex;
    this.resetSlideProgress();
    this.renderCurrentView(direction);
  },

  togglePlayPause() {
    if (this.state.currentPageIndex === 11) {
      if (this.state.isPaused) {
        // User clicked Play while on Page 11: return to Page 1 and play
        this.state.isPaused = false;
        this.goToPage(1);
        return;
      } else {
        this.state.isPaused = true;
      }
    } else {
      this.state.isPaused = !this.state.isPaused;
    }
    this.updateControlsBarState();
  },

  updateControlsBarState() {
    const page = DashboardPages.getPageByIndex(this.state.currentPageIndex);

    if (this.elements.pageIndexBadge) {
      this.elements.pageIndexBadge.textContent = page.index === 11 ? 'About' : `Page ${page.index} of 10`;
    }
    if (this.elements.pageTitleLabel) {
      this.elements.pageTitleLabel.textContent = page.title;
    }
    const pageHeading = document.getElementById('pageTitleHeading');
    if (pageHeading) {
      pageHeading.textContent = page.index === 1 ? 'Dashboard' : (page.index === 11 ? 'About' : page.title);
    }
    if (this.elements.pausedBadge) {
      this.elements.pausedBadge.style.display = (this.state.isPaused || page.index === 11) ? 'flex' : 'none';
      if (page.index === 11) {
        this.elements.pausedBadge.innerHTML = `<span class="paused-dot"></span> ABOUT`;
      } else {
        this.elements.pausedBadge.innerHTML = `<span class="paused-dot"></span> PAUSED`;
      }
    }

    // Update Play/Pause button icon
    if (this.elements.btnPlayPause) {
      this.elements.btnPlayPause.innerHTML = (this.state.isPaused || page.index === 11)
        ? `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
    }

    // Update Modern Executive Floating Dock Tabs & Sidebar Items
    document.querySelectorAll('.dock-tab-item, .page-pill, .sidebar-nav-item[data-page]').forEach(pill => {
      const pIdx = parseInt(pill.getAttribute('data-page'));
      if (pIdx === this.state.currentPageIndex) {
        pill.classList.add('active');
        if (typeof pill.scrollIntoView === 'function') {
          pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      } else {
        pill.classList.remove('active');
      }
    });

    // Update Panel Dots
    if (this.elements.panelDotsContainer) {
      const dotsHtml = [];
      for (let i = 1; i <= page.totalPanels; i++) {
        const isActive = i === this.state.currentPanelIndex;
        dotsHtml.push(`<span class="panel-dot ${isActive ? 'active' : ''}" data-panel="${i}" title="Panel ${i} of ${page.totalPanels}"></span>`);
      }
      this.elements.panelDotsContainer.innerHTML = dotsHtml.join('');

      this.elements.panelDotsContainer.querySelectorAll('.panel-dot').forEach(dot => {
        dot.addEventListener('click', () => {
          const p = parseInt(dot.getAttribute('data-panel'));
          this.goToPanel(p);
        });
      });
    }
  },

  renderPaginationPills() {
    if (!this.elements.paginationPillsContainer) return;
    const pills = [];
    const tabTitles = [
      "Executive Overview",
      "Financial Performance",
      "Department Performance",
      "Sales & Revenue",
      "AMC & Estimates",
      "Technician Performance",
      "Coordinator & Leader",
      "Debtors & Outstanding",
      "Employee Recognition",
      "Management Insights"
    ];

    for (let i = 1; i <= 10; i++) {
      const title = tabTitles[i - 1] || `Page ${i}`;
      const isActive = i === this.state.currentPageIndex;
      pills.push(`
        <button class="dock-tab-item ${isActive ? 'active' : ''}" data-page="${i}" title="${title}">
          <span class="dock-tab-number">${i}</span>
          <span class="dock-tab-label">${title}</span>
        </button>
      `);
    }
    this.elements.paginationPillsContainer.innerHTML = pills.join('');

    this.elements.paginationPillsContainer.querySelectorAll('.dock-tab-item').forEach(pill => {
      pill.addEventListener('click', () => {
        const p = parseInt(pill.getAttribute('data-page'));
        if (p === this.state.currentPageIndex) return;
        const direction = p > this.state.currentPageIndex ? 1 : -1;
        this.goToPage(p, direction);
        this.audio.playClick();
      });
    });

    const activePill = this.elements.paginationPillsContainer.querySelector('.dock-tab-item.active');
    if (activePill && window.MotionController) {
      MotionController.animateTabActivation(activePill);
    }
  },

  renderCurrentView(direction = 1) {
    this.updateControlsBarState();

    if (window.MotionController && typeof window.MotionController.transitionPage === 'function') {
      window.MotionController.transitionPage(
        this.elements.viewport,
        (targetContainer) => {
          DashboardPages.renderCurrent(
            targetContainer,
            this.state.currentPageIndex,
            this.state.currentPanelIndex
          );
        },
        {
          direction: direction,
          onComplete: () => {
            this.audio.playChime();
          }
        }
      );
    } else {
      DashboardPages.renderCurrent(
        this.elements.viewport,
        this.state.currentPageIndex,
        this.state.currentPanelIndex
      );
      if (window.MotionController) {
        MotionController.animatePageEntrance(this.elements.viewport);
      }
      this.audio.playChime();
    }
  },

  animateNumbers() {
    if (window.DashboardPages && typeof window.DashboardPages.animateNumbers === 'function') {
      window.DashboardPages.animateNumbers(this.elements.viewport || document.body);
    }
  },

  toggleAudio() {
    this.state.isAudioEnabled = !this.state.isAudioEnabled;
    if (this.state.isAudioEnabled) {
      this.audio.playChime();
    }
    if (this.elements.btnToggleAudio) {
      if (this.state.isAudioEnabled) {
        this.elements.btnToggleAudio.classList.add('audio-active');
        this.elements.btnToggleAudio.innerHTML = `<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`;
        this.elements.btnToggleAudio.title = "Audio Feedback: ON (M)";
      } else {
        this.elements.btnToggleAudio.classList.remove('audio-active');
        this.elements.btnToggleAudio.innerHTML = `<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>`;
        this.elements.btnToggleAudio.title = "Audio Feedback: MUTED (M)";
      }
    }
  },

  initCursorTracking() {
    const orb = this.elements.interactiveOrb;
    window.addEventListener('pointermove', (e) => {
      if (!window.MotionController || !MotionController.isAvailable) {
        if (orb) {
          orb.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }
      }
      const card = e.target.closest('.kpi-card, .chart-card, .radial-gauge-card, .concentric-wheel-card, .leaderboard-card, .award-card, .insight-card, .global-header, .bottom-control-bar');
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }
    }, { passive: true });
  },

  openSlideGridModal() {
    this.renderSlideMatrixGrid();
    this.openModal(this.elements.slideGridModal);
  },

  renderSlideMatrixGrid() {
    if (!this.elements.slideMatrixGridContainer) return;
    const cardsHtml = DashboardPages.PAGES.map(page => {
      const isActive = page.index === this.state.currentPageIndex;
      return `
        <div class="slide-matrix-card ${isActive ? 'active' : ''}" data-page="${page.index}">
          <div class="matrix-card-num">${page.index}</div>
          <div class="matrix-card-info">
            <span class="matrix-card-title">${page.title}</span>
            <span class="matrix-card-panels">${page.totalPanels} Presentation Sub-Panels</span>
          </div>
        </div>
      `;
    }).join('');

    this.elements.slideMatrixGridContainer.innerHTML = cardsHtml;
    this.elements.slideMatrixGridContainer.querySelectorAll('.slide-matrix-card').forEach(card => {
      card.addEventListener('click', () => {
        const p = parseInt(card.getAttribute('data-page'));
        const direction = p >= this.state.currentPageIndex ? 1 : -1;
        this.closeAllModals();
        this.goToPage(p, direction);
        this.audio.playClick();
      });
    });
  },

  startAutoSync() {
    // Note: Initial live sync already completed before first render during splash screen
    // Periodic background auto-sync every 60 seconds (or configured interval)
    clearInterval(this.state.autoSyncIntervalId);
    this.state.autoSyncIntervalId = setInterval(() => {
      this.triggerManualSync(true);
    }, this.state.autoSyncIntervalMs || 60000);
  },

  async triggerManualSync(isSilent = false) {
    if (!isSilent && this.elements.btnManualSync) {
      this.elements.btnManualSync.classList.add('spinning');
    }

    try {
      const res = await GoogleSheetsAPI.syncAllSheets();
      if (res && res.successCount > 0) {
        this.updateSyncBadges();
        this.renderCurrentView();
      }
    } catch (_err) { }

    if (!isSilent && this.elements.btnManualSync) {
      this.elements.btnManualSync.classList.remove('spinning');
    }
  },

  updateSyncBadges() {
    if (this.elements.sheetsSyncPill) {
      const state = DashboardData.sheetsSyncState;
      const isGreen = state.status === "GREEN";
      this.elements.sheetsSyncPill.className = `telemetry-live-pill status-${state.status.toLowerCase()}`;
      const textEl = this.elements.sheetsSyncPill.querySelector('.live-pill-text');
      if (textEl) {
        textEl.textContent = isGreen ? 'LIVE SYNCED' : 'CACHED DATA';
      }
    }
    if (this.elements.liveClockText) {
      const d = new Date(DashboardData.sheetsSyncState.lastSuccessTimestamp || Date.now());
      const pad = n => String(n).padStart(2, '0');
      this.elements.liveClockText.textContent = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    }
  },

  openModal(modalEl) {
    this.closeAllModals();
    if (modalEl) {
      modalEl.classList.add('active');
      const card = modalEl.querySelector('.modal-card');
      if (card && window.MotionController) {
        MotionController.animateModalOpen(card);
      }
    }
  },

  closeAllModals() {
    const activeModals = document.querySelectorAll('.modal-overlay.active');
    activeModals.forEach(m => {
      const card = m.querySelector('.modal-card');
      if (card && window.MotionController) {
        MotionController.animateModalClose(card, () => {
          m.classList.remove('active');
        });
      } else {
        m.classList.remove('active');
      }
    });
  },

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => { });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => { });
      }
    }
  }
};

// Initialize Application when DOM is ready
window.App = App;
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
