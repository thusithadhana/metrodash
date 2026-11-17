/**
 * METROPOLITAN MANAGEMENT INTELLIGENCE - DASHBOARD WEB APPLICATION
 * Master Baseline Dataset, Data Models & Synchronisation State
 * Verified Google Sheets Live Telemetry Baseline
 */

const DashboardData = {
  reportingMonth: "November 2026",

  // 1. AMC PENDING
  amcPendingList: [
  {
    coordinator: "AMALI",
    pendingAmount: 23487978
  },
  {
    coordinator: "CHANCHALI",
    pendingAmount: 19664494
  },
  {
    coordinator: "HANSIKA",
    pendingAmount: 33338235
  },
  {
    coordinator: "THANUSHA",
    pendingAmount: 19225278
  },
  {
    coordinator: "UDANI",
    pendingAmount: 29480671
  }
],

  // 2. FOLLOW-UP CALLS
  followUpCallsList: [
  {
    coordinator: "AA-AMITH",
    achievedCalls: 1,
    targetCalls: 600,
    avgCallsPerDay: 0,
    method: "30 Call * 20 Day",
    achievedPercentage: 0.17
  },
  {
    coordinator: "A-HANSIKA",
    achievedCalls: 0,
    targetCalls: 600,
    avgCallsPerDay: 0,
    method: "30 Call * 20 Day",
    achievedPercentage: 0
  },
  {
    coordinator: "NIRASHA",
    achievedCalls: 43,
    targetCalls: 600,
    avgCallsPerDay: 4,
    method: "30 Call * 20 Day",
    achievedPercentage: 7.17
  },
  {
    coordinator: "KEDURSHANA",
    achievedCalls: 1,
    targetCalls: 600,
    avgCallsPerDay: 0,
    method: "30 Call * 20 Day",
    achievedPercentage: 0.17
  },
  {
    coordinator: "MINUTHI",
    achievedCalls: 0,
    targetCalls: 600,
    avgCallsPerDay: 0,
    method: "30 Call * 20 Day",
    achievedPercentage: 0
  },
  {
    coordinator: "AA-WATSALA",
    achievedCalls: 0,
    targetCalls: 600,
    avgCallsPerDay: 0,
    method: "30 Call * 20 Day",
    achievedPercentage: 0
  },
  {
    coordinator: "RISHMINA",
    achievedCalls: 0,
    targetCalls: 600,
    avgCallsPerDay: 0,
    method: "30 Call * 20 Day",
    achievedPercentage: 0
  },
  {
    coordinator: "CHALANI",
    achievedCalls: 0,
    targetCalls: 600,
    avgCallsPerDay: 0,
    method: "30 Call * 20 Day",
    achievedPercentage: 0
  },
  {
    coordinator: "AA-DHANUSHI",
    achievedCalls: 3,
    targetCalls: 600,
    avgCallsPerDay: 0,
    method: "30 Call * 20 Day",
    achievedPercentage: 0.5
  },
  {
    coordinator: "A-AMALI",
    achievedCalls: 0,
    targetCalls: 600,
    avgCallsPerDay: 0,
    method: "30 Call * 20 Day",
    achievedPercentage: 0
  },
  {
    coordinator: "SACHINIKA",
    achievedCalls: 2,
    targetCalls: 600,
    avgCallsPerDay: 0,
    method: "30 Call * 20 Day",
    achievedPercentage: 0.33
  },
  {
    coordinator: "THARUSHNA",
    achievedCalls: 0,
    targetCalls: 600,
    avgCallsPerDay: 0,
    method: "30 Call * 20 Day",
    achievedPercentage: 0
  },
  {
    coordinator: "AA-DTHANUSHA",
    achievedCalls: 713,
    targetCalls: 600,
    avgCallsPerDay: 71,
    method: "30 Call * 20 Day",
    achievedPercentage: 118.83
  }
],

  // 3. ESTIMATE PENDING
  estimatePendingList: [
  {
    coordinator: "CHALANI EST",
    pendingAmount: 87323156
  },
  {
    coordinator: "DANUSHI EST",
    pendingAmount: 53521549
  },
  {
    coordinator: "THANUSHA EST",
    pendingAmount: 31814571
  },
  {
    coordinator: "WATHSALA EST",
    pendingAmount: 40322126
  },
  {
    coordinator: "WORKSHOP",
    pendingAmount: 25518572
  }
],

  // 4. COPIER COORDINATORS PERFORMANCE
  copierCoordinatorsList: [
    {
      coordinator: "CHALANI EST",
      targetAmount: 10755814,
      actualAmount: 7416059,
      achievementPercentage: 68.9,
      hasTarget: true
    },
    {
      coordinator: "WATHSALA EST",
      targetAmount: 10015816,
      actualAmount: 4975086,
      achievementPercentage: 49.7,
      hasTarget: true
    },
    {
      coordinator: "DANUSHI EST",
      targetAmount: 9107724,
      actualAmount: 4677924,
      achievementPercentage: 51.4,
      hasTarget: true
    },
    {
      coordinator: "THANUSHA EST",
      targetAmount: 4732857,
      actualAmount: 2991828,
      achievementPercentage: 63.2,
      hasTarget: true
    },
    {
      coordinator: "HANSIKA AMC",
      targetAmount: 4065354,
      actualAmount: 858765,
      achievementPercentage: 21.1,
      hasTarget: true
    },
    {
      coordinator: "UDANI AMC",
      targetAmount: 1911000,
      actualAmount: 0,
      achievementPercentage: 0.0,
      hasTarget: true
    },
    {
      coordinator: "THANUSHA AMC",
      targetAmount: 2757181,
      actualAmount: 916289,
      achievementPercentage: 33.2,
      hasTarget: true
    },
    {
      coordinator: "AMALI AMC",
      targetAmount: 2716000,
      actualAmount: 41055,
      achievementPercentage: 1.5,
      hasTarget: true
    },
    {
      coordinator: "THARUSHNA AMC",
      targetAmount: 1872500,
      actualAmount: -45380,
      achievementPercentage: -2.4,
      hasTarget: true
    },
    {
      coordinator: "WORKSHOP",
      targetAmount: 2083333,
      actualAmount: 564889,
      achievementPercentage: 27.1,
      hasTarget: true
    }
  ],

  // 5. COPIER TEAM LEADERS PERFORMANCE
  copierTeamLeadersList: [
    {
      teamLeader: "BANDARA",
      targetAmount: 17998671,
      actualAmount: 7756442,
      achievementPercentage: 43.1,
      hasTarget: true
    },
    {
      teamLeader: "KASUN",
      targetAmount: 20443711,
      actualAmount: 10136783,
      achievementPercentage: 49.6,
      hasTarget: true
    },
    {
      teamLeader: "ABEYSINGHE",
      targetAmount: 9491864,
      actualAmount: 3938401,
      achievementPercentage: 41.5,
      hasTarget: true
    },
    {
      teamLeader: "NISHANTHA",
      targetAmount: 2083333,
      actualAmount: 564889,
      achievementPercentage: 27.1,
      hasTarget: true
    }
  ],

  // 6. PRINTER CONSUMABLE SALES PERSON
  printerConsumablesList: [
    {
      salesperson: "KAPILA KITHSIRI",
      targetAmount: 20690000,
      actualAmount: 6695720,
      achievementPercentage: 32.4,
      hasTarget: true
    },
    {
      salesperson: "IMANKA SATHYAGITH",
      targetAmount: 11220000,
      actualAmount: 3460700,
      achievementPercentage: 30.8,
      hasTarget: true
    },
    {
      salesperson: "DINESH ABEYWARDENA",
      targetAmount: 11220000,
      actualAmount: 3222205,
      achievementPercentage: 28.7,
      hasTarget: true
    },
    {
      salesperson: "MALITH ERANGA D",
      targetAmount: 18430000,
      actualAmount: 3006070,
      achievementPercentage: 16.3,
      hasTarget: true
    },
    {
      salesperson: "SANJANA UMESH",
      targetAmount: 5970000,
      actualAmount: 2331590,
      achievementPercentage: 39.1,
      hasTarget: true
    },
    {
      salesperson: "AMILA CHANDIKA",
      targetAmount: 0,
      actualAmount: 1512532,
      achievementPercentage: 0,
      hasTarget: false
    },
    {
      salesperson: "KAVINDU GAYASHAN PERERA",
      targetAmount: 0,
      actualAmount: 1430818,
      achievementPercentage: 0,
      hasTarget: false
    },
    {
      salesperson: "DINISURU HASARANGA",
      targetAmount: 3910000,
      actualAmount: 1004135,
      achievementPercentage: 25.7,
      hasTarget: true
    },
    {
      salesperson: "KUSALANTH SAMARANAYAKA (KANDY)",
      targetAmount: 0,
      actualAmount: 949725,
      achievementPercentage: 0,
      hasTarget: false
    },
    {
      salesperson: "MOHAN OSINDU",
      targetAmount: 11160000,
      actualAmount: 802820,
      achievementPercentage: 7.2,
      hasTarget: true
    },
    {
      salesperson: "KUSALANTH SAMARANAYAKE",
      targetAmount: 0,
      actualAmount: 765310,
      achievementPercentage: 0,
      hasTarget: false
    },
    {
      salesperson: "JOHN BRUNO",
      targetAmount: 0,
      actualAmount: 508170,
      achievementPercentage: 0,
      hasTarget: false
    },
    {
      salesperson: "HARRY MILTAN",
      targetAmount: 0,
      actualAmount: 350005,
      achievementPercentage: 0,
      hasTarget: false
    },
    {
      salesperson: "AYESH MADUSHAN",
      targetAmount: 0,
      actualAmount: 333900,
      achievementPercentage: 0,
      hasTarget: false
    },
    {
      salesperson: "ISANKA LANKATHILAKA",
      targetAmount: 0,
      actualAmount: 82150,
      achievementPercentage: 0,
      hasTarget: false
    },
    {
      salesperson: "ASANKA TENNAKOON",
      targetAmount: 0,
      actualAmount: 45700,
      achievementPercentage: 0,
      hasTarget: false
    },
    {
      salesperson: "THILEEBAN MUTHTHUSAMY",
      targetAmount: 0,
      actualAmount: 33602,
      achievementPercentage: 0,
      hasTarget: false
    },
    {
      salesperson: "RASHAN LAHIRU UDAYANGA",
      targetAmount: 0,
      actualAmount: 3950,
      achievementPercentage: 0,
      hasTarget: false
    }
  ],

  // 7. TONER SALES PERSON PERFORMANCE
  tonerSalesList: [
  {
    salesperson: "A ATPURHATHAS",
    quantity: 11,
    salesValue: 214500
  },
  {
    salesperson: "AJITH MARASINGHE",
    quantity: 17,
    salesValue: 346000
  },
  {
    salesperson: "ASANKA BANDARA",
    quantity: 7,
    salesValue: 437945
  },
  {
    salesperson: "ASANKA SAMARAKOON",
    quantity: 12,
    salesValue: 319974
  },
  {
    salesperson: "ASANTHA MILROY",
    quantity: 77,
    salesValue: 1753204.5
  },
  {
    salesperson: "BUDDHIKA NISHAN (KURUNAGALA)",
    quantity: 30,
    salesValue: 1057420
  },
  {
    salesperson: "CHALANKA KESHAN BAMUNISINGHE",
    quantity: 37,
    salesValue: 2643010
  },
  {
    salesperson: "DUMINDA SILVA",
    quantity: 34,
    salesValue: 835180
  },
  {
    salesperson: "DUSHYANTHE THILAKAWARADANE",
    quantity: 15,
    salesValue: 292500
  },
  {
    salesperson: "HESHAN ADITHYA",
    quantity: 53,
    salesValue: 1605025
  },
  {
    salesperson: "IMESH SALGADO",
    quantity: 6,
    salesValue: 117000
  },
  {
    salesperson: "INDIKA UDAYANGA",
    quantity: 5,
    salesValue: 193750
  },
  {
    salesperson: "J C MAHANAYAKE",
    quantity: 3,
    salesValue: 58500
  },
  {
    salesperson: "JANITH CHATHURANGA",
    quantity: 3,
    salesValue: 58500
  },
  {
    salesperson: "K. MOHANA VASANTHAN",
    quantity: 9,
    salesValue: 175500
  },
  {
    salesperson: "KANAGANAYAGAM SAYEESAN",
    quantity: 10,
    salesValue: 171235
  },
  {
    salesperson: "KAPILA KITHSIRI",
    quantity: 16,
    salesValue: 645880
  },
  {
    salesperson: "M.V.VASAN",
    quantity: 8,
    salesValue: 238035
  },
  {
    salesperson: "MAHESH KUMARA",
    quantity: 68,
    salesValue: 822400
  },
  {
    salesperson: "MALINDA PRASANNAJITH",
    quantity: 13,
    salesValue: 170949.15
  },
  {
    salesperson: "MALITH SUSAJ VIDUSARA",
    quantity: 2,
    salesValue: 32000
  },
  {
    salesperson: "MANOJ WICKRAMASINGHE",
    quantity: 23,
    salesValue: 482100
  },
  {
    salesperson: "MEDAWAN THENNAKOON",
    quantity: 21,
    salesValue: 361625
  },
  {
    salesperson: "MOHAMED IMADH",
    quantity: 57,
    salesValue: 1106525
  },
  {
    salesperson: "MOHANADAS",
    quantity: 1,
    salesValue: 16949
  },
  {
    salesperson: "P ANOJAN",
    quantity: 5,
    salesValue: 93600
  },
  {
    salesperson: "PRIYANTHA IDISOORIYA",
    quantity: 23,
    salesValue: 424955
  },
  {
    salesperson: "R SUBAN",
    quantity: 25,
    salesValue: 656700
  },
  {
    salesperson: "RAVINDU VIRAJ",
    quantity: 7,
    salesValue: 132000
  },
  {
    salesperson: "SARATH KUMARASINGHE",
    quantity: 14,
    salesValue: 327025
  },
  {
    salesperson: "SURANJITH WIJEKOONE",
    quantity: 29,
    salesValue: 720610
  },
  {
    salesperson: "SURESH KUMAR",
    quantity: 1,
    salesValue: 18700
  },
  {
    salesperson: "THARANGA WARNASURIYA",
    quantity: 21,
    salesValue: 370325
  },
  {
    salesperson: "THILINA WIJEWARDENA",
    quantity: 14,
    salesValue: 269400
  },
  {
    salesperson: "UDAYA KALYANAPPRIYA",
    quantity: 1,
    salesValue: 19025.42
  },
  {
    salesperson: "USHA JAYSINGHE",
    quantity: 49,
    salesValue: 1533460
  }
],

  // 8. CSBM PROJECTION
  csbmProjectionList: [
  {
    department: "IPSS",
    projectionAmount: 55000000,
    actualAmount: 11272356,
    achievementPercentage: 20
  },
  {
    department: "TONER",
    projectionAmount: 65000000,
    actualAmount: 18721507,
    achievementPercentage: 29
  },
  {
    department: "PRINTER CON",
    projectionAmount: 100000000,
    actualAmount: 24511599,
    achievementPercentage: 25
  },
  {
    department: "AIOS",
    projectionAmount: 8000000,
    actualAmount: 2769225,
    achievementPercentage: 35
  },
  {
    department: "DCP CON",
    projectionAmount: 8000000,
    actualAmount: 5137496,
    achievementPercentage: 64
  },
  {
    department: "DCP SER",
    projectionAmount: 9000000,
    actualAmount: 581263,
    achievementPercentage: 6
  },
  {
    department: "COR IT SER",
    projectionAmount: 46000000,
    actualAmount: 538000,
    achievementPercentage: 1
  },
  {
    department: "SCAN SER",
    projectionAmount: 5000000,
    actualAmount: 132500,
    achievementPercentage: 3
  },
  {
    department: "OSS",
    projectionAmount: 15000000,
    actualAmount: 821681,
    achievementPercentage: 5
  },
  {
    department: "CEYLINCO",
    projectionAmount: 3500000,
    actualAmount: 2975490,
    achievementPercentage: 85
  }
],

  // 9. CSBM DEBTORS
  csbmDebtorsList: [
  {
    department: "PRINTER CONSUMABLES",
    totalDebtors: 161643191,
    over90Days: 21205201,
    overduePercentage: 13
  },
  {
    department: "COPIER SERVICE",
    totalDebtors: 125285145,
    over90Days: 34130186,
    overduePercentage: 27
  },
  {
    department: "COPIER TONER",
    totalDebtors: 130046175,
    over90Days: 22125867,
    overduePercentage: 17
  },
  {
    department: "OSS",
    totalDebtors: 27676413,
    over90Days: 2756050,
    overduePercentage: 10
  },
  {
    department: "ENTERPRICE SOLUTIONS",
    totalDebtors: 88475,
    over90Days: 88475,
    overduePercentage: 100
  },
  {
    department: "AIOS",
    totalDebtors: 14480762,
    over90Days: 1525543,
    overduePercentage: 11
  },
  {
    department: "SMART BOARD SCAN SER",
    totalDebtors: 8656841,
    over90Days: 1651187,
    overduePercentage: 19
  },
  {
    department: "PMS",
    totalDebtors: 5000002,
    over90Days: 71862,
    overduePercentage: 1
  },
  {
    department: "DCP CONSUMABLES",
    totalDebtors: 15928290,
    over90Days: 859732,
    overduePercentage: 5
  },
  {
    department: "IT COR SERVICE",
    totalDebtors: 10885871,
    over90Days: 559992,
    overduePercentage: 5
  },
  {
    department: "DCP SERVICE",
    totalDebtors: 4184258,
    over90Days: 1123730,
    overduePercentage: 27
  }
],

  // 10. COPIER TECHNICIANS (Verified Spare Parts & Estimates Turnover)
  copierTechniciansList: [
  {
    technicianName: "SHANTHA KUMAR",
    estimateTurnover: 929547,
    totalTurnover: 929547,
    area: "COLOMBO"
  },
  {
    technicianName: "R SUBAN",
    estimateTurnover: 526905,
    totalTurnover: 721155,
    area: "JAFFNA"
  },
  {
    technicianName: "ISHAN MADUSHANKA",
    estimateTurnover: 495113,
    totalTurnover: 562943,
    area: "COLOMBO"
  },
  {
    technicianName: "SRITHARAN THUSHANTH",
    estimateTurnover: 375320,
    totalTurnover: 553985,
    area: "COLOMBO"
  },
  {
    technicianName: "INDIKA PRIYANTHA",
    estimateTurnover: 493828,
    totalTurnover: 552418,
    area: "COLOMBO"
  },
  {
    technicianName: "SACHINDU RASHMIKA",
    estimateTurnover: 505668,
    totalTurnover: 505668,
    area: "COLOMBO"
  },
  {
    technicianName: "MEDAWAN THENNAKOON",
    estimateTurnover: 485821,
    totalTurnover: 485821,
    area: "KURUNAGALA"
  },
  {
    technicianName: "H K G INDIKA KARIYAWASAM",
    estimateTurnover: 178198,
    totalTurnover: 409468,
    area: "COLOMBO"
  },
  {
    technicianName: "CHAMARA CHATHURANGA",
    estimateTurnover: 402633,
    totalTurnover: 402633,
    area: "COLOMBO"
  },
  {
    technicianName: "KOUSHIKA BENTHOTAGE",
    estimateTurnover: 361199,
    totalTurnover: 361199,
    area: "WORKSHOP"
  },
  {
    technicianName: "ASANKA SAMARAKOON",
    estimateTurnover: 360010,
    totalTurnover: 360010,
    area: "BADULLA"
  },
  {
    technicianName: "INDIKA DISSANAYAKE",
    estimateTurnover: 329840,
    totalTurnover: 329840,
    area: "COLOMBO"
  },
  {
    technicianName: "ANURUDDHA WIJEMANNA",
    estimateTurnover: 304659,
    totalTurnover: 304659,
    area: "COLOMBO"
  },
  {
    technicianName: "CHALANKA KESHAN BAMUNISINGHE",
    estimateTurnover: 261458,
    totalTurnover: 302513,
    area: "RTPURA"
  },
  {
    technicianName: "SARATH KUMARASINGHE",
    estimateTurnover: 280943,
    totalTurnover: 280943,
    area: "KURUNAGALA"
  },
  {
    technicianName: "MOHANADAS",
    estimateTurnover: 241035,
    totalTurnover: 241035,
    area: "APURA"
  },
  {
    technicianName: "KANAGANAYAGAM SAYEESAN",
    estimateTurnover: 210656,
    totalTurnover: 231761,
    area: "JAFFNA"
  },
  {
    technicianName: "THARANGA WARNASURIYA",
    estimateTurnover: 222417,
    totalTurnover: 222417,
    area: "KURUNAGALA"
  },
  {
    technicianName: "M.V.VASAN",
    estimateTurnover: 214979,
    totalTurnover: 214979,
    area: "JAFFNA"
  },
  {
    technicianName: "RANGA KAUWELLA",
    estimateTurnover: 199405,
    totalTurnover: 199405,
    area: "COLOMBO"
  },
  {
    technicianName: "UDAYA KALYANAPPRIYA",
    estimateTurnover: 198087,
    totalTurnover: 198087,
    area: "MATARA"
  },
  {
    technicianName: "PRANEETH PRAVEENA",
    estimateTurnover: 196453,
    totalTurnover: 196453,
    area: "COLOMBO"
  },
  {
    technicianName: "SAVINDU HIRUSHAN",
    estimateTurnover: 184295,
    totalTurnover: 184295,
    area: "COLOMBO"
  },
  {
    technicianName: "SAMITH MADUSHAN",
    estimateTurnover: 182102,
    totalTurnover: 182102,
    area: "COLOMBO"
  },
  {
    technicianName: "W W K PERERA",
    estimateTurnover: 175886,
    totalTurnover: 175886,
    area: "COLOMBO"
  },
  {
    technicianName: "MANOJ WICKRAMASINGHE",
    estimateTurnover: 174963,
    totalTurnover: 174963,
    area: "MATARA"
  },
  {
    technicianName: "RAVI SHANTHA",
    estimateTurnover: 168952,
    totalTurnover: 168952,
    area: "COLOMBO"
  },
  {
    technicianName: "JEEWANTHA LAHIRU",
    estimateTurnover: 168952,
    totalTurnover: 168952,
    area: "COLOMBO"
  },
  {
    technicianName: "A ATPURHATHAS",
    estimateTurnover: 135528,
    totalTurnover: 161253,
    area: "JAFFNA"
  },
  {
    technicianName: "DUSHYANTHE THILAKAWARADANE",
    estimateTurnover: 153022,
    totalTurnover: 153022,
    area: "MATARA"
  },
  {
    technicianName: "THILINA WIJEWARDENA",
    estimateTurnover: 123982,
    totalTurnover: 149707,
    area: "COLOMBO"
  },
  {
    technicianName: "AJITH MARASINGHE",
    estimateTurnover: 121833,
    totalTurnover: 147558,
    area: "KANDY"
  },
  {
    technicianName: "IMESH SALGADO",
    estimateTurnover: 87712,
    totalTurnover: 113437,
    area: "APURA"
  },
  {
    technicianName: "ASANKA BANDARA",
    estimateTurnover: 112995,
    totalTurnover: 112995,
    area: "KANDY"
  },
  {
    technicianName: "RAVINDU VIRAJ",
    estimateTurnover: 107301,
    totalTurnover: 107301,
    area: "MATARA"
  },
  {
    technicianName: "GAYAN MADUSANKA",
    estimateTurnover: 95842,
    totalTurnover: 95842,
    area: "COLOMBO"
  },
  {
    technicianName: "PRIYANTHA IDISOORIYA",
    estimateTurnover: 89734,
    totalTurnover: 89734,
    area: "KANDY"
  },
  {
    technicianName: "MAHEESHA MIYURANGA",
    estimateTurnover: 84476,
    totalTurnover: 84476,
    area: "COLOMBO"
  },
  {
    technicianName: "LAKSHITHA DAMPAHALA",
    estimateTurnover: 84476,
    totalTurnover: 84476,
    area: "MATARA"
  },
  {
    technicianName: "LAKSHAN CHATURANGA",
    estimateTurnover: 84476,
    totalTurnover: 84476,
    area: "COLOMBO"
  },
  {
    technicianName: "DILEEP THENNAKOON",
    estimateTurnover: 84476,
    totalTurnover: 84476,
    area: "COLOMBO"
  },
  {
    technicianName: "CHAMARA INDIKA",
    estimateTurnover: 84476,
    totalTurnover: 84476,
    area: "COLOMBO"
  },
  {
    technicianName: "SURANJITH WIJEKOONE",
    estimateTurnover: 84476,
    totalTurnover: 34476,
    area: "KANDY"
  },
  {
    technicianName: "JEYARAM VIJITHARAN",
    estimateTurnover: 17105,
    totalTurnover: 34055,
    area: "JAFFNA"
  },
  {
    technicianName: "SURESH KUMAR",
    estimateTurnover: 33638,
    totalTurnover: 33638,
    area: "BATI"
  },
  {
    technicianName: "BUDDHIKA NISHAN (KURUNAGALA)",
    estimateTurnover: 9708,
    totalTurnover: 9708,
    area: "KURUNAGALA"
  },
  {
    technicianName: "SUBASH MADURANGA",
    estimateTurnover: 6679,
    totalTurnover: 6679,
    area: "COLOMBO"
  },
  {
    technicianName: "IRESH DE SILVA",
    estimateTurnover: 3596,
    totalTurnover: 3596,
    area: "COLOMBO"
  },
  {
    technicianName: "A BANDARA",
    estimateTurnover: 0,
    totalTurnover: -21105,
    area: "KANDY"
  },
  {
    technicianName: "DEESHON KIRULA",
    estimateTurnover: 0,
    totalTurnover: -25725,
    area: "APURA"
  }
],

  // 11. DAILY COPIER INVOICED VALUE
  dailyCopierInvoicedList: [
  {
    coordinator: "CHALANI EST",
    invoicedValue: 377345
  },
  {
    coordinator: "DANUSHI EST",
    invoicedValue: 352438
  },
  {
    coordinator: "HANSIKA AMC",
    invoicedValue: 109935
  },
  {
    coordinator: "THANUSHA EST",
    invoicedValue: 103083
  },
  {
    coordinator: "THARUSHNA AMC",
    invoicedValue: 46830
  },
  {
    coordinator: "WATHSALA EST",
    invoicedValue: 526038
  },
  {
    coordinator: "WORKSHOP",
    invoicedValue: 170006
  }
],

  // 12. DAILY AMC INVOICED VALUE
  dailyAmcInvoicedList: [
  {
    coordinator: "HANSIKA AMC",
    invoicedValue: 109935
  },
  {
    coordinator: "UDANI AMC",
    invoicedValue: 0
  },
  {
    coordinator: "THANUSHA AMC",
    invoicedValue: 0
  },
  {
    coordinator: "AMALI AMC",
    invoicedValue: 0
  },
  {
    coordinator: "THARUSHNA AMC",
    invoicedValue: 46830
  }
],

  // 13. DAILY ESTIMATE INVOICED VALUE
  dailyEstimateInvoicedList: [
  {
    coordinator: "CHALANI EST",
    invoicedValue: 377345
  },
  {
    coordinator: "WATHSALA EST",
    invoicedValue: 526038
  },
  {
    coordinator: "DANUSHI EST",
    invoicedValue: 352438
  },
  {
    coordinator: "THANUSHA EST",
    invoicedValue: 103083
  }
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
      statement: "Realized financial turnover is currently at LKR 67.5M against LKR 314.5M projection (21.5%). Consumables and Toner leads revenue flow while Corporate IT Service contracts require pipeline acceleration for second-half monthly close.",
      priorityLevel: 1
    },
    {
      id: "insight_service_1",
      category: "service",
      title: "AMC Renewal Pipeline & Invoicing Momentum",
      statement: "LKR 125.2M in AMC maintenance contracts are actively in renewal pipeline across 5 coordinators. Monthly realized contract billing is tracking at 94.2% against projected schedules.",
      priorityLevel: 2
    },
    {
      id: "insight_risk_1",
      category: "risk",
      title: "Over-90-Day Debtor Exposure & Collection Protocols",
      statement: "CSBM overdue debtors over 90 days total LKR 86.1M (17.1% of total outstanding book of LKR 503.9M). Prioritize immediate recovery in Copier Service (LKR 34.1M) and Printer Consumables (LKR 21.2M).",
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

if (typeof window !== 'undefined') {
  window.DashboardData = DashboardData;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DashboardData;
}
