import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle, 
  Send, 
  Sparkles, 
  AlertCircle,
  Building2,
  GraduationCap
} from 'lucide-react';
import { Opportunity, StudentProfile, Application } from '../types';

interface ApplyModalProps {
  opportunity: Opportunity | null;
  isOpen: boolean;
  onClose: () => void;
  studentProfile: StudentProfile;
  onSubmitApplication: (application: Omit<Application, 'id' | 'appliedAt' | 'status'>) => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  opportunity,
  isOpen,
  onClose,
  studentProfile,
  onSubmitApplication,
}) => {
  if (!isOpen || !opportunity) return null;

  const [coverNote, setCoverNote] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState(
    studentProfile.projects?.[0]?.link || 'https://github.com/alexrivera'
  );
  const [useProfileResume, setUseProfileResume] = useState(true);
  const [customResumeName, setCustomResumeName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCustomFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCustomResumeName(e.target.files[0].name);
      setUseProfileResume(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const resumeFile = useProfileResume
        ? studentProfile.resume?.fileName || 'Alex_Rivera_Resume_2026.pdf'
        : customResumeName || 'Custom_Resume.pdf';

      onSubmitApplication({
        opportunityId: opportunity.id,
        opportunityTitle: opportunity.title,
        company: opportunity.company,
        type: opportunity.type,
        studentId: studentProfile.id,
        studentName: studentProfile.name,
        studentEmail: studentProfile.email,
        studentBranch: studentProfile.branch,
        studentDegree: `${studentProfile.degree} (${studentProfile.graduationYear})`,
        resumeFileName: resumeFile,
        coverNote: coverNote.trim() || `I am excited to apply for the ${opportunity.title} position at ${opportunity.company}. My background in ${studentProfile.branch} and hands-on skills in ${studentProfile.skills.slice(0, 3).join(', ')} make me a strong candidate.`,
        portfolioUrl: portfolioUrl.trim(),
      });

      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1600);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={opportunity.companyLogo}
              alt={opportunity.company}
              className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
            />
            <div>
              <p className="text-xs text-slate-500 font-medium">Applying for {opportunity.company}</p>
              <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
                {opportunity.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">
              Application Submitted Successfully!
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Your profile and resume have been dispatched to <strong>{opportunity.company}</strong>'s hiring team. You can track this in your profile!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            
            {/* Student Verified Info Banner */}
            <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 flex items-start gap-3 text-xs">
              <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900 dark:text-blue-200">
                  {studentProfile.name} • {studentProfile.university}
                </p>
                <p className="text-blue-800/80 dark:text-blue-300 mt-0.5">
                  {studentProfile.degree} ({studentProfile.branch}) • CGPA: {studentProfile.cgpa}
                </p>
              </div>
            </div>

            {/* Resume Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Resume Attachment
              </label>

              <div className="space-y-2">
                {studentProfile.resume && (
                  <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                    useProfileResume
                      ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 ring-1 ring-blue-600'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="resumeChoice"
                        checked={useProfileResume}
                        onChange={() => setUseProfileResume(true)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <FileText className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {studentProfile.resume.fileName}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Profile Default • {studentProfile.resume.fileSize}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      Ready
                    </span>
                  </label>
                )}

                {/* Upload customized resume option */}
                <div className="relative">
                  <label className={`flex items-center justify-between p-3 rounded-xl border border-dashed cursor-pointer transition ${
                    !useProfileResume
                      ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/30'
                      : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="resumeChoice"
                        checked={!useProfileResume}
                        onChange={() => setUseProfileResume(false)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <Upload className="w-4 h-4 text-slate-500" />
                      <div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {customResumeName ? customResumeName : 'Upload tailored resume (PDF)'}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Max 5MB • PDF or DOCX
                        </p>
                      </div>
                    </div>

                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleCustomFileUpload}
                      className="hidden"
                      id="custom-file-input"
                    />
                    <label
                      htmlFor="custom-file-input"
                      className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                    >
                      Browse
                    </label>
                  </label>
                </div>
              </div>
            </div>

            {/* Portfolio / GitHub Link */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Portfolio or GitHub URL
              </label>
              <input
                type="url"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                placeholder="https://github.com/your-username or portfolio link"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Note / Pitch to Recruiter */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Quick Note / Why You're a Fit
                </label>
                <span className="text-[11px] text-slate-400">Optional</span>
              </div>
              <textarea
                rows={3}
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                placeholder={`Highlight 1-2 relevant projects or what excites you about ${opportunity.company}...`}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white shadow-md transition cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Confirm & Apply</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
