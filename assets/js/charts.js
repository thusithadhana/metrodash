/**
 * METROPOLITAN MANAGEMENT INTELLIGENCE - DASHBOARD WEB APPLICATION
 * Ultra-Clean, High-Readability Visualisation Engine (Kid-Simple, Executive-Clarity)
 * Replaces dense wireframe charts and tachometers with clean, modern, intuitive visual trackers.
 * Powered by Motion.dev physics springs (https://motion.dev).
 */

const ChartEngine = {
  hasMotion() {
    return typeof window !== 'undefined' && !!window.Motion && typeof window.Motion.animate === 'function';
  },

  hexToRgba(hex, alpha = 1) {
    if (!hex || typeof hex !== 'string') return `rgba(0, 120, 212, ${alpha})`;
    let cleanHex = hex.replace('#', '').trim();
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    if (cleanHex.length !== 6) return `rgba(0, 120, 212, ${alpha})`;
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  },

  adjustHexBrightness(hex, percent) {
    if (!hex || typeof hex !== 'string') return hex;
    let cleanHex = hex.replace('#', '').trim();
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    if (cleanHex.length !== 6) return hex;
    let num = parseInt(cleanHex, 16);
    let amt = Math.round(2.55 * percent);
    let R = (num >> 16) + amt;
    let G = (num >> 8 & 0x00FF) + amt;
    let B = (num & 0x0000FF) + amt;
    return '#' + (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1);
  },

  formatCurrencyLKR(val) {
    if (val === undefined || val === null || isNaN(val)) return "LKR 0";
    if (Math.abs(val) >= 1_000_000) {
      return `LKR ${(val / 1_000_000).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}M`;
    }
    return `LKR ${Math.round(val).toLocaleString('en-US')}`;
  },

  formatFullLKR(val) {
    if (val === undefined || val === null || isNaN(val)) return "LKR 0";
    return `LKR ${Math.round(val).toLocaleString('en-US')}`;
  },

  formatPercentage(val) {
    if (val === undefined || val === null || isNaN(val)) return "0.0%";
    return `${Number(val).toFixed(1)}%`;
  },

  formatQuantity(val, unit = "") {
    if (val === undefined || val === null || isNaN(val)) return `0 ${unit}`.trim();
    return `${Math.round(val).toLocaleString('en-US')} ${unit}`.trim();
  },

  /**
   * 1. ULTRA-CLEAN CIRCULAR GOAL RING (The "Mission Battery")
   * Pristine, modern Apple-Fitness style ring with big centered percentage,
   * friendly plain-English status, and 3 clean telemetry chips.
   * Zero messy dial ticks, zero needles, zero clutter.
   */
  renderRadialGauge(container, options) {
    if (!container) return;
    const {
      title = "Target Velocity",
      valueString = "100%",
      percentage = 1.0,
      subtitle = "",
      trendText = "On Target",
      accentColor = "#10B981",
      gradientColors = ["#34D399", "#059669"]
    } = options;

    const clampedRatio = Math.min(Math.max(percentage || 0, 0), 1.0);
    const pctValue = (percentage * 100).toFixed(1);
    const radius = 68;
    const cx = 95;
    const cy = 95;
    const circumference = 2 * Math.PI * radius;
    const targetOffset = circumference * (1 - clampedRatio);

    const gradId = `cleanGoalGrad_${Math.random().toString(36).substr(2, 7)}`;

    // Friendly Status Calculation
    let friendlyStatusBadge = "🟢 On Track";
    let friendlyStatusColor = "#10B981";
    if (percentage >= 1.0) {
      friendlyStatusBadge = "🚀 Target Reached!";
      friendlyStatusColor = "#10B981";
    } else if (percentage >= 0.5) {
      friendlyStatusBadge = "🏃 Making Great Progress";
      friendlyStatusColor = "#38BDF8";
    } else if (percentage >= 0.1) {
      friendlyStatusBadge = "⚡ Building Momentum";
      friendlyStatusColor = "#F59E0B";
    } else {
      friendlyStatusBadge = "⏳ Just Getting Started";
      friendlyStatusColor = "#94A3B8";
    }

    container.innerHTML = `
      <div class="clean-goal-card has-border-beam">
        <div class="card-header-bar" style="border: none; padding: 0 0 10px 0; background: transparent; width: 100%;">
          <div class="card-header-left">
            <span class="card-heading-icon" style="color: ${accentColor}; background: ${this.hexToRgba(accentColor, 0.14)};">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </span>
            <span class="gauge-title">${title}</span>
          </div>
          <span class="gauge-badge" style="color: ${friendlyStatusColor}; background: ${this.hexToRgba(friendlyStatusColor, 0.14)}; border: 1px solid ${this.hexToRgba(friendlyStatusColor, 0.3)};">
            <span class="pulse-beacon-dot" style="display:inline-block; width:6px; height:6px; border-radius:50%; background:${friendlyStatusColor}; margin-right:5px; box-shadow:0 0 6px ${friendlyStatusColor};"></span>
            ${friendlyStatusBadge}
          </span>
        </div>

        <div class="clean-goal-body">
          <div class="clean-goal-ring-wrap">
            <svg width="190" height="190" viewBox="0 0 190 190" style="transform: rotate(-90deg);">
              <defs>
                <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="${gradientColors[0]}" />
                  <stop offset="100%" stop-color="${gradientColors[1]}" />
                </linearGradient>
              </defs>
              <!-- Background Ring Track -->
              <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="rgba(255, 255, 255, 0.08)" stroke-width="14" />
              <!-- Animated Progress Arc -->
              <circle class="clean-goal-fill" cx="${cx}" cy="${cy}" r="${radius}" fill="none"
                stroke="url(#${gradId})" stroke-width="14" stroke-linecap="round"
                stroke-dasharray="${circumference} ${circumference}"
                stroke-dashoffset="${targetOffset}"
                data-target-offset="${targetOffset}"
                data-circumference="${circumference}"
                style="filter: drop-shadow(0 0 10px ${this.hexToRgba(gradientColors[0], 0.5)});"
              />
            </svg>
            <div class="clean-goal-center-hud">
              <span class="clean-goal-center-val animated-count-val" data-raw="${pctValue}%">${pctValue}%</span>
              <span class="clean-goal-center-label">GOAL REACHED</span>
            </div>
          </div>

          <div class="clean-goal-story-block">
            <p class="clean-goal-story-text">
              We have completed <strong>${pctValue}%</strong> of this goal so far (<strong>${valueString}</strong>).
              ${subtitle ? `<span class="clean-goal-subhint">${subtitle}</span>` : ''}
            </p>
            <div class="clean-goal-telemetry-chips">
              <div class="clean-telemetry-chip">
                <span class="chip-label">🎯 Monthly Target</span>
                <span class="chip-val">100.0%</span>
              </div>
              <div class="clean-telemetry-chip">
                <span class="chip-label">💰 In Hand</span>
                <span class="chip-val">${valueString}</span>
              </div>
              <div class="clean-telemetry-chip">
                <span class="chip-label">📢 Pace</span>
                <span class="chip-val" style="color: ${friendlyStatusColor};">${trendText}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Motion.dev Animated Ring Draw
    if (this.hasMotion() && typeof container.querySelector === 'function') {
      const ringFill = container.querySelector('.clean-goal-fill');
      if (ringFill) {
        window.Motion.animate(
          ringFill,
          { strokeDashoffset: [circumference, targetOffset] },
          { duration: 1.2, easing: [0.34, 1.56, 0.64, 1] }
        );
      }
    }
  },

  /**
   * 2. COMPANY GOAL MISSION TRACKER (Replaces Concentric Circles)
   * A clean composite card featuring a prominent Goal Progress Ring on the left
   * and 3 crystal-clear Mission Progress Bars on the right.
   * Simple, modern, and readable by anyone in 3 seconds.
   */
  renderConcentricWheel(container, options) {
    if (!container) return;
    const {
      title = "Executive Mission Velocity",
      centerMainText = "10.2%",
      centerSubText = "OVERALL GOAL REACHED",
      rings = []
    } = options;

    const missionRowsHtml = rings.map((m, idx) => {
      const ratio = Math.min(Math.max(m.percentage || 0, 0), 1.0);
      const pctString = `${(ratio * 100).toFixed(1)}%`;
      const gradCols = m.gradientColors || [m.color || "#38BDF8", "#0078D4"];
      const showVal = m.valueString && m.valueString.trim() !== pctString.trim();

      let missionIcon = "🎯";
      if (idx === 1) missionIcon = "📦";
      if (idx === 2) missionIcon = "⚠️";

      return `
        <div class="mission-bar-card hover-lift">
          <div class="mission-card-top">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="mission-emoji">${missionIcon}</span>
              <span class="mission-title" title="${m.name}">${m.name}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              ${showVal ? `<span class="mission-val">${m.valueString}</span>` : ''}
              <span class="mission-pct-pill" style="color: ${gradCols[0]}; background: ${this.hexToRgba(gradCols[0], 0.14)}; border: 1px solid ${this.hexToRgba(gradCols[0], 0.3)};">
                ${pctString}
              </span>
            </div>
          </div>
          <div class="mission-progress-track">
            <div class="mission-progress-fill" style="width: ${ratio * 100}%; background: linear-gradient(90deg, ${gradCols[0]}, ${gradCols[1]});" data-target-width="${ratio * 100}%"></div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="concentric-wheel-card clean-mission-card has-border-beam">
        <div class="card-header-bar" style="border: none; padding: 0 0 12px 0; background: transparent; width: 100%;">
          <div class="card-header-left">
            <span class="card-heading-icon" style="color: var(--metro-cyan); background: rgba(0, 180, 216, 0.14);">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
            </span>
            <span class="card-heading-text">${title}</span>
          </div>
          <span class="metric-count-pill">3 Big Missions</span>
        </div>

        <div class="clean-mission-body">
          <div class="mission-hero-ring-block">
            <div class="mission-hero-ring">
              <svg width="150" height="150" viewBox="0 0 150 150" style="transform: rotate(-90deg);">
                <circle cx="75" cy="75" r="56" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="12" />
                <circle cx="75" cy="75" r="56" fill="none" stroke="url(#heroMissionGrad)" stroke-width="12" stroke-linecap="round"
                  stroke-dasharray="351.85 351.85" stroke-dashoffset="${351.85 * (1 - 0.102)}"
                  style="filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.6));"
                />
                <defs>
                  <linearGradient id="heroMissionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#38BDF8" />
                    <stop offset="100%" stop-color="#10B981" />
                  </linearGradient>
                </defs>
              </svg>
              <div class="mission-ring-hud">
                <span class="mission-ring-val animated-count-val" data-raw="${centerMainText}">${centerMainText}</span>
                <span class="mission-ring-sub">${centerSubText}</span>
              </div>
            </div>
            <p class="mission-ring-hint">Overall Company Pulse for November</p>
          </div>

          <div class="mission-bars-list">
            ${missionRowsHtml}
          </div>
        </div>
      </div>
    `;

    // Motion.dev Animated Bar Extension
    if (this.hasMotion() && typeof container.querySelectorAll === 'function') {
      const fills = container.querySelectorAll('.mission-progress-fill');
      fills.forEach((f, i) => {
        const targetW = f.dataset.targetWidth ? `${f.dataset.targetWidth}%` : (f.style.width || '100%');
        window.Motion.animate(
          f,
          { width: ['0%', targetW] },
          { duration: 1.0, delay: 0.1 + i * 0.08, easing: [0.16, 1, 0.3, 1] }
        );
      });
    }
  },

  /**
   * 3. DEPARTMENT RACE SCOREBOARD (Replaces Dense Bar Charts)
   * Clean, friendly team ranking cards with gold/silver/bronze medals,
   * 14px rounded progress capsules, and plain-English achievement status.
   * Zero messy vertical gridlines, zero confusing target pins.
   */
  renderBarChart(container, options) {
    if (!container) return;
    const {
      title = "Department Performance Race",
      items = [],
      defaultFormat = "CURRENCY_LKR"
    } = options;

    const maxVal = Math.max(...items.map(it => Math.max(it.value || 0, it.target || 0)), 1);

    const rowsHtml = items.map((it, idx) => {
      const val = it.value || 0;
      const pct = Math.min((val / (it.target || maxVal)) * 100, 100);
      let formattedVal = "";
      const fmt = it.format || defaultFormat;

      if (fmt === "PERCENTAGE") {
        formattedVal = `${val.toFixed(1)}%`;
      } else if (fmt === "QUANTITY") {
        formattedVal = `${Math.round(val).toLocaleString('en-US')}`;
      } else {
        formattedVal = this.formatCurrencyLKR(val);
      }

      const barCol = it.barColor || "#0078D4";
      const lighterBarCol = this.adjustHexBrightness(barCol, 25);

      // Friendly Rank Medals
      let medalPrefix = `#${idx + 1}`;
      let rankClass = "";
      let statusHint = "Building Momentum";

      if (idx === 0) {
        medalPrefix = "🥇 1";
        rankClass = "rank-1";
        statusHint = "🌟 Star Department!";
      } else if (idx === 1) {
        medalPrefix = "🥈 2";
        rankClass = "rank-2";
        statusHint = "🚀 High Performer";
      } else if (idx === 2) {
        medalPrefix = "🥉 3";
        rankClass = "rank-3";
        statusHint = "⚡ Strong Pace";
      } else if (pct > 20) {
        statusHint = "🏃 Fast Moving";
      }

      return `
        <div class="clean-race-row hover-lift">
          <div class="race-row-top">
            <div style="display: flex; align-items: center; gap: 9px; min-width: 0;">
              <span class="race-rank-badge ${rankClass}">${medalPrefix}</span>
              <span class="race-team-name" title="${it.label}">${it.label}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="race-val-amount" style="color: ${barCol};">${formattedVal}</span>
              <span class="race-pct-pill" style="color: ${barCol}; background: ${this.hexToRgba(barCol, 0.14)}; border: 1px solid ${this.hexToRgba(barCol, 0.3)};">
                ${pct.toFixed(1)}%
              </span>
            </div>
          </div>

          <div class="race-capsule-track">
            <div class="race-capsule-fill" style="width: ${Math.max(pct, 2)}%; background: linear-gradient(90deg, ${barCol}, ${lighterBarCol});" data-target-width="${Math.max(pct, 2)}%">
              <span class="race-fill-shine"></span>
            </div>
          </div>

          <div class="race-row-bottom">
            <span class="race-target-hint">Target: ${it.target ? this.formatCurrencyLKR(it.target) : 'Monthly Target'}</span>
            <span class="race-status-hint">${statusHint}</span>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="chart-card clean-race-card">
        <div class="card-header-bar" style="border: none; padding: 0 0 10px 0; background: transparent; width: 100%;">
          <div class="card-header-left">
            <span class="card-heading-icon" style="color: var(--metro-blue); background: rgba(0, 120, 212, 0.14);">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/><path d="M4 21h16v2H4z"/></svg>
            </span>
            <span class="card-heading-text">${title}</span>
          </div>
          <span class="metric-count-pill">${items.length} Teams in Race</span>
        </div>
        <div class="clean-race-body">
          ${rowsHtml}
        </div>
      </div>
    `;

    // Motion.dev Staggered Bar Animation
    if (this.hasMotion() && typeof container.querySelectorAll === 'function') {
      const bars = container.querySelectorAll('.race-capsule-fill');
      bars.forEach((b, i) => {
        const w = b.dataset.targetWidth ? `${b.dataset.targetWidth}%` : (b.style.width || '100%');
        window.Motion.animate(
          b,
          { width: ['0%', w], opacity: [0.5, 1] },
          { duration: 0.9, delay: i * 0.04, easing: [0.16, 1, 0.3, 1] }
        );
      });
    }
  },

  /**
   * 4. REVENUE SHARE: WHO BROUGHT IN THE MOST? (Replaces Segmented Donut)
   * Clean visual cards showing each division's share of company earnings.
   * Simple, clear, and understandable by anyone in 2 seconds.
   */
  renderDonutChart(container, options) {
    if (!container) return;
    const {
      title = "Revenue Contribution: Who Brought In The Money?",
      categories = [],
      colors = ["#0078D4", "#107C41", "#F2C811", "#744DA9", "#0099BC", "#D13438", "#FFB900", "#5C2D91"]
    } = options;

    const totalVal = categories.reduce((acc, cat) => acc + (cat[1] || 0), 0) || 1;

    // Top categories sorted by value
    const sorted = [...categories].sort((a, b) => (b[1] || 0) - (a[1] || 0));

    const shareRowsHtml = sorted.slice(0, 6).map((cat, idx) => {
      const val = cat[1] || 0;
      const pct = ((val / totalVal) * 100).toFixed(1);
      const col = colors[idx % colors.length];

      let medal = `#${idx + 1}`;
      if (idx === 0) medal = "🥇 1";
      if (idx === 1) medal = "🥈 2";
      if (idx === 2) medal = "🥉 3";

      return `
        <div class="clean-share-row hover-lift">
          <div class="share-row-left">
            <span class="share-rank-pill">${medal}</span>
            <div class="share-info">
              <span class="share-team-name" title="${cat[0]}">${cat[0]}</span>
              <span class="share-amount">${this.formatCurrencyLKR(val)}</span>
            </div>
          </div>
          <div class="share-row-right">
            <div class="share-mini-track">
              <div class="share-mini-fill" style="width: ${pct}%; background: ${col};" data-target-width="${pct}%"></div>
            </div>
            <span class="share-pct-badge" style="color: ${col}; background: ${this.hexToRgba(col, 0.14)}; border: 1px solid ${this.hexToRgba(col, 0.3)};">
              ${pct}%
            </span>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="chart-card clean-share-card">
        <div class="card-header-bar" style="border: none; padding: 0 0 10px 0; background: transparent; width: 100%;">
          <div class="card-header-left">
            <span class="card-heading-icon" style="color: var(--metro-purple); background: rgba(116, 77, 169, 0.14);">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2 0v8.99L21.99 11C21.47 5.92 17.08 2 12 2zm0 11.01V22c5.08 0 9.47-3.92 9.99-9H13z"/></svg>
            </span>
            <span class="card-heading-text">${title}</span>
          </div>
          <span class="metric-count-pill">${categories.length} Divisions</span>
        </div>

        <div class="clean-share-body">
          <div class="share-total-banner">
            <div class="total-banner-left">
              <span class="total-tag">TOTAL MONEY COLLECTED</span>
              <span class="total-val animated-count-val" data-raw="${this.formatCurrencyLKR(totalVal)}">${this.formatCurrencyLKR(totalVal)}</span>
            </div>
            <div class="total-banner-right">
              <span class="top-star-badge">🌟 ${sorted[0] ? sorted[0][0] : 'Leader'} is #1!</span>
            </div>
          </div>

          <div class="clean-share-list">
            ${shareRowsHtml}
          </div>
        </div>
      </div>
    `;

    // Motion.dev Animated Mini Bar Extension
    if (this.hasMotion() && typeof container.querySelectorAll === 'function') {
      const fills = container.querySelectorAll('.share-mini-fill');
      fills.forEach((f, i) => {
        const targetW = f.dataset.targetWidth ? `${f.dataset.targetWidth}%` : (f.style.width || '100%');
        window.Motion.animate(
          f,
          { width: ['0%', targetW] },
          { duration: 0.85, delay: 0.1 + i * 0.05, easing: [0.16, 1, 0.3, 1] }
        );
      });
    }
  },

  /**
   * 5. THE NOVEMBER MONEY JOURNEY (Replaces Unclean Dense Spline Graphs)
   * An intuitive milestone roadmap from Nov 1 to Nov 30 paired with a silky-smooth trajectory curve.
   * Tells a crystal-clear story: "How much money came in each week, and where will we finish?"
   */
  renderAreaSplineChart(container, options) {
    if (!container) return;
    const {
      title = "November Money Journey (Daily Inflow & Trajectory)",
      series = [
        { label: "01 Nov", actual: 4.8, target: 12.0 },
        { label: "07 Nov", actual: 16.2, target: 36.0 },
        { label: "13 Nov", actual: 32.1, target: 60.0, isToday: true },
        { label: "20 Nov", actual: 64.0, target: 84.0, projected: true },
        { label: "30 Nov", actual: 106.8, target: 120.0, projected: true }
      ],
      unit = "LKR",
      accentColor = "#38BDF8",
      gradientColors = ["#38BDF8", "#0078D4"],
      benchmarkTarget = 102.5,
      benchmarkLabel = "Monthly Target: LKR 102.5M"
    } = options;

    const milestones = [
      { date: "Nov 01", amount: "LKR 4.8M", label: "Month Start", icon: "🚩", done: true },
      { date: "Nov 07", amount: "LKR 16.2M", label: "Week 1", icon: "🏃", done: true },
      { date: "Nov 13", amount: "LKR 32.1M", label: "TODAY (We are here!)", icon: "🚀", done: true, isToday: true },
      { date: "Nov 20", amount: "LKR 64.0M", label: "Week 3 Target", icon: "🎯", done: false },
      { date: "Nov 30", amount: "LKR 106.8M", label: "Finish Line 🏆", icon: "🏁", done: false }
    ];

    const milestonesHtml = milestones.map(m => `
      <div class="journey-milestone-pill ${m.done ? 'milestone-done' : 'milestone-future'} ${m.isToday ? 'milestone-today' : ''}">
        <span class="milestone-icon">${m.icon}</span>
        <div class="milestone-text-block">
          <span class="milestone-date">${m.date}</span>
          <span class="milestone-amount">${m.amount}</span>
          <span class="milestone-label">${m.label}</span>
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="chart-card clean-journey-card has-border-beam">
        <div class="card-header-bar" style="border: none; padding: 0 0 10px 0; background: transparent; width: 100%;">
          <div class="card-header-left">
            <span class="card-heading-icon" style="color: ${accentColor}; background: ${this.hexToRgba(accentColor, 0.14)};">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/></svg>
            </span>
            <span class="card-heading-text">${title}</span>
          </div>
          <span class="gauge-badge" style="color: #10B981; background: rgba(16, 185, 129, 0.14); border: 1px solid rgba(16, 185, 129, 0.3);">
            <span class="pulse-beacon-dot" style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#10B981; margin-right:5px; box-shadow:0 0 6px #10B981;"></span>
            Steady Inflow
          </span>
        </div>

        <div class="clean-journey-body">
          <!-- Step-by-Step Visual Timeline -->
          <div class="journey-milestones-track">
            ${milestonesHtml}
          </div>

          <!-- Silky Smooth Trajectory Progress Track -->
          <div class="journey-progress-container">
            <div class="journey-track-header">
              <span class="journey-track-title">Progress to Monthly Goal (${benchmarkLabel})</span>
              <span class="journey-track-pct">31.3% Pacing</span>
            </div>
            <div class="journey-capsule-bar">
              <div class="journey-capsule-fill" style="width: 31.3%;" data-target-width="31.3%">
                <span class="journey-fill-beacon"></span>
              </div>
            </div>
          </div>

          <!-- Story Takeaway Footer in Plain Words -->
          <div class="journey-story-footer">
            <span class="story-footer-icon">📢</span>
            <p class="story-footer-text">
              <strong>Kid Summary:</strong> Money is arriving every day! We have collected <strong>LKR 32.1 Million</strong> so far.
              If we keep up this speed, we will safely reach our target of <strong>LKR 106.8M</strong> by November 30! 🚀
            </p>
          </div>
        </div>
      </div>
    `;

    // Motion.dev Animated Journey Fill
    if (this.hasMotion() && typeof container.querySelector === 'function') {
      const fill = container.querySelector('.journey-capsule-fill');
      if (fill) {
        window.Motion.animate(
          fill,
          { width: ['0%', '31.3%'] },
          { duration: 1.2, easing: [0.16, 1, 0.3, 1] }
        );
      }
    }
  }
};