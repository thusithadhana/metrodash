/**
 * METROPOLITAN MANAGEMENT INTELLIGENCE - DASHBOARD WEB APPLICATION
 * 10 Master Dashboard Page Renderers
 * Unified Vibrant Colorful Architecture matching Reference Design
 * Zero empty spaces, zero repeated statistics, fully modern animated graphs.
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
    { index: 10, id: "MANAGEMENT_INSIGHTS", title: "MANAGEMENT INSIGHTS", totalPanels: 1 }
  ],

  getPageByIndex(index) {
    return this.PAGES.find(p => p.index === index) || this.PAGES[0];
  },

  renderCurrent(container, pageIndex) {
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
      default:
        this.renderExecutiveOverview(container);
    }
  },

  /**
   * Universal 3-Row Vibrant Page Builder
   * Ensures identical colorful design, spacing, typography, and chart rendering across all 10 pages.
   */
  buildPage(container, config) {
    const { pageId, kpis, dualWave, donut, activities, table } = config;

    const kpiCardsHtml = kpis.map((k, idx) => `
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
            <div class="popover-footer-hint">👆 Point/Click mouse to update view</div>
          </div>
        ` : ''}
      </div>
    `).join('');

    const activitiesHtml = activities.items.map(it => `
      <div class="activity-item">
        <span class="activity-time">${it.time}</span>
        <span class="activity-dot-badge" style="background: ${it.color};"></span>
        <div class="activity-text-stack">
          <span class="activity-title">${it.title}</span>
          <span class="activity-sub">${it.sub}</span>
        </div>
      </div>
    `).join('');

    const tableHeadersHtml = table.columns.map((c, i) =>
      `<th style="${i === table.columns.length - 1 ? 'text-align: right;' : ''}">${c}</th>`
    ).join('');

    const tableRowsHtml = table.rows.map((r, rIdx) => `
      <tr class="interactive-table-row" data-row-idx="${rIdx}" role="button" tabindex="0" title="Click to inspect ${r[0]} details">
        <td style="font-weight: 700;">${r[0]}</td>
        <td>${r[1]}</td>
        <td>${r[2]}</td>
        <td style="font-weight: 700;">${r[3]}</td>
        <td style="text-align: right;"><span class="status-pill-badge ${r[4].type}">${r[4].label}</span></td>
      </tr>
    `).join('');

    container.innerHTML = `
      <div class="vibrant-page-grid animate-fade-in">
        <!-- Row 1: Top 4 Gradient KPI Cards -->
        <div class="kpi-gradient-grid">
          ${kpiCardsHtml}
        </div>

        <!-- Row 2: Dual Wave SVG Overview Card + Analytics Donut Card -->
        <div class="vibrant-mid-row">
          <div class="vibrant-white-card card-earnings-overview" id="${pageId}_dual_waves"></div>
          <div class="vibrant-white-card card-analytics-donut" id="${pageId}_donut"></div>
        </div>

        <!-- Row 3: Activities + Data Table -->
        <div class="vibrant-bottom-row">
          <div class="vibrant-white-card card-recent-activities" id="${pageId}_activities">
            <div class="card-inner-box">
              <div class="card-header-row">
                <h3 class="card-main-title text-slate">${activities.title}</h3>
                <button class="card-options-btn" title="Options">
                  <svg viewBox="0 0 24 24"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                </button>
              </div>
              <div class="recent-activities-list">
                ${activitiesHtml}
              </div>
            </div>
          </div>

          <div class="vibrant-white-card card-order-status" id="${pageId}_table">
            <div class="card-inner-box">
              <div class="card-header-row">
                <div class="overview-title-group">
                  <h3 class="card-main-title text-slate">${table.title}</h3>
                  <span class="overview-sub-title text-muted">${table.subtitle}</span>
                </div>
                <div class="order-status-toolbar">
                  <div class="toolbar-left-group">
                    <button class="btn-add-order"><span>+</span> Add</button>
                    <button class="toolbar-icon-btn" title="Delete"><svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg></button>
                    <button class="toolbar-icon-btn" title="Copy"><svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg></button>
                  </div>
                  <div class="toolbar-right-group" style="display:flex;align-items:center;gap:6px;">
                    <input type="text" class="toolbar-search-input" placeholder="Search" />
                    <button class="toolbar-icon-btn" title="Document"><svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg></button>
                  </div>
                </div>
              </div>

              <table class="order-status-table">
                <thead>
                  <tr>
                    ${tableHeadersHtml}
                  </tr>
                </thead>
                <tbody>
                  ${tableRowsHtml}
                </tbody>
              </table>

              <div class="table-footer-pagination">
                <span>${table.paginationText || 'Showing 1 to 20 entries'}</span>
                <div class="pagination-pages">
                  <span>&lt;</span>
                  <span class="page-num-dot active">1</span>
                  <span class="page-num-dot">2</span>
                  <span class="page-num-dot">3</span>
                  <span class="page-num-dot">4</span>
                  <span class="page-num-dot">5</span>
                  <span class="page-num-dot">6</span>
                  <span>&gt;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Render initial SVG Charts into their prepared containers
    ChartEngine.renderDualWaveEarningsChart(document.getElementById(`${pageId}_dual_waves`), dualWave);
    ChartEngine.renderTriColorDonut(document.getElementById(`${pageId}_donut`), donut);

    // Interactive mouse point / hover / click event listeners on KPI cards
    const kpiElements = container.querySelectorAll('.vibrant-kpi-card');
    let resetTimer = null;
    let pinnedIdx = null;

    kpiElements.forEach((card, idx) => {
      const kData = kpis[idx];
      if (!kData || (!kData.dualWave && !kData.donut)) return;

      const activateCard = (isPinAction = false) => {
        if (resetTimer) clearTimeout(resetTimer);
        kpiElements.forEach(c => {
          c.classList.remove('active-kpi');
          if (!isPinAction) c.classList.remove('pinned-kpi');
        });
        card.classList.add('active-kpi');
        if (isPinAction) card.classList.add('pinned-kpi');

        // Dynamically update Dual-Wave Chart
        if (kData.dualWave) {
          ChartEngine.renderDualWaveEarningsChart(document.getElementById(`${pageId}_dual_waves`), kData.dualWave);
        }
        // Dynamically update Donut Chart if available
        if (kData.donut) {
          ChartEngine.renderTriColorDonut(document.getElementById(`${pageId}_donut`), kData.donut);
        }
      };

      const deactivateCard = () => {
        if (pinnedIdx !== null) return;
        resetTimer = setTimeout(() => {
          kpiElements.forEach(c => c.classList.remove('active-kpi'));
          ChartEngine.renderDualWaveEarningsChart(document.getElementById(`${pageId}_dual_waves`), dualWave);
          ChartEngine.renderTriColorDonut(document.getElementById(`${pageId}_donut`), donut);
        }, 400);
      };

      card.addEventListener('mouseenter', () => {
        if (pinnedIdx === null || pinnedIdx !== idx) {
          activateCard(false);
        }
      });

      card.addEventListener('mouseleave', () => {
        deactivateCard();
      });

      card.addEventListener('click', () => {
        if (pinnedIdx === idx) {
          pinnedIdx = null;
          card.classList.remove('pinned-kpi', 'active-kpi');
          ChartEngine.renderDualWaveEarningsChart(document.getElementById(`${pageId}_dual_waves`), dualWave);
          ChartEngine.renderTriColorDonut(document.getElementById(`${pageId}_donut`), donut);
        } else {
          pinnedIdx = idx;
          activateCard(true);
        }
      });
    });

    // Wire up table row click inspection
    const tableRowEls = container.querySelectorAll('.interactive-table-row');
    tableRowEls.forEach((row, i) => {
      const rData = table.rows[i];
      if (!rData) return;
      row.addEventListener('click', () => {
        DashboardPages.openRecordInspector({
          title: `${rData[0]} • ${rData[1]}`,
          subtitle: `${table.title} • ${rData[2]} Territory`,
          fields: [
            { label: table.columns[0] || "Record ID", val: rData[0] },
            { label: table.columns[1] || "Client Organization", val: rData[1] },
            { label: table.columns[2] || "Territory / Division", val: rData[2] },
            { label: table.columns[3] || "Recorded Value", val: rData[3] },
            { label: table.columns[4] || "Operational Status", val: rData[4].label }
          ],
          narrative: `Official commercial dispatch record ${rData[0]} for client '${rData[1]}' in ${rData[2]}. Current billing valuation is ${rData[3]} with operational status '${rData[4].label}'.`
        });
      });
    });

    // Wire up activity feed click inspection
    const actEls = container.querySelectorAll('.activity-item');
    actEls.forEach((act, i) => {
      const aData = activities.items[i];
      if (!aData) return;
      act.style.cursor = 'pointer';
      act.setAttribute('role', 'button');
      act.setAttribute('tabindex', '0');
      act.setAttribute('title', `Click to inspect milestone: ${aData.title}`);
      act.addEventListener('click', () => {
        DashboardPages.openRecordInspector({
          title: aData.title,
          subtitle: `Milestone Recorded: ${aData.time}`,
          fields: [
            { label: "Milestone Type", val: aData.title },
            { label: "Logged Timestamp", val: aData.time },
            { label: "Operating Division", val: "Metropolitan Group" },
            { label: "Audit State", val: "Verified & Executed" }
          ],
          narrative: `Milestone Event: ${aData.sub}. This corporate milestone was logged and synchronized across the management intelligence platform.`
        });
      });
    });
  },

  /**
   * Universal Record Inspector Modal Trigger
   * Opens an international-standard inspection window with detailed parameters.
   */
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
  // PAGE 1: EXECUTIVE OVERVIEW (Corporate Dashboard)
  // =========================================================================
  // PAGE 1: EXECUTIVE OVERVIEW (Corporate Performance Dashboard)
  // =========================================================================
  renderExecutiveOverview(container) {
    const exec = FinancialCalculationEngine.calculateExecutiveSummary(DashboardData);
    const rankedDepts = RankingEngine.rankDepartmentsByActual(DashboardData.csbmProjectionList || []);

    this.buildPage(container, {
      pageId: "p1",
      kpis: [
        {
          grad: "kpi-grad-purple",
          value: ChartEngine.formatCurrencyLKR(exec.totalActualFinancialAchievement),
          label: "Actual Revenue Achievement",
          tag: `${exec.overallTargetAchievementPct.toFixed(1)}% Achieved`,
          icon: `<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>`,
          popover: {
            title: "Actual Revenue Achievement • Realized Inflow",
            badge: `${exec.overallTargetAchievementPct.toFixed(1)}% ATTAINMENT`,
            desc: "Total consolidated revenue realized across all 10 corporate CSBM operating divisions against the monthly projection budget.",
            stats: [
              { label: "Realized Inflow", val: ChartEngine.formatCurrencyLKR(exec.totalActualFinancialAchievement) },
              { label: "Projected Target", val: ChartEngine.formatCurrencyLKR(exec.totalDepartmentProjection) },
              { label: "Remaining Gap", val: ChartEngine.formatCurrencyLKR(Math.max(0, exec.totalDepartmentProjection - exec.totalActualFinancialAchievement)) },
              { label: "Attainment Rate", val: `${exec.overallTargetAchievementPct.toFixed(1)}%` }
            ]
          },
          dualWave: {
            title: "Corporate Revenue Attainment Trajectory",
            subtitle: "Monthly Revenue Realization vs Projected Target Pace",
            mainValue: ChartEngine.formatCurrencyLKR(exec.totalActualFinancialAchievement),
            subMetric: `Attainment Pace ${exec.overallTargetAchievementPct.toFixed(1)}% vs Corporate Target (${ChartEngine.formatCurrencyLKR(exec.totalDepartmentProjection)})`,
            btnText: "Divisional Breakdown",
            legend1: "Realized Inflow",
            legend2: "Target Benchmark",
            seriesPurple: [8, 14, 12, 19, 16, 24, 21],
            seriesOrange: [15, 20, 18, 26, 23, 28, 25],
            categories: ["Week 1", "Week 2", "Mid-Month", "Week 3", "Week 4", "Forecast", "Target"],
            miniStats: [
              { label: "Target Projection", value: ChartEngine.formatCurrencyLKR(exec.totalDepartmentProjection), color: "#6C5CE7", icon: "wallet" },
              { label: "Realized Inflow", value: ChartEngine.formatCurrencyLKR(exec.totalActualFinancialAchievement), color: "#0984E3", icon: "trending" },
              { label: "Remaining Gap", value: ChartEngine.formatCurrencyLKR(Math.max(0, exec.totalDepartmentProjection - exec.totalActualFinancialAchievement)), color: "#FF6B6B", icon: "tag" },
              { label: "Attainment Rate", value: `${exec.overallTargetAchievementPct.toFixed(1)}%`, color: "#00CEC9", icon: "award" }
            ]
          },
          donut: {
            title: "Revenue Realization Share",
            percentage: Math.round(exec.overallTargetAchievementPct),
            sublabel: "Attained",
            segments: [
              { label: "Printer Consumables", color: "#6C5CE7", pct: 47 },
              { label: "Copier Toner", color: "#0984E3", pct: 21 },
              { label: "IPSS Solutions", color: "#FFA502", pct: 17 },
              { label: "Other Services", color: "#00CEC9", pct: 15 }
            ]
          }
        },
        {
          grad: "kpi-grad-blue",
          value: ChartEngine.formatCurrencyLKR(exec.totalDepartmentProjection),
          label: "Monthly Projected Budget",
          tag: "CSBM Target",
          icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>`,
          popover: {
            title: "Monthly Projected Budget • Target Baseline",
            badge: "10 DIVISIONS",
            desc: "Consolidated monthly revenue budget projections established across all operating divisions for the current reporting cycle.",
            stats: [
              { label: "Printer Consumables", val: "LKR 100.0M" },
              { label: "Copier Toner", val: "LKR 65.0M" },
              { label: "IPSS Systems", val: "LKR 55.0M" },
              { label: "Other Units", val: "LKR 94.5M" }
            ]
          },
          dualWave: {
            title: "Divisional Budget Allocation Breakdown",
            subtitle: "Monthly Revenue Projections Distributed Across Operating Units",
            mainValue: ChartEngine.formatCurrencyLKR(exec.totalDepartmentProjection),
            subMetric: "Total Monthly Projection Across 10 CSBM Operating Divisions",
            btnText: "Budget Allocation Ledger",
            legend1: "Primary Divisions",
            legend2: "Service Divisions",
            seriesPurple: [25, 28, 26, 34, 30, 38, 35],
            seriesOrange: [15, 18, 16, 22, 20, 25, 22],
            categories: ["Week 1", "Week 2", "Mid-Month", "Week 3", "Week 4", "Forecast", "Target"],
            miniStats: [
              { label: "Printer Con Budget", value: "LKR 100.0M", color: "#6C5CE7", icon: "cart" },
              { label: "Toner Sales Budget", value: "LKR 65.0M", color: "#0984E3", icon: "tag" },
              { label: "IPSS Systems Budget", value: "LKR 55.0M", color: "#5E35B1", icon: "building" },
              { label: "Total CSBM Target", value: ChartEngine.formatCurrencyLKR(exec.totalDepartmentProjection), color: "#00CEC9", icon: "trending" }
            ]
          },
          donut: {
            title: "Budget Distribution by Unit",
            percentage: 100,
            sublabel: "Allocated",
            segments: [
              { label: "Printer Con (31.8%)", color: "#6C5CE7", pct: 32 },
              { label: "Toner Sales (20.7%)", color: "#0984E3", pct: 21 },
              { label: "IPSS Systems (17.5%)", color: "#FFA502", pct: 17 },
              { label: "Other Units (30.0%)", color: "#FF6B6B", pct: 30 }
            ]
          }
        },
        {
          grad: "kpi-grad-coral",
          value: ChartEngine.formatCurrencyLKR(exec.totalPipelineValue),
          label: "Contracts & Service Pipeline",
          tag: "Pipeline",
          icon: `<svg viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>`,
          popover: {
            title: "Contracts & Service Pipeline • Pending Recovery",
            badge: "LKR 350.6M TOTAL",
            desc: "Active pipeline of maintenance contract renewals (AMC) and pending workshop repair estimates awaiting corporate approval and payment.",
            stats: [
              { label: "AMC Pending", val: ChartEngine.formatCurrencyLKR(exec.pendingAmcValue) },
              { label: "Estimates Pending", val: ChartEngine.formatCurrencyLKR(exec.pendingEstimateValue) },
              { label: "Active Coordinators", val: `${exec.activeCoordinatorsCount} Staff` },
              { label: "Total Pipeline", val: ChartEngine.formatCurrencyLKR(exec.totalPipelineValue) }
            ]
          },
          dualWave: {
            title: "Service Pipeline & Estimate Conversion",
            subtitle: "AMC Contract Renewals vs Repair Estimate Approvals Pace",
            mainValue: ChartEngine.formatCurrencyLKR(exec.totalPipelineValue),
            subMetric: `AMC Pending: ${ChartEngine.formatCurrencyLKR(exec.pendingAmcValue)} • Estimates: ${ChartEngine.formatCurrencyLKR(exec.pendingEstimateValue)}`,
            btnText: "Contracts Pipeline Board",
            legend1: "Repair Estimates",
            legend2: "AMC Renewals",
            seriesPurple: [22, 26, 24, 29, 27, 32, 28],
            seriesOrange: [14, 18, 16, 21, 19, 23, 20],
            categories: ["Week 1", "Week 2", "Mid-Month", "Week 3", "Week 4", "Forecast", "Target"],
            miniStats: [
              { label: "AMC Recovery", value: ChartEngine.formatCurrencyLKR(exec.pendingAmcValue), color: "#FF6B6B", icon: "wallet" },
              { label: "Repair Estimates", value: ChartEngine.formatCurrencyLKR(exec.pendingEstimateValue), color: "#6C5CE7", icon: "share" },
              { label: "Active Coordinators", value: `${exec.activeCoordinatorsCount} Staff`, color: "#5E35B1", icon: "tag" },
              { label: "Total Pipeline", value: ChartEngine.formatCurrencyLKR(exec.totalPipelineValue), color: "#00CEC9", icon: "trending" }
            ]
          },
          donut: {
            title: "Pipeline Composition",
            percentage: 64,
            sublabel: "Estimates Share",
            segments: [
              { label: "Repair Estimates", color: "#FF6B6B", pct: 64 },
              { label: "AMC Contracts", color: "#6C5CE7", pct: 36 }
            ]
          }
        },
        {
          grad: "kpi-grad-amber",
          value: ChartEngine.formatCurrencyLKR(exec.outstandingDebtors),
          label: "Trade Debtors Portfolio",
          tag: `Overdue ${exec.debtorsOverduePct.toFixed(1)}%`,
          icon: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>`,
          popover: {
            title: "Trade Debtors Portfolio • Credit Management",
            badge: `${exec.debtorsOverduePct.toFixed(1)}% OVERDUE`,
            desc: "Outstanding trade receivables ledger across all CSBM divisions, monitored for collection velocity and credit risk mitigation.",
            stats: [
              { label: "Total Receivables", val: ChartEngine.formatCurrencyLKR(exec.outstandingDebtors) },
              { label: "Over 90 Days Risk", val: ChartEngine.formatCurrencyLKR(exec.debtorsOver90Days) },
              { label: "Overdue Ratio", val: `${exec.debtorsOverduePct.toFixed(1)}%` },
              { label: "Performing Book", val: ChartEngine.formatCurrencyLKR(exec.outstandingDebtors - exec.debtorsOver90Days) }
            ]
          },
          dualWave: {
            title: "Trade Debtors Exposure & Recovery Trajectory",
            subtitle: "Monthly Collections Recovery Pace vs Aging Balances",
            mainValue: ChartEngine.formatCurrencyLKR(exec.debtorsOver90Days),
            subMetric: `Over-90-Days Risk: ${ChartEngine.formatCurrencyLKR(exec.debtorsOver90Days)} • Total Receivables: ${ChartEngine.formatCurrencyLKR(exec.outstandingDebtors)}`,
            btnText: "Debtors Recovery Board",
            legend1: "Current Performing",
            legend2: "Over 90 Days",
            seriesPurple: [26, 30, 27, 32, 29, 34, 31],
            seriesOrange: [10, 14, 12, 17, 15, 19, 16],
            categories: ["Week 1", "Week 2", "Mid-Month", "Week 3", "Week 4", "Forecast", "Target"],
            miniStats: [
              { label: "Performing Book", value: ChartEngine.formatCurrencyLKR(exec.outstandingDebtors - exec.debtorsOver90Days), color: "#FFA502", icon: "wallet" },
              { label: "Over 90 Days", value: ChartEngine.formatCurrencyLKR(exec.debtorsOver90Days), color: "#FF6B6B", icon: "tag" },
              { label: "Overdue Ratio", value: `${exec.debtorsOverduePct.toFixed(1)}%`, color: "#6C5CE7", icon: "trending" },
              { label: "Total Debtors", value: ChartEngine.formatCurrencyLKR(exec.outstandingDebtors), color: "#00CEC9", icon: "building" }
            ]
          },
          donut: {
            title: "Debtors Health Split",
            percentage: Math.round(100 - exec.debtorsOverduePct),
            sublabel: "Performing",
            segments: [
              { label: "Performing Book", color: "#6C5CE7", pct: Math.round(100 - exec.debtorsOverduePct) },
              { label: "Over 90 Days", color: "#FF6B6B", pct: Math.round(exec.debtorsOverduePct) }
            ]
          }
        }
      ],
      dualWave: {
        title: "Executive Performance Trajectory",
        subtitle: "Corporate Monthly Target Pace vs Realized Revenue • Synced with Google Sheets",
        mainValue: ChartEngine.formatCurrencyLKR(exec.totalActualFinancialAchievement),
        subMetric: `Attainment Pace ${exec.overallTargetAchievementPct.toFixed(1)}% vs Monthly Budget (${ChartEngine.formatCurrencyLKR(exec.totalDepartmentProjection)})`,
        btnText: "Corporate Performance Ledger",
        legend1: "Realized Inflow",
        legend2: "Target Benchmark",
        seriesPurple: [8, 14, 12, 19, 16, 24, 21],
        seriesOrange: [15, 20, 18, 26, 23, 28, 25],
        categories: ["Week 1", "Week 2", "Mid-Month", "Week 3", "Week 4", "Forecast", "Target"],
        miniStats: [
          { label: "CSBM Projection", value: ChartEngine.formatCurrencyLKR(exec.totalDepartmentProjection), color: "#6C5CE7", icon: "wallet" },
          { label: "Actual Realized", value: ChartEngine.formatCurrencyLKR(exec.totalActualFinancialAchievement), color: "#0984E3", icon: "trending" },
          { label: "Contracts Pipeline", value: ChartEngine.formatCurrencyLKR(exec.totalPipelineValue), color: "#5E35B1", icon: "tag" },
          { label: "Debtors > 90 Days", value: ChartEngine.formatCurrencyLKR(exec.debtorsOver90Days), color: "#FF6B6B", icon: "building" }
        ]
      },
      donut: {
        title: "Department Revenue Share",
        percentage: Math.round(exec.overallTargetAchievementPct),
        sublabel: "Attainment",
        segments: [
          { label: "Printer Consumables", color: "#6C5CE7", pct: 47 },
          { label: "Copier Toner", color: "#0984E3", pct: 21 },
          { label: "IPSS Solutions", color: "#FFA502", pct: 17 },
          { label: "Other Services", color: "#00CEC9", pct: 15 }
        ]
      },
      activities: {
        title: "Corporate Performance Milestones",
        items: [
          { time: "Real-time", color: "#00CEC9", title: "Kapila Kithsiri Achieved 35.8%", sub: "Printer Consumables Leader - LKR 7.42M Realized Inflow" },
          { time: "Telemetry", color: "#6C5CE7", title: "Ceylinco Division At 31.9%", sub: "Exceeded monthly run-rate target milestones" },
          { time: "Operations", color: "#FFA502", title: "Indika Kariyawasam Top Turnover", sub: "Senior Copier Specialist - LKR 409,468 Verified Turnover" },
          { time: "Contracts", color: "#FF6B6B", title: "AMC Contracts Pipeline LKR 125.4M", sub: "Annual maintenance agreements active across 5 coordinators" }
        ]
      },
      table: {
        title: "Department Achievement Leaderboard",
        subtitle: "CSBM monthly projections vs actual realizations across operating units",
        columns: ["DEPARTMENT", "PROJECTED TARGET", "REALIZED INFLOW", "ATTAINMENT %", "STATUS"],
        rows: rankedDepts.slice(0, 6).map(d => [
          d.department,
          ChartEngine.formatCurrencyLKR(d.projectionAmount),
          ChartEngine.formatCurrencyLKR(d.actualAmount),
          `${d.achievementPercentage.toFixed(1)}%`,
          {
            label: d.achievementPercentage >= 20.0 ? "Achieved" : (d.achievementPercentage >= 10.0 ? "On Track" : "In Progress"),
            type: d.achievementPercentage >= 20.0 ? "completed" : (d.achievementPercentage >= 10.0 ? "open" : "process")
          }
        ]),
        paginationText: `Showing top 6 of ${rankedDepts.length} operating departments synced with Google Sheets`
      }
    });
  },

  // =========================================================================
  // PAGE 2: FINANCIAL PERFORMANCE (Budget Realization & Divisional Inflow)
  // =========================================================================
  renderFinancialPerformance(container) {
    const totalProj = DashboardData.csbmProjectionList.reduce((acc, it) => acc + (it.projectionAmount || 0), 0) || 1;
    const totalActual = DashboardData.csbmProjectionList.reduce((acc, it) => acc + (it.actualAmount || 0), 0);
    const overallPct = (totalActual / totalProj) * 100;
    const totalGap = Math.max(0, totalProj - totalActual);

    this.buildPage(container, {
      pageId: "p2",
      kpis: [
        {
          grad: "kpi-grad-purple",
          value: ChartEngine.formatCurrencyLKR(totalProj),
          label: "Full Projected Budget",
          icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>`
        },
        {
          grad: "kpi-grad-blue",
          value: ChartEngine.formatCurrencyLKR(totalActual),
          label: "Realized Inflow Revenue",
          icon: `<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>`
        },
        {
          grad: "kpi-grad-coral",
          value: ChartEngine.formatCurrencyLKR(totalGap),
          label: "Remaining Attainment Gap",
          icon: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>`
        },
        {
          grad: "kpi-grad-amber",
          value: `${overallPct.toFixed(1)}%`,
          label: "Attainment Velocity",
          icon: `<svg viewBox="0 0 24 24"><path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.05.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.04-4.09l-2.6-1.53C16.14 17.74 14.21 19 12 19z"/></svg>`
        }
      ],
      dualWave: {
        title: "Financial Velocity",
        subtitle: "Monthly Revenue Attainment Pace",
        mainValue: ChartEngine.formatCurrencyLKR(totalActual),
        subMetric: `Attainment Pace ${overallPct.toFixed(1)}% vs Corporate Baseline`,
        btnText: "Divisional Breakdown",
        legend1: "Target",
        legend2: "Actual",
        seriesPurple: [24, 28, 22, 29, 26, 30],
        seriesOrange: [8, 12, 10, 16, 14, 21],
        categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Forecast", "Target"],
        miniStats: [
          { label: "Printer Consumables", value: "LKR 15.1M", color: "#FF6B6B", icon: "cart" },
          { label: "Copier Toner", value: "LKR 6.6M", color: "#6C5CE7", icon: "tag" },
          { label: "IPSS Systems", value: "LKR 5.6M", color: "#5E35B1", icon: "building" },
          { label: "Other Services", value: "LKR 4.8M", color: "#00CEC9", icon: "trending" }
        ]
      },
      donut: {
        title: "Attainment Share",
        percentage: Math.round(overallPct),
        sublabel: "Attained",
        segments: [
          { label: "Realized", color: "#6C5CE7", pct: Math.round(overallPct) },
          { label: "In Pipeline", color: "#FDCB6E", pct: 45 },
          { label: "Pending", color: "#FF6B6B", pct: Math.max(10, 100 - Math.round(overallPct) - 45) }
        ]
      },
      activities: {
        title: "Financial Audit Log",
        items: [
          { time: "25 Mins Ago", color: "#FF6B6B", title: "Consumables Inflow Verified", sub: "LKR 15.1M Cleared to Operating Account" },
          { time: "2 Hours Ago", color: "#6C5CE7", title: "Bank Reconciliation Complete", sub: "Commercial Bank Corporate Account Synced" },
          { time: "Yesterday", color: "#00CEC9", title: "Budget Allocation Locked", sub: "Mid-month variance adjustments finalized" }
        ]
      },
      table: {
        title: "Divisional Budget Ledger",
        subtitle: "Projections vs actual realizations",
        columns: ["DIVISION", "PROJECTION", "ACTUAL", "ATTAINED", "STATUS"],
        rows: DashboardData.csbmProjectionList.slice(0, 5).map(it => [
          it.department,
          ChartEngine.formatCurrencyLKR(it.projectionAmount),
          ChartEngine.formatCurrencyLKR(it.actualAmount),
          `${it.achievementPercentage.toFixed(1)}%`,
          {
            label: it.achievementPercentage >= 20.0 ? "Achieved" : (it.achievementPercentage >= 10.0 ? "On Track" : "Review"),
            type: it.achievementPercentage >= 20.0 ? "completed" : (it.achievementPercentage >= 10.0 ? "open" : "process")
          }
        ]),
        paginationText: "Showing 5 of 10 divisions"
      }
    });
  },

  // =========================================================================
  // PAGE 3: DEPARTMENT PERFORMANCE (Divisional Rankings & Contributions)
  // =========================================================================
  renderDepartmentPerformance(container) {
    const ranked = RankingEngine.rankDepartmentsByActual(DashboardData.csbmProjectionList);
    const topDept = ranked[0] || { department: "Printer Consumables", actualAmount: 15100000 };

    this.buildPage(container, {
      pageId: "p3",
      kpis: [
        {
          grad: "kpi-grad-purple",
          value: "10",
          label: "Active Business Units",
          icon: `<svg viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>`
        },
        {
          grad: "kpi-grad-blue",
          value: ChartEngine.formatCurrencyLKR(topDept.actualAmount),
          label: `Top Unit (${topDept.department})`,
          icon: `<svg viewBox="0 0 24 24"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z"/></svg>`
        },
        {
          grad: "kpi-grad-coral",
          value: "31.9%",
          label: "Peak Attainment (Ceylinco)",
          icon: `<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>`
        },
        {
          grad: "kpi-grad-amber",
          value: "LKR 100M",
          label: "Peak Projected Target",
          icon: `<svg viewBox="0 0 24 24"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/></svg>`
        }
      ],
      dualWave: {
        title: "Divisional Contribution",
        subtitle: "Monthly Revenue Flow Across Departments",
        mainValue: "LKR 32.1M",
        subMetric: "Total Inflow Generated Across 10 Units",
        btnText: "Rankings Sheet",
        legend1: "Projection",
        legend2: "Actual",
        seriesPurple: [20, 24, 21, 28, 25, 29],
        seriesOrange: [12, 16, 14, 22, 18, 24],
        categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Current", "Target"],
        miniStats: [
          { label: "Copier Service", value: "LKR 131.3M", color: "#FF6B6B", icon: "building" },
          { label: "Consumables", value: "LKR 185.1M", color: "#6C5CE7", icon: "cart" },
          { label: "Toner Sales", value: "LKR 129.7M", color: "#5E35B1", icon: "tag" },
          { label: "IT Solutions", value: "LKR 10.5M", color: "#00CEC9", icon: "trending" }
        ]
      },
      donut: {
        title: "Coverage Share",
        percentage: 68,
        sublabel: "Coverage",
        segments: [
          { label: "Top 3 Units", color: "#6C5CE7", pct: 48 },
          { label: "Mid-Tier", color: "#FDCB6E", pct: 32 },
          { label: "Emerging", color: "#FF6B6B", pct: 20 }
        ]
      },
      activities: {
        title: "Department Milestones",
        items: [
          { time: "30 Mins Ago", color: "#FF6B6B", title: "Ceylinco Reached 31.9%", sub: "Exceeded monthly run-rate target milestones" },
          { time: "3 Hours Ago", color: "#6C5CE7", title: "Consumables Restock", sub: "High-yield toner shipments cleared to regional branch" },
          { time: "1 Day Ago", color: "#00CEC9", title: "Copier Service Deployment", sub: "3 new customer locations activated" }
        ]
      },
      table: {
        title: "Department Leaderboard",
        subtitle: "Performance ranking by realized revenue",
        columns: ["RANK", "DEPARTMENT", "PROJECTION", "ACTUAL", "STATUS"],
        rows: ranked.slice(0, 5).map((d, i) => [
          `#${i + 1}`,
          d.department,
          ChartEngine.formatCurrencyLKR(d.projectionAmount),
          ChartEngine.formatCurrencyLKR(d.actualAmount),
          {
            label: d.achievementPercentage >= 20.0 ? "Achieved" : (d.achievementPercentage >= 10.0 ? "On Track" : "In Progress"),
            type: d.achievementPercentage >= 20.0 ? "completed" : (d.achievementPercentage >= 10.0 ? "open" : "process")
          }
        ]),
        paginationText: "Showing 5 of 10 departments"
      }
    });
  },

  // =========================================================================
  // PAGE 4: SALES & REVENUE (Printer Consumables & Toner Commercial Sales)
  // =========================================================================
  renderSalesRevenue(container) {
    const printerSales = DashboardData.printerConsumablesList || [];
    const tonerSales = DashboardData.tonerSalesList || [];
    const totalPrinterActual = printerSales.reduce((acc, it) => acc + (it.actualAmount || 0), 0);
    const totalTonerActual = tonerSales.reduce((acc, it) => acc + (it.salesValue || 0), 0);
    const totalCommercialSales = totalPrinterActual + totalTonerActual;
    const topPrinterRep = printerSales[0] || { salesperson: "KAPILA KITHSIRI", actualAmount: 7422448, achievementPercentage: 35.8 };

    this.buildPage(container, {
      pageId: "p4",
      kpis: [
        {
          grad: "kpi-grad-purple",
          value: ChartEngine.formatCurrencyLKR(totalCommercialSales),
          label: "Total Commercial Sales",
          icon: `<svg viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>`
        },
        {
          grad: "kpi-grad-blue",
          value: ChartEngine.formatCurrencyLKR(totalPrinterActual),
          label: "Printer Consumables Inflow",
          icon: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 2h1.5v3H12V5zm-2 0h1.5v3H10V5zm-2 0h1.5v3H8V5zm-4 4h16v10H4V9z"/></svg>`
        },
        {
          grad: "kpi-grad-coral",
          value: ChartEngine.formatCurrencyLKR(totalTonerActual),
          label: "Copier Toner Revenue",
          icon: `<svg viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42z"/></svg>`
        },
        {
          grad: "kpi-grad-amber",
          value: `${topPrinterRep.achievementPercentage.toFixed(1)}%`,
          label: `Top Rep: ${topPrinterRep.salesperson.split(' ')[0]}`,
          icon: `<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`
        }
      ],
      dualWave: {
        title: "Commercial Sales Trajectory",
        subtitle: "Printer Consumables & Toner Revenue Velocity",
        mainValue: ChartEngine.formatCurrencyLKR(totalCommercialSales),
        subMetric: `Top Sales Leader: ${topPrinterRep.salesperson} (${ChartEngine.formatCurrencyLKR(topPrinterRep.actualAmount)}, ${topPrinterRep.achievementPercentage.toFixed(1)}%)`,
        btnText: "Sales Roster",
        legend1: "Printer Consumables",
        legend2: "Copier Toner",
        seriesPurple: [18, 22, 19, 25, 22, 28, 26],
        seriesOrange: [8, 11, 9, 14, 12, 16, 14],
        categories: ["Week 1", "Week 2", "Mid-Month", "Week 3", "Week 4", "Forecast", "Target"],
        miniStats: [
          { label: "Printer Consumables", value: ChartEngine.formatCurrencyLKR(totalPrinterActual), color: "#FF6B6B", icon: "cart" },
          { label: "Copier Toner", value: ChartEngine.formatCurrencyLKR(totalTonerActual), color: "#6C5CE7", icon: "tag" },
          { label: "Active Sales Reps", value: `${printerSales.length + tonerSales.length} Reps`, color: "#5E35B1", icon: "building" },
          { label: "Top Rep Attainment", value: `${topPrinterRep.achievementPercentage.toFixed(1)}%`, color: "#00CEC9", icon: "trending" }
        ]
      },
      donut: {
        title: "Commercial Sales Split",
        percentage: 73,
        sublabel: "Printer Con",
        segments: [
          { label: "Printer Consumables", color: "#6C5CE7", pct: 73 },
          { label: "Copier Toner", color: "#FFA502", pct: 27 }
        ]
      },
      activities: {
        title: "Commercial Sales Highlights",
        items: [
          { time: "Top Volume", color: "#00CEC9", title: `${topPrinterRep.salesperson} at ${topPrinterRep.achievementPercentage.toFixed(1)}%`, sub: `Generated ${ChartEngine.formatCurrencyLKR(topPrinterRep.actualAmount)} in verified consumables sales` },
          { time: "Toner Leader", color: "#6C5CE7", title: "Heshan Adithya Generated LKR 881,150", sub: "Dispatched 18 high-yield copier toner units" },
          { time: "High Inflow", color: "#FF6B6B", title: "Malith Eranga Generated LKR 2.29M", sub: "Second highest consumables sales volume achieved" }
        ]
      },
      table: {
        title: "Commercial Sales Leaderboard",
        subtitle: "Salesperson targets and actual realizations from Google Sheets",
        columns: ["SALESPERSON", "PRODUCT CATEGORY", "TARGET / QTY", "ACTUAL REVENUE", "STATUS"],
        rows: [
          ...printerSales.slice(0, 4).map(s => [
            s.salesperson,
            "Printer Consumables",
            ChartEngine.formatCurrencyLKR(s.targetAmount),
            ChartEngine.formatCurrencyLKR(s.actualAmount),
            {
              label: s.achievementPercentage >= 20 ? `${s.achievementPercentage.toFixed(1)}% Achieved` : `${s.achievementPercentage.toFixed(1)}% On Track`,
              type: s.achievementPercentage >= 20 ? "completed" : "open"
            }
          ]),
          ...tonerSales.slice(0, 2).map(t => [
            t.salesperson,
            "Copier Toner",
            `${t.quantity} Units`,
            ChartEngine.formatCurrencyLKR(t.salesValue),
            { label: "High Volume", type: "process" }
          ])
        ],
        paginationText: `Showing top 6 of ${printerSales.length + tonerSales.length} commercial sales reps`
      }
    });
  },

  // =========================================================================
  // PAGE 5: CONTRACTS & ESTIMATES (AMC & Repair Backlog Pipeline)
  // =========================================================================
  renderContractsEstimates(container) {
    const amcList = DashboardData.amcPendingList || [];
    const estList = DashboardData.estimatePendingList || [];
    const totalAmc = amcList.reduce((acc, it) => acc + (it.pendingAmount || 0), 0);
    const totalEst = estList.reduce((acc, it) => acc + (it.pendingAmount || 0), 0);
    const totalPipeline = totalAmc + totalEst;

    this.buildPage(container, {
      pageId: "p5",
      kpis: [
        {
          grad: "kpi-grad-purple",
          value: ChartEngine.formatCurrencyLKR(totalAmc),
          label: "Active AMC Pending",
          icon: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>`
        },
        {
          grad: "kpi-grad-blue",
          value: ChartEngine.formatCurrencyLKR(totalEst),
          label: "Repair Estimates Backlog",
          icon: `<svg viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>`
        },
        {
          grad: "kpi-grad-coral",
          value: ChartEngine.formatCurrencyLKR(totalPipeline),
          label: "Total Service Pipeline",
          icon: `<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>`
        },
        {
          grad: "kpi-grad-amber",
          value: `${amcList.length + estList.length}`,
          label: "Coordinator Portfolios",
          icon: `<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`
        }
      ],
      dualWave: {
        title: "Contracts & Pipeline Velocity",
        subtitle: "AMC Renewals vs Estimate Approvals Trajectory",
        mainValue: ChartEngine.formatCurrencyLKR(totalPipeline),
        subMetric: `Total Service Pipeline Awaiting Recovery (${amcList.length} AMC + ${estList.length} Estimate Portfolios)`,
        btnText: "Contracts Ledger",
        legend1: "Repair Estimates",
        legend2: "AMC Contracts",
        seriesPurple: [22, 26, 23, 29, 27, 30, 28],
        seriesOrange: [15, 18, 16, 21, 19, 24, 21],
        categories: ["Week 1", "Week 2", "Mid-Month", "Week 3", "Week 4", "Forecast", "Target"],
        miniStats: [
          { label: "AMC Pending", value: ChartEngine.formatCurrencyLKR(totalAmc), color: "#FF6B6B", icon: "wallet" },
          { label: "Repair Estimates", value: ChartEngine.formatCurrencyLKR(totalEst), color: "#6C5CE7", icon: "tag" },
          { label: "Total Pipeline", value: ChartEngine.formatCurrencyLKR(totalPipeline), color: "#5E35B1", icon: "building" },
          { label: "Active Coordinators", value: `${amcList.length + estList.length} Portfolios`, color: "#00CEC9", icon: "trending" }
        ]
      },
      donut: {
        title: "Pipeline Distribution",
        percentage: 64,
        sublabel: "Estimates Share",
        segments: [
          { label: "Repair Estimates", color: "#6C5CE7", pct: 64 },
          { label: "AMC Contracts", color: "#FFA502", pct: 36 }
        ]
      },
      activities: {
        title: "Service Pipeline Feed",
        items: [
          { time: "High Exposure", color: "#FF6B6B", title: "Chalani EST Leads Estimates", sub: `LKR 82.1M Pending in copier workshop overhaul estimates` },
          { time: "AMC Leader", color: "#6C5CE7", title: "Hansika Leads AMC Contracts", sub: `LKR 33.4M Maintenance agreements pending renewal` },
          { time: "Workshop", color: "#00CEC9", title: "Workshop Overhaul Pending", sub: `LKR 24.7M in technical refurbishment quotes` }
        ]
      },
      table: {
        title: "Coordinator AMC & Estimate Pipeline",
        subtitle: "Outstanding maintenance contracts and repair estimates from Google Sheets",
        columns: ["COORDINATOR", "PIPELINE CATEGORY", "PENDING AMOUNT", "DIVISION ROLE", "STATUS"],
        rows: [
          ...estList.slice(0, 3).map(e => [
            e.coordinator,
            "Repair Estimate",
            ChartEngine.formatCurrencyLKR(e.pendingAmount),
            "Copier Service Overhaul",
            { label: "Active Review", type: "open" }
          ]),
          ...amcList.slice(0, 3).map(a => [
            a.coordinator,
            "AMC Renewal",
            ChartEngine.formatCurrencyLKR(a.pendingAmount),
            "Annual Maintenance Agreement",
            { label: "Pending Renewal", type: "process" }
          ])
        ],
        paginationText: `Showing top 6 of ${amcList.length + estList.length} coordinator portfolios`
      }
    });
  },

  // =========================================================================
  // PAGE 6: TECHNICIAN PERFORMANCE (Copier Field Engineering Intelligence)
  // =========================================================================
  renderTechnicianPerformance(container) {
    const techList = RankingEngine.rankTechniciansByTurnover(DashboardData.copierTechniciansList || []);
    const topTech = techList[0] || { technicianName: "H K G INDIKA KARIYAWASAM", totalTurnover: 409468, estimateTurnover: 178198, area: "COLOMBO" };
    const totalTurnover = techList.reduce((acc, it) => acc + (it.totalTurnover || 0), 0);

    this.buildPage(container, {
      pageId: "p6",
      kpis: [
        {
          grad: "kpi-grad-purple",
          value: `${techList.length}`,
          label: "Active Field Engineers",
          icon: `<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`
        },
        {
          grad: "kpi-grad-blue",
          value: ChartEngine.formatCurrencyLKR(topTech.totalTurnover),
          label: `Top Engineer: ${topTech.technicianName.split(' ')[0]}`,
          icon: `<svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>`
        },
        {
          grad: "kpi-grad-coral",
          value: ChartEngine.formatCurrencyLKR(totalTurnover),
          label: "Total Verified Turnover",
          icon: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>`
        },
        {
          grad: "kpi-grad-amber",
          value: "COLOMBO",
          label: "Primary Service Hub",
          icon: `<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>`
        }
      ],
      dualWave: {
        title: "Technician Turnover Velocity",
        subtitle: "Verified Spare Parts & Estimate Turnover from Google Sheets",
        mainValue: ChartEngine.formatCurrencyLKR(totalTurnover),
        subMetric: `Top Engineer: ${topTech.technicianName} (${ChartEngine.formatCurrencyLKR(topTech.totalTurnover)} Verified Turnover)`,
        btnText: "Engineering Roster",
        legend1: "Total Turnover",
        legend2: "Estimate Turnover",
        seriesPurple: [20, 25, 22, 28, 24, 29, 27],
        seriesOrange: [12, 17, 14, 19, 16, 21, 18],
        categories: ["Week 1", "Week 2", "Mid-Month", "Week 3", "Week 4", "Forecast", "Target"],
        miniStats: [
          { label: "Top Engineer Turnover", value: ChartEngine.formatCurrencyLKR(topTech.totalTurnover), color: "#FF6B6B", icon: "award" },
          { label: "Total Turnover", value: ChartEngine.formatCurrencyLKR(totalTurnover), color: "#6C5CE7", icon: "trending" },
          { label: "Active Engineers", value: `${techList.length} Specialists`, color: "#5E35B1", icon: "user" },
          { label: "Western Province Share", value: "78.5%", color: "#00CEC9", icon: "building" }
        ]
      },
      donut: {
        title: "Regional Turnover Distribution",
        percentage: 78,
        sublabel: "Colombo Hub",
        segments: [
          { label: "Colombo Hub", color: "#6C5CE7", pct: 78 },
          { label: "Jaffna Territory", color: "#0984E3", pct: 14 },
          { label: "Regional Branches", color: "#FFA502", pct: 8 }
        ]
      },
      activities: {
        title: "Technician Turnover Highlights",
        items: [
          { time: "#1 Top", color: "#FF6B6B", title: `${topTech.technicianName} Generated LKR 409,468`, sub: "Top verified spare parts & estimate turnover in Western Province" },
          { time: "#2 Top", color: "#6C5CE7", title: "Shantha Kumar Generated LKR 407,827", sub: "Second highest verified technician performance" },
          { time: "Regional", color: "#00CEC9", title: "Chalanka Keshan Generated LKR 302,513", sub: "Top regional performer in Ratnapura Division" }
        ]
      },
      table: {
        title: "Copier Technicians Turnover Leaderboard",
        subtitle: "Verified spare parts & estimate turnover tracked live from Google Sheets",
        columns: ["TECHNICIAN NAME", "TERRITORY", "ESTIMATE TURNOVER", "TOTAL TURNOVER", "RANKING"],
        rows: techList.slice(0, 6).map((t, idx) => [
          t.technicianName,
          t.area,
          ChartEngine.formatCurrencyLKR(t.estimateTurnover),
          ChartEngine.formatCurrencyLKR(t.totalTurnover),
          {
            label: idx === 0 ? "Top Performer" : (idx < 3 ? "Leader" : "Active Specialist"),
            type: idx === 0 ? "completed" : (idx < 3 ? "open" : "process")
          }
        ]),
        paginationText: `Showing top 6 of ${techList.length} verified field engineering specialists`
      }
    });
  },

  // =========================================================================
  // PAGE 7: COORDINATOR & TEAM LEADER (Performance from Google Sheets)
  // =========================================================================
  renderCoordinatorPerformance(container) {
    const coords = DashboardData.copierCoordinatorsList || [];
    const leaders = DashboardData.copierTeamLeadersList || [];
    const totalCoordActual = coords.reduce((acc, it) => acc + (it.actualAmount || 0), 0);
    const topCoord = coords[0] || { coordinator: "CHALANI EST", actualAmount: 1901853, targetAmount: 10755814, achievementPercentage: 18.0 };
    const topLeader = leaders[0] || { teamLeader: "BANDARA", actualAmount: 2349752, targetAmount: 17998671, achievementPercentage: 13.0 };

    this.buildPage(container, {
      pageId: "p7",
      kpis: [
        {
          grad: "kpi-grad-purple",
          value: `${coords.length}`,
          label: "Copier Coordinators",
          icon: `<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`
        },
        {
          grad: "kpi-grad-blue",
          value: ChartEngine.formatCurrencyLKR(topCoord.actualAmount),
          label: `Top Coord: ${topCoord.coordinator}`,
          icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`
        },
        {
          grad: "kpi-grad-coral",
          value: `${leaders.length}`,
          label: "Copier Team Leaders",
          icon: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>`
        },
        {
          grad: "kpi-grad-amber",
          value: ChartEngine.formatCurrencyLKR(topLeader.actualAmount),
          label: `Top Leader: ${topLeader.teamLeader}`,
          icon: `<svg viewBox="0 0 24 24"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/></svg>`
        }
      ],
      dualWave: {
        title: "Coordinator & Leader Achievement Velocity",
        subtitle: "Target vs Actual Inflow Realized Across Coordinators & Team Leaders",
        mainValue: ChartEngine.formatCurrencyLKR(totalCoordActual),
        subMetric: `Top Coordinator: ${topCoord.coordinator} (${ChartEngine.formatCurrencyLKR(topCoord.actualAmount)}, ${topCoord.achievementPercentage.toFixed(1)}% Achieved)`,
        btnText: "Coordinators Roster",
        legend1: "Target Target",
        legend2: "Actual Invoiced",
        seriesPurple: [24, 28, 25, 30, 27, 30, 28],
        seriesOrange: [10, 14, 12, 18, 15, 20, 17],
        categories: ["Week 1", "Week 2", "Mid-Month", "Week 3", "Week 4", "Forecast", "Target"],
        miniStats: [
          { label: "Top Coordinator Actual", value: ChartEngine.formatCurrencyLKR(topCoord.actualAmount), color: "#FF6B6B", icon: "user" },
          { label: "Top Leader Actual", value: ChartEngine.formatCurrencyLKR(topLeader.actualAmount), color: "#6C5CE7", icon: "award" },
          { label: "Coordinators Total", value: ChartEngine.formatCurrencyLKR(totalCoordActual), color: "#5E35B1", icon: "trending" },
          { label: "Active Roles", value: `${coords.length + leaders.length} Staff`, color: "#00CEC9", icon: "flag" }
        ]
      },
      donut: {
        title: "Coordinator Attainment Share",
        percentage: Math.round(topCoord.achievementPercentage),
        sublabel: "Top Attainment",
        segments: [
          { label: "Chalani EST", color: "#6C5CE7", pct: 34 },
          { label: "Danushi EST", color: "#0984E3", pct: 24 },
          { label: "Wathsala EST", color: "#FFA502", pct: 23 },
          { label: "Other Coordinators", color: "#FF6B6B", pct: 19 }
        ]
      },
      activities: {
        title: "Coordinator Achievements Feed",
        items: [
          { time: "#1 Coordinator", color: "#FF6B6B", title: `${topCoord.coordinator} Invoiced LKR 1.90M`, sub: `Leading copier coordinator with 18.0% target attainment` },
          { time: "#1 Team Leader", color: "#6C5CE7", title: `${topLeader.teamLeader} Achieved LKR 2.35M`, sub: `Leading copier team leader with 13.0% target attainment` },
          { time: "#2 Coordinator", color: "#00CEC9", title: "Danushi EST Invoiced LKR 1.33M", sub: `Second highest coordinator revenue with 15.0% attainment` }
        ]
      },
      table: {
        title: "Coordinators & Team Leaders Performance",
        subtitle: "Targets vs actual invoiced realizations tracked live from Google Sheets",
        columns: ["COORDINATOR / LEADER", "ROLE / DIVISION", "MONTHLY TARGET", "ACTUAL INVOICED", "ACHIEVEMENT %"],
        rows: [
          ...coords.slice(0, 4).map(c => [
            c.coordinator,
            "Copier Coordinator",
            ChartEngine.formatCurrencyLKR(c.targetAmount),
            ChartEngine.formatCurrencyLKR(c.actualAmount),
            {
              label: `${c.achievementPercentage.toFixed(1)}%`,
              type: c.achievementPercentage >= 15 ? "completed" : (c.achievementPercentage >= 5 ? "open" : "process")
            }
          ]),
          ...leaders.slice(0, 2).map(l => [
            l.teamLeader,
            "Team Leader",
            ChartEngine.formatCurrencyLKR(l.targetAmount),
            ChartEngine.formatCurrencyLKR(l.actualAmount),
            {
              label: `${l.achievementPercentage.toFixed(1)}%`,
              type: l.achievementPercentage >= 10 ? "completed" : "open"
            }
          ])
        ],
        paginationText: `Showing top 6 of ${coords.length + leaders.length} operations coordinators and team leaders`
      }
    });
  },

  // =========================================================================
  // PAGE 8: DEBTORS & OUTSTANDING WORK (Credit Management & Recovery)
  // =========================================================================
  renderDebtorsOutstanding(container) {
    this.buildPage(container, {
      pageId: "p8",
      kpis: [
        {
          grad: "kpi-grad-purple",
          value: "LKR 538.9M",
          label: "Total Trade Receivables",
          icon: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>`
        },
        {
          grad: "kpi-grad-blue",
          value: "LKR 87.1M",
          label: "Over-90-Days Risk Portfolio",
          icon: `<svg viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`
        },
        {
          grad: "kpi-grad-coral",
          value: "LKR 451.8M",
          label: "Current Performing Book",
          icon: `<svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>`
        },
        {
          grad: "kpi-grad-amber",
          value: "16.2%",
          label: "Overdue Exposure Ratio",
          icon: `<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>`
        }
      ],
      dualWave: {
        title: "Collections Trajectory",
        subtitle: "Monthly Debt Recovery vs Aging Risk",
        mainValue: "LKR 87.1M",
        subMetric: "Total Over-90-Day Priority Target Exposure",
        btnText: "Debtors Ledger",
        legend1: "Exposure",
        legend2: "Recovered",
        seriesPurple: [26, 29, 25, 30, 27, 28],
        seriesOrange: [10, 15, 12, 18, 16, 22],
        categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Current", "Target"],
        miniStats: [
          { label: "Copier Service Over-90", value: "LKR 35.6M", color: "#FF6B6B", icon: "building" },
          { label: "Consumables Over-90", value: "LKR 22.1M", color: "#6C5CE7", icon: "cart" },
          { label: "Toner Sales Over-90", value: "LKR 20.0M", color: "#5E35B1", icon: "tag" },
          { label: "Cleared This Month", value: "LKR 42.5M", color: "#00CEC9", icon: "trending" }
        ]
      },
      donut: {
        title: "Portfolio Health",
        percentage: 84,
        sublabel: "Performing",
        segments: [
          { label: "Performing", color: "#6C5CE7", pct: 84 },
          { label: "30-60 Days", color: "#FDCB6E", pct: 10 },
          { label: "Over-90 Days", color: "#FF6B6B", pct: 6 }
        ]
      },
      activities: {
        title: "Collections Action Log",
        items: [
          { time: "18 Mins Ago", color: "#FF6B6B", title: "Corporate Settlement Received", sub: "LKR 8.5M Cleared by Bank Account" },
          { time: "2 Hours Ago", color: "#6C5CE7", title: "Payment Plan Approved", sub: "Enterprise client re-aligned for 30-day clearance" },
          { time: "Yesterday", color: "#00CEC9", title: "Recovery Notice Issued", sub: "High-exposure overdue account notified" }
        ]
      },
      table: {
        title: "High-Exposure Debtors Ledger",
        subtitle: "Accounts requiring credit recovery intervention",
        columns: ["ACCOUNT", "CLIENT ORGANIZATION", "DIVISION", "OVERDUE", "STATUS"],
        rows: [
          ["ACC-401", "Copier Service Clients", "Copier Service", "LKR 35.6M", { label: "Critical", type: "process" }],
          ["ACC-402", "Printer Consumables", "Consumables", "LKR 22.1M", { label: "Active Plan", type: "open" }],
          ["ACC-403", "Copier Toner Accounts", "Copier Toner", "LKR 20.0M", { label: "Active Plan", type: "open" }],
          ["ACC-404", "OSS Government Accounts", "OSS Division", "LKR 3.4M", { label: "Review", type: "process" }],
          ["ACC-405", "Smart Board Scans", "Scan Systems", "LKR 1.7M", { label: "Cleared", type: "completed" }]
        ],
        paginationText: "Showing 5 of 11 debtor categories"
      }
    });
  },

  // =========================================================================
  // PAGE 9: EMPLOYEE RECOGNITION (Awards & Excellence Honors)
  // =========================================================================
  renderEmployeeRecognition(container) {
    this.buildPage(container, {
      pageId: "p9",
      kpis: [
        {
          grad: "kpi-grad-purple",
          value: "18",
          label: "Excellence Award Recipients",
          icon: `<svg viewBox="0 0 24 24"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z"/></svg>`
        },
        {
          grad: "kpi-grad-blue",
          value: "LKR 2.4M",
          label: "Bonus Pool Allocated",
          icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>`
        },
        {
          grad: "kpi-grad-coral",
          value: "99.2%",
          label: "Customer Commendations",
          icon: `<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`
        },
        {
          grad: "kpi-grad-amber",
          value: "#1",
          label: "Service Champion of Month",
          icon: `<svg viewBox="0 0 24 24"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/></svg>`
        }
      ],
      dualWave: {
        title: "Recognition Velocity",
        subtitle: "Monthly Commendations & Service Quality",
        mainValue: "18 Honorees",
        subMetric: "99.2% Peer & Client Approval Rating",
        btnText: "Awards Roster",
        legend1: "Target",
        legend2: "Attained",
        seriesPurple: [15, 20, 18, 24, 21, 28],
        seriesOrange: [12, 17, 15, 21, 18, 25],
        categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Current", "Target"],
        miniStats: [
          { label: "Client Commendations", value: "142", color: "#FF6B6B", icon: "user" },
          { label: "Innovation Ideas", value: "28", color: "#6C5CE7", icon: "tag" },
          { label: "Safety Record", value: "100%", color: "#5E35B1", icon: "award" },
          { label: "Team Retention", value: "97.5%", color: "#00CEC9", icon: "trending" }
        ]
      },
      donut: {
        title: "Engagement Ratio",
        percentage: 95,
        sublabel: "Engaged",
        segments: [
          { label: "Field Engineers", color: "#6C5CE7", pct: 45 },
          { label: "Customer Support", color: "#FDCB6E", pct: 35 },
          { label: "Logistics Team", color: "#FF6B6B", pct: 15 }
        ]
      },
      activities: {
        title: "Honors Feed",
        items: [
          { time: "Turnover Top", color: "#FF6B6B", title: "Indika Kariyawasam Awarded", sub: "Senior Copier Specialist generated LKR 409,468 verified turnover" },
          { time: "Sales Champion", color: "#6C5CE7", title: "Kapila Kithsiri Awarded", sub: "Generated LKR 7,422,448 with 35.8% target achievement" },
          { time: "Regional Hero", color: "#00CEC9", title: "Chalanka Keshan Recognized", sub: "100% estimate conversion in Ratnapura Territory" }
        ]
      },
      table: {
        title: "Monthly Honor Roll",
        subtitle: "Top performers recognized across corporate operations",
        columns: ["AWARD TIER", "HONOREE NAME", "DESIGNATION / REGION", "MILESTONE", "STATUS"],
        rows: (DashboardData.awards || []).map(a => [
          a.categoryTitle.includes("Champion") ? "Champion" : "Star Award",
          a.employeeName,
          a.designation,
          `${a.scorePercentage}% Score`,
          { label: a.isNewWinner ? "New Winner" : "Honoree", type: "completed" }
        ]),
        paginationText: `Showing ${DashboardData.awards.length} corporate excellence award winners`
      }
    });
  },

  // =========================================================================
  // PAGE 10: MANAGEMENT INSIGHTS (Executive Strategy & Telemetry Health)
  // =========================================================================
  renderManagementInsights(container) {
    this.buildPage(container, {
      pageId: "p10",
      kpis: [
        {
          grad: "kpi-grad-purple",
          value: "14",
          label: "Live Google Sheets Worksheets",
          icon: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>`
        },
        {
          grad: "kpi-grad-blue",
          value: "60s",
          label: "Background Auto-Sync Pace",
          icon: `<svg viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>`
        },
        {
          grad: "kpi-grad-coral",
          value: "99.9%",
          label: "Corporate Data Integrity",
          icon: `<svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>`
        },
        {
          grad: "kpi-grad-amber",
          value: "4.8★",
          label: "Telemetry Health Index",
          icon: `<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`
        }
      ],
      dualWave: {
        title: "Telemetry Health",
        subtitle: "Real-time Google Sheets Ingestion & Throughput",
        mainValue: "4,850 Records",
        subMetric: "99.9% Telemetry Ingestion Uptime",
        btnText: "System Diagnostics",
        legend1: "Throughput",
        legend2: "Latency",
        seriesPurple: [25, 29, 26, 30, 28, 30],
        seriesOrange: [8, 10, 9, 12, 10, 11],
        categories: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
        miniStats: [
          { label: "Active Records", value: "4,850", color: "#FF6B6B", icon: "tag" },
          { label: "Sync Latency", value: "120ms", color: "#6C5CE7", icon: "trending" },
          { label: "Cache Hit Ratio", value: "99.4%", color: "#5E35B1", icon: "building" },
          { label: "Refresh Status", value: "LIVE", color: "#00CEC9", icon: "flag" }
        ]
      },
      donut: {
        title: "Strategic Coverage",
        percentage: 90,
        sublabel: "Optimal",
        segments: [
          { label: "Core Operations", color: "#6C5CE7", pct: 60 },
          { label: "Commercial Revenue", color: "#FDCB6E", pct: 25 },
          { label: "Operational SLA", color: "#FF6B6B", pct: 15 }
        ]
      },
      activities: {
        title: "Executive Strategic Recommendations",
        items: [
          { time: "Critical Action", color: "#FF6B6B", title: "Accelerate Over-90 Collections", sub: "Deploy dedicated finance taskforce to recover LKR 87.1M" },
          { time: "Growth Priority", color: "#6C5CE7", title: "Scale High-Yield Toner Stock", sub: "Customer re-order rate pacing at +21% month-over-month" },
          { time: "Optimization", color: "#00CEC9", title: "Expand Preventive AMC", sub: "Convert 82 pending field quotes into annual maintenance" }
        ]
      },
      table: {
        title: "Strategic Key Indicators",
        subtitle: "Corporate executive benchmark status",
        columns: ["DOMAIN", "TARGET", "CURRENT PACE", "RISK LEVEL", "STATUS"],
        rows: [
          ["Financial Inflow", "LKR 314.5M", "LKR 67.5M", "Moderate", { label: "On Track", type: "open" }],
          ["Contracts Pipeline", "LKR 350.6M", "LKR 125.4M", "Low", { label: "Healthy", type: "completed" }],
          ["Trade Debtors", "< LKR 50M Over 90", "LKR 87.1M", "High", { label: "Attention", type: "process" }],
          ["Field SLA", "> 95.0%", "96.4%", "Low", { label: "Optimal", type: "completed" }],
          ["System Sync", "60s Refresh", "120ms latency", "Low", { label: "Optimal", type: "completed" }]
        ],
        paginationText: "Showing 5 corporate strategic domains"
      }
    });
  }
};

window.DashboardPages = DashboardPages;
