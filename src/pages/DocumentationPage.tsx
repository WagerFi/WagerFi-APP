import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Book, 
  FileText, 
  Code, 
  ShieldCheck, 
  Wallet, 
  Search, 
  Zap, 
  DollarSign, 
  Award, 
  Clock,
  ChevronRight,
  ChevronDown,
  Info,
  Trophy,
  ArrowLeft
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Section component for each documentation section
interface DocSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const DocSection: React.FC<DocSectionProps> = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-dark-800/80 hover:bg-dark-800 border border-slate-700/40 rounded-xl mb-2"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-dark-850 rounded-lg flex items-center justify-center text-primary-400">
            {icon}
          </div>
          <span className="text-lg font-bold text-gray-200">{title}</span>
        </div>
        {isOpen ? (
          <ChevronDown size={20} className="text-gray-400" />
        ) : (
          <ChevronRight size={20} className="text-gray-400" />
        )}
      </button>
      
      {isOpen && (
        <div className="bg-dark-800/40 backdrop-blur-sm border border-slate-700/40 rounded-xl p-6 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
};

const DocumentationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    window.location.href = 'https://wagerfi.gitbook.io/wagerfi-docs';
  };

  // Automatically redirect to Gitbook docs
  React.useEffect(() => {
    handleRedirect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-dark-gradient">
      <Header />
      
      <main className="flex-1 pt-24 px-4 sm:px-6 md:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 px-3 py-2 bg-dark-800/80 hover:bg-dark-800 border border-slate-700/40 rounded-lg text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-secondary-400 to-primary-400">
              WagerFi Documentation
            </h1>
            <p className="text-lg text-gray-300">
              Redirecting to documentation...
            </p>
          </div>
          
          <div className="bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl p-6 mb-8 text-center">
            <p className="text-gray-300 mb-4">
              You are being redirected to the WagerFi documentation on GitBook.
            </p>
            
            <a 
              href="https://wagerfi.gitbook.io/wagerfi-docs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary-600 to-primary-600 hover:from-secondary-500 hover:to-primary-500 text-white rounded-lg shadow hover:shadow-glow transition-all"
            >
              <FileText size={18} />
              Go to Documentation
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DocumentationPage;