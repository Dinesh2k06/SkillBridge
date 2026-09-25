import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

import WelcomeStep from './steps/WelcomeStep';
import OrgTypeStep from './steps/OrgTypeStep';
import OrgSelectStep from './steps/OrgSelectStep';
import ProfileStep from './steps/ProfileStep';
import TeachSkillsStep from './steps/TeachSkillsStep';
import LearnSkillsStep from './steps/LearnSkillsStep';
import NetworkStep from './steps/NetworkStep';
import CompleteStep from './steps/CompleteStep';

export interface OnboardingData {
  orgType: string;
  organizationId: string | null;
  organizationName: string;
  department: string;
  yearOfStudy: string;
  section: string;
  teachSkills: string[];
  learnSkills: string[];
  networkPreference: string;
  fullName: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
}

const TOTAL_STEPS = 8;

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    orgType: '',
    organizationId: null,
    organizationName: '',
    department: '',
    yearOfStudy: '',
    section: '',
    teachSkills: [],
    learnSkills: [],
    networkPreference: 'My Organization',
    fullName: 'Dinesh',
    bio: '',
    githubUrl: '',
    linkedinUrl: '',
    portfolioUrl: '',
  });

  const updateData = (updates: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      await handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      localStorage.setItem("skillbridge_onboarding", JSON.stringify(onboardingData));
      // Navigate to /dashboard
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Error saving onboarding data:', err);
      setError('An error occurred while saving your profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isNextDisabled = () => {
    switch (currentStep) {
      case 2:
        return !onboardingData.orgType;
      case 3:
        return !onboardingData.organizationId && !onboardingData.organizationName;
      case 4:
        return !onboardingData.department || !onboardingData.yearOfStudy;
      case 8:
        return !onboardingData.fullName;
      default:
        return false;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Welcome';
      case 2: return 'Organization Type';
      case 3: return 'Find Organization';
      case 4: return 'Academic Details';
      case 5: return 'Skills to Teach';
      case 6: return 'Skills to Learn';
      case 7: return 'Network Preference';
      case 8: return 'Complete Profile';
      default: return '';
    }
  };

  const progressPercentage = ((currentStep - 1) / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header with Progress */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 p-4 shadow-sm">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          <div className="flex justify-between items-center text-sm font-medium text-gray-500 dark:text-gray-400">
            <span>Step {currentStep} of {TOTAL_STEPS}</span>
            <span>{getStepTitle()}</span>
          </div>
          <Progress value={progressPercentage} className="h-2 w-full" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}

        <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
          {currentStep === 1 && <WelcomeStep />}
          {currentStep === 2 && (
            <OrgTypeStep 
              value={onboardingData.orgType} 
              onChange={val => updateData({ orgType: val })} 
            />
          )}
          {currentStep === 3 && (
            <OrgSelectStep 
              orgType={onboardingData.orgType}
              selectedOrgId={onboardingData.organizationId}
              orgName={onboardingData.organizationName}
              onChange={(id, name) => updateData({ organizationId: id, organizationName: name })}
            />
          )}
          {currentStep === 4 && (
            <ProfileStep 
              department={onboardingData.department}
              yearOfStudy={onboardingData.yearOfStudy}
              section={onboardingData.section}
              onChange={updates => updateData(updates)}
            />
          )}
          {currentStep === 5 && (
            <TeachSkillsStep 
              selectedSkills={onboardingData.teachSkills}
              onChange={skills => updateData({ teachSkills: skills })}
            />
          )}
          {currentStep === 6 && (
            <LearnSkillsStep 
              selectedSkills={onboardingData.learnSkills}
              teachSkills={onboardingData.teachSkills}
              onChange={skills => updateData({ learnSkills: skills })}
            />
          )}
          {currentStep === 7 && (
            <NetworkStep 
              value={onboardingData.networkPreference}
              onChange={val => updateData({ networkPreference: val })}
            />
          )}
          {currentStep === 8 && (
            <CompleteStep 
              fullName={onboardingData.fullName}
              bio={onboardingData.bio}
              githubUrl={onboardingData.githubUrl}
              linkedinUrl={onboardingData.linkedinUrl}
              portfolioUrl={onboardingData.portfolioUrl}
              onChange={updates => updateData(updates)}
            />
          )}
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1 || isSubmitting}
            className="w-32"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={isNextDisabled() || isSubmitting}
            className="w-40"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : currentStep === TOTAL_STEPS ? (
              'Complete Profile'
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
