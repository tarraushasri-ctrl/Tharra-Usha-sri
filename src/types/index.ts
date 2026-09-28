export type OpportunityType = 'internship' | 'job';

export type WorkMode = 'Remote' | 'Hybrid' | 'On-site';

export type ExperienceLevel = 'Freshers' | '0-1 Years' | '1-2 Years' | '2+ Years';

export interface Opportunity {
  id: string;
  type: OpportunityType;
  title: string;
  company: string;
  companyLogo: string;
  companyWebsite: string;
  companySize: string;
  companyAbout: string;
  domain: string;
  location: string;
  workMode: WorkMode;
  duration?: string; // e.g. "3 Months", "6 Months"
  stipend?: string; // e.g. "$1,500/mo" or "₹40,000/mo"
  salary?: string; // e.g. "$90,000 - $115,000/yr" or "₹14 - 20 LPA"
  experienceLevel?: ExperienceLevel;
  skills: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  eligibility: string;
  deadline: string; // ISO date string or formatted date
  postedDate: string;
  applicantCount: number;
  featured: boolean;
  status: 'active' | 'closed';
  recruiterId?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  university: string;
  degree: string;
  graduationYear: string;
  cgpa: string;
  branch: string;
  skills: string[];
  preferredRole: string;
  preferredLocation: string;
  preferredWorkMode: WorkMode | 'Any';
  resume: {
    fileName: string;
    fileSize: string;
    uploadedAt: string;
  } | null;
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    year: string;
    link?: string;
  }>;
  projects: Array<{
    id: string;
    title: string;
    tech: string[];
    link?: string;
    description: string;
  }>;
  bio: string;
}

export interface Application {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  company: string;
  type: OpportunityType;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentBranch: string;
  studentDegree: string;
  resumeFileName: string;
  coverNote: string;
  portfolioUrl: string;
  appliedAt: string;
  status: 'Applied' | 'Under Review' | 'Interview' | 'Offer Extended' | 'Rejected';
  recruiterNotes?: string;
}

export interface RecruiterProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  companyName: string;
  companyLogo: string;
  industry: string;
  companySize: string;
  website: string;
  about: string;
  headquarters: string;
}

export type UserRole = 'student' | 'recruiter';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedRoles?: string[]; // IDs of opportunities to preview
}
