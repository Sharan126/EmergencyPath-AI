import React from 'react';
import { BrainCircuit, Settings2 } from 'lucide-react';

const AIPreferences = () => {
  return (
    <div className="settings-panel animate-fade-in">
      <div className="settings-panel-header">
        <h2 className="settings-panel-title flex items-center gap-2">
          <BrainCircuit size={20} className="text-indigo-600" /> AI Routing Engine Preferences
        </h2>
        <p className="settings-panel-desc">Configure how the EmergencyPath AI calculates optimal routes for active ambulances.</p>
      </div>

      <div className="settings-section border-b border-gray-200">
        <h4 className="settings-section-title">Smart Route Avoidance</h4>
        
        <div className="toggle-row">
          <div className="toggle-label">
            <span className="toggle-title">Avoid Known Potholes</span>
            <span className="toggle-desc">Automatically reroute around severely damaged roads for patient safety.</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" className="toggle-input" defaultChecked />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="toggle-row">
          <div className="toggle-label">
            <span className="toggle-title">Avoid Flooded Zones</span>
            <span className="toggle-desc">Use live weather API to dynamically avoid waterlogged underpasses.</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" className="toggle-input" defaultChecked />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="toggle-row">
          <div className="toggle-label">
            <span className="toggle-title">Aggressive Traffic Avoidance</span>
            <span className="toggle-desc">Prioritize longer physical routes if they guarantee fewer traffic stops.</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" className="toggle-input" />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section pt-6 border-b border-gray-200">
        <h4 className="settings-section-title">Optimization Sensitivity</h4>
        
        <div className="form-group mb-6">
          <div className="flex justify-between mb-2">
            <label className="form-label">Route Optimization Priority</label>
            <span className="text-xs font-bold text-indigo-600">Balanced (Fastest & Safest)</span>
          </div>
          <input type="range" min="1" max="100" defaultValue="50" className="range-slider" />
          <div className="flex justify-between text-xs text-gray-500 mt-2 font-semibold">
            <span>Pure Speed</span>
            <span>Balanced</span>
            <span>Maximum Safety (Smoothness)</span>
          </div>
        </div>

        <div className="form-group">
          <div className="flex justify-between mb-2">
            <label className="form-label">Reroute Aggressiveness</label>
            <span className="text-xs font-bold text-indigo-600">High</span>
          </div>
          <input type="range" min="1" max="100" defaultValue="80" className="range-slider" />
          <div className="flex justify-between text-xs text-gray-500 mt-2 font-semibold">
            <span>Stick to original route</span>
            <span>Change route frequently on new data</span>
          </div>
        </div>
      </div>

      <div className="settings-section pt-6">
        <h4 className="settings-section-title">Smart City V2X Integration</h4>
        <div className="toggle-row">
          <div className="toggle-label">
            <span className="toggle-title">Automated Traffic Light Control</span>
            <span className="toggle-desc">Allow AI to pre-emptively turn signals green on the emergency route.</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" className="toggle-input" defaultChecked />
            <span className="toggle-slider"></span>
          </label>
        </div>
        
        <div className="bg-indigo-50 border border-indigo-100 rounded-md p-4 mt-4 flex items-start gap-3">
          <Settings2 size={16} className="text-indigo-600 mt-1" />
          <div className="text-xs text-indigo-900 leading-relaxed">
            <strong>System Note:</strong> V2X integration requires explicit authorization from municipal traffic authorities. Active configuration assumes authorization is currently valid.
          </div>
        </div>
      </div>

    </div>
  );
};

export default AIPreferences;
