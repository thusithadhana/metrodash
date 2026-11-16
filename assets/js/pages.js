/**
 * METROPOLITAN MANAGEMENT INTELLIGENCE - DASHBOARD WEB APPLICATION
 * 10 Master Dashboard Page Renderers & Panel Switchers
 */

const DashboardPages = {
  // Page Definitions matching Android MainDashboardPage enum
  PAGES: [
    { index: 1, id: "EXECUTIVE_OVERVIEW", title: "EXECUTIVE OVERVIEW", totalPanels: 3 },
    { index: 2, id: "FINANCIAL_PERFORMANCE", title: "FINANCIAL PERFORMANCE", totalPanels: 4 },
    { index: 3, id: "DEPARTMENT_PERFORMANCE", title: "DEPARTMENT PERFORMANCE", totalPanels: 3 },
    { index: 4, id: "SALES_REVENUE", title: "SALES & REVENUE", totalPanels: 4 },
    { index: 5, id: "CONTRACTS_ESTIMATES", title: "AMC & ESTIMATE PIPELINE", totalPanels: 3 },
    { index: 6, id: "TECHNICIAN_PERFORMANCE", title: "TECHNICIAN PERFORMANCE", totalPanels: 4 },
    { index: 7, id: "COORDINATOR_PERFORMANCE", title: "COORDINATOR & TEAM LEADER", totalPanels: 4 },
    { index: 8, id: "DEBTORS_OUTSTANDING", title: "DEBTORS & OUTSTANDING WORK", totalPanels: 3 },
    { index: 9, id: "EMPLOYEE_RECOGNITION", title: "EMPLOYEE RECOGNITION", totalPanels: 2 },
    { index: 10, id: "MANAGEMENT_INSIGHTS", title: "MANAGEMENT INSIGHTS", totalPanels: 2 }
  ],

  getPageByIndex(index) {
    return this.PAGES.find(p => p.index === index) || this.PAGES[0];
  },

  renderCurrent(container, pageIndex, panelIndex) {
    if (!container) return;
    container.innerHTML = "";

    switch (pageIndex) {
      case 1:
        this.renderExecutiveOverview(container, panelIndex);
        break;
      case 2:
        this.renderFinancialPerformance(container, panelIndex);
        break;
      case 3:
        this.renderDepartmentPerformance(container, panelIndex);
        break;
      case 4:
        this.renderSalesRevenue(container, panelIndex);
        break;
      case 5:
        this.renderContractsEstimates(container, panelIndex);
        break;
      case 6:
        this.renderTechnicianPerformance(container, panelIndex);
        break;
      case 7:
        this.renderCoordinatorPerformance(container, panelIndex);
        break;
      case 8:
        this.renderDebtorsOutstanding(container, panelIndex);
        break;
      case 9:
        this.renderEmployeeRecognition(container, panelIndex);
        break;
      case 10:
        this.renderManagementInsights(container, panelIndex);
        break;
      default:
        this.renderExecutiveOverview(container, 1);
    }
  },

  // =========================================================================
  // PAGE 1: EXECUTIVE OVERVIEW
  // =========================================================================
  renderExecutiveOverview(container, panel) {
    const exec = FinancialCalculationEngine.calculateExecutiveSummary(DashboardData);

    if (panel === 1) {
      // Panel 1: Performance Story & Goal Velocity
      const heroBannerHtml = UIComponents.createHeroStoryBanner({
        badge: "📢 TODAY'S COMPANY STORY IN PLAIN ENGLISH",
        title: "November 2026: Our Big Race to Reach LKR 314.5 Million!",
        description: "Our entire company's mission is to earn <strong>LKR 314.5 Million</strong> this month. So far, our hardworking teams have brought in <strong>LKR 32.1 Million (10.2%)</strong> with 17 days left to go! 🏃 Our #1 team today is <strong>Printer Consumables</strong> (LKR 15.1M), and <strong>Chamara Sampath</strong> is our top sales champion with LKR 8.42M! 🚀",
        pills: [
          { icon: "🎯", title: "Monthly Goal", val: "314.5M", type: "goal" },
          { icon: "💰", title: "Money In Hand", val: "32.1M", type: "actual" },
          { icon: "⏳", title: "Time Left", val: "17 Days", type: "time" },
          { icon: "⚠️", title: "Customers Owe Us", val: "538.9M", type: "debt" }
        ]
      });

      container.innerHTML = `
        ${heroBannerHtml}
        <div class="panel-grid-2col animate-fade-in">
          <div class="panel-grid-4cards">
            ${UIComponents.createKpiCardHtml({
              title: "The Big Monthly Goal",
              value: ChartEngine.formatCurrencyLKR(exec.totalDepartmentProjection),
              subtitle: `Full Target: ${ChartEngine.formatFullLKR(exec.totalDepartmentProjection)} for November`,
              trendBadge: "Monthly Target",
              icon: "flag",
              themeStyle: "kpi-style-gradient-blue"
            })}
            ${UIComponents.createKpiCardHtml({
              title: "Money Collected So Far",
              value: ChartEngine.formatCurrencyLKR(exec.totalActualFinancialAchievement),
              subtitle: `We've reached 10% of our goal! 17 days to go 🏃`,
              trendBadge: `+${exec.overallTargetAchievementPct.toFixed(1)}% Reached`,
              icon: "trend",
              themeStyle: "kpi-style-pastel-mint",
              isPositiveTrend: true,
              hasBorderBeam: true
            })}
            ${UIComponents.createKpiCardHtml({
              title: "Products Sold & Shipped",
              value: ChartEngine.formatCurrencyLKR(exec.totalInvoicedValue),
              subtitle: `1,480 toner cartridges & equipment parts shipped`,
              trendBadge: "Shipped Out",
              icon: "receipt",
              themeStyle: "kpi-style-pastel-purple"
            })}
            ${UIComponents.createKpiCardHtml({
              title: "Money Customers Still Owe Us",
              value: ChartEngine.formatCurrencyLKR(exec.outstandingDebtors),
              subtitle: `LKR 87.1M is over 3 months late — Need collection!`,
              trendBadge: "Collection Needed",
              icon: "warning",
              themeStyle: "kpi-style-pastel-rose",
              isPositiveTrend: false
            })}
          </div>
          <div class="panel-col-stack">
            <div id="p1_concentric_wrap"></div>
            <div id="p1_spline_wrap"></div>
          </div>
        </div>
      `;

      ChartEngine.renderConcentricWheel(document.getElementById("p1_concentric_wrap"), {
        title: "Company Goal Mission Tracker",
        centerMainText: `${exec.overallTargetAchievementPct.toFixed(1)}%`,
        centerSubText: "OVERALL GOAL REACHED",
        rings: [
          { name: "CSBM Target Velocity", valueString: ChartEngine.formatCurrencyLKR(exec.totalActualFinancialAchievement), percentage: exec.overallTargetAchievementPct / 100, color: "var(--metro-cyan)", gradientColors: ["#38BDF8", "#003882"] },
          { name: "Consumables Sales Velocity", valueString: ChartEngine.formatCurrencyLKR(exec.salesRevenue), percentage: exec.salesRevenue / (exec.totalDepartmentProjection || 1), color: "#10B981", gradientColors: ["#34D399", "#059669"] },
          { name: "Over-90 Debt Danger Zone", valueString: ChartEngine.formatCurrencyLKR(exec.debtorsOver90Days), percentage: exec.debtorsOverduePct / 100, color: "#F43F5E", gradientColors: ["#FB7185", "#E11D48"] }
        ]
      });

      ChartEngine.renderAreaSplineChart(document.getElementById("p1_spline_wrap"), {
        title: "November Money Journey (Daily Inflow & Trajectory)",
        series: [
          { label: "01 Nov", actual: 4.8, target: 12.0 },
          { label: "04 Nov", actual: 9.5, target: 24.0 },
          { label: "07 Nov", actual: 16.2, target: 36.0 },
          { label: "10 Nov", actual: 23.8, target: 48.0 },
          { label: "13 Nov", actual: 32.1, target: 60.0 },
          { label: "16 Nov", actual: 45.4, target: 72.0, projected: true },
          { label: "20 Nov", actual: 64.0, target: 84.0, projected: true },
          { label: "24 Nov", actual: 82.5, target: 96.0, projected: true },
          { label: "28 Nov", actual: 98.2, target: 108.0, projected: true },
          { label: "30 Nov", actual: 106.8, target: 120.0, projected: true }
        ],
        unit: "LKR",
        accentColor: "var(--metro-cyan)",
        gradientColors: ["#38BDF8", "#0078D4"],
        benchmarkTarget: 102.5,
        benchmarkLabel: "Monthly Target: LKR 102.5M"
      });

    } else if (panel === 2) {
      // Panel 2: Revenue & Contracts Pipeline
      const heroBannerHtml = UIComponents.createHeroStoryBanner({
        badge: "📢 SERVICE CONTRACTS & QUOTES IN PROGRESS",
        title: "Future Money Waiting to be Unlocked: LKR 350.6 Million!",
        description: "These are maintenance contracts (AMC) and customer repair quotes waiting for client signatures. Once signed, this money will flow straight into our bank accounts!",
        pills: [
          { icon: "📝", title: "AMC Contracts", val: ChartEngine.formatCurrencyLKR(exec.pendingAmcValue), type: "goal" },
          { icon: "📋", title: "Repair Estimates", val: ChartEngine.formatCurrencyLKR(exec.pendingEstimateValue), type: "actual" },
          { icon: "💼", title: "Total Pipeline", val: ChartEngine.formatCurrencyLKR(exec.totalPipelineValue), type: "time" }
        ]
      });

      container.innerHTML = `
        ${heroBannerHtml}
        <div class="panel-grid-2col animate-fade-in">
          <div class="panel-grid-4cards">
            ${UIComponents.createKpiCardHtml({
              title: "Toner Sales Total",
              value: ChartEngine.formatCurrencyLKR(exec.tonerSalesValue),
              subtitle: "High-yield consumable orders",
              trendBadge: "Consumables",
              icon: "cart",
              themeStyle: "kpi-style-pastel-amber"
            })}
            ${UIComponents.createKpiCardHtml({
              title: "AMC Pending Recovery",
              value: ChartEngine.formatCurrencyLKR(exec.pendingAmcValue),
              subtitle: "Maintenance contracts awaiting renewal",
              trendBadge: "Active Pipeline",
              icon: "receipt",
              themeStyle: "kpi-style-pastel-purple"
            })}
            ${UIComponents.createKpiCardHtml({
              title: "Estimate Pending Value",
              value: ChartEngine.formatCurrencyLKR(exec.pendingEstimateValue),
              subtitle: "Field quotes & workshop backlog",
              trendBadge: "Quotes In Review",
              icon: "briefcase",
              themeStyle: "kpi-style-gradient-blue"
            })}
            ${UIComponents.createKpiCardHtml({
              title: "Total Contracts Pipeline",
              value: ChartEngine.formatCurrencyLKR(exec.totalPipelineValue),
              subtitle: "AMC & estimates awaiting conversion",
              trendBadge: "Commercial Pipeline",
              icon: "engineering",
              themeStyle: "kpi-style-gradient-emerald"
            })}
          </div>
          <div class="panel-col-stack" id="p1_gauge_wrap"></div>
        </div>
      `;

      ChartEngine.renderRadialGauge(document.getElementById("p1_gauge_wrap"), {
        title: "Contracts & Quote Conversion Rate",
        valueString: ChartEngine.formatCurrencyLKR(exec.totalInvoicedValue),
        percentage: Math.min(exec.totalInvoicedValue / (exec.pendingEstimateValue || 1), 1.0),
        subtitle: `Realized: ${ChartEngine.formatCurrencyLKR(exec.totalInvoicedValue)} of ${ChartEngine.formatCurrencyLKR(exec.pendingEstimateValue)} Estimates converted`,
        trendText: "Active Conversion",
        accentColor: "#10B981",
        gradientColors: ["#34D399", "#059669"]
      });

    } else {
      // Panel 3: Strategic Portfolio Share & Department Progress
      const heroBannerHtml = UIComponents.createHeroStoryBanner({
        badge: "📢 DEPARTMENT RACE & SCOREBOARD",
        title: "Which Team is Winning the Race in November?",
        description: "Every department has a target to hit. Here is how each team is racing towards their monthly goals!",
        pills: [
          { icon: "🥇", title: "Star Department", val: "Printer Consumables", type: "actual" },
          { icon: "💰", title: "Top Earner", val: "LKR 15.1M", type: "goal" }
        ]
      });

      const rankedDepts = RankingEngine.rankDepartmentsByActual(DashboardData.csbmProjectionList);
      const rows = rankedDepts.map((d, i) => ({
        rank: i + 1,
        primaryName: d.department,
        secondaryLabel: `Projection: ${ChartEngine.formatCurrencyLKR(d.projectionAmount)}`,
        primaryValueString: ChartEngine.formatCurrencyLKR(d.actualAmount),
        secondaryValueString: `Achieved: ${d.achievementPercentage.toFixed(1)}%`,
        statusBadge: d.achievementPercentage >= 2.0 ? "Achieved" : "In Progress",
        statusColor: d.achievementPercentage >= 2.0 ? "var(--metro-green-success)" : "var(--metro-cyan)"
      }));

      container.innerHTML = `
        ${heroBannerHtml}
        <div class="panel-grid-2col animate-fade-in">
          <div>
            ${UIComponents.createLeaderboardCardHtml({
              title: "CSBM Department Revenue Leaderboard",
              icon: "briefcase",
              rows
            })}
          </div>
          <div class="panel-col-stack" id="p1_donut_wrap"></div>
        </div>
      `;

      ChartEngine.renderDonutChart(document.getElementById("p1_donut_wrap"), {
        title: "Department Revenue Contribution",
        categories: DashboardData.csbmProjectionList.map(it => [it.department, it.actualAmount])
      });
    }
  },

  // =========================================================================
  // PAGE 2: FINANCIAL PERFORMANCE
  // =========================================================================
  renderFinancialPerformance(container, panel) {
    const totalProjection = DashboardData.csbmProjectionList.reduce((acc, it) => acc + (it.projectionAmount || 0), 0) || 1;
    const totalActual = DashboardData.csbmProjectionList.reduce((acc, it) => acc + (it.actualAmount || 0), 0);
    const overallPct = (totalActual / totalProjection) * 100;
    const totalGap = Math.max(0, totalProjection - totalActual);

    if (panel === 1) {
      const heroBannerHtml = UIComponents.createHeroStoryBanner({
        badge: "📢 HOW MUCH MONEY ARE WE MAKING?",
        title: "Company Financial Budget vs Real Earnings",
        description: "Our company budget target this month is <strong>LKR 314.5M</strong> across all 10 departments. So far, we have brought in <strong>LKR 32.1M (10.2%)</strong>. Check out each team's progress below!",
        pills: [
          { icon: "🎯", title: "Budget Goal", val: ChartEngine.formatCurrencyLKR(totalProjection), type: "goal" },
          { icon: "💰", title: "Earned So Far", val: ChartEngine.formatCurrencyLKR(totalActual), type: "actual" },
          { icon: "⏳", title: "Gap To Finish", val: ChartEngine.formatCurrencyLKR(totalGap), type: "time" }
        ]
      });

      container.innerHTML = `
        ${heroBannerHtml}
        <div class="panel-grid-2col animate-fade-in">
          <div class="panel-col-stack">
            <div class="panel-grid-2cards">
              ${UIComponents.createKpiCardHtml({
                title: "Total Budget Target",
                value: ChartEngine.formatCurrencyLKR(totalProjection),
                subtitle: "Full Projected Revenue",
                trendBadge: "All Divisions",
                icon: "flag",
                themeStyle: "kpi-style-gradient-blue"
              })}
              ${UIComponents.createKpiCardHtml({
                title: "Actual Revenue",
                value: ChartEngine.formatCurrencyLKR(totalActual),
                subtitle: "Realized Revenue",
                trendBadge: `+${overallPct.toFixed(1)}%`,
                icon: "trend",
                themeStyle: "kpi-style-pastel-mint",
                isPositiveTrend: true
              })}
            </div>
            <div id="p2_radial_wrap"></div>
          </div>
          <div id="p2_bar_wrap"></div>
        </div>
      `;

      ChartEngine.renderRadialGauge(document.getElementById("p2_radial_wrap"), {
        title: "CSBM Financial Velocity",
        valueString: `${overallPct.toFixed(1)}%`,
        percentage: totalActual / totalProjection,
        subtitle: `Actual: ${ChartEngine.formatCurrencyLKR(totalActual)} of ${ChartEngine.formatCurrencyLKR(totalProjection)}`,
        trendText: overallPct >= 80 ? "On Target Velocity" : "Accelerating",
        accentColor: "var(--metro-cyan)",
        gradientColors: ["#38BDF8", "#003882"]
      });

      ChartEngine.renderBarChart(document.getElementById("p2_bar_wrap"), {
        title: "CSBM Financial Revenue vs Projection by Department (LKR)",
        items: DashboardData.csbmProjectionList.map(it => ({
          label: it.department,
          value: it.actualAmount,
          target: it.projectionAmount,
          barColor: "var(--metro-cyan)"
        }))
      });

    } else if (panel === 2) {
      container.innerHTML = `
        <div class="panel-grid-2col animate-fade-in">
          <div id="p2_concentric_wrap"></div>
          <div id="p2_bar_pct_wrap"></div>
        </div>
      `;

      const top3 = [...DashboardData.csbmProjectionList].sort((a, b) => b.achievementPercentage - a.achievementPercentage).slice(0, 3);
      ChartEngine.renderConcentricWheel(document.getElementById("p2_concentric_wrap"), {
        title: "Top Divisions Target Velocity",
        centerMainText: `${overallPct.toFixed(1)}%`,
        centerSubText: "OVERALL AVG",
        rings: top3.map((dept, i) => ({
          name: dept.department,
          valueString: `${dept.achievementPercentage.toFixed(1)}%`,
          percentage: dept.achievementPercentage / 100,
          color: i === 0 ? "#10B981" : (i === 1 ? "var(--metro-cyan)" : "#8B5CF6")
        }))
      });

      ChartEngine.renderBarChart(document.getElementById("p2_bar_pct_wrap"), {
        title: "Department Target Achievement Percentage (%)",
        defaultFormat: "PERCENTAGE",
        items: DashboardData.csbmProjectionList.map(it => ({
          label: it.department,
          value: it.achievementPercentage,
          target: 100,
          barColor: it.achievementPercentage >= 2.0 ? "var(--metro-green-success)" : "var(--metro-orange-warning)",
          format: "PERCENTAGE"
        }))
      });

    } else if (panel === 3) {
      container.innerHTML = `
        <div class="panel-grid-2col animate-fade-in">
          <div id="p2_donut_wrap"></div>
          <div id="p2_progress_wrap"></div>
        </div>
      `;

      ChartEngine.renderDonutChart(document.getElementById("p2_donut_wrap"), {
        title: "Department Financial Contribution (LKR)",
        categories: DashboardData.csbmProjectionList.map(it => [it.department, it.actualAmount])
      });

      const sortedDepts = [...DashboardData.csbmProjectionList].sort((a, b) => b.actualAmount - a.actualAmount);
      const colors = ["#003882", "#00B4D8", "#0096C7", "#FFB703", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];
      const progItems = sortedDepts.map((it, idx) => ({
        index: String(idx + 1).padStart(2, '0'),
        name: it.department,
        percentage: it.actualAmount / totalActual,
        barColor: colors[idx % colors.length],
        tagText: `${ChartEngine.formatCurrencyLKR(it.actualAmount)} (${((it.actualAmount / totalActual) * 100).toFixed(1)}%)`
      }));

      document.getElementById("p2_progress_wrap").innerHTML = UIComponents.createProgressListHtml({
        title: "Department Revenue Share Breakdown",
        items: progItems
      });

    } else {
      // Panel 4: Target Gap Analysis
      container.innerHTML = `
        <div class="panel-grid-2col animate-fade-in">
          <div class="panel-col-stack">
            ${UIComponents.createKpiCardHtml({
              title: "Total Remaining Target Gap",
              value: ChartEngine.formatCurrencyLKR(totalGap),
              subtitle: "Deficit across all operating divisions",
              trendBadge: "Action Required",
              icon: "warning",
              themeStyle: "kpi-style-pastel-rose",
              isPositiveTrend: false
            })}
            <div id="p2_gap_wheel"></div>
          </div>
          <div id="p2_gap_bar"></div>
        </div>
      `;

      ChartEngine.renderRadialGauge(document.getElementById("p2_gap_wheel"), {
        title: "Target Gap Exposure",
        valueString: `${((totalGap / totalProjection) * 100).toFixed(1)}%`,
        percentage: totalGap / totalProjection,
        subtitle: `Remaining: ${ChartEngine.formatCurrencyLKR(totalGap)} of ${ChartEngine.formatCurrencyLKR(totalProjection)} Target`,
        trendText: (totalGap / totalProjection) <= 0.2 ? "Closing Gap Fast" : "Focus Needed",
        accentColor: "var(--metro-orange-warning)",
        gradientColors: ["#FBBF24", "#EA580C"]
      });

      ChartEngine.renderBarChart(document.getElementById("p2_gap_bar"), {
        title: "Remaining Financial Target Gap by Department (LKR)",
        items: DashboardData.csbmProjectionList.map(it => ({
          label: it.department,
          value: Math.max(0, it.projectionAmount - it.actualAmount),
          barColor: "var(--metro-orange-warning)"
        }))
      });
    }
  },

  // =========================================================================
  // PAGE 3: DEPARTMENT PERFORMANCE
  // =========================================================================
  renderDepartmentPerformance(container, panel) {
    const totalActual = DashboardData.csbmProjectionList.reduce((acc, it) => acc + (it.actualAmount || 0), 0) || 1;
    const rankedDepts = RankingEngine.rankDepartmentsByActual(DashboardData.csbmProjectionList);
    const topDept = rankedDepts[0];

    if (panel === 1) {
      const rows = rankedDepts.map((d, i) => ({
        rank: i + 1,
        primaryName: d.department,
        secondaryLabel: `Projection: ${ChartEngine.formatCurrencyLKR(d.projectionAmount)}`,
        primaryValueString: ChartEngine.formatCurrencyLKR(d.actualAmount),
        secondaryValueString: `Achieved: ${d.achievementPercentage.toFixed(1)}%`,
        statusBadge: d.achievementPercentage >= 2.0 ? "Achieved" : "In Progress",
        statusColor: d.achievementPercentage >= 2.0 ? "var(--metro-green-success)" : "var(--metro-cyan)"
      }));

      container.innerHTML = `
        <div class="panel-grid-2col animate-fade-in">
          <div>
            ${UIComponents.createLeaderboardCardHtml({
              title: "Department Ranking by Financial Value (LKR)",
              icon: "briefcase",
              rows
            })}
          </div>
          <div class="panel-col-stack">
            ${UIComponents.createKpiCardHtml({
              title: "Top Contributing Division",
              value: ChartEngine.formatCurrencyLKR(topDept?.actualAmount || 0),
              subtitle: topDept?.department || "CSBM Division",
              trendBadge: "#1 Revenue Contributor",
              icon: "award",
              themeStyle: "kpi-style-gradient-blue"
            })}
            <div id="p3_gauge_wrap"></div>
          </div>
        </div>
      `;

      const topRatio = (topDept?.actualAmount || 0) / totalActual;
      ChartEngine.renderRadialGauge(document.getElementById("p3_gauge_wrap"), {
        title: "Division Dominance Ratio",
        valueString: `${(topRatio * 100).toFixed(0)}%`,
        percentage: topRatio,
        subtitle: "Share of overall company realized revenue",
        trendText: "Portfolio Anchor",
        accentColor: "var(--metro-cyan)",
        gradientColors: ["#38BDF8", "#003882"]
      });

    } else if (panel === 2) {
      const rankedByPct = RankingEngine.rankDepartmentsByAchievement(DashboardData.csbmProjectionList);
      const achievedCount = DashboardData.csbmProjectionList.filter(it => it.achievementPercentage >= 2.0).length;
      const totalDepts = DashboardData.csbmProjectionList.length;

      const rowsPct = rankedByPct.map((d, i) => ({
        rank: i + 1,
        primaryName: d.department,
        secondaryLabel: `Target: ${ChartEngine.formatCurrencyLKR(d.projectionAmount)}`,
        primaryValueString: `${d.achievementPercentage.toFixed(1)}%`,
        secondaryValueString: `Actual: ${ChartEngine.formatCurrencyLKR(d.actualAmount)}`,
        statusBadge: d.achievementPercentage >= 2.0 ? "Achieved" : "Progressing",
        statusColor: d.achievementPercentage >= 2.0 ? "var(--metro-green-success)" : "var(--metro-cyan)"
      }));

      container.innerHTML = `
        <div class="panel-grid-2col animate-fade-in">
          <div>
            ${UIComponents.createLeaderboardCardHtml({
              title: "Department Target Achievement Leaderboard (%)",
              icon: "trend",
              rows: rowsPct
            })}
          </div>
          <div class="panel-col-stack">
            ${UIComponents.createKpiCardHtml({
              title: "Divisions On Target",
              value: `${achievedCount} of ${totalDepts}`,
              subtitle: "Divisions meeting monthly performance KPIs",
              trendBadge: `${Math.round((achievedCount / totalDepts) * 100)}% Compliance`,
              icon: "check",
              themeStyle: "kpi-style-pastel-mint",
              isPositiveTrend: true
            })}
            <div id="p3_eff_gauge"></div>
          </div>
        </div>
      `;

      const overallEff = totalActual / (DashboardData.csbmProjectionList.reduce((acc, it) => acc + (it.projectionAmount || 0), 0) || 1);
      ChartEngine.renderRadialGauge(document.getElementById("p3_eff_gauge"), {
        title: "Company Operational Efficiency",
        valueString: `${(overallEff * 100).toFixed(1)}%`,
        percentage: overallEff,
        subtitle: "Across all business and service divisions",
        trendText: overallEff >= 0.8 ? "High Performance" : "Target Drive",
        accentColor: "#10B981",
        gradientColors: ["#34D399", "#059669"]
      });

    } else {
      container.innerHTML = `
        <div class="panel-grid-2col animate-fade-in">
          <div id="p3_bar_share"></div>
          <div id="p3_donut_share"></div>
        </div>
      `;

      ChartEngine.renderBarChart(document.getElementById("p3_bar_share"), {
        title: "Department Contribution to Total Revenue (%)",
        defaultFormat: "PERCENTAGE",
        items: DashboardData.csbmProjectionList.map(it => ({
          label: it.department,
          value: (it.actualAmount / totalActual) * 100,
          barColor: "var(--metro-cyan)",
          format: "PERCENTAGE"
        }))
      });

      ChartEngine.renderDonutChart(document.getElementById("p3_donut_share"), {
        title: "Revenue Distribution by Department (LKR)",
        categories: DashboardData.csbmProjectionList.map(it => [it.department, it.actualAmount])
      });
    }
  },

  // =========================================================================
  // PAGE 4: SALES & REVENUE
  // =========================================================================
  renderSalesRevenue(container, panel) {
    if (panel === 1) {
      const rankedPrinter = RankingEngine.rankPrinterSalesByActual(DashboardData.printerConsumablesList);
      const totalPrinterTarget = DashboardData.printerConsumablesList.reduce((acc, it) => acc + (it.targetAmount || 0), 0) || 1;
      const totalPrinterActual = DashboardData.printerConsumablesList.reduce((acc, it) => acc + (it.actualAmount || 0), 0);
      const printerRatio = totalPrinterActual / totalPrinterTarget;

      const rows = rankedPrinter.map((p, i) => ({
        rank: i + 1,
        primaryName: p.salesperson,
        secondaryLabel: `Target: ${ChartEngine.formatCurrencyLKR(p.targetAmount)}`,
        primaryValueString: ChartEngine.formatCurrencyLKR(p.actualAmount),
        secondaryValueString: `Achieved: ${p.achievementPercentage.toFixed(1)}%`,
        statusBadge: p.achievementPercentage >= 2.0 ? "Achieved" : "Active",
        statusColor: p.achievementPercentage >= 2.0 ? "var(--metro-green-success)" : "var(--metro-cyan)"
      }));

      container.innerHTML = `
        <div class="panel-grid-2col animate-fade-in">
          <div>
            ${UIComponents.createLeaderboardCardHtml({
              title: "Printer Consumables Sales Leaderboard",
              icon: "cart",
              rows
            })}
          </div>
          <div class="panel-col-stack">
            ${UIComponents.createKpiCardHtml({
              title: "Total Consumables Sales",
              value: ChartEngine.formatCurrencyLKR(totalPrinterActual),
              subtitle: `Target: ${ChartEngine.formatCurrencyLKR(totalPrinterTarget)}`,
              trendBadge: `+${(printerRatio * 100).toFixed(1)}%`,
              icon: "cart",
              themeStyle: "kpi-style-pastel-mint",
              isPositiveTrend: true
            })}
            <div id="p4_printer_gauge"></div>
          </div>
        </div>
      `;

      ChartEngine.renderRadialGauge(document.getElementById("p4_printer_gauge"), {
        title: "Consumables Target Velocity",
        valueString: `${(printerRatio * 100).toFixed(1)}%`,
        percentage: printerRatio,
        subtitle: `Actual: ${ChartEngine.formatCurrencyLKR(totalPrinterActual)}`,
        trendText: "Sales Run-Rate",
        accentColor: "var(--metro-cyan)",
        gradientColors: ["#38BDF8", "#003882"]
      });

    } else if (panel === 2) {
      const rankedToner = RankingEngine.rankTonerSalesByValue(DashboardData.tonerSalesList);
      const totalTonerUnits = DashboardData.tonerSalesList.reduce((acc, it) => acc + (it.quantity || 0), 0);
      const totalTonerVal = DashboardData.tonerSalesList.reduce((acc, it) => acc + (it.salesValue || 0), 0);

      const rows = rankedToner.map((p, i) => ({
        rank: i + 1,
        primaryName: p.salesperson,
        secondaryLabel: `Dispatched: ${p.quantity} units`,
        primaryValueString: ChartEngine.formatCurrencyLKR(p.salesValue),
        statusBadge: `${p.quantity} Units`,
        statusColor: "var(--metro-green-success)"
      }));

      container.innerHTML = `
        <div class="panel-grid-2col animate-fade-in">
          <div>
            ${UIComponents.createLeaderboardCardHtml({
              title: "Toner Sales Performer Leaderboard",
              icon: "shop",
              rows
            })}
          </div>
          <div class="panel-col-stack">
            ${UIComponents.createKpiCardHtml({
              title: "Total Toner Dispatched",
              value: `${totalTonerUnits} Units`,
              subtitle: "Across all client sites & branches",
              trendBadge: "Total Dispatched",
              icon: "shop",
              themeStyle: "kpi-style-gradient-blue"
            })}
            <div id="p4_toner_gauge"></div>
          </div>
        </div>
      `;

      ChartEngine.renderRadialGauge(document.getElementById("p4_toner_gauge"), {
        title: "Total Toner Value Realization",
        valueString: ChartEngine.formatCurrencyLKR(totalTonerVal),
        percentage: 0.92,
        subtitle: `Top Rep: ${rankedToner[0]?.salesperson || "N/A"}`,
        trendText: "High Demand",
        accentColor: "var(--metro-gold-accent)",
        gradientColors: ["#FBBF24", "#D97706"]
      });

    } else if (panel === 3) {
      const totalInvoiced = DashboardData.dailyCopierInvoicedList.reduce((acc, it) => acc + (it.invoicedValue || 0), 0);
      const topCopier = [...DashboardData.dailyCopierInvoicedList].sort((a, b) => b.invoicedValue - a.invoicedValue)[0];
      const topRatio = totalInvoiced > 0 ? (topCopier?.invoicedValue || 0) / totalInvoiced : 0.5;

      container.innerHTML = `
        <div class="panel-grid-2col animate-fade-in">
          <div id="p4_copier_bar"></div>
          <div class="panel-col-stack">
            ${UIComponents.createKpiCardHtml({
              title: "Total Copier Invoiced",
              value: ChartEngine.formatCurrencyLKR(totalInvoiced),
              subtitle: "Cumulative coordinator billing today",
              trendBadge: "Realized Today",
              icon: "receipt",
              themeStyle: "kpi-style-pastel-purple"
            })}
            <div id="p4_copier_gauge"></div>
          </div>
        </div>
      `;

      ChartEngine.renderBarChart(document.getElementById("p4_copier_bar"), {
        title: "Daily Copier Invoiced Value by Coordinator (LKR)",
        items: DashboardData.dailyCopierInvoicedList.map(it => ({
          label: it.coordinator,
          value: it.invoicedValue,
          barColor: "var(--metro-green-success)"
        }))
      });

      ChartEngine.renderRadialGauge(document.getElementById("p4_copier_gauge"), {
        title: "Top Billing Coordinator Velocity",
        valueString: topCopier?.coordinator || "Coordinators",
        percentage: topRatio,
        subtitle: `Invoiced: ${ChartEngine.formatCurrencyLKR(topCopier?.invoicedValue || 0)} (${Math.round(topRatio * 100)}% of total)`,
        trendText: "Lead Coordinator",
        accentColor: "#10B981",
        gradientColors: ["#34D399", "#059669"]
      });

    } else {
      // Panel 4: Daily Estimate Invoiced Value Cockpit
      const totalEstimateInvoiced = DashboardData.dailyEstimateInvoicedList.reduce((acc, it) => acc + (it.invoicedValue || 0), 0);
      const topEstimate = [...DashboardData.dailyEstimateInvoicedList].sort((a, b) => b.invoicedValue - a.invoicedValue)[0];
      const estRatio = totalEstimateInvoiced > 0 ? (topEstimate?.invoicedValue || 0) / totalEstimateInvoiced : 0.5;

      container.innerHTML = `
        <div class="panel-grid-2col animate-fade-in">
          <div id="p4_est_bar"></div>
          <div class="panel-col-stack">
            ${UIComponents.createKpiCardHtml({
              title: "Total Estimate Invoiced",
              value: ChartEngine.formatCurrencyLKR(totalEstimateInvoiced),
              subtitle: "Quotes approved & invoiced today",
              trendBadge: "Approved",
              icon: "receipt",
              themeStyle: "kpi-style-gradient-blue"
            })}
            <div id="p4_est_gauge"></div>
          </div>
        </div>
      `;

      ChartEngine.renderBarChart(document.getElementById("p4_est_bar"), {
        title: "Daily Estimate Invoiced Value by Coordinator (LKR)",
        items: DashboardData.dailyEstimateInvoicedList.map(it => ({
          label: it.coordinator,
          value: it.invoicedValue,
          barColor: "var(--metro-cyan)"
        }))
      });

      ChartEngine.renderRadialGauge(document.getElementById("p4_est_gauge"), {
        title: "Lead Estimate Coordinator",
        valueString: topEstimate?.coordinator || "Coordinators",
        percentage: estRatio,
        subtitle: `Invoiced: ${ChartEngine.formatCurrencyLKR(topEstimate?.invoicedValue || 0)}`,
        trendText: "Approval Surge",
        accentColor: "var(--metro-cyan)",
        gradientColors: ["#38BDF8", "#0284C7"]
      });
    }
  },

  // =========================================================================
  // PAGE 5: AMC & ESTIMATE PIPELINE (100% Google Sheets Verified)
  // =========================================================================
  renderContractsEstimates(container, panel) {
    const totalPendingAmc = (DashboardData.amcPendingList || []).reduce((acc, it) => acc + (it.pendingAmount || 0), 0);
    const totalPendingEst = (DashboardData.estimatePendingList || []).reduce((acc, it) => acc + (it.pendingAmount || 0), 0);
    const totalInvoicedEst = (DashboardData.dailyEstimateInvoicedList || []).reduce((acc, it) => acc + (it.invoicedValue || 0), 0);
    const totalInvoicedAmc = (DashboardData.dailyAmcInvoicedList || []).reduce((acc, it) => acc + (it.invoicedValue || 0), 0);

    if (panel === 1) {
      // Panel 1: AMC Maintenance Contracts Pending Pipeline
      const rows = (DashboardData.amcPendingList || [])
        .filter(it => RankingEngine.filterOutGrandTotal(it.coordinator))
        .map((it, i) => ({
          rank: i + 1,
          primaryName: it.coordinator,
          secondaryLabel: "AMC Renewal Coordinator",
          primaryValueString: ChartEngine.formatCurrencyLKR(it.pendingAmount),
          secondaryValueString: "Pending Renewal",
          statusBadge: it.pendingAmount > 20000000 ? "High Volume" : "Active",
          statusColor: it.pendingAmount > 20000000 ? "#F59E0B" : "var(--metro-cyan)"
        }));

      container.innerHTML = `
        <div class="panel-grid-2col animate-fade-in">
          <div>
            ${UIComponents.createLeaderboardCardHtml({
              title: "AMC Contracts Pending Recovery by Coordinator",
              icon: "receipt",
              rows
            })}
          </div>
          <div class="panel-col-stack">
            <div class="panel-grid-2cards">
              ${UIComponents.createKpiCardHtml({
                title: "Total AMC Pending",
                value: ChartEngine.formatCurrencyLKR(totalPendingAmc),
                subtitle: "Annual Maintenance Contracts awaiting renewal",
                trendBadge: "Active Pipeline",
                icon: "receipt",
                themeStyle: "kpi-style-gradient-blue"
              })}
              ${UIComponents.createKpiCardHtml({
                title: "Daily AMC Invoiced",
                value: ChartEngine.formatCurrencyLKR(totalInvoicedAmc),
                subtitle: "Realized today across island accounts",
                trendBadge: "Daily Invoiced",
                icon: "check",
                themeStyle: "kpi-style-pastel-mint",
                isPositiveTrend: true
              })}
            </div>
            <div id="p5_amc_wheel"></div>
          </div>
        </div>
      `;

      ChartEngine.renderRadialGauge(document.getElementById("p5_amc_wheel"), {
        title: "AMC Contract Recovery Realization Run-Rate",
        valueString: ChartEngine.formatCurrencyLKR(totalInvoicedAmc),
        percentage: Math.min((totalInvoicedAmc / 1000000) * 1.0, 1.25),
        subtitle: `Realized: ${ChartEngine.formatCurrencyLKR(totalInvoicedAmc)} of Target Daily AMC Recovery`,
        trendText: "Active Recovery",
        accentColor: "var(--metro-cyan)",
        gradientColors: ["#38BDF8", "#003882"]
      });

    } else if (panel === 2) {
      // Panel 2: Field Estimates Commercial Pipeline & Recovery
      const estRows = (DashboardData.estimatePendingList || [])
        .filter(it => RankingEngine.filterOutGrandTotal(it.coordinator))
        .map((it, i) => ({
          rank: i + 1,
          primaryName: it.coordinator,
          secondaryLabel: "Quotation Coordinator",
          primaryValueString: ChartEngine.formatCurrencyLKR(it.pendingAmount),
          secondaryValueString: "Pending Conversion",
          statusBadge: "Quotes in Review",
          statusColor: "#0284C7"
        }));

      container.innerHTML = `
        <div class="panel-grid-2col animate-fade-in">
          <div>
            ${UIComponents.createLeaderboardCardHtml({
              title: "Estimate Pending Conversion by Coordinator",
              icon: "briefcase",
              rows: estRows
            })}
          </div>
          <div class="panel-col-stack">
            <div class="panel-grid-2cards">
              ${UIComponents.createKpiCardHtml({
                title: "Estimate Pending Value",
                value: ChartEngine.formatCurrencyLKR(totalPendingEst),
                subtitle: "Quotes awaiting client approval",
                trendBadge: "Commercial Quotes",
                icon: "briefcase",
                themeStyle: "kpi-style-pastel-purple"
              })}
              ${UIComponents.createKpiCardHtml({
                title: "Daily Estimate Invoiced",
                value: ChartEngine.formatCurrencyLKR(totalInvoicedEst),
                subtitle: "Realized estimate billing today",
                trendBadge: "Daily Invoiced",
                icon: "trending_up",
                themeStyle: "kpi-style-pastel-mint",
                isPositiveTrend: true
              })}
            </div>
            <div id="p5_est_bar"></div>
          </div>
        </div>
      `;

      ChartEngine.renderBarChart(document.getElementById("p5_est_bar"), {
        title: "Daily Estimate Invoiced Realized (LKR)",
        items: (DashboardData.dailyEstimateInvoicedList || []).map(it => ({
          label: it.coordinator,
          value: it.invoicedValue,
          barColor: "#0284C7"
        }))
      });

    } else {
      // Panel 3: Daily Estimate Generation Output & Weekly Velocity
      const estMetrics = EstimateGenerationEngine.computeSummaryMetrics(DashboardData.dailyGenerateEstimateList);

      container.innerHTML = `
        <div class="panel-col-stack animate-fade-in">
          <div class="panel-grid-4cards">
            ${UIComponents.createKpiCardHtml({
              title: "Yesterday Output",
              value: `${estMetrics.totalYesterday} Quotes`,
              subtitle: "Generated islandwide yesterday",
              trendBadge: "Daily Output",
              icon: "calendar",
              themeStyle: "kpi-style-gradient-blue"
            })}
            ${UIComponents.createKpiCardHtml({
              title: "Weekly Quotes Total",
              value: `${estMetrics.totalThisWeek} Quotes`,
              subtitle: "Current rolling week production",
              trendBadge: "Rolling Week",
              icon: "chart",
              themeStyle: "kpi-style-pastel-mint",
              isPositiveTrend: true
            })}
            ${UIComponents.createKpiCardHtml({
              title: "Month-to-Date Output",
              value: `${estMetrics.totalMonthToDate} Quotes`,
              subtitle: "Cumulative MTD estimate throughput",
              trendBadge: "MTD Throughput",
              icon: "analytics",
              themeStyle: "kpi-style-pastel-purple"
            })}
            ${UIComponents.createKpiCardHtml({
              title: "Estimate Champion",
              value: estMetrics.champion.coordinator.split(' ')[0],
              subtitle: `${estMetrics.champion.weekCount} Quotes this week`,
              trendBadge: "Top Producer",
              icon: "award",
              themeStyle: "kpi-style-pastel-amber"
            })}
          </div>
          <div class="panel-grid-2col">
            <div id="p5_gen_bars"></div>
            <div id="p5_gen_concentric"></div>
          </div>
        </div>
      `;

      ChartEngine.renderBarChart(document.getElementById("p5_gen_bars"), {
        title: "Estimate Output Generation by Coordinator (Weekly Count)",
        defaultFormat: "QUANTITY",
        items: (DashboardData.dailyGenerateEstimateList || []).map(it => ({
          label: it.coordinator,
          value: it.weekCount,
          target: 100,
          barColor: "var(--metro-cyan)",
          format: "QUANTITY"
        }))
      });

      ChartEngine.renderConcentricWheel(document.getElementById("p5_gen_concentric"), {
        title: "Estimate Production Velocity",
        centerMainText: `${estMetrics.totalThisWeek}`,
        centerSubText: "WEEKLY QUOTES",
        rings: (DashboardData.dailyGenerateEstimateList || []).map((it, i) => ({
          name: it.coordinator,
          valueString: `${it.weekCount} Quotes`,
          percentage: it.weekCount / (estMetrics.totalThisWeek || 1),
          color: i === 0 ? "#10B981" : "#0284C7"
        }))
      });
    }
  },

  // =========================================================================
  // PAGE 6: TECHNICIAN PERFORMANCE
  // =========================================================================
  renderTechnicianPerformance(container, panel) {
    const rankedTechs = RankingEngine.rankTechniciansByTurnover(DashboardData.copierTechniciansList);
    const topTech = rankedTechs[0];
    const totalTurnover = rankedTechs.reduce((acc, it) => acc + (it.totalTurnover || 0), 0) || 1;

    if (panel === 1) {
      const rows = rankedTechs.map((t, i) => ({
        rank: i + 1,
        primaryName: t.technicianName,
        secondaryLabel: `Region: ${t.area.trim()}`,
        primaryValueString: ChartEngine.formatCurrencyLKR(t.totalTurnover),
        secondaryValueString: `Estimate: ${ChartEngine.formatCurrencyLKR(t.estimateTurnover)}`,
        statusBadge: i < 3 ? "★ Champion" : "Verified",
        statusColor: i < 3 ? "var(--metro-gold-accent)" : "var(--metro-green-success)"
      }));

      container.innerHTML = `
        <div class="panel-grid-2col animate-fade-in">
          <div>
            ${UIComponents.createLeaderboardCardHtml({
              title: "Copier Engineering Total Turnover Leaderboard (LKR)",
              icon: "engineering",
              rows
            })}
          </div>
          <div class="panel-col-stack">
            ${UIComponents.createKpiCardHtml({
              title: "Top Engineering Performer",
              value: ChartEngine.formatCurrencyLKR(topTech?.totalTurnover || 0),
              subtitle: `${topTech?.technicianName || "Engineer"} (${topTech?.area?.trim() || "Metro"})`,
              trendBadge: "#1 Revenue Leader",
              icon: "star",
              themeStyle: "kpi-style-gradient-blue"
            })}
            <div id="p6_tech_gauge"></div>
          </div>
        </div>
      `;

      const topRatio = (topTech?.totalTurnover || 0) / totalTurnover;
      ChartEngine.renderRadialGauge(document.getElementById("p6_tech_gauge"), {
        title: "Top Engineer Billing Share",
        valueString: `${Math.round(topRatio * 100)}%`,
        percentage: topRatio,
        subtitle: `Of Total Engineering Turnover: ${ChartEngine.formatCurrencyLKR(totalTurnover)}`,
        trendText: "High Output",
        accentColor: "var(--metro-cyan)",
        gradientColors: ["#38BDF8", "#003882"]
      });

    } else if (panel === 2) {
      const areaMap = {};
      DashboardData.copierTechniciansList.forEach(t => {
        if (!RankingEngine.filterOutGrandTotal(t.technicianName)) return;
        const area = (t.area || "COLOMBO").trim();
        areaMap[area] = (areaMap[area] || 0) + (t.totalTurnover || 0);
      });
      const areaPairs = Object.entries(areaMap).sort((a, b) => b[1] - a[1]);
      const colors = ["#003882", "#00B4D8", "#10B981", "#FFB703", "#F59E0B"];

      container.innerHTML = `
        <div class="panel-grid-2col animate-fade-in">
          <div id="p6_area_donut"></div>
          <div id="p6_area_bar"></div>
        </div>
      `;

      ChartEngine.renderDonutChart(document.getElementById("p6_area_donut"), {
        title: "Regional Share Ratio (LKR)",
        categories: areaPairs,
        colors
      });

      ChartEngine.renderBarChart(document.getElementById("p6_area_bar"), {
        title: "Regional Turnover Contribution by Area (LKR)",
        items: areaPairs.map(([area, val], idx) => ({
          label: area,
          value: val,
          barColor: colors[idx % colors.length]
        }))
      });

    } else if (panel === 3) {
      container.innerHTML = `
        <div class="panel-grid-2col animate-fade-in">
          <div id="p6_indiv_bars"></div>
          <div class="panel-col-stack">
            ${UIComponents.createKpiCardHtml({
              title: "Total Verified Turnover",
              value: ChartEngine.formatCurrencyLKR(totalTurnover),
              subtitle: "Across all service engineers in field",
              trendBadge: "Verified Billing",
              icon: "engineering",
              themeStyle: "kpi-style-gradient-emerald"
            })}
            <div id="p6_velocity_gauge"></div>
          </div>
        </div>
      `;

      ChartEngine.renderBarChart(document.getElementById("p6_indiv_bars"), {
        title: "Individual Technician Verified Turnover (LKR)",
        items: rankedTechs.map(it => ({
          label: it.technicianName,
          value: it.totalTurnover,
          barColor: "var(--metro-gold-accent)"
        }))
      });

      ChartEngine.renderRadialGauge(document.getElementById("p6_velocity_gauge"), {
        title: "Field Billing Velocity",
        valueString: "91.8%",
        percentage: 0.918,
        subtitle: "Job Completion to Verified Billing Run-Rate",
        trendText: "Accelerated",
        accentColor: "#10B981",
        gradientColors: ["#34D399", "#059669"]
      });

    } else {
      // Panel 4: Technician Estimate Invoiced vs Total Spare Parts Turnover
      const rows = DashboardData.copierTechniciansList
        .filter(it => RankingEngine.filterOutGrandTotal(it.technicianName))
        .map((t, i) => {
          const ratio = (t.estimateTurnover / (t.totalTurnover || 1)) * 100;
          return {
            rank: i + 1,
            primaryName: t.technicianName,
            secondaryLabel: `Area: ${t.area.trim()}`,
            primaryValueString: ChartEngine.formatCurrencyLKR(t.estimateTurnover),
            secondaryValueString: `Total: ${ChartEngine.formatCurrencyLKR(t.totalTurnover)}`,
            statusBadge: `${ratio.toFixed(0)}% Estimate`,
            statusColor: ratio >= 70 ? "var(--metro-green-success)" : "var(--metro-cyan)"
          };
        });

      container.innerHTML = `
        <div class="panel-grid-2col animate-fade-in">
          <div>
            ${UIComponents.createLeaderboardCardHtml({
              title: "Technician Estimate Invoiced Breakdown by Area",
              icon: "engineering",
              rows
            })}
          </div>
          <div class="panel-col-stack" id="p6_queue_concentric"></div>
        </div>
      `;

      const totalEstimate = DashboardData.copierTechniciansList.reduce((acc, it) => acc + (it.estimateTurnover || 0), 0);
      const totalAllTurnover = DashboardData.copierTechniciansList.reduce((acc, it) => acc + (it.totalTurnover || 0), 0) || 1;

      ChartEngine.renderConcentricWheel(document.getElementById("p6_queue_concentric"), {
        title: "Estimate vs Spare Parts Turnover",
        centerMainText: `${((totalEstimate / totalAllTurnover) * 100).toFixed(0)}%`,
        centerSubText: "ESTIMATE SHARE",
        rings: [
          { name: "Estimate Invoiced", valueString: ChartEngine.formatCurrencyLKR(totalEstimate), percentage: totalEstimate / totalAllTurnover, color: "#10B981" },
          { name: "Total Parts Turnover", valueString: ChartEngine.formatCurrencyLKR(totalAllTurnover), percentage: 1.0, color: "var(--metro-cyan)" }
        ]
      });
    }
  },

  // =========================================================================
  // PAGE 7: COORDINATOR & TEAM LEADER PERFORMANCE
  // =========================================================================
  renderCoordinatorPerformance(container, panel) {
    if (panel === 1) {
      const rankedCoordinators = RankingEngine.rankCoordinatorsByActual(DashboardData.copierCoordinatorsList);
      const totalCoordTarget = DashboardData.copierCoordinatorsList.reduce((acc, it) => acc + (it.targetAmount || 0), 0) || 1;
      const totalCoordActual = DashboardData.copierCoordinatorsList.reduce((acc, it) => acc + (it.actualAmount || 0), 0);
      const coordRatio = totalCoordActual / totalCoordTarget;

      const rows = rankedCoordinators.map((c, i) => ({
        rank: i + 1,
        primaryName: c.coordinator,
        secondaryLabel: `Target: ${ChartEngine.formatCurrencyLKR(c.targetAmount)}`,
        primaryValueString: ChartEngine.formatCurrencyLKR(c.actualAmount),
        secondaryValueString: `Achieved: ${c.achievementPercentage.toFixed(1)}%`,
        statusBadge: c.achievementPercentage >= 2.0 ? "On Target" : "Active",
        statusColor: c.achievementPercentage >= 2.0 ? "var(--metro-green-success)" : "var(--metro-cyan)"
      }));

      container.innerHTML = `
        <div class="panel-grid-2col animate-fade-in">
          <div>
            ${UIComponents.createLeaderboardCardHtml({
              title: "Copier Coordinators Financial Performance",
              icon: "coordinator",
              rows
            })}
          </div>
          <div class="panel-col-stack">
            ${UIComponents.createKpiCardHtml({
              title: "Total Coordinator Invoicing",
              value: ChartEngine.formatCurrencyLKR(totalCoordActual),
              subtitle: `Target: ${ChartEngine.formatCurrencyLKR(totalCoordTarget)}`,
              trendBadge: `+${(coordRatio * 100).toFixed(1)}%`,
              icon: "coordinator",
              themeStyle: "kpi-style-gradient-blue",
              isPositiveTrend: true
            })}
            <div id="p7_coord_gauge"></div>
          </div>
        </div>
      `;

      ChartEngine.renderRadialGauge(document.getElementById("p7_coord_gauge"), {
        title: "Coordinator Target Velocity",
        valueString: `${(coordRatio * 100).toFixed(1)}%`,
        percentage: coordRatio,
        subtitle: `Actual: ${ChartEngine.formatCurrencyLKR(totalCoordActual)}`,
        trendText: "Service Billing",
        accentColor: "var(--metro-cyan)",
        gradientColors: ["#38BDF8", "#003882"]
      });

    } else if (panel === 2) {
      const rankedLeaders = RankingEngine.rankTeamLeadersByActual(DashboardData.copierTeamLeadersList);
      const totalLeaderTarget = DashboardData.copierTeamLeadersList.reduce((acc, it) => acc + (it.targetAmount || 0), 0) || 1;
      const totalLeaderActual = DashboardData.copierTeamLeadersList.reduce((acc, it) => acc + (it.actualAmount || 0), 0);
      const leaderRatio = totalLeaderActual / totalLeaderTarget;

      const rows = rankedLeaders.map((l, i) => ({
        rank: i + 1,
        primaryName: l.teamLeader,
        secondaryLabel: `Target: ${ChartEngine.formatCurrencyLKR(l.targetAmount)}`,
        primaryValueString: ChartEngine.formatCurrencyLKR(l.actualAmount),
        secondaryValueString: `Achieved: ${l.achievementPercentage.toFixed(1)}%`,
        statusBadge: "Leader",
        statusColor: "var(--metro-cyan)"
      }));

      container.innerHTML = `
        <div class="panel-grid-2col animate-fade-in">
          <div>
            ${UIComponents.createLeaderboardCardHtml({
              title: "Copier Team Leaders Performance",
              icon: "coordinator",
              rows
            })}
          </div>
          <div class="panel-col-stack">
            ${UIComponents.createKpiCardHtml({
              title: "Team Leader Revenue Generated",
              value: ChartEngine.formatCurrencyLKR(totalLeaderActual),
              subtitle: `Target: ${ChartEngine.formatCurrencyLKR(totalLeaderTarget)}`,
              trendBadge: `+${(leaderRatio * 100).toFixed(1)}%`,
              icon: "coordinator",
              themeStyle: "kpi-style-pastel-mint",
              isPositiveTrend: true
            })}
            <div id="p7_leader_gauge"></div>
          </div>
        </div>
      `;

      ChartEngine.renderRadialGauge(document.getElementById("p7_leader_gauge"), {
        title: "Team Leader Target Velocity",
        valueString: `${(leaderRatio * 100).toFixed(1)}%`,
        percentage: leaderRatio,
        subtitle: `Actual: ${ChartEngine.formatCurrencyLKR(totalLeaderActual)}`,
        trendText: "Team Field Execution",
        accentColor: "#10B981",
        gradientColors: ["#34D399", "#059669"]
      });

    } else if (panel === 3) {
      // Panel 3: Follow-Up Calls Achievement (%)
      const items = DashboardData.followUpCallsList.map(it => ({
        label: it.coordinator,
        value: it.achievedPercentage,
        target: 100,
        barColor: "var(--metro-cyan)",
        format: "PERCENTAGE"
      }));
      const avgCalls = DashboardData.followUpCallsList.length > 0
        ? DashboardData.followUpCallsList.reduce((acc, it) => acc + (it.achievedPercentage || 0), 0) / DashboardData.followUpCallsList.length
        : 0;

      container.innerHTML = `
        <div class="panel-grid-2col animate-fade-in">
          <div id="p7_calls_bar"></div>
          <div class="panel-col-stack">
            ${UIComponents.createKpiCardHtml({
              title: "Average Follow-Up Completion",
              value: `${avgCalls.toFixed(1)}%`,
              subtitle: "Post-service customer satisfaction calls",
              trendBadge: "Customer Care",
              icon: "call",
              themeStyle: "kpi-style-pastel-purple"
            })}
            <div id="p7_calls_gauge"></div>
          </div>
        </div>
      `;

      ChartEngine.renderBarChart(document.getElementById("p7_calls_bar"), {
        title: "Coordinator Follow-Up Calls Target Achievement (%)",
        defaultFormat: "PERCENTAGE",
        items
      });

      ChartEngine.renderRadialGauge(document.getElementById("p7_calls_gauge"), {
        title: "Customer Feedback Reach Rate",
        valueString: `${avgCalls.toFixed(1)}%`,
        percentage: avgCalls / 100,
        subtitle: "Target: 100% Client Contact Rate",
        trendText: avgCalls >= 85 ? "Excellent Client Care" : "Follow-Up Active",
        accentColor: "#8B5CF6",
        gradientColors: ["#A78BFA", "#6D28D9"]
      });

    } else {
      // Panel 4: Daily Copier Estimate Generation Status & Weekly Champion
      const metrics = EstimateGenerationEngine.computeSummaryMetrics(DashboardData.dailyGenerateEstimateList);
      const rankedEst = EstimateGenerationEngine.rankCoordinators(DashboardData.dailyGenerateEstimateList);

      const tableRows = rankedEst.map((c, i) => `
        <div class="leaderboard-row rank-${i + 1}">
          <div class="row-left">
            <span class="rank-badge ${i === 0 ? 'gold' : 'silver'}">#${i + 1}</span>
            <div class="row-identity">
              <span class="row-primary-name">${c.coordinator}</span>
              <span class="row-secondary-label">Yesterday: ${c.yesterdayCount} | Week: ${c.weekCount}</span>
            </div>
          </div>
          <div class="row-right">
            <div class="row-values-col">
              <span class="row-primary-value">${c.monthToDateCount} MTD</span>
              <span class="row-secondary-value">${c.weekCount} 7-Day</span>
            </div>
            <span class="row-status-pill">${i === 0 ? '★ Champion' : 'Active'}</span>
          </div>
        </div>
      `).join('');

      container.innerHTML = `
        <div class="panel-grid-2col animate-fade-in">
          <div>
            ${UIComponents.createAwardCardHtml({
              id: "weekly_estimate_champ",
              categoryTitle: "Weekly Estimate Generation Champion",
              employeeName: metrics.champion.coordinator,
              designation: "Lead Service Estimate Coordinator",
              achievementText: `Generated ${metrics.champion.weekCount} verified estimates in past 7 days with ${metrics.champion.monthToDateCount} month-to-date total.`,
              scorePercentage: 99.2
            })}
          </div>
          <div class="panel-col-stack">
            <div class="panel-grid-3mini-cards">
              ${UIComponents.createKpiCardHtml({
                title: "Yesterday",
                value: `${metrics.totalYesterday}`,
                subtitle: metrics.yesterdayFormattedDate,
                trendBadge: "Yesterday",
                icon: "trending",
                themeStyle: "kpi-style-pastel-mint"
              })}
              ${UIComponents.createKpiCardHtml({
                title: "Weekly (7D)",
                value: `${metrics.totalThisWeek}`,
                subtitle: "Rolling 7 Days",
                trendBadge: "Week",
                icon: "trending",
                themeStyle: "kpi-style-gradient-blue"
              })}
              ${UIComponents.createKpiCardHtml({
                title: "Total Count",
                value: `${metrics.totalMonthToDate}`,
                subtitle: "Month to Date",
                trendBadge: "MTD Total",
                icon: "trending",
                themeStyle: "kpi-style-pastel-purple"
              })}
            </div>
            <div class="leaderboard-card hover-lift" style="flex: 1;">
              <div class="card-header-bar">
                <div class="card-header-left">
                  <span class="card-heading-icon">${UIComponents.getIconSvg('award')}</span>
                  <span class="card-heading-text">Coordinator Daily Status & Rankings</span>
                </div>
                <span class="metric-count-pill">${rankedEst.length} Coordinators</span>
              </div>
              <div class="table-col-header">
                <div class="col-header-left">
                  <span style="width: 28px; text-align: center;">RANK</span>
                  <span>Coordinator / Entity</span>
                </div>
                <div class="col-header-right">
                  <span>Estimates Generated</span>
                  <span style="min-width: 75px; text-align: right;">Status</span>
                </div>
              </div>
              <div class="leaderboard-rows-container">
                ${tableRows}
              </div>
            </div>
          </div>
        </div>
      `;
    }
  },

  // =========================================================================
  // PAGE 8: DEBTORS & OUTSTANDING WORK
  // =========================================================================
  renderDebtorsOutstanding(container, panel) {
    if (panel === 1) {
      const rankedDebtors = RankingEngine.rankDebtorsByOverdueRisk(DashboardData.csbmDebtorsList);
      const totalDebtorsSum = DashboardData.csbmDebtorsList.reduce((acc, it) => acc + (it.totalDebtors || 0), 0) || 1;
      const totalOver90Sum = DashboardData.csbmDebtorsList.reduce((acc, it) => acc + (it.over90Days || 0), 0);
      const overdueRatio = totalOver90Sum / totalDebtorsSum;

      const rows = rankedDebtors.map((d, i) => ({
        rank: i + 1,
        primaryName: d.department,
        secondaryLabel: `Total: ${ChartEngine.formatCurrencyLKR(d.totalDebtors)}`,
        primaryValueString: `Over 90: ${ChartEngine.formatCurrencyLKR(d.over90Days)}`,
        secondaryValueString: `Overdue: ${d.overduePercentage.toFixed(1)}%`,
        statusBadge: d.overduePercentage > 20 ? "Critical" : "Moderate",
        statusColor: d.overduePercentage > 20 ? "var(--metro-red-error)" : "var(--metro-orange-warning)"
      }));

      const heroBannerHtml = UIComponents.createHeroStoryBanner({
        badge: "📢 MONEY PEOPLE STILL OWE US",
        title: "Customer Bills & Unpaid Debt Summary",
        description: "Customers owe Metropolitan <strong>LKR 538.9 Million</strong>. Most of it is normal recent billing, but <strong>LKR 87.1 Million (16.2%)</strong> is overdue by more than 3 months. Our collection heroes need to call these customers!",
        pills: [
          { icon: "💰", title: "Total Owed", val: ChartEngine.formatCurrencyLKR(totalDebtorsSum), type: "goal" },
          { icon: "🚨", title: "Urgent (>90 Days)", val: ChartEngine.formatCurrencyLKR(totalOver90Sum), type: "debt" },
          { icon: "🛡️", title: "Safe Book", val: ChartEngine.formatCurrencyLKR(totalDebtorsSum - totalOver90Sum), type: "actual" }
        ]
      });

      container.innerHTML = `
        ${heroBannerHtml}
        <div class="panel-grid-2col animate-fade-in">
          <div>
            ${UIComponents.createLeaderboardCardHtml({
              title: "Department Debtor Exposure & Over-90-Day Risk (LKR)",
              icon: "warning",
              rows
            })}
          </div>
          <div class="panel-col-stack">
            ${UIComponents.createKpiCardHtml({
              title: "Over-90 Debt Exposure",
              value: ChartEngine.formatCurrencyLKR(totalOver90Sum),
              subtitle: "Across all divisions and customer accounts",
              trendBadge: "Collections Action",
              icon: "warning",
              themeStyle: "kpi-style-pastel-rose",
              isPositiveTrend: false
            })}
            <div id="p8_overdue_gauge"></div>
          </div>
        </div>
      `;

      ChartEngine.renderRadialGauge(document.getElementById("p8_overdue_gauge"), {
        title: "Over-90 Risk Velocity",
        valueString: `${(overdueRatio * 100).toFixed(1)}%`,
        percentage: overdueRatio,
        subtitle: `Total Book: ${ChartEngine.formatCurrencyLKR(totalDebtorsSum)}`,
        trendText: overdueRatio > 0.2 ? "High Risk Exposure" : "Healthy Status",
        accentColor: overdueRatio > 0.2 ? "var(--metro-red-error)" : "var(--metro-orange-warning)",
        gradientColors: ["#F43F5E", "#BE123C"]
      });

    } else if (panel === 2) {
      const totalAmc = DashboardData.amcPendingList.reduce((acc, it) => acc + (it.pendingAmount || 0), 0);

      container.innerHTML = `
        <div class="panel-grid-2col animate-fade-in">
          <div id="p8_amc_bars"></div>
          <div class="panel-col-stack">
            ${UIComponents.createKpiCardHtml({
              title: "Total AMC Outstanding",
              value: ChartEngine.formatCurrencyLKR(totalAmc),
              subtitle: "Annual maintenance contracts awaiting renewal",
              trendBadge: "Renewal In Progress",
              icon: "receipt",
              themeStyle: "kpi-style-pastel-amber"
            })}
            <div id="p8_amc_gauge"></div>
          </div>
        </div>
      `;

      ChartEngine.renderBarChart(document.getElementById("p8_amc_bars"), {
        title: "AMC Pending Exposure by Coordinator (LKR)",
        items: DashboardData.amcPendingList.map(it => ({
          label: it.coordinator,
          value: it.pendingAmount,
          barColor: "var(--metro-orange-warning)"
        }))
      });

      ChartEngine.renderRadialGauge(document.getElementById("p8_amc_gauge"), {
        title: "AMC Renewal Recovery Index",
        valueString: "78.4%",
        percentage: 0.784,
        subtitle: "Contracts Renewed vs Total Base",
        trendText: "Active Follow-Up",
        accentColor: "var(--metro-orange-warning)",
        gradientColors: ["#FBBF24", "#EA580C"]
      });

    } else {
      // Panel 3: Estimate Pending Exposure & Backlog Clearance
      const totalEstPending = DashboardData.estimatePendingList.reduce((acc, it) => acc + (it.pendingAmount || 0), 0);

      container.innerHTML = `
        <div class="panel-grid-2col animate-fade-in">
          <div id="p8_est_bars"></div>
          <div class="panel-col-stack">
            ${UIComponents.createKpiCardHtml({
              title: "Total Estimate Pending",
              value: ChartEngine.formatCurrencyLKR(totalEstPending),
              subtitle: "Field quotes & LKR 25.3M workshop backlog",
              trendBadge: "Client Approvals",
              icon: "briefcase",
              themeStyle: "kpi-style-pastel-purple"
            })}
            <div id="p8_est_gauge"></div>
          </div>
        </div>
      `;

      ChartEngine.renderBarChart(document.getElementById("p8_est_bars"), {
        title: "Estimate Pending Exposure by Coordinator (LKR)",
        items: DashboardData.estimatePendingList.map(it => ({
          label: it.coordinator,
          value: it.pendingAmount,
          barColor: "var(--metro-orange-warning)"
        }))
      });

      ChartEngine.renderRadialGauge(document.getElementById("p8_est_gauge"), {
        title: "Estimate Clearance Velocity",
        valueString: "81.6%",
        percentage: 0.816,
        subtitle: "Quote-to-Order Conversion Pace",
        trendText: "Within 48h SLA",
        accentColor: "var(--metro-cyan)",
        gradientColors: ["#38BDF8", "#0284C7"]
      });
    }
  },

  // =========================================================================
  // PAGE 9: EMPLOYEE RECOGNITION
  // =========================================================================
  renderEmployeeRecognition(container, panel) {
    const heroBannerHtml = UIComponents.createHeroStoryBanner({
      badge: "🏆 SUPERSTARS OF THE MONTH",
      title: "Meet Our Champions Bringing in the Big Wins!",
      description: "These are the star performers of Metropolitan for November 2026. Through hard work, great customer service, and dedication, they earned the highest sales and service scores!",
      pills: [
        { icon: "🥇", title: "Top Commercial Hero", val: "Chamara Sampath", type: "goal" },
        { icon: "⭐", title: "Top Consumables Star", val: "Kapila Kithsiri", type: "actual" }
      ]
    });

    if (panel === 1) {
      // Panel 1: Monthly & Annual Commercial Excellence Champions
      const topChamps = DashboardData.awards.slice(1, 3);
      const cardsHtml = topChamps.map(a => UIComponents.createAwardCardHtml(a)).join('');

      container.innerHTML = `
        ${heroBannerHtml}
        <div class="panel-grid-equal animate-fade-in">
          ${cardsHtml}
        </div>
      `;
    } else {
      // Panel 2: Technical, Consumables & Operations Champions
      const otherChamps = [DashboardData.awards[0], DashboardData.awards[3], DashboardData.awards[4]].filter(Boolean);
      const cardsHtml = otherChamps.map(a => UIComponents.createAwardCardHtml(a)).join('');

      container.innerHTML = `
        ${heroBannerHtml}
        <div class="panel-grid-3col animate-fade-in">
          ${cardsHtml}
        </div>
      `;
    }
  },

  // =========================================================================
  // PAGE 10: MANAGEMENT INSIGHTS
  // =========================================================================
  renderManagementInsights(container, panel) {
    const heroBannerHtml = UIComponents.createHeroStoryBanner({
      badge: "💡 SMART MANAGEMENT INSIGHTS",
      title: "What Should We Do Next to Grow Faster?",
      description: "Simple, powerful action items for our leadership team to help our company earn more, collect debt faster, and reward our best performers!",
      pills: [
        { icon: "🎯", title: "Target Focus", val: "Printer Consumables", type: "goal" },
        { icon: "⚡", title: "Top Priority", val: "Overdue Collections", type: "debt" }
      ]
    });

    const list = panel === 1 ? DashboardData.insights.slice(0, 3) : DashboardData.insights.slice(3, 6);
    const cardsHtml = list.map(item => UIComponents.createInsightCardHtml(item)).join('');

    container.innerHTML = `
      ${heroBannerHtml}
      <div class="panel-col-stack animate-fade-in">
        ${cardsHtml}
      </div>
    `;
  }
};

