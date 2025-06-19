import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Activity, 
  Clock, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  FileText,
  ArrowLeft,
  Zap
} from 'lucide-react';
import { useWalletContext } from '../contexts/WalletContext';

interface DashboardSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { disconnectWallet } = useWalletContext();
  
  // Navigation items
  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: <Home size={20} /> },
    { path: '/dashboard/active', label: 'Active Wagers', icon: <Activity size={20} /> },
    { path: '/dashboard/history', label: 'History', icon: <Clock size={20} /> },
    { path: '/dashboard/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];
  
  // Check if the path is active
  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`fixed left-0 top-[85px] h-[calc(100%-85px)] z-30 transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Main Sidebar */}
      <div className="h-full w-80 bg-dark-800/95 backdrop-blur-sm border-r border-slate-700/40 flex flex-col">
        {/* Content */}
        <div className="flex-1 px-4 py-6 flex flex-col">
          {/* Back to Marketplace Button - Moved to top */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/wagers')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-secondary-600 to-primary-600 
                      hover:from-secondary-500 hover:to-primary-500 text-white rounded-lg transition-all duration-200
                      shadow-lg hover:shadow-glow transform hover:-translate-y-0.5 font-medium"
            >
              <ArrowLeft size={20} />
              <span>Back to Wagers</span>
              <Zap size={16} className="ml-auto animate-pulse" />
            </button>
          </div>
          
          {/* Divider */}
          <div className="border-t border-slate-700/40 mb-6"></div>
          
          {/* Main Navigation */}
          <nav className="space-y-2 mb-8">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">Dashboard</h3>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-secondary-600/20 to-primary-600/20 text-white border border-secondary-600/30'
                    : 'text-gray-300 hover:text-gray-100 hover:bg-dark-850/70'
                }`}
              >
                <div className={`${isActive(item.path) ? 'text-secondary-400' : 'text-gray-400'}`}>
                  {item.icon}
                </div>
                <span className="font-medium">{item.label}</span>
                {item.label === 'Active Wagers' && (
                  <span className="ml-auto bg-primary-900/70 text-primary-400 text-xs font-medium px-2 py-1 rounded-full border border-primary-700/30">
                    3
                  </span>
                )}
                {isActive(item.path) && (
                  <div className="ml-auto w-2 h-2 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>
          
          {/* Spacer to push the Account section to the bottom */}
          <div className="flex-grow"></div>
          
          {/* Account Section */}
          <div className="mt-auto">
            <div className="border-t border-slate-700/40 pt-4 mb-4"></div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">Account</h3>
            <nav className="space-y-2">
              <a 
                href="https://wagerfi.gitbook.io/wagerfi-docs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-gray-100 hover:bg-dark-850/70 rounded-lg transition-all duration-200"
              >
                <FileText size={20} className="text-gray-400" />
                <span className="font-medium">Documentation</span>
              </a>
              
              <button
                onClick={() => disconnectWallet()}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-900/10 rounded-lg transition-all duration-200 text-left"
              >
                <LogOut size={20} />
                <span className="font-medium">Disconnect Wallet</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Toggle Button */}
      <button 
        onClick={onToggle}
        className="absolute top-1/2 -translate-y-1/2 -right-6 w-6 h-12 bg-dark-800/95 backdrop-blur-sm border border-slate-700/40 
                 rounded-r-lg flex items-center justify-center text-gray-400 hover:text-gray-300 transition-colors"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
    </div>
  );
};

export default DashboardSidebar;