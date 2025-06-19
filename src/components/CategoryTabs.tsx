import React from 'react';
import { Trophy, Bitcoin, Gamepad2, Boxes } from 'lucide-react';

export type Category = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

export const CATEGORIES: Category[] = [
  {
    id: 'sports',
    name: 'Sports',
    icon: <Trophy size={18} className="text-amber-400" />
  },
  {
    id: 'crypto',
    name: 'Crypto',
    icon: <Bitcoin size={18} className="text-blue-400" />
  }
];

interface CategoryTabsProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="w-full mb-6">
      <div className="flex justify-center">
        <div className="inline-flex bg-dark-800/80 backdrop-blur-sm rounded-full p-1.5 border border-slate-700/40">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory.id === category.id
                  ? 'bg-gradient-to-r from-secondary-600 to-primary-600 text-white shadow'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-dark-850'
              }`}
              aria-pressed={selectedCategory.id === category.id}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;