import React from 'react';
import { Dumbbell, Pocket as Hockey } from 'lucide-react';
import { Football, SoccerBall, DribbbleLogo, Baseball } from 'phosphor-react';

export interface Sport {
  id: string;
  name: string;
  icon: React.ReactNode;
  endpoint: string;
  apiBase?: string;
}

export const SPORTS: Sport[] = [
  {
    id: 'soccer',
    name: 'Football (Soccer)',
    icon: <SoccerBall size={18} weight="fill" className="text-green-400" />,
    endpoint: 'leagues'
  },
  {
    id: 'basketball',
    name: 'NBA',
    icon: <DribbbleLogo size={18} weight="fill" className="text-orange-400" />,
    endpoint: 'leagues'
  },
  {
    id: 'baseball',
    name: 'MLB',
    icon: <Baseball size={18} weight="fill" className="text-red-400" />,
    endpoint: 'leagues'
  },
  {
    id: 'american-football',
    name: 'NFL',
    icon: <Football size={18} weight="fill" className="text-amber-400" />,
    endpoint: 'leagues'
  },
  {
    id: 'hockey',
    name: 'NHL',
    icon: <Hockey size={18} className="text-blue-400" />,
    endpoint: 'hockey-api',
    apiBase: 'teams'
  },
  {
    id: 'mma',
    name: 'MMA',
    icon: <Dumbbell size={18} className="text-purple-400" />,
    endpoint: 'leagues'
  }
];

interface SportSelectorProps {
  selectedSport: Sport;
  onSelectSport: (sport: Sport) => void;
}

const SportSelector: React.FC<SportSelectorProps> = ({ selectedSport, onSelectSport }) => {
  return (
    <div className="w-full">
      <h3 className="text-md font-medium text-gray-300 mb-3">Select Sport</h3>
      <div className="flex flex-wrap gap-2 justify-center">
        {SPORTS.map((sport) => (
          <button
            key={sport.id}
            onClick={() => onSelectSport(sport)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedSport.id === sport.id
                ? 'bg-gradient-to-r from-secondary-700 to-primary-700 text-white shadow-md'
                : 'bg-dark-800/60 hover:bg-dark-800 text-gray-300 hover:text-gray-100 border border-slate-700/40'
            }`}
            aria-pressed={selectedSport.id === sport.id}
          >
            {sport.icon}
            <span>{sport.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SportSelector;