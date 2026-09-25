import { useState, useEffect } from 'react';
import type { Skill } from '@/types';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { Loader2, Check } from 'lucide-react';

interface TeachSkillsStepProps {
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
}

export default function TeachSkillsStep({ selectedSkills, onChange }: TeachSkillsStepProps) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('category')
          .order('name');
          
        if (error) throw error;
        setSkills(data || []);
      } catch (err) {
        console.error('Error fetching skills:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSkills();
  }, []);

  const toggleSkill = (skillId: string) => {
    if (selectedSkills.includes(skillId)) {
      onChange(selectedSkills.filter(id => id !== skillId));
    } else {
      onChange([...selectedSkills, skillId]);
    }
  };

  const groupedSkills = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center sm:text-left flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            What can you teach others?
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Select skills you're confident enough to teach or mentor others in.
          </p>
        </div>
        <div className="hidden sm:flex items-center justify-center bg-primary/10 text-primary rounded-full px-4 py-2 font-medium">
          {selectedSkills.length} selected
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="space-y-8 max-h-[500px] overflow-y-auto pr-2 pb-4 scrollbar-thin">
          {(Object.entries(groupedSkills) as [string, Skill[]][]).map(([category, categorySkills]) => (
            <div key={category} className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-2">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill: Skill) => {
                  const isSelected = selectedSkills.includes(skill.id);
                  return (
                    <button
                      key={skill.id}
                      onClick={() => toggleSkill(skill.id)}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border",
                        isSelected
                          ? "bg-primary text-white border-primary shadow-sm hover:bg-primary/90"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-primary/5"
                      )}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
