import { useState } from 'react';

interface Capability {
  name: string;
  level: number;
  category: 'technical' | 'ai' | 'leadership' | 'domain';
  description: string;
  years?: number;
  tags?: string[];
}

interface CapabilityMatrixProps {
  capabilities?: Capability[];
}

// Minimal fallback for when no capabilities are provided
const defaultCapabilities: Capability[] = [
  { name: 'No capabilities loaded', level: 1, category: 'technical', description: 'Please check content configuration' },
];

const categoryColors = {
  technical: 'blue',
  ai: 'purple',
  leadership: 'green',
  domain: 'orange',
};

const categoryNames = {
  technical: 'Technical Foundation',
  ai: 'AI Integration',
  leadership: 'Leadership & Collaboration',
  domain: 'Domain Expertise',
};

export default function CapabilityMatrix({ capabilities = defaultCapabilities }: CapabilityMatrixProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredCapability, setHoveredCapability] = useState<string | null>(null);

  const filteredCapabilities = selectedCategory
    ? capabilities.filter((cap: Capability) => cap.category === selectedCategory)
    : capabilities;

  const renderSkillLevel = (level: number, color: string) => {
    const colorMap = {
      blue: {
        active: 'bg-blue-500',
        inactive: 'bg-blue-200 dark:bg-blue-800'
      },
      purple: {
        active: 'bg-purple-500',
        inactive: 'bg-purple-200 dark:bg-purple-800'
      },
      green: {
        active: 'bg-green-500',
        inactive: 'bg-green-200 dark:bg-green-800'
      },
      orange: {
        active: 'bg-orange-500',
        inactive: 'bg-orange-200 dark:bg-orange-800'
      }
    };

    const colors = colorMap[color as keyof typeof colorMap] || colorMap.blue;

    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((dot) => (
          <span
            key={dot}
            className={`w-3 h-3 rounded-full ${
              dot <= level ? colors.active : colors.inactive
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === null
              ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          All Capabilities
        </button>
          {Object.entries(categoryNames).map(([key, name]) => {
            const colorMap = {
              technical: 'bg-blue-600',
              ai: 'bg-purple-600',
              leadership: 'bg-green-600',
              domain: 'bg-orange-600'
            };

            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === key
                    ? `${colorMap[key as keyof typeof colorMap]} text-white`
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {name}
              </button>
            );
          })}
      </div>

      {/* Capabilities Grid */}
      <div className="grid gap-4">
        {filteredCapabilities.map((capability: Capability) => {
          const color = categoryColors[capability.category] as keyof typeof categoryColors;
          const colorMap = {
            blue: {
              border: 'border-blue-500',
              bg: 'bg-blue-100 dark:bg-blue-900/30',
              text: 'text-blue-700 dark:text-blue-300'
            },
            purple: {
              border: 'border-purple-500',
              bg: 'bg-purple-100 dark:bg-purple-900/30',
              text: 'text-purple-700 dark:text-purple-300'
            },
            green: {
              border: 'border-green-500',
              bg: 'bg-green-100 dark:bg-green-900/30',
              text: 'text-green-700 dark:text-green-300'
            },
            orange: {
              border: 'border-orange-500',
              bg: 'bg-orange-100 dark:bg-orange-900/30',
              text: 'text-orange-700 dark:text-orange-300'
            }
          };

          const colors = colorMap[color as keyof typeof colorMap] || colorMap.blue;

          return (
            <div
              key={capability.name}
              className={`p-4 bg-white dark:bg-gray-800 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                hoveredCapability === capability.name
                  ? `${colors.border} shadow-lg`
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onMouseEnter={() => setHoveredCapability(capability.name)}
              onMouseLeave={() => setHoveredCapability(null)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    {capability.name}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                    {categoryNames[capability.category as keyof typeof categoryNames]}
                  </span>
                </div>
                <div className="ml-4">
                  {renderSkillLevel(capability.level, color)}
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {capability.description}
              </p>

              {capability.years && (
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                  <span className="mr-2">📅</span>
                  {capability.years} years experience
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Skill Level Guide</h4>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
          <div className="flex items-center">
            <span className="w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
            1 - Beginner
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-blue-300 rounded-full mr-2"></span>
            2 - Basic
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
            3 - Intermediate
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            4 - Advanced
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
            5 - Expert
          </div>
        </div>
      </div>
    </div>
  );
}
