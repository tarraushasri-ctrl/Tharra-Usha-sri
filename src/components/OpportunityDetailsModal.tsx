import React from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  Clock, 
  DollarSign, 
  Briefcase, 
  Calendar, 
  Bookmark, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Share2, 
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { Opportunity, StudentProfile } from '../types';
import { calculateMatchScore, getDeadlineInfo } from '../utils/helpers';

interface OpportunityDetailsModalProps {
  opportunity: Opportunity | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onApply: (opp: Opportunity) => void;
  hasApplied: boolean;
  studentProfile?: StudentProfile;
}

export const OpportunityDetailsModal: React.FC<OpportunityDetailsModalProps> = ({
  opportunity,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
  onApply,
  hasApplied,
  studentProfile,
}) => {
  if (!isOpen || !opportunity) return null;

  const matchScore = studentProfile 
    ? calculateMatchScore(studentProfile.skills, opportunity.skills) 
    : 0;
  
  const deadlineInfo = getDeadlineInfo(opportunity.deadline);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${opportunity.title} at ${opportunity.company}`,
        text: `Check out this ${opportunity.type} opportunity on CareerConnect!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Opportunity link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <img
              src={opportunity.companyLogo}
              alt={opportunity.company}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-sm shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-base">
                  {opportunity.company}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-100/80 dark:bg-blue-950/60 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-blue-600" />
                  Verified Employer
                </span>
                {opportunity.companyWebsite && (
                  <a
                    href={opportunity.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-0.5"
                  >
                    <span>Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1 leading-tight">
                {opportunity.title}
              </h2>

              <div className="flex items-center gap-3 mt-2 text-xs text-slate-600 dark:text-slate-400 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {opportunity.location} ({opportunity.workMode})
                </span>
                <span>•</span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 text-sm">
                  <DollarSign className="w-4 h-4 -mr-0.5" />
                  {opportunity.type === 'internship' ? opportunity.stipend : opportunity.salary}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title="Share role"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleSave(opportunity.id)}
              className={`p-2 rounded-xl transition cursor-pointer ${
                isSaved
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={isSaved ? 'Bookmarked' : 'Save opportunity'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 dark:text-slate-300">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Type</p>
              <p className="font-bold text-slate-800 dark:text-slate-100 capitalize mt-0.5">
                {opportunity.type}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                {opportunity.type === 'internship' ? 'Duration' : 'Experience'}
              </p>
              <p className="font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                {opportunity.type === 'internship' ? opportunity.duration : opportunity.experienceLevel}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Deadline</p>
              <p className={`font-bold mt-0.5 ${deadlineInfo.isUrgent ? 'text-amber-600 dark:text-amber-400' : 'text-slate-800 dark:text-slate-100'}`}>
                {deadlineInfo.label}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Your Match</p>
              <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {matchScore}% Profile Match
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              About the Role
            </h3>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              {opportunity.description}
            </p>
          </div>

          {/* Responsibilities */}
          {opportunity.responsibilities?.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2.5">
                Key Responsibilities
              </h3>
              <ul className="space-y-2">
                {opportunity.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Eligibility Criteria */}
          <div className="bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/50 p-4 rounded-xl">
            <h3 className="text-sm font-bold text-blue-950 dark:text-blue-200 flex items-center gap-2 mb-1.5">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              Eligibility & Batch Criteria
            </h3>
            <p className="text-xs sm:text-sm text-blue-900 dark:text-blue-300 leading-relaxed">
              {opportunity.eligibility}
            </p>
          </div>

          {/* Required Skills */}
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2.5">
              Required & Preferred Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {opportunity.skills.map((skill, i) => {
                const hasSkill = studentProfile?.skills?.some(s => s.toLowerCase() === skill.toLowerCase());
                return (
                  <span
                    key={i}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                      hasSkill
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {hasSkill && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    <span>{skill}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Company Background */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-400" />
              About {opportunity.company}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
              {opportunity.companyAbout}
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span>Domain: <strong className="text-slate-700 dark:text-slate-300">{opportunity.domain}</strong></span>
              <span>Team Size: <strong className="text-slate-700 dark:text-slate-300">{opportunity.companySize}</strong></span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-500 hidden sm:block">
            Posted on {opportunity.postedDate} • {opportunity.applicantCount} students applied
          </div>

          <div className="flex items-center gap-3 ml-auto w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer text-xs sm:text-sm"
            >
              Close
            </button>

            {hasApplied ? (
              <span className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Application Submitted
              </span>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onApply(opportunity);
                }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <span>Apply Now</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
