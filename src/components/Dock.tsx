import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Folder,
  Mail,
  Calendar,
  Chrome,
  Music,
  Settings,
  Instagram,
  Twitter,
  Github,
  Coffee,
  Gamepad,
  Clipboard,
  Video,
  MessageSquare,
} from 'lucide-react';

const Dock = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const dockItems = [
    { path: '/', icon: <Home color="#007AFF" />, alt: 'Home', label: 'Finder' },
    { path: '/projects', icon: <Folder color="#5856D6" />, alt: 'Projects', label: 'Projects' },
    { path: '/facetime', icon: <Video color="#34C759" />, alt: 'FaceTime', label: 'FaceTime' },
    { path: '/imessage', icon: <MessageSquare color="#5856D6" />, alt: 'iMessage', label: 'iMessage' },
    { path: '/snake-game', icon: <Gamepad color="#FF2D55" />, alt: 'Play Snake Game', label: 'Snake Game' },
    { path: '/to-do-list', icon: <Clipboard color="#FF9500" />, alt: 'Manage To-Do List', label: 'To-Do List' },
    { path: '/mail', icon: <Mail color="#FF3B30" />, alt: 'Mail', label: 'Mail' },
    { path: '/calendar', icon: <Calendar color="#007AFF" />, alt: 'Calendar', label: 'Calendar' },
    { path: '/browser', icon: <Chrome color="#5856D6" />, alt: 'Web Browser', label: 'Chrome' },
    {
      path: 'https://open.spotify.com/playlist/5UzZuu84hjwAQEyaGKBYUF?si=71583924e1164a5a',
      icon: <Music color="#1DB954" />,
      alt: 'Spotify',
      label: 'Spotify',
      external: true,
      onClick: () => window.open('https://open.spotify.com/playlist/5UzZuu84hjwAQEyaGKBYUF?si=71583924e1164a5a', '_blank', 'width=800,height=600')
    },
    { path: '/settings', icon: <Settings color="#8E8E93" />, alt: 'Settings', label: 'Settings' },
    { path: 'https://www.instagram.com', icon: <Instagram color="#FF2D55" />, alt: 'Instagram', label: 'Instagram', external: true },
    { path: 'https://twitter.com', icon: <Twitter color="#007AFF" />, alt: 'Twitter', label: 'Twitter', external: true },
    { path: 'https://github.com', icon: <Github color="#000000" />, alt: 'GitHub', label: 'GitHub', external: true },
    { path: 'https://www.buymeacoffee.com/whoistheedev', icon: <Coffee color="#FF9500" />, alt: 'Support Us', label: 'Buy Me a Coffee', external: true },
  ];

  return (
    <div
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white/30 backdrop-blur-lg
                 rounded-2xl shadow-lg border border-gray-200/50
                 flex items-center justify-center space-x-4 px-4 py-2 z-50"
    >
      {dockItems.map((item) => (
        <div
          key={item.path}
          className="relative group"
          onMouseEnter={() => setHoveredItem(item.path)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {!item.external ? (
            <Link
              to={item.path}
              aria-label={item.label}
              className={`
                block w-12 h-12 p-2 rounded-lg transition-all duration-300 ease-in-out
                ${hoveredItem === item.path
                  ? 'transform -translate-y-6 scale-125 shadow-lg bg-white/20'
                  : 'hover:bg-white/10'}
              `}
            >
              <div className="w-full h-full flex items-center justify-center">
                {React.cloneElement(item.icon, { size: hoveredItem === item.path ? 28 : 24 })}
              </div>
            </Link>
          ) : (
            <a
              href={item.path}
              target={item.external ? '_blank' : '_self'}
              rel="noopener noreferrer"
              onClick={item.onClick} // Add this handler to open Spotify in a new window
              aria-label={item.label}
              className={`
                block w-12 h-12 p-2 rounded-lg transition-all duration-300 ease-in-out
                ${hoveredItem === item.path
                  ? 'transform -translate-y-6 scale-125 shadow-lg bg-white/20'
                  : 'hover:bg-white/10'}
              `}
            >
              <div className="w-full h-full flex items-center justify-center">
                {React.cloneElement(item.icon, { size: hoveredItem === item.path ? 28 : 24 })}
              </div>
            </a>
          )}

          {hoveredItem === item.path && (
            <div
              className="absolute -top-10 left-1/2 transform -translate-x-1/2
                        bg-black/70 text-white text-xs px-2 py-1 rounded
                        whitespace-nowrap opacity-100 transition-opacity"
            >
              {item.label}
            </div>
          )}

          <div
            className={`
              absolute -bottom-1 left-1/2 transform -translate-x-1/2
              w-2 h-2 bg-blue-500 rounded-full
              ${hoveredItem === item.path ? 'opacity-100' : 'opacity-0'}
            `}
          />
        </div>
      ))}
    </div>
  );
};

export default Dock;
