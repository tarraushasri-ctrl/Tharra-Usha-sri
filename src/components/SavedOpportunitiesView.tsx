import React, { useState } from 'react';
import { Bookmark, Sparkles, ArrowRight, Trash2 } from 'lucide-react';
import { Opportunity, StudentProfile } from '../types';
import { OpportunityCard } from './OpportunityCard';

interface SavedOpportunitiesViewProps {
  savedOpportunityIds: string[];
  opportunities: Opportunity[];
  onToggleSave: (id: string) => void;
  onViewDetails: (opp: Opportunity) => void;
  onApply: (opp: Opportunity) => void;
  appliedOpportunityIds: string[];
  studentProfile: StudentProfile;
  onExplore: () => void;
}

export const SavedOpportunitiesView: React.FC<SavedOpportunitiesViewProps> = ({
  savedOpportunityIds,
  opportunities,
  onToggleSave,
  onViewDetails,
  onApply,
  appliedOpportunityIds,
  studentProfile,
  onExplore,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'internship' | 'job'>('all');

  const savedList = opportunities.filter(o => savedOpportunityIds.includes(o.id));
  const filteredList = savedList.filter(o => filterType === 'all' || o.type === filterType);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <Bookmark className="w-5 h-5 fill-current" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Saved Opportunities
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Keep track of roles you're interested in and apply before application deadlines close
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              filterType === 'all' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            All ({savedList.length})
          </button>
          <button
            onClick={() => setFilterType('internship')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              filterType === 'internship' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Internships ({savedList.filter(o => o.type === 'internship').length})
          </button>
          <button
            onClick={() => setFilterType('job')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              filterType === 'job' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Jobs ({savedList.filter(o => o.type === 'job').length})
          </button>
        </div>
      </div>

      {filteredList.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4 max-w-md mx-auto my-12">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/60 text-blue-500 rounded-2xl flex items-center justify-center mx-auto">
            <Bookmark className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              No saved opportunities yet
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Click the bookmark icon on any internship or job card to save it for quick review and one-click applications.
            </p>
          </div>
          <button
            onClick={onExplore}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
          >
            <span>Explore Opportunities</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              isSaved={true}
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
