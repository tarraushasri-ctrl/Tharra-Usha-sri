import React from 'react';
import { GraduationCap, Heart, Sparkles, Shield, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { POPULAR_SKILLS, DOMAINS } from '../data/mockData';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onSelectSkill: (skill: string) => void;
  onOpenAIAssistant: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectSkill,
  onOpenAIAssistant,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                CareerConnect
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              The premier career launchpad designed specifically for university students and fresh graduates. Discover verified internships, early-career tech jobs, and AI guidance.
            </p>
            <div className="flex items-center gap-3 text-slate-400 pt-1">
              <a href="#" className="hover:text-white transition p-1.5 rounded-lg bg-slate-800"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="hover:text-white transition p-1.5 rounded-lg bg-slate-800"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="hover:text-white transition p-1.5 rounded-lg bg-slate-800"><Github className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('internships')} className="hover:text-white transition cursor-pointer">
                  Internships 2025-2027
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('jobs')} className="hover:text-white transition cursor-pointer">
                  Fresh Graduate Jobs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('saved')} className="hover:text-white transition cursor-pointer">
                  Saved Opportunities
                </button>
              </li>
              <li>
                <button onClick={onOpenAIAssistant} className="hover:text-white text-indigo-400 font-semibold transition cursor-pointer flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Career Assistant</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition cursor-pointer">
                  About & FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Student Disciplines */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Domains</h4>
            <ul className="space-y-2">
              {DOMAINS.filter(d => d !== 'All Domains').slice(0, 5).map((dom) => (
                <li key={dom}>
                  <button onClick={() => onNavigate('internships')} className="hover:text-white transition cursor-pointer">
                    {dom}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular In-Demand Skills */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Trending Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_SKILLS.slice(0, 8).map((skill) => (
                <button
                  key={skill}
                  onClick={() => onSelectSkill(skill)}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-blue-600 hover:text-white text-[11px] text-slate-300 transition cursor-pointer"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} CareerConnect Platform Inc. Built with Google AI Studio & Gemini.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">Campus Partner Agreement</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
