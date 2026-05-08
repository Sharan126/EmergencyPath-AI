import React, { useState } from 'react';
import { User, BrainCircuit, Bell, Palette, Activity, Shield, Map } from 'lucide-react';
import './SettingsPage.css';

import ProfileSettings from '../components/settings/ProfileSettings';
import AIPreferences from '../components/settings/AIPreferences';
import NotificationSettings from '../components/settings/NotificationSettings';
import AppearanceSettings from '../components/settings/AppearanceSettings';
import SystemHealthPanel from '../components/settings/SystemHealthPanel';

const SETTINGS_TABS = [
  { id: 'profile', label: 'User Profile', icon: User },
  { id: 'ai', label: 'AI Preferences', icon: BrainCircuit },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'system', label: 'System Health', icon: Activity },
  { id: 'security', label: 'Security & Privacy', icon: Shield },
  { id: 'navigation', label: 'Map Settings', icon: Map },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile': return <ProfileSettings />;
      case 'ai': return <AIPreferences />;
      case 'notifications': return <NotificationSettings />;
      case 'appearance': return <AppearanceSettings />;
      case 'system': return <SystemHealthPanel />;
      default: return <div className="text-gray-500 p-8 flex justify-center items-center h-full">This module is under construction.</div>;
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-sidebar card">
        <h3 className="section-title mb-4 px-4 pt-4">SETTINGS</h3>
        <nav className="settings-nav">
          {SETTINGS_TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`settings-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      <div className="settings-content card">
        {renderContent()}
      </div>
    </div>
  );
};

export default SettingsPage;
