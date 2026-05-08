import React, { useState } from 'react';
import './RoutePlannerPage.css';

import RouteComparisonPanel from '../components/route-planner/RouteComparisonPanel';
import NavigationMap from '../components/route-planner/NavigationMap';
import ActiveNavigationStatus from '../components/route-planner/ActiveNavigationStatus';

const RoutePlannerPage = () => {
  const [activeRoute, setActiveRoute] = useState('B'); // A, B, or C

  return (
    <div className="route-planner-container">
      <div className="route-planner-layout">
        <div className="route-planner-sidebar">
          <ActiveNavigationStatus activeRoute={activeRoute} />
          <RouteComparisonPanel activeRoute={activeRoute} setActiveRoute={setActiveRoute} />
        </div>
        
        <div className="route-planner-main">
          <NavigationMap activeRoute={activeRoute} />
        </div>
      </div>
    </div>
  );
};

export default RoutePlannerPage;
