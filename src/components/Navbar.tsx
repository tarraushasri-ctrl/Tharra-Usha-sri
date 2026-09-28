import React, { useState } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  Bookmark, 
  Sun, 
  Moon, 
  User, 
  Building2, 
  Menu, 
  X, 
  PlusCircle,
  FileText,
  ChevronDown
} from 'lucide-react';
import { UserRole, StudentProfile, RecruiterProfile } from '../types';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  savedCount: number;
  internshipCount: number;
  jobCount: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  userRole: UserRole;
  onSwitchRole: (role: UserRole) => void;
  studentProfile: StudentProfile;
  recruiterProfile: RecruiterProfile;
  onOpenAuth: () => void;
  onOpenAIAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  savedCount,
  internshipCount,
  jobCount,
  darkMode,
  onToggleDarkMode,
  userRole,
  onSwitchRole,
  studentProfile,
  recruiterProfile,
  onOpenAuth,
  onOpenAIAssistant,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 dark:from-blue-400 dark:via-indigo-300 dark:to-sky-400 bg-clip-text text-transparent">
                  CareerConnect
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 -mt-1">
                  Students & Freshers
                </span>
              </div>
            </button>

            {/* Role indicator pill */}
            <div className="relative hidden md:block ml-4">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border border-blue-200 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition cursor-pointer"
                title="Switch between Student & Recruiter perspective"
              >
                {userRole === 'student' ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Student View</span>
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                    <span>Recruiter View</span>
                  </>
                )}
                <ChevronDown className="w-3 h-3 ml-0.5 text-blue-500" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 text-xs animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-700/60">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Switch Experience Mode</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Test platform as either user</p>
                  </div>
                  <button
                    onClick={() => {
                      onSwitchRole('student');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
                      userRole === 'student' ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/50 dark:bg-blue-950/20' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-emerald-500" />
                      <div>
                        <p className="leading-tight">Student / Fresh Grad</p>
                        <p className="text-[10px] text-slate-400">{studentProfile.name}</p>
                      </div>
                    </div>
                    {userRole === 'student' && <span className="text-[10px] bg-blue-100 dark:bg-blue-900/60 px-1.5 py-0.5 rounded text-blue-700 dark:text-blue-300 font-bold">Active</span>}
                  </button>
                  <button
                    onClick={() => {
                      onSwitchRole('recruiter');
                      setRoleDropdownOpen(false);
                      onNavigate('recruiter');
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
                      userRole === 'recruiter' ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/50 dark:bg-blue-950/20' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-indigo-500" />
                      <div>
                        <p className="leading-tight">Recruiter Dashboard</p>
                        <p className="text-[10px] text-slate-400">{recruiterProfile.companyName}</p>
                      </div>
                    </div>
                    {userRole === 'recruiter' && <span className="text-[10px] bg-indigo-100 dark:bg-indigo-900/60 px-1.5 py-0.5 rounded text-indigo-700 dark:text-indigo-300 font-bold">Active</span>}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm text-slate-600 dark:text-slate-300">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentTab === 'home'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 font-semibold'
                  : 'hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('internships')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'internships'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 font-semibold'
                  : 'hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Internships
              <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                {internshipCount}
              </span>
            </button>
            <button
              onClick={() => handleNavClick('jobs')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'jobs'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 font-semibold'
                  : 'hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Jobs
              <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                {jobCount}
              </span>
            </button>
            <button
              onClick={() => handleNavClick('saved')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'saved'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 font-semibold'
                  : 'hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              Saved
              {savedCount > 0 && (
                <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-blue-600 text-white font-bold">
                  {savedCount}
                </span>
              )}
            </button>
            
            {/* AI Career Assistant Button */}
            <button
              onClick={onOpenAIAssistant}
              className="px-3 py-2 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 flex items-center gap-1.5 font-semibold transition group cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-indigo-500 group-hover:rotate-12 transition-transform" />
              <span>AI Assistant</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xs">
                Gemini 3.8
              </span>
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentTab === 'about'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 font-semibold'
                  : 'hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              About & FAQ
            </button>
          </nav>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            {/* Role primary action button */}
            {userRole === 'recruiter' ? (
              <button
                onClick={() => handleNavClick('recruiter')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow transition cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post Opportunity</span>
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('profile')}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  currentTab === 'profile'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <FileText className="w-4 h-4 text-blue-500" />
                <span>My Profile</span>
              </button>
            )}

            {/* Profile Avatar / Auth modal trigger */}
            <button
              onClick={() => {
                if (userRole === 'student') {
                  handleNavClick('profile');
                } else {
                  handleNavClick('recruiter');
                }
              }}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title="View account"
            >
              <img
                src={userRole === 'student' ? studentProfile.avatar : recruiterProfile.companyLogo}
                alt="Profile Avatar"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/30"
              />
              <span className="hidden xl:inline text-xs font-semibold text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                {userRole === 'student' ? studentProfile.name : recruiterProfile.name}
              </span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Experience Mode:
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onSwitchRole('student');
                  setMobileMenuOpen(false);
                }}
                className={`px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer ${
                  userRole === 'student'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => {
                  onSwitchRole('recruiter');
                  onNavigate('recruiter');
                  setMobileMenuOpen(false);
                }}
                className={`px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer ${
                  userRole === 'recruiter'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Recruiter
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`p-2.5 rounded-xl text-left text-sm font-medium cursor-pointer ${
                currentTab === 'home' ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('internships')}
              className={`p-2.5 rounded-xl text-left text-sm font-medium flex items-center justify-between cursor-pointer ${
                currentTab === 'internships' ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              <span>Internships</span>
              <span className="text-xs bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded-full">{internshipCount}</span>
            </button>
            <button
              onClick={() => handleNavClick('jobs')}
              className={`p-2.5 rounded-xl text-left text-sm font-medium flex items-center justify-between cursor-pointer ${
                currentTab === 'jobs' ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              <span>Jobs</span>
              <span className="text-xs bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded-full">{jobCount}</span>
            </button>
            <button
              onClick={() => handleNavClick('saved')}
              className={`p-2.5 rounded-xl text-left text-sm font-medium flex items-center justify-between cursor-pointer ${
                currentTab === 'saved' ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              <span>Saved</span>
              <span className="text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded-full">{savedCount}</span>
            </button>
            <button
              onClick={() => handleNavClick('profile')}
              className={`p-2.5 rounded-xl text-left text-sm font-medium cursor-pointer ${
                currentTab === 'profile' ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              Student Profile
            </button>
            <button
              onClick={() => handleNavClick('recruiter')}
              className={`p-2.5 rounded-xl text-left text-sm font-medium cursor-pointer ${
                currentTab === 'recruiter' ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              Recruiter Dashboard
            </button>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAIAssistant();
            }}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open AI Career Counselor</span>
          </button>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800">
            <button onClick={() => handleNavClick('about')} className="hover:underline cursor-pointer">
              About & FAQs
            </button>
            <button onClick={onOpenAuth} className="text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer">
              Switch or Sign In
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
