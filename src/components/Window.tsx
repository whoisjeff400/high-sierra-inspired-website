import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import { Minus, Square, X } from 'lucide-react';
import 'react-resizable/css/styles.css';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  initialWidth?: number;
  initialHeight?: number;
}

const Window: React.FC<WindowProps> = ({ 
  title, 
  children, 
  onClose = () => {}, 
  initialWidth = 600, 
  initialHeight = 400 
}) => {
  const nodeRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleMinimize = () => {
    // Implement minimize functionality
  };

  const handleMaximize = () => {
    setIsMaximized(prev => !prev);
  };

  return (
    <Draggable 
      nodeRef={nodeRef}
      cancel=".cancel-drag"
      bounds="parent"
    >
      <div 
        ref={nodeRef} 
        className={`
          fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          bg-white/90 backdrop-blur-sm 
          rounded-lg shadow-2xl border border-gray-300 
          overflow-hidden transition-all duration-300 ease-in-out
          ${isMaximized 
            ? 'w-full h-full !top-0 !left-0 !transform-none' 
            : 'w-[600px] h-[400px]'}
        `}
      >
        {/* Window Header */}
        <div 
          className="bg-gray-200/50 border-b border-gray-300 
                     h-10 flex items-center justify-between 
                     px-4 cancel-drag"
        >
          {/* Window Controls */}
          <div className="flex items-center space-x-2">
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="w-3 h-3 bg-red-500 rounded-full 
                         hover:bg-red-600 transition-colors 
                         flex items-center justify-center"
            >
              <X size={10} className="text-white opacity-0 group-hover:opacity-100" />
            </button>

            {/* Minimize Button */}
            <button 
              onClick={handleMinimize}
              className="w-3 h-3 bg-yellow-500 rounded-full 
                         hover:bg-yellow-600 transition-colors"
            />

            {/* Maximize Button */}
            <button 
              onClick={handleMaximize}
              className="w-3 h-3 bg-green-500 rounded-full 
                         hover:bg-green-600 transition-colors"
            />
          </div>

          {/* Window Title */}
          <div className="text-gray-700 text-sm font-semibold select-none">
            {title}
          </div>

          {/* Placeholder for additional window controls */}
          <div className="w-12"></div>
        </div>

        {/* Window Content */}
        <ResizableBox 
          width={initialWidth} 
          height={initialHeight} 
          minConstraints={[200, 150]} 
          maxConstraints={[1200, 900]}
          className="h-full"
          handle={
            <div className="absolute bottom-0 right-0 w-4 h-4 
                            cursor-se-resize bg-transparent" />
          }
        >
          <div 
            className="p-4 overflow-auto h-full"
            style={{ 
              height: 'calc(100% - 40px)', 
              maxHeight: 'calc(100% - 40px)' 
            }}
          >
            {children}
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default Window;