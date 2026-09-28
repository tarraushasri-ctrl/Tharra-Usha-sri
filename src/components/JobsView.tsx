import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Sparkles, 
  X, 
  ArrowUpDown 
} from 'lucide-react';
import { Opportunity, StudentProfile, ExperienceLevel } from '../types';
import { DOMAINS, LOCATIONS } from '../data/mockData';
import { OpportunityCard } from './OpportunityCard';

interface JobsViewProps {
  opportunities: Opportunity[];
  studentProfile: StudentProfile;
  savedOpportunityIds: string[];
  appliedOpportunityIds: string[];
  onToggleSave: (id: string) => void;
  onViewDetails: (opp: Opportunity) => void;
  onApply: (opp: Opportunity) => void;
  initialSearchQuery?: string;
  initialLocation?: string;
}

export const JobsView: React.FC<JobsViewProps> = ({
  opportunities,
  studentProfile,
  savedOpportunityIds,
  appliedOpportunityIds,
  onToggleSave,
  onViewDetails,
  onApply,
  initialSearchQuery = '',
  initialLocation = 'All Locations',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [selectedWorkMode, setSelectedWorkMode] = useState<string>('All');
  const [selectedExperience, setSelectedExperience] = useState<string>('All');
  const [minSalary, setMinSalary] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'salary' | 'deadline'>('newest');

  const jobs = useMemo(() => {
    return opportunities.filter(o => o.type === 'job');
  }, [opportunities]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((opp) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = opp.title.toLowerCase().includes(q);
        const matchesCompany = opp.company.toLowerCase().includes(q);
        const matchesSkills = opp.skills.some(s => s.toLowerCase().includes(q));
        const matchesDesc = opp.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCompany && !matchesSkills && !matchesDesc) {
          return false;
        }
      }

      // Domain
      if (selectedDomain !== 'All Domains' && opp.domain !== selectedDomain) {
        return false;
      }

      // Location
      if (selectedLocation !== 'All Locations') {
        if (!opp.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
          return false;
        }
      }

      // Work Mode
      if (selectedWorkMode !== 'All' && opp.workMode !== selectedWorkMode) {
        return false;
      }

      // Experience Level
      if (selectedExperience !== 'All' && opp.experienceLevel !== selectedExperience) {
        return false;
      }

      // Minimum Salary
      if (minSalary !== 'All' && opp.salary) {
        const num = parseInt(opp.salary.replace(/[^0-9]/g, '').slice(0, 3), 10) || 0;
        if (minSalary === '80' && num < 80) return false;
        if (minSalary === '90' && num < 90) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'deadline') {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      if (sortBy === 'salary') {
        const numA = parseInt((a.salary || '').replace(/[^0-9]/g, '').slice(0, 3), 10) || 0;
        const numB = parseInt((b.salary || '').replace(/[^0-9]/g, '').slice(0, 3), 10) || 0;
        return numB - numA;
      }
      return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
    });
  }, [jobs, searchQuery, selectedDomain, selectedLocation, selectedWorkMode, selectedExperience, minSalary, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDomain('All Domains');
    setSelectedLocation('All Locations');
    setSelectedWorkMode('All');
    setSelectedExperience('All');
    setMinSalary('All');
    setSortBy('newest');
  };

  const hasActiveFilters = 
    searchQuery || 
    selectedDomain !== 'All Domains' || 
    selectedLocation !== 'All Locations' || 
    selectedWorkMode !== 'All' || 
    selectedExperience !== 'All' || 
    minSalary !== 'All';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
            <Briefcase className="w-5 h-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Entry-Level & New Grad Jobs
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Full-time engineering and product opportunities specifically structured for fresh graduates and early career talent
        </p>
      </div>

      {/* Filter and Search Console */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
        
        {/* Top Row: Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job title, technologies, or keywords..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 sm:w-auto w-full">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 w-full sm:w-auto">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="shrink-0">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent focus:outline-none font-bold text-sky-600 dark:text-sky-400 cursor-pointer"
              >
                <option value="newest" className="dark:bg-slate-900">Recently Posted</option>
                <option value="salary" className="dark:bg-slate-900">Highest Salary</option>
                <option value="deadline" className="dark:bg-slate-900">Closing Soonest</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="px-3 py-2 rounded-2xl border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-100 transition shrink-0 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 text-xs">
          
          {/* Experience */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
              Experience
            </label>
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium"
            >
              <option value="All">All Levels</option>
              <option value="Freshers">Freshers Only</option>
              <option value="0-1 Years">0-1 Years</option>
              <option value="1-2 Years">1-2 Years</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
              Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Work Mode */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
              Work Mode
            </label>
            <select
              value={selectedWorkMode}
              onChange={(e) => setSelectedWorkMode(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium"
            >
              <option value="All">All Modes</option>
              <option value="Remote">Remote Only</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          {/* Domain */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
              Domain
            </label>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium"
            >
              {DOMAINS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Min Salary */}
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-[11px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
              Min Salary
            </label>
            <select
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium"
            >
              <option value="All">Any Salary</option>
              <option value="80">$80,000+/yr</option>
              <option value="90">$90,000+/yr</option>
            </select>
          </div>

        </div>
      </div>

      {/* Results Count Bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>Showing <strong>{filteredJobs.length}</strong> entry-level jobs</span>
        {hasActiveFilters && (
          <span className="text-sky-600 dark:text-sky-400 font-bold">Filtered View</span>
        )}
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
          <p className="font-bold text-slate-800 dark:text-slate-200">No jobs match your filters</p>
          <p className="text-xs text-slate-400">Try loosening your experience or salary filters.</p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((opp) => (
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
      )}
    </div>
  );
};
