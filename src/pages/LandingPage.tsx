import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Wallet, 
  RefreshCw, 
  Trophy, 
  Clock, 
  ArrowRight, 
  Github, 
  X, 
  Layers, 
  DollarSign
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [imageLoadError, setImageLoadError] = useState(false);
  const [footerImageError, setFooterImageError] = useState(false);
  const [count, setCount] = useState(0);
  
  // Animation for the counter
  useEffect(() => {
    const interval = setInterval(() => {
      if (count < 5000) {
        setCount(prev => prev + Math.floor(Math.random() * 100));
      } else {
        clearInterval(interval);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary gradient orbs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary-600/20 to-primary-800/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-gradient-to-bl from-secondary-600/20 to-secondary-800/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-tr from-primary-600/15 to-secondary-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Secondary accent orbs */}
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-secondary-600/10 to-primary-600/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-l from-primary-600/15 to-secondary-600/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.02)_1px,transparent_0)] bg-[length:50px_50px]"></div>
      </div>

      {/* Navigation - Fades in after 2 seconds */}
      <nav className="fixed top-0 left-0 w-full z-50 py-3 px-4 sm:px-6 md:px-8 lg:px-12 transition-all duration-300 opacity-0 animate-[fadeInDelayed_1s_ease-in-out_2s_forwards]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-dark-900/80 backdrop-blur-xl border border-slate-700/40 rounded-xl px-4 py-2 shadow-xl">
            <div className="flex justify-between items-center">
              <Link to="/" className="flex items-center gap-2 text-secondary-400 hover:text-secondary-300 transition-colors group">
                {!imageLoadError ? (
                  <img 
                    src="https://raw.githubusercontent.com/WagerFi/WagerFi/refs/heads/main/Logo.png" 
                    alt="WagerFi Logo" 
                    className="w-12 h-12 group-hover:scale-105 transition-transform duration-300"
                    onError={() => setImageLoadError(true)}
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary-600/40 to-primary-600/40 rounded-full flex items-center justify-center border border-slate-600/40 group-hover:scale-105 transition-transform duration-300 backdrop-blur-sm">
                    <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary-400 to-primary-400">W</span>
                  </div>
                )}
                <span className="hidden sm:block text-xl titillium-web-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary-400 to-primary-400">
                  WagerFi
                </span>
              </Link>
              
              <div className="hidden md:flex items-center gap-6">
                <a href="#features" className="text-gray-300 hover:text-white transition-colors font-medium relative group px-3 py-1 rounded-lg hover:bg-white/5">
                  Features
                  <div className="absolute -bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-secondary-400 to-primary-400 group-hover:w-6 transition-all duration-300"></div>
                </a>
                <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors font-medium relative group px-3 py-1 rounded-lg hover:bg-white/5">
                  How It Works
                  <div className="absolute -bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-secondary-400 to-primary-400 group-hover:w-6 transition-all duration-300"></div>
                </a>
                <a href="#why-wagerfi" className="text-gray-300 hover:text-white transition-colors font-medium relative group px-3 py-1 rounded-lg hover:bg-white/5">
                  Why WagerFi
                  <div className="absolute -bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-secondary-400 to-primary-400 group-hover:w-6 transition-all duration-300"></div>
                </a>
              </div>
              
              <button 
                onClick={() => navigate('/wagers')}
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-secondary-600 to-primary-600 
                          hover:from-secondary-500 hover:to-primary-500 text-white font-semibold py-2 px-4 rounded-lg
                          shadow-lg hover:shadow-glow-strong transition-all duration-300 transform hover:-translate-y-0.5 relative overflow-hidden backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <Zap size={16} className="animate-pulse" />
                <span className="hidden md:inline text-sm">Launch App</span>
                <span className="md:hidden text-sm">App</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full Viewport */}
      <section className="relative h-screen flex flex-col items-center justify-center">
        {/* Centered WagerFi Logo */}
        <div className="flex flex-col items-center justify-center z-20">
          <div className="relative mb-16">
            {/* Seamless Ripple/Shockwave Background Effects - Behind Logo */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
              {/* Single seamless ripple with continuous flow */}
              <div className="absolute w-[200vw] h-[200vh] -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-primary-400/20 via-secondary-500/15 via-primary-600/10 via-secondary-700/8 to-primary-900/5 rounded-full blur-3xl animate-[seamlessRipple_6s_ease-in-out_infinite] shadow-[0_0_400px_rgba(99,102,241,0.2)]"></div>
              
              {/* Secondary ripple for depth */}
              <div className="absolute w-[150vw] h-[150vh] -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-secondary-400/15 via-primary-500/10 via-secondary-600/8 to-primary-800/3 rounded-full blur-2xl animate-[seamlessRipple_6s_ease-in-out_infinite] shadow-[0_0_300px_rgba(139,92,246,0.15)]" style={{ animationDelay: '2s' }}></div>
              
              {/* Core glow */}
              <div className="absolute w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-primary-300/25 via-secondary-400/15 to-transparent rounded-full blur-lg animate-[seamlessRipple_6s_ease-in-out_infinite] shadow-[0_0_150px_rgba(99,102,241,0.3)]" style={{ animationDelay: '4s' }}></div>
            </div>
            
            {/* WagerFi Logo - Static and Prominent */}
            <div className="relative z-10">
              <img 
                src="https://raw.githubusercontent.com/WagerFi/WagerFi/refs/heads/main/Logo.png" 
                alt="WagerFi Logo" 
                className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-contain drop-shadow-2xl filter brightness-110 contrast-110"
              />
            </div>
          </div>

          {/* Launch App Button - Fades in after 2 seconds */}
          <div className="opacity-0 animate-[fadeInDelayed_1s_ease-in-out_2s_forwards]">
            <button
              onClick={() => navigate('/wagers')}
              className="group flex items-center justify-center gap-3 bg-gradient-to-r from-secondary-600 to-primary-600 
                        hover:from-secondary-500 hover:to-primary-500 text-white font-bold py-6 px-12 rounded-2xl
                        shadow-2xl hover:shadow-glow-strong transform hover:-translate-y-2 transition-all duration-500
                        focus:outline-none focus:ring-4 focus:ring-secondary-500/50 text-xl relative overflow-hidden backdrop-blur-sm
                        border border-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <Zap size={24} className="animate-pulse" />
              Launch App
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </section>

      {/* Main Content Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2 flex flex-col items-start space-y-8">
              
                              <h1 className="text-4xl sm:text-5xl md:text-6xl titillium-web-bold leading-tight text-white">
                  <span className="block mb-3">The Future of</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary-400 via-primary-400 to-secondary-400 bg-size-200 animate-gradient">
                    Decentralized Wagering
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl titillium-web-regular text-gray-300 leading-relaxed max-w-2xl">
                  Peer-to-peer bets on sports and crypto prices secured by smart contracts. 
                  <span className="text-primary-400 titillium-web-semibold"> No bookmakers, no custody of funds</span>, just pure decentralized betting.
                </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <button
                  onClick={() => navigate('/wagers')}
                  className="group flex items-center justify-center gap-2 bg-gradient-to-r from-secondary-600 to-primary-600 
                            hover:from-secondary-500 hover:to-primary-500 text-white titillium-web-semibold py-4 px-8 rounded-xl
                            shadow-xl hover:shadow-glow-strong transform hover:-translate-y-1 transition-all duration-300
                            focus:outline-none focus:ring-2 focus:ring-secondary-500/50 text-lg relative overflow-hidden backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <Zap size={20} className="animate-pulse" />
                  Get Started
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <a 
                  href="#how-it-works"
                  className="group flex items-center justify-center gap-2 bg-gradient-to-r from-dark-800/70 to-dark-850/70 hover:from-dark-700/80 hover:to-dark-800/80 border border-slate-600/50
                            hover:border-slate-500/70 text-gray-300 hover:text-white titillium-web-regular py-4 px-8 rounded-xl 
                            transition-all duration-300 text-lg backdrop-blur-xl shadow-lg hover:shadow-glow transform hover:-translate-y-1"
                >
                  Learn More
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              
              <div className="grid grid-cols-3 gap-6 pt-12 w-full">
                <div className="text-center group p-4 rounded-xl bg-gradient-to-br from-dark-800/30 to-dark-850/30 backdrop-blur-sm border border-slate-700/30 hover:border-primary-500/40 transition-all duration-300 hover:-translate-y-1">
                  <div className="titillium-web-bold text-2xl text-white group-hover:text-primary-400 transition-colors duration-300 mb-1">
                    {count.toLocaleString()}+
                  </div>
                  <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors titillium-web-extralight">Wagers Placed</div>
                </div>
                <div className="text-center group p-4 rounded-xl bg-gradient-to-br from-dark-800/30 to-dark-850/30 backdrop-blur-sm border border-slate-700/30 hover:border-secondary-500/40 transition-all duration-300 hover:-translate-y-1">
                  <div className="titillium-web-bold text-2xl text-white group-hover:text-secondary-400 transition-colors duration-300 mb-1">
                    ${(count * 75).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors titillium-web-extralight">Total Volume</div>
                </div>
                <div className="text-center group p-4 rounded-xl bg-gradient-to-br from-dark-800/30 to-dark-850/30 backdrop-blur-sm border border-slate-700/30 hover:border-primary-500/40 transition-all duration-300 hover:-translate-y-1">
                  <div className="titillium-web-bold text-2xl text-white group-hover:text-primary-400 transition-colors duration-300 mb-1">
                    100%
                  </div>
                  <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors titillium-web-extralight">Decentralized</div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="backdrop-blur-xl border border-slate-600/30 rounded-3xl overflow-hidden shadow-2xl p-3">
                <div className="backdrop-blur-sm rounded-2xl p-6 space-y-6 border border-slate-700/30">
                  {/* Sports Wager Card */}
                  <div className="backdrop-blur-sm border border-slate-600/40 rounded-xl p-6 hover:border-slate-500/60 transition-all duration-300 group shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-600/20 to-primary-800/20 rounded-lg flex items-center justify-center border border-primary-600/30">
                          <img 
                            src="https://media-4.api-sports.io/football/leagues/2.png" 
                            alt="UEFA Champions League" 
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 uppercase tracking-wide">Featured Wager</div>
                          <div className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors">Champions League Final</div>
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-green-900/40 text-green-400 rounded-full text-sm font-semibold border border-green-700/40 backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          Open
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex flex-col items-center group/team">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-600/40 group-hover/team:border-primary-500/60 transition-colors">
                          <img 
                            src="https://media-4.api-sports.io/football/teams/50.png"
                            alt="Team 1"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="mt-2 text-sm font-medium text-gray-300 group-hover/team:text-white transition-colors">Man City</span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="px-4 py-2 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 text-primary-400 rounded-full text-lg font-bold border border-primary-600/40 backdrop-blur-sm mb-3">
                          VS
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-sm">
                          <Clock size={12} className="text-gray-400" />
                          <span className="text-xs text-gray-400">May 31, 2025</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center group/team">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-600/40 group-hover/team:border-secondary-500/60 transition-colors">
                          <img 
                            src="https://media-4.api-sports.io/football/teams/541.png"
                            alt="Team 2"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="mt-2 text-sm font-medium text-gray-300 group-hover/team:text-white transition-colors">Real Madrid</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center rounded-lg p-4 backdrop-blur-sm border border-slate-700/30">
                      <div className="flex items-center gap-3">
                        <img 
                          src="https://solana.com/src/img/branding/solanaLogoMark.svg"
                          alt="Solana"
                          className="w-6 h-6"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <span className="font-bold text-xl text-primary-400">3.5 SOL</span>
                      </div>
                      
                      <button className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-glow transition-all duration-300 transform hover:-translate-y-0.5">
                        Take Wager
                      </button>
                    </div>
                  </div>
                  
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-600/60 to-transparent"></div>
                  
                  {/* Crypto Wager Card */}
                  <div className="backdrop-blur-sm border border-slate-600/40 rounded-xl p-6 hover:border-slate-500/60 transition-all duration-300 group shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-lg flex items-center justify-center border border-orange-500/30">
                          <img 
                            src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                            alt="Bitcoin"
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 uppercase tracking-wide">Crypto Prediction</div>
                          <div className="text-lg font-bold text-white group-hover:text-secondary-400 transition-colors">Bitcoin Price</div>
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-green-900/40 text-green-400 rounded-full text-sm font-semibold border border-green-700/40 backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          Open
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5 rounded-lg border border-slate-700/30 mb-6 backdrop-blur-sm">
                      <p className="text-base text-gray-300 leading-relaxed">
                        Bitcoin (BTC) will reach or exceed <span className="text-primary-400 font-bold">$120,000</span> before June 30, 2025
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center rounded-lg p-4 backdrop-blur-sm border border-slate-700/30">
                      <div className="flex items-center gap-3">
                        <img 
                          src="https://solana.com/src/img/branding/solanaLogoMark.svg"
                          alt="Solana"
                          className="w-6 h-6"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <span className="titillium-web-bold text-xl text-primary-400">2.0 SOL</span>
                      </div>
                      
                      <button className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white titillium-web-semibold rounded-lg shadow-lg hover:shadow-glow transition-all duration-300 transform hover:-translate-y-0.5">
                        Take Wager
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Scroll indicator - Centered in its own container */}
      <div className="relative z-30 mt-20">
        <div className="flex flex-col items-center justify-center animate-bounce">
          <span className="text-sm text-gray-400 mb-4 titillium-web-extralight text-center">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-400/60 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-1 h-3 bg-gradient-to-b from-secondary-400 to-primary-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-32 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 backdrop-blur-xl border border-slate-600/30 rounded-full mb-8 shadow-lg">
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
              <span className="text-sm titillium-web-extralight text-gray-300">Why Choose WagerFi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl titillium-web-bold text-white mb-6">
              Reimagining Wagers with 
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-secondary-400 via-primary-400 to-secondary-400">
                Web3 Technology
              </span>
            </h2>
            <p className="text-lg titillium-web-regular text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Built on Solana's ultra-fast blockchain, WagerFi offers a transparent, secure platform for peer-to-peer betting without intermediaries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <div className="backdrop-blur-xl border border-slate-600/40 p-8 rounded-2xl shadow-2xl group hover:border-slate-500/60 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-600/30 to-secondary-800/30 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 border border-secondary-600/20">
                <ShieldCheck size={32} className="text-secondary-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-secondary-400 transition-colors">Smart Contract Escrow</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Funds are secured in tamper-proof Solana smart contracts, ensuring neither party can access the funds until the event concludes with verified results.
              </p>
              <div className="mt-6 flex items-center text-secondary-400 font-medium group-hover:text-secondary-300 transition-colors">
                <span className="text-sm">100% Secure</span>
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            
            <div className="backdrop-blur-xl border border-slate-600/40 p-8 rounded-2xl shadow-2xl group hover:border-slate-500/60 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600/30 to-primary-800/30 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 border border-primary-600/20">
                <RefreshCw size={32} className="text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary-400 transition-colors">Real-Time Results</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Our API feeds provide real-time, tamper-proof data feeds from trusted sources for both sports events and cryptocurrency prices.
              </p>
              <div className="mt-6 flex items-center text-primary-400 font-medium group-hover:text-primary-300 transition-colors">
                <span className="text-sm">Always Updated</span>
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            
            <div className="backdrop-blur-xl border border-slate-600/40 p-8 rounded-2xl shadow-2xl group hover:border-slate-500/60 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-600/30 to-secondary-800/30 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 border border-secondary-600/20">
                <Wallet size={32} className="text-secondary-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-secondary-400 transition-colors">Instant Payouts</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                When an event concludes, winners receive their payouts instantly to their Solana wallet—no withdrawal requests, no waiting periods.
              </p>
              <div className="mt-6 flex items-center text-secondary-400 font-medium group-hover:text-secondary-300 transition-colors">
                <span className="text-sm">Lightning Fast</span>
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
          
          {/* Enhanced stats section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-600/10 via-primary-600/10 to-secondary-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative border border-slate-600/50 rounded-3xl p-10 sm:p-12 shadow-2xl backdrop-blur-xl">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="text-center group">
                  <div className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary-400 to-primary-400 mb-3 group-hover:scale-110 transition-transform duration-300">
                    100%
                  </div>
                  <p className="text-lg text-gray-300 font-medium group-hover:text-white transition-colors">Decentralized</p>
                  <p className="text-sm text-gray-500 mt-1">No middlemen</p>
                </div>
                
                <div className="text-center group">
                  <div className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400 mb-3 group-hover:scale-110 transition-transform duration-300">
                    Fast
                  </div>
                  <p className="text-lg text-gray-300 font-medium group-hover:text-white transition-colors">Settlement</p>
                  <p className="text-sm text-gray-500 mt-1">Instant payouts</p>
                </div>
                
                <div className="text-center group">
                  <div className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400 mb-3 group-hover:scale-110 transition-transform duration-300">
                    24/7
                  </div>
                  <p className="text-lg text-gray-300 font-medium group-hover:text-white transition-colors">Available</p>
                  <p className="text-sm text-gray-500 mt-1">Always open</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 relative z-20 border-y border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-sm border border-slate-700/40 rounded-full mb-6">
              <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-300">Simple Process</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              How <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary-400 via-primary-400 to-secondary-400">WagerFi</span> Works
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Creating and accepting wagers on WagerFi is simple, transparent, and secure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="backdrop-blur-sm border border-slate-700/40 p-8 rounded-2xl relative group hover:shadow-2xl hover:border-slate-600/60 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-secondary-600/80 to-primary-600/80 rounded-full flex items-center justify-center text-white font-bold text-lg border border-slate-600/40 shadow-lg">
                1
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-secondary-800/60 to-primary-800/60 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Search className="text-primary-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary-400 transition-colors">Select Event</h3>
              <p className="text-gray-400 text-lg leading-relaxed">Find a sports event or create a crypto price prediction that interests you.</p>
              
              {/* Enhanced connector line */}
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-slate-700/60 to-transparent"></div>
              <div className="hidden md:block absolute top-1/2 -right-2 w-2 h-2 bg-primary-400/60 rounded-full"></div>
            </div>
            
            <div className="bg-dark-850/80 backdrop-blur-sm border border-slate-700/40 p-8 rounded-2xl relative group hover:shadow-2xl hover:border-slate-600/60 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-secondary-600/80 to-primary-600/80 rounded-full flex items-center justify-center text-white font-bold text-lg border border-slate-600/40 shadow-lg">
                2
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-secondary-800/60 to-primary-800/60 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Layers className="text-primary-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-secondary-400 transition-colors">Create Wager</h3>
              <p className="text-gray-400 text-lg leading-relaxed">Set your terms and stake the amount of SOL you want to wager.</p>
              
              {/* Enhanced connector line */}
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-slate-700/60 to-transparent"></div>
              <div className="hidden md:block absolute top-1/2 -right-2 w-2 h-2 bg-secondary-400/60 rounded-full"></div>
            </div>
            
            <div className="bg-dark-850/80 backdrop-blur-sm border border-slate-700/40 p-8 rounded-2xl relative group hover:shadow-2xl hover:border-slate-600/60 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-secondary-600/80 to-primary-600/80 rounded-full flex items-center justify-center text-white font-bold text-lg border border-slate-600/40 shadow-lg">
                3
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-secondary-800/60 to-primary-800/60 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Handshake className="text-primary-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary-400 transition-colors">Get Matched</h3>
              <p className="text-gray-400 text-lg leading-relaxed">Another user accepts your wager and matches your stake in the escrow contract.</p>
              
              {/* Enhanced connector line */}
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-slate-700/60 to-transparent"></div>
              <div className="hidden md:block absolute top-1/2 -right-2 w-2 h-2 bg-primary-400/60 rounded-full"></div>
            </div>
            
            <div className="bg-dark-850/80 backdrop-blur-sm border border-slate-700/40 p-8 rounded-2xl relative group hover:shadow-2xl hover:border-slate-600/60 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-green-600/80 to-emerald-600/80 rounded-full flex items-center justify-center text-white font-bold text-lg border border-green-600/40 shadow-lg">
                4
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-green-800/60 to-emerald-800/60 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="text-green-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-green-400 transition-colors">Get Paid</h3>
              <p className="text-gray-400 text-lg leading-relaxed">When the event concludes, the winner receives the wagered amount instantly.</p>
            </div>
          </div>
          
          {/* Enhanced additional explanation */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/5 via-secondary-600/5 to-primary-600/5 rounded-3xl blur-2xl"></div>
            <div className="relative bg-dark-800/80 backdrop-blur-sm border border-slate-700/50 p-10 sm:p-12 rounded-3xl text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary-800/60 to-primary-800/60 rounded-2xl flex items-center justify-center">
                  <ShieldCheck size={32} className="text-primary-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Contract Security</h3>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                WagerFi's smart contracts automatically handle all aspects of the wagering process. Funds remain in escrow until the event concludes, and results are verified through trusted API feeds for maximum security and fairness.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why WagerFi Section */}
      <section id="why-wagerfi" className="py-24 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl sm:text-4xl titillium-web-bold text-gray-100 mb-6">
                Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary-400 to-primary-400">WagerFi</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary-900/30 rounded-lg flex items-center justify-center">
                    <ShieldCheck size={24} className="text-secondary-400" />
                  </div>
                  <div>
                    <h3 className="text-xl titillium-web-bold text-gray-200 mb-2">True Ownership</h3>
                    <p className="titillium-web-regular text-gray-400">Your funds always remain in your control until a wager is matched. No deposits to centralized platforms.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary-900/30 rounded-lg flex items-center justify-center">
                    <Lock size={24} className="text-secondary-400" />
                  </div>
                  <div>
                    <h3 className="text-xl titillium-web-bold text-gray-200 mb-2">Provably Fair</h3>
                    <p className="titillium-web-regular text-gray-400">All outcomes are determined by verifiable, tamper-proof API feeds and transactions recorded on the blockchain.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-900/30 rounded-lg flex items-center justify-center">
                    <Globe size={24} className="text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-xl titillium-web-bold text-gray-200 mb-2">Global Access</h3>
                    <p className="titillium-web-regular text-gray-400">Connect with users worldwide - bet on any sport, any crypto, anytime.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 relative">
              <div className="bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl p-8 relative shadow-glow">
                <div className="grid grid-cols-1 gap-8">
                  {/* Traditional Betting vs WagerFi Comparison */}
                  <div>
                    <h3 className="text-xl titillium-web-bold text-center text-gray-100 mb-6">Traditional Betting vs WagerFi</h3>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 text-sm">
                        <div className="titillium-web-extralight text-gray-400">Feature</div>
                        <div className="titillium-web-extralight text-gray-400 text-center">Traditional</div>
                        <div className="text-primary-400 text-center titillium-web-semibold">WagerFi</div>
                      </div>
                      
                      <div className="w-full h-px bg-slate-700/40"></div>
                      
                      <div className="grid grid-cols-3 text-sm">
                        <div className="titillium-web-regular text-gray-300">Custody of Funds</div>
                        <div className="titillium-web-extralight text-center">Platform holds</div>
                        <div className="titillium-web-regular text-center text-green-400">Smart contract escrow</div>
                      </div>
                      
                      <div className="grid grid-cols-3 text-sm">
                        <div className="titillium-web-regular text-gray-300">Platform Fees</div>
                        <div className="titillium-web-extralight text-center">5-10%</div>
                        <div className="titillium-web-regular text-center text-green-400">4%</div>
                      </div>
                      
                      <div className="grid grid-cols-3 text-sm">
                        <div className="titillium-web-regular text-gray-300">Payout Speed</div>
                        <div className="titillium-web-extralight text-center">Hours to days</div>
                        <div className="titillium-web-regular text-center text-green-400">Instant</div>
                      </div>
                      
                      <div className="grid grid-cols-3 text-sm">
                        <div className="titillium-web-regular text-gray-300">Transparency</div>
                        <div className="titillium-web-extralight text-center">Limited</div>
                        <div className="titillium-web-regular text-center text-green-400">100% on-chain</div>
                      </div>
                      
                      <div className="grid grid-cols-3 text-sm">
                        <div className="titillium-web-regular text-gray-300">KYC Required</div>
                        <div className="titillium-web-extralight text-center">Yes</div>
                        <div className="titillium-web-regular text-center text-green-400">No</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-600/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-secondary-600/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Types of Bets Section */}
      <section className="py-24 relative z-20 bg-dark-900/50 border-y border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl titillium-web-bold text-gray-100 bg-clip-text text-transparent bg-gradient-to-r from-secondary-400 to-primary-400">
              What You Can Bet On
            </h2>
            <p className="mt-4 text-lg titillium-web-regular text-gray-300 max-w-3xl mx-auto">
              WagerFi supports a wide range of wager types across multiple categories, all secured by blockchain technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sports Card */}
            <div className="bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl overflow-hidden group hover:shadow-glow transition-all duration-300">
              <div className="h-48 relative overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Sports wagering"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <h3 className="text-2xl titillium-web-bold text-white">Sports Wagers</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary-900/40 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Trophy size={14} className="text-secondary-400" />
                    </div>
                    <p className="titillium-web-regular text-gray-300">Bet on team victories across major sports including NFL, NBA, MLB, NHL, Soccer, and MMA</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary-900/40 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Trophy size={14} className="text-secondary-400" />
                    </div>
                    <p className="titillium-web-regular text-gray-300">All major leagues covered with real-time data feeds</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary-900/40 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Trophy size={14} className="text-secondary-400" />
                    </div>
                    <p className="titillium-web-regular text-gray-300">Peer-to-peer bets with no bookmaker margins</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => navigate('/search')}
                  className="mt-6 w-full py-3 bg-dark-850 border border-slate-700/40 rounded-lg text-secondary-400 hover:text-secondary-300 titillium-web-regular transition-colors flex items-center justify-center gap-2"
                >
                  Explore Sports Wagers
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
            
            {/* Crypto Card */}
            <div className="bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl overflow-hidden group hover:shadow-glow transition-all duration-300">
              <div className="h-48 relative overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/843700/pexels-photo-843700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Crypto wagering"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <h3 className="text-2xl titillium-web-bold text-white">Crypto Predictions</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary-900/40 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Bitcoin size={14} className="text-primary-400" />
                    </div>
                    <p className="titillium-web-regular text-gray-300">Predict price movements of Bitcoin, Ethereum, Solana and thousands of other cryptocurrencies</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary-900/40 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Bitcoin size={14} className="text-primary-400" />
                    </div>
                    <p className="titillium-web-regular text-gray-300">Set price targets with specific deadlines for precise predictions</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary-900/40 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Bitcoin size={14} className="text-primary-400" />
                    </div>
                    <p className="titillium-web-regular text-gray-300">Oracle-verified price feeds ensure fair and accurate settlement</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => navigate('/search')}
                  className="mt-6 w-full py-3 bg-dark-850 border border-slate-700/40 rounded-lg text-primary-400 hover:text-primary-300 titillium-web-regular transition-colors flex items-center justify-center gap-2"
                >
                  Explore Crypto Wagers
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto relative">
          <div className="bg-gradient-to-r from-secondary-900/90 via-primary-900/90 to-secondary-900/90 rounded-2xl overflow-hidden shadow-glow border border-slate-700/40">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary-600/10 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 -right-24 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-secondary-600/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative p-10 sm:p-16 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl titillium-web-bold text-white mb-6">
                Ready to Experience the <span className="text-primary-300">Future of Wagering</span>?
              </h2>
              <p className="text-lg titillium-web-regular text-gray-200 max-w-3xl mx-auto mb-10">
                Join thousands of users already making peer-to-peer wagers on sports and crypto with complete security, transparency, and instant payouts.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/wagers')}
                  className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-primary-700
                            titillium-web-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-glow transform 
                            hover:-translate-y-0.5 transition-all duration-200 text-lg"
                >
                  <Zap size={20} />
                  Launch App
                </button>
                
                <button
                  onClick={() => window.open('https://github.com/wagerfi', '_blank')}
                  className="flex items-center justify-center gap-2 bg-dark-850/60 hover:bg-dark-850 
                            text-gray-200 titillium-web-regular py-4 px-8 rounded-xl border border-slate-700/40
                            transition-colors text-lg"
                >
                  <Github size={20} />
                  View on GitHub
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-dark-950 py-16 border-t border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 text-secondary-400 mb-4">
                {!footerImageError ? (
                  <img 
                    src="https://raw.githubusercontent.com/WagerFi/WagerFi/refs/heads/main/Logo.png" 
                    alt="WagerFi Logo" 
                    className="w-8 h-8"
                    onError={() => setFooterImageError(true)}
                  />
                ) : (
                  <div className="w-8 h-8 bg-secondary-900/50 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">W</span>
                  </div>
                )}
                <span className="text-xl titillium-web-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary-400 to-primary-400">
                  WagerFi
                </span>
              </div>
              <p className="titillium-web-regular text-gray-400 text-sm mb-6">
                The decentralized platform for peer-to-peer wagering on sports and crypto, built on Solana.
              </p>
              
              <div className="flex gap-4">
                <a href="https://x.com/WagerDefi" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-dark-900 rounded-full flex items-center justify-center text-gray-400 hover:text-primary-400 transition-colors">
                  <X size={18} />
                </a>
                <a href="https://discord.com" className="w-9 h-9 bg-dark-900 rounded-full flex items-center justify-center text-gray-400 hover:text-primary-400 transition-colors">
                  <DiscordIcon size={18} />
                </a>
                <a href="https://github.com" className="w-9 h-9 bg-dark-900 rounded-full flex items-center justify-center text-gray-400 hover:text-primary-400 transition-colors">
                  <Github size={18} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="titillium-web-semibold text-gray-200 mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="titillium-web-extralight text-gray-400 hover:text-primary-400 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="titillium-web-extralight text-gray-400 hover:text-primary-400 transition-colors">How It Works</a></li>
                <li><a href="#why-wagerfi" className="titillium-web-extralight text-gray-400 hover:text-primary-400 transition-colors">Why WagerFi</a></li>
                <li><a href="/wagers" className="titillium-web-extralight text-gray-400 hover:text-primary-400 transition-colors">All Wagers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="titillium-web-semibold text-gray-200 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://wagerfi.gitbook.io/wagerfi-docs" target="_blank" rel="noopener noreferrer" className="titillium-web-extralight text-gray-400 hover:text-primary-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="titillium-web-extralight text-gray-400 hover:text-primary-400 transition-colors">FAQ</a></li>
                <li><a href="#" className="titillium-web-extralight text-gray-400 hover:text-primary-400 transition-colors">Blog</a></li>
                <li><a href="#" className="titillium-web-extralight text-gray-400 hover:text-primary-400 transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="titillium-web-semibold text-gray-200 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="titillium-web-extralight text-gray-400 hover:text-primary-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="titillium-web-extralight text-gray-400 hover:text-primary-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="titillium-web-extralight text-gray-400 hover:text-primary-400 transition-colors">Responsible Wagering</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800/40 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="titillium-web-extralight text-gray-500 text-sm">
              © 2025 WagerFi. All rights reserved.
            </p>
            
            <p className="text-gray-500 text-sm">
              
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Custom icons
const Search = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const Handshake = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
    <path d="M12 5.36V8"></path>
    <path d="M12 11v3"></path>
    <path d="M12 16v2.64"></path>
  </svg>
);

const Lock = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const Globe = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const Bitcoin = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 5.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"></path>
  </svg>
);

const DiscordIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="9" cy="12" r="1"></circle>
    <circle cx="15" cy="12" r="1"></circle>
    <path d="M7.5 7.2c.5-.7 1.3-1.4 2.2-1.8C11.3 4.8 12.7 4.7 14 5c1.3.3 2.5.8 3.5 1.6.8.7 1.7 1.4 2 2.4"></path>
    <path d="M7 16.8c.5.7 1.3 1.4 2.2 1.8 1.5.5 3.1.5 4.6 0 1.3-.5 2.5-1.2 3.5-2.1.8-.8 1.7-1.6 2-2.5"></path>
    <path d="M15.5 17.2c-1 .8-2.1 1.3-3.5 1.5-1.3.2-2.7.1-4-.3-1.3-.4-2.5-1.2-3.5-2.1-.8-.8-1.7-1.6-2-2.5"></path>
    <path d="M8.5 7c-1 .8-1.9 1.7-2.5 2.8-.7 1.1-1.2 2.3-1.5 3.5-.3 1.3-.4 2.7 0 4 .4 1.3 1 2.5 2 3.5.8.8 1.7 1.7 2.8 2.3"></path>
    <path d="M16.5 7c.5.3 1 .6 1.5 1 1 .8 1.9 1.7 2.5 2.8.6 1.1 1.1 2.3 1.4 3.5.3 1.3.2 2.7-.2 4-.4 1.3-1.1 2.5-2 3.5-.8.8-1.7 1.7-2.7 2.2"></path>
  </svg>
);

export default LandingPage;