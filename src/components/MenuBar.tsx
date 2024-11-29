import React, { useEffect, useState } from "react";
import appleLogo from "./assets/apple-logo.svg";
import {
  Wifi,
  Battery,
  BatteryCharging,
  Search,
  Volume2,
  BluetoothConnected,
  Image,
  ChevronDown,
  Aperture,
  Lock
} from "lucide-react";

interface MenuBarProps {
  onWallpaperSelect?: () => void;
  activeApp?: string;
  onLockScreen?: () => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ 
  onWallpaperSelect, 
  activeApp, 
  onLockScreen 
}) => {
  const [time, setTime] = useState<string>(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [date, setDate] = useState<string>(
    new Date().toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })
  );
  const [batteryLevel, setBatteryLevel] = useState<number>(85);
  const [isCharging, setIsCharging] = useState<boolean>(false);
  const [networkStrength, setNetworkStrength] = useState<number>(4);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
      setDate(
        now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })
      );

      // Simulating battery and network changes
      const randomChange = Math.random();
      if (randomChange < 0.1) {
        setIsCharging((prev) => !prev);
        setBatteryLevel(prev => Math.max(20, Math.min(100, prev + (isCharging ? 5 : -5))));
      }
      if (randomChange < 0.05) {
        setNetworkStrength(prev => Math.max(1, Math.min(4, prev + (Math.random() > 0.5 ? 1 : -1))));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isCharging]);

  const handleWallpaperSelect = () => {
    if (onWallpaperSelect) {
      onWallpaperSelect();
    }
  };

  const handleLockScreen = () => {
    if (onLockScreen) {
      onLockScreen();
    }
  };

  const menuItems = [
    "Finder",
    "File",
    "Edit",
    "View",
    "Window",
    "Help"
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-200/90 backdrop-blur-md border-b border-gray-300/50 h-6 flex items-center justify-between px-2 text-xs font-semibold text-gray-800 select-none">
      {/* Left Side: Apple Logo and Menu */}
      <div className="flex items-center space-x-2">
        {/* Apple Logo with Spotlight-like Menu */}
        <div className="group relative">
          <div className="hover:bg-gray-300/50 rounded px-2 py-1 transition-colors cursor-pointer">
            <img src={appleLogo} alt="Apple Logo" className="h-4 w-4" />
          </div>
          <div className="absolute hidden group-hover:block top-full left-0 mt-1 bg-white shadow-lg rounded-lg border border-gray-200 w-48 z-60">
            <div className="p-2 hover:bg-gray-100 cursor-pointer">About This Mac</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">System Preferences</div>
            <div className="border-t border-gray-200 p-2 hover:bg-gray-100 cursor-pointer">Force Quit</div>
            <div className="border-t border-gray-200 p-2 hover:bg-gray-100 cursor-pointer">Sleep</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={handleLockScreen}>
              Lock Screen
            </div>
            <div className="border-t border-gray-200 p-2 hover:bg-gray-100 cursor-pointer">Restart...</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Shut Down...</div>
          </div>
        </div>

        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <div 
            key={item} 
            className={`
              flex items-center space-x-1 
              hover:bg-gray-300/50 rounded px-2 py-1 
              transition-colors cursor-pointer
              ${index === 0 ? 'font-bold' : ''}
            `}
          >
            {item}
            {item !== "Finder" && (
              <ChevronDown size={10} className="text-gray-500" />
            )}
          </div>
        ))}
      </div>

      {/* Center: Active App Name */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-center flex items-center space-x-2">
        {activeApp && (
          <>
            <Aperture size={14} className="text-gray-600" />
            <span className="font-semibold text-gray-800">{activeApp}</span>
          </>
        )}
      </div>

      {/* Right Side: System Status and Indicators */}
      <div className="flex items-center space-x-3">
        {/* Wallpaper Selection Icon */}
        {onWallpaperSelect && (
          <div
            onClick={handleWallpaperSelect}
            className="cursor-pointer hover:bg-gray-300/50 rounded p-1 transition-colors group"
          >
            <Image
              size={14}
              className="text-gray-600 group-hover:text-blue-600 transition-colors"
              aria-label="Change Wallpaper"
            />
          </div>
        )}

        {/* System Status Icons */}
        <div className="flex items-center space-x-2 text-gray-600">
          <div className="relative">
            <BluetoothConnected
              size={14}
              className="hover:text-blue-600 transition-colors"
            />
            <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-2 h-2"></div>
          </div>
          
          <Volume2
            size={14}
            className="hover:text-blue-600 transition-colors"
          />

          {isCharging ? (
            <BatteryCharging
              size={14}
              className={`${
                batteryLevel > 20 ? "text-green-600" : "text-red-600"
              }`}
            />
          ) : (
            <Battery
              size={14}
              className={`${
                batteryLevel > 20 ? "text-gray-600" : "text-red-600"
              }`}
            />
          )}

          <div className="relative">
            <Wifi
              size={14}
              className={`
                ${networkStrength > 2 ? "text-gray-600" : "text-yellow-600"}
                hover:text-blue-600 transition-colors
              `}
            />
            {networkStrength === 1 && (
              <div className="absolute -top-1 -right-1 bg-yellow-500 text-white rounded-full w-2 h-2"></div>
            )}
          </div>

          <Search
            size={14}
            className="hover:text-blue-600 transition-colors"
          />
        </div>

        {/* Date and Time */}
        <div className="text-gray-800 pl-2 flex flex-col items-end">
          <span className="text-[10px] leading-3">{date}</span>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;