"use client"

import React from 'react';
import { useTheme } from '@/context/ThemeProvider';

const LightDarkSwitch: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      className="rounded-full p-1 text-xs font-medium uppercase leading-normal shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)] transition duration-150 ease-in-out hover:bg-primary-700 focus:bg-primary-700 focus:outline-none focus:ring-0 active:bg-primary-800"
    >
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default LightDarkSwitch;
