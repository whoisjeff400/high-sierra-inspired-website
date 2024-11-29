import React, { useState, useEffect } from 'react';
import { X, Check, SearchSlash } from 'lucide-react';

const wallpapers = [
  {
    id: 'attack-on-titan',
    name: 'Titan Landscape',
    category: 'Anime',
    url: '/images/attack-on-titan-wallpapers.jpg',
    thumbnail: '/images/attack-on-titan-wallpapers.jpg',
  },
  {
    id: 'mountain',
    name: 'Alpine Peak',
    category: 'Nature',
    url: '/images/macos-mountain-wallpaper.jpg',
    thumbnail: '/images/macos-mountain-wallpaper.jpg',
  },
  {
    id: 'beach',
    name: 'Golden Coast',
    category: 'Landscape',
    url: '/images/macos-beach-wallpaper.jpg',
    thumbnail: '/images/macos-beach-wallpaper.jpg'
  },
  {
    id: 'river',
    name: 'Mountain Stream',
    category: 'Nature',
    url: '/images/river-high-sierra-wallpapers.jpg',
    thumbnail: '/images/river-high-sierra-wallpapers.jpg',
  },
  {
    id: 'attack-on-titan2',
    name: 'Titan Horizon',
    category: 'Anime',
    url: '/images/attack-on-titan-wallpapers2.jpg',
    thumbnail: '/images/attack-on-titan-wallpapers2.jpg',
  },
];

interface WallpaperSelectorProps {
  onClose?: () => void;
  onWallpaperChange?: (wallpaperUrl: string) => void;
}

const WallpaperSelector: React.FC<WallpaperSelectorProps> = ({ 
  onClose = () => {}, 
  onWallpaperChange = () => {} 
}) => {
  const [currentWallpaper, setCurrentWallpaper] = useState<string>('');
  const [selectedWallpaper, setSelectedWallpaper] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...new Set(wallpapers.map(w => w.category))];

  useEffect(() => {
    const savedWallpaper = localStorage.getItem('wallpaper');
    if (savedWallpaper) {
      setCurrentWallpaper(savedWallpaper);
      setSelectedWallpaper(savedWallpaper);
    } else {
      const defaultWallpaper = wallpapers[0].url;
      setCurrentWallpaper(defaultWallpaper);
      setSelectedWallpaper(defaultWallpaper);
    }
  }, []);

  const changeWallpaper = (url: string) => {
    setSelectedWallpaper(url);
    onWallpaperChange(url);
  };

  const applyWallpaper = () => {
    setCurrentWallpaper(selectedWallpaper);
    localStorage.setItem('wallpaper', selectedWallpaper);
    onClose();
  };

  const filteredWallpapers = wallpapers.filter(wallpaper => 
    (activeCategory === 'All' || wallpaper.category === activeCategory) &&
    wallpaper.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 
                 backdrop-blur-md"
    >
      <div 
        className="bg-white/95 rounded-xl shadow-2xl border border-gray-300/50 
                   w-[900px] h-[650px] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div 
          className="bg-gray-200/50 p-4 flex justify-between items-center 
                     rounded-t-xl border-b border-gray-300/50"
        >
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold">Change Wallpaper</h2>
            <input 
              type="text" 
              placeholder="Search wallpapers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1 bg-white/70 border border-gray-300 rounded-md 
                         text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={onClose} 
            className="hover:bg-gray-300 rounded-full p-2 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Category and Main Content */}
        <div className="flex flex-1">
          {/* Categories */}
          <div className="w-1/6 bg-gray-100/50 p-4 border-r border-gray-300/50">
            <div className="space-y-2">
              {categories.map(category => (
                <div
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`
                    px-3 py-2 rounded-md cursor-pointer transition-colors
                    ${activeCategory === category 
                      ? 'bg-blue-500 text-white' 
                      : 'hover:bg-gray-200'}
                  `}
                >
                  {category}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-5/6 flex">
            {/* Preview Area */}
            <div className="w-2/3 p-6 pr-3">
              <div 
                className="w-full h-[450px] rounded-lg overflow-hidden 
                           border-4 border-white shadow-lg"
              >
                {selectedWallpaper ? (
                  <img 
                    src={selectedWallpaper} 
                    alt="Wallpaper Preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <SearchSlash size={48} className="text-gray-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Wallpaper Selection */}
            <div className="w-1/3 p-6 pl-3 overflow-y-auto">
              {filteredWallpapers.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {filteredWallpapers.map((wallpaper) => (
                    <div 
                      key={wallpaper.id}
                      className={`
                        relative cursor-pointer rounded-lg overflow-hidden 
                        transition-all duration-300 ease-in-out group
                        ${selectedWallpaper === wallpaper.url 
                          ? 'ring-4 ring-blue-500 scale-105' 
                          : 'hover:scale-105 hover:ring-2 hover:ring-blue-300'}
                      `}
                      onClick={() => changeWallpaper(wallpaper.url)}
                    >
                      <img 
                        src={wallpaper.thumbnail} 
                        alt={wallpaper.name}
                        className="w-full h-24 object-cover"
                      />
                      <div 
                        className="absolute inset-0 bg-black bg-opacity-0 
                                   group-hover:bg-opacity-10 transition-colors"
                      />
                      <div className="absolute bottom-2 right-2">
                        {selectedWallpaper === wallpaper.url && (
                          <div 
                            className="bg-blue-500 text-white rounded-full p-1"
                          >
                            <Check size={16} />
                          </div>
                        )}
                      </div>
                      <div 
                        className="absolute bottom-2 left-2 text-white font-semibold 
                                   drop-shadow-md text-xs"
                      >
                        {wallpaper.name}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No wallpapers found
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div 
          className="bg-gray-200/50 p-4 flex justify-between items-center 
                     rounded-b-xl border-t border-gray-300/50"
        >
          <div className="text-sm text-gray-600">
            Selected: {filteredWallpapers.find(w => w.url === selectedWallpaper)?.name || 'None'}
          </div>
          <div className="space-x-4">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 
                         rounded-md transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={applyWallpaper}
              disabled={!selectedWallpaper}
              className="px-4 py-2 bg-blue-500 text-white 
                         rounded-md hover:bg-blue-600 transition-colors
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallpaperSelector;