interface Capability {
  name: string;
  level: number;
  category: 'technical' | 'ai' | 'leadership' | 'domain';
  description: string;
  years?: number;
  featured?: boolean;
  tags?: string[];
}

interface CompactCapabilityMatrixProps {
  capabilities?: Capability[];
}

const defaultCapabilities: Capability[] = [
  {
    name: 'No capabilities loaded',
    level: 1,
    category: 'technical',
    description: 'Please check content configuration',
  },
];

const categoryColors = {
  technical: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-700 dark:text-blue-300',
    accent: 'bg-blue-500',
  },
  ai: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    text: 'text-purple-700 dark:text-purple-300',
    accent: 'bg-purple-500',
  },
  leadership: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-700 dark:text-green-300',
    accent: 'bg-green-500',
  },
  domain: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    text: 'text-orange-700 dark:text-orange-300',
    accent: 'bg-orange-500',
  },
};

const categoryNames = {
  technical: 'Technical',
  ai: 'AI Integration',
  leadership: 'Leadership',
  domain: 'Domain',
};

export default function CompactCapabilityMatrix({
  capabilities = defaultCapabilities,
}: CompactCapabilityMatrixProps) {
  // Group capabilities by category and show only top skills
  const groupedCapabilities = capabilities.reduce(
    (acc, cap) => {
      if (!acc[cap.category]) acc[cap.category] = [];
      acc[cap.category]!.push(cap);
      return acc;
    },
    {} as Record<string, Capability[]>
  );

  const renderSkillLevel = (level: number, category: string) => {
    const colors = categoryColors[category as keyof typeof categoryColors];
    return (
      <div className='flex space-x-1'>
        {[1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            className={`h-1.5 w-1.5 rounded-full ${
              i <= level ? colors.accent : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
      {Object.entries(groupedCapabilities).map(([category, caps]) => {
        const colors = categoryColors[category as keyof typeof categoryColors];
        const topSkills = caps
          .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.level - a.level)
          .slice(0, 3);

        return (
          <div
            key={category}
            className={`rounded-lg p-4 ${colors.bg} border border-gray-200 dark:border-gray-700`}
          >
            <h3 className={`mb-3 text-sm font-semibold ${colors.text}`}>
              {categoryNames[category as keyof typeof categoryNames]}
            </h3>
            <div className='space-y-2'>
              {topSkills.map(cap => (
                <div key={cap.name} className='flex items-center justify-between'>
                  <div className='min-w-0 flex-1'>
                    <div
                      className='truncate text-xs font-medium text-gray-900 dark:text-gray-100'
                      title={cap.name}
                    >
                      {cap.name}
                    </div>
                    {cap.years && <div className='text-xs text-gray-500'>{cap.years}y</div>}
                  </div>
                  <div className='ml-2'>{renderSkillLevel(cap.level, category)}</div>
                </div>
              ))}
              {caps.length > 3 && (
                <div className='pt-1 text-xs text-gray-500'>+{caps.length - 3} more</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
