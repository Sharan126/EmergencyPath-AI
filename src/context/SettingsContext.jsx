import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getSettingsAPI, updateAppearanceAPI } from '../services/settingsService';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch initial settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSettingsAPI();
        setSettings(data);
        applyAppearanceSettings(data.appearance);
      } catch (error) {
        console.error("Failed to load settings:", error);
        toast.error("Failed to load settings from server");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const applyAppearanceSettings = (appearance) => {
    if (!appearance) return;

    // Apply Theme
    const root = document.documentElement;
    root.classList.remove('dark', 'light');

    if (appearance.theme === 'dark') {
      root.classList.add('dark');
    } else if (appearance.theme === 'light') {
      root.classList.add('light');
    } else if (appearance.theme === 'auto') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemPrefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.add('light');
      }
    }

    // Apply Accessibility (assuming global CSS classes handle these)
    if (appearance.accessibility?.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (appearance.accessibility?.reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
  };

  const saveAppearanceSettings = async (newAppearance) => {
    try {
      const updatedAppearance = await updateAppearanceAPI(newAppearance);
      setSettings(prev => ({ ...prev, appearance: updatedAppearance }));
      applyAppearanceSettings(updatedAppearance);
      toast.success("Appearance settings saved successfully");
    } catch (error) {
      console.error("Failed to save appearance settings:", error);
      toast.error("Failed to save appearance settings");
    }
  };

  return (
    <SettingsContext.Provider value={{
      settings,
      loading,
      saveAppearanceSettings
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
