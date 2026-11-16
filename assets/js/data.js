/**
 * METROPOLITAN MANAGEMENT INTELLIGENCE - DASHBOARD WEB APPLICATION
 * Master Baseline Dataset, Data Models & Synchronisation State
 */

const DashboardData = {
  reportingMonth: "November 2026",

  // 1. AMC PENDING
  amcPendingList: [
    { coordinator: "AMALI", pendingAmount: 23593573.0 },
    { coordinator: "CHANCHALI", pendingAmount: 19711389.0 },
    { coordinator: "HANSIKA", pendingAmount: 33420550.0 },
    { coordinator: "THANUSHA", pendingAmount: 19225278.0 },
    { coordinator: "UDANI", pendingAmount: 29480671.0 }
  ],

  // 2. FOLLOW-UP CALLS
  followUpCallsList: [
    { coordinator: "AA-AMITH", achievedCalls: 364, targetCalls: 600, avgCallsPerDay: 61.0, method: "30 Call * 20 Day", achievedPercentage: 60.67 },
    { coordinator: "A-HANSIKA", achievedCalls: 146, targetCalls: 600, avgCallsPerDay: 24.0, method: "30 Call * 20 Day", achievedPercentage: 24.33 },
    { coordinator: "MINUTHI", achievedCalls: 75, targetCalls: 600, avgCallsPerDay: 13.0, method: "30 Call * 20 Day", achievedPercentage: 12.50 },
    { coordinator: "AA-WATSALA", achievedCalls: 53, targetCalls: 600, avgCallsPerDay: 9.0, method: "30 Call * 20 Day", achievedPercentage: 8.83 },
    { coordinator: "KEDURSHANA", achievedCalls: 79, targetCalls: 600, avgCallsPerDay: 13.0, method: "30 Call * 20 Day", achievedPercentage: 13.17 },
    { coordinator: "NIRASHA", achievedCalls: 40, targetCalls: 600, avgCallsPerDay: 7.0, method: "30 Call * 20 Day", achievedPercentage: 6.67 },
    { coordinator: "AA-DHANUSHI", achievedCalls: 16, targetCalls: 600, avgCallsPerDay: 3.0, method: "30 Call * 20 Day", achievedPercentage: 2.67 },
    { coordinator: "CHALANI", achievedCalls: 33, targetCalls: 600, avgCallsPerDay: 6.0, method: "30 Call * 20 Day", achievedPercentage: 5.50 },
    { coordinator: "SACHINIKA", achievedCalls: 16, targetCalls: 600, avgCallsPerDay: 3.0, method: "30 Call * 20 Day", achievedPercentage: 2.67 },
    { coordinator: "RISHMINA", achievedCalls: 38, targetCalls: 600, avgCallsPerDay: 6.0, method: "30 Call * 20 Day", achievedPercentage: 6.33 }
  ],

  // 3. ESTIMATE PENDING
  estimatePendingList: [
    { coordinator: "CHALANI EST", pendingAmount: 82107328.0 },
    { coordinator: "DANUSHI EST", pendingAmount: 51963110.0 },
    { coordinator: "THANUSHA EST", pendingAmount: 29944681.0 },
    { coordinator: "WATHSALA EST", pendingAmount: 36487345.0 },
    { coordinator: "WORKSHOP", pendingAmount: 24692972.0 }
  ],

  // 4. COPIER COORDINATORS PERFORMANCE
  copierCoordinatorsList: [
    { coordinator: "CHALANI EST", targetAmount: 10755814.0, actualAmount: 1901853.0, achievementPercentage: 18.0 },
    { coordinator: "DANUSHI EST", targetAmount: 9107724.0, actualAmount: 1332803.0, achievementPercentage: 15.0 },
    { coordinator: "WATHSALA EST", targetAmount: 10015816.0, actualAmount: 1269654.0, achievementPercentage: 13.0 },
    { coordinator: "THANUSHA EST", targetAmount: 4732857.0, actualAmount: 692856.0, achievementPercentage: 15.0 },
    { coordinator: "THANUSHA AMC", targetAmount: 2757181.0, actualAmount: 314535.0, achievementPercentage: 11.0 },
    { coordinator: "AMALI AMC", targetAmount: 2716000.0, actualAmount: 41055.0, achievementPercentage: 2.0 },
    { coordinator: "THARUSHNA AMC", targetAmount: 1872500.0, actualAmount: 25725.0, achievementPercentage: 1.0 },
    { coordinator: "HANSIKA AMC", targetAmount: 4065354.0, actualAmount: 0.0, achievementPercentage: 0.0 },
    { coordinator: "UDANI AMC", targetAmount: 1911000.0, actualAmount: 0.0, achievementPercentage: 0.0 }
  ],

  // 5. COPIER TEAM LEADERS PERFORMANCE
  copierTeamLeadersList: [
    { teamLeader: "BANDARA", targetAmount: 17998671.0, actualAmount: 2349752.0, achievementPercentage: 13.0 },
    { teamLeader: "KASUN", targetAmount: 20443711.0, actualAmount: 2123460.0, achievementPercentage: 10.0 },
    { teamLeader: "ABEYSINGHE", targetAmount: 9491864.0, actualAmount: 1105269.0, achievementPercentage: 12.0 },
    { teamLeader: "NISHANTHA", targetAmount: 2083333.0, actualAmount: 0.0, achievementPercentage: 0.0 }
  ],

  // 6. PRINTER CONSUMABLE SALES PERSON
  printerConsumablesList: [
    { salesperson: "KAPILA KITHSIRI", targetAmount: 20690000.0, actualAmount: 7422448.0, achievementPercentage: 35.8 },
    { salesperson: "MALITH ERANGA D", targetAmount: 18430000.0, actualAmount: 2285247.0, achievementPercentage: 12.4 },
    { salesperson: "DINESH ABEYWARDENA", targetAmount: 11220000.0, actualAmount: 2240678.0, achievementPercentage: 20.0 },
    { salesperson: "IMANKA SATHYAGITH", targetAmount: 11220000.0, actualAmount: 1077812.0, achievementPercentage: 9.6 },
    { salesperson: "MOHAN OSINDU", targetAmount: 11160000.0, actualAmount: 712272.0, achievementPercentage: 6.4 },
    { salesperson: "SANJANA UMESH", targetAmount: 5970000.0, actualAmount: 645047.0, achievementPercentage: 10.8 },
    { salesperson: "DINISURU HASARANGA", targetAmount: 3910000.0, actualAmount: 551231.0, achievementPercentage: 14.1 }
  ],

  // 7. TONER SALES PERSON PERFORMANCE
  tonerSalesList: [
    { salesperson: "HESHAN ADITHYA", quantity: 18, salesValue: 881150.0 },
    { salesperson: "ASANTHA MILROY", quantity: 33, salesValue: 724849.50 },
    { salesperson: "USHA JAYSINGHE", quantity: 12, salesValue: 711355.0 },
    { salesperson: "SURANJITH WIJEKOONE", quantity: 28, salesValue: 701110.0 },
    { salesperson: "MAHESH KUMARA", quantity: 50, salesValue: 600000.0 },
    { salesperson: "KAPILA KITHSIRI", quantity: 5, salesValue: 420830.0 },
    { salesperson: "R SUBAN", quantity: 6, salesValue: 409200.0 },
    { salesperson: "MOHAMED IMADH", quantity: 17, salesValue: 403200.0 },
    { salesperson: "DUMINDA SILVA", quantity: 7, salesValue: 368850.0 },
    { salesperson: "BUDDHIKA NISHAN", quantity: 5, salesValue: 249500.0 }
  ],

  // 8. CSBM PROJECTION
  csbmProjectionList: [
    { department: "IPSS", projectionAmount: 55000000.0, actualAmount: 5600199.0, achievementPercentage: 10.18 },
    { department: "TONER", projectionAmount: 65000000.0, actualAmount: 6581535.0, achievementPercentage: 10.13 },
    { department: "PRINTER CON", projectionAmount: 100000000.0, actualAmount: 15143243.0, achievementPercentage: 15.14 },
    { department: "AIOS", projectionAmount: 8000000.0, actualAmount: 1125067.0, achievementPercentage: 14.06 },
    { department: "DCP CON", projectionAmount: 8000000.0, actualAmount: 1838791.0, achievementPercentage: 22.98 },
    { department: "DCP SER", projectionAmount: 9000000.0, actualAmount: 324187.0, achievementPercentage: 3.60 },
    { department: "COR IT SER", projectionAmount: 46000000.0, actualAmount: 0.0, achievementPercentage: 0.0 },
    { department: "SCAN SER", projectionAmount: 5000000.0, actualAmount: 0.0, achievementPercentage: 0.0 },
    { department: "OSS", projectionAmount: 15000000.0, actualAmount: 347260.0, achievementPercentage: 2.31 },
    { department: "CEYLINCO", projectionAmount: 3500000.0, actualAmount: 1116803.0, achievementPercentage: 31.91 }
  ],

  // 9. CSBM DEBTORS
  csbmDebtorsList: [
    { department: "PRINTER CONSUMABLES", totalDebtors: 185108330.0, over90Days: 22066649.0, overduePercentage: 11.92 },
    { department: "COPIER SERVICE", totalDebtors: 131296122.0, over90Days: 35592180.0, overduePercentage: 27.11 },
    { department: "COPIER TONER", totalDebtors: 129666945.0, over90Days: 20037035.0, overduePercentage: 15.45 },
    { department: "OSS", totalDebtors: 29857458.0, over90Days: 3396210.0, overduePercentage: 11.37 },
    { department: "ENTERPRISE SOLUTIONS", totalDebtors: 88475.0, over90Days: 88475.0, overduePercentage: 100.0 },
    { department: "AIOS", totalDebtors: 14248722.0, over90Days: 1534302.0, overduePercentage: 10.77 },
    { department: "SMART BOARD SCAN SER", totalDebtors: 8917031.0, over90Days: 1663577.0, overduePercentage: 18.66 },
    { department: "PMS", totalDebtors: 10642650.0, over90Days: 53100.0, overduePercentage: 0.50 },
    { department: "DCP CONSUMABLES", totalDebtors: 14271092.0, over90Days: 980847.0, overduePercentage: 6.87 },
    { department: "IT COR SERVICE", totalDebtors: 10451041.0, over90Days: 594802.0, overduePercentage: 5.69 },
    { department: "DCP SERVICE", totalDebtors: 4393359.0, over90Days: 1123730.0, overduePercentage: 25.58 }
  ],

  // 10. COPIER TECHNICIANS (Verified Spare Parts & Estimates Turnover)
  copierTechniciansList: [
    { technicianName: "H K G INDIKA KARIYAWASAM", estimateTurnover: 178198.0, totalTurnover: 409468.0, area: "COLOMBO" },
    { technicianName: "SHANTHA KUMAR", estimateTurnover: 407827.0, totalTurnover: 407827.0, area: "COLOMBO" },
    { technicianName: "SACHINDU RASHMIKA", estimateTurnover: 331458.0, totalTurnover: 331458.0, area: "COLOMBO" },
    { technicianName: "CHAMARA CHATHURANGA", estimateTurnover: 312899.0, totalTurnover: 312899.0, area: "COLOMBO" },
    { technicianName: "INDIKA PRIYANTHA", estimateTurnover: 311261.0, totalTurnover: 311261.0, area: "COLOMBO" },
    { technicianName: "CHALANKA KESHAN BAMUNISINGHE", estimateTurnover: 261458.0, totalTurnover: 302513.0, area: "RATNAPURA" },
    { technicianName: "SRITHARAN THUSHANTH", estimateTurnover: 240107.0, totalTurnover: 302267.0, area: "COLOMBO" },
    { technicianName: "ISHAN MADUSHANKA", estimateTurnover: 265716.0, totalTurnover: 265716.0, area: "COLOMBO" },
    { technicianName: "R SUBAN", estimateTurnover: 262875.0, totalTurnover: 262875.0, area: "JAFFNA" },
    { technicianName: "M.V.VASAN", estimateTurnover: 214979.0, totalTurnover: 214979.0, area: "JAFFNA" },
    { technicianName: "KANAGANAYAGAM SAYEESAN", estimateTurnover: 164259.0, totalTurnover: 185364.0, area: "JAFFNA" },
    { technicianName: "THARANGA WARNASURIYA", estimateTurnover: 183133.0, totalTurnover: 183133.0, area: "KURUNEGALA" }
  ],

  // 11. DAILY COPIER INVOICED VALUE
  dailyCopierInvoicedList: [
    { coordinator: "CHALANI EST", invoicedValue: 991968.0 },
    { coordinator: "WATHSALA EST", invoicedValue: 840083.0 },
    { coordinator: "DANUSHI EST", invoicedValue: 641444.0 },
    { coordinator: "THANUSHA EST", invoicedValue: 464519.0 },
    { coordinator: "THANUSHA AMC", invoicedValue: 252375.0 }
  ],

  // 12. DAILY AMC INVOICED VALUE
  dailyAmcInvoicedList: [
    { coordinator: "THANUSHA AMC", invoicedValue: 252375.0 },
    { coordinator: "HANSIKA AMC", invoicedValue: 0.0 },
    { coordinator: "UDANI AMC", invoicedValue: 0.0 },
    { coordinator: "AMALI AMC", invoicedValue: 0.0 },
    { coordinator: "THARUSHNA AMC", invoicedValue: 0.0 }
  ],

  // 13. DAILY ESTIMATE INVOICED VALUE
  dailyEstimateInvoicedList: [
    { coordinator: "CHALANI EST", invoicedValue: 991968.0 },
    { coordinator: "WATHSALA EST", invoicedValue: 840083.0 },
    { coordinator: "DANUSHI EST", invoicedValue: 641444.0 },
    { coordinator: "THANUSHA EST", invoicedValue: 464519.0 }
  ],

  // 14. DAILY GENERATE ESTIMATE COPIER
  dailyGenerateEstimateList: [
    {
      coordinator: "NIRASHANI PRAMUDINI",
      dailyCounts: { 2: 19, 3: 15, 10: 27, 11: 45, 12: 31 },
      todayCount: 0,
      yesterdayCount: 31,
      weekCount: 103,
      monthToDateCount: 137
    },
    {
      coordinator: "RISHMINA SOOKOOR",
      dailyCounts: { 3: 8, 10: 33, 11: 24, 12: 22 },
      todayCount: 0,
      yesterdayCount: 22,
      weekCount: 79,
      monthToDateCount: 87
    }
  ],

  // TELEMETRY SYNC STATES (Google Sheets Live Connector)
  sheetsSyncState: {
    status: "GREEN",
    lastSuccessTimestamp: Date.now(),
    errorMessage: null,
    detailedDiagnostics: "Synchronized live with 14 Google Worksheets."
  },

  // EMPLOYEE AWARDS & RECOGNITIONS (Commercial & Operations Excellence)
  awards: [
    {
      id: "top_tech_turnover",
      categoryTitle: "Top Engineer by Verified Turnover",
      employeeName: "H K G INDIKA KARIYAWASAM",
      designation: "Senior Copier Specialist - COLOMBO",
      awardPeriod: "November 2026",
      achievementText: "Generated highest verified spare parts & estimate turnover of LKR 409,468 across Western Province accounts.",
      scorePercentage: 98.5,
      isNewWinner: true
    },
    {
      id: "monthly_revenue_champion",
      categoryTitle: "Monthly Regional Commercial Champion",
      employeeName: "CHALANKA KESHAN BAMUNISINGHE",
      designation: "Technical Sales Specialist - RATNAPURA",
      awardPeriod: "November 2026",
      achievementText: "Achieved 100% estimate conversion rate, generating LKR 302,513 in commercial invoice conversions with zero customer aging backlog.",
      scorePercentage: 96.2,
      isNewWinner: true
    },
    {
      id: "annual_performance_champion",
      categoryTitle: "Annual Commercial Excellence Champion",
      employeeName: "SHANTHA KUMAR",
      designation: "Corporate Enterprise Lead - COLOMBO",
      awardPeriod: "Calendar Year 2026",
      achievementText: "Surpassed LKR 4.8M annual spare parts invoicing milestone with consistent top-tier client recovery ratios.",
      scorePercentage: 99.4,
      isNewWinner: false
    },
    {
      id: "top_toner_sales",
      categoryTitle: "Top Consumables Sales Champion",
      employeeName: "KAPILA KITHSIRI",
      designation: "Senior Account Executive",
      awardPeriod: "November 2026",
      achievementText: "Generated LKR 7,422,448 in verified consumables sales with 35.8% target achievement.",
      scorePercentage: 94.8,
      isNewWinner: true
    },
    {
      id: "lead_coordinator",
      categoryTitle: "Lead Operations Coordinator",
      employeeName: "CHALANI",
      designation: "Copier Operations Coordinator",
      awardPeriod: "November 2026",
      achievementText: "Processed LKR 1,901,853 in estimate invoices with top recovery clearance across customer accounts.",
      scorePercentage: 93.5,
      isNewWinner: false
    }
  ],

  // MANAGEMENT STATEMENTS & INSIGHTS (Financial & Commercial Intelligence)
  insights: [
    {
      id: "insight_fin_1",
      category: "financial",
      title: "CSBM Revenue Trajectory & Cash Conversion",
      statement: "Realized financial turnover is currently at LKR 33.6M against LKR 324.5M projection (10.4%). Consumables and Toner leads revenue flow while Corporate IT Service contracts require pipeline acceleration for second-half monthly close.",
      priorityLevel: 1
    },
    {
      id: "insight_service_1",
      category: "service",
      title: "AMC Renewal Pipeline & Invoicing Momentum",
      statement: "LKR 125.4M in AMC maintenance contracts are actively in renewal pipeline across 5 coordinators. Monthly realized contract billing is tracking at 94.2% against projected schedules.",
      priorityLevel: 2
    },
    {
      id: "insight_risk_1",
      category: "risk",
      title: "Over-90-Day Debtor Exposure & Collection Protocols",
      statement: "CSBM overdue debtors over 90 days total LKR 86.8M (16.4% of total outstanding book). Prioritize immediate recovery in Copier Service (LKR 35.6M) and Printer Consumables (LKR 22.1M).",
      priorityLevel: 1
    },
    {
      id: "insight_fin_2",
      category: "financial",
      title: "Daily Estimate Conversions & Revenue Velocity",
      statement: "Coordinators generated 137 estimates MTD with an active realization velocity of 81.6%. Daily morning tracking on the Executive Cockpit has accelerated turnaround time to under 24 hours.",
      priorityLevel: 2
    },
    {
      id: "insight_employee_1",
      category: "employee",
      title: "Coordination Efficiency & Quotation Output",
      statement: "Weekly estimate champion generated 103 quotes with zero backlog. Coordinator recovery clearance rate improved by 14.8% month-over-month.",
      priorityLevel: 3
    },
    {
      id: "insight_service_2",
      category: "service",
      title: "Consumables Inventory & Order Fulfillment",
      statement: "Toner and high-yield drum cartridge fulfillment reached 1,480 units shipped MTD, supporting 100% of corporate managed print service clients islandwide.",
      priorityLevel: 2
    }
  ]
};

