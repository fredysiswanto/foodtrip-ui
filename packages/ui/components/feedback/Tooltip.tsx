import { useState, ReactNode } from 'react';

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = 'top',
  className = '',
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>

      {isVisible && (
        <div
          className={`absolute z-50 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap pointer-events-none ${positionStyles[position]} ${className}`.trim()}
          role="tooltip"
        >
          {content}
          <div className={`absolute ${
            position === 'top' ? 'top-full border-t-gray-900 border-l-transparent border-r-transparent border-b-0' :
            position === 'bottom' ? 'bottom-full border-b-gray-900 border-l-transparent border-r-transparent border-t-0' :
            position === 'left' ? 'left-full border-l-gray-900 border-t-transparent border-b-transparent border-r-0' :
            'right-full border-r-gray-900 border-t-transparent border-b-transparent border-l-0'
          } border-4`} />
        </div>
      )}
    </div>
  );
}
