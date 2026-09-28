import React from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  DollarSign, 
  Briefcase, 
  Bookmark, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  Users
} from 'lucide-react';
import { Opportunity, StudentProfile } from '../types';
import { calculateMatchScore, getDeadlineInfo } from '../utils/helpers';

interface OpportunityCardProps {
  opportunity: Opportunity;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onViewDetails: (opp: Opportunity) => void;
  onApply: (opp: Opportunity) => void;
  hasApplied: boolean;
  studentProfile?: StudentProfile;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  isSaved,
  onToggleSave,
  onViewDetails,
  onApply,
  hasApplied,
  studentProfile,
}) => {
  const matchScore = studentProfile 
    ? calculateMatchScore(studentProfile.skills, opportunity.skills) 
    : 0;
  
  const deadlineInfo = getDeadlineInfo(opportunity.deadline);

  // Work Mode colors
  const getWorkModeBadge = () => {
    switch (opportunity.workMode) {
      case 'Remote':
        return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Hybrid':
        return 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      default:
        return 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500/50 transition-all duration-200 flex flex-col justify-between">
      
      {/* Top row: Company info, Type badge, Bookmark */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={opportunity.companyLogo}
              alt={`${opportunity.company} logo`}
              className="w-12 h-12 rounded-xl object-cover border border-slate-100 dark:border-slate-800 shadow-xs"
              loading="lazy"
            />
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">
                  {opportunity.company}
                </span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-950/50 px-1.5 py-0.2 rounded-md">
                  Verified
                </span>
              </div>
              <h3 
                onClick={() => onViewDetails(opportunity)}
                className="font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 cursor-pointer transition-colors leading-snug line-clamp-1"
              >
                {opportunity.title}
              </h3>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={() => onToggleSave(opportunity.id)}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isSaved 
                ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400' 
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save opportunity'}
            aria-label="Bookmark Opportunity"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Key Badges Bar */}
        <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs">
          {/* Opportunity Type Pill */}
          <span className={`px-2.5 py-0.8 rounded-full font-semibold border ${
            opportunity.type === 'internship'
              ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
              : 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800'
          }`}>
            {opportunity.type === 'internship' ? 'Internship' : 'Full-Time Job'}
          </span>

          {/* Work Mode */}
          <span className={`px-2.5 py-0.8 rounded-full font-medium border ${getWorkModeBadge()}`}>
            {opportunity.workMode}
          </span>

          {/* Duration or Experience */}
          {opportunity.type === 'internship' && opportunity.duration && (
            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-0.8 rounded-full border border-slate-200 dark:border-slate-700 font-medium">
              <Clock className="w-3 h-3 text-slate-400" />
              {opportunity.duration}
            </span>
          )}

          {opportunity.type === 'job' && opportunity.experienceLevel && (
            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-0.8 rounded-full border border-slate-200 dark:border-slate-700 font-medium">
              <Briefcase className="w-3 h-3 text-slate-400" />
              {opportunity.experienceLevel}
            </span>
          )}

          {/* Smart Match Score for Student */}
          {matchScore > 50 && (
            <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              {matchScore}% Match
            </span>
          )}
        </div>

        {/* Location & Compensation */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs border-y border-slate-100 dark:border-slate-800/80 py-2.5">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{opportunity.location}</span>
          </div>

          <div className="flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
            <DollarSign className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">
              {opportunity.type === 'internship' ? opportunity.stipend : opportunity.salary}
            </span>
          </div>
        </div>

        {/* Skills Pills */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {opportunity.skills.slice(0, 4).map((skill, index) => {
            const isUserSkill = studentProfile?.skills?.some(s => s.toLowerCase() === skill.toLowerCase());
            return (
              <span
                key={index}
                className={`text-[11px] px-2 py-0.5 rounded-md font-medium transition-colors ${
                  isUserSkill 
                    ? 'bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 font-semibold' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {skill}
              </span>
            );
          })}
          {opportunity.skills.length > 4 && (
            <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800/50 text-slate-400 font-medium">
              +{opportunity.skills.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Footer: Deadline + Apply CTA */}
      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span className={`font-medium ${
            deadlineInfo.isUrgent 
              ? 'text-amber-600 dark:text-amber-400 font-semibold' 
              : 'text-slate-500 dark:text-slate-400'
          }`}>
            {deadlineInfo.label}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewDetails(opportunity)}
            className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            Details
          </button>

          {hasApplied ? (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Applied
            </span>
          ) : (
            <button
              onClick={() => onApply(opportunity)}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs hover:shadow transition cursor-pointer"
            >
              <span>Apply</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
