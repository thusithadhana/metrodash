/**
 * METROPOLITAN MANAGEMENT INTELLIGENCE - DASHBOARD WEB APPLICATION
 * Professional Corporate Colorful Visualisation Engine
 * Faithful implementation of the high-contrast Purple/Magenta/Pink dashboard design
 * Zero pulsating dots, clean professional vectors, high-precision geometry.
 */

const ChartEngine = {
  hasMotion() {
    return typeof window !== 'undefined' && !!window.Motion && typeof window.Motion.animate === 'function';
  },

  hexToRgba(hex, alpha = 1) {
    if (!hex || typeof hex !== 'string') return `rgba(88, 24, 69, ${alpha})`;
    let cleanHex = hex.replace('#', '').trim();
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    if (cleanHex.length !== 6) return `rgba(88, 24, 69, ${alpha})`;
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
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
   * 1. HORIZONTAL ROUNDED GRADIENT CAPSULE BARS (Matching Top-Center of reference)
   * 4 horizontal rounded progress bars with purple-to-pink gradient and grey track.
   */
  renderHorizontalCapsuleBars(container, options = {}) {
    if (!container) return;
    const {
      title = "Revenue by Division",
      items = [
        { label: "2016", value: 55, maxValue: 100 },
        { label: "2017", value: 20, maxValue: 100 },
        { label: "2018", value: 78, maxValue: 100 },
        { label: "2019", value: 68, maxValue: 100 }
      ]
    } = options;

    const rowsHtml = items.map((it, idx) => {
      const pct = Math.min(Math.max((it.value / (it.maxValue || 100)) * 100, 0), 100);
      return `
        <div class="h-capsule-row">
          <span class="h-capsule-label">${it.label}</span>
          <div class="h-capsule-track">
            <div class="h-capsule-fill" style="width: ${pct}%;" data-target-width="${pct}%"></div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="card-inner-box">
        <h3 class="card-main-title text-purple">${title}</h3>
        <div class="h-capsules-container">
          ${rowsHtml}
        </div>
      </div>
    `;

    // Motion.dev Animated Bar Expansion
    if (this.hasMotion() && typeof container.querySelectorAll === 'function') {
      const fills = container.querySelectorAll('.h-capsule-fill');
      fills.forEach((f, i) => {
        window.Motion.animate(
          f,
          { opacity: [0.4, 1] },
          { duration: 0.5, easing: [0.16, 1, 0.3, 1] }
        );
      });
    }
  },

  /**
   * 2. MINIMALIST CIRCULAR DONUT (Matching Middle-Left of reference)
   * Clean circular donut with purple-to-pink gradient arc, grey remainder, and bold "80%" in center.
   */
  renderMinimalDonut(container, options = {}) {
    if (!container) return;
    const {
      title = "Target Completion",
      percentage = 80
    } = options;

    const radius = 60;
    const cx = 80;
    const cy = 80;
    const circumference = 2 * Math.PI * radius;
    const clampedPct = Math.min(Math.max(percentage, 0), 100);
    const arcLength = (clampedPct / 100) * circumference;
    const strokeDasharray = `${arcLength} ${circumference - arcLength}`;

    const gradId = `donutGrad_${Math.random().toString(36).substr(2, 7)}`;

    container.innerHTML = `
      <div class="card-inner-box text-center">
        <h3 class="card-main-title text-pink">${title}</h3>
        <div class="donut-svg-wrap">
          <svg width="160" height="160" viewBox="0 0 160 160" style="transform: rotate(-90deg);">
            <defs>
              <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#818CF8" />
                <stop offset="100%" stop-color="#C084FC" />
              </linearGradient>
            </defs>
            <!-- Remainder Grey Track -->
            <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="#E8ECF1" stroke-width="20" />
            <!-- Active Gradient Arc -->
            <circle class="donut-active-arc" cx="${cx}" cy="${cy}" r="${radius}" fill="none"
              stroke="url(#${gradId})" stroke-width="20"
              stroke-dasharray="${circumference} ${circumference}"
              stroke-dashoffset="${circumference - arcLength}"
              data-target-offset="${circumference - arcLength}"
              data-circumference="${circumference}"
            />
          </svg>
          <div class="donut-center-readout">
            <span class="donut-center-num">${clampedPct.toFixed(0)}%</span>
          </div>
        </div>
      </div>
    `;

    // Motion.dev Animated Arc Draw
    if (this.hasMotion() && typeof container.querySelector === 'function') {
      const arc = container.querySelector('.donut-active-arc');
      if (arc) {
        window.Motion.animate(
          arc,
          { strokeDashoffset: [circumference, circumference - arcLength] },
          { duration: 1.1, easing: [0.16, 1, 0.3, 1] }
        );
      }
    }
  },

  /**
   * 3. VERTICAL ROUNDED COLUMN BARS (Matching Middle-Center of reference)
   * 4 vertical rounded column bars with Y-axis (0, 10, 20, 30, 40, 50).
   */
  renderVerticalColumnBars(container, options = {}) {
    if (!container) return;
    const {
      title = "Weekly Volume",
      bars = [22, 38, 30, 48],
      maxY = 50
    } = options;

    const w = 240;
    const h = 130;
    const padLeft = 28;
    const padBottom = 16;
    const padTop = 10;
    const plotH = h - padTop - padBottom;
    const plotW = w - padLeft - 10;

    const gradId = `colBarGrad_${Math.random().toString(36).substr(2, 7)}`;

    // Y Axis labels
    const ySteps = [0, 10, 20, 30, 40, 50];
    const yLinesHtml = ySteps.map(yVal => {
      const yPos = padTop + plotH - (yVal / maxY) * plotH;
      return `
        <line x1="${padLeft}" y1="${yPos}" x2="${w}" y2="${yPos}" stroke="#E8ECF1" stroke-width="1" />
        <text x="${padLeft - 6}" y="${yPos + 3.5}" text-anchor="end" font-size="8.5" fill="#8C9BAE" font-family="var(--font-body)">${yVal}</text>
      `;
    }).join('');

    // Bars
    const barW = 20;
    const barSpacing = plotW / (bars.length + 1);
    const barsHtml = bars.map((val, idx) => {
      const barH = (val / maxY) * plotH;
      const xPos = padLeft + (idx + 1) * barSpacing - barW / 2;
      const yPos = padTop + plotH - barH;
      return `
        <rect class="vert-col-rect" x="${xPos}" y="${yPos}" width="${barW}" height="${barH}" rx="4"
          fill="url(#${gradId})" />
      `;
    }).join('');

    container.innerHTML = `
      <div class="card-inner-box">
        <h3 class="card-main-title text-pink">${title}</h3>
        <div class="col-bars-svg-wrap">
          <svg width="100%" height="130" viewBox="0 0 ${w} ${h}">
            <defs>
              <linearGradient id="${gradId}" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#818CF8" />
                <stop offset="100%" stop-color="#C084FC" />
              </linearGradient>
            </defs>
            <!-- Y-Axis Spine -->
            <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${padTop + plotH}" stroke="#8C9BAE" stroke-width="1.2" />
            <!-- Baseline -->
            <line x1="${padLeft}" y1="${padTop + plotH}" x2="${w}" y2="${padTop + plotH}" stroke="#8C9BAE" stroke-width="1" />
            <!-- Gridlines & Labels -->
            ${yLinesHtml}
            <!-- Vertical Bars -->
            ${barsHtml}
          </svg>
        </div>
      </div>
    `;

    // Motion.dev Animated Column Rise
    if (this.hasMotion() && typeof container.querySelectorAll === 'function') {
      const rects = container.querySelectorAll('.vert-col-rect');
      rects.forEach((r, i) => {
        window.Motion.animate(
          r,
          { opacity: [0, 1] },
          { duration: 0.8, delay: i * 0.08, easing: [0.16, 1, 0.3, 1] }
        );
      });
    }
  },

  /**
   * 4. DOUBLE SMOOTH WAVE AREA CHART (Matching Bottom-Center of reference)
   * Two overlapping silky smooth Bézier curves with translucent purple and pink gradient fills.
   */
  renderSmoothWaveAreaChart(container, options = {}) {
    if (!container) return;
    const {
      title = "Inflow vs Debt Trajectory",
      series1 = [10, 48, 42, 14, 25, 12], // Pink wave
      series2 = [14, 28, 35, 45, 18, 16], // Purple wave
      maxY = 50
    } = options;

    const w = 480;
    const h = 140;
    const padLeft = 32;
    const padBottom = 20;
    const padTop = 10;
    const plotW = w - padLeft - 10;
    const plotH = h - padTop - padBottom;

    // Helper to generate smooth Bézier path
    const getCurveD = (data) => {
      const coords = data.map((val, idx) => ({
        x: padLeft + (idx / (data.length - 1)) * plotW,
        y: padTop + plotH - (val / maxY) * plotH
      }));

      let d = `M ${coords[0].x} ${coords[0].y}`;
      for (let i = 0; i < coords.length - 1; i++) {
        const c1 = coords[i];
        const c2 = coords[i + 1];
        const mx = (c1.x + c2.x) / 2;
        d += ` C ${mx} ${c1.y}, ${mx} ${c2.y}, ${c2.x} ${c2.y}`;
      }
      const last = coords[coords.length - 1];
      const areaD = `${d} L ${last.x} ${padTop + plotH} L ${coords[0].x} ${padTop + plotH} Z`;
      return { lineD: d, areaD };
    };

    const s1 = getCurveD(series1);
    const s2 = getCurveD(series2);

    // Y Axis labels
    const ySteps = [0, 10, 20, 30, 40, 50];
    const yLinesHtml = ySteps.map(yVal => {
      const yPos = padTop + plotH - (yVal / maxY) * plotH;
      return `
        <line x1="${padLeft}" y1="${yPos}" x2="${w}" y2="${yPos}" stroke="#E8ECF1" stroke-width="1" />
        <text x="${padLeft - 6}" y="${yPos + 3.5}" text-anchor="end" font-size="8.5" fill="#8C9BAE" font-family="var(--font-body)">${yVal}</text>
      `;
    }).join('');

    const gradPinkId = `wavePinkGrad_${Math.random().toString(36).substr(2, 7)}`;
    const gradPurpleId = `wavePurpleGrad_${Math.random().toString(36).substr(2, 7)}`;

    container.innerHTML = `
      <div class="card-inner-box">
        <h3 class="card-main-title text-pink">${title}</h3>
        <div class="waves-svg-wrap">
          <svg width="100%" height="140" viewBox="0 0 ${w} ${h}">
            <defs>
              <linearGradient id="${gradPinkId}" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#FB7185" stop-opacity="0.6" />
                <stop offset="100%" stop-color="#FB7185" stop-opacity="0.05" />
              </linearGradient>
              <linearGradient id="${gradPurpleId}" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#818CF8" stop-opacity="0.6" />
                <stop offset="100%" stop-color="#818CF8" stop-opacity="0.05" />
              </linearGradient>
            </defs>
            <!-- Y-Axis Spine -->
            <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${padTop + plotH}" stroke="#8C9BAE" stroke-width="1.2" />
            <!-- Baseline -->
            <line x1="${padLeft}" y1="${padTop + plotH}" x2="${w}" y2="${padTop + plotH}" stroke="#8C9BAE" stroke-width="1" />
            <!-- Gridlines & Labels -->
            ${yLinesHtml}
            <!-- Wave 2 (Purple Back) -->
            <path class="smooth-wave-path" d="${s2.areaD}" fill="url(#${gradPurpleId})" />
            <!-- Wave 1 (Pink Front) -->
            <path class="smooth-wave-path" d="${s1.areaD}" fill="url(#${gradPinkId})" />
          </svg>
        </div>
      </div>
    `;

    // Motion.dev Animated Wave Fade-In
    if (this.hasMotion() && typeof container.querySelectorAll === 'function') {
      const paths = container.querySelectorAll('.smooth-wave-path');
      paths.forEach((p, i) => {
        window.Motion.animate(
          p,
          { opacity: [0, 1] },
          { duration: 0.9, delay: i * 0.1, easing: [0.16, 1, 0.3, 1] }
        );
      });
    }
  },

  /**
   * 5. ANGULAR LINE CHART (Matching Top-Right of reference)
   * Sharp multi-point line chart with gradient stroke, X-axis dates, and descriptive text.
   */
  renderAngularLineChart(container, options = {}) {
    if (!container) return;
    const {
      title = "Turnover Trajectory",
      points = [
        { value: 30 }, { value: 48 }, { value: 24 }, { value: 44 },
        { value: 20 }, { value: 55 }, { value: 32 }, { value: 48 },
        { value: 22 }, { value: 40 }, { value: 50 }
      ],
      years = ["2015", "2016", "2017", "2018", "2019"],
      description = "Commercial run-rate is pacing steadily toward target milestones with solid mid-cycle conversion across provincial client sectors."
    } = options;

    const w = 260;
    const h = 110;
    const padLeft = 14;
    const padRight = 14;
    const padTop = 10;
    const padBottom = 22;
    const plotW = w - padLeft - padRight;
    const plotH = h - padTop - padBottom;
    const maxV = 60;
    const minV = 15;

    const coords = points.map((p, idx) => ({
      x: padLeft + (idx / (points.length - 1)) * plotW,
      y: padTop + plotH - ((p.value - minV) / (maxV - minV)) * plotH
    }));

    const pathD = coords.reduce((acc, c, idx) => `${acc} ${idx === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`, '');

    const xLabelsHtml = years.map((yr, idx) => {
      const xPos = padLeft + (idx / (years.length - 1)) * plotW;
      return `
        <text x="${xPos.toFixed(1)}" y="${h - 4}" text-anchor="middle" font-size="8.5" fill="#8C9BAE" font-family="var(--font-body)">${yr}</text>
      `;
    }).join('');

    const gradId = `lineGrad_${Math.random().toString(36).substr(2, 7)}`;

    container.innerHTML = `
      <div class="card-inner-box">
        <h3 class="card-main-title text-pink">${title}</h3>
        <div class="angular-line-wrap">
          <svg width="100%" height="110" viewBox="0 0 ${w} ${h}">
            <defs>
              <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#818CF8" />
                <stop offset="100%" stop-color="#38BDF8" />
              </linearGradient>
            </defs>
            <!-- Angular Line -->
            <path class="angular-line-stroke" d="${pathD}" fill="none" stroke="url(#${gradId})" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
            <!-- X-Axis Labels -->
            ${xLabelsHtml}
          </svg>
        </div>
        <p class="card-description-text text-pink">${description}</p>
      </div>
    `;

    // Motion.dev Animated Stroke Draw
    if (this.hasMotion() && typeof container.querySelector === 'function') {
      const stroke = container.querySelector('.angular-line-stroke');
      if (stroke) {
        window.Motion.animate(
          stroke,
          { opacity: [0, 1] },
          { duration: 0.9, easing: [0.16, 1, 0.3, 1] }
        );
      }
    }
  },

  /**
   * 6. SLENDER PILL BARS (Matching Bottom-Right of reference)
   * Tall slender vertical rounded pill bars with Y-axis (0, 10, 20, 30, 40, 50, 60, 70, 80).
   */
  renderSlenderPillBars(container, options = {}) {
    if (!container) return;
    const {
      bars = [28, 60, 42, 24, 55, 48, 12, 70],
      maxY = 80
    } = options;

    const w = 260;
    const h = 170;
    const padLeft = 28;
    const padBottom = 16;
    const padTop = 10;
    const plotH = h - padTop - padBottom;
    const plotW = w - padLeft - 10;

    const gradId = `slenderGrad_${Math.random().toString(36).substr(2, 7)}`;

    // Y Axis labels (0 to 80, step 10)
    const ySteps = [0, 10, 20, 30, 40, 50, 60, 70, 80];
    const yLinesHtml = ySteps.map(yVal => {
      const yPos = padTop + plotH - (yVal / maxY) * plotH;
      return `
        <line x1="${padLeft}" y1="${yPos}" x2="${w}" y2="${yPos}" stroke="#E8ECF1" stroke-width="1" />
        <text x="${padLeft - 6}" y="${yPos + 3.5}" text-anchor="end" font-size="8" fill="#8C9BAE" font-family="var(--font-body)">${yVal}</text>
      `;
    }).join('');

    // Slender Bars
    const barW = 10;
    const barSpacing = plotW / (bars.length + 1);
    const barsHtml = bars.map((val, idx) => {
      const barH = (val / maxY) * plotH;
      const xPos = padLeft + (idx + 1) * barSpacing - barW / 2;
      const yPos = padTop + plotH - barH;
      return `
        <rect class="slender-bar-rect" x="${xPos}" y="${yPos}" width="${barW}" height="${barH}" rx="5"
          fill="url(#${gradId})" />
      `;
    }).join('');

    container.innerHTML = `
      <div class="card-inner-box">
        <div class="slender-bars-svg-wrap">
          <svg width="100%" height="170" viewBox="0 0 ${w} ${h}">
            <defs>
              <linearGradient id="${gradId}" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#818CF8" />
                <stop offset="100%" stop-color="#C084FC" />
              </linearGradient>
            </defs>
            <!-- Y-Axis Spine -->
            <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${padTop + plotH}" stroke="#8C9BAE" stroke-width="1.2" />
            <!-- Baseline -->
            <line x1="${padLeft}" y1="${padTop + plotH}" x2="${w}" y2="${padTop + plotH}" stroke="#8C9BAE" stroke-width="1" />
            <!-- Gridlines & Labels -->
            ${yLinesHtml}
            <!-- Slender Bars -->
            ${barsHtml}
          </svg>
        </div>
      </div>
    `;

    // Motion.dev Animated Column Rise
    if (this.hasMotion() && typeof container.querySelectorAll === 'function') {
      const rects = container.querySelectorAll('.slender-bar-rect');
      rects.forEach((r, i) => {
        window.Motion.animate(
          r,
          { opacity: [0, 1] },
          { duration: 0.85, delay: i * 0.05, easing: [0.16, 1, 0.3, 1] }
        );
      });
    }
  },

  /**
   * 7. TRI-COLOR MODERN ANALYTICS DONUT (Matching Right Card of reference)
   * 3 colorful segments: Purple (#6C5CE7), Sunny Yellow (#FDCB6E), Coral Red (#FF6B6B)
   */
  renderTriColorDonut(container, options = {}) {
    if (!container) return;
    const {
      title = "Analytics",
      percentage = 80,
      sublabel = "Transactions",
      segments = [
        { pct: 52, color: "#6C5CE7", label: "Sale" },
        { pct: 28, color: "#FDCB6E", label: "Distribute" },
        { pct: 20, color: "#FF6B6B", label: "Return" }
      ]
    } = options;

    const r = 58;
    const circ = 2 * Math.PI * r; // ~364.42
    let currentOffset = 0;

    const arcsHtml = segments.map((seg, idx) => {
      const strokeLen = (seg.pct / 100) * circ;
      const strokeGap = circ - strokeLen;
      const dashOffset = -currentOffset;
      currentOffset += strokeLen;
      return `
        <circle class="tricolor-donut-arc tricolor-arc-${idx} interactive-donut-slice"
          cx="80" cy="80" r="${r}"
          fill="none"
          stroke="${seg.color}"
          stroke-width="16"
          stroke-dasharray="${strokeLen.toFixed(1)} ${strokeGap.toFixed(1)}"
          stroke-dashoffset="${dashOffset.toFixed(1)}"
          stroke-linecap="round"
          data-label="${seg.label}"
          data-pct="${seg.pct}"
          data-color="${seg.color}"
          role="button"
          tabindex="0"
          aria-label="${seg.label}: ${seg.pct}%"
        />
      `;
    }).join('');

    const legendHtml = segments.map((seg, idx) => `
      <div class="tricolor-legend-item" data-seg-idx="${idx}" role="button" tabindex="0">
        <span class="tricolor-legend-dot" style="background: ${seg.color};"></span>
        <span class="tricolor-legend-label">${seg.label}</span>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="card-inner-box">
        <div class="card-header-row">
          <h3 class="card-main-title text-slate">${title}</h3>
          <button class="card-options-btn" title="Options">
            <svg viewBox="0 0 24 24"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
          </button>
        </div>
        <div class="tricolor-donut-wrap">
          <svg width="160" height="160" viewBox="0 0 160 160" style="transform: rotate(-90deg);">
            <circle cx="80" cy="80" r="${r}" fill="none" stroke="rgba(226, 232, 240, 0.45)" stroke-width="16" />
            ${arcsHtml}
          </svg>
          <div class="tricolor-center-readout">
            <span class="tricolor-center-num animated-count-val" data-raw="${percentage}%">${percentage}%</span>
            <span class="tricolor-center-sub">${sublabel}</span>
          </div>
        </div>
        <div class="tricolor-legend-cluster">
          ${legendHtml}
        </div>
      </div>
    `;

    // Interactive Donut Slice & Legend Events
    const arcEls = container.querySelectorAll('.interactive-donut-slice');
    const legendEls = container.querySelectorAll('.tricolor-legend-item');
    const readoutNum = container.querySelector('.tricolor-center-num');
    const readoutSub = container.querySelector('.tricolor-center-sub');

    const updateReadout = (label, pct) => {
      if (readoutNum) readoutNum.textContent = `${pct}%`;
      if (readoutSub) readoutSub.textContent = label;
    };

    const resetReadout = () => {
      if (readoutNum) readoutNum.textContent = `${percentage}%`;
      if (readoutSub) readoutSub.textContent = sublabel;
    };

    arcEls.forEach((arc, i) => {
      const seg = segments[i];
      if (!seg) return;
      arc.addEventListener('mouseenter', () => updateReadout(seg.label, seg.pct));
      arc.addEventListener('mouseleave', resetReadout);
      arc.addEventListener('click', () => {
        if (window.DashboardPages && typeof DashboardPages.openRecordInspector === 'function') {
          DashboardPages.openRecordInspector({
            title: `${title} • ${seg.label}`,
            subtitle: `Operational Segment Share: ${seg.pct}% of Total Activity`,
            fields: [
              { label: "Segment Name", val: seg.label },
              { label: "Volume Share", val: `${seg.pct}%` },
              { label: "Aggregate Indicator", val: `${percentage}% ${sublabel}` },
              { label: "Status", val: "Operational & Monitored" }
            ],
            narrative: `In Metropolitan Group operations, '${seg.label}' contributes ${seg.pct}% toward overall ${title} attainment.`
          });
        }
      });
    });

    legendEls.forEach((leg, i) => {
      const seg = segments[i];
      if (!seg) return;
      leg.addEventListener('mouseenter', () => updateReadout(seg.label, seg.pct));
      leg.addEventListener('mouseleave', resetReadout);
      leg.addEventListener('click', () => {
        if (window.DashboardPages && typeof DashboardPages.openRecordInspector === 'function') {
          DashboardPages.openRecordInspector({
            title: `${title} • ${seg.label}`,
            subtitle: `Operational Segment Share: ${seg.pct}% of Total Activity`,
            fields: [
              { label: "Segment Name", val: seg.label },
              { label: "Volume Share", val: `${seg.pct}%` },
              { label: "Aggregate Indicator", val: `${percentage}% ${sublabel}` },
              { label: "Status", val: "Operational & Monitored" }
            ],
            narrative: `In Metropolitan Group operations, '${seg.label}' contributes ${seg.pct}% toward overall ${title} attainment.`
          });
        }
      });
    });

    if (this.hasMotion() && typeof container.querySelectorAll === 'function') {
      const arcs = container.querySelectorAll('.tricolor-donut-arc');
      arcs.forEach((a, i) => {
        window.Motion.animate(
          a,
          { opacity: [0, 1] },
          { duration: 0.8, delay: i * 0.1, easing: [0.16, 1, 0.3, 1] }
        );
      });
    }
  },

  /**
   * 8. DUAL SMOOTH WAVE EARNINGS & METRICS CHART (Matching Left Card of reference)
   * Purple (#6C5CE7) & Orange (#FFA502) waves, time slicers, highlight metric, mini stats.
   */
  renderDualWaveEarningsChart(container, options = {}) {
    if (!container) return;
    const {
      title = "Executive Overview",
      subtitle = "Overview of latest Month • Metropolitan Operations",
      mainValue = "LKR 67.5M",
      subMetric = "82 Current Month Contracts Closed",
      btnText = "Corporate Revenue Summary",
      legend1 = "Realized Inflow",
      legend2 = "Target Pace",
      seriesPurple = [12, 19, 14, 21, 16, 28, 17],
      seriesOrange = [10, 14, 12, 18, 15, 20, 23],
      categories = ["Jan", "Feb", "Feb", "Mar", "Apr", "May"],
      miniStats = [
        { label: "Performing Book", value: "LKR 451.8M", color: "#FF6B6B", icon: "wallet" },
        { label: "AMC Renewals", value: "LKR 125.4M", color: "#6C5CE7", icon: "share" },
        { label: "Workshop Estimates", value: "LKR 225.2M", color: "#5E35B1", icon: "tag" },
        { label: "Realized Inflow", value: "LKR 67.5M", color: "#00CEC9", icon: "trending" }
      ]
    } = options;

    const w = 540;
    const h = 180;
    const padLeft = 32;
    const padRight = 20;
    const padTop = 15;
    const padBottom = 28;
    const plotW = w - padLeft - padRight;
    const plotH = h - padTop - padBottom;
    const maxY = Math.max(...seriesPurple, ...seriesOrange, 30);

    const getX = (idx, total) => padLeft + (idx / (total - 1)) * plotW;
    const getY = (val) => padTop + plotH - (Math.min(Math.max(val, 0), maxY) / maxY) * plotH;

    const ptsPurple = seriesPurple.map((v, i) => ({ x: getX(i, seriesPurple.length), y: getY(v) }));
    const ptsOrange = seriesOrange.map((v, i) => ({ x: getX(i, seriesOrange.length), y: getY(v) }));

    const buildSmoothPath = (pts) => {
      if (pts.length === 0) return "";
      let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const curr = pts[i];
        const next = pts[i + 1];
        const cpx1 = curr.x + (next.x - curr.x) * 0.45;
        const cpy1 = curr.y;
        const cpx2 = curr.x + (next.x - curr.x) * 0.55;
        const cpy2 = next.y;
        d += ` C ${cpx1.toFixed(1)},${cpy1.toFixed(1)} ${cpx2.toFixed(1)},${cpy2.toFixed(1)} ${next.x.toFixed(1)},${next.y.toFixed(1)}`;
      }
      return d;
    };

    const pathPurple = buildSmoothPath(ptsPurple);
    const pathOrange = buildSmoothPath(ptsOrange);
    const baseY = (padTop + plotH).toFixed(1);
    const firstX = ptsPurple[0].x.toFixed(1);
    const lastX = ptsPurple[ptsPurple.length - 1].x.toFixed(1);

    const areaPurple = `${pathPurple} L ${lastX},${baseY} L ${firstX},${baseY} Z`;
    const areaOrange = `${pathOrange} L ${lastX},${baseY} L ${firstX},${baseY} Z`;

    // Horizontal grid lines
    const yGridTicks = [5, 10, 15, 20, 25, 30];
    const gridLinesHtml = yGridTicks.map(t => {
      const y = getY(t).toFixed(1);
      return `
        <text x="${padLeft - 6}" y="${parseFloat(y) + 3.5}" text-anchor="end" fill="#8C9BAE" font-size="9" font-weight="600" font-family="'Outfit', sans-serif">${String(t).padStart(2, '0')}</text>
        <line x1="${padLeft}" y1="${y}" x2="${w - padRight}" y2="${y}" stroke="rgba(226, 232, 240, 0.65)" stroke-width="1" stroke-dasharray="3 3" />
      `;
    }).join('');

    const xLabelsHtml = categories.map((cat, i) => {
      const x = padLeft + (i / (categories.length - 1)) * plotW;
      return `<text x="${x.toFixed(1)}" y="${h - 6}" text-anchor="middle" fill="#8C9BAE" font-size="9.5" font-weight="600" font-family="'Outfit', sans-serif">${cat}</text>`;
    }).join('');

    const iconSvgs = {
      wallet: `<svg viewBox="0 0 24 24"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`,
      share: `<svg viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>`,
      tag: `<svg viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>`,
      trending: `<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>`,
      user: `<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
      award: `<svg viewBox="0 0 24 24"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>`,
      building: `<svg viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>`,
      cart: `<svg viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>`,
      flag: `<svg viewBox="0 0 24 24"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/></svg>`
    };

    const miniStatsHtml = miniStats.map((st, i) => `
      <div class="earnings-stat-pill interactive-stat-capsule" data-stat-idx="${i}" data-label="${st.label}" data-val="${st.value}" role="button" tabindex="0" title="Click to inspect ${st.label}">
        <div class="stat-pill-icon-circle" style="background: ${st.color};">
          ${iconSvgs[st.icon] || iconSvgs.trending}
        </div>
        <div class="stat-pill-text-stack">
          <span class="stat-pill-label">${st.label}</span>
          <span class="stat-pill-value">${st.value}</span>
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="card-inner-box">
        <div class="overview-chart-header">
          <div class="overview-title-group">
            <h3 class="overview-brand-title text-slate">${title}</h3>
            <span class="overview-sub-title text-muted">${subtitle}</span>
          </div>
          <div class="overview-slicers-group">
            <div class="overview-tabs-pill">
              <span class="tab-item">DAILY</span>
              <span class="tab-item">WEEKLY</span>
              <span class="tab-item active-turquoise">MONTHLY</span>
              <span class="tab-item">YEARLY</span>
            </div>
            <div class="overview-legend-row">
              <span class="legend-dot-online">● ${legend1}</span>
              <span class="legend-dot-store">● ${legend2}</span>
            </div>
          </div>
        </div>

        <div class="overview-highlight-banner">
          <div class="highlight-val-stack">
            <div class="highlight-big-metric animated-count-val" data-raw="${mainValue}">${mainValue}</div>
            <div class="highlight-sub-metric">${subMetric}</div>
          </div>
          <button class="vibrant-summary-pill-btn">${btnText}</button>
        </div>

        <div class="waves-svg-canvas-wrap">
          <svg width="100%" height="180" viewBox="0 0 ${w} ${h}">
            <defs>
              <linearGradient id="gradWavePurple_${title.replace(/[^a-zA-Z]/g, '')}" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#6C5CE7" stop-opacity="0.38" />
                <stop offset="100%" stop-color="#6C5CE7" stop-opacity="0.0" />
              </linearGradient>
              <linearGradient id="gradWaveOrange_${title.replace(/[^a-zA-Z]/g, '')}" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#FFA502" stop-opacity="0.32" />
                <stop offset="100%" stop-color="#FFA502" stop-opacity="0.0" />
              </linearGradient>
            </defs>

            ${gridLinesHtml}

            <!-- Wave 2 Underfill & Line (Orange) -->
            <path class="animated-wave-path" d="${areaOrange}" fill="url(#gradWaveOrange_${title.replace(/[^a-zA-Z]/g, '')})" />
            <path class="animated-wave-line" d="${pathOrange}" fill="none" stroke="#FFA502" stroke-width="2.5" stroke-linecap="round" />

            <!-- Wave 1 Underfill & Line (Purple) -->
            <path class="animated-wave-path" d="${areaPurple}" fill="url(#gradWavePurple_${title.replace(/[^a-zA-Z]/g, '')})" />
            <path class="animated-wave-line" d="${pathPurple}" fill="none" stroke="#6C5CE7" stroke-width="2.8" stroke-linecap="round" />

            <!-- Interactive SVG Data Points -->
            <g class="chart-datapoints-group">
              ${ptsPurple.map((p, i) => `
                <g class="chart-point-target" data-series="${legend1}" data-cat="${categories[i] || 'Period ' + (i + 1)}" data-val="${seriesPurple[i]}" data-color="#6C5CE7" data-cx="${p.x.toFixed(1)}" data-cy="${p.y.toFixed(1)}" tabindex="0" role="button">
                  <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="5" fill="#6C5CE7" stroke="#FFFFFF" stroke-width="2" class="interactive-chart-dot" />
                  <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="14" fill="transparent" class="interactive-chart-hitbox" />
                </g>
              `).join('')}
              ${ptsOrange.map((p, i) => `
                <g class="chart-point-target" data-series="${legend2}" data-cat="${categories[i] || 'Period ' + (i + 1)}" data-val="${seriesOrange[i]}" data-color="#FFA502" data-cx="${p.x.toFixed(1)}" data-cy="${p.y.toFixed(1)}" tabindex="0" role="button">
                  <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4.5" fill="#FFA502" stroke="#FFFFFF" stroke-width="2" class="interactive-chart-dot" />
                  <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="14" fill="transparent" class="interactive-chart-hitbox" />
                </g>
              `).join('')}
            </g>

            ${xLabelsHtml}
          </svg>
          <div class="chart-floating-tooltip" id="chartTooltip_${title.replace(/[^a-zA-Z]/g, '')}"></div>
        </div>

        <div class="earnings-ministats-row">
          ${miniStatsHtml}
        </div>
      </div>
    `;

    // Interactive Chart Points & Tooltip Handling
    const tooltipEl = container.querySelector('.chart-floating-tooltip');
    const pointTargets = container.querySelectorAll('.chart-point-target');

    pointTargets.forEach(pt => {
      const series = pt.dataset.series;
      const cat = pt.dataset.cat;
      const val = parseFloat(pt.dataset.val || '0');
      const color = pt.dataset.color || '#6C5CE7';
      const cx = parseFloat(pt.dataset.cx || '0');
      const cy = parseFloat(pt.dataset.cy || '0');

      pt.addEventListener('mouseenter', () => {
        if (!tooltipEl) return;
        const wrapRect = container.querySelector('.waves-svg-canvas-wrap').getBoundingClientRect();
        const px = (cx / w) * wrapRect.width;
        const py = (cy / h) * wrapRect.height;

        tooltipEl.style.left = `${px}px`;
        tooltipEl.style.top = `${py}px`;
        tooltipEl.innerHTML = `
          <div class="chart-tooltip-header">${cat}</div>
          <div class="chart-tooltip-row">
            <span class="chart-tooltip-dot" style="background: ${color};"></span>
            <span>${series}:</span>
            <span class="chart-tooltip-val">LKR ${(val * 2.2).toFixed(1)}M</span>
          </div>
        `;
        tooltipEl.classList.add('active');
      });

      pt.addEventListener('mouseleave', () => {
        if (tooltipEl) tooltipEl.classList.remove('active');
      });

      pt.addEventListener('click', () => {
        if (window.DashboardPages && typeof DashboardPages.openRecordInspector === 'function') {
          DashboardPages.openRecordInspector({
            title: `${series} • ${cat}`,
            subtitle: `Monthly Trajectory Analysis`,
            fields: [
              { label: "Reporting Period", val: cat },
              { label: "Series Tracked", val: series },
              { label: "Recorded Volume", val: `LKR ${(val * 2.2).toFixed(1)}M` },
              { label: "Operational Benchmark", val: "On Track (+12% YoY)" }
            ],
            narrative: `In ${cat}, the recorded volume for ${series} stood at LKR ${(val * 2.2).toFixed(1)}M according to Metropolitan corporate logs.`
          });
        }
      });
    });

    // Wire up mini stat capsules
    const statPills = container.querySelectorAll('.interactive-stat-capsule');
    statPills.forEach((pill, i) => {
      const st = miniStats[i];
      if (!st) return;
      pill.addEventListener('click', () => {
        if (window.DashboardPages && typeof DashboardPages.openRecordInspector === 'function') {
          DashboardPages.openRecordInspector({
            title: st.label,
            subtitle: `Current Month Portfolio Metric`,
            fields: [
              { label: "Metric Name", val: st.label },
              { label: "Recorded Valuation", val: st.value },
              { label: "Operational Division", val: "Metropolitan Corporate Division" },
              { label: "Ledger State", val: "Active Verified" }
            ],
            narrative: `The operational tracking figure for '${st.label}' currently stands at ${st.value} in the corporate ledger.`
          });
        }
      });
    });
  },

  // =========================================================================
  // DIVERSE CORPORATE CHARTS MATCHING ANDROID REFERENCE (D:\dashboard new 04.11.2026)
  // =========================================================================

  /**
   * Concentric Multi-Ring Value Wheel (Matching ConcentricValueWheel.kt)
   */
  renderConcentricValueWheel(container, options = {}) {
    if (!container) return;
    const {
      title = "Target Velocity Wheel",
      centerMainText = "21.5%",
      centerSubText = "OVERALL ACHIEVEMENT",
      badge = "RADIAL TELEMETRY",
      rings = [
        { name: "Target Projection", valueString: "LKR 314.5M", percentage: 1.0, color: "#38BDF8", gradientColors: ["#7DD3FC", "#0284C7"] },
        { name: "Actual Achievement", valueString: "LKR 67.5M", percentage: 0.215, color: "#10B981", gradientColors: ["#6EE7B7", "#10B981"] },
        { name: "Invoiced Revenue", valueString: "LKR 5.5M", percentage: 0.082, color: "#818CF8", gradientColors: ["#C4B5FD", "#8B5CF6"] }
      ]
    } = options;

    const ringRadii = [90, 68, 46];
    const strokeWidth = 14;
    const cx = 130;
    const cy = 130;

    const defs = rings.map((r, i) => {
      const g1 = (r.gradientColors && r.gradientColors[0]) || r.color;
      const g2 = (r.gradientColors && r.gradientColors[1]) || r.color;
      return `
        <linearGradient id="concRingGrad_${i}_${Math.random().toString(36).substr(2, 6)}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${g1}"/>
          <stop offset="100%" stop-color="${g2}"/>
        </linearGradient>
      `;
    }).join('');

    const ringSvgPaths = rings.map((r, i) => {
      const radius = ringRadii[i] || 40;
      const circ = 2 * Math.PI * radius;
      const pct = Math.min(Math.max(r.percentage || 0, 0), 1.5);
      const dashoffset = circ * (1 - Math.min(pct, 1.0));
      const g1 = (r.gradientColors && r.gradientColors[0]) || r.color;

      return `
        <!-- Background Track -->
        <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="currentColor" stroke-opacity="0.08" stroke-width="${strokeWidth}"/>
        <!-- Progress Fill (Animated Ring Sweep) -->
        <circle class="concentric-ring-fill concentric-animated-arc" cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${g1}" stroke-width="${strokeWidth}"
          stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${circ}" data-target-offset="${dashoffset}" data-circ="${circ}"
          transform="rotate(-90 ${cx} ${cy})" style="filter: drop-shadow(0 0 6px ${this.hexToRgba(g1, 0.45)});" />
      `;
    }).join('');

    const legendsHtml = rings.map((r, i) => {
      const clr = (r.gradientColors && r.gradientColors[0]) || r.color || "#00CEC9";
      return `
        <div class="concentric-telemetry-card">
          <div class="telemetry-card-top">
            <span class="telemetry-dot" style="background: ${clr}; box-shadow: 0 0 8px ${clr};"></span>
            <span class="telemetry-name">${r.name}</span>
          </div>
          <div class="telemetry-val animated-count-val" data-raw="${r.valueString}">${r.valueString}</div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="card-inner-box concentric-wheel-card-inner">
        <div class="card-header-row">
          <div class="overview-title-group">
            <h3 class="card-main-title text-slate">${title}</h3>
            <span class="overview-sub-title text-muted">Multi-Ring Velocity Telemetry</span>
          </div>
          <span class="status-pill-badge open">${badge}</span>
        </div>

        <div class="concentric-body">
          <div class="concentric-svg-wrap">
            <svg viewBox="0 0 260 260" class="concentric-wheel-svg">
              <defs>${defs}</defs>
              ${ringSvgPaths}
              <!-- Center Glow Halo -->
              <circle cx="${cx}" cy="${cy}" r="34" fill="currentColor" fill-opacity="0.04" />
              <!-- Center Main Percentage (Animated from 0) -->
              <text x="${cx}" y="${cy - 2}" text-anchor="middle" font-family="var(--font-heading)" font-size="28" font-weight="900" fill="currentColor" letter-spacing="0.5" class="animated-count-val" data-raw="${centerMainText}">${centerMainText}</text>
              <text x="${cx}" y="${cy + 16}" text-anchor="middle" font-family="var(--font-accent)" font-size="10" font-weight="800" fill="#64748B" letter-spacing="0.6">${centerSubText}</text>
            </svg>
          </div>

          <div class="concentric-legend-list">
            ${legendsHtml}
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Radial Gauge Wheel (Matching RadialGaugeWheel.kt)
   */
  renderRadialGaugeWheel(container, options = {}) {
    if (!container) return;
    const {
      title = "Velocity Gauge",
      valueString = "88.5%",
      percentage = 0.885,
      subtitle = "Monthly Target Run-Rate",
      trendText = "On Target",
      accentColor = "#38BDF8",
      gradientColors = ["#7DD3FC", "#0284C7"]
    } = options;

    const size = 190;
    const cx = size / 2;
    const cy = size / 2 + 5;
    const radius = 68;
    const strokeWidth = 14;
    // 240 degree gauge (from 150 deg to 390 deg)
    const arcAngle = 240;
    const circ = 2 * Math.PI * radius;
    const arcCirc = (arcAngle / 360) * circ;
    const pct = Math.min(Math.max(percentage || 0, 0), 1.5);
    const strokeDash = arcCirc * Math.min(pct, 1.0);
    const dashoffset = arcCirc - strokeDash;

    const g1 = gradientColors[0] || accentColor;
    const g2 = gradientColors[1] || accentColor;
    const gradId = `radialGrad_${Math.random().toString(36).substr(2, 6)}`;

    container.innerHTML = `
      <div class="card-inner-box radial-gauge-inner">
        <div class="gauge-header">
          <span class="gauge-title">${title}</span>
          ${trendText ? `<span class="gauge-badge" style="background: ${this.hexToRgba(accentColor, 0.14)}; color: ${accentColor}; font-weight: 800;">${trendText}</span>` : ''}
        </div>

        <div class="radial-gauge-svg-wrap">
          <svg viewBox="0 0 ${size} ${size}" class="radial-gauge-svg">
            <defs>
              <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="${g1}"/>
                <stop offset="100%" stop-color="${g2}"/>
              </linearGradient>
            </defs>
            <!-- Background Arc (240 deg) -->
            <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="currentColor" stroke-opacity="0.08" stroke-width="${strokeWidth}"
              stroke-linecap="round" stroke-dasharray="${arcCirc} ${circ}" transform="rotate(150 ${cx} ${cy})"/>
            <!-- Active Progress Arc (Animated from 0 to target) -->
            <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="url(#${gradId})" stroke-width="${strokeWidth}"
              stroke-linecap="round" stroke-dasharray="0 ${circ}" data-target-dash="${strokeDash}" data-circ="${circ}"
              transform="rotate(150 ${cx} ${cy})" class="gauge-animated-arc"
              style="filter: drop-shadow(0 0 8px ${this.hexToRgba(accentColor, 0.5)});" />
            <!-- Center Telemetry Text (Animated Rollup from 0) -->
            <text x="${cx}" y="${cy - 6}" text-anchor="middle" font-family="var(--font-heading)" font-size="24" font-weight="900" fill="currentColor" class="animated-count-val" data-raw="${valueString}">${valueString}</text>
            <text x="${cx}" y="${cy + 15}" text-anchor="middle" font-family="var(--font-body)" font-size="11" font-weight="700" fill="#64748B">${subtitle}</text>
          </svg>
        </div>
      </div>
    `;
  },

  /**
   * Horizontal Bar Chart with Targets (Matching HorizontalBarChart.kt)
   */
  renderHorizontalBarChartWithTargets(container, options = {}) {
    if (!container) return;
    const {
      title = "Performance by Division",
      badge = null,
      items = []
    } = options;

    const maxVal = Math.max(...items.map(it => Math.max(it.value || 0, it.target || 0)), 1);

    const rowsHtml = items.map((it, idx) => {
      const valPct = Math.min((it.value / maxVal) * 100, 100);
      const targetPct = it.target ? Math.min((it.target / maxVal) * 100, 100) : null;
      const color = it.barColor || (idx % 2 === 0 ? "#00CEC9" : "#6C5CE7");
      const valStr = it.displayValue || (it.value >= 1_000_000 ? this.formatCurrencyLKR(it.value) : it.value.toLocaleString());

      return `
        <div class="h-target-bar-row">
          <div class="h-target-bar-meta">
            <span class="h-target-bar-label">${it.label}</span>
            <div class="h-target-bar-val-block">
              ${it.target ? `<span class="h-target-sub">Target: ${it.target >= 1_000_000 ? this.formatCurrencyLKR(it.target) : it.target.toLocaleString()}</span>` : ''}
              <span class="h-target-bar-val-pill animated-count-val" data-raw="${valStr}" style="color: ${color}; background: ${this.hexToRgba(color, 0.12)};">${valStr}</span>
            </div>
          </div>
          <div class="h-target-bar-track">
            ${targetPct !== null ? `<div class="h-target-pin-line" style="left: ${targetPct}%;" title="Target: ${it.target}"></div>` : ''}
            <div class="h-target-bar-fill animated-bar-fill" style="width: 0%; background: linear-gradient(90deg, ${color}, ${this.hexToRgba(color, 0.75)});" data-target-width="${valPct}%" title="${it.label}: ${valStr}"></div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="card-inner-box h-target-barchart-inner">
        <div class="card-header-row">
          <div class="overview-title-group">
            <h3 class="card-main-title text-slate">${title}</h3>
            <span class="overview-sub-title text-muted">${items.length} Tracked Portfolios</span>
          </div>
          <span class="status-pill-badge open">${badge || `${items.length} ITEMS`}</span>
        </div>

        <div class="h-target-bars-list">
          ${rowsHtml}
        </div>
      </div>
    `;
  },

  /**
   * Multi-Slice Donut Chart (Matching DonutChart.kt)
   */
  renderMultiSliceDonut(container, options = {}) {
    if (!container) return;
    const {
      title = "Financial Contribution",
      categories = [],
      colors = ["#818CF8", "#38BDF8", "#34D399", "#FBBF24", "#FB7185", "#A78BFA", "#F472B6"]
    } = options;

    const total = categories.reduce((sum, c) => sum + (c.value || c[1] || 0), 0) || 1;
    const size = 200;
    const cx = size / 2;
    const cy = size / 2;
    const radius = 68;
    const strokeWidth = 24;
    const circ = 2 * Math.PI * radius;

    let accumulatedPct = 0;
    const slicePaths = categories.map((cat, i) => {
      const val = cat.value !== undefined ? cat.value : cat[1] || 0;
      const pct = (val / total);
      const strokeDash = pct * circ;
      const strokeOffset = circ - (accumulatedPct * circ);
      accumulatedPct += pct;
      const clr = cat.color || colors[i % colors.length];

      return `
        <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${clr}" stroke-width="${strokeWidth}"
          stroke-dasharray="${strokeDash} ${circ}" stroke-dashoffset="${strokeOffset}"
          transform="rotate(-90 ${cx} ${cy})" class="interactive-donut-slice"
          data-cat="${cat.label || cat[0]}" data-val="${val}" style="transition: stroke-width 0.2s;" />
      `;
    }).join('');

    const legendsHtml = categories.slice(0, 6).map((cat, i) => {
      const val = cat.value !== undefined ? cat.value : cat[1] || 0;
      const pct = ((val / total) * 100).toFixed(1);
      const clr = cat.color || colors[i % colors.length];
      const label = cat.label || cat[0];

      return `
        <div class="donut-legend-item">
          <span class="donut-legend-dot" style="background: ${clr};"></span>
          <span class="donut-legend-name" title="${label}">${label}</span>
          <span class="donut-legend-pct">${pct}%</span>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="card-inner-box multi-donut-inner">
        <div class="card-header-row">
          <div class="overview-title-group">
            <h3 class="card-main-title text-slate">${title}</h3>
            <span class="overview-sub-title text-muted">Portfolio Distribution Ratio</span>
          </div>
          <span class="status-pill-badge open">PROPORTIONAL</span>
        </div>

        <div class="donut-chart-flex-wrap">
          <div class="donut-svg-center-wrap">
            <svg viewBox="0 0 ${size} ${size}" class="multi-donut-svg">
              <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="currentColor" stroke-opacity="0.08" stroke-width="${strokeWidth}" />
              ${slicePaths}
              <text x="${cx}" y="${cy - 4}" text-anchor="middle" font-family="var(--font-heading)" font-size="22" font-weight="900" fill="currentColor">100%</text>
              <text x="${cx}" y="${cy + 15}" text-anchor="middle" font-family="var(--font-accent)" font-size="10" font-weight="800" fill="#64748B">PORTFOLIO</text>
            </svg>
          </div>

          <div class="donut-legend-grid">
            ${legendsHtml}
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Leaderboard Card (Matching LeaderboardCard.kt)
   */
  renderLeaderboard(container, options = {}) {
    if (!container) return;
    const {
      title = "Performance Leaderboard",
      badge = "RANKED",
      rows = []
    } = options;

    const rowsHtml = rows.map((r, i) => {
      const isTop3 = r.rank <= 3;
      const rankBadge = r.rank === 1 ? '🥇 1' : (r.rank === 2 ? '🥈 2' : (r.rank === 3 ? '🥉 3' : `#${r.rank}`));
      const rankClass = r.rank === 1 ? 'gold-rank' : (r.rank === 2 ? 'silver-rank' : (r.rank === 3 ? 'bronze-rank' : 'standard-rank'));

      return `
        <div class="leaderboard-item-row ${rankClass}">
          <div class="leaderboard-rank-pill">${rankBadge}</div>
          <div class="leaderboard-name-stack">
            <span class="leaderboard-primary-name">${r.primaryName}</span>
            <span class="leaderboard-sub-label">${r.secondaryLabel}</span>
          </div>
          <div class="leaderboard-values-stack">
            <span class="leaderboard-val-main animated-count-val" data-raw="${r.primaryValueString}">${r.primaryValueString}</span>
            <span class="leaderboard-val-sub">${r.secondaryValueString}</span>
          </div>
          <div class="leaderboard-status-badge-wrap">
            <span class="status-pill-badge ${r.statusColor === '#10B981' || (r.statusBadge && r.statusBadge.includes('Achieved')) ? 'completed' : 'open'}">${r.statusBadge}</span>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="card-inner-box leaderboard-inner">
        <div class="card-header-row">
          <div class="overview-title-group">
            <h3 class="card-main-title text-slate">${title}</h3>
            <span class="overview-sub-title text-muted">Verified Operational Ingestion</span>
          </div>
          <span class="status-pill-badge completed">${badge}</span>
        </div>

        <div class="leaderboard-scroll-list">
          ${rowsHtml}
        </div>
      </div>
    `;
  },

  // Compatibility adapters
  renderRadialGauge(container, options) {
    this.renderRadialGaugeWheel(container, options);
  },

  renderConcentricWheel(container, options) {
    this.renderConcentricValueWheel(container, options);
  },

  renderBarChart(container, options) {
    this.renderHorizontalBarChartWithTargets(container, options);
  },

  renderDonutChart(container, options) {
    this.renderMultiSliceDonut(container, options);
  },

  renderAreaSplineChart(container, options) {
    this.renderDualWaveEarningsChart(container, options);
  }
};
