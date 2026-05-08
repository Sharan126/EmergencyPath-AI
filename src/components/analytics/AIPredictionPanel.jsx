import React from 'react';
import { BrainCircuit, TrendingUp, AlertOctagon, CloudRain } from 'lucide-react';
import './AIPredictionPanel.css';

const predictions = [
  {
    id: 1,
    type: 'surge',
    title: 'Emergency Surge Prediction',
    desc: 'High emergency probability detected in North Zone within next 30 minutes due to ongoing heavy rain.',
    prob: 88,
    icon: TrendingUp,
    color: 'text-amber-500',
    bg: 'bg-amber-500'
  },
  {
    id: 2,
    type: 'accident',
    title: 'Accident Risk Forecast',
    desc: 'Sector 4 highway intersection showing 65% higher collision risk due to faulty traffic signals.',
    prob: 65,
    icon: AlertOctagon,
    color: 'text-red-500',
    bg: 'bg-red-500'
  },
  {
    id: 3,
    type: 'weather',
    title: 'Weather Impact Analysis',
    desc: 'Expected localized flooding in East underpasses. Rerouting algorithms pre-emptively updated.',
    prob: 92,
    icon: CloudRain,
    color: 'text-blue-500',
    bg: 'bg-blue-500'
  }
];

const AIPredictionPanel = () => {
  return (
    <div className="card ai-prediction-card">
      <div className="ai-header mb-4">
        <h3 className="section-title flex items-center gap-2 !text-indigo-600">
          <BrainCircuit size={18} className="ai-brain-pulse" />
          AI INSIGHTS & PREDICTIONS
        </h3>
        <p className="text-xs text-gray-500 mt-1">Live predictive operational intelligence</p>
      </div>

      <div className="ai-prediction-list">
        {predictions.map(pred => {
          const Icon = pred.icon;
          return (
            <div key={pred.id} className="prediction-item">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={16} className={pred.color} />
                <span className="font-bold text-sm text-gray-800">{pred.title}</span>
              </div>
              <p className="text-xs text-gray-600 mb-3">{pred.desc}</p>
              
              <div className="prob-bar-container">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Probability</span>
                  <span className={pred.color}>{pred.prob}%</span>
                </div>
                <div className="prob-bar-bg">
                  <div className={`prob-bar-fill ${pred.bg}`} style={{ width: `${pred.prob}%` }}></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="ai-recommendation-box mt-4">
        <strong>⚡ AI System Recommendation:</strong>
        <p>Deploy 3 additional standby ambulances to North Zone immediately to mitigate forecasted surge.</p>
        <button className="btn btn-primary btn-small mt-2 w-full">Execute Deployment</button>
      </div>
    </div>
  );
};

export default AIPredictionPanel;
