import React, { useState } from 'react';
import { 
  Building2, 
  PlusCircle, 
  Users, 
  Briefcase, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Eye, 
  Edit, 
  ExternalLink, 
  Calendar, 
  DollarSign, 
  MapPin, 
  ToggleLeft, 
  ToggleRight,
  Filter,
  Save,
  MessageSquare
} from 'lucide-react';
import { Opportunity, RecruiterProfile, Application, WorkMode, ExperienceLevel } from '../types';
import { DOMAINS, LOCATIONS } from '../data/mockData';

interface RecruiterDashboardViewProps {
  recruiterProfile: RecruiterProfile;
  onUpdateRecruiterProfile: (profile: RecruiterProfile) => void;
  opportunities: Opportunity[];
  onAddOpportunity: (opp: Opportunity) => void;
  onToggleOpportunityStatus: (id: string) => void;
  onDeleteOpportunity: (id: string) => void;
  applications: Application[];
  onUpdateApplicationStatus: (id: string, status: Application['status'], notes?: string) => void;
}

export const RecruiterDashboardView: React.FC<RecruiterDashboardViewProps> = ({
  recruiterProfile,
  onUpdateRecruiterProfile,
  opportunities,
  onAddOpportunity,
  onToggleOpportunityStatus,
  onDeleteOpportunity,
  applications,
  onUpdateApplicationStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'openings' | 'post' | 'applicants' | 'company'>('openings');
  
  // Post Form State
  const [postForm, setPostForm] = useState({
    title: '',
    type: 'internship' as 'internship' | 'job',
    domain: 'Software Engineering',
    location: 'Remote',
    workMode: 'Remote' as WorkMode,
    duration: '3 Months',
    stipend: '$1,500/mo',
    salary: '$80,000 - $100,000/yr',
    experienceLevel: 'Freshers' as ExperienceLevel,
    skills: 'React, TypeScript, Node.js',
    description: '',
    responsibilities: 'Build features, write unit tests, collaborate in sprint reviews',
    eligibility: 'Pre-final or Final year CSE/IT/ECE students with 7.0+ CGPA',
    deadline: '2026-11-15',
  });
  const [postSuccess, setPostSuccess] = useState(false);

  // Applicant Filter State
  const [applicantFilterRole, setApplicantFilterRole] = useState('All');
  const [applicantFilterStatus, setApplicantFilterStatus] = useState('All');

  // Company Profile Form
  const [companyForm, setCompanyForm] = useState({ ...recruiterProfile });
  const [companySaved, setCompanySaved] = useState(false);

  // Note editing for applicant
  const [selectedApplicant, setSelectedApplicant] = useState<Application | null>(null);
  const [noteText, setNoteText] = useState('');

  const companyOpportunities = opportunities.filter(
    o => o.company.toLowerCase() === recruiterProfile.companyName.toLowerCase() || o.recruiterId === recruiterProfile.id
  );

  const activeCount = companyOpportunities.filter(o => o.status === 'active').length;
  const totalApplicants = applications.filter(a => 
    companyOpportunities.some(o => o.id === a.opportunityId) || a.company.toLowerCase() === recruiterProfile.companyName.toLowerCase()
  ).length;

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newOpp: Opportunity = {
      id: `opp-${Date.now()}`,
      type: postForm.type,
      title: postForm.title,
      company: recruiterProfile.companyName,
      companyLogo: recruiterProfile.companyLogo,
      companyWebsite: recruiterProfile.website,
      companySize: recruiterProfile.companySize,
      companyAbout: recruiterProfile.about,
      domain: postForm.domain,
      location: postForm.location,
      workMode: postForm.workMode,
      duration: postForm.type === 'internship' ? postForm.duration : undefined,
      stipend: postForm.type === 'internship' ? postForm.stipend : undefined,
      salary: postForm.type === 'job' ? postForm.salary : undefined,
      experienceLevel: postForm.type === 'job' ? postForm.experienceLevel : undefined,
      skills: postForm.skills.split(',').map(s => s.trim()).filter(Boolean),
      description: postForm.description,
      responsibilities: postForm.responsibilities.split('\n').filter(Boolean),
      requirements: ['Strong fundamentals in programming', 'Good communication skills'],
      eligibility: postForm.eligibility,
      deadline: postForm.deadline,
      postedDate: new Date().toISOString().split('T')[0],
      applicantCount: 0,
      featured: true,
      status: 'active',
      recruiterId: recruiterProfile.id,
    };

    onAddOpportunity(newOpp);
    setPostSuccess(true);
    setTimeout(() => {
      setPostSuccess(false);
      setActiveTab('openings');
    }, 1500);
  };

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateRecruiterProfile(companyForm);
    setCompanySaved(true);
    setTimeout(() => setCompanySaved(false), 2000);
  };

  // Filtered applicants
  const relevantApplications = applications.filter(app => {
    const matchesRole = applicantFilterRole === 'All' || app.opportunityTitle === applicantFilterRole;
    const matchesStatus = applicantFilterStatus === 'All' || app.status === applicantFilterStatus;
    return matchesRole && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={recruiterProfile.companyLogo}
            alt={recruiterProfile.companyName}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-indigo-500/50 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                {recruiterProfile.companyName}
              </h1>
              <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-2.5 py-0.5 rounded-full font-bold">
                Recruiter Portal
              </span>
            </div>
            <p className="text-sm text-slate-300 mt-1">
              {recruiterProfile.name} • {recruiterProfile.role}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              {recruiterProfile.industry} • {recruiterProfile.headquarters}
            </p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-3 w-full md:w-auto text-center">
          <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10">
            <p className="text-2xl font-black text-indigo-300">{activeCount}</p>
            <p className="text-[11px] text-slate-300 font-semibold mt-0.5">Active Roles</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10">
            <p className="text-2xl font-black text-emerald-300">{totalApplicants}</p>
            <p className="text-[11px] text-slate-300 font-semibold mt-0.5">Applicants</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10">
            <p className="text-2xl font-black text-sky-300">92%</p>
            <p className="text-[11px] text-slate-300 font-semibold mt-0.5">Response Rate</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('openings')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'openings'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Manage Openings</span>
          <span className="text-xs bg-white/20 px-2 py-0.2 rounded-full">{companyOpportunities.length}</span>
        </button>

        <button
          onClick={() => setActiveTab('post')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'post'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Opportunity</span>
        </button>

        <button
          onClick={() => setActiveTab('applicants')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'applicants'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Candidate Applications</span>
          <span className="text-xs bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 px-2 py-0.2 rounded-full">
            {applications.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('company')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'company'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Company Profile</span>
        </button>
      </div>

      {/* Tab 1: Manage Openings */}
      {activeTab === 'openings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Company Postings ({companyOpportunities.length})
            </h3>
            <button
              onClick={() => setActiveTab('post')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Role</span>
            </button>
          </div>

          {companyOpportunities.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800">
              <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="font-bold text-base text-slate-800 dark:text-slate-200">No postings yet</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-4">
                Publish your first university internship or fresh graduate role to receive top student candidates.
              </p>
              <button
                onClick={() => setActiveTab('post')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold cursor-pointer"
              >
                Post Your First Role
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {companyOpportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          opp.type === 'internship' ? 'bg-indigo-50 text-indigo-700' : 'bg-sky-50 text-sky-700'
                        }`}>
                          {opp.type}
                        </span>
                        <h4 className="font-bold text-base text-slate-900 dark:text-white mt-1">
                          {opp.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {opp.location} • {opp.workMode} • {opp.type === 'internship' ? opp.stipend : opp.salary}
                        </p>
                      </div>

                      <button
                        onClick={() => onToggleOpportunityStatus(opp.id)}
                        className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 cursor-pointer transition ${
                          opp.status === 'active'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                        title="Click to toggle active status"
                      >
                        {opp.status === 'active' ? 'Active' : 'Closed'}
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {opp.skills.map((s, idx) => (
                        <span key={idx} className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-semibold flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-indigo-500" />
                      {opp.applicantCount} applicants
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onDeleteOpportunity(opp.id)}
                        className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg transition cursor-pointer"
                        title="Delete listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Post New Opportunity */}
      {activeTab === 'post' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm max-w-3xl mx-auto">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Create New Internship or Job Posting
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Position will immediately be published and recommended to matching students
            </p>
          </div>

          {postSuccess && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 text-emerald-800 dark:text-emerald-300 text-sm font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Opportunity published successfully! Redirecting to openings...</span>
            </div>
          )}

          <form onSubmit={handlePostSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Opportunity Type</label>
                <div className="mt-1.5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPostForm({ ...postForm, type: 'internship' })}
                    className={`flex-1 py-2 rounded-xl font-bold border transition cursor-pointer ${
                      postForm.type === 'internship'
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Internship
                  </button>
                  <button
                    type="button"
                    onClick={() => setPostForm({ ...postForm, type: 'job' })}
                    className={`flex-1 py-2 rounded-xl font-bold border transition cursor-pointer ${
                      postForm.type === 'job'
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Full-Time Job
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Role Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Research Intern, Junior Frontend Dev"
                  value={postForm.title}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                  className="w-full mt-1.5 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Domain / Category</label>
                <select
                  value={postForm.domain}
                  onChange={(e) => setPostForm({ ...postForm, domain: e.target.value })}
                  className="w-full mt-1.5 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                >
                  {DOMAINS.filter(d => d !== 'All Domains').map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Work Mode</label>
                <select
                  value={postForm.workMode}
                  onChange={(e) => setPostForm({ ...postForm, workMode: e.target.value as WorkMode })}
                  className="w-full mt-1.5 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Location</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. San Francisco, CA / Remote"
                  value={postForm.location}
                  onChange={(e) => setPostForm({ ...postForm, location: e.target.value })}
                  className="w-full mt-1.5 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {postForm.type === 'internship' ? (
                <>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300">Duration</label>
                    <input
                      type="text"
                      placeholder="e.g. 3 Months, 6 Months"
                      value={postForm.duration}
                      onChange={(e) => setPostForm({ ...postForm, duration: e.target.value })}
                      className="w-full mt-1.5 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300">Stipend</label>
                    <input
                      type="text"
                      placeholder="e.g. $1,800/mo or ₹40,000/mo"
                      value={postForm.stipend}
                      onChange={(e) => setPostForm({ ...postForm, stipend: e.target.value })}
                      className="w-full mt-1.5 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300">Experience Required</label>
                    <select
                      value={postForm.experienceLevel}
                      onChange={(e) => setPostForm({ ...postForm, experienceLevel: e.target.value as ExperienceLevel })}
                      className="w-full mt-1.5 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    >
                      <option value="Freshers">Freshers</option>
                      <option value="0-1 Years">0-1 Years</option>
                      <option value="1-2 Years">1-2 Years</option>
                      <option value="2+ Years">2+ Years</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300">Salary Range</label>
                    <input
                      type="text"
                      placeholder="e.g. $85,000 - $110,000/yr"
                      value={postForm.salary}
                      onChange={(e) => setPostForm({ ...postForm, salary: e.target.value })}
                      className="w-full mt-1.5 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Required Skills (comma separated)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Java, Spring Boot, SQL, Docker"
                  value={postForm.skills}
                  onChange={(e) => setPostForm({ ...postForm, skills: e.target.value })}
                  className="w-full mt-1.5 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Application Deadline</label>
                <input
                  type="date"
                  required
                  value={postForm.deadline}
                  onChange={(e) => setPostForm({ ...postForm, deadline: e.target.value })}
                  className="w-full mt-1.5 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Eligibility & Academic Criteria
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Open to 2025/2026 Batch CSE/IT students with min 6.5 CGPA"
                value={postForm.eligibility}
                onChange={(e) => setPostForm({ ...postForm, eligibility: e.target.value })}
                className="w-full mt-1.5 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300">Role Description</label>
              <textarea
                rows={3}
                required
                placeholder="Describe team mission, mentorship culture, and daily impact..."
                value={postForm.description}
                onChange={(e) => setPostForm({ ...postForm, description: e.target.value })}
                className="w-full mt-1.5 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Key Responsibilities (one per line)
              </label>
              <textarea
                rows={3}
                placeholder="Design and develop responsive UI components&#10;Write unit and integration tests&#10;Collaborate in daily standups"
                value={postForm.responsibilities}
                onChange={(e) => setPostForm({ ...postForm, responsibilities: e.target.value })}
                className="w-full mt-1.5 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>

            <div className="pt-3 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('openings')}
                className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md cursor-pointer transition"
              >
                Publish Opportunity
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: Candidate Applications */}
      {activeTab === 'applicants' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Candidate Applications ({relevantApplications.length})
              </h3>
              <p className="text-xs text-slate-400">Review student resumes, notes, and advance hiring stages</p>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={applicantFilterStatus}
                onChange={(e) => setApplicantFilterStatus(e.target.value)}
                className="text-xs p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <option value="All">All Statuses</option>
                <option value="Applied">Applied</option>
                <option value="Under Review">Under Review</option>
                <option value="Interview">Interview</option>
                <option value="Offer Extended">Offer Extended</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {relevantApplications.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="font-bold text-slate-700 dark:text-slate-300">No applications match your filter</p>
            </div>
          ) : (
            <div className="space-y-3">
              {relevantApplications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-base text-slate-900 dark:text-white">
                        {app.studentName}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">
                        • {app.studentBranch} ({app.studentDegree})
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        app.status === 'Interview' ? 'bg-indigo-100 text-indigo-800 border-indigo-300' :
                        app.status === 'Offer Extended' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                        app.status === 'Under Review' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                        'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                      Applied for: <strong>{app.opportunityTitle}</strong> ({app.appliedAt})
                    </p>

                    <p className="text-xs text-slate-600 dark:text-slate-300 italic bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                      "{app.coverNote}"
                    </p>

                    <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                      <span>Resume: <strong>{app.resumeFileName}</strong></span>
                      {app.portfolioUrl && (
                        <a
                          href={app.portfolioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-0.5"
                        >
                          <span>Portfolio</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Actions: Update status */}
                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <select
                      value={app.status}
                      onChange={(e) => onUpdateApplicationStatus(app.id, e.target.value as Application['status'])}
                      className="text-xs font-semibold p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 cursor-pointer"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Interview">Schedule Interview</option>
                      <option value="Offer Extended">Extend Offer</option>
                      <option value="Rejected">Decline Candidate</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Company Profile */}
      {activeTab === 'company' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm max-w-2xl mx-auto space-y-6">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Company Profile Settings
            </h3>
            <p className="text-xs text-slate-400">
              This information is displayed to students on opportunity detail cards
            </p>
          </div>

          {companySaved && (
            <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Company profile updated!</span>
            </div>
          )}

          <form onSubmit={handleCompanySubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Company Name</label>
                <input
                  type="text"
                  required
                  value={companyForm.companyName}
                  onChange={(e) => setCompanyForm({ ...companyForm, companyName: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Industry</label>
                <input
                  type="text"
                  value={companyForm.industry}
                  onChange={(e) => setCompanyForm({ ...companyForm, industry: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Company Website</label>
                <input
                  type="url"
                  value={companyForm.website}
                  onChange={(e) => setCompanyForm({ ...companyForm, website: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Team Size</label>
                <input
                  type="text"
                  value={companyForm.companySize}
                  onChange={(e) => setCompanyForm({ ...companyForm, companySize: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300">Company Logo URL</label>
              <input
                type="url"
                value={companyForm.companyLogo}
                onChange={(e) => setCompanyForm({ ...companyForm, companyLogo: e.target.value })}
                className="w-full mt-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300">About Company</label>
              <textarea
                rows={4}
                value={companyForm.about}
                onChange={(e) => setCompanyForm({ ...companyForm, about: e.target.value })}
                className="w-full mt-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer transition shadow-md"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
