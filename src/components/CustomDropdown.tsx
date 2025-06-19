import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  icon?: React.ReactNode;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  className = "",
  label,
  icon
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Find the selected option
  const selectedOption = options.find(option => option.value === value);

  // Update dropdown position when opened
  const updateDropdownPosition = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const dropdownHeight = 320; // max-h-80 = 320px
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      // Determine if dropdown should open upward or downward
      const shouldOpenUpward = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;
      
      // Calculate horizontal position, ensuring it doesn't go off-screen
      let leftPosition = rect.left;
      const rightEdge = leftPosition + rect.width;
      
      if (rightEdge > viewportWidth) {
        leftPosition = viewportWidth - rect.width - 8; // 8px margin from edge
      }
      if (leftPosition < 8) {
        leftPosition = 8; // 8px margin from left edge
      }
      
      setDropdownPosition({
        top: shouldOpenUpward ? rect.top - Math.min(dropdownHeight, spaceAbove) : rect.bottom + 8,
        left: leftPosition,
        width: rect.width
      });
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleWindowResize = () => {
      if (isOpen) {
        updateDropdownPosition();
      }
    };

    const handleWindowScroll = () => {
      if (isOpen) {
        updateDropdownPosition();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('scroll', handleWindowScroll, true); // Use capture to catch all scroll events
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('scroll', handleWindowScroll, true);
    };
  }, [isOpen, updateDropdownPosition]);

  // Handle option selection
  const handleOptionSelect = (optionValue: string) => {
    if (!disabled) {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  // Handle opening dropdown
  const handleToggleDropdown = () => {
    if (!disabled) {
      if (!isOpen) {
        updateDropdownPosition();
      }
      setIsOpen(!isOpen);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
    }
  };

  return (
    <div className={`relative w-full ${className}`} style={{ zIndex: 999999 }}>
      {/* Label */}
      {label && (
        <label className="flex items-center gap-2 text-sm titillium-web-semibold text-gray-300 mb-3">
          {icon && <span className="text-primary-400">{icon}</span>}
          {label}
        </label>
      )}

      {/* Dropdown Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggleDropdown}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`
          w-full h-12 flex items-center justify-between px-4 py-3 
          bg-dark-850/60 border border-slate-700/40 text-gray-200 
          focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 
          rounded-xl titillium-web-regular transition-all backdrop-blur-sm
          hover:border-slate-600/60 hover:bg-dark-850/80
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${isOpen ? 'ring-2 ring-primary-500/50 border-primary-500/50' : ''}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {selectedOption?.icon && (
            <span className="flex-shrink-0">{selectedOption.icon}</span>
          )}
          <span className={`truncate ${selectedOption ? 'text-gray-200' : 'text-gray-500'}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        
        <ChevronDown 
          size={18} 
          className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu - Rendered as Portal */}
      {isOpen && createPortal(
        <div 
          ref={dropdownRef}
          className="fixed py-2 bg-dark-850 rounded-lg shadow-xl border border-slate-700/60 max-h-80 overflow-y-auto backdrop-blur-xl"
          style={{ 
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            width: dropdownPosition.width,
            zIndex: 9999999 
          }}
          role="listbox"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionSelect(option.value)}
              disabled={option.disabled}
              className={`
                w-full px-4 py-3 flex items-center gap-3 text-left transition-colors
                ${option.disabled 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-dark-800/80 cursor-pointer'
                }
                ${value === option.value 
                  ? 'bg-primary-900/30 text-primary-300 border-l-2 border-primary-500' 
                  : 'text-gray-200'
                }
              `}
              role="option"
              aria-selected={value === option.value}
            >
              {option.icon && (
                <span className="flex-shrink-0">{option.icon}</span>
              )}
              <span className="flex-1 truncate">{option.label}</span>
              {value === option.value && (
                <Check size={16} className="flex-shrink-0 text-primary-400" />
              )}
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
};

export default CustomDropdown; 