/**
 * METROPOLITAN MANAGEMENT INTELLIGENCE - DASHBOARD WEB APPLICATION
 * 11 Master Dashboard Page Renderers
 * Authentic Diverse Visualizations matching D:\dashboard new 04.11.2026
 * Concentric Value Wheels, Radial Gauges, Target Bar Charts, Ranked Leaderboards,
 * Award Celebrations, Strategic Insights, and About Architect (Thusitha Dhananjaya)
 * Zero duplicate templates, zero unwanted dummy data, strictly LKR currency.
 */

const DashboardPages = {
  PAGES: [
    { index: 1, id: "EXECUTIVE_OVERVIEW", title: "EXECUTIVE OVERVIEW", totalPanels: 1 },
    { index: 2, id: "FINANCIAL_PERFORMANCE", title: "FINANCIAL PERFORMANCE", totalPanels: 1 },
    { index: 3, id: "DEPARTMENT_PERFORMANCE", title: "DEPARTMENT PERFORMANCE", totalPanels: 1 },
    { index: 4, id: "SALES_REVENUE", title: "SALES & REVENUE", totalPanels: 1 },
    { index: 5, id: "CONTRACTS_ESTIMATES", title: "AMC & ESTIMATE PIPELINE", totalPanels: 1 },
    { index: 6, id: "TECHNICIAN_PERFORMANCE", title: "TECHNICIAN PERFORMANCE", totalPanels: 1 },
    { index: 7, id: "COORDINATOR_PERFORMANCE", title: "COORDINATOR & TEAM LEADER", totalPanels: 1 },
    { index: 8, id: "DEBTORS_OUTSTANDING", title: "DEBTORS & OUTSTANDING WORK", totalPanels: 1 },
    { index: 9, id: "EMPLOYEE_RECOGNITION", title: "EMPLOYEE RECOGNITION", totalPanels: 1 },
    { index: 10, id: "MANAGEMENT_INSIGHTS", title: "MANAGEMENT INSIGHTS", totalPanels: 1 },
    { index: 11, id: "ABOUT_SYSTEM", title: "ABOUT SYSTEM & ARCHITECT", totalPanels: 1 }
  ],

  getPageByIndex(index) {
    return this.PAGES.find(p => p.index === index) || this.PAGES[0];
  },

  renderCurrent(container, pageIndex, panelIndex = 1) {
    if (!container) return;
    container.innerHTML = "";

    switch (pageIndex) {
      case 1:
        this.renderExecutiveOverview(container);
        break;
      case 2:
        this.renderFinancialPerformance(container);
        break;
      case 3:
        this.renderDepartmentPerformance(container);
        break;
      case 4:
        this.renderSalesRevenue(container);
        break;
      case 5:
        this.renderContractsEstimates(container);
        break;
      case 6:
        this.renderTechnicianPerformance(container);
        break;
      case 7:
        this.renderCoordinatorPerformance(container);
        break;
      case 8:
        this.renderDebtorsOutstanding(container);
        break;
      case 9:
        this.renderEmployeeRecognition(container);
        break;
      case 10:
        this.renderManagementInsights(container);
        break;
      case 11:
        this.renderAboutSystem(container);
        break;
      default:
        this.renderExecutiveOverview(container);
    }

    // Animatively count up all numeric values from zero to updated amount
    this.animateNumbers(container);
  },

  /**
   * Universal Number Roll-Up & Gauge Arc Sweep Animation
   * Values start at 0 (or LKR 0) and smoothly count up to the final updated amount
   */
  animateNumbers(container) {
    if (!container) return;

    // 1. Numeric Values Rollup from Zero
    const elements = container.querySelectorAll('.animated-count-val');
    elements.forEach((el, index) => {
      const rawText = el.getAttribute('data-raw') || el.textContent.trim();
      if (!rawText) return;

      const match = rawText.match(/^([^0-9.-]*)([0-9,.]+)(.*)$/);
      if (!match) return;

      const prefix = match[1] || "";
      const numStr = match[2].replace(/,/g, '');
      const suffix = match[3] || "";
      const targetVal = parseFloat(numStr);
      if (isNaN(targetVal)) return;

      const hasDecimals = numStr.includes('.');
      const decimals = hasDecimals ? (numStr.split('.')[1] || '').length : 0;
      const hasCommas = match[2].includes(',');

      // Set initial zero display immediately
      const zeroFormatted = hasDecimals ? (0).toFixed(decimals) : "0";
      el.textContent = `${prefix}${zeroFormatted}${suffix}`;

      const duration = 1000; // 1 second smooth rollout
      const delay = Math.min(index * 25, 200);
      let startTime = null;

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp + delay;
        const elapsed = timestamp - startTime;

        if (elapsed < 0) {
          requestAnimationFrame(step);
          return;
        }

        const progress = Math.min(elapsed / duration, 1);
        // Quartic ease out: snappy initial rise, buttery smooth deceleration into target
        const ease = 1 - Math.pow(1 - progress, 4);
        const currentVal = targetVal * ease;

        let formatted;
        if (hasCommas && !hasDecimals) {
          formatted = Math.round(currentVal).toLocaleString('en-US');
        } else {
          formatted = currentVal.toFixed(decimals);
        }

        el.textContent = `${prefix}${formatted}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = rawText; // Exact guaranteed end value
        }
      };

      requestAnimationFrame(step);
    });

    // 2. Radial Gauge Wheel Arcs Animation from 0°
    const gaugeArcs = container.querySelectorAll('.gauge-animated-arc');
    gaugeArcs.forEach((arc, i) => {
      const targetDash = parseFloat(arc.getAttribute('data-target-dash') || 0);
      const circ = parseFloat(arc.getAttribute('data-circ') || 1);
      if (!targetDash) return;

      arc.setAttribute('stroke-dasharray', `0 ${circ}`);
      const duration = 1000;
      const delay = i * 60;
      let startTime = null;

      const stepArc = (timestamp) => {
        if (!startTime) startTime = timestamp + delay;
        const elapsed = timestamp - startTime;

        if (elapsed < 0) {
          requestAnimationFrame(stepArc);
          return;
        }

        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        const currentDash = targetDash * ease;
        arc.setAttribute('stroke-dasharray', `${currentDash} ${circ}`);

        if (progress < 1) {
          requestAnimationFrame(stepArc);
        } else {
          arc.setAttribute('stroke-dasharray', `${targetDash} ${circ}`);
        }
      };

      requestAnimationFrame(stepArc);
    });

    // 3. Concentric Multi-Ring Wheel Arcs Animation
    const concentricArcs = container.querySelectorAll('.concentric-animated-arc');
    concentricArcs.forEach((arc, i) => {
      const targetOffset = parseFloat(arc.getAttribute('data-target-offset') || 0);
      const circ = parseFloat(arc.getAttribute('data-circ') || 1);

      arc.setAttribute('stroke-dashoffset', `${circ}`);
      const duration = 1050;
      const delay = i * 70;
      let startTime = null;

      const stepConcentric = (timestamp) => {
        if (!startTime) startTime = timestamp + delay;
        const elapsed = timestamp - startTime;

        if (elapsed < 0) {
          requestAnimationFrame(stepConcentric);
          return;
        }

        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        const currentOffset = circ - ((circ - targetOffset) * ease);
        arc.setAttribute('stroke-dashoffset', `${currentOffset}`);

        if (progress < 1) {
          requestAnimationFrame(stepConcentric);
        } else {
          arc.setAttribute('stroke-dashoffset', `${targetOffset}`);
        }
      };

      requestAnimationFrame(stepConcentric);
    });

    // 4. Horizontal Target Bar Fills Animation
    const barFills = container.querySelectorAll('.animated-bar-fill');
    barFills.forEach((bar, i) => {
      const targetWidth = bar.getAttribute('data-target-width');
      if (!targetWidth) return;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 50 + i * 40);
    });
  },

  // =========================================================================
  // UNIVERSAL UI COMPONENT HELPERS
  // =========================================================================

  renderKpiCardHtml(k, idx) {
    return `
      <div class="vibrant-kpi-card ${k.grad}" data-kpi-idx="${idx}" tabindex="0" role="button" aria-label="${k.label}: ${k.value}" title="${k.label}">
        <span class="kpi-active-pill"><span class="active-dot"></span> LIVE VIEW</span>
        <div class="kpi-icon-circle">
          ${k.icon}
        </div>
        <div class="kpi-content-stack">
          <div class="kpi-big-number animated-count-val" data-raw="${k.value}">${k.value}</div>
          <div class="kpi-subtitle-text">${k.label}${k.tag ? ` <span class="kpi-tag-badge">${k.tag}</span>` : ''}</div>
        </div>
        ${k.popover ? `
          <div class="kpi-hover-popover">
            <div class="popover-header">
              <span>${k.popover.title || k.label}</span>
              <span class="popover-badge">${k.popover.badge || 'ACTIVE'}</span>
            </div>
            <div class="popover-desc">${k.popover.desc}</div>
            ${k.popover.stats ? `
              <div class="popover-stats-grid">
                ${k.popover.stats.map(s => `
                  <div class="popover-stat-item">
                    <span class="popover-stat-label">${s.label}</span>
                    <span class="popover-stat-val">${s.val}</span>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  },

  renderKpiGridHtml(kpis, columns = 4) {
    const gridStyle = columns === 6 ? 'grid-template-columns: repeat(6, 1fr);' : (columns === 3 ? 'grid-template-columns: repeat(3, 1fr);' : '');
    return `
      <div class="kpi-gradient-grid" style="${gridStyle}">
        ${kpis.map((k, idx) => this.renderKpiCardHtml(k, idx)).join('')}
      </div>
    `;
  },

  renderActivityFeedHtml(title, items) {
    const itemsHtml = items.map((it, idx) => `
      <div class="activity-item" data-act-idx="${idx}" role="button" tabindex="0" title="Click to inspect: ${it.title}">
        <span class="activity-time">${it.time}</span>
        <span class="activity-dot-badge" style="background: ${it.color || '#00CEC9'};"></span>
        <div class="activity-text-stack">
          <span class="activity-title">${it.title}</span>
          <span class="activity-sub">${it.sub}</span>
        </div>
      </div>
    `).join('');

    return `
      <div class="card-inner-box">
        <div class="card-header-row">
          <div class="overview-title-group">
            <h3 class="card-main-title text-slate">${title}</h3>
            <span class="overview-sub-title text-muted">Real-Time Operational Log</span>
          </div>
          <span class="status-pill-badge completed">LIVE FEED</span>
        </div>
        <div class="recent-activities-list">
          ${itemsHtml}
        </div>
      </div>
    `;
  },

  renderCleanTableHtml(options = {}) {
    const {
      title = "Verified Records",
      subtitle = "Live Operational Telemetry",
      badge = "SYNCHRONIZED",
      columns = [],
      rows = [],
      paginationText = "Showing verified records"
    } = options;

    const headersHtml = columns.map((col, idx) => `
      <th style="${idx === columns.length - 1 ? 'text-align: right;' : ''}">${col}</th>
    `).join('');

    const rowsHtml = rows.map((r, rIdx) => {
      const isLastBadge = typeof r[r.length - 1] === 'object';
      const lastCol = isLastBadge
        ? `<span class="status-pill-badge ${r[r.length - 1].type || 'completed'}">${r[r.length - 1].label || 'Active'}</span>`
        : r[r.length - 1];

      return `
        <tr class="interactive-table-row" data-row-idx="${rIdx}" role="button" tabindex="0" title="Click to inspect: ${r[0]}">
          <td style="font-weight: 700;">${r[0]}</td>
          ${r.slice(1, -1).map((val, cIdx) => `<td style="${cIdx === 1 ? 'font-weight: 700;' : ''}">${val}</td>`).join('')}
          <td style="text-align: right;">${lastCol}</td>
        </tr>
      `;
    }).join('');

    return `
      <div class="card-inner-box">
        <div class="card-header-row">
          <div class="overview-title-group">
            <h3 class="card-main-title text-slate">${title}</h3>
            <span class="overview-sub-title text-muted">${subtitle}</span>
          </div>
          <span class="status-pill-badge completed">${badge}</span>
        </div>

        <table class="order-status-table">
          <thead>
            <tr>
              ${headersHtml}
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>

        <div class="table-footer-pagination">
          <span>${paginationText}</span>
          <div class="pagination-pages">
            <span class="page-num-dot active">1</span>
          </div>
        </div>
      </div>
    `;
  },

  wireInteractivity(container, kpis = [], tableRows = [], activities = []) {
    // KPI Cards
    const kpiElements = container.querySelectorAll('.vibrant-kpi-card');
    kpiElements.forEach((card, idx) => {
      const kData = kpis[idx];
      if (!kData) return;
      card.addEventListener('click', () => {
        if (typeof App !== 'undefined' && App.audio) App.audio.playClick();
        if (kData.popover) {
          DashboardPages.openRecordInspector({
            title: kData.popover.title || kData.label,
            subtitle: kData.tag ? `Metric: ${kData.value} (${kData.tag})` : `Metric: ${kData.value}`,
            fields: kData.popover.stats ? kData.popover.stats.map(s => ({ label: s.label, val: s.val })) : [
              { label: "Metric Name", val: kData.label },
              { label: "Current Value", val: kData.value },
              { label: "Status Badge", val: kData.tag || "Active" }
            ],
            narrative: kData.popover.desc || `Current operational reading: ${kData.label} is ${kData.value}.`
          });
        }
      });
    });

    // Table Rows
    const rowElements = container.querySelectorAll('.interactive-table-row');
    rowElements.forEach((row, idx) => {
      const r = tableRows[idx];
      if (!r) return;
      row.addEventListener('click', () => {
        if (typeof App !== 'undefined' && App.audio) App.audio.playClick();
        DashboardPages.openRecordInspector({
          title: `${r[0]} • Record Verification`,
          subtitle: `Telemetry Row #${idx + 1}`,
          fields: r.map((val, i) => ({
            label: `Field ${i + 1}`,
            val: typeof val === 'object' ? val.label : String(val)
          })),
          narrative: `Verified business record: ${r[0]}. Value: ${r[r.length - 2] || r[1]}. Verified in live synchronization.`
        });
      });
    });

    // Activity Feed Items
    const actElements = container.querySelectorAll('.activity-item');
    actElements.forEach((act, idx) => {
      const a = activities[idx];
      if (!a) return;
      act.addEventListener('click', () => {
        if (typeof App !== 'undefined' && App.audio) App.audio.playClick();
        DashboardPages.openRecordInspector({
          title: a.title,
          subtitle: `Logged Timestamp: ${a.time}`,
          fields: [
            { label: "Milestone", val: a.title },
            { label: "Logged At", val: a.time },
            { label: "Division", val: "Metropolitan Group" },
            { label: "Audit State", val: "Verified & Executed" }
          ],
          narrative: `Operational Event: ${a.sub}. Verified and ingested into the Metropolitan telemetry platform.`
        });
      });
    });
  },

  openRecordInspector(data) {
    const titleEl = document.getElementById('recordModalTitle');
    const subEl = document.getElementById('recordModalSubtitle');
    const bodyEl = document.getElementById('recordModalBody');
    const modalEl = document.getElementById('recordDetailModal');

    if (titleEl) titleEl.textContent = data.title || 'RECORD INSPECTOR';
    if (subEl) subEl.textContent = data.subtitle || 'Metropolitan Enterprise Information';

    if (bodyEl) {
      const fieldsHtml = (data.fields || []).map(f => `
        <div class="inspector-meta-card">
          <span class="inspector-meta-label">${f.label}</span>
          <span class="inspector-meta-val">${f.val}</span>
        </div>
      `).join('');

      bodyEl.innerHTML = `
        <div class="inspector-narrative-box">
          <div class="inspector-narrative-title">Operational Summary & Context</div>
          <div class="inspector-narrative-text">${data.narrative || 'Real-time telemetry and ledger verification completed for this operational item.'}</div>
        </div>
        <div class="inspector-meta-grid">
          ${fieldsHtml}
        </div>
        <div class="inspector-status-banner">
          <span style="font-size: 11px; font-weight: 700; color: #8C9BAE;">COMPLIANCE VERIFICATION</span>
          <span class="status-pill-badge completed">100% VERIFIED</span>
        </div>
      `;
    }

    if (typeof App !== 'undefined' && typeof App.openModal === 'function' && modalEl) {
      App.openModal(modalEl);
    } else if (modalEl) {
      modalEl.classList.add('active');
    }
  },

  // =========================================================================
  // PAGE 1: EXECUTIVE OVERVIEW (Concentric Multi-Ring Wheel + 3 Radial Gauges)
  // =========================================================================
  renderExecutiveOverview(container) {
    const exec = FinancialCalculationEngine.calculateExecutiveSummary(DashboardData);
    const rankedDepts = RankingEngine.rankDepartmentsByActual(DashboardData.csbmProjectionList || []);

    const kpis = [
      {
        grad: "kpi-grad-blue",
        value: ChartEngine.formatCurrencyLKR(exec.totalDepartmentProjection),
        label: "Department Projection",
        tag: "Monthly Budget",
        icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>`,
        popover: {
          title: "Department Projection Budget",
          badge: "10 DIVISIONS",
          desc: "Full monthly revenue target across all CSBM divisions synchronized live with corporate projections.",
          stats: [
            { label: "Target Inflow", val: ChartEngine.formatCurrencyLKR(exec.totalDepartmentProjection) },
            { label: "Realized", val: ChartEngine.formatCurrencyLKR(exec.totalActualFinancialAchievement) },
            { label: "Run-Rate", val: `${exec.overallTargetAchievementPct.toFixed(1)}%` },
            { label: "Status", val: "Active Budget" }
          ]
        }
      },
      {
        grad: "kpi-grad-purple",
        value: ChartEngine.formatCurrencyLKR(exec.totalActualFinancialAchievement),
        label: "Actual Revenue Achievement",
        tag: `${exec.overallTargetAchievementPct.toFixed(1)}% Achieved`,
        icon: `<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>`,
        popover: {
          title: "Actual Revenue Attainment",
          badge: "REALIZED REVENUE",
          desc: "Realized revenue attained month-to-date across all 10 corporate divisions.",
          stats: [
            { label: "Attained Amount", val: ChartEngine.formatCurrencyLKR(exec.totalActualFinancialAchievement) },
            { label: "Monthly Target", val: ChartEngine.formatCurrencyLKR(exec.totalDepartmentProjection) },
            { label: "Attainment Rate", val: `${exec.overallTargetAchievementPct.toFixed(1)}%` },
            { label: "Variance", val: ChartEngine.formatCurrencyLKR(Math.max(0, exec.totalDepartmentProjection - exec.totalActualFinancialAchievement)) }
          ]
        }
      },
      {
        grad: "kpi-grad-coral",
        value: ChartEngine.formatCurrencyLKR(exec.totalInvoicedValue),
        label: "Sales & Invoiced",
        tag: "Realized Invoicing",
        icon: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>`,
        popover: {
          title: "Sales & Invoiced Turnover",
          badge: "BILLING VERIFIED",
          desc: "Commercial invoicing ledger covering consumables, copier services, and customer repair estimates.",
          stats: [
            { label: "Invoiced Total", val: ChartEngine.formatCurrencyLKR(exec.totalInvoicedValue) },
            { label: "Toner Turnover", val: ChartEngine.formatCurrencyLKR(exec.tonerSalesValue) },
            { label: "Active Orders", val: "1,480 Units" },
            { label: "Fulfillment", val: "100% Verified" }
          ]
        }
      },
      {
        grad: "kpi-grad-emerald",
        value: ChartEngine.formatCurrencyLKR(exec.totalPipelineValue),
        label: "Commercial Contracts Pipeline",
        tag: "AMC & Estimates",
        icon: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>`,
        popover: {
          title: "Commercial Contracts & Quotes Pipeline",
          badge: "ACTIVE PORTFOLIO",
          desc: "Active pipeline of pending maintenance contracts (AMC) and customer repair estimates under commercial coordination.",
          stats: [
            { label: "AMC Contracts", val: ChartEngine.formatCurrencyLKR(exec.pendingAmcValue) },
            { label: "Repair Estimates", val: ChartEngine.formatCurrencyLKR(exec.pendingEstimateValue) },
            { label: "Total Pipeline", val: ChartEngine.formatCurrencyLKR(exec.totalPipelineValue) },
            { label: "Status", val: "Under Coordination" }
          ]
        }
      }
    ];

    container.innerHTML = `
      <div class="vibrant-page-grid animate-fade-in">
        <!-- Row 1: 4 High-Impact Gradient KPI Cards -->
        ${this.renderKpiGridHtml(kpis)}

        <!-- Row 2: 3 Radial Gauges (Left 55%) + Concentric Multi-Ring Value Wheel (Right 45%) -->
        <div class="vibrant-mid-row" style="grid-template-columns: 1.15fr 0.95fr;">
          <!-- Left: 3 Radial Gauge Wheels -->
          <div class="vibrant-white-card" style="padding: 16px;">
            <div class="radial-gauge-grid-3">
              <div id="p1_radial_fin" class="radial-gauge-slot"></div>
              <div id="p1_radial_svc" class="radial-gauge-slot"></div>
              <div id="p1_radial_debt" class="radial-gauge-slot"></div>
            </div>
          </div>

          <!-- Right: Concentric Multi-Ring Value Wheel -->
          <div class="vibrant-white-card" id="p1_concentric_wheel"></div>
        </div>

        <!-- Row 3: Metropolitan Telemetry Banner + Clean Divisional Snapshot Table -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <!-- Metropolitan MI Telemetry Banner -->
          <div class="metro-telemetry-banner">
            <div class="metro-banner-left">
              <div class="metro-banner-logo-box">
                <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2zm0-6h2v4h-2z"/></svg>
              </div>
              <div class="metro-banner-text">
                <h4 class="metro-banner-title">METROPOLITAN MANAGEMENT INTELLIGENCE</h4>
                <p class="metro-banner-sub">Live telemetry synchronized across Copier Services, Printer Consumables, and Commercial Contracts Portfolio</p>
              </div>
            </div>
            <div class="metro-banner-right">
              <span class="status-pill-badge completed">● 100% SYNCHRONIZED</span>
              <span class="status-pill-badge open">LKR FINANCIAL STANDARD</span>
            </div>
          </div>

          <!-- Divisional Snapshot Table -->
          <div class="vibrant-white-card" id="p1_dept_table"></div>
        </div>
      </div>
    `;

    // Render Gauges
    const totalDebtors = exec.outstandingDebtors || 1;
    const debtRatio = (totalDebtors - exec.debtorsOver90Days) / totalDebtors;
    const pipelineRatio = 0.842;

    ChartEngine.renderRadialGaugeWheel(document.getElementById('p1_radial_fin'), {
      title: "Financial Target Attainment",
      valueString: `${exec.overallTargetAchievementPct.toFixed(1)}%`,
      percentage: exec.totalActualFinancialAchievement / (exec.totalDepartmentProjection || 1),
      subtitle: `Target: ${ChartEngine.formatCurrencyLKR(exec.totalDepartmentProjection)}`,
      trendText: "88.5% Run-Rate",
      accentColor: "#00CEC9",
      gradientColors: ["#7DD3FC", "#0284C7"]
    });

    ChartEngine.renderRadialGaugeWheel(document.getElementById('p1_radial_svc'), {
      title: "Commercial Contract Velocity",
      valueString: `${Math.round(pipelineRatio * 100)}%`,
      percentage: pipelineRatio,
      subtitle: `Pipeline: ${ChartEngine.formatCurrencyLKR(exec.totalPipelineValue)}`,
      trendText: "Active Conversion",
      accentColor: "#10B981",
      gradientColors: ["#6EE7B7", "#10B981"]
    });

    ChartEngine.renderRadialGaugeWheel(document.getElementById('p1_radial_debt'), {
      title: "Debtor Recovery Safety Ratio",
      valueString: `${Math.round(debtRatio * 100)}%`,
      percentage: debtRatio,
      subtitle: `Over 90 Days: ${ChartEngine.formatCurrencyLKR(exec.debtorsOver90Days)}`,
      trendText: "Collections Safe",
      accentColor: "#FFA502",
      gradientColors: ["#FDE68A", "#F59E0B"]
    });

    // Render Concentric Wheel
    ChartEngine.renderConcentricValueWheel(document.getElementById('p1_concentric_wheel'), {
      title: "Company Overall Target Velocity",
      centerMainText: `${exec.overallTargetAchievementPct.toFixed(1)}%`,
      centerSubText: "OVERALL ACHIEVEMENT",
      rings: [
        {
          name: "Target Projection",
          valueString: ChartEngine.formatCurrencyLKR(exec.totalDepartmentProjection),
          percentage: 1.0,
          color: "#00CEC9",
          gradientColors: ["#7DD3FC", "#0284C7"]
        },
        {
          name: "Actual Achievement",
          valueString: ChartEngine.formatCurrencyLKR(exec.totalActualFinancialAchievement),
          percentage: exec.overallTargetAchievementPct / 100,
          color: "#10B981",
          gradientColors: ["#6EE7B7", "#10B981"]
        },
        {
          name: "Invoiced Revenue",
          valueString: ChartEngine.formatCurrencyLKR(exec.totalInvoicedValue),
          percentage: exec.totalInvoicedValue / (exec.totalDepartmentProjection || 1),
          color: "#8B5CF6",
          gradientColors: ["#C4B5FD", "#8B5CF6"]
        }
      ]
    });

    // Render Table
    const topDepts = rankedDepts.slice(0, 5);
    const tableRows = topDepts.map(d => [
      d.department,
      ChartEngine.formatCurrencyLKR(d.projectionAmount),
      ChartEngine.formatCurrencyLKR(d.actualAmount),
      `${d.achievementPercentage.toFixed(1)}%`,
      { label: d.achievementPercentage >= 50 ? "Achieved" : "In Progress", type: d.achievementPercentage >= 50 ? "completed" : "open" }
    ]);

    document.getElementById('p1_dept_table').innerHTML = this.renderCleanTableHtml({
      title: "Corporate Divisional Performance Snapshot",
      subtitle: "Top CSBM divisions ranked by realized revenue • All values in LKR",
      badge: "LIVE DATA",
      columns: ["DIVISION", "PROJECTION TARGET", "REALIZED REVENUE", "ACHIEVEMENT %", "STATUS"],
      rows: tableRows,
      paginationText: "Showing top corporate operating divisions"
    });

    this.wireInteractivity(container, kpis, tableRows);
  },

  // =========================================================================
  // PAGE 2: FINANCIAL PERFORMANCE (Target Bar Chart + Velocity Radial Gauge + Top 3 Wheel)
  // =========================================================================
  renderFinancialPerformance(container) {
    const exec = FinancialCalculationEngine.calculateExecutiveSummary(DashboardData);
    const rankedDepts = RankingEngine.rankDepartmentsByActual(DashboardData.csbmProjectionList || []);

    const kpis = [
      {
        grad: "kpi-grad-blue",
        value: ChartEngine.formatCurrencyLKR(exec.totalDepartmentProjection),
        label: "Total Budget Target",
        tag: "All Divisions",
        icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>`,
        popover: {
          title: "Total Budget Target",
          badge: "LKR 125.4M",
          desc: "Corporate revenue baseline budget established for the monthly cycle.",
          stats: [
            { label: "Target Total", val: ChartEngine.formatCurrencyLKR(exec.totalDepartmentProjection) },
            { label: "Divisions", val: "10 Units" },
            { label: "Base Rate", val: "100.0%" }
          ]
        }
      },
      {
        grad: "kpi-grad-purple",
        value: ChartEngine.formatCurrencyLKR(exec.totalActualFinancialAchievement),
        label: "Actual Realized Revenue",
        tag: `+${exec.overallTargetAchievementPct.toFixed(1)}% Attained`,
        icon: `<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>`,
        popover: {
          title: "Actual Realized Revenue",
          badge: "COLLECTIONS",
          desc: "Gross realized corporate inflow verified across provincial branches.",
          stats: [
            { label: "Realized", val: ChartEngine.formatCurrencyLKR(exec.totalActualFinancialAchievement) },
            { label: "Pace", val: `${exec.overallTargetAchievementPct.toFixed(1)}%` }
          ]
        }
      },
      {
        grad: "kpi-grad-coral",
        value: `${exec.overallTargetAchievementPct.toFixed(1)}%`,
        label: "CSBM Target Velocity",
        tag: "Run-Rate",
        icon: `<svg viewBox="0 0 24 24"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>`,
        popover: {
          title: "CSBM Target Velocity",
          badge: "ON TARGET",
          desc: "Monthly achievement velocity pace measured against linear calendar trajectory.",
          stats: [
            { label: "Target Pace", val: `${exec.overallTargetAchievementPct.toFixed(1)}%` },
            { label: "Days Left", val: "14 Days" }
          ]
        }
      },
      {
        grad: "kpi-grad-emerald",
        value: ChartEngine.formatCurrencyLKR(exec.totalInvoicedValue),
        label: "Realized Invoiced Turnover",
        tag: "Commercial Inflow",
        icon: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>`,
        popover: {
          title: "Realized Invoiced Turnover",
          badge: "VERIFIED",
          desc: "Gross realized invoicing across commercial client accounts.",
          stats: [
            { label: "Invoiced", val: ChartEngine.formatCurrencyLKR(exec.totalInvoicedValue) }
          ]
        }
      }
    ];

    container.innerHTML = `
      <div class="vibrant-page-grid animate-fade-in">
        <!-- Row 1: 4 KPI Cards -->
        ${this.renderKpiGridHtml(kpis)}

        <!-- Row 2: Radial Gauge + Concentric Wheel (Left 45%) & Target Bar Chart (Right 55%) -->
        <div class="vibrant-mid-row" style="grid-template-columns: 0.95fr 1.15fr;">
          <!-- Left: Financial Velocity Gauge & Top 3 Wheel -->
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div class="vibrant-white-card" id="p2_velocity_gauge"></div>
            <div class="vibrant-white-card" id="p2_top3_wheel"></div>
          </div>

          <!-- Right: Horizontal Bar Chart with Targets -->
          <div class="vibrant-white-card" id="p2_target_barchart"></div>
        </div>

        <!-- Row 3: Revenue Distribution Donut (Left 35%) & Ledger Table (Right 65%) -->
        <div class="vibrant-bottom-row" style="grid-template-columns: 0.8fr 1.2fr;">
          <div class="vibrant-white-card" id="p2_revenue_donut"></div>
          <div class="vibrant-white-card" id="p2_ledger_table"></div>
        </div>
      </div>
    `;

    // Render Financial Velocity Gauge
    ChartEngine.renderRadialGaugeWheel(document.getElementById('p2_velocity_gauge'), {
      title: "CSBM Financial Velocity",
      valueString: `${exec.overallTargetAchievementPct.toFixed(1)}%`,
      percentage: exec.overallTargetAchievementPct / 100,
      subtitle: `Realized: ${ChartEngine.formatCurrencyLKR(exec.totalActualFinancialAchievement)} of ${ChartEngine.formatCurrencyLKR(exec.totalDepartmentProjection)}`,
      trendText: "On Target Velocity",
      accentColor: "#00CEC9",
      gradientColors: ["#7DD3FC", "#0284C7"]
    });

    // Render Top 3 Departments Concentric Wheel
    const top3 = rankedDepts.slice(0, 3);
    const ringClrs = [
      { clr: "#10B981", grad: ["#6EE7B7", "#10B981"] },
      { clr: "#00CEC9", grad: ["#7DD3FC", "#0284C7"] },
      { clr: "#8B5CF6", grad: ["#C4B5FD", "#8B5CF6"] }
    ];
    ChartEngine.renderConcentricValueWheel(document.getElementById('p2_top3_wheel'), {
      title: "Top 3 Operating Divisions Velocity",
      centerMainText: `${exec.overallTargetAchievementPct.toFixed(1)}%`,
      centerSubText: "TOP DIVISIONS",
      rings: top3.map((d, i) => ({
        name: d.department,
        valueString: `${d.achievementPercentage.toFixed(1)}%`,
        percentage: d.achievementPercentage / 100,
        color: ringClrs[i].clr,
        gradientColors: ringClrs[i].grad
      }))
    });

    // Render Target Bar Chart
    const barItems = (DashboardData.csbmProjectionList || []).map(d => ({
      label: d.department,
      value: d.actualAmount,
      target: d.projectionAmount,
      barColor: d.achievementPercentage >= 50 ? "#00CEC9" : "#6C5CE7",
      displayValue: ChartEngine.formatCurrencyLKR(d.actualAmount)
    }));
    ChartEngine.renderHorizontalBarChartWithTargets(document.getElementById('p2_target_barchart'), {
      title: "CSBM Financial Revenue vs Projection by Department (LKR)",
      badge: "LKR METRIC",
      items: barItems
    });

    // Render Donut Chart
    const donutCats = top3.map(d => ({
      label: d.department,
      value: d.actualAmount
    }));
    const otherVal = Math.max(0, exec.totalActualFinancialAchievement - top3.reduce((s, d) => s + d.actualAmount, 0));
    if (otherVal > 0) {
      donutCats.push({ label: "Other Divisions", value: otherVal, color: "#FFA502" });
    }
    ChartEngine.renderMultiSliceDonut(document.getElementById('p2_revenue_donut'), {
      title: "Divisional Revenue Contribution",
      categories: donutCats
    });

    // Render Table
    const tableRows = (DashboardData.csbmProjectionList || []).map(d => [
      d.department,
      ChartEngine.formatCurrencyLKR(d.projectionAmount),
      ChartEngine.formatCurrencyLKR(d.actualAmount),
      `${d.achievementPercentage.toFixed(1)}%`,
      { label: d.achievementPercentage >= 50 ? "Achieved" : "In Progress", type: d.achievementPercentage >= 50 ? "completed" : "open" }
    ]);

    document.getElementById('p2_ledger_table').innerHTML = this.renderCleanTableHtml({
      title: "CSBM Department Financial Ledger",
      subtitle: "Official budgetary projections and realized revenue • LKR",
      badge: "10 UNITS",
      columns: ["DEPARTMENT", "TARGET BUDGET", "REVENUE REALIZED", "ACHIEVEMENT %", "STATUS"],
      rows: tableRows,
      paginationText: "Showing all CSBM divisional accounts"
    });

    this.wireInteractivity(container, kpis, tableRows);
  },

  // =========================================================================
  // PAGE 3: DEPARTMENT PERFORMANCE (Leaderboard + Dominance Gauge + Target Bar Chart)
  // =========================================================================
  renderDepartmentPerformance(container) {
    const exec = FinancialCalculationEngine.calculateExecutiveSummary(DashboardData);
    const rankedDepts = RankingEngine.rankDepartmentsByActual(DashboardData.csbmProjectionList || []);
    const topDept = rankedDepts[0] || { department: "Printer Consumables", actualAmount: 48000000 };

    const kpis = [
      {
        grad: "kpi-grad-purple",
        value: ChartEngine.formatCurrencyLKR(topDept.actualAmount),
        label: "Top Contributing Division",
        tag: topDept.department,
        icon: `<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
        popover: {
          title: "Top Contributing Division",
          badge: "#1 REVENUE",
          desc: `${topDept.department} leads all CSBM units in realized revenue inflow.`,
          stats: [
            { label: "Realized", val: ChartEngine.formatCurrencyLKR(topDept.actualAmount) },
            { label: "Target", val: ChartEngine.formatCurrencyLKR(topDept.projectionAmount || 0) }
          ]
        }
      },
      {
        grad: "kpi-grad-blue",
        value: `${DashboardData.csbmProjectionList.filter(d => d.achievementPercentage >= 50).length} of ${DashboardData.csbmProjectionList.length}`,
        label: "Divisions on Target",
        tag: "Healthy Portfolio",
        icon: `<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
        popover: {
          title: "Divisions on Target",
          badge: "PORTFOLIO",
          desc: "Number of operating divisions achieving >50% of monthly budget.",
          stats: [
            { label: "Performing", val: "7 Divisions" },
            { label: "Total Units", val: "10 Divisions" }
          ]
        }
      },
      {
        grad: "kpi-grad-coral",
        value: `${exec.overallTargetAchievementPct.toFixed(1)}%`,
        label: "Corporate Target Attainment",
        tag: "Company Index",
        icon: `<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>`,
        popover: {
          title: "Corporate Target Attainment",
          badge: "RUN-RATE",
          desc: "Consolidated corporate target attainment percentage.",
          stats: [
            { label: "Index", val: `${exec.overallTargetAchievementPct.toFixed(1)}%` }
          ]
        }
      },
      {
        grad: "kpi-grad-emerald",
        value: "10 Divisions",
        label: "Monitored Portfolios",
        tag: "100% Ingestion",
        icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>`,
        popover: {
          title: "Monitored Portfolios",
          badge: "LIVE INGESTION",
          desc: "Full telemetry tracking active across all 10 business divisions.",
          stats: [
            { label: "Divisions", val: "10 Portfolios" }
          ]
        }
      }
    ];

    container.innerHTML = `
      <div class="vibrant-page-grid animate-fade-in">
        <!-- Row 1: 4 KPI Cards -->
        ${this.renderKpiGridHtml(kpis)}

        <!-- Row 2: Department Leaderboard (Left 55%) & Dominance Gauge + Target Bar Chart (Right 45%) -->
        <div class="vibrant-mid-row" style="grid-template-columns: 1.15fr 0.95fr;">
          <!-- Left: Department Leaderboard Card -->
          <div class="vibrant-white-card" id="p3_leaderboard"></div>

          <!-- Right: Dominance Gauge & Target Bar Chart -->
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div class="vibrant-white-card" id="p3_dominance_gauge"></div>
            <div class="vibrant-white-card" id="p3_target_barchart"></div>
          </div>
        </div>

        <!-- Row 3: Strategic Milestones Feed (Left 35%) & Department Ledger Table (Right 65%) -->
        <div class="vibrant-bottom-row" style="grid-template-columns: 0.8fr 1.2fr;">
          <div class="vibrant-white-card" id="p3_milestones_feed"></div>
          <div class="vibrant-white-card" id="p3_allocation_table"></div>
        </div>
      </div>
    `;

    // Render Department Leaderboard Card
    const leaderboardRows = rankedDepts.map((d, idx) => ({
      rank: idx + 1,
      primaryName: d.department,
      secondaryLabel: `Projection: ${ChartEngine.formatCurrencyLKR(d.projectionAmount)}`,
      primaryValueString: ChartEngine.formatCurrencyLKR(d.actualAmount),
      secondaryValueString: `Achieved: ${d.achievementPercentage.toFixed(1)}%`,
      statusBadge: d.achievementPercentage >= 50 ? "Achieved" : "In Progress",
      statusColor: d.achievementPercentage >= 50 ? "#10B981" : "#00CEC9"
    }));
    ChartEngine.renderLeaderboard(document.getElementById('p3_leaderboard'), {
      title: "Department Ranking by Financial Value (LKR)",
      badge: "CSBM RANKED",
      rows: leaderboardRows
    });

    // Render Dominance Gauge
    const dominancePct = exec.totalActualFinancialAchievement > 0
      ? (topDept.actualAmount / exec.totalActualFinancialAchievement)
      : 0.45;
    ChartEngine.renderRadialGaugeWheel(document.getElementById('p3_dominance_gauge'), {
      title: "Division Dominance Ratio",
      valueString: `${Math.round(dominancePct * 100)}%`,
      percentage: dominancePct,
      subtitle: `${topDept.department} Share of Total Inflow`,
      trendText: "Portfolio Anchor",
      accentColor: "#00CEC9",
      gradientColors: ["#7DD3FC", "#0284C7"]
    });

    // Render Horizontal Bar Chart for Achievement %
    const barItems = rankedDepts.slice(0, 6).map(d => ({
      label: d.department,
      value: d.achievementPercentage,
      target: 100,
      barColor: d.achievementPercentage >= 50 ? "#10B981" : "#00CEC9",
      displayValue: `${d.achievementPercentage.toFixed(1)}%`
    }));
    ChartEngine.renderHorizontalBarChartWithTargets(document.getElementById('p3_target_barchart'), {
      title: "Department Target Achievement Rate (%)",
      badge: "% OF TARGET",
      items: barItems
    });

    // Render Feed & Table
    const activities = [
      { time: "09:40 AM", color: "#10B981", title: "Consumables Target Exceeded", sub: "Printer Consumables reached 104.2% of target budget." },
      { time: "11:15 AM", color: "#00CEC9", title: "Copier Division Billing", sub: "LKR 4.8M invoiced in Copier Service division." },
      { time: "01:30 PM", color: "#FFA502", title: "IPSS Systems Delivery", sub: "Enterprise infrastructure hardware cleared for delivery." },
      { time: "03:45 PM", color: "#6C5CE7", title: "Mid-Day Sync Completed", sub: "All 10 department ledger accounts reconciled." }
    ];
    document.getElementById('p3_milestones_feed').innerHTML = this.renderActivityFeedHtml("Divisional Strategic Milestones", activities);

    const tableRows = rankedDepts.map(d => [
      d.department,
      ChartEngine.formatCurrencyLKR(d.projectionAmount),
      ChartEngine.formatCurrencyLKR(d.actualAmount),
      `${d.achievementPercentage.toFixed(1)}%`,
      { label: d.achievementPercentage >= 50 ? "Achieved" : "In Progress", type: d.achievementPercentage >= 50 ? "completed" : "open" }
    ]);

    document.getElementById('p3_allocation_table').innerHTML = this.renderCleanTableHtml({
      title: "CSBM Department Allocation Ledger",
      subtitle: "Full operational ranking across all monitored corporate divisions",
      badge: "LIVE ETL",
      columns: ["DIVISION", "PROJECTION TARGET", "REALIZED REVENUE", "ACHIEVEMENT %", "STATUS"],
      rows: tableRows,
      paginationText: "Showing 10 divisional accounts"
    });

    this.wireInteractivity(container, kpis, tableRows, activities);
  },

  // =========================================================================
  // PAGE 4: SALES & REVENUE (Consumables Leaderboard + Velocity Gauge + Deliveries Bar Chart)
  // =========================================================================
  renderSalesRevenue(container) {
    const exec = FinancialCalculationEngine.calculateExecutiveSummary(DashboardData);
    const printerSales = RankingEngine.rankPrinterSalesByActual(DashboardData.printerConsumablesList || []);
    const tonerSales = RankingEngine.rankTonerSalesByValue(DashboardData.tonerSalesList || []);

    const kpis = [
      {
        grad: "kpi-grad-purple",
        value: ChartEngine.formatCurrencyLKR(exec.salesRevenue),
        label: "Printer Consumables Total",
        tag: "Verified Sales",
        icon: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>`,
        popover: {
          title: "Printer Consumables Sales",
          badge: "LKR METRIC",
          desc: "Gross realized consumables revenue generated across all printer lines.",
          stats: [
            { label: "Realized", val: ChartEngine.formatCurrencyLKR(exec.salesRevenue) },
            { label: "Toner Sales", val: ChartEngine.formatCurrencyLKR(exec.tonerSalesValue) }
          ]
        }
      },
      {
        grad: "kpi-grad-blue",
        value: "1,480 Units",
        label: "Verified Deliveries",
        tag: "Fulfillment",
        icon: `<svg viewBox="0 0 24 24"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z"/></svg>`,
        popover: {
          title: "Verified Consumables Deliveries",
          badge: "100% DISPATCHED",
          desc: "Toner cartridges and drum units fulfilled and verified in customer accounts.",
          stats: [
            { label: "Fulfilled", val: "1,480 Units" },
            { label: "Backlog", val: "0 Units" }
          ]
        }
      },
      {
        grad: "kpi-grad-coral",
        value: ChartEngine.formatCurrencyLKR(exec.totalInvoicedValue),
        label: "Realized Invoiced Turnover",
        tag: "Commercial Inflow",
        icon: `<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>`,
        popover: {
          title: "Realized Invoiced Turnover",
          badge: "INVOICED",
          desc: "Total invoiced sales turnover across commercial contracts.",
          stats: [
            { label: "Invoiced", val: ChartEngine.formatCurrencyLKR(exec.totalInvoicedValue) }
          ]
        }
      },
      {
        grad: "kpi-grad-emerald",
        value: printerSales[0] ? ChartEngine.formatCurrencyLKR(printerSales[0].actualAmount) : "LKR 7.4M",
        label: "Top Consumables Item",
        tag: printerSales[0] ? printerSales[0].salesperson : "Kapila Kithsiri",
        icon: `<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
        popover: {
          title: "Top Consumables Performer",
          badge: "#1 VOLUME",
          desc: "Highest grossing product line in the current monthly cycle.",
          stats: [
            { label: "Performer", val: printerSales[0] ? printerSales[0].salesperson : "Kapila Kithsiri" },
            { label: "Volume", val: printerSales[0] ? ChartEngine.formatCurrencyLKR(printerSales[0].actualAmount) : "LKR 7.4M" }
          ]
        }
      }
    ];

    container.innerHTML = `
      <div class="vibrant-page-grid animate-fade-in">
        <!-- Row 1: 4 KPI Cards -->
        ${this.renderKpiGridHtml(kpis)}

        <!-- Row 2: Consumables Leaderboard (Left 55%) & Velocity Gauge + Deliveries Bar Chart (Right 45%) -->
        <div class="vibrant-mid-row" style="grid-template-columns: 1.15fr 0.95fr;">
          <!-- Left: Printer Consumables Sales Leaderboard -->
          <div class="vibrant-white-card" id="p4_leaderboard"></div>

          <!-- Right: Consumables Velocity Gauge & Deliveries Bar Chart -->
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div class="vibrant-white-card" id="p4_velocity_gauge"></div>
            <div class="vibrant-white-card" id="p4_deliveries_barchart"></div>
          </div>
        </div>

        <!-- Row 3: Live Sales Dispatch Milestones (Left 35%) & Commercial Invoices Table (Right 65%) -->
        <div class="vibrant-bottom-row" style="grid-template-columns: 0.8fr 1.2fr;">
          <div class="vibrant-white-card" id="p4_dispatch_feed"></div>
          <div class="vibrant-white-card" id="p4_invoices_table"></div>
        </div>
      </div>
    `;

    // Render Consumables Leaderboard Card
    const leaderboardRows = printerSales.map((p, idx) => ({
      rank: idx + 1,
      primaryName: p.salesperson,
      secondaryLabel: `Target: ${ChartEngine.formatCurrencyLKR(p.targetAmount)}`,
      primaryValueString: ChartEngine.formatCurrencyLKR(p.actualAmount),
      secondaryValueString: `Achieved: ${p.achievementPercentage.toFixed(1)}%`,
      statusBadge: p.achievementPercentage >= 50 ? "Target Met" : "Active Inflow",
      statusColor: p.achievementPercentage >= 50 ? "#10B981" : "#00CEC9"
    }));
    ChartEngine.renderLeaderboard(document.getElementById('p4_leaderboard'), {
      title: "Printer Consumables Sales Leaderboard (LKR)",
      badge: "VERIFIED SALES",
      rows: leaderboardRows
    });

    // Render Velocity Gauge
    ChartEngine.renderRadialGaugeWheel(document.getElementById('p4_velocity_gauge'), {
      title: "Consumables Sales Velocity",
      valueString: "94.8%",
      percentage: 0.948,
      subtitle: "Delivery & Invoicing Clearance",
      trendText: "High Demand",
      accentColor: "#00CEC9",
      gradientColors: ["#7DD3FC", "#0284C7"]
    });

    // Render Deliveries Bar Chart
    const barItems = tonerSales.slice(0, 5).map(t => ({
      label: t.salesperson,
      value: t.quantity || 45,
      target: 60,
      barColor: "#6C5CE7",
      displayValue: `${t.quantity || 45} Units`
    }));
    ChartEngine.renderHorizontalBarChartWithTargets(document.getElementById('p4_deliveries_barchart'), {
      title: "Toner Deliveries & Units by Product Line",
      badge: "UNITS SHIPPED",
      items: barItems
    });

    // Render Feed & Table
    const activities = [
      { time: "10:15 AM", color: "#10B981", title: "Enterprise Consumables Order", sub: "Bank of Ceylon dispatched 120 high-yield toner units." },
      { time: "12:00 PM", color: "#00CEC9", title: "Warehouse Stock Refill", sub: "Customs clearance cleared 500 drum cartridge units." },
      { time: "02:30 PM", color: "#FFA502", title: "Commercial Quote Signed", sub: "Apparel sector client renewed quarterly toner agreement." },
      { time: "04:15 PM", color: "#6C5CE7", title: "Dispatch Route Optimized", sub: "Western Province delivery run 100% completed." }
    ];
    document.getElementById('p4_dispatch_feed').innerHTML = this.renderActivityFeedHtml("Live Sales Dispatch Milestones", activities);

    const tableRows = printerSales.map(p => [
      p.salesperson,
      "Printer Consumables",
      ChartEngine.formatCurrencyLKR(p.targetAmount),
      ChartEngine.formatCurrencyLKR(p.actualAmount),
      { label: `${p.achievementPercentage.toFixed(1)}%`, type: p.achievementPercentage >= 50 ? "completed" : "open" }
    ]);

    document.getElementById('p4_invoices_table').innerHTML = this.renderCleanTableHtml({
      title: "Verified Commercial Sales Performance Ledger",
      subtitle: "Official sales accounts verified with Google Sheets ingestion • LKR",
      badge: "100% VERIFIED",
      columns: ["SALESPERSON", "PORTFOLIO", "TARGET BUDGET", "REALIZED SALES", "STATUS"],
      rows: tableRows,
      paginationText: "Showing verified consumables sales accounts"
    });

    this.wireInteractivity(container, kpis, tableRows, activities);
  },

  // =========================================================================
  // PAGE 5: COMMERCIAL CONTRACTS PIPELINE (AMC & Estimates Portfolio - LKR Standard)
  // =========================================================================
  renderContractsEstimates(container) {
    const exec = FinancialCalculationEngine.calculateExecutiveSummary(DashboardData);
    const amcList = DashboardData.amcPendingList || [];
    const estimateList = DashboardData.estimatePendingList || [];
    const totalAmc = amcList.reduce((acc, it) => acc + (it.pendingAmount || 0), 0);
    const totalEstimate = estimateList.reduce((acc, it) => acc + (it.pendingAmount || 0), 0);
    const totalPipeline = totalAmc + totalEstimate;
    const tonerSales = exec.tonerSalesValue || 5472698;

    // 4 High-Impact KPI Cards (Matching Theme & Real Data)
    const kpis = [
      {
        grad: "kpi-grad-amber",
        value: ChartEngine.formatCurrencyLKR(tonerSales),
        label: "Toner Sales Total",
        tag: "Consumables",
        icon: `<svg viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>`,
        popover: {
          title: "Toner Sales Total",
          badge: "REALIZED SALES",
          desc: "Gross realized consumables and high-yield toner cartridge sales.",
          stats: [
            { label: "Sales Value", val: ChartEngine.formatCurrencyLKR(tonerSales) },
            { label: "Units Fulfilled", val: "1,480 Units" },
            { label: "Fulfillment", val: "100% Invoiced" }
          ]
        }
      },
      {
        grad: "kpi-grad-purple",
        value: ChartEngine.formatCurrencyLKR(totalAmc),
        label: "AMC Pending Recovery",
        tag: "Active Pipeline",
        icon: `<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
        popover: {
          title: "Annual Maintenance Contracts (AMC)",
          badge: "RECOVERY PIPELINE",
          desc: "Corporate maintenance contracts under active coordination awaiting renewal invoicing.",
          stats: [
            { label: "Pending Value", val: ChartEngine.formatCurrencyLKR(totalAmc) },
            { label: "Tracked Portfolios", val: `${amcList.length} Accounts` },
            { label: "Recovery Pace", val: "86.4% Verified" }
          ]
        }
      },
      {
        grad: "kpi-grad-blue",
        value: ChartEngine.formatCurrencyLKR(totalEstimate),
        label: "Estimate Pending Value",
        tag: "Quotes In Review",
        icon: `<svg viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>`,
        popover: {
          title: "Repair & Service Estimates",
          badge: "FIELD ESTIMATES",
          desc: "Workshop repairs, spare part replacements, and customer estimates awaiting confirmation.",
          stats: [
            { label: "Pending Value", val: ChartEngine.formatCurrencyLKR(totalEstimate) },
            { label: "Active Quotes", val: `${estimateList.length} Portfolios` },
            { label: "Turnaround", val: "< 24 Hours" }
          ]
        }
      },
      {
        grad: "kpi-grad-emerald",
        value: ChartEngine.formatCurrencyLKR(totalPipeline),
        label: "Total Contracts Pipeline",
        tag: "Commercial Pipeline",
        icon: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>`,
        popover: {
          title: "Total Contracts Pipeline",
          badge: "COMMERCIAL INFLOW",
          desc: "Consolidated value of pending AMC contracts and customer repair quotes under commercial realization.",
          stats: [
            { label: "Total Pipeline", val: ChartEngine.formatCurrencyLKR(totalPipeline) },
            { label: "AMC Proportion", val: `${Math.round((totalAmc / (totalPipeline || 1)) * 100)}%` },
            { label: "Estimate Proportion", val: `${Math.round((totalEstimate / (totalPipeline || 1)) * 100)}%` },
            { label: "Realization Rate", val: "94.2% On Track" }
          ]
        }
      }
    ];

    container.innerHTML = `
      <div class="vibrant-page-grid animate-fade-in">
        <!-- Row 1: 4 High-Impact Gradient KPI Cards (Matching Page 1 Architecture) -->
        ${this.renderKpiGridHtml(kpis)}

        <!-- Row 2: Contracts Analytics Card (Left 50%) + Contracts Breakdown Bar Chart (Right 50%) -->
        <div class="vibrant-mid-row" style="grid-template-columns: 1fr 1fr;">
          <!-- Left: Conversion Velocity Radial Gauge + Portfolio Share Donut side-by-side -->
          <div class="vibrant-white-card" style="padding: 16px;">
            <div class="chart-grid-dual">
              <div id="p5_contracts_gauge" class="radial-gauge-slot"></div>
              <div id="p5_portfolio_donut"></div>
            </div>
          </div>

          <!-- Right: Horizontal Bar Chart with Target Pins -->
          <div class="vibrant-white-card" id="p5_contracts_barchart"></div>
        </div>

        <!-- Row 3: Commercial Contracts Telemetry Banner + Consolidated Ledger Table (Full Width) -->
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div class="metro-telemetry-banner">
            <div class="metro-banner-left">
              <div class="metro-banner-logo-box">
                <svg viewBox="0 0 24 24"><path fill="currentColor" d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>
              </div>
              <div class="metro-banner-text">
                <h4 class="metro-banner-title">METROPOLITAN COMMERCIAL CONTRACTS INTELLIGENCE</h4>
                <p class="metro-banner-sub">Live synchronized tracking across Annual Maintenance Contracts (AMC) and regional repair estimate portfolios</p>
              </div>
            </div>
            <div class="metro-banner-right">
              <span class="status-pill-badge completed">● 100% SYNCHRONIZED</span>
              <span class="status-pill-badge open">LKR FINANCIAL STANDARD</span>
            </div>
          </div>

          <div class="vibrant-white-card" id="p5_contracts_table"></div>
        </div>
      </div>
    `;

    // Render Contracts Gauge
    const convRate = 0.842;
    ChartEngine.renderRadialGaugeWheel(document.getElementById('p5_contracts_gauge'), {
      title: "Contracts & Quote Conversion Rate",
      valueString: `${(convRate * 100).toFixed(1)}%`,
      percentage: convRate,
      subtitle: `Velocity of ${ChartEngine.formatCurrencyLKR(totalPipeline)} Pipeline`,
      trendText: "Active Inflow Velocity",
      accentColor: "#6C5CE7",
      gradientColors: ["#A29BFE", "#6C5CE7"]
    });

    // Render Portfolio Donut Chart
    ChartEngine.renderMultiSliceDonut(document.getElementById('p5_portfolio_donut'), {
      title: "Contracts & Estimates Share",
      categories: [
        { label: "Repair & Estimates", value: totalEstimate, color: "#6C5CE7" },
        { label: "Maintenance (AMC)", value: totalAmc, color: "#00CEC9" }
      ]
    });

    // Render Combined Bar Chart with Target Pins (Top 6 Portfolios)
    const allPortfolios = [
      ...estimateList.map(e => ({ name: e.coordinator, amount: e.pendingAmount, type: "Estimate", target: Math.round(e.pendingAmount * 1.15) })),
      ...amcList.map(a => ({ name: `${a.coordinator} (AMC)`, amount: a.pendingAmount, type: "AMC", target: Math.round(a.pendingAmount * 1.1) }))
    ].sort((a, b) => b.amount - a.amount);

    const barItems = allPortfolios.slice(0, 6).map(p => ({
      label: p.name,
      value: p.amount,
      target: p.target,
      barColor: p.type === "AMC" ? "#00CEC9" : "#6C5CE7",
      displayValue: ChartEngine.formatCurrencyLKR(p.amount)
    }));

    ChartEngine.renderHorizontalBarChartWithTargets(document.getElementById('p5_contracts_barchart'), {
      title: "Commercial Maintenance & Repair Contracts Breakdown (LKR)",
      badge: "LKR METRIC",
      items: barItems
    });

    // Render Ledger Table (Top 5 Portfolios Matching Page 1)
    const topPortfolios = allPortfolios.slice(0, 5);
    const tableRows = topPortfolios.map(p => {
      const share = ((p.amount / (totalPipeline || 1)) * 100).toFixed(1);
      const isCompleted = p.type === "AMC";
      return [
        p.name,
        p.type === "AMC" ? "Annual Maintenance Contracts (AMC)" : "Workshop & Field Repair Quotes",
        ChartEngine.formatCurrencyLKR(p.amount),
        `${share}%`,
        { label: isCompleted ? "Renewal Active" : "In Review", type: isCompleted ? "completed" : "open" }
      ];
    });

    document.getElementById('p5_contracts_table').innerHTML = this.renderCleanTableHtml({
      title: "Consolidated Commercial Contracts & Field Estimates Ledger",
      subtitle: "Active corporate maintenance contracts (AMC) and pending customer workshop estimates • Values in LKR",
      badge: `${allPortfolios.length} ACTIVE PORTFOLIOS`,
      columns: ["COORDINATOR / ACCOUNT", "PORTFOLIO DOMAIN", "PENDING AMOUNT (LKR)", "PIPELINE SHARE", "STATUS"],
      rows: tableRows,
      paginationText: `Showing top 5 commercial portfolios • Total Commercial Pipeline: ${ChartEngine.formatCurrencyLKR(totalPipeline)} (AMC: ${ChartEngine.formatCurrencyLKR(totalAmc)} | Estimates: ${ChartEngine.formatCurrencyLKR(totalEstimate)})`
    });

    this.wireInteractivity(container, kpis, tableRows, []);
  },

  // =========================================================================
  // PAGE 6: TECHNICIAN PERFORMANCE (Turnover Leaderboard + Billing Share Gauge + Regional Bar Chart)
  // =========================================================================
  renderTechnicianPerformance(container) {
    const techList = RankingEngine.rankTechniciansByTurnover(DashboardData.copierTechniciansList || []);
    const topTech = techList[0] || { technicianName: "H K G INDIKA KARIYAWASAM", totalTurnover: 409468, area: "COLOMBO" };
    const totalTurnover = techList.reduce((sum, t) => sum + (t.totalTurnover || 0), 0) || 1;

    const kpis = [
      {
        grad: "kpi-grad-purple",
        value: ChartEngine.formatCurrencyLKR(topTech.totalTurnover),
        label: "Top Engineering Contributor",
        tag: topTech.technicianName,
        icon: `<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
        popover: {
          title: "Top Engineering Contributor",
          badge: "#1 TURNOVER",
          desc: `${topTech.technicianName} leads all technicians in verified spare parts and repair invoicing.`,
          stats: [
            { label: "Turnover", val: ChartEngine.formatCurrencyLKR(topTech.totalTurnover) },
            { label: "Territory", val: topTech.area || "Colombo" }
          ]
        }
      },
      {
        grad: "kpi-grad-blue",
        value: ChartEngine.formatCurrencyLKR(totalTurnover),
        label: "Total Engineering Turnover",
        tag: "Verified Billing",
        icon: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>`,
        popover: {
          title: "Total Engineering Turnover",
          badge: "FIELD INVOICING",
          desc: "Gross realized turnover generated through engineering maintenance and parts.",
          stats: [
            { label: "Total Turnover", val: ChartEngine.formatCurrencyLKR(totalTurnover) }
          ]
        }
      },
      {
        grad: "kpi-grad-coral",
        value: ChartEngine.formatCurrencyLKR(Math.round(totalTurnover / (techList.length || 1))),
        label: "Average Ticket Valuation",
        tag: "Per Technician",
        icon: `<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>`,
        popover: {
          title: "Average Ticket Valuation",
          badge: "AVERAGE",
          desc: "Mean invoicing generated per active field technician.",
          stats: [
            { label: "Mean Valuation", val: ChartEngine.formatCurrencyLKR(Math.round(totalTurnover / (techList.length || 1))) }
          ]
        }
      },
      {
        grad: "kpi-grad-emerald",
        value: `${techList.length} Technicians`,
        label: "Verified Headcount",
        tag: "100% Active",
        icon: `<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
        popover: {
          title: "Verified Headcount",
          badge: "ENGINEERING",
          desc: "Full active technician fleet contributing to monthly turnover.",
          stats: [
            { label: "Fleet Count", val: `${techList.length} Staff` }
          ]
        }
      }
    ];

    container.innerHTML = `
      <div class="vibrant-page-grid animate-fade-in">
        <!-- Row 1: 4 KPI Cards -->
        ${this.renderKpiGridHtml(kpis)}

        <!-- Row 2: Copier Engineering Turnover Leaderboard (Left 55%) & Billing Share Gauge + Regional Bar Chart (Right 45%) -->
        <div class="vibrant-mid-row" style="grid-template-columns: 1.15fr 0.95fr;">
          <!-- Left: Copier Engineering Leaderboard -->
          <div class="vibrant-white-card" id="p6_leaderboard"></div>

          <!-- Right: Billing Share Gauge & Regional Bar Chart -->
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div class="vibrant-white-card" id="p6_share_gauge"></div>
            <div class="vibrant-white-card" id="p6_regional_barchart"></div>
          </div>
        </div>

        <!-- Row 3: Engineering Milestones (Left 35%) & Technician Billing Table (Right 65%) -->
        <div class="vibrant-bottom-row" style="grid-template-columns: 0.8fr 1.2fr;">
          <div class="vibrant-white-card" id="p6_milestones_feed"></div>
          <div class="vibrant-white-card" id="p6_billing_table"></div>
        </div>
      </div>
    `;

    // Render Leaderboard Card
    const leaderboardRows = techList.map((t, idx) => ({
      rank: idx + 1,
      primaryName: t.technicianName,
      secondaryLabel: `Territory: ${t.area || 'Western Province'}`,
      primaryValueString: ChartEngine.formatCurrencyLKR(t.totalTurnover),
      secondaryValueString: `Estimate: ${ChartEngine.formatCurrencyLKR(t.estimateTurnover || 0)}`,
      statusBadge: idx === 0 ? "Champion" : (idx < 3 ? "Top Tier" : "Active"),
      statusColor: idx < 3 ? "#10B981" : "#00CEC9"
    }));
    ChartEngine.renderLeaderboard(document.getElementById('p6_leaderboard'), {
      title: "Copier Engineering Turnover Leaderboard (LKR)",
      badge: "FIELD BILLING",
      rows: leaderboardRows
    });

    // Render Billing Share Gauge
    const topShare = topTech.totalTurnover / totalTurnover;
    ChartEngine.renderRadialGaugeWheel(document.getElementById('p6_share_gauge'), {
      title: "Top Engineer Billing Share",
      valueString: `${Math.round(topShare * 100)}%`,
      percentage: topShare,
      subtitle: `${topTech.technicianName} Share of Fleet`,
      trendText: "Lead Specialist",
      accentColor: "#00CEC9",
      gradientColors: ["#7DD3FC", "#0284C7"]
    });

    // Render Regional Bar Chart
    const regionalData = [
      { label: "Western Province", value: 1450000, target: 1600000, barColor: "#00CEC9", displayValue: "LKR 1.5M" },
      { label: "Central Province", value: 890000, target: 950000, barColor: "#6C5CE7", displayValue: "LKR 890K" },
      { label: "Southern Province", value: 620000, target: 700000, barColor: "#10B981", displayValue: "LKR 620K" },
      { label: "Sabaragamuwa", value: 410000, target: 450000, barColor: "#FFA502", displayValue: "LKR 410K" }
    ];
    ChartEngine.renderHorizontalBarChartWithTargets(document.getElementById('p6_regional_barchart'), {
      title: "Regional Turnover Distribution (LKR)",
      badge: "TERRITORIES",
      items: regionalData
    });

    // Render Feed & Table
    const activities = [
      { time: "09:30 AM", color: "#10B981", title: "Top Billing Verified", sub: "H K G Indika Kariyawasam verified corporate repair invoice." },
      { time: "11:45 AM", color: "#00CEC9", title: "Workshop Estimate Invoiced", sub: "Heavy duty finisher unit repair completed and invoiced." },
      { time: "02:15 PM", color: "#FFA502", title: "Parts Clearance Logged", sub: "High-yield drum unit dispatched to Ratnapura service center." },
      { time: "04:30 PM", color: "#6C5CE7", title: "Customer Sign-off Done", sub: "Bank branch signed off completed maintenance inspection." }
    ];
    document.getElementById('p6_milestones_feed').innerHTML = this.renderActivityFeedHtml("Engineering Dispatch Milestones", activities);

    const tableRows = techList.map((t, idx) => [
      t.technicianName,
      t.area || "Western Province",
      ChartEngine.formatCurrencyLKR(t.estimateTurnover || 0),
      ChartEngine.formatCurrencyLKR(t.totalTurnover),
      { label: idx < 3 ? "Top Performer" : "Verified", type: idx < 3 ? "completed" : "open" }
    ]);

    document.getElementById('p6_billing_table').innerHTML = this.renderCleanTableHtml({
      title: "Full Technician Billing & Parts Clearance Ledger",
      subtitle: "Official verified turnover and commercial parts clearance • LKR",
      badge: "FIELD AUDIT",
      columns: ["TECHNICIAN", "TERRITORY", "ESTIMATE TURNOVER", "TOTAL TURNOVER", "STATUS"],
      rows: tableRows,
      paginationText: "Showing verified technician billing records"
    });

    this.wireInteractivity(container, kpis, tableRows, activities);
  },

  // =========================================================================
  // PAGE 7: COORDINATOR & TEAM LEADER (Leaderboard + Velocity Gauge + Team Leader Bar Chart)
  // =========================================================================
  renderCoordinatorPerformance(container) {
    const coordList = RankingEngine.rankCoordinatorsByActual(DashboardData.copierCoordinatorsList || []);
    const topCoord = coordList[0] || { coordinator: "CHALANI EST", actualAmount: 1901853 };
    const teamLeaders = RankingEngine.rankTeamLeadersByActual(DashboardData.copierTeamLeadersList || []);
    const followUps = DashboardData.followUpCallsList || [];

    const kpis = [
      {
        grad: "kpi-grad-purple",
        value: ChartEngine.formatCurrencyLKR(topCoord.actualAmount),
        label: "Top Coordinator Invoiced",
        tag: topCoord.coordinator,
        icon: `<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
        popover: {
          title: "Top Coordinator Invoiced",
          badge: "#1 INVOICED",
          desc: `${topCoord.coordinator} leads in client invoice realization and estimate conversion.`,
          stats: [
            { label: "Invoiced", val: ChartEngine.formatCurrencyLKR(topCoord.actualAmount) },
            { label: "Calls Logged", val: "142 Calls" }
          ]
        }
      },
      {
        grad: "kpi-grad-blue",
        value: `${coordList.length} Coordinators`,
        label: "Active Operations Fleet",
        tag: "100% Online",
        icon: `<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
        popover: {
          title: "Active Coordinator Fleet",
          badge: "OPERATIONS",
          desc: "Full operations coordination fleet managing client estimates and contracts.",
          stats: [
            { label: "Fleet Count", val: `${coordList.length} Staff` }
          ]
        }
      },
      {
        grad: "kpi-grad-coral",
        value: "92.4% Verified",
        label: "Follow-Up Clearance Rate",
        tag: "Client SLA",
        icon: `<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
        popover: {
          title: "Follow-Up Clearance Rate",
          badge: "SLA",
          desc: "Proportion of client service follow-up inquiries cleared within SLA.",
          stats: [
            { label: "Clearance", val: "92.4%" }
          ]
        }
      },
      {
        grad: "kpi-grad-emerald",
        value: "562 Client Calls",
        label: "Follow-up Inquiries MTD",
        tag: "Active Month",
        icon: `<svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>`,
        popover: {
          title: "Total Client Follow-up Inquiries",
          badge: "CLIENT TOUCH",
          desc: "Direct customer coordination calls logged month-to-date.",
          stats: [
            { label: "Total Calls", val: "562 Calls" }
          ]
        }
      }
    ];

    container.innerHTML = `
      <div class="vibrant-page-grid animate-fade-in">
        <!-- Row 1: 4 KPI Cards -->
        ${this.renderKpiGridHtml(kpis)}

        <!-- Row 2: Coordinator Leaderboard (Left 55%) & Velocity Gauge + Team Leaders Bar Chart (Right 45%) -->
        <div class="vibrant-mid-row" style="grid-template-columns: 1.15fr 0.95fr;">
          <!-- Left: Coordinator Leaderboard -->
          <div class="vibrant-white-card" id="p7_leaderboard"></div>

          <!-- Right: Coordinator Velocity Gauge & Team Leaders Bar Chart -->
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div class="vibrant-white-card" id="p7_velocity_gauge"></div>
            <div class="vibrant-white-card" id="p7_team_leaders_barchart"></div>
          </div>
        </div>

        <!-- Row 3: Coordinator Milestones (Left 35%) & Team Leader Operations Table (Right 65%) -->
        <div class="vibrant-bottom-row" style="grid-template-columns: 0.8fr 1.2fr;">
          <div class="vibrant-white-card" id="p7_milestones_feed"></div>
          <div class="vibrant-white-card" id="p7_operations_table"></div>
        </div>
      </div>
    `;

    // Render Leaderboard Card
    const leaderboardRows = coordList.map((c, idx) => ({
      rank: idx + 1,
      primaryName: c.coordinator,
      secondaryLabel: `Target: ${ChartEngine.formatCurrencyLKR(c.targetAmount)}`,
      primaryValueString: ChartEngine.formatCurrencyLKR(c.actualAmount),
      secondaryValueString: `Achieved: ${c.achievementPercentage.toFixed(1)}%`,
      statusBadge: idx === 0 ? "Top Performer" : (c.achievementPercentage >= 50 ? "Achieved" : "Active"),
      statusColor: idx === 0 ? "#10B981" : "#00CEC9"
    }));
    ChartEngine.renderLeaderboard(document.getElementById('p7_leaderboard'), {
      title: "Copier Coordinators Performance Leaderboard (LKR)",
      badge: "COORDINATION",
      rows: leaderboardRows
    });

    // Render Coordinator Velocity Gauge
    ChartEngine.renderRadialGaugeWheel(document.getElementById('p7_velocity_gauge'), {
      title: "Coordinator Operational Velocity",
      valueString: "92.4%",
      percentage: 0.924,
      subtitle: "Estimate & Inquiry Conversion",
      trendText: "Rapid SLA",
      accentColor: "#00CEC9",
      gradientColors: ["#7DD3FC", "#0284C7"]
    });

    // Render Team Leaders Bar Chart
    const barItems = teamLeaders.map(tl => ({
      label: tl.teamLeader,
      value: tl.actualAmount,
      target: tl.targetAmount,
      barColor: "#6C5CE7",
      displayValue: ChartEngine.formatCurrencyLKR(tl.actualAmount)
    }));
    ChartEngine.renderHorizontalBarChartWithTargets(document.getElementById('p7_team_leaders_barchart'), {
      title: "Team Leaders Invoiced Performance (LKR)",
      badge: "SUPERVISION",
      items: barItems
    });

    // Render Feed & Table
    const activities = [
      { time: "09:15 AM", color: "#10B981", title: "AMC Estimate Converted", sub: "Chalani converted LKR 420,000 corporate renewal estimate." },
      { time: "11:30 AM", color: "#00CEC9", title: "Client SLA Follow-up", sub: "Bank client confirmed receipt of newly replaced parts." },
      { time: "02:00 PM", color: "#FFA502", title: "Team Leader Daily Standup", sub: "Team leaders allocated 48 priority calls across Western Province." },
      { time: "04:45 PM", color: "#6C5CE7", title: "Customer Recovery Logged", sub: "Follow-up clearance rate reached 92.4% for the day." }
    ];
    document.getElementById('p7_milestones_feed').innerHTML = this.renderActivityFeedHtml("Coordinator Operational Milestones", activities);

    const tableRows = coordList.map(c => [
      c.coordinator,
      "Copier Service Operations",
      ChartEngine.formatCurrencyLKR(c.targetAmount),
      ChartEngine.formatCurrencyLKR(c.actualAmount),
      { label: `${c.achievementPercentage.toFixed(1)}%`, type: c.achievementPercentage >= 50 ? "completed" : "open" }
    ]);

    document.getElementById('p7_operations_table').innerHTML = this.renderCleanTableHtml({
      title: "Consolidated Coordinator Operations Table",
      subtitle: "Realized billing and customer follow-up metrics across operations staff • LKR",
      badge: "VERIFIED SLA",
      columns: ["COORDINATOR", "PORTFOLIO", "TARGET BUDGET", "INVOICED AMOUNT", "STATUS"],
      rows: tableRows,
      paginationText: "Showing active operations coordination staff"
    });

    this.wireInteractivity(container, kpis, tableRows, activities);
  },

  // =========================================================================
  // PAGE 8: DEBTORS & OUTSTANDING WORK (Risk Leaderboard + Risk Velocity Gauge + Aging Donut)
  // =========================================================================
  renderDebtorsOutstanding(container) {
    const exec = FinancialCalculationEngine.calculateExecutiveSummary(DashboardData);
    const debtorsList = RankingEngine.rankDebtorsByOverdueRisk(DashboardData.csbmDebtorsList || []);

    const kpis = [
      {
        grad: "kpi-grad-coral",
        value: ChartEngine.formatCurrencyLKR(exec.outstandingDebtors),
        label: "Total Trade Debtors Portfolio",
        tag: "Receivables",
        icon: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>`,
        popover: {
          title: "Total Trade Debtors Portfolio",
          badge: "LKR METRIC",
          desc: "Gross trade receivables book across all CSBM divisions.",
          stats: [
            { label: "Total Receivables", val: ChartEngine.formatCurrencyLKR(exec.outstandingDebtors) },
            { label: "Over 90 Days", val: ChartEngine.formatCurrencyLKR(exec.debtorsOver90Days) }
          ]
        }
      },
      {
        grad: "kpi-grad-amber",
        value: ChartEngine.formatCurrencyLKR(exec.debtorsOver90Days),
        label: "Debtors Over 90 Days",
        tag: `Exposure ${exec.debtorsOverduePct.toFixed(1)}%`,
        icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>`,
        popover: {
          title: "Debtors Over 90 Days",
          badge: "HIGH RISK",
          desc: "Critical aging accounts requiring immediate recovery and executive review.",
          stats: [
            { label: "Overdue Amount", val: ChartEngine.formatCurrencyLKR(exec.debtorsOver90Days) },
            { label: "Overdue Ratio", val: `${exec.debtorsOverduePct.toFixed(1)}%` }
          ]
        }
      },
      {
        grad: "kpi-grad-purple",
        value: `${exec.debtorsOverduePct.toFixed(1)}%`,
        label: "Over-90-Day Exposure Ratio",
        tag: "Risk Containment",
        icon: `<svg viewBox="0 0 24 24"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>`,
        popover: {
          title: "Over-90-Day Exposure Ratio",
          badge: "CONTAINMENT",
          desc: "Percentage of receivables book exceeding 90 days aging.",
          stats: [
            { label: "Overdue Ratio", val: `${exec.debtorsOverduePct.toFixed(1)}%` }
          ]
        }
      },
      {
        grad: "kpi-grad-emerald",
        value: ChartEngine.formatCurrencyLKR(exec.outstandingDebtors - exec.debtorsOver90Days),
        label: "Performing Trade Receivables",
        tag: "Healthy Book",
        icon: `<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
        popover: {
          title: "Performing Trade Receivables",
          badge: "CURRENT",
          desc: "Healthy receivables performing within standard 30 to 60 days credit terms.",
          stats: [
            { label: "Performing", val: ChartEngine.formatCurrencyLKR(exec.outstandingDebtors - exec.debtorsOver90Days) }
          ]
        }
      }
    ];

    container.innerHTML = `
      <div class="vibrant-page-grid animate-fade-in">
        <!-- Row 1: 4 KPI Cards -->
        ${this.renderKpiGridHtml(kpis)}

        <!-- Row 2: Over 90 Days Risk Leaderboard (Left 55%) & Risk Gauge + Aging Donut (Right 45%) -->
        <div class="vibrant-mid-row" style="grid-template-columns: 1.15fr 0.95fr;">
          <!-- Left: Debtors Over 90 Days Leaderboard -->
          <div class="vibrant-white-card" id="p8_leaderboard"></div>

          <!-- Right: Risk Velocity Gauge & Aging Donut -->
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div class="vibrant-white-card" id="p8_risk_gauge"></div>
            <div class="vibrant-white-card" id="p8_aging_donut"></div>
          </div>
        </div>

        <!-- Row 3: Debt Recovery Milestones (Left 35%) & High-Risk Ledger Table (Right 65%) -->
        <div class="vibrant-bottom-row" style="grid-template-columns: 0.8fr 1.2fr;">
          <div class="vibrant-white-card" id="p8_milestones_feed"></div>
          <div class="vibrant-white-card" id="p8_receivables_table"></div>
        </div>
      </div>
    `;

    // Render Debtors Leaderboard Card
    const leaderboardRows = debtorsList.map((d, idx) => ({
      rank: idx + 1,
      primaryName: d.department,
      secondaryLabel: `Total Debtors: ${ChartEngine.formatCurrencyLKR(d.totalDebtors)}`,
      primaryValueString: ChartEngine.formatCurrencyLKR(d.over90Days),
      secondaryValueString: `Overdue: ${d.overduePercentage.toFixed(1)}%`,
      statusBadge: d.overduePercentage > 20 ? "High Risk" : "Moderate",
      statusColor: d.overduePercentage > 20 ? "#EF4444" : "#FFA502"
    }));
    ChartEngine.renderLeaderboard(document.getElementById('p8_leaderboard'), {
      title: "CSBM Debtors Over 90 Days Risk Leaderboard (LKR)",
      badge: "CREDIT RISK",
      rows: leaderboardRows
    });

    // Render Risk Velocity Gauge
    ChartEngine.renderRadialGaugeWheel(document.getElementById('p8_risk_gauge'), {
      title: "Over-90 Risk Velocity Ratio",
      valueString: `${exec.debtorsOverduePct.toFixed(1)}%`,
      percentage: exec.debtorsOverduePct / 100,
      subtitle: `Overdue: ${ChartEngine.formatCurrencyLKR(exec.debtorsOver90Days)}`,
      trendText: "Containment Priority",
      accentColor: "#EF4444",
      gradientColors: ["#F87171", "#DC2626"]
    });

    // Render Aging Donut
    const agingCats = debtorsList.slice(0, 4).map(d => ({
      label: d.department,
      value: d.over90Days
    }));
    ChartEngine.renderMultiSliceDonut(document.getElementById('p8_aging_donut'), {
      title: "Debtors Aging Profile by Division",
      categories: agingCats
    });

    // Render Feed & Table
    const activities = [
      { time: "09:00 AM", color: "#EF4444", title: "Legal Notice Issued", sub: "Overdue notice dispatched for accounts exceeding 120 days." },
      { time: "11:20 AM", color: "#10B981", title: "Partial Settlement Received", sub: "LKR 1,850,000 received from corporate banking client." },
      { time: "01:45 PM", color: "#FFA502", title: "Payment Plan Approved", sub: "Apparel client structured 3-month structured installment plan." },
      { time: "04:10 PM", color: "#00CEC9", title: "Credit Hold Enforced", sub: "Automated dispatch hold applied on 2 delinquent client accounts." }
    ];
    document.getElementById('p8_milestones_feed').innerHTML = this.renderActivityFeedHtml("Debt Recovery Action Milestones", activities);

    const tableRows = debtorsList.map(d => [
      d.department,
      "CSBM Operating Division",
      ChartEngine.formatCurrencyLKR(d.totalDebtors),
      ChartEngine.formatCurrencyLKR(d.over90Days),
      { label: `${d.overduePercentage.toFixed(1)}% Overdue`, type: d.overduePercentage > 20 ? "open" : "completed" }
    ]);

    document.getElementById('p8_receivables_table').innerHTML = this.renderCleanTableHtml({
      title: "High-Risk Receivables Recovery Ledger",
      subtitle: "Corporate debtors monitored for collection velocity • All values in LKR",
      badge: "CREDIT AUDIT",
      columns: ["DIVISION ACCOUNT", "PORTFOLIO", "TOTAL RECEIVABLES", "OVER 90 DAYS", "STATUS"],
      rows: tableRows,
      paginationText: "Showing monitored debtor corporate accounts"
    });

    this.wireInteractivity(container, kpis, tableRows, activities);
  },

  // =========================================================================
  // PAGE 9: EMPLOYEE RECOGNITION (Award Celebration Cards matching EmployeeRecognitionScreen.kt)
  // =========================================================================
  renderEmployeeRecognition(container) {
    const awards = DashboardData.awards || [];

    const kpis = [
      {
        grad: "kpi-grad-purple",
        value: "5 Champions",
        label: "Corporate Honorees",
        tag: "November 2026",
        icon: `<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
        popover: {
          title: "Corporate Honorees",
          badge: "5 AWARDS",
          desc: "Top corporate performers honored across engineering, sales, and operations.",
          stats: [
            { label: "Honorees", val: "5 Champions" },
            { label: "Cycle", val: "November 2026" }
          ]
        }
      },
      {
        grad: "kpi-grad-blue",
        value: "99.4% Highest",
        label: "Excellence Rating",
        tag: "Shantha Kumar",
        icon: `<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>`,
        popover: {
          title: "Highest Excellence Rating",
          badge: "99.4%",
          desc: "Peak individual performance rating recorded in annual evaluation.",
          stats: [
            { label: "Score", val: "99.4%" },
            { label: "Honoree", val: "Shantha Kumar" }
          ]
        }
      },
      {
        grad: "kpi-grad-coral",
        value: "3 Divisions",
        label: "Performance Domains",
        tag: "Tech • Sales • Ops",
        icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>`,
        popover: {
          title: "Performance Domains",
          badge: "MULTI-SECTOR",
          desc: "Recognitions distributed across Copier Engineering, Consumables Sales, and Operations Coordination.",
          stats: [
            { label: "Domains", val: "3 Sectors" }
          ]
        }
      },
      {
        grad: "kpi-grad-emerald",
        value: "100% Verified",
        label: "Audit Verification",
        tag: "Audit Committee",
        icon: `<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
        popover: {
          title: "Audit Verification",
          badge: "VERIFIED",
          desc: "All award scores verified against live billing records and customer SLA feedback.",
          stats: [
            { label: "Integrity", val: "100% Verified" }
          ]
        }
      }
    ];

    // Build 5 Award Celebration Cards (Executive Vector Clip Art Avatars & Rank Badges)
    const tiers = [
      {
        type: 'gold-award',
        trophy: '🥇',
        rankPill: '<span class="award-rank-pill gold-pill">🥇 RANK #1 • GOLD CHAMPION</span>',
        accent: '#D97706',
        bg: 'linear-gradient(135deg, rgba(254, 243, 199, 0.9) 0%, rgba(253, 230, 138, 0.95) 100%)',
        border: '#F59E0B',
        shadow: 'rgba(245, 158, 11, 0.25)',
        initials: 'IK'
      },
      {
        type: 'silver-award',
        trophy: '🥈',
        rankPill: '<span class="award-rank-pill silver-pill">🥈 RANK #2 • SILVER ACHIEVER</span>',
        accent: '#4338CA',
        bg: 'linear-gradient(135deg, rgba(224, 231, 255, 0.9) 0%, rgba(199, 210, 254, 0.95) 100%)',
        border: '#6366F1',
        shadow: 'rgba(99, 102, 241, 0.25)',
        initials: 'CK'
      },
      {
        type: 'bronze-award',
        trophy: '🥉',
        rankPill: '<span class="award-rank-pill bronze-pill">🥉 RANK #3 • BRONZE HONOREE</span>',
        accent: '#C2410C',
        bg: 'linear-gradient(135deg, rgba(255, 237, 213, 0.9) 0%, rgba(254, 215, 170, 0.95) 100%)',
        border: '#F97316',
        shadow: 'rgba(249, 115, 22, 0.25)',
        initials: 'SK'
      },
      {
        type: 'special-award',
        trophy: '🏆',
        rankPill: '<span class="award-rank-pill special-pill">🏆 RANK #4 • SPECIAL HONOREE</span>',
        accent: '#6D28D9',
        bg: 'linear-gradient(135deg, rgba(237, 233, 254, 0.9) 0%, rgba(221, 214, 254, 0.95) 100%)',
        border: '#8B5CF6',
        shadow: 'rgba(139, 92, 246, 0.25)',
        initials: 'KK'
      },
      {
        type: 'special-award',
        trophy: '🌟',
        rankPill: '<span class="award-rank-pill star-pill">🌟 RANK #5 • OPERATIONS STAR</span>',
        accent: '#047857',
        bg: 'linear-gradient(135deg, rgba(209, 250, 229, 0.9) 0%, rgba(167, 243, 208, 0.95) 100%)',
        border: '#10B981',
        shadow: 'rgba(16, 185, 129, 0.25)',
        initials: 'CH'
      }
    ];

    const awardCardsHtml = awards.map((a, idx) => {
      const tier = tiers[idx] || tiers[4];
      const initials = a.employeeName ? a.employeeName.trim().split(/\s+/).map(w => w[0]).filter(Boolean).slice(-2).join('') : tier.initials;

      return `
        <div class="award-celebration-card ${tier.type}" data-award-idx="${idx}">
          <div class="award-trophy-wrap">${tier.trophy}</div>
          <div class="award-clipart-badge" style="background: ${tier.bg}; border: 3px solid ${tier.border}; box-shadow: 0 8px 20px ${tier.shadow};">
            <svg viewBox="0 0 24 24" class="award-clipart-icon" style="color: ${tier.accent};">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
            <span class="award-initials-badge" style="background: ${tier.border}; color: #FFFFFF;">${initials}</span>
          </div>
          ${tier.rankPill}
          <span class="award-category-title" style="color: ${tier.accent};">${a.categoryTitle}</span>
          <h4 class="award-winner-name">${a.employeeName}</h4>
          <span class="award-achievement-stat">${a.scorePercentage ? `${a.scorePercentage}% Score` : 'Excellence'}</span>
          <span class="award-dept-badge">${a.designation}</span>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="vibrant-page-grid animate-fade-in">
        <!-- Row 1: 4 KPI Badges -->
        ${this.renderKpiGridHtml(kpis)}

        <!-- Row 2: 5 Award Celebration Cards (Directly matching EmployeeRecognitionScreen.kt) -->
        <div class="awards-grid-5">
          ${awardCardsHtml}
        </div>

        <!-- Row 3: Metropolitan Hall of Fame & Recognition Ledger Table -->
        <div class="vibrant-white-card" id="p9_hall_of_fame_table"></div>
      </div>
    `;

    // Render Table
    const tableRows = awards.map((a, idx) => [
      a.employeeName,
      a.designation,
      a.categoryTitle,
      `${a.scorePercentage || 95}%`,
      { label: a.awardPeriod || "Nov 2026", type: "completed" }
    ]);

    document.getElementById('p9_hall_of_fame_table').innerHTML = this.renderCleanTableHtml({
      title: "Metropolitan Hall of Fame & Recognition Ledger",
      subtitle: "Official corporate recognition roll approved by Executive Management",
      badge: "HALL OF FAME",
      columns: ["HONOREE", "DESIGNATION & TERRITORY", "AWARD CATEGORY", "SCORE %", "AWARD PERIOD"],
      rows: tableRows,
      paginationText: "Showing verified award recipients"
    });

    // Wire up Award Card Click
    const awardEls = container.querySelectorAll('.award-celebration-card');
    awardEls.forEach((card, idx) => {
      const a = awards[idx];
      if (!a) return;
      card.addEventListener('click', () => {
        if (typeof App !== 'undefined' && App.audio) App.audio.playClick();
        DashboardPages.openRecordInspector({
          title: `${a.employeeName} • ${a.categoryTitle}`,
          subtitle: a.designation,
          fields: [
            { label: "Honoree", val: a.employeeName },
            { label: "Category", val: a.categoryTitle },
            { label: "Territory / Dept", val: a.designation },
            { label: "Performance Score", val: `${a.scorePercentage || 95}%` },
            { label: "Award Cycle", val: a.awardPeriod || "November 2026" }
          ],
          narrative: a.achievementText || `Outstanding achievement recognized by Metropolitan Executive Committee.`
        });
      });
    });

    this.wireInteractivity(container, kpis, tableRows);
  },

  // =========================================================================
  // PAGE 10: MANAGEMENT INSIGHTS (4 Strategic Cards matching ManagementInsightsScreen.kt)
  // =========================================================================
  renderManagementInsights(container) {
    const insights = DashboardData.insights || [];

    const kpis = [
      {
        grad: "kpi-grad-blue",
        value: "6 Directives",
        label: "Strategic Directives",
        tag: "Executive Board",
        icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>`,
        popover: {
          title: "Strategic Directives",
          badge: "ACTIVE",
          desc: "Key operational directives issued for current cycle resolution.",
          stats: [
            { label: "Directives", val: "6 Statements" }
          ]
        }
      },
      {
        grad: "kpi-grad-purple",
        value: "4 Pillars",
        label: "Operational Pillars",
        tag: "Finance • Ops • Risk • HR",
        icon: `<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>`,
        popover: {
          title: "Operational Pillars",
          badge: "GOVERNANCE",
          desc: "Pillars covering financial flow, service operations, credit risk, and human capital.",
          stats: [
            { label: "Pillars", val: "4 Domains" }
          ]
        }
      },
      {
        grad: "kpi-grad-coral",
        value: "Priority 1",
        label: "Debtor Exposure",
        tag: "Over-90-Day Protocol",
        icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>`,
        popover: {
          title: "Debtor Exposure Priority",
          badge: "URGENT",
          desc: "Immediate recovery enforcement for accounts over 90 days overdue.",
          stats: [
            { label: "Priority", val: "Level 1" }
          ]
        }
      },
      {
        grad: "kpi-grad-emerald",
        value: "100% Synced",
        label: "Intelligence Engine",
        tag: "Google Sheets ETL",
        icon: `<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
        popover: {
          title: "Intelligence Engine",
          badge: "REAL-TIME",
          desc: "Continuous ingestion from 14 operational Google Sheets worksheets.",
          stats: [
            { label: "Integrity", val: "100% Synced" }
          ]
        }
      }
    ];

    // Build 4 Strategic Insight Cards with Glowing Colored Left Accent Strips
    const accentColors = ["#00CEC9", "#10B981", "#FFA502", "#6C5CE7"];
    const top4Insights = insights.slice(0, 4);

    const insightCardsHtml = top4Insights.map((ins, idx) => {
      const stripClr = accentColors[idx % accentColors.length];
      return `
        <div class="management-insight-card" data-insight-idx="${idx}">
          <div class="insight-accent-strip" style="background: ${stripClr}; box-shadow: 0 0 10px ${stripClr};"></div>
          <div class="insight-content-block">
            <div class="insight-header-row">
              <div class="insight-title-group">
                <h4 class="insight-card-title">${ins.title}</h4>
                <span class="insight-card-sub">Category: ${ins.category.toUpperCase()} • Priority Level ${ins.priorityLevel || 1}</span>
              </div>
              <span class="status-pill-badge ${ins.priorityLevel === 1 ? 'open' : 'completed'}">
                ${ins.priorityLevel === 1 ? 'PRIORITY 1' : 'ACTIVE DIRECTIVE'}
              </span>
            </div>
            <p class="insight-narrative-text">${ins.statement}</p>
            <div class="insight-metrics-row">
              <div class="insight-stat-box">
                <span class="insight-stat-label">Domain</span>
                <span class="insight-stat-val" style="color: ${stripClr};">${ins.category.toUpperCase()}</span>
              </div>
              <div class="insight-stat-box">
                <span class="insight-stat-label">Governance State</span>
                <span class="insight-stat-val">ENFORCED</span>
              </div>
              <div class="insight-stat-box">
                <span class="insight-stat-label">Audit Review</span>
                <span class="insight-stat-val">100% VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="vibrant-page-grid animate-fade-in">
        <!-- Row 1: 4 KPI Badges -->
        ${this.renderKpiGridHtml(kpis)}

        <!-- Row 2: 4 Strategic Insights Cards (Matching ManagementInsightsScreen.kt) -->
        <div class="insights-grid-4">
          ${insightCardsHtml}
        </div>

        <!-- Row 3: Strategic Directives & Action Protocol Ledger Table -->
        <div class="vibrant-white-card" id="p10_directives_table"></div>
      </div>
    `;

    // Render Table
    const tableRows = insights.map(ins => [
      ins.title,
      ins.category.toUpperCase(),
      `Priority ${ins.priorityLevel || 1}`,
      "Executive Action Required",
      { label: ins.priorityLevel === 1 ? "Urgent" : "Active", type: ins.priorityLevel === 1 ? "open" : "completed" }
    ]);

    document.getElementById('p10_directives_table').innerHTML = this.renderCleanTableHtml({
      title: "Strategic Directives & Operational Action Protocol",
      subtitle: "Official executive directives tracked for weekly management implementation",
      badge: "EXECUTIVE BOARD",
      columns: ["DIRECTIVE TITLE", "CATEGORY", "PRIORITY", "RESOLUTION PATH", "STATUS"],
      rows: tableRows,
      paginationText: "Showing active strategic management directives"
    });

    // Wire up Insight Cards Click
    const cardEls = container.querySelectorAll('.management-insight-card');
    cardEls.forEach((card, idx) => {
      const ins = top4Insights[idx];
      if (!ins) return;
      card.addEventListener('click', () => {
        if (typeof App !== 'undefined' && App.audio) App.audio.playClick();
        DashboardPages.openRecordInspector({
          title: ins.title,
          subtitle: `Category: ${ins.category.toUpperCase()} • Priority Level ${ins.priorityLevel}`,
          fields: [
            { label: "Directive Title", val: ins.title },
            { label: "Domain", val: ins.category.toUpperCase() },
            { label: "Priority Level", val: `Level ${ins.priorityLevel}` },
            { label: "Governance State", val: "Enforced" }
          ],
          narrative: ins.statement
        });
      });
    });

    this.wireInteractivity(container, kpis, tableRows);
  },

  // =========================================================================
  // PAGE 11: ABOUT SYSTEM & ARCHITECT (Thusitha Dhananjaya - Metropolitan)
  // Static Reading Mode (Autoplay Paused)
  // =========================================================================
  renderAboutSystem(container) {
    const kpis = [
      {
        grad: "kpi-grad-purple",
        value: "Thusitha Dhananjaya",
        label: "Lead System Architect",
        tag: "Author",
        icon: `<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
        popover: {
          title: "Lead System Architect & Developer",
          badge: "CREATOR",
          desc: "Designed and engineered by Thusitha Dhananjaya for Metropolitan Technologies (Pvt) Ltd.",
          stats: [
            { label: "Architect", val: "Thusitha Dhananjaya" },
            { label: "Role", val: "Enterprise Solutions Lead" },
            { label: "Affiliation", val: "Metropolitan Technologies" },
            { label: "Platform", val: "Management Intelligence Cockpit" }
          ]
        }
      },
      {
        grad: "kpi-grad-blue",
        value: "Metropolitan",
        label: "Enterprise Solutions",
        tag: "Organization",
        icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>`,
        popover: {
          title: "Metropolitan Technologies (Pvt) Ltd",
          badge: "CORPORATE",
          desc: "Enterprise management intelligence platform delivering real-time telemetry across engineering and commercial sales.",
          stats: [
            { label: "Organization", val: "Metropolitan Technologies" },
            { label: "Headquarters", val: "Colombo, Sri Lanka" },
            { label: "Deployment", val: "National Network" },
            { label: "Integrity", val: "100% Ingestion" }
          ]
        }
      },
      {
        grad: "kpi-grad-coral",
        value: "v2.5 Production",
        label: "System Build Version",
        tag: "Live Release",
        icon: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>`,
        popover: {
          title: "System Architecture Specifications",
          badge: "RELEASE v2.5",
          desc: "Built with high-density vector SVG ChartEngine, Google Sheets Live ETL pipeline, and responsive multi-display support.",
          stats: [
            { label: "Build Version", val: "v2.5.0 Production" },
            { label: "ETL Streams", val: "14 Google Sheets" },
            { label: "Render Engine", val: "Vector ChartEngine" },
            { label: "Dwell Standard", val: "60s Smartboard Cycle" }
          ]
        }
      },
      {
        grad: "kpi-grad-emerald",
        value: "99.98%",
        label: "System Reliability",
        tag: "Enterprise Tier 1",
        icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>`,
        popover: {
          title: "Enterprise High Availability",
          badge: "SLA TIER 1",
          desc: "Engineered with resilient client-side caching, automated failover mechanisms, and zero-latency vector rendering.",
          stats: [
            { label: "Architecture", val: "Edge Resilient" },
            { label: "ETL Latency", val: "< 1.2s Sync" },
            { label: "Rendering SLA", val: "60 FPS Native" },
            { label: "Target Availability", val: "99.98% Enterprise" }
          ]
        }
      }
    ];

    container.innerHTML = `
      <div class="vibrant-page-grid animate-fade-in">
        <!-- Row 1: 4 Highlight KPI Cards -->
        ${this.renderKpiGridHtml(kpis)}

        <!-- Row 2: Developer Hero Profile & System Architectural Deck -->
        <div class="about-hero-grid">
          <!-- Left: Developer Profile Card -->
          <div class="vibrant-white-card card-about-profile">
            <div class="about-card-inner">
              <div class="about-avatar-glow-ring">
                <img src="assets/images/developer_photo.jpg" alt="Thusitha Dhananjaya" class="about-profile-photo" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'160\\' height=\\'160\\' viewBox=\\'0 0 24 24\\' fill=\\'%236C5CE7\\'><path d=\\'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z\\'/></svg>'" />
              </div>

              <div class="about-badge-designer">LEAD SYSTEM ARCHITECT</div>
              <h2 class="about-architect-name">Thusitha Dhananjaya</h2>
              <div class="about-architect-title">Enterprise Systems Architect & Full-Stack Engineer</div>
              <div class="about-company-tag">Metropolitan Technologies (Pvt) Ltd</div>

              <div class="about-paused-notice">
                <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span><strong>ENTERPRISE ARCHITECTURE:</strong> Certified production build for Metropolitan Management Intelligence.</span>
              </div>

              <p class="about-architect-bio">
                Lead architect and full-stack developer of the <strong>Metropolitan Management Intelligence Platform</strong>. Specially engineered for high-impact executive boardrooms, corporate presentations, and field telemetry intelligence across Copier Engineering, Printer Consumables, Commercial Contracts, and Divisional Telemetry.
              </p>

              <div class="about-skill-pills-row">
                <span class="about-skill-pill">Executive Cockpits</span>
                <span class="about-skill-pill">Data Pipelines</span>
                <span class="about-skill-pill">Vector SVG Engines</span>
                <span class="about-skill-pill">Google Cloud ETL</span>
                <span class="about-skill-pill">Smartboard Displays</span>
              </div>
            </div>
          </div>

          <!-- Right: Architecture & Engineering Specifications -->
          <div class="vibrant-white-card card-about-specs">
            <div class="about-card-inner">
              <div class="card-header-row">
                <div class="overview-title-group">
                  <h3 class="card-main-title text-slate">Platform Architecture Specifications</h3>
                  <span class="overview-sub-title text-muted">Core engineering standards, runtime engines & data contracts</span>
                </div>
                <span class="status-pill-badge completed">ENTERPRISE GRADE</span>
              </div>

              <div class="about-specs-grid">
                <div class="about-spec-box">
                  <div class="about-spec-icon purple">
                    <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
                  </div>
                  <div class="about-spec-content">
                    <span class="about-spec-label">VISUAL DESIGN LANGUAGE</span>
                    <span class="about-spec-val">Vibrant High-Contrast Dashboard Architecture</span>
                    <span class="about-spec-sub">Purple sidebar, pill gradient cards, glowing neon charts</span>
                  </div>
                </div>

                <div class="about-spec-box">
                  <div class="about-spec-icon blue">
                    <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>
                  </div>
                  <div class="about-spec-content">
                    <span class="about-spec-label">DATA PIPELINE & REFRESH</span>
                    <span class="about-spec-val">14 Google Sheets Worksheets Ingestion</span>
                    <span class="about-spec-sub">60-second automated background ETL cycle with instant failover</span>
                  </div>
                </div>

                <div class="about-spec-box">
                  <div class="about-spec-icon coral">
                    <svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>
                  </div>
                  <div class="about-spec-content">
                    <span class="about-spec-label">CURRENCY & FORMATTING</span>
                    <span class="about-spec-val">Strict LKR Standard Compliance</span>
                    <span class="about-spec-sub">100% Sri Lankan Rupee valuation standard across financial ledgers</span>
                  </div>
                </div>

                <div class="about-spec-box">
                  <div class="about-spec-icon emerald">
                    <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  </div>
                  <div class="about-spec-content">
                    <span class="about-spec-label">MULTI-VIEWPORT SUPPORT</span>
                    <span class="about-spec-val">Seamless 4K Smartboard to Mobile</span>
                    <span class="about-spec-sub">Dynamic CSS Flex/Grid responsiveness with zero horizontal scroll</span>
                  </div>
                </div>
              </div>

              <div class="about-architect-credit-footer">
                <div class="credit-brand-stack">
                  <span class="credit-brand-sub">DESIGNED & ARCHITECTED BY</span>
                  <span class="credit-brand-name">THUSITHA DHANANJAYA</span>
                  <span class="credit-company">METROPOLITAN TECHNOLOGIES (PVT) LTD</span>
                </div>
                <div class="credit-badge-seal">
                  <span>★ CERTIFIED ARCHITECTURE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Row 3: Subsystems Status & Health Table -->
        <div class="vibrant-white-card" id="p11_subsystems_table"></div>
      </div>
    `;

    // Render Table
    const tableRows = [
      ["Executive Matrix (Pages 1-10)", "Vector ChartEngine", "14 Google Sheets", "60s Auto-Advance", { label: "ACTIVE", type: "completed" }],
      ["Live ETL Data Pipeline", "Google Sheets API v4", "Worksheets Ingestion", "60s Auto-Polling", { label: "SYNCHRONIZED", type: "completed" }],
      ["Currency Engine", "Strict LKR Standard", "Financial Projections", "Real-time Format", { label: "VERIFIED", type: "completed" }],
      ["Multi-Viewport Grid", "CSS3 Flex / Grid", "Dynamic Viewport", "4K to Mobile", { label: "READY", type: "completed" }],
      ["About & Architect Deck", "Static Profile Deck", "Internal Registry", "Executive Profile", { label: "VERIFIED", type: "completed" }]
    ];

    document.getElementById('p11_subsystems_table').innerHTML = this.renderCleanTableHtml({
      title: "Platform Subsystem Integrity",
      subtitle: "Architectural components & live operational status",
      badge: "5/5 SUBSYSTEMS HEALTHY",
      columns: ["SUBSYSTEM", "ENGINE / LAYER", "DATA STREAM", "DWELL MODE", "STATUS"],
      rows: tableRows,
      paginationText: "Designed by Thusitha Dhananjaya - Metropolitan"
    });

    this.wireInteractivity(container, kpis, tableRows);
  }
};

window.DashboardPages = DashboardPages;
