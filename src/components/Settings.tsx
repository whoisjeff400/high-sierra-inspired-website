import React, { useState, useEffect } from 'react';
import Window from './Window';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [wallpaper, setWallpaper] = useState<string>('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedWallpaper = localStorage.getItem('wallpaper');
    if (savedTheme) setIsDarkMode(savedTheme === 'dark');
    if (savedWallpaper) setWallpaper(savedWallpaper);
  }, []);

  const handleThemeChange = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  const handleWallpaperChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedWallpaper = e.target.value;
    setWallpaper(selectedWallpaper);
    localStorage.setItem('wallpaper', selectedWallpaper);
  };

  return (
    <Window title="Settings">
      <div className="p-4">
        <div className="mb-4">
          <label className="text-lg block">Theme</label>
          <button
            onClick={handleThemeChange}
            className={`mt-2 px-4 py-2 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
          >
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </div>
        <div className="mb-4">
          <label className="text-lg block">Wallpaper</label>
          <input
            type="text"
            placeholder="Enter wallpaper URL"
            className="mt-2 p-2 w-full border rounded"
            value={wallpaper}
            onChange={handleWallpaperChange}
          />
        </div>
      </div>
    </Window>
  );
};

export default Settings;
