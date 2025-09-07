import React from 'react';

interface TaskCardProps {
  title: string;
  description: string;
  onWatch: () => void;
  isLoading: boolean;
  isAdSdkReady: boolean;
  adSdkError: boolean;
  IconComponent: React.FC<{ className?: string }>;
  theme: {
    buttonColor: string;
    buttonTextColor: string;
    hintColor: string;
  };
}

const TaskCard: React.FC<TaskCardProps> = ({ title, description, onWatch, isLoading, isAdSdkReady, adSdkError, IconComponent, theme }) => {
  return (
    <div className="bg-white/5 backdrop-blur-md p-5 rounded-xl border border-white/10 shadow-lg">
      <div className="flex items-center space-x-4">
        {/* FIX: Moved style prop from IconComponent to its parent div to resolve a TypeScript error. The color is inherited by the SVG icon via `currentColor`. */}
        <div className="bg-white/10 p-3 rounded-full" style={{ color: theme.hintColor }}>
          <IconComponent className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm opacity-80" style={{ color: theme.hintColor }}>{description}</p>
        </div>
      </div>
      <button
        onClick={onWatch}
        disabled={isLoading || !isAdSdkReady || adSdkError}
        className="w-full mt-4 py-2.5 px-5 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        style={{ backgroundColor: theme.buttonColor, color: theme.buttonTextColor }}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : adSdkError ? (
          'Ads Unavailable'
        ) : !isAdSdkReady ? (
          'Loading Ads...'
        ) : (
          'Watch Now'
        )}
      </button>
    </div>
  );
};

export default TaskCard;