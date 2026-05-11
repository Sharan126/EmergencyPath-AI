import React, { useContext, useState, useEffect } from 'react';
import { Palette, Globe, Monitor, Moon, Sun } from 'lucide-react';
import { SettingsContext } from '../../context/SettingsContext';
import './AppearanceSettings.css';

const AppearanceSettings = () => {
  const { settings, loading, saveAppearanceSettings } = useContext(SettingsContext);
  
  const [appearance, setAppearance] = useState({
    theme: 'dark',
    language: 'en',
    accessibility: {
      highContrast: false,
      reduceMotion: false,
      uiDensity: 'comfortable'
    }
  });

  useEffect(() => {
    if (settings?.appearance) {
      setAppearance(settings.appearance);
    }
  }, [settings]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading settings...</div>;
  }

  const handleThemeChange = (theme) => {
    setAppearance(prev => ({ ...prev, theme }));
  };

  const handleLanguageChange = (e) => {
    setAppearance(prev => ({ ...prev, language: e.target.value }));
  };

  const handleAccessibilityToggle = (key) => {
    setAppearance(prev => ({
      ...prev,
      accessibility: {
        ...prev.accessibility,
        [key]: !prev.accessibility[key]
      }
    }));
  };

  const handleDensityChange = (e) => {
    setAppearance(prev => ({
      ...prev,
      accessibility: {
        ...prev.accessibility,
        uiDensity: e.target.value
      }
    }));
  };

  const handleSave = () => {
    saveAppearanceSettings(appearance);
  };

  return (
    <div className="settings-panel animate-fade-in">
      <div className="settings-panel-header">
        <h2 className="settings-panel-title flex items-center gap-2">
          <Palette size={20} className="text-purple-500" /> Appearance & Localization
        </h2>
        <p className="settings-panel-desc">Customize the platform language, interface theme, and accessibility features.</p>
      </div>

      <div className="settings-section border-b border-gray-200">
        <h4 className="settings-section-title">Language Preferences</h4>
        
        <div className="form-group mb-4">
          <label className="form-label flex items-center gap-2"><Globe size={14}/> Dashboard Language</label>
          <select className="form-input w-full max-w-md" value={appearance.language} onChange={handleLanguageChange}>
            <option value="en">English (US)</option>
            <option value="en-in">English (India)</option>
            <option value="hi">Hindi (हिंदी)</option>
            <option value="kn">Kannada (ಕನ್ನಡ)</option>
            <option value="mr">Marathi (मराठी)</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Changes will be applied upon saving.</p>
        </div>
      </div>

      <div className="settings-section pt-6 border-b border-gray-200">
        <h4 className="settings-section-title">System Theme</h4>
        
        <div className="theme-selector-grid">
          <div className={`theme-option ${appearance.theme === 'dark' ? 'active' : ''}`} onClick={() => handleThemeChange('dark')}>
            <div className="theme-preview dark-preview">
              <div className="preview-header"></div>
              <div className="preview-body"></div>
            </div>
            <span className="theme-label flex items-center justify-center gap-1"><Moon size={14}/> Dark Mode</span>
          </div>

          <div className={`theme-option ${appearance.theme === 'light' ? 'active' : ''}`} onClick={() => handleThemeChange('light')}>
            <div className="theme-preview light-preview">
              <div className="preview-header"></div>
              <div className="preview-body"></div>
            </div>
            <span className="theme-label flex items-center justify-center gap-1"><Sun size={14}/> Light Mode</span>
          </div>

          <div className={`theme-option ${appearance.theme === 'auto' ? 'active' : ''}`} onClick={() => handleThemeChange('auto')}>
            <div className="theme-preview system-preview">
              <div className="preview-header dark-half"></div>
              <div className="preview-header light-half"></div>
            </div>
            <span className="theme-label flex items-center justify-center gap-1"><Monitor size={14}/> Auto (System)</span>
          </div>
        </div>
      </div>

      <div className="settings-section pt-6">
        <h4 className="settings-section-title">Accessibility</h4>
        
        <div className="toggle-row">
          <div className="toggle-label">
            <span className="toggle-title">High Contrast Mode</span>
            <span className="toggle-desc">Increase border thickness and color saturation for better visibility.</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" className="toggle-input" checked={appearance.accessibility.highContrast} onChange={() => handleAccessibilityToggle('highContrast')} />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="toggle-row">
          <div className="toggle-label">
            <span className="toggle-title">Reduce Motion</span>
            <span className="toggle-desc">Disable radar sweeps, pulsing alerts, and smooth transitions.</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" className="toggle-input" checked={appearance.accessibility.reduceMotion} onChange={() => handleAccessibilityToggle('reduceMotion')} />
            <span className="toggle-slider"></span>
          </label>
        </div>
        
        <div className="form-group mt-4">
          <label className="form-label">UI Density</label>
          <select className="form-input w-full max-w-md" value={appearance.accessibility.uiDensity} onChange={handleDensityChange}>
            <option value="comfortable">Comfortable (Default)</option>
            <option value="compact">Compact (Show more data)</option>
          </select>
        </div>
      </div>
      
      <div className="settings-section pt-2">
         <button className="btn btn-primary" onClick={handleSave}>Save Appearance Changes</button>
      </div>

    </div>
  );
};

export default AppearanceSettings;
