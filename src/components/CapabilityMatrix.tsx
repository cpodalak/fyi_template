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

  // Helper function to get category label and color
  const getCategoryInfo = (categoryKey: string) => {
    const category = categories[categoryKey];
    if (typeof category === 'string') {
      return { name: category, color: 'blue' };
    }
    return {
      name: category?.name || categoryKey,
      color: category?.color || 'blue'
    };
  };

  const getCategoryColors = (color: string): { bg: string; text: string; accent: string } => {
    const colorMap: Record<string, { bg: string; text: string; accent: string }> = {
      blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-300', accent: 'bg-blue-500' },
      purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-700 dark:text-purple-300', accent: 'bg-purple-500' },
      green: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-300', accent: 'bg-green-500' },
      orange: { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-700 dark:text-orange-300', accent: 'bg-orange-500' },
    };
    return colorMap[color] || colorMap['blue'];
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

  // Compact mode - beautiful grid with category colors
  if (compact) {
    return (
      <div className="space-y-6">
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {displaySkills.map(skill => {
            const categoryInfo = getCategoryInfo(skill.category);
            const colors = getCategoryColors(categoryInfo.color);

            return (
              <div
                key={skill.name}
                className={`p-4 rounded-lg border border-gray-200 transition-all hover:shadow-md cursor-pointer ${colors.bg} dark:border-gray-700`}
                onClick={() => setSelectedSkill(skill)}
                title={skill.description}
              >
                <div className="space-y-2">
                  <h3 className={`font-semibold text-sm ${colors.text}`}>
                    {skill.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className={`h-2 w-2 rounded-full ${getLevelColor(skill.level)}`} />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {skill.years}y
                    </span>
                  </div>
                  <div className={`text-xs ${colors.text} opacity-75`}>
                    {getLevelText(skill.level)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Skill Detail Modal for Compact Mode */}
        {selectedSkill && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedSkill(null)}>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{selectedSkill.name}</h2>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${getLevelColor(selectedSkill.level)}`} />
                  <span className="font-medium">{getLevelText(selectedSkill.level)} • {selectedSkill.years} years</span>
                </div>
                {selectedSkill.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{selectedSkill.description}</p>
                )}
                {selectedSkill.tags && (
                  <div className="flex flex-wrap gap-1">
                    {selectedSkill.tags.map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded dark:bg-gray-700 dark:text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
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
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
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
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              All Skills
            </button>
            {Object.entries(categories).map(([key, _category]) => {
              const categoryInfo = getCategoryInfo(key);
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === key
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {categoryInfo.name}
                </button>
              );
            })}
          </div>

          {/* Skills Grid */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {displaySkills.map(skill => {
              const categoryInfo = getCategoryInfo(skill.category);
              const colors = getCategoryColors(categoryInfo.color);

              return (
                <div
                  key={skill.name}
                  className={`p-5 rounded-lg border border-gray-200 transition-all hover:shadow-lg cursor-pointer ${colors.bg} dark:border-gray-700`}
                  onClick={() => setSelectedSkill(skill)}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className={`font-semibold text-lg ${colors.text}`}>
                        {skill.name}
                      </h3>
                      <div className={`h-3 w-3 rounded-full ${getLevelColor(skill.level)} flex-shrink-0 mt-1`} />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className={`font-medium ${colors.text}`}>
                        {getLevelText(skill.level)}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {skill.years} years
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getLevelColor(skill.level)} transition-all duration-300`}
                        style={{ width: `${(skill.level / 5) * 100}%` }}
                      />
                    </div>

                    {skill.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {skill.description}
                      </p>
                    )}

                    {skill.tags && (
                      <div className="flex flex-wrap gap-1">
                        {skill.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-xs bg-white bg-opacity-50 text-gray-700 px-2 py-1 rounded dark:bg-gray-800 dark:text-gray-300">
                            {tag}
                          </span>
                        ))}
                        {skill.tags.length > 3 && (
                          <span className="text-xs text-gray-500">+{skill.tags.length - 3}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {displaySkills.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No skills found for the selected category</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'milestones' && (
        <div className="space-y-6">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>Key achievements and milestones across all skill areas</p>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
            <div className="space-y-8">
              {skills
                .filter(skill => skill.milestones && skill.milestones.length > 0)
                .flatMap(skill =>
                  skill.milestones!.map(milestone => ({ ...milestone, skillName: skill.name, skillCategory: skill.category }))
                )
                .sort((a, b) => b.year - a.year)
                .map((milestone, index) => {
                  const categoryInfo = getCategoryInfo(milestone.skillCategory);
                  const colors = getCategoryColors(categoryInfo.color);

                  return (
                    <div key={`${milestone.skillName}-${index}`} className="relative flex items-start">
                      <div className={`absolute left-2 w-4 h-4 rounded-full border-4 border-white dark:border-gray-800 ${colors.accent}`}></div>
                      <div className="ml-12">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-lg">{getMilestoneIcon(milestone.type)}</span>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{milestone.title}</h3>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded dark:bg-gray-700">
                            {milestone.year}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">{milestone.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className={`${colors.text} font-medium`}>{milestone.skillName}</span>
                          {milestone.impact && (
                            <span className="text-green-600 dark:text-green-400">📈 {milestone.impact}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'experiences' && (
        <div className="space-y-6">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>Real-world project experiences and their outcomes</p>
          </div>
          <div className="grid gap-6">
            {skills
              .filter(skill => skill.experiences && skill.experiences.length > 0)
              .flatMap(skill =>
                skill.experiences!.map(exp => ({ ...exp, skillName: skill.name, skillCategory: skill.category }))
              )
              .map((experience, index) => {
                const categoryInfo = getCategoryInfo(experience.skillCategory);
                const colors = getCategoryColors(categoryInfo.color);

                return (
                  <div key={index} className={`border border-gray-200 rounded-lg p-6 ${colors.bg} dark:border-gray-700`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className={`text-lg font-semibold ${colors.text}`}>{experience.project}</h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">{experience.role}</p>
                        <p className="text-sm text-gray-500">{experience.duration}</p>
                      </div>
                      <span className={`text-sm px-3 py-1 rounded font-medium ${colors.text} bg-white bg-opacity-50 dark:bg-gray-800`}>
                        {experience.skillName}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4">{experience.description}</p>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map(tech => (
                          <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200">
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
                            <span className="text-green-500 mr-2 mt-0.5">✓</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Skill Detail Modal for Full Mode */}
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
