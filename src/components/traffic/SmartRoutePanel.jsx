import React from 'react';
import { BrainCircuit, CloudRain, AlertTriangle, TrendingUp, ShieldCheck } from 'lucide-react';
import './SmartRoutePanel.css';

const SmartRoutePanel = () => {
  return (
    <div className="smart-route-panel">
      {/* Engine Header */}
      <div className="engine-header">
        <BrainCircuit size={20} className="text-blue-500" />
        <div>
          <h2>AI SMART ROUTE ENGINE</h2>
          <span className="live-status"><span className="pulse-dot"></span> Active Monitoring</span>
        </div>
      </div>

      {/* Recommended Route Card */}
      <div className="card route-recommendation active-route">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              Route B <ShieldCheck size={16} className="text-green-500" />
            </h3>
            <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded">Fastest & Safest</span>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-gray-800">11 min</div>
            <div className="text-xs text-gray-500">4.2 km</div>
          </div>
        </div>
        
        <div className="ai-reasoning-box mt-3">
          <strong>Why AI selected this route:</strong>
          <p>Heavy rain and flooding make Route A unsafe for critical patients. Route B avoids all active potholes and is coordinated with smart signals.</p>
        </div>
      </div>

      {/* Alternative Route Card */}
      <div className="card route-recommendation alternative-route">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-600">Route A</h3>
            <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-2 py-1 rounded">Moderate Risk</span>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-gray-600">9 min</div>
            <div className="text-xs text-gray-400">3.8 km</div>
          </div>
        </div>
        <div className="flex gap-2 text-xs text-gray-500 mt-2">
           <span className="flex items-center gap-1"><AlertTriangle size={12} className="text-amber-500"/> 2 Potholes</span>
           <span className="flex items-center gap-1"><CloudRain size={12} className="text-blue-400"/> Flooding Risk</span>
        </div>
      </div>

      {/* Predictive Traffic AI */}
      <div className="card predictive-ai-card mt-2">
        <h3 className="section-title flex items-center gap-2 mb-3">
          <TrendingUp size={16} className="text-purple-500" />
          PREDICTIVE TRAFFIC AI
        </h3>
        
        <div className="prediction-item">
          <div className="prediction-header">
            <span>Congestion Probability</span>
            <span className="text-amber-500 font-bold">High (85%)</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill bg-amber-500" style={{ width: '85%' }}></div>
          </div>
          <p className="prediction-text">Traffic expected to increase by 35% in next 10 minutes on primary roads.</p>
        </div>

        <div className="prediction-item mt-3">
          <div className="prediction-header">
            <span>Weather Impact</span>
            <span className="text-blue-500 font-bold">Severe</span>
          </div>
          <p className="prediction-text">Continuous rainfall detected. AI is automatically routing away from underpasses.</p>
        </div>
      </div>
    </div>
  );
};

export default SmartRoutePanel;
