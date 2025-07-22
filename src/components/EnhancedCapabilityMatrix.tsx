import { useState } from 'react';

interface Milestone {
  year: number;
  title: string;
  description: string;
  type: 'certification' | 'project' | 'achievement';
  impact?: string;
}

interface Experience {
  project: string;
  role: string;
  duration: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

interface Skill {
  name: string;
  level: number;
  category: string;
  years: number;
  featured?: boolean;
  description?: string;
  tags?: string[];
  milestones?: Milestone[];
  experiences?: Experience[];
}

interface CapabilityMatrixProps {
  skills: Skill[];
  categories: Record<string, string | { name: string; description: string; color: string }>;
  compact?: boolean;
}

export default function CapabilityMatrix({
  skills,
  categories,
  compact = false,
}: CapabilityMatrixProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'milestones' | 'experiences'>('overview');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  // Helper function to get category label
  const getCategoryLabel = (categoryKey: string) => {
    const category = categories[categoryKey];
    return typeof category === 'string' ? category : category?.name || categoryKey;
  };

  // Filter skills by category if one is selected
  const filteredSkills = selectedCategory
    ? skills.filter(skill => skill.category === selectedCategory)
    : skills;

  // In compact mode, only show featured skills
  const displaySkills = compact ? filteredSkills.filter(skill => skill.featured) : filteredSkills;

  const getLevelColor = (level: number) => {
    if (level >= 4) return 'bg-green-500';
    if (level >= 3) return 'bg-blue-500';
    if (level >= 2) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  const getLevelText = (level: number) => {
    if (level >= 4) return 'Expert';
    if (level >= 3) return 'Advanced';
    if (level >= 2) return 'Intermediate';
    return 'Beginner';
  };

  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'certification': return '🏆';
      case 'project': return '🚀';
      case 'achievement': return '⭐';
      default: return '📍';
    }
  };

  // Compact mode - simple grid view
  if (compact) {
    return (
      <div className="space-y-4">
        <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {displaySkills.map(skill => (
            <div
              key={skill.name}
              className="p-3 rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {skill.name}
                </h3>
              </div>
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${getLevelColor(skill.level)}`} />
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    {getLevelText(skill.level)}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">{skill.years} years</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Full mode with tabs
  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {[
            { key: 'overview', label: 'Skills Overview', icon: '📊' },
            { key: 'milestones', label: 'Milestones & Achievements', icon: '🎯' },
            { key: 'experiences', label: 'Project Experiences', icon: '💼' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`rounded-full px-3 py-1 text-sm ${
                selectedCategory === null
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              All
            </button>
            {Object.entries(categories).map(([key, _label]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`rounded-full px-3 py-1 text-sm ${
                  selectedCategory === key
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {getCategoryLabel(key)}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {displaySkills.map(skill => (
              <div
                key={skill.name}
                className="p-4 rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                onClick={() => setSelectedSkill(skill)}
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                    {skill.name}
                  </h3>
                </div>
                <div className="mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${getLevelColor(skill.level)}`} />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {getLevelText(skill.level)} • {skill.years} years
                    </span>
                  </div>
                </div>
                {skill.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{skill.description}</p>
                )}
                {skill.tags && (
                  <div className="flex flex-wrap gap-1">
                    {skill.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded dark:bg-gray-700 dark:text-gray-300">
                        {tag}
                      </span>
                    ))}
                    {skill.tags.length > 3 && (
                      <span className="text-xs text-gray-500">+{skill.tags.length - 3} more</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'milestones' && (
        <div className="space-y-6">
          <div className="text-center text-gray-600 dark:text-gray-400 mb-8">
            <p>Key achievements and milestones across all skill areas</p>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
            <div className="space-y-8">
              {skills
                .filter(skill => skill.milestones && skill.milestones.length > 0)
                .flatMap(skill =>
                  skill.milestones!.map(milestone => ({ ...milestone, skillName: skill.name }))
                )
                .sort((a, b) => b.year - a.year)
                .map((milestone, index) => (
                  <div key={`${milestone.skillName}-${index}`} className="relative flex items-start">
                    <div className="absolute left-2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                    <div className="ml-12">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{getMilestoneIcon(milestone.type)}</span>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{milestone.title}</h3>
                        <span className="text-sm text-gray-500">({milestone.year})</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">{milestone.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-blue-600 dark:text-blue-400">{milestone.skillName}</span>
                        {milestone.impact && (
                          <span className="text-green-600 dark:text-green-400">Impact: {milestone.impact}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'experiences' && (
        <div className="space-y-6">
          <div className="text-center text-gray-600 dark:text-gray-400 mb-8">
            <p>Real-world project experiences and their outcomes</p>
          </div>
          <div className="grid gap-6">
            {skills
              .filter(skill => skill.experiences && skill.experiences.length > 0)
              .flatMap(skill =>
                skill.experiences!.map(exp => ({ ...exp, skillName: skill.name }))
              )
              .map((experience, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{experience.project}</h3>
                      <p className="text-blue-600 dark:text-blue-400">{experience.role}</p>
                      <p className="text-sm text-gray-500">{experience.duration}</p>
                    </div>
                    <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded dark:bg-gray-700 dark:text-gray-300">
                      {experience.skillName}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-4">{experience.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-1">
                      {experience.technologies.map(tech => (
                        <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {experience.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedSkill(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedSkill.name}</h2>
              <button
                onClick={() => setSelectedSkill(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className={`h-4 w-4 rounded-full ${getLevelColor(selectedSkill.level)}`} />
                <span className="font-medium">{getLevelText(selectedSkill.level)} • {selectedSkill.years} years experience</span>
              </div>

              {selectedSkill.description && (
                <p className="text-gray-600 dark:text-gray-400">{selectedSkill.description}</p>
              )}

              {selectedSkill.tags && (
                <div>
                  <h3 className="font-medium mb-2">Technologies & Areas:</h3>
                  <div className="flex flex-wrap gap-1">
                    {selectedSkill.tags.map(tag => (
                      <span key={tag} className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded dark:bg-gray-700 dark:text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedSkill.milestones && selectedSkill.milestones.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Key Milestones:</h3>
                  <div className="space-y-2">
                    {selectedSkill.milestones.map((milestone, i) => (
                      <div key={i} className="border-l-2 border-blue-200 pl-3">
                        <div className="flex items-center gap-2">
                          <span>{getMilestoneIcon(milestone.type)}</span>
                          <span className="font-medium">{milestone.title}</span>
                          <span className="text-sm text-gray-500">({milestone.year})</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{milestone.description}</p>
                        {milestone.impact && (
                          <p className="text-sm text-green-600 dark:text-green-400">Impact: {milestone.impact}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
