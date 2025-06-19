import React from 'react';
import { Zap } from 'lucide-react';

interface GenerateButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, isLoading = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="flex items-center justify-center gap-2 bg-gradient-to-r from-secondary-600 to-primary-600 
                 hover:from-secondary-500 hover:to-primary-500 text-white font-medium py-3 px-6 rounded-full
                 shadow-md hover:shadow-glow transform hover:-translate-y-0.5 transition-all duration-200
                 focus:outline-none focus:ring-2 focus:ring-secondary-500/50 disabled:opacity-70
                 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none"
      aria-label="Generate button"
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          <Zap size={18} className="animate-pulse" />
          <span>Generate</span>
        </>
      )}
    </button>
  );
};

export default GenerateButton;