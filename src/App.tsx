import React, { useState, useEffect } from 'react';
import { 
  Opportunity, 
  StudentProfile, 
  RecruiterProfile, 
  Application, 
  UserRole 
} from './types';
import { 
  INITIAL_OPPORTUNITIES, 
  INITIAL_STUDENT_PROFILE, 
  INITIAL_RECRUITER_PROFILE, 
  INITIAL_APPLICATIONS 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { InternshipsView } from './components/InternshipsView';
import { JobsView } from './components/JobsView';
import { StudentProfileView } from './components/StudentProfileView';
import { RecruiterDashboardView } from './components/RecruiterDashboardView';
import { SavedOpportunitiesView } from './components/SavedOpportunitiesView';
import { AboutAndContactView } from './components/AboutAndContactView';
import { OpportunityDetailsModal } from './components/OpportunityDetailsModal';
import { ApplyModal } from './components/ApplyModal';
import { AICareerAssistantDrawer } from './components/AICareerAssistantDrawer';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { Sparkles, Bot, GraduationCap } from 'lucide-react';

export default function App() {
  // 1. Theme State (Dark mode)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('careerconnect_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('careerconnect_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('careerconnect_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // 2. Navigation State
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [navFilterParams, setNavFilterParams] = useState<{ search?: string; location?: string }>({});

  // 3. User Role State (Student vs Recruiter)
  const [userRole, setUserRole] = useState<UserRole>(() => {
    return (localStorage.getItem('careerconnect_role') as UserRole) || 'student';
  });

  const handleSwitchRole = (role: UserRole) => {
    setUserRole(role);
    localStorage.setItem('careerconnect_role', role);
  };

  // 4. Data State (Opportunities, Profiles, Applications, Saved)
  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    const saved = localStorage.getItem('careerconnect_opportunities');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_OPPORTUNITIES;
  });

  useEffect(() => {
    localStorage.setItem('careerconnect_opportunities', JSON.stringify(opportunities));
  }, [opportunities]);

  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('careerconnect_student_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_STUDENT_PROFILE;
  });

  useEffect(() => {
    localStorage.setItem('careerconnect_student_profile', JSON.stringify(studentProfile));
  }, [studentProfile]);

  const [recruiterProfile, setRecruiterProfile] = useState<RecruiterProfile>(() => {
    const saved = localStorage.getItem('careerconnect_recruiter_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_RECRUITER_PROFILE;
  });

  useEffect(() => {
    localStorage.setItem('careerconnect_recruiter_profile', JSON.stringify(recruiterProfile));
  }, [recruiterProfile]);

  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem('careerconnect_applications');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_APPLICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('careerconnect_applications', JSON.stringify(applications));
  }, [applications]);

  const [savedOpportunityIds, setSavedOpportunityIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('careerconnect_saved_ids');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return ['opp-1', 'opp-3'];
  });

  useEffect(() => {
    localStorage.setItem('careerconnect_saved_ids', JSON.stringify(savedOpportunityIds));
  }, [savedOpportunityIds]);

  // 5. Modals State
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const [opportunityToApply, setOpportunityToApply] = useState<Opportunity | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Handlers
  const handleToggleSave = (id: string) => {
    setSavedOpportunityIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleViewDetails = (opp: Opportunity) => {
    setSelectedOpportunity(opp);
    setIsDetailsModalOpen(true);
  };

  const handleOpenApply = (opp: Opportunity) => {
    setOpportunityToApply(opp);
    setIsApplyModalOpen(true);
  };

  const handleSubmitApplication = (appData: Omit<Application, 'id' | 'appliedAt' | 'status'>) => {
    const newApp: Application = {
      ...appData,
      id: `app-${Date.now()}`,
      appliedAt: new Date().toISOString().split('T')[0],
      status: 'Applied',
    };

    setApplications(prev => [newApp, ...prev]);

    // Increment applicant count for opportunity
    setOpportunities(prev => prev.map(o => {
      if (o.id === appData.opportunityId) {
        return { ...o, applicantCount: o.applicantCount + 1 };
      }
      return o;
    }));
  };

  const handleNavigateToTab = (tab: string, filterParams?: { search?: string; location?: string }) => {
    if (filterParams) {
      setNavFilterParams(filterParams);
    } else {
      setNavFilterParams({});
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Recruiter actions
  const handleAddOpportunity = (newOpp: Opportunity) => {
    setOpportunities(prev => [newOpp, ...prev]);
  };

  const handleToggleOpportunityStatus = (id: string) => {
    setOpportunities(prev => prev.map(o => {
      if (o.id === id) {
        return { ...o, status: o.status === 'active' ? 'closed' : 'active' };
      }
      return o;
    }));
  };

  const handleDeleteOpportunity = (id: string) => {
    setOpportunities(prev => prev.filter(o => o.id !== id));
  };

  const handleUpdateApplicationStatus = (
    id: string, 
    status: Application['status'], 
    notes?: string
  ) => {
    setApplications(prev => prev.map(a => {
      if (a.id === id) {
        return {
          ...a,
          status,
          recruiterNotes: notes !== undefined ? notes : a.recruiterNotes,
        };
      }
      return a;
    }));
  };

  const appliedOpportunityIds = applications
    .filter(a => a.studentId === studentProfile.id)
    .map(a => a.opportunityId);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white transition-colors duration-200">
      
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigateToTab}
        savedCount={savedOpportunityIds.length}
        internshipCount={opportunities.filter(o => o.type === 'internship').length}
        jobCount={opportunities.filter(o => o.type === 'job').length}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        userRole={userRole}
        onSwitchRole={handleSwitchRole}
        studentProfile={studentProfile}
        recruiterProfile={recruiterProfile}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            opportunities={opportunities}
            studentProfile={studentProfile}
            savedOpportunityIds={savedOpportunityIds}
            appliedOpportunityIds={appliedOpportunityIds}
            onToggleSave={handleToggleSave}
            onViewDetails={handleViewDetails}
            onApply={handleOpenApply}
            onNavigateToTab={handleNavigateToTab}
            onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
          />
        )}

        {currentTab === 'internships' && (
          <InternshipsView
            opportunities={opportunities}
            studentProfile={studentProfile}
            savedOpportunityIds={savedOpportunityIds}
            appliedOpportunityIds={appliedOpportunityIds}
            onToggleSave={handleToggleSave}
            onViewDetails={handleViewDetails}
            onApply={handleOpenApply}
            initialSearchQuery={navFilterParams.search || ''}
            initialLocation={navFilterParams.location || 'All Locations'}
          />
        )}

        {currentTab === 'jobs' && (
          <JobsView
            opportunities={opportunities}
            studentProfile={studentProfile}
            savedOpportunityIds={savedOpportunityIds}
            appliedOpportunityIds={appliedOpportunityIds}
            onToggleSave={handleToggleSave}
            onViewDetails={handleViewDetails}
            onApply={handleOpenApply}
            initialSearchQuery={navFilterParams.search || ''}
            initialLocation={navFilterParams.location || 'All Locations'}
          />
        )}

        {currentTab === 'saved' && (
          <SavedOpportunitiesView
            savedOpportunityIds={savedOpportunityIds}
            opportunities={opportunities}
            onToggleSave={handleToggleSave}
            onViewDetails={handleViewDetails}
            onApply={handleOpenApply}
            appliedOpportunityIds={appliedOpportunityIds}
            studentProfile={studentProfile}
            onExplore={() => handleNavigateToTab('internships')}
          />
        )}

        {currentTab === 'profile' && (
          <StudentProfileView
            profile={studentProfile}
            onUpdateProfile={setStudentProfile}
            applications={applications}
            opportunities={opportunities}
            onViewOpportunity={handleViewDetails}
            onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
          />
        )}

        {currentTab === 'recruiter' && (
          <RecruiterDashboardView
            recruiterProfile={recruiterProfile}
            onUpdateRecruiterProfile={setRecruiterProfile}
            opportunities={opportunities}
            onAddOpportunity={handleAddOpportunity}
            onToggleOpportunityStatus={handleToggleOpportunityStatus}
            onDeleteOpportunity={handleDeleteOpportunity}
            applications={applications}
            onUpdateApplicationStatus={handleUpdateApplicationStatus}
          />
        )}

        {currentTab === 'about' && (
          <AboutAndContactView />
        )}
      </main>

      {/* Floating AI Career Assistant Launcher */}
      <aside aria-label="Floating AI Career Advisor" className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAIAssistantOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs sm:text-sm rounded-full shadow-xl shadow-indigo-600/30 hover:scale-105 hover:shadow-2xl transition cursor-pointer"
          title="Open AI Career Assistant"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin [animation-duration:6s]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900"></span>
          </div>
          <span className="hidden sm:inline">AI Career Mentor</span>
          <span className="sm:hidden font-bold">Ask AI</span>
        </button>
      </aside>

      {/* Opportunity Details Modal */}
      <OpportunityDetailsModal
        opportunity={selectedOpportunity}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        isSaved={selectedOpportunity ? savedOpportunityIds.includes(selectedOpportunity.id) : false}
        onToggleSave={handleToggleSave}
        onApply={handleOpenApply}
        hasApplied={selectedOpportunity ? appliedOpportunityIds.includes(selectedOpportunity.id) : false}
        studentProfile={studentProfile}
      />

      {/* Apply Modal */}
      <ApplyModal
        opportunity={opportunityToApply}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        studentProfile={studentProfile}
        onSubmitApplication={handleSubmitApplication}
      />

      {/* AI Assistant Drawer */}
      <AICareerAssistantDrawer
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        opportunities={opportunities}
        studentProfile={studentProfile}
        onSelectOpportunity={handleViewDetails}
      />

      {/* Auth / Demo Switch Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSelectRoleAndLogin={(role) => {
          handleSwitchRole(role);
          if (role === 'recruiter') {
            handleNavigateToTab('recruiter');
          } else {
            handleNavigateToTab('profile');
          }
        }}
      />

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigateToTab}
        onSelectSkill={(skill) => handleNavigateToTab('internships', { search: skill })}
        onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
      />
    </div>
  );
}
