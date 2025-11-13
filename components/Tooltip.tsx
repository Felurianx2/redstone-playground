import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children?: React.ReactNode;
  type?: 'hover' | 'click';
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, type = 'hover' }) => {
  const [isVisible, setIsVisible] = useState(false);

  if (type === 'click') {
    return (
      <div className="relative inline-block">
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="ml-1 inline-flex items-center justify-center w-4 h-4 text-xs rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors cursor-help"
          aria-label="Help"
        >
          ?
        </button>
        {isVisible && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsVisible(false)}
            />
            <div className="absolute z-20 left-1/2 -translate-x-1/2 mt-2 w-64 p-3 bg-gray-800 border border-gray-600 rounded-lg shadow-xl text-xs text-gray-200 leading-relaxed">
              {content}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 border-l border-t border-gray-600 transform rotate-45" />
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="relative inline-block group">
      {children || (
        <span className="ml-1 inline-flex items-center justify-center w-4 h-4 text-xs rounded-full bg-gray-700 text-gray-300 group-hover:bg-gray-600 transition-colors cursor-help">
          ?
        </span>
      )}
      <div className="invisible group-hover:visible absolute z-10 left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-gray-800 border border-gray-600 rounded-lg shadow-xl text-xs text-gray-200 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {content}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 border-r border-b border-gray-600 transform rotate-45" />
      </div>
    </div>
  );
};

export default Tooltip;