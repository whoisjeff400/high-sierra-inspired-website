import React, { useEffect, useState } from 'react';
import MenuBar from '../MenuBar';
import Dock from '../Dock';
import Window from '../Window';
import WallpaperSelector from '../WallpaperSelector';

const DEFAULT_WALLPAPERS = [
  '/images/macos-default-wallpaper.jpg',
  '/images/macos-mountain-wallpaper.jpg',
  '/images/macos-beach-wallpaper.jpg'
];

const Desktop = () => {
  const [wallpaper, setWallpaper] = useState<string>('');
  const [showWallpaperSelector, setShowWallpaperSelector] = useState(false);
  const [isWindowOpen, setIsWindowOpen] = useState(true);

  useEffect(() => {
    const savedWallpaper = localStorage.getItem('wallpaper');
    setWallpaper(
      savedWallpaper || 
      DEFAULT_WALLPAPERS[0] || 
      'https://via.placeholder.com/1500x1000/FF6347/000000?text=Wallpaper+1'
    );
  }, []);

  const handleWallpaperChange = (newWallpaper: string) => {
    setWallpaper(newWallpaper);
    localStorage.setItem('wallpaper', newWallpaper);
    setShowWallpaperSelector(false);
  };

  const openWallpaperSelector = () => {
    setShowWallpaperSelector(true);
  };

  return (
    <div
      className="h-screen w-screen relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${wallpaper})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center'
      }}
    >
      {/* Menu Bar */}
      <MenuBar onWallpaperSelect={openWallpaperSelector} />

      {/* Wallpaper Selector (Conditional Rendering) */}
      {showWallpaperSelector && (
        <WallpaperSelector 
          onClose={() => setShowWallpaperSelector(false)}
          onWallpaperChange={handleWallpaperChange}
        />
      )}
{/* Welcome Window */}
{isWindowOpen && (
  <Window 
    title="Welcome" 
    onClose={() => setIsWindowOpen(false)}
  >
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Welcome to My Digital Playground</h1>
      <p>Where retro vibes meet web magic! Click, drag, and play—your adventure starts here.</p>

      <h2 className="text-lg font-bold">Why Me?</h2>
      <p>Think sleek, smart, and seamless—web solutions crafted with the same care as a classic macOS.</p>

      <div className="flex space-x-4">
        <button 
          onClick={openWallpaperSelector}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Change Wallpaper
        </button>
        <button 
          onClick={() => setIsWindowOpen(false)}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </Window>
)}


      {/* Dock */}
      <Dock />
    </div>
  );
};

export default Desktop;