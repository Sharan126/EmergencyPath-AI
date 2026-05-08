import React from 'react';
import { BellRing } from 'lucide-react';

const NotificationSettings = () => {
  return (
    <div className="settings-panel animate-fade-in">
      <div className="settings-panel-header">
        <h2 className="settings-panel-title flex items-center gap-2">
          <BellRing size={20} className="text-amber-500" /> Notifications & Alerts
        </h2>
        <p className="settings-panel-desc">Manage how and when you receive system alerts, critical emergency updates, and AI predictions.</p>
      </div>

      <div className="settings-section border-b border-gray-200">
        <h4 className="settings-section-title">Delivery Channels</h4>
        
        <div className="toggle-row">
          <div className="toggle-label">
            <span className="toggle-title">Push Notifications</span>
            <span className="toggle-desc">Receive instant alerts directly in the browser and mobile app.</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" className="toggle-input" defaultChecked />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="toggle-row">
          <div className="toggle-label">
            <span className="toggle-title">SMS Alerts</span>
            <span className="toggle-desc">Receive critical Code Red emergency alerts via SMS.</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" className="toggle-input" defaultChecked />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="toggle-row">
          <div className="toggle-label">
            <span className="toggle-title">Email Digest</span>
            <span className="toggle-desc">Receive a daily summary of system performance and resolved alerts.</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" className="toggle-input" />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section pt-6 border-b border-gray-200">
        <h4 className="settings-section-title">Emergency Alert Preferences</h4>
        
        <div className="toggle-row">
          <div className="toggle-label">
            <span className="toggle-title">Critical Patient Alerts (Code Red)</span>
            <span className="toggle-desc">Always ring loudly even if system is muted.</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" className="toggle-input" defaultChecked />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="toggle-row">
          <div className="toggle-label">
            <span className="toggle-title">Hospital Overload Warnings</span>
            <span className="toggle-desc">Notify when destination hospital ICU occupancy exceeds 90%.</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" className="toggle-input" defaultChecked />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="toggle-row">
          <div className="toggle-label">
            <span className="toggle-title">Severe Weather & Flooding</span>
            <span className="toggle-desc">Notify when active routes are compromised by weather.</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" className="toggle-input" defaultChecked />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section pt-6">
        <h4 className="settings-section-title">Audio & Haptics</h4>
        
        <div className="toggle-row">
          <div className="toggle-label">
            <span className="toggle-title">System Sounds</span>
            <span className="toggle-desc">Play notification chimes for medium and low priority alerts.</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" className="toggle-input" defaultChecked />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="toggle-row">
          <div className="toggle-label">
            <span className="toggle-title">Emergency Siren Mode</span>
            <span className="toggle-desc">Play continuous loud siren for unacknowledged Critical alerts.</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" className="toggle-input" defaultChecked />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
