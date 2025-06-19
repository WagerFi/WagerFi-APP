import React, { useState } from 'react';
import { 
  Map, 
  Milestone, 
  CheckCircle2, 
  Circle, 
  ChevronRight,
  Calendar,
  Rocket,
  Award,
  Zap,
  BarChart,
  Globe,
  Layers,
  Bell,
  Trophy,
  DollarSign,
  Star,
  Activity
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

const RoadmapPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Phase data
  const phases = [
    {
      title: "Phase 1: Foundation",
      status: "completed",
      description: "Release basic version of WagerFi.",
      items: [
        {
          title: "Live Sports Data Integration",
          description: "Pulling live data from our API providers with the ability to search and create sports wagers.",
          details: [
            "Search for upcoming events",
            "Create wagers with team selection",
            "API integration with API-SPORTS"
          ]
        },
        {
          title: "Crypto Price Prediction System",
          description: "Integration with CoinMarketCap for crypto wager functionality.",
          details: [
            "Create crypto wagers with current pricing",
            "Set target pricing with deadline date",
            "Verified tokens support including memecoins"
          ]
        },
        {
          title: "Sports Categories",
          description: "Multiple sports leagues and events coverage.",
          details: [
            "Hockey - 260 leagues & cups",
            "Football (soccer) - 1100 leagues & cups",
            "Basketball - 420 leagues & cups",
            "Baseball - 70 leagues & cups",
            "MMA - UFC"
          ]
        }
      ]
    },
    {
      title: "Phase 2: Expansion",
      status: "in-progress",
      description: "Launch $WAGER token and improve existing features.",
      items: [
        {
          title: "Launch $WAGER Token",
          description: "Launch $WAGER on Solana.",
          details: [
            "Generated fees used to upgrade/add APIs",
            "Provide more data and features",
            "Deflationary tokenomics model"
          ]
        },
        {
          title: "Website Rebuild",
          description: "Re-build website with new/upgraded API integrations.",
          details: [
            "Add more sport categories (boxing, tennis, etc.)",
            "Add more categories (e-sports)",
            "Provide live data for live events (live scores)"
          ]
        },
        {
          title: "Crypto Improvements",
          description: "Enhance crypto wager functionality.",
          details: [
            "Consistent prices of all verified tokens",
            "Improve wagering options",
            "Add token vs token market cap wagers"
          ]
        }
      ]
    },
    {
      title: "Phase 3: Advanced Features",
      status: "planned",
      description: "Major UI/UX overhaul and feature expansion.",
      items: [
        {
          title: "UI Redesign",
          description: "Rebuild the user interface.",
          details: [
            "Create separate pages for separate categories",
            "Integrate live scores/prices for wager cards",
            "Modal for more details on wagers"
          ]
        },
        {
          title: "Enhanced User Dashboard",
          description: "Comprehensive analytics and wager management.",
          details: [
            "Link all wagers to the dashboard with analytics",
            "Total wagers, amount wagered, profit/loss, win ratio",
            "Wager card share to social media"
          ]
        },
        {
          title: "Wallet Integration",
          description: "Improved wallet functionality.",
          details: [
            "Integrate custodial wallets (no private keys stored)",
            "Deposit/withdraw system",
            "Better transaction processing"
          ]
        }
      ]
    },
    {
      title: "Phase 4: Community & Engagement",
      status: "planned",
      description: "Features to increase community engagement and platform growth.",
      items: [
        {
          title: "Leaderboard Improvements",
          description: "Enhanced leaderboard functionality.",
          details: [
            "Global and category-specific leaderboards",
            "Weekly/monthly competitions",
            "Rewards for top performers"
          ]
        },
        {
          title: "Notification System",
          description: "Comprehensive notification system.",
          details: [
            "Notifications for wagers created/accepted/settled/cancelled",
            "SOL transaction notifications",
            "Custom alert preferences"
          ]
        },
        {
          title: "Sweepstakes System",
          description: "Tournament sweepstakes functionality.",
          details: [
            "Implement sweepstakes for tournaments",
            "Sports (World Cup, Champions League)",
            "Gaming (FNCS, CS-GO, COD, etc.)",
            "Live draws for teams"
          ]
        },
        {
          title: "$WAGER Token Utility",
          description: "Expanded token functionality.",
          details: [
            "Use as payment to enter sweepstakes",
            "Tokens burnt upon entering (deflationary model)",
            "Reduced platform fee (currently 4%) for token holders"
          ]
        }
      ]
    }
  ];
  
  // Helper function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-900/30 text-green-400 border border-green-700/30';
      case 'in-progress':
        return 'bg-blue-900/30 text-blue-400 border border-blue-700/30';
      case 'planned':
        return 'bg-purple-900/30 text-purple-400 border border-purple-700/30';
      default:
        return 'bg-gray-800 text-gray-400 border border-gray-700/30';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-gradient">
      <Header />
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <main className={`flex-1 px-4 sm:px-6 md:px-8 py-12 transition-all duration-300 ${isSidebarOpen ? 'ml-80 mt-[85px]' : 'ml-0 mt-[85px]'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">WagerFi Roadmap</h1>
              <p className="text-gray-400">Our development plan and future milestones</p>
            </div>
            
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-sm text-gray-300">Completed</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                <span className="text-sm text-gray-300">In Progress</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                <span className="text-sm text-gray-300">Planned</span>
              </div>
            </div>
          </div>
          
          {/* Timeline Display */}
          <div className="relative">
            {/* Vertical line connecting phases */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-700/40 transform md:-translate-x-1/2"></div>
            
            {/* Phases */}
            {phases.map((phase, phaseIndex) => (
              <div key={phaseIndex} className="relative mb-12">
                {/* Phase header */}
                <div className={`md:w-1/2 ${phaseIndex % 2 === 0 ? 'md:pr-12 md:mr-auto' : 'md:pl-12 md:ml-auto'}`}>
                  <div className="bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl p-6 relative">
                    {/* Phase indicator dot */}
                    <div className={`absolute -left-3 top-6 md:top-6 md:left-auto ${phaseIndex % 2 === 0 ? 'md:-right-5' : 'md:-left-5'} w-10 h-10 rounded-full 
                                   ${phase.status === 'completed' ? 'bg-green-900/30' : phase.status === 'in-progress' ? 'bg-blue-900/30' : 'bg-purple-900/30'} 
                                   border ${phase.status === 'completed' ? 'border-green-700/30' : phase.status === 'in-progress' ? 'border-blue-700/30' : 'border-purple-700/30'} 
                                   flex items-center justify-center z-10`}>
                      {phase.status === 'completed' ? (
                        <CheckCircle2 className="text-green-400" size={20} />
                      ) : phase.status === 'in-progress' ? (
                        <Rocket className="text-blue-400" size={20} />
                      ) : (
                        <Calendar className="text-purple-400" size={20} />
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-white">{phase.title}</h2>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(phase.status)}`}>
                        {phase.status === 'completed' ? 'Completed' : 
                          phase.status === 'in-progress' ? 'In Progress' : 'Planned'}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{phase.description}</p>
                    
                    <div className="space-y-4">
                      {phase.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="bg-dark-850/60 rounded-lg p-4 border border-slate-700/30 hover:border-slate-700/60 transition-colors">
                          <div className="flex gap-3 items-start">
                            <div className="mt-1 flex-shrink-0">
                              {phaseIndex === 0 ? (
                                <CheckCircle2 className="text-green-400" size={18} />
                              ) : phaseIndex === 1 ? (
                                <Circle className="text-blue-400" size={18} />
                              ) : (
                                <Circle className="text-purple-400" size={18} />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-200 mb-1">{item.title}</h3>
                              <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                              
                              {/* Expandable details */}
                              <div className="space-y-1 mt-2 pl-1 border-l-2 border-slate-700/40">
                                {item.details.map((detail, detailIndex) => (
                                  <div key={detailIndex} className="flex items-start gap-2 text-sm">
                                    <ChevronRight size={14} className="text-gray-500 mt-0.5" />
                                    <span className="text-gray-300">{detail}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional information section */}
          <div className="mt-10 bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">About Our Roadmap</h2>
            <p className="text-gray-300 mb-4">
              The WagerFi roadmap outlines our vision for creating the most comprehensive decentralized wagering platform on Solana. 
              Our timeline is approximate and subject to adjustment based on market conditions, technical challenges, and community feedback.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-dark-850 p-4 rounded-lg border border-slate-700/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary-900/20 rounded text-primary-400">
                    <Trophy size={18} />
                  </div>
                  <h3 className="font-medium text-gray-200">Sports Expansion</h3>
                </div>
                <p className="text-sm text-gray-400">
                  Adding boxing, tennis, and more sports categories through reliable API integrations.
                </p>
              </div>
              
              <div className="bg-dark-850 p-4 rounded-lg border border-slate-700/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-secondary-900/20 rounded text-secondary-400">
                    <DollarSign size={18} />
                  </div>
                  <h3 className="font-medium text-gray-200">$WAGER Token</h3>
                </div>
                <p className="text-sm text-gray-400">
                  Launch of our native token with utility for reduced fees and sweepstakes entries.
                </p>
              </div>
              
              <div className="bg-dark-850 p-4 rounded-lg border border-slate-700/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-900/20 rounded text-green-400">
                    <Bell size={18} />
                  </div>
                  <h3 className="font-medium text-gray-200">Notification System</h3>
                </div>
                <p className="text-sm text-gray-400">
                  Comprehensive alerts for all wager activity and important platform updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RoadmapPage;