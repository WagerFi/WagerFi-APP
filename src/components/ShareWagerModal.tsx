import React, { useRef, useState } from 'react';
import { Copy, Trophy, User, X, Download, Check } from 'lucide-react';
import { SportsWager, CryptoWager, isSportsWager, isCryptoWager } from '../lib/wagers';
import { getDisplayUsername } from '../lib/chat';
import html2canvas from 'html2canvas';
import { formatDateString } from '../utils/DateUtils';

interface ShareWagerModalProps {
  wager: SportsWager | CryptoWager;
  onClose: () => void;
}

const ShareWagerModal: React.FC<ShareWagerModalProps> = ({
  wager,
  onClose
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  
  // Check if this is a sports or crypto wager
  const isSports = isSportsWager(wager);
  const isCrypto = isCryptoWager(wager);
  
  // Determine if current user is the winner
  const isCreatorWinner = wager.winner_address === wager.creator_address;
  
  // Get team name and logo from snapshot data for sports wagers
  const getTeamName = (isCreator: boolean): string => {
    if (!isSports) return '';
    
    const sportWager = wager as SportsWager;
    if (isCreator) {
      return sportWager.creator_team_snapshot?.name || sportWager.creator_team_name || 'Team';
    } else {
      return sportWager.opponent_team_snapshot?.name || sportWager.opponent_team_name || 'Team';
    }
  };

  const getTeamLogo = (isCreator: boolean): string | undefined => {
    if (!isSports) return undefined;
    
    const sportWager = wager as SportsWager;
    if (isCreator) {
      return sportWager.creator_team_snapshot?.logo || sportWager.creator_team_logo;
    } else {
      return sportWager.opponent_team_snapshot?.logo || sportWager.opponent_team_logo;
    }
  };

  // Get crypto token details
  const getCryptoTokenName = (): string => {
    if (!isCrypto) return '';
    const cryptoWager = wager as CryptoWager;
    return cryptoWager.token_snapshot?.name || cryptoWager.token_name || 'Token';
  };

  const getCryptoTokenSymbol = (): string => {
    if (!isCrypto) return '';
    const cryptoWager = wager as CryptoWager;
    return cryptoWager.token_snapshot?.symbol || cryptoWager.token_symbol || '';
  };

  const getCryptoTokenLogo = (): string | undefined => {
    if (!isCrypto) return undefined;
    const cryptoWager = wager as CryptoWager;
    
    // Always use official Solana logo for SOL
    const tokenSymbol = (cryptoWager.token_snapshot?.symbol || cryptoWager.token_symbol || '').toLowerCase();
    if (tokenSymbol === 'sol') {
      return 'https://solana.com/src/img/branding/solanaLogoMark.svg';
    }
    
    if (cryptoWager.token_snapshot?.logo) return cryptoWager.token_snapshot.logo;
    return `https://s2.coinmarketcap.com/static/img/coins/64x64/${cryptoWager.token_id}.png`;
  };
  
  // Format currency with appropriate precision
  const formatCurrency = (value: number | undefined): string => {
    if (!value) return '$0.00';
    
    if (value >= 1) {
      return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
    } else if (value >= 0.01) {
      return `$${value.toLocaleString(undefined, { maximumFractionDigits: 4 })}`;
    } else {
      return `$${value.toLocaleString(undefined, { maximumFractionDigits: 8 })}`;
    }
  };

  const handleCopyImage = async () => {
    if (!cardRef.current) return;
    
    // Provide instant visual feedback
    setCopySuccess(true);
    
    try {
      // Wait for any images to load
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null, // Transparent background
        scale: 3, // Higher scale for better quality
        logging: false,
        allowTaint: true,
        useCORS: true,
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight,
        scrollX: 0,
        scrollY: 0,
        imageTimeout: 15000,
        removeContainer: true
      });
      
      canvas.toBlob((blob) => {
        if (!blob) return;
        
        // Create a ClipboardItem and copy to clipboard
        if (navigator.clipboard && navigator.clipboard.write) {
          const data = [new ClipboardItem({ 'image/png': blob })];
          navigator.clipboard.write(data).then(() => {
            console.log('Image copied to clipboard successfully');
            // Keep the success state for 2 seconds total
            setTimeout(() => setCopySuccess(false), 2000);
          }).catch(err => {
            console.error('Error copying image to clipboard:', err);
            downloadImage(canvas);
            setTimeout(() => setCopySuccess(false), 2000);
          });
        } else {
          downloadImage(canvas);
          setTimeout(() => setCopySuccess(false), 2000);
        }
      });
    } catch (err) {
      console.error('Error generating image:', err);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    
    // Provide instant visual feedback
    setDownloadSuccess(true);
    
    try {
      // Wait for any images to load
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null, // Transparent background
        scale: 3, // Higher scale for better quality
        logging: false,
        allowTaint: true,
        useCORS: true,
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight,
        scrollX: 0,
        scrollY: 0,
        imageTimeout: 15000,
        removeContainer: true
      });
      
      downloadImage(canvas);
      // Keep the success state for 2 seconds total
      setTimeout(() => setDownloadSuccess(false), 2000);
    } catch (err) {
      console.error('Error generating image:', err);
      setTimeout(() => setDownloadSuccess(false), 2000);
    }
  };
  
  const downloadImage = (canvas: HTMLCanvasElement) => {
    const link = document.createElement('a');
    link.download = `wagerfi-share-${wager.id.substring(0, 8)}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };
  
  const handleShareToX = () => {
    // Calculate the payout amount (winner gets double the wager amount)
    const payoutAmount = (wager.sol_amount * 2).toFixed(2);
        
    // Create the tweet text
    const tweetText = `Flex on em! I just won ${payoutAmount} SOL on @WagerDefi $WAGER. Bet Sports & Crypto at www.WagerFi.xyz`;
    
    // Encode the tweet text for URL
    const encodedTweetText = encodeURIComponent(tweetText);
    
    // Create the Twitter share URL
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTweetText}`;
    
    // Open Twitter in a new tab
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6 overflow-auto">
      <div className="max-w-md w-full flex flex-col bg-dark-850 rounded-lg overflow-hidden border border-slate-700/40">
        {/* Header with X button */}
        <div className="bg-gradient-to-r from-secondary-700 to-primary-700 p-3 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Share Your Wager</h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-indigo-100 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Shareable Card */}
        <div 
          ref={cardRef}
          className="bg-dark-900 rounded-xl border border-slate-700/60 overflow-hidden m-4"
          style={{ 
            fontFamily: 'system-ui, -apple-system, sans-serif',
            minWidth: '320px',
            maxWidth: '400px'
          }}
        >
          {/* Card Header */}
          <div className="bg-gradient-to-r from-secondary-800/90 to-primary-800/90 p-3 relative" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img 
                src="https://raw.githubusercontent.com/WagerFi/WagerFi/refs/heads/main/Logo.png" 
                alt="WagerFi Logo" 
                className="w-6 h-6 object-contain"
                style={{ imageRendering: 'auto', verticalAlign: 'middle' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="text-white font-bold text-sm" style={{ letterSpacing: '0.025em', lineHeight: '1.5', verticalAlign: 'middle' }}>Time to Flex!</span>
            </div>
            
            <span className="text-green-400 text-xs font-medium">Settled</span>
          </div>
          
          {/* Card Content */}
          <div className="p-4">
            {/* Main Info - Profile vs Profile */}
            <div className="mb-5 px-2" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              {/* Winner */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80px' }}>
                <div className="w-14 h-14 rounded-full bg-green-900/20 p-0.5 border border-green-700/30">
                  <div className="w-full h-full rounded-full bg-dark-800 overflow-hidden">
                    {(isCreatorWinner ? wager.creator_profile?.profile_image_url : wager.opponent_profile?.profile_image_url) ? (
                      <img 
                        src={(isCreatorWinner ? wager.creator_profile?.profile_image_url : wager.opponent_profile?.profile_image_url) || '/default-avatar.png'} 
                        alt="Winner" 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/default-avatar.png';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary-900/50 text-primary-300">
                        <User size={24} />
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-200 mt-1.5 block text-center">
                  {isCreatorWinner 
                    ? getDisplayUsername(wager.creator_profile?.username, wager.creator_address)
                    : getDisplayUsername(wager.opponent_profile?.username, wager.opponent_address || '')}
                </span>
                <span className="text-green-400 text-xs font-medium mt-1 block">Winner</span>
              </div>
              
              {/* VS */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1', padding: '0 16px' }}>
                                 <span className="text-gray-400 font-bold text-sm">VS</span>
                <div className="h-px w-8 bg-gray-700/50 mt-1"></div>
                                 <span className="text-primary-400 text-xs font-medium mt-2 block">{wager.sol_amount.toFixed(2)} SOL</span>
              </div>
              
              {/* Loser */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80px' }}>
                <div className="w-14 h-14 rounded-full bg-red-900/20 p-0.5 border border-red-700/30">
                  <div className="w-full h-full rounded-full bg-dark-800 overflow-hidden">
                    {(!isCreatorWinner ? wager.creator_profile?.profile_image_url : wager.opponent_profile?.profile_image_url) ? (
                      <img 
                        src={(!isCreatorWinner ? wager.creator_profile?.profile_image_url : wager.opponent_profile?.profile_image_url) || '/default-avatar.png'} 
                        alt="Loser" 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/default-avatar.png';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-secondary-900/50 text-secondary-300">
                        <User size={24} />
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-200 mt-1.5 block text-center">
                  {!isCreatorWinner 
                    ? getDisplayUsername(wager.creator_profile?.username, wager.creator_address)
                    : getDisplayUsername(wager.opponent_profile?.username, wager.opponent_address || '')}
                </span>
                <span className="text-red-400 text-xs font-medium mt-1 block">Loser</span>
              </div>
            </div>
            
            {/* Team/Token Section */}
            <div className="mt-4 bg-dark-800/80 rounded-lg p-3 border border-slate-700/40">
              {isSports ? (
                // Sports Wager Display
                <div className="flex items-start justify-between">
                  <div className="flex flex-col items-center min-h-[80px] w-20">
                    <div className="w-12 h-12 rounded-lg bg-dark-850/80 flex items-center justify-center overflow-hidden">
                      {getTeamLogo(true) ? (
                        <img 
                          src={getTeamLogo(true)} 
                          alt={getTeamName(true)}
                          className="w-10 h-10 object-contain" 
                          style={{ imageRendering: 'auto' }}
                        />
                      ) : (
                        <div className="w-10 h-10 flex items-center justify-center text-gray-400">
                          <span className="text-sm font-bold">T</span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs font-medium text-gray-300 mt-1 text-center w-full leading-tight break-words">
                      {getTeamName(true)}
                    </div>
                  </div>
                  
                  <div className="mt-6" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '1' }}>
                    <span className="text-xs text-primary-400 font-medium" style={{ textAlign: 'center' }}>vs</span>
                  </div>
                  
                  <div className="flex flex-col items-center min-h-[80px] w-20">
                    <div className="w-12 h-12 rounded-lg bg-dark-850/80 flex items-center justify-center overflow-hidden">
                      {getTeamLogo(false) ? (
                        <img 
                          src={getTeamLogo(false)} 
                          alt={getTeamName(false)}
                          className="w-10 h-10 object-contain" 
                          style={{ imageRendering: 'auto' }}
                        />
                      ) : (
                        <div className="w-10 h-10 flex items-center justify-center text-gray-400">
                          <span className="text-sm font-bold">T</span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs font-medium text-gray-300 mt-1 text-center w-full leading-tight break-words">
                      {getTeamName(false)}
                    </div>
                  </div>
                </div>
              ) : (
                // Crypto Wager Display
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-lg bg-dark-850/80 flex items-center justify-center overflow-hidden border border-slate-700/50 mb-2">
                    {getCryptoTokenLogo() ? (
                      <img 
                        src={getCryptoTokenLogo()} 
                        alt={getCryptoTokenSymbol()}
                        className="w-10 h-10 object-contain" 
                        style={{ imageRendering: 'auto' }}
                      />
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center text-blue-400">
                        <Bitcoin size={24} />
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-sm font-medium text-gray-200">{getCryptoTokenName()}</span>
                      <span className="text-xs text-gray-400">({getCryptoTokenSymbol()})</span>
                    </div>
                    
                    <p className="text-xs text-gray-300 mt-1">{wager.description}</p>
                    
                    {isCrypto && (wager as CryptoWager).target_price && (
                      <div className="inline-flex items-center mt-2 px-2 py-1 bg-dark-900/60 rounded text-xs">
                        <span className="text-gray-400">Target: </span>
                        <span className="ml-1 font-medium text-primary-400">
                          {formatCurrency((wager as CryptoWager).target_price)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Result Section */}
            <div className="mt-4 bg-dark-850 border border-slate-700/40 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Settled Date:</span>
                <span className="text-xs text-gray-300">{formatDateString(wager.resolved_at || '')}</span>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400">Payout:</span>
                <span className="text-sm font-medium text-green-400">
                  +{(wager.sol_amount * 2).toFixed(2)} SOL
                </span>
              </div>
            </div>
            
            {/* Logo and watermark */}
            <div className="mt-4 flex justify-between items-center">
              <div className="text-xs text-gray-500">
                WagerFi
              </div>
              
              <div className="text-xs text-gray-500">
                
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons - Now properly contained within the modal */}
        <div className="px-6 py-4 bg-dark-850 border-t border-slate-700/40">
          <div className="flex justify-between items-center gap-3">
            <button
              onClick={handleCopyImage}
              className={`flex items-center gap-2 px-3 py-2 border border-slate-700/40 rounded-lg transition-colors text-sm ${
                copySuccess 
                  ? 'bg-green-600 hover:bg-green-500 text-white' 
                  : 'bg-dark-800 hover:bg-dark-700 text-gray-300'
              }`}
            >
              {copySuccess ? <Check size={16} /> : <Copy size={16} />}
              <span>{copySuccess ? 'Copied!' : 'Copy'}</span>
            </button>
            
            <button
              onClick={handleDownloadImage}
              className={`flex items-center gap-2 px-3 py-2 border border-slate-700/40 rounded-lg transition-colors text-sm ${
                downloadSuccess 
                  ? 'bg-green-600 hover:bg-green-500 text-white' 
                  : 'bg-dark-800 hover:bg-dark-700 text-gray-300'
              }`}
            >
              {downloadSuccess ? <Check size={16} /> : <Download size={16} />}
              <span>{downloadSuccess ? 'Downloaded!' : 'Download'}</span>
            </button>
            
            <button
              onClick={handleShareToX}
              className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-secondary-600 to-primary-600 hover:from-secondary-500 hover:to-primary-500 text-white rounded-lg transition-colors text-sm"
            >
              
              <span>Share to</span>
              <TwitterXIcon size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareWagerModal;

// Bitcoin icon for crypto wagers
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

// Twitter/X icon for sharing
const TwitterXIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);