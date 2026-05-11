import { baseRoutes } from '../data/mockData.js';

export const evaluateRoutes = (severity, preferences, currentStatus) => {
  const { avoidPotholes, considerTraffic, considerWeather, smoothestRoute } = preferences || {};
  const isRain = currentStatus.weather === 'Rain';
  
  const evaluatedRoutes = baseRoutes.map(route => {
    let score = route.baseSafetyScore;
    let eta = route.baseEta;
    let reason = [];
    
    // Traffic logic
    if (considerTraffic && currentStatus.traffic === 'Moderate') {
      eta += 2;
      reason.push("Traffic adds 2 min");
    }

    // Pothole logic
    if (avoidPotholes || smoothestRoute) {
      if (route.potholes > 5) {
        score -= (route.potholes * 2);
        reason.push("High pothole count reduced score");
      }
    }
    
    // Weather + Potholes (Critical Rule)
    if (considerWeather && isRain) {
      score -= (route.potholes * 1.5);
      eta += 1;
      reason.push("Rain increases risk on potholes");
    }
    
    // Severity logic
    if (severity === 'Critical') {
      if (route.potholes === 0 || route.potholes <= 2) {
        score += 15;
        reason.push("Ideal for critical patients (smooth road)");
      } else {
        score -= 10;
        reason.push("Not ideal for critical condition");
      }
    } else if (severity === 'Minor') {
      // Prioritize ETA
      if (eta < 10) {
        score += 10;
        reason.push("Fastest route prioritized for minor severity");
      }
    }

    // Normalize score
    score = Math.max(0, Math.min(100, Math.round(score)));

    return {
      id: route.id,
      name: route.name,
      eta: `${eta} min`,
      potholes: route.potholes,
      score: score,
      colorClass: route.colorClass,
      reason: reason.join(". ") + "."
    };
  });

  // Sort by score descending
  evaluatedRoutes.sort((a, b) => b.score - a.score);
  
  const allRoutes = evaluatedRoutes.map((route, index) => ({
    ...route,
    recommended: index === 0
  }));

  const recommendedRoute = allRoutes[0];

  return { recommendedRoute, allRoutes };
};
