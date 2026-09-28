import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  DollarSign, 
  Star,
  Users,
  Award
} from 'lucide-react';
import { Opportunity, StudentProfile } from '../types';
import { POPULAR_SKILLS, LOCATIONS } from '../data/mockData';
import { OpportunityCard } from './OpportunityCard';

interface HomeViewProps {
  opportunities: Opportunity[];
  studentProfile: StudentProfile;
  savedOpportunityIds: string[];
  appliedOpportunityIds: string[];
  onToggleSave: (id: string) => void;
  onViewDetails: (opp: Opportunity) => void;
  onApply: (opp: Opportunity) => void;
  onNavigateToTab: (tab: string, filterParams?: { search?: string; location?: string }) => void;
  onOpenAIAssistant: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  opportunities,
  studentProfile,
  savedOpportunityIds,
  appliedOpportunityIds,
  onToggleSave,
  onViewDetails,
  onApply,
  onNavigateToTab,
  onOpenAIAssistant,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [featuredTab, setFeaturedTab] = useState<'all' | 'internship' | 'job'>('all');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigateToTab('internships', {
      search: searchQuery,
      location: selectedLocation === 'All Locations' ? undefined : selectedLocation,
    });
  };

  const handleSkillClick = (skill: string) => {
    onNavigateToTab('internships', { search: skill });
  };

  // Filter featured opportunities
  const featuredOpportunities = opportunities
    .filter(o => o.featured && (featuredTab === 'all' || o.type === featuredTab))
    .slice(0, 6);

  // Filter personalized recommended opportunities based on student's skills
  const studentSkillsLower = studentProfile.skills.map(s => s.toLowerCase());
  const recommendedOpportunities = opportunities
    .filter(opp => opp.skills.some(reqSkill => studentSkillsLower.includes(reqSkill.toLowerCase())))
    .slice(0, 3);

  const internshipCount = opportunities.filter(o => o.type === 'internship').length;
  const jobCount = opportunities.filter(o => o.type === 'job').length;

  return (
    <div className="space-y-16 sm:space-y-20 pb-12">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-14 sm:pt-14 sm:pb-20 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-b from-blue-50/70 via-white to-white dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950">
        
        {/* Subtle background ambient glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-400/20 via-indigo-400/15 to-sky-300/20 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          {/* Top Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-900/60 shadow-xs hover:border-blue-300 transition">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Batch 2025, 2026 & 2027 Summer Cohorts Open</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-slate-600 dark:text-slate-400 font-medium">Over 1,200+ Verified Openings</span>
          </div>

          {/* Main Hero Headline */}
          <div className="max-w-4xl mx-auto space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]">
              Find Your Next <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                Internship or Job
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Connect with high-growth startups and tech giants hiring college students and fresh graduates. Real stipends, transparent deadlines, and direct recruiter access.
            </p>
          </div>

          {/* Interactive Search Bar Box */}
          <div className="max-w-3xl mx-auto pt-3">
            <form
              onSubmit={handleHeroSearch}
              className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 shadow-xl shadow-blue-900/5 dark:shadow-black/40 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-2"
            >
              {/* Keyword Search */}
              <div className="flex items-center gap-3 px-3 py-2 flex-1 w-full border-b sm:border-b-0 sm:border-r border-slate-100 dark:border-slate-800">
                <Search className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jobs, internships, skills..."
                  className="w-full text-xs sm:text-sm bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                />
              </div>

              {/* Location Filter */}
              <div className="flex items-center gap-2 px-3 py-2 sm:w-56 w-full">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-transparent text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc} className="dark:bg-slate-900">
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search CTA */}
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl sm:rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Two Quick Action Buttons: Find Internships & Find Jobs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigateToTab('internships')}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Find Internships</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-extrabold">
                {internshipCount}+
              </span>
            </button>

            <button
              onClick={() => onNavigateToTab('jobs')}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-blue-500 font-bold text-sm shadow-xs hover:shadow transition cursor-pointer"
            >
              <Briefcase className="w-5 h-5 text-indigo-500" />
              <span>Find Jobs</span>
              <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full font-bold">
                {jobCount}+
              </span>
            </button>
          </div>

          {/* Popular Skills Bar */}
          <div className="max-w-4xl mx-auto pt-6">
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-slate-500 font-semibold mr-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                Popular Skills:
              </span>
              {POPULAR_SKILLS.map((skill) => (
                <button
                  key={skill}
                  onClick={() => handleSkillClick(skill)}
                  className="px-3 py-1 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition cursor-pointer shadow-2xs"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 2. Platform Value Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="text-center space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">2,500+</p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Active Opportunities
            </p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">450+</p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Verified Tech Partners
            </p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">$1,800/mo</p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Average Internship Stipend
            </p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-2xl sm:text-3xl font-black text-sky-600 dark:text-sky-400">100% Free</p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              For University Students
            </p>
          </div>
        </div>
      </section>

      {/* 3. Recommended For You (Dynamic based on Student Skills) */}
      {recommendedOpportunities.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Recommended For You ({studentProfile.name.split(' ')[0]})
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Matched to your branch in <strong>{studentProfile.branch}</strong> and skills: {studentProfile.skills.slice(0, 3).join(', ')}
              </p>
            </div>

            <button
              onClick={onOpenAIAssistant}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Ask AI why you match these</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedOpportunities.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                isSaved={savedOpportunityIds.includes(opp.id)}
                onToggleSave={onToggleSave}
                onViewDetails={onViewDetails}
                onApply={onApply}
                hasApplied={appliedOpportunityIds.includes(opp.id)}
                studentProfile={studentProfile}
              />
            ))}
          </div>
        </section>
      )}

      {/* 4. Featured Opportunities Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Featured Opportunities
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Hand-picked verified roles from top engineering teams actively interviewing
            </p>
          </div>

          {/* Toggle pill: All / Internships / Jobs */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setFeaturedTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                featuredTab === 'all'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFeaturedTab('internship')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                featuredTab === 'internship'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Internships
            </button>
            <button
              onClick={() => setFeaturedTab('job')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                featuredTab === 'job'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Entry Jobs
            </button>
          </div>
        </div>

        {/* Opportunity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredOpportunities.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              isSaved={savedOpportunityIds.includes(opp.id)}
              onToggleSave={onToggleSave}
              onViewDetails={onViewDetails}
              onApply={onApply}
              hasApplied={appliedOpportunityIds.includes(opp.id)}
              studentProfile={studentProfile}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => onNavigateToTab(featuredTab === 'job' ? 'jobs' : 'internships')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-blue-600 font-bold text-xs sm:text-sm shadow-xs hover:shadow transition cursor-pointer"
          >
            <span>Explore All {featuredTab === 'job' ? 'Jobs' : 'Internships'}</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </button>
        </div>
      </section>

      {/* 5. AI Assistant Teaser Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-indigo-100 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart AI Career Assistant</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Unsure what jobs or internships fit your tech stack?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Ask our Gemini-powered advisor questions like: <em>“Which internships are suitable for Java?”</em> or <em>“I know Python and SQL. What jobs can I apply for?”</em>
            </p>
          </div>

          <button
            onClick={onOpenAIAssistant}
            className="px-6 py-3.5 rounded-2xl bg-white text-indigo-900 hover:bg-blue-50 font-bold text-xs sm:text-sm shadow-lg hover:scale-105 transition flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Chat with AI Career Advisor</span>
          </button>
        </div>
      </section>

      {/* 6. Why Students & Recruiters Choose CareerConnect */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Built from the ground up for college success
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            No 5-years-experience requirements for entry roles. Real opportunities for university graduates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Zero Unpaid Traps
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We strictly enforce verified stipends and transparent salary ranges. Your talent and effort deserve fair compensation from day one.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Direct Recruiter Review
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Applications go straight into recruiter screening queues without black-hole automated rejection filters.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              PPO & Full-Time Pathways
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Over 75% of listed summer internships include Pre-Placement Offers (PPO) for high-performing student interns upon graduation.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
