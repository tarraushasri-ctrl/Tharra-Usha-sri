import React, { useState } from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  Sparkles, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Phone, 
  MapPin, 
  HelpCircle,
  CheckCircle2,
  Users2,
  Zap,
  HeartHandshake
} from 'lucide-react';

export const AboutAndContactView: React.FC = () => {
  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    role: 'Student',
    subject: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({ name: '', email: '', role: 'Student', subject: '', message: '' });
    }, 3000);
  };

  const FAQS = [
    {
      q: 'Is CareerConnect free for university students and freshers?',
      a: 'Yes, 100% free! CareerConnect does not charge students for searching roles, applying to internships, uploading resumes, or utilizing our AI Career Assistant. Our mission is to democratize early-career opportunities.',
    },
    {
      q: 'How does the AI Career Assistant recommend jobs and internships?',
      a: 'Powered by Gemini 3.8 Flash, ConnectAI analyzes your specific university branch (CSE, ECE, Data Science, etc.), verified skill tags, and graduation year to map your readiness directly to verified opportunities live on the platform.',
    },
    {
      q: 'Are all stipends and compensation figures verified?',
      a: 'Yes! We require all partner companies and recruiters to provide transparent compensation ranges and confirmed durations before publishing listings to avoid deceptive unpaid work traps.',
    },
    {
      q: 'Can 1st and 2nd year undergraduates apply for internships?',
      a: 'Absolutely. Many of our partner employers offer summer explorer internships and fellowship programs specifically targeted at 1st and 2nd-year students to develop early talent.',
    },
    {
      q: 'How can recruiters partner with CareerConnect to hire students?',
      a: 'Recruiters can use our dedicated Recruiter Dashboard to create an employer profile, post internships or entry-level positions, manage applicants with 1-click status transitions, and connect directly with verified candidates.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero / About Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
          <GraduationCap className="w-4 h-4" />
          <span>About CareerConnect</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Empowering the next generation of engineers & builders
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          CareerConnect bridges the gap between ambitious college students and world-class employers. We eliminate ghosting, require verified pay, and equip freshers with tailored AI guidance.
        </p>
      </div>

      {/* Core Values / Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Verified Employers</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Every company and opportunity undergoes manual verification to guarantee genuine stipends, clear responsibilities, and supportive mentorship.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">AI-Powered Career Matching</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            ConnectAI identifies your academic strengths, surfaces suitable roles, and advises on missing skills so you never send blind applications.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-3">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Zero Ghosting Policy</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Recruiters commit to timely application feedback, interview scheduling updates, and status transparency right on your student dashboard.
          </p>
        </div>
      </div>

      {/* Contact Us & FAQ Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Contact Form */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-5">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Get in Touch
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Have questions or feedback? College placement cells and recruiters are welcome to reach out!
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 rounded-2xl text-center space-y-2 animate-in fade-in">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-slate-900 dark:text-white">Message Dispatched!</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Thank you for contacting CareerConnect. A student support specialist will respond within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Rivera"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@university.edu"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">I am a...</label>
                  <select
                    value={contactForm.role}
                    onChange={(e) => setContactForm({ ...contactForm, role: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <option value="Student">Student / Fresher</option>
                    <option value="Recruiter">Recruiter / Employer</option>
                    <option value="College">College Placement Officer</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Campus Hiring Inquiry"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist you today?..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-blue-500" />
              support@careerconnect.edu
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              San Francisco, CA & Global
            </span>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3 bg-slate-50/50 dark:bg-slate-800/30">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
