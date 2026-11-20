// Mock analytics data for charts
export const wasteDistributionData = {
  labels: ['Needles / Lancets', 'Syringes', 'Gauze / Bandages', 'Glass / Sharps', 'Bottles', 'Gloves / PPE', 'IV Bags'],
  datasets: [{
    data: [32, 22, 15, 11, 9, 7, 4],
    backgroundColor: [
      '#EF4444', '#F59E0B', '#3B82F6', '#8B5CF6',
      '#10B981', '#06B6D4', '#F97316'
    ],
    borderWidth: 0,
    hoverOffset: 8,
  }]
};

export const wasteByDepartmentData = {
  labels: ['ICU', 'Emergency', 'Surgery A', 'Surgery B', 'Oncology', 'Pediatrics', 'Lab', 'Pharmacy'],
  datasets: [
    {
      label: 'Sharps',
      data: [28, 22, 18, 15, 12, 8, 6, 3],
      backgroundColor: '#EF4444',
      borderRadius: 4,
    },
    {
      label: 'Biological',
      data: [14, 18, 12, 10, 9, 12, 4, 2],
      backgroundColor: '#F59E0B',
      borderRadius: 4,
    },
    {
      label: 'Chemical',
      data: [6, 8, 5, 4, 7, 3, 8, 6],
      backgroundColor: '#3B82F6',
      borderRadius: 4,
    },
  ]
};

export const collectionTrendsData = {
  labels: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
  datasets: [
    {
      label: 'Objects Collected',
      data: [2, 5, 8, 14, 11, 9, 13, 16, 12, 10, 14, 11, 8, 6, 4],
      borderColor: '#2563EB',
      backgroundColor: 'rgba(37,99,235,0.08)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#2563EB',
      pointRadius: 4,
      pointHoverRadius: 6,
    },
    {
      label: 'Sanitization Events',
      data: [1, 2, 3, 5, 4, 3, 5, 6, 4, 3, 5, 4, 3, 2, 1],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16,185,129,0.06)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#10B981',
      pointRadius: 4,
      pointHoverRadius: 6,
    }
  ]
};

export const collectionMethodData = {
  labels: ['Robotic Arm', 'Suction System', 'Magnetic Pickup', 'Manual Override'],
  datasets: [{
    data: [54, 24, 14, 8],
    backgroundColor: ['#2563EB', '#10B981', '#F59E0B', '#8B5CF6'],
    borderWidth: 0,
    hoverOffset: 6,
  }]
};

export const sparkResults = {
  wasteBreakdown: [
    { type: 'Needles', count: 42, risk: 'high', icon: '💉' },
    { type: 'Gauze', count: 18, risk: 'medium', icon: '🩹' },
    { type: 'Glass', count: 9, risk: 'high', icon: '🔬' },
    { type: 'Bottles', count: 12, risk: 'low', icon: '🧴' },
    { type: 'Syringes', count: 27, risk: 'high', icon: '💊' },
    { type: 'IV Bags', count: 8, risk: 'medium', icon: '🩺' },
  ],
  insights: {
    mostCommonWaste: 'Needles / Lancets',
    highRiskArea: 'ICU Ward',
    peakActivityPeriod: '09:00 AM – 11:00 AM',
    collectionEfficiency: '94.2%',
    recommendedPatrolZone: 'ICU → Emergency → Surgery Suite A',
    recordsProcessed: '14,832',
    processingTime: '0.84s',
    confidenceScore: '96.7%',
  }
};

export const weeklyTrend = [48, 52, 61, 58, 67, 71, 74];
export const weeklyLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'];
