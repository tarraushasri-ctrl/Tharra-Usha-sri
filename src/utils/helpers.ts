import { Opportunity, StudentProfile } from '../types';

/**
 * Calculates a match percentage between student skills and opportunity requirements
 */
export function calculateMatchScore(studentSkills: string[], opportunitySkills: string[]): number {
  if (!opportunitySkills.length || !studentSkills.length) return 0;
  
  const normalizedStudent = studentSkills.map(s => s.toLowerCase().trim());
  const matchingCount = opportunitySkills.filter(reqSkill =>
    normalizedStudent.some(stSkill => 
      stSkill.includes(reqSkill.toLowerCase().trim()) || 
      reqSkill.toLowerCase().trim().includes(stSkill)
    )
  ).length;

  const score = Math.round((matchingCount / opportunitySkills.length) * 100);
  return Math.min(100, Math.max(20, score));
}

/**
 * Format deadline date to readable string and calculate days left
 */
export function getDeadlineInfo(deadlineStr: string): { label: string; isUrgent: boolean; daysLeft: number } {
  try {
    const deadline = new Date(deadlineStr);
    const today = new Date();
    // Reset time portions for accurate day comparison
    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);

    const diffTime = deadline.getTime() - today.getTime();
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (daysLeft < 0) {
      return { label: 'Application Closed', isUrgent: false, daysLeft };
    }
    if (daysLeft === 0) {
      return { label: 'Closing Today!', isUrgent: true, daysLeft: 0 };
    }
    if (daysLeft === 1) {
      return { label: 'Closes Tomorrow', isUrgent: true, daysLeft: 1 };
    }
    if (daysLeft <= 5) {
      return { label: `${daysLeft} days left`, isUrgent: true, daysLeft };
    }

    const formattedDate = deadline.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    return { label: `Apply by ${formattedDate}`, isUrgent: false, daysLeft };
  } catch {
    return { label: `Deadline: ${deadlineStr}`, isUrgent: false, daysLeft: 30 };
  }
}
