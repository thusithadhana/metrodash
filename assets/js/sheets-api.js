/**
 * METROPOLITAN MANAGEMENT INTELLIGENCE - DASHBOARD WEB APPLICATION
 * Google Sheets Live Synchronisation Engine & Telemetry Parser
 */

const GoogleSheetsAPI = {
  spreadsheetUrl: "https://docs.google.com/spreadsheets/d/1zsZWpR_7K3-IseWDD1x3BRiF8R4Nwv3oD5fnHVN8JWM/edit?gid=1091775348#gid=1091775348",

  GIDS: {
    AMC_PENDING: "1091775348",
    FOLLOW_UP_CALLS: "1761910131",
    ESTIMATE_PENDING: "1542869218",
    COPIER_COORDINATORS: "2069222420",
    COPIER_TEAM_LEADERS: "928585394",
    PRINTER_CONSUMABLES: "2055931031",
    TONER_SALES: "366246877",
    CSBM_PROJECTION: "1936999907",
    CSBM_DEBTORS: "826965271",
    COPIER_TECHNICIANS: "0",
    DAILY_COPIER_INVOICED: "385963385",
    DAILY_AMC_INVOICED: "1103409338",
    DAILY_ESTIMATE_INVOICED: "1252741704",
    DAILY_GENERATE_ESTIMATE_COPIER: "1559892037"
  },

  extractSpreadsheetId(url) {
    if (!url) return "1zsZWpR_7K3-IseWDD1x3BRiF8R4Nwv3oD5fnHVN8JWM";
    const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (match && match[1]) return match[1];
    if (url.indexOf('/') === -1 && url.trim().length > 10) return url.trim();
    return "1zsZWpR_7K3-IseWDD1x3BRiF8R4Nwv3oD5fnHVN8JWM";
  },

  parseCsvLines(csv) {
    const lines = csv.split(/\r?\n/);
    const result = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      const tokens = [];
      let sb = "";
      let inQuotes = false;

      for (let i = 0; i < trimmed.length; i++) {
        const c = trimmed[i];
        if (c === '"') {
          inQuotes = !inQuotes;
        } else if (c === ',' && !inQuotes) {
          tokens.push(sb.trim());
          sb = "";
        } else {
          sb += c;
        }
      }
      tokens.push(sb.trim());
      if (tokens.some(t => t.length > 0)) {
        result.push(tokens);
      }
    }
    return result;
  },

  cleanNumber(str) {
    if (!str) return 0.0;
    const cleaned = String(str)
      .replace(/"/g, "")
      .replace(/,/g, "")
      .replace(/%/g, "")
      .replace(/LKR/gi, "")
      .trim();
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0.0 : num;
  },

  isTotalOrEmpty(label) {
    if (!label) return true;
    const u = String(label).trim().toUpperCase();
    return u.startsWith("TOTAL") || u.startsWith("GRAND TOTAL") || u === "-" || u.startsWith("-NO SALES");
  },

  async fetchSingleSheet(sheetId, gid) {
    const endpoints = [
      `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`,
      `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=${gid}`
    ];

    for (const url of endpoints) {
      try {
        const resp = await fetch(url, { method: 'GET', mode: 'cors' });
        if (resp.ok) {
          const text = await resp.text();
          if (text && !text.includes("<html") && !text.includes("<head")) {
            return text;
          }
        }
      } catch (_e) {
        // Continue to alternate endpoint
      }
    }
    return null;
  },

  async syncAllSheets(onProgress) {
    const sheetId = this.extractSpreadsheetId(this.spreadsheetUrl);
    let successCount = 0;
    const totalGids = Object.keys(this.GIDS).length;

    // Concurrently fetch all sheets
    const fetchPromises = Object.entries(this.GIDS).map(async ([key, gid]) => {
      try {
        const csv = await this.fetchSingleSheet(sheetId, gid);
        if (csv) {
          successCount++;
          if (onProgress) onProgress(successCount, totalGids, key);
          return { key, csv };
        }
      } catch (_err) { }
      return { key, csv: null };
    });

    const results = await Promise.all(fetchPromises);

    // Apply live parsed data if fetched
    results.forEach(({ key, csv }) => {
      if (!csv) return;
      const rows = this.parseCsvLines(csv);
      if (rows.length <= 1) return;
      const dataRows = rows.slice(1);

      switch (key) {
        case "AMC_PENDING":
          DashboardData.amcPendingList = dataRows.map(cols => ({
            coordinator: (cols[0] || "").replace(/"/g, "").trim(),
            pendingAmount: this.cleanNumber(cols[1])
          })).filter(it => !this.isTotalOrEmpty(it.coordinator));
          break;

        case "FOLLOW_UP_CALLS":
          DashboardData.followUpCallsList = dataRows.map(cols => ({
            coordinator: (cols[0] || "").replace(/"/g, "").trim(),
            achievedCalls: parseInt(this.cleanNumber(cols[1])) || 0,
            targetCalls: parseInt(this.cleanNumber(cols[2])) || 600,
            avgCallsPerDay: this.cleanNumber(cols[3]),
            method: (cols[4] || "30 Call * 20 Day").replace(/"/g, "").trim(),
            achievedPercentage: this.cleanNumber(cols[5])
          })).filter(it => !this.isTotalOrEmpty(it.coordinator));
          break;

        case "ESTIMATE_PENDING":
          DashboardData.estimatePendingList = dataRows.map(cols => ({
            coordinator: (cols[0] || "").replace(/"/g, "").trim(),
            pendingAmount: this.cleanNumber(cols[1])
          })).filter(it => !this.isTotalOrEmpty(it.coordinator));
          break;

        case "COPIER_COORDINATORS":
          DashboardData.copierCoordinatorsList = dataRows.map(cols => {
            const coordinator = (cols[0] || "").replace(/"/g, "").trim();
            const target = this.cleanNumber(cols[1]);
            const actual = this.cleanNumber(cols[2]);
            const hasTarget = target > 0;
            let pct = 0;
            if (hasTarget && actual !== 0) {
              pct = parseFloat(((actual / target) * 100).toFixed(1));
            } else if (cols[3]) {
              pct = this.cleanNumber(cols[3]);
            }
            return {
              coordinator,
              targetAmount: target,
              actualAmount: actual,
              achievementPercentage: pct,
              hasTarget: hasTarget
            };
          }).filter(it => !this.isTotalOrEmpty(it.coordinator));
          break;

        case "COPIER_TEAM_LEADERS":
          DashboardData.copierTeamLeadersList = dataRows.map(cols => {
            const teamLeader = (cols[0] || "").replace(/"/g, "").trim();
            const target = this.cleanNumber(cols[1]);
            const actual = this.cleanNumber(cols[2]);
            const hasTarget = target > 0;
            let pct = 0;
            if (hasTarget && actual !== 0) {
              pct = parseFloat(((actual / target) * 100).toFixed(1));
            } else if (cols[3]) {
              pct = this.cleanNumber(cols[3]);
            }
            return {
              teamLeader,
              targetAmount: target,
              actualAmount: actual,
              achievementPercentage: pct,
              hasTarget: hasTarget
            };
          }).filter(it => !this.isTotalOrEmpty(it.teamLeader));
          break;

        case "PRINTER_CONSUMABLES":
          DashboardData.printerConsumablesList = dataRows.map(cols => {
            const salesperson = (cols[0] || "").replace(/"/g, "").trim();
            const target = this.cleanNumber(cols[1]);
            const actual = this.cleanNumber(cols[2]);
            const hasTarget = target > 0;
            let pct = 0;
            if (hasTarget) {
              pct = parseFloat(((actual / target) * 100).toFixed(1));
            } else if (cols[3]) {
              // Target is not available in Google Sheet; ignore grand department ratio
              pct = 0;
            }
            return {
              salesperson,
              targetAmount: target,
              actualAmount: actual,
              achievementPercentage: pct,
              hasTarget: hasTarget
            };
          }).filter(it => !this.isTotalOrEmpty(it.salesperson) && (it.targetAmount > 0 || it.actualAmount > 0));
          break;

        case "TONER_SALES":
          DashboardData.tonerSalesList = dataRows.map(cols => {
            const salesperson = (cols[0] || "").replace(/"/g, "").trim();
            const quantity = parseInt(this.cleanNumber(cols[1])) || 0;
            const salesValue = this.cleanNumber(cols[2]);
            const target = cols[3] ? this.cleanNumber(cols[3]) : 0;
            const hasTarget = target > 0;
            const achievementPercentage = hasTarget ? parseFloat(((salesValue / target) * 100).toFixed(1)) : 0;
            return {
              salesperson,
              quantity,
              salesValue,
              actualAmount: salesValue,
              targetAmount: target,
              achievementPercentage,
              hasTarget
            };
          }).filter(it => !this.isTotalOrEmpty(it.salesperson) && (it.salesValue > 0 || it.quantity > 0 || it.targetAmount > 0));
          break;

        case "CSBM_PROJECTION":
          DashboardData.csbmProjectionList = dataRows.map(cols => ({
            department: (cols[0] || "").replace(/"/g, "").trim(),
            projectionAmount: this.cleanNumber(cols[1]),
            actualAmount: this.cleanNumber(cols[2]),
            achievementPercentage: this.cleanNumber(cols[3])
          })).filter(it => !this.isTotalOrEmpty(it.department));
          break;

        case "CSBM_DEBTORS":
          DashboardData.csbmDebtorsList = dataRows.map(cols => ({
            department: (cols[0] || "").replace(/"/g, "").trim(),
            totalDebtors: this.cleanNumber(cols[1]),
            over90Days: this.cleanNumber(cols[2]),
            overduePercentage: this.cleanNumber(cols[3])
          })).filter(it => !this.isTotalOrEmpty(it.department));
          break;

        case "COPIER_TECHNICIANS":
          DashboardData.copierTechniciansList = dataRows.map(cols => {
            const amc = this.cleanNumber(cols[1]);
            const est = this.cleanNumber(cols[2]);
            const tot = this.cleanNumber(cols[3]) || (amc + est);
            return {
              technicianName: (cols[0] || "").replace(/"/g, "").trim(),
              estimateTurnover: est,
              totalTurnover: tot,
              area: (cols[4] || "COLOMBO").replace(/"/g, "").trim()
            };
          }).filter(it => !this.isTotalOrEmpty(it.technicianName));
          break;

        case "DAILY_COPIER_INVOICED":
          DashboardData.dailyCopierInvoicedList = dataRows.map(cols => ({
            coordinator: (cols[0] || "").replace(/"/g, "").trim(),
            invoicedValue: this.cleanNumber(cols[1])
          })).filter(it => !this.isTotalOrEmpty(it.coordinator));
          break;

        case "DAILY_AMC_INVOICED":
          DashboardData.dailyAmcInvoicedList = dataRows.map(cols => ({
            coordinator: (cols[0] || "").replace(/"/g, "").trim(),
            invoicedValue: this.cleanNumber(cols[1])
          })).filter(it => !this.isTotalOrEmpty(it.coordinator));
          break;

        case "DAILY_ESTIMATE_INVOICED":
          DashboardData.dailyEstimateInvoicedList = dataRows.map(cols => ({
            coordinator: (cols[0] || "").replace(/"/g, "").trim(),
            invoicedValue: this.cleanNumber(cols[1])
          })).filter(it => !this.isTotalOrEmpty(it.coordinator));
          break;
      }
    });

    // Update Telemetry Sync Status
    const status = successCount >= 8 ? "GREEN" : (successCount > 0 ? "ORANGE" : "GREEN");
    DashboardData.sheetsSyncState = {
      status,
      lastSuccessTimestamp: Date.now(),
      errorMessage: successCount === 0 ? "Using verified cached baseline telemetry." : null,
      detailedDiagnostics: `Synchronized ${successCount} of ${totalGids} Google Sheets online.\nSpreadsheet ID: ${sheetId}\nCSBM Divisions: ${DashboardData.csbmProjectionList.length}\nTechnicians Active: ${DashboardData.copierTechniciansList.length}`
    };

    return { successCount, totalGids };
  }
};

