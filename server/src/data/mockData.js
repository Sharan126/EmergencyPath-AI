export const dashboardStatus = {
  traffic: "Moderate",
  weather: "Rain",
  roadCondition: "Fair",
  signalPreemption: "Active",
  civilianAlerts: "Active"
};

export const baseRoutes = [
  {
    id: 'A',
    name: 'Route A',
    baseEta: 8,
    potholes: 12,
    baseSafetyScore: 45,
    colorClass: 'route-green'
  },
  {
    id: 'B',
    name: 'Route B',
    baseEta: 11,
    potholes: 2,
    baseSafetyScore: 85,
    colorClass: 'route-red'
  },
  {
    id: 'C',
    name: 'Route C',
    baseEta: 9,
    potholes: 6,
    baseSafetyScore: 62,
    colorClass: 'route-blue'
  }
];
