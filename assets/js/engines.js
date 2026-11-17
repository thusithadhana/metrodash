/**
 * METROPOLITAN MANAGEMENT INTELLIGENCE - DASHBOARD WEB APPLICATION
 * Business Logic & Analytical Calculation Engines
 */

const FinancialCalculationEngine = {
  calculateAchievementPct(actual, target) {
    if (!target || target <= 0) return 0.0;
    return (actual / target) * 100.0;
  },

  calculateRemainingTarget(target, actual) {
    return Math.max(0.0, target - actual);
  },

  calculateContributionPct(part, total) {
    if (!total || total <= 0) return 0.0;
    return (part / total) * 100.0;
  },

  calculateExecutiveSummary(data) {
    const totalProjection = (data.csbmProjectionList || []).reduce((acc, it) => acc + (it.projectionAmount || 0), 0);
    const totalCsbmActual = (data.csbmProjectionList || []).reduce((acc, it) => acc + (it.actualAmount || 0), 0);
    const overallAchievement = this.calculateAchievementPct(totalCsbmActual, totalProjection);

    const totalDailyInvoiced = (data.dailyCopierInvoicedList || []).reduce((acc, it) => acc + (it.invoicedValue || 0), 0);
    const tonerSalesRevenue = (data.tonerSalesList || []).reduce((acc, it) => acc + (it.salesValue || 0), 0);
    const printerConsumablesRevenue = (data.printerConsumablesList || []).reduce((acc, it) => acc + (it.actualAmount || 0), 0);

    const totalDebtors = (data.csbmDebtorsList || []).reduce((acc, it) => acc + (it.totalDebtors || 0), 0);
    const over90Debtors = (data.csbmDebtorsList || []).reduce((acc, it) => acc + (it.over90Days || 0), 0);
    const overallOverduePct = this.calculateContributionPct(over90Debtors, totalDebtors);

    const pendingAmcVal = (data.amcPendingList || []).reduce((acc, it) => acc + (it.pendingAmount || 0), 0);
    const pendingEstimateVal = (data.estimatePendingList || []).reduce((acc, it) => acc + (it.pendingAmount || 0), 0);

    return {
      totalDepartmentProjection: totalProjection,
      totalActualFinancialAchievement: totalCsbmActual,
      overallTargetAchievementPct: overallAchievement,
      totalInvoicedValue: totalDailyInvoiced,
      salesRevenue: printerConsumablesRevenue + tonerSalesRevenue,
      tonerSalesValue: tonerSalesRevenue,
      outstandingDebtors: totalDebtors,
      debtorsOver90Days: over90Debtors,
      debtorsOverduePct: overallOverduePct,
      pendingAmcValue: pendingAmcVal,
      pendingEstimateValue: pendingEstimateVal,
      totalPipelineValue: pendingAmcVal + pendingEstimateVal,
      totalTechniciansCount: (data.copierTechniciansList || []).length,
      activeCoordinatorsCount: (data.copierCoordinatorsList || []).length
    };
  }
};

const RankingEngine = {
  filterOutGrandTotal(name) {
    if (!name) return false;
    const u = name.trim().toUpperCase();
    return !(u.startsWith("TOTAL") || u.startsWith("GRAND TOTAL") || u === "-" || u.startsWith("-NO SALES"));
  },

  rankCoordinatorsByActual(list) {
    return [...(list || [])]
      .filter(it => this.filterOutGrandTotal(it.coordinator))
      .sort((a, b) => (b.actualAmount || 0) - (a.actualAmount || 0));
  },

  rankTeamLeadersByActual(list) {
    return [...(list || [])]
      .filter(it => this.filterOutGrandTotal(it.teamLeader))
      .sort((a, b) => (b.actualAmount || 0) - (a.actualAmount || 0));
  },

  rankTechniciansByTurnover(list) {
    return [...(list || [])]
      .filter(it => this.filterOutGrandTotal(it.technicianName))
      .sort((a, b) => (b.totalTurnover || 0) - (a.totalTurnover || 0));
  },

  rankPrinterSalesByActual(list) {
    return [...(list || [])]
      .filter(it => this.filterOutGrandTotal(it.salesperson))
      .sort((a, b) => (b.actualAmount || 0) - (a.actualAmount || 0));
  },

  rankTonerSalesByValue(list) {
    return [...(list || [])]
      .filter(it => this.filterOutGrandTotal(it.salesperson))
      .sort((a, b) => (b.salesValue || 0) - (a.salesValue || 0));
  },

  rankDepartmentsByActual(list) {
    return [...(list || [])]
      .filter(it => this.filterOutGrandTotal(it.department))
      .sort((a, b) => (b.actualAmount || 0) - (a.actualAmount || 0));
  },

  rankDepartmentsByAchievement(list) {
    return [...(list || [])]
      .filter(it => this.filterOutGrandTotal(it.department))
      .sort((a, b) => (b.achievementPercentage || 0) - (a.achievementPercentage || 0));
  },

  rankDebtorsByOverdueRisk(list) {
    return [...(list || [])]
      .filter(it => this.filterOutGrandTotal(it.department))
      .sort((a, b) => (b.over90Days || 0) - (a.over90Days || 0));
  }
};

const EstimateGenerationEngine = {
  computeSummaryMetrics(list) {
    const validList = (list || []).filter(it => RankingEngine.filterOutGrandTotal(it.coordinator));
    const totalYesterday = validList.reduce((acc, it) => acc + (it.yesterdayCount || 0), 0);
    const totalThisWeek = validList.reduce((acc, it) => acc + (it.weekCount || 0), 0);
    const totalMonthToDate = validList.reduce((acc, it) => acc + (it.monthToDateCount || 0), 0);

    const sortedByWeek = [...validList].sort((a, b) => (b.weekCount || 0) - (a.weekCount || 0));
    const champion = sortedByWeek[0] || {
      coordinator: "NIRASHANI PRAMUDINI",
      weekCount: 103,
      monthToDateCount: 137,
      yesterdayCount: 31
    };

    return {
      totalYesterday,
      totalThisWeek,
      totalMonthToDate,
      champion,
      yesterdayFormattedDate: "Yesterday"
    };
  },

  rankCoordinators(list) {
    return [...(list || [])]
      .filter(it => RankingEngine.filterOutGrandTotal(it.coordinator))
      .sort((a, b) => (b.weekCount || 0) - (a.weekCount || 0));
  }
};

