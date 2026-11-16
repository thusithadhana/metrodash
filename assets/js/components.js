/**
 * METROPOLITAN MANAGEMENT INTELLIGENCE - DASHBOARD WEB APPLICATION
 * High-End UI Component Factory (Bloomberg/Apple Executive Polish)
 */

const UIComponents = {
  getIconSvg(type) {
    switch (type) {
      case "flag":
        return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/></svg>`;
      case "trending":
      case "trend":
        return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>`;
      case "receipt":
        return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"/></svg>`;
      case "warning":
        return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`;
      case "check":
        return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;
      case "work":
      case "briefcase":
        return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>`;
      case "call":
        return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>`;
      case "engineering":
      case "tech":
        return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1.1 0 2 .9 2 2v1.08c1.37.36 2.59 1.09 3.58 2.08l.77-.77c.78-.78 2.05-.78 2.83 0l1.41 1.41c.78.78.78 2.05 0 2.83l-.77.77c.99.99 1.72 2.21 2.08 3.58H25v2h-1.08c-.36 1.37-1.09 2.59-2.08 3.58l.77.77c.78.78.78 2.05 0 2.83l-1.41 1.41c-.78.78-2.05.78-2.83 0l-.77-.77c-.99.99-2.21 1.72-3.58 2.08V24h-2v-1.08c-1.37-.36-2.59-1.09-3.58-2.08l-.77.77c-.78.78-2.05.78-2.83 0l-1.41-1.41c-.78-.78-.78-2.05 0-2.83l.77-.77C2.09 17.59 1.36 16.37 1 15H0v-2h1.08c.36-1.37 1.09-2.59 2.08-3.58l-.77-.77c-.78-.78-.78-2.05 0-2.83L3.8 4.41c.78-.78 2.05-.78 2.83 0l.77.77C8.39 4.19 9.61 3.46 11 3.1V2h1zm0 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/></svg>`;
      case "award":
      case "star":
        return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
      case "cart":
      case "shop":
        return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>`;
      case "support":
      case "coordinator":
      default:
        return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2c0-4.97-4.03-9-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z"/></svg>`;
    }
  },

  /**
   * Generates an Animated SVG Sparkline Area Chart with Glowing Beacon Dot
   */
  generateSparklineSvg(sparkColor, points = [38, 54, 46, 72, 62, 85, 96]) {
    const w = 200;
    const h = 42;
    const pad = 4;
    const min = Math.min(...points);
    const max = Math.max(...points) || 1;
    const range = (max - min) || 1;

    const coords = points.map((p, idx) => {
      const x = pad + (idx / (points.length - 1)) * (w - 2 * pad);
      const y = h - pad - ((p - min) / range) * (h - 2 * pad);
      return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
    });

    let lineD = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const curr = coords[i];
      const next = coords[i + 1];
      const mx = (curr.x + next.x) / 2;
      lineD += ` C ${mx} ${curr.y}, ${mx} ${next.y}, ${next.x} ${next.y}`;
    }

    const lastCoord = coords[coords.length - 1];
    const areaD = `${lineD} L ${lastCoord.x} ${h} L ${coords[0].x} ${h} Z`;
    const gradId = `sparkGrad_${Math.random().toString(36).substr(2, 7)}`;
    const filterId = `sparkGlow_${Math.random().toString(36).substr(2, 7)}`;

    return `
      <div class="kpi-sparkline-container">
        <svg viewBox="0 0 ${w} ${h}" class="kpi-sparkline-svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${sparkColor}" stop-opacity="0.48"/>
              <stop offset="60%" stop-color="${sparkColor}" stop-opacity="0.15"/>
              <stop offset="100%" stop-color="${sparkColor}" stop-opacity="0.0"/>
            </linearGradient>
            <filter id="${filterId}">
              <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="${sparkColor}" flood-opacity="0.4" />
            </filter>
          </defs>
          <line x1="${pad}" y1="${h / 2}" x2="${w - pad}" y2="${h / 2}" stroke="rgba(255,255,255,0.08)" stroke-width="0.8" stroke-dasharray="2 3" />
          <path class="sparkline-path-area" d="${areaD}" fill="url(#${gradId})"/>
          <path class="sparkline-path-line" d="${lineD}" stroke="${sparkColor}" stroke-width="2.4" filter="url(#${filterId})"/>
          <circle cx="${lastCoord.x}" cy="${lastCoord.y}" r="3.2" fill="#FFFFFF" stroke="${sparkColor}" stroke-width="2" class="sparkline-beacon-dot"/>
        </svg>
      </div>
    `;
  },

  /**
   * Generates a Professional Corporate Executive Story Banner
   */
  createHeroStoryBanner(options) {
    const {
      badge = "EXECUTIVE TELEMETRY",
      title = "Metropolitan Performance Intelligence",
      description = "",
      pills = []
    } = options;

    const pillsHtml = pills.map(p => `
      <div class="story-stat-pill ${p.type || ''}">
        <div class="pill-data">
          <span class="pill-title">${p.title}</span>
          <span class="pill-val">${p.val}</span>
        </div>
      </div>
    `).join('');

    return `
      <div class="hero-story-banner animate-fade-in" style="margin-bottom: 16px;">
        <div class="hero-story-left">
          <span class="story-badge-pulse" style="animation: none !important; background: #E60067; color: #fff;">${badge}</span>
          <h2 class="hero-story-title" style="color: #4A154B;">${title}</h2>
          <p class="hero-story-desc">${description}</p>
        </div>
        <div class="hero-story-right">
          ${pillsHtml}
        </div>
      </div>
    `;
  },

  createKpiCardHtml(options) {
    const {
      title = "Metric Title",
      value = "LKR 0",
      subtitle = "",
      trendBadge = "",
      icon = "trending",
      themeStyle = "kpi-style-gradient-blue",
      isPositiveTrend = true,
      hasBorderBeam = false
    } = options;

    const trendClass = isPositiveTrend ? "positive" : "negative";

    // Modern Executive Typography Currency Formatting
    let formattedValueHtml = value;
    if (typeof value === "string" && value.startsWith("LKR ")) {
      const numPart = value.substring(4);
      formattedValueHtml = `<span class="kpi-currency-tag">LKR</span><span class="animated-count-val" data-raw="${numPart}">${numPart}</span>`;
    } else {
      formattedValueHtml = `<span class="animated-count-val" data-raw="${value}">${value}</span>`;
    }

    // Determine Theme Specific Palette & Sparkline Points
    let sparkColor = "#0078D4";
    let meterColor = "#0078D4";
    let progressPct = 104.2;
    let sparkPoints = [38, 54, 46, 72, 62, 85, 96];

    if (themeStyle.includes("mint") || themeStyle.includes("emerald")) {
      sparkColor = "#107C41";
      meterColor = "#107C41";
      progressPct = 105.8;
      sparkPoints = [40, 48, 62, 59, 78, 88, 102];
    } else if (themeStyle.includes("amber") || themeStyle.includes("gold")) {
      sparkColor = "#D97706";
      meterColor = "#D97706";
      progressPct = 98.4;
      sparkPoints = [50, 45, 68, 72, 65, 84, 98];
    } else if (themeStyle.includes("purple")) {
      sparkColor = "#744DA9";
      meterColor = "#744DA9";
      progressPct = 101.5;
      sparkPoints = [32, 45, 58, 52, 70, 89, 95];
    } else if (themeStyle.includes("rose") || themeStyle.includes("red")) {
      sparkColor = "#D13438";
      meterColor = "#D13438";
      progressPct = 42.6;
      sparkPoints = [75, 68, 54, 48, 52, 44, 38];
    } else if (themeStyle.includes("teal")) {
      sparkColor = "#0099BC";
      meterColor = "#0099BC";
      progressPct = 96.8;
      sparkPoints = [42, 56, 50, 68, 74, 86, 94];
    }

    // Check if subtitle has percentage hint
    if (subtitle && subtitle.includes("%")) {
      const match = subtitle.match(/(\d+\.?\d*)%/);
      if (match) {
        progressPct = Math.min(parseFloat(match[1]), 125);
      }
    }

    const sparklineHtml = this.generateSparklineSvg(sparkColor, sparkPoints);

    return `
      <div class="kpi-card ${themeStyle} ${hasBorderBeam ? 'has-border-beam' : ''}">
        <div class="card-header-bar" style="border: none; padding: 0; background: transparent; margin-bottom: 6px;">
          <div class="kpi-title-block">
            <span class="kpi-card-title">${title}</span>
          </div>
          <div class="kpi-icon-wrap">
            ${this.getIconSvg(icon)}
          </div>
        </div>

        <div class="kpi-value-block">
          <span class="kpi-main-value">${formattedValueHtml}</span>
        </div>

        ${sparklineHtml}

        <div class="kpi-meter-wrap">
          <div class="kpi-meter-track">
            <div class="kpi-meter-fill" style="width: ${Math.min(progressPct, 100)}%; background: ${meterColor};" data-target-width="${Math.min(progressPct, 100)}%"></div>
          </div>
          <div class="kpi-meter-meta">
            <span class="kpi-meter-label">Monthly Velocity</span>
            <span class="kpi-meter-pct" style="color: ${meterColor};">${progressPct.toFixed(1)}%</span>
          </div>
        </div>

        <div class="kpi-card-footer">
          <span class="kpi-subtitle" title="${subtitle}">${subtitle}</span>
          ${trendBadge ? `<span class="kpi-trend-pill ${trendClass}"><span class="pill-dot"></span>${trendBadge}</span>` : ''}
        </div>
      </div>
    `;
  },

  createLeaderboardCardHtml(options) {
    const {
      title = "Leaderboard",
      icon = "award",
      rows = []
    } = options;

    const maxVal = Math.max(...rows.map(r => {
      const match = (r.primaryValueString || "").match(/([0-9,.]+)/);
      return match ? parseFloat(match[1].replace(/,/g, '')) : 1;
    }), 1);

    const rowsHtml = rows.map((r, i) => {
      let rankClass = "";
      let medalPrefix = `#${r.rank}`;
      if (r.rank === 1) {
        rankClass = "gold";
        medalPrefix = `🥇 1`;
      } else if (r.rank === 2) {
        rankClass = "silver";
        medalPrefix = `🥈 2`;
      } else if (r.rank === 3) {
        rankClass = "bronze";
        medalPrefix = `🥉 3`;
      }

      const badgeColor = r.statusColor || "var(--metro-blue)";
      const rawMatch = (r.primaryValueString || "").match(/([0-9,.]+)/);
      const rowNum = rawMatch ? parseFloat(rawMatch[1].replace(/,/g, '')) : 1;
      const rowRatio = Math.min(Math.max((rowNum / maxVal) * 100, 15), 100);

      return `
        <div class="leaderboard-row rank-${r.rank}">
          <div class="row-left">
            <span class="rank-badge ${rankClass}">${medalPrefix}</span>
            <div class="row-identity">
              <span class="row-primary-name" title="${r.primaryName}">${r.primaryName}</span>
              ${r.secondaryLabel ? `<span class="row-secondary-label" title="${r.secondaryLabel}">${r.secondaryLabel}</span>` : ''}
              <div class="row-progress-track">
                <div class="row-progress-fill" style="width: ${rowRatio}%; background: ${badgeColor};" data-target-width="${rowRatio}%"></div>
              </div>
            </div>
          </div>
          <div class="row-right">
            <div class="row-values-col">
              <span class="row-primary-value">${r.primaryValueString}</span>
              ${r.secondaryValueString ? `<span class="row-secondary-value">${r.secondaryValueString}</span>` : ''}
            </div>
            ${r.statusBadge ? `<span class="row-status-pill" style="color: ${badgeColor}; background: ${badgeColor}18; border: 1px solid ${badgeColor}40;"><span class="status-beacon-dot" style="background: ${badgeColor};"></span>${r.statusBadge}</span>` : ''}
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="leaderboard-card">
        <div class="card-header-bar">
          <div class="card-header-left">
            <span class="card-heading-icon">
              ${this.getIconSvg(icon)}
            </span>
            <span class="card-heading-text">${title}</span>
          </div>
          <span class="metric-count-pill">${rows.length} Entities</span>
        </div>
        <div class="table-col-header">
          <div class="col-header-left">
            <span style="width: 28px; text-align: center;">RANK</span>
            <span>Participant / Entity</span>
          </div>
          <div class="col-header-right">
            <span>Turnover / Achievement</span>
            <span style="min-width: 75px; text-align: right;">Status</span>
          </div>
        </div>
        <div class="leaderboard-rows-container">
          ${rowsHtml}
        </div>
      </div>
    `;
  },

  createAwardCardHtml(award) {
    const parts = (award.employeeName || "").trim().split(/\s+/);
    let initials = "★";
    if (parts.length >= 2) {
      initials = `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    } else if (parts.length === 1 && parts[0].length >= 2) {
      initials = parts[0].substring(0, 2).toUpperCase();
    }

    return `
      <div class="award-card hover-lift">
        <div class="award-medallion-wrap">
          <div class="award-medallion-halo"></div>
          <div class="award-medallion-inner">
            <span class="winner-initials">${initials}</span>
          </div>
        </div>
        <span class="award-category-pill">${award.categoryTitle}</span>
        <h3 class="award-employee-name">${award.employeeName}</h3>
        <span class="award-designation">${award.designation}</span>
        <p class="award-achievement-text">${award.achievementText}</p>
        <div class="award-score-banner">
          <span class="score-label">Excellence Score</span>
          <span class="score-value">${award.scorePercentage.toFixed(1)}%</span>
        </div>
      </div>
    `;
  },

  createInsightCardHtml(insight) {
    const cat = (insight.category || "financial").toLowerCase();
    const badgeText = `${cat.toUpperCase()} INTELLIGENCE`;

    return `
      <div class="insight-card cat-${cat} hover-lift">
        <div class="insight-stripe cat-${cat}"></div>
        <div class="insight-body">
          <div class="insight-top-meta">
            <span class="insight-badge cat-${cat}">${badgeText}</span>
            <span class="gauge-badge">PRIORITY ${insight.priorityLevel || 1}</span>
          </div>
          <h3 class="insight-title">${insight.title}</h3>
          <p class="insight-statement">${insight.statement}</p>
        </div>
      </div>
    `;
  },

  createProgressListHtml(options) {
    const {
      title = "Revenue Share Breakdown",
      items = []
    } = options;

    const rowsHtml = items.map((it, idx) => {
      const pct = (it.percentage * 100).toFixed(1);
      const col = it.barColor || "var(--metro-cyan)";

      let rankClass = "";
      if (idx === 0) rankClass = "rank-1";
      else if (idx === 1) rankClass = "rank-2";
      else if (idx === 2) rankClass = "rank-3";

      return `
        <div class="bar-chart-row" style="margin-bottom: 8px;">
          <div class="bar-info-row">
            <div style="display: flex; align-items: center; gap: 7px; min-width: 0;">
              <span class="bar-rank-badge ${rankClass}">#${it.index || idx + 1}</span>
              <span class="bar-label-text" title="${it.name}">${it.name}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 7px;">
              <span class="bar-value-text" style="color: ${col};">${it.tagText || `${pct}%`}</span>
              <span class="legend-badge-pill" style="color: ${col}; background: ${col}18; border: 1px solid ${col}35;">${pct}%</span>
            </div>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width: ${pct}%; background: linear-gradient(90deg, ${col}, #38BDF8);" data-target-width="${pct}%"></div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="chart-card">
        <div class="card-header-bar">
          <div class="card-header-left">
            <span class="card-heading-icon" style="color: var(--metro-blue); background: rgba(0, 120, 212, 0.12);">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/></svg>
            </span>
            <span class="card-heading-text">${title}</span>
          </div>
          <span class="metric-count-pill">${items.length} Streams</span>
        </div>
        <div class="bar-chart-body">
          ${rowsHtml}
        </div>
      </div>
    `;
  }
};
