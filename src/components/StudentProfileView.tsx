import React, { useState } from 'react';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Mail, 
  Phone, 
  Upload, 
  FileText, 
  Plus, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  Edit3, 
  Save, 
  X, 
  Sparkles,
  Award,
  Code2,
  FolderGit2,
  Clock
} from 'lucide-react';
import { StudentProfile, Application, Opportunity } from '../types';

interface StudentProfileViewProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
  applications: Application[];
  opportunities: Opportunity[];
  onViewOpportunity: (opp: Opportunity) => void;
  onOpenAIAssistant: () => void;
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({
  profile,
  onUpdateProfile,
  applications,
  opportunities,
  onViewOpportunity,
  onOpenAIAssistant,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'applications'>('profile');
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [headerForm, setHeaderForm] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    university: profile.university,
    degree: profile.degree,
    branch: profile.branch,
    graduationYear: profile.graduationYear,
    cgpa: profile.cgpa,
    preferredRole: profile.preferredRole,
    preferredLocation: profile.preferredLocation,
    bio: profile.bio,
  });

  const [newSkillInput, setNewSkillInput] = useState('');
  
  // Project modal state
  const [showAddProject, setShowAddProject] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: '',
    tech: '',
    link: '',
    description: '',
  });

  // Certification modal state
  const [showAddCert, setShowAddCert] = useState(false);
  const [certForm, setCertForm] = useState({
    name: '',
    issuer: '',
    year: '2025',
    link: '',
  });

  // Resume upload feedback
  const [resumeUploadMsg, setResumeUploadMsg] = useState<string | null>(null);

  const handleSaveHeader = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      ...headerForm,
    });
    setIsEditingHeader(false);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const skill = newSkillInput.trim();
    if (skill && !profile.skills.some(s => s.toLowerCase() === skill.toLowerCase())) {
      onUpdateProfile({
        ...profile,
        skills: [...profile.skills, skill],
      });
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onUpdateProfile({
      ...profile,
      skills: profile.skills.filter(s => s !== skillToRemove),
    });
  };

  const handleResumeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeStr = `${(file.size / 1024).toFixed(0)} KB`;
      onUpdateProfile({
        ...profile,
        resume: {
          fileName: file.name,
          fileSize: sizeStr,
          uploadedAt: new Date().toISOString().split('T')[0],
        },
      });
      setResumeUploadMsg(`Successfully uploaded ${file.name}!`);
      setTimeout(() => setResumeUploadMsg(null), 3000);
    }
  };

  const handleAddProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title.trim()) return;

    const newProj = {
      id: `proj-${Date.now()}`,
      title: projectForm.title.trim(),
      tech: projectForm.tech.split(',').map(t => t.trim()).filter(Boolean),
      link: projectForm.link.trim() || undefined,
      description: projectForm.description.trim(),
    };

    onUpdateProfile({
      ...profile,
      projects: [newProj, ...profile.projects],
    });

    setProjectForm({ title: '', tech: '', link: '', description: '' });
    setShowAddProject(false);
  };

  const handleDeleteProject = (projId: string) => {
    onUpdateProfile({
      ...profile,
      projects: profile.projects.filter(p => p.id !== projId),
    });
  };

  const handleAddCertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certForm.name.trim()) return;

    const newCert = {
      id: `cert-${Date.now()}`,
      name: certForm.name.trim(),
      issuer: certForm.issuer.trim(),
      year: certForm.year.trim(),
      link: certForm.link.trim() || undefined,
    };

    onUpdateProfile({
      ...profile,
      certifications: [newCert, ...profile.certifications],
    });

    setCertForm({ name: '', issuer: '', year: '2025', link: '' });
    setShowAddCert(false);
  };

  const handleDeleteCert = (certId: string) => {
    onUpdateProfile({
      ...profile,
      certifications: profile.certifications.filter(c => c.id !== certId),
    });
  };

  const studentApplications = applications.filter(a => a.studentId === profile.id);

  // Status Badge Helper
  const getStatusBadge = (status: Application['status']) => {
    switch (status) {
      case 'Offer Extended':
        return 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300';
      case 'Interview':
        return 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border-indigo-300';
      case 'Under Review':
        return 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300';
      case 'Rejected':
        return 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border-rose-300';
      default:
        return 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border-blue-300';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Profile Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 opacity-90"></div>
        
        <div className="relative pt-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-xl"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {profile.name}
                </h1>
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900">
                  Student Member
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                {profile.degree} in {profile.branch} • Batch of {profile.graduationYear}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {profile.university} • CGPA: <strong>{profile.cgpa}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:self-end">
            <button
              onClick={() => setIsEditingHeader(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={onOpenAIAssistant}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm hover:shadow transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Resume Review</span>
            </button>
          </div>
        </div>

        {/* Bio and Target Preferences */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="md:col-span-2">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {profile.bio}
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
            <p className="text-slate-500 font-semibold">Target Preferences</p>
            <p className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-500" />
              Role: <strong>{profile.preferredRole}</strong>
            </p>
            <p className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              Location: <strong>{profile.preferredLocation}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Switcher: Profile Details vs My Applications */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Profile Details & Resume
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'applications'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>Applied Opportunities</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
            activeTab === 'applications' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
          }`}>
            {studentApplications.length}
          </span>
        </button>
      </div>

      {activeTab === 'profile' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Skills & Resume */}
          <div className="space-y-6">
            
            {/* Resume Upload Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Primary Resume
                </h3>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  Ready for 1-Click Apply
                </span>
              </div>

              {profile.resume ? (
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 max-w-[150px] truncate">
                        {profile.resume.fileName}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {profile.resume.fileSize} • Uploaded {profile.resume.uploadedAt}
                      </p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                </div>
              ) : (
                <p className="text-xs text-slate-400">No resume uploaded yet.</p>
              )}

              {/* Upload New Resume */}
              <div>
                <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-xl cursor-pointer bg-slate-50/50 dark:bg-slate-800/40 transition">
                  <Upload className="w-5 h-5 text-slate-400 mb-1" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Upload Updated PDF Resume
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    PDF, DOC, DOCX up to 5MB
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeFile}
                    className="hidden"
                  />
                </label>
              </div>

              {resumeUploadMsg && (
                <p className="text-xs text-emerald-600 font-semibold text-center animate-in fade-in">
                  {resumeUploadMsg}
                </p>
              )}
            </div>

            {/* Skills Tag Manager */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-blue-600" />
                  Technical & Domain Skills
                </h3>
                <span className="text-xs text-slate-400 font-semibold">{profile.skills.length} skills</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-blue-400 hover:text-rose-600 transition cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add Skill Form */}
              <form onSubmit={handleAddSkill} className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  placeholder="e.g. Next.js, Kubernetes..."
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={!newSkillInput.trim()}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold disabled:opacity-50 transition cursor-pointer"
                >
                  Add
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Projects & Certifications */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Projects Section */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                    <FolderGit2 className="w-5 h-5 text-indigo-600" />
                    Key Projects & Technical Work
                  </h3>
                  <p className="text-xs text-slate-400">Showcase practical implementations recruiters look for</p>
                </div>
                <button
                  onClick={() => setShowAddProject(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 cursor-pointer transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="space-y-3">
                {profile.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/40 space-y-2 hover:border-indigo-300 dark:hover:border-indigo-700 transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          {proj.title}
                        </h4>
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 mt-0.5"
                          >
                            <span>Live Demo / Repository</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="text-slate-400 hover:text-rose-600 transition p-1"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold bg-slate-200/70 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Section */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    Certifications & Coursework
                  </h3>
                  <p className="text-xs text-slate-400">Verified credentials from accredited platforms</p>
                </div>
                <button
                  onClick={() => setShowAddCert(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 cursor-pointer transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Certificate</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profile.certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 flex items-start justify-between gap-2"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {cert.name}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {cert.issuer} • {cert.year}
                      </p>
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-0.5 mt-1"
                        >
                          <span>Credential URL</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteCert(cert.id)}
                      className="text-slate-400 hover:text-rose-600 transition p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* Applications Tracker Tab */
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Tracked Applications ({studentApplications.length})
              </h3>
              <p className="text-xs text-slate-400">
                Real-time hiring status updates sent directly from partner recruiters
              </p>
            </div>
          </div>

          {studentApplications.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <Clock className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-700 dark:text-slate-300">No applications yet</p>
              <p className="text-xs text-slate-400">
                Explore internships and jobs to submit your first application!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {studentApplications.map((app) => {
                const matchedOpp = opportunities.find(o => o.id === app.opportunityId);
                return (
                  <div
                    key={app.id}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-base text-slate-900 dark:text-white">
                          {app.opportunityTitle}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">
                          at {app.company}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(app.status)}`}>
                          {app.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 flex-wrap">
                        <span>Applied on {app.appliedAt}</span>
                        <span>•</span>
                        <span>Resume: {app.resumeFileName}</span>
                      </div>

                      {app.recruiterNotes && (
                        <div className="mt-2 text-xs bg-indigo-50/80 dark:bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-200/60 dark:border-indigo-900/40 text-indigo-900 dark:text-indigo-200">
                          <strong>Recruiter Feedback:</strong> {app.recruiterNotes}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      {matchedOpp && (
                        <button
                          onClick={() => onViewOpportunity(matchedOpp)}
                          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 transition cursor-pointer"
                        >
                          View Job Details
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Edit Header Modal */}
      {isEditingHeader && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Edit Student Profile
              </h3>
              <button onClick={() => setIsEditingHeader(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveHeader} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                  <input
                    type="text"
                    value={headerForm.name}
                    onChange={(e) => setHeaderForm({ ...headerForm, name: e.target.value })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Email</label>
                  <input
                    type="email"
                    value={headerForm.email}
                    onChange={(e) => setHeaderForm({ ...headerForm, email: e.target.value })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">University</label>
                  <input
                    type="text"
                    value={headerForm.university}
                    onChange={(e) => setHeaderForm({ ...headerForm, university: e.target.value })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Branch / Major</label>
                  <input
                    type="text"
                    value={headerForm.branch}
                    onChange={(e) => setHeaderForm({ ...headerForm, branch: e.target.value })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Graduation Year</label>
                  <input
                    type="text"
                    value={headerForm.graduationYear}
                    onChange={(e) => setHeaderForm({ ...headerForm, graduationYear: e.target.value })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">CGPA / Percentage</label>
                  <input
                    type="text"
                    value={headerForm.cgpa}
                    onChange={(e) => setHeaderForm({ ...headerForm, cgpa: e.target.value })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Preferred Role</label>
                  <input
                    type="text"
                    value={headerForm.preferredRole}
                    onChange={(e) => setHeaderForm({ ...headerForm, preferredRole: e.target.value })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Preferred Location</label>
                  <input
                    type="text"
                    value={headerForm.preferredLocation}
                    onChange={(e) => setHeaderForm({ ...headerForm, preferredLocation: e.target.value })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Short Bio</label>
                <textarea
                  rows={3}
                  value={headerForm.bio}
                  onChange={(e) => setHeaderForm({ ...headerForm, bio: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditingHeader(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Add Project</h3>
              <button onClick={() => setShowAddProject(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleAddProjectSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Code Reviewer Bot"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="font-semibold">Technologies Used (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. React, Node.js, OpenAI, Tailwind"
                  value={projectForm.tech}
                  onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="font-semibold">Live URL or GitHub Link</label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={projectForm.link}
                  onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="font-semibold">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain what problem it solved and your specific role..."
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProject(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold"
                >
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Certification Modal */}
      {showAddCert && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Add Certification</h3>
              <button onClick={() => setShowAddCert(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleAddCertSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold">Certificate Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Google Cloud Digital Leader"
                  value={certForm.name}
                  onChange={(e) => setCertForm({ ...certForm, name: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="font-semibold">Issuer / Platform</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Google, Coursera, HackerRank"
                  value={certForm.issuer}
                  onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="font-semibold">Year</label>
                <input
                  type="text"
                  placeholder="2025"
                  value={certForm.year}
                  onChange={(e) => setCertForm({ ...certForm, year: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="font-semibold">Verification Link (optional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={certForm.link}
                  onChange={(e) => setCertForm({ ...certForm, link: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCert(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 text-white font-bold"
                >
                  Save Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
