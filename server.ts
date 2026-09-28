import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

interface CareerAssistantRequestBody {
  message: string;
  studentContext?: {
    name?: string;
    branch?: string;
    graduationYear?: string;
    skills?: string[];
    preferredRole?: string;
  };
  jobContext?: Array<{
    id: string;
    title: string;
    company: string;
    type: 'internship' | 'job';
    skills: string[];
    location: string;
    workMode: string;
    stipend?: string;
    salary?: string;
  }>;
}

// AI Career Assistant Endpoint
app.post('/api/ai-career-assistant', async (req: Request<{}, {}, CareerAssistantRequestBody>, res: Response) => {
  const { message, studentContext, jobContext } = req.body;

  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  const jobsSummary = (jobContext || []).slice(0, 15).map(j => 
    `- [ID: ${j.id}] ${j.title} at ${j.company} (${j.type.toUpperCase()}) | Location: ${j.location} (${j.workMode}) | Compensation: ${j.stipend || j.salary || 'Competitive'} | Required Skills: ${j.skills.join(', ')}`
  ).join('\n');

  const studentSkills = studentContext?.skills?.join(', ') || 'Not specified';
  const studentBranch = studentContext?.branch || 'General Engineering/Tech';
  const gradYear = studentContext?.graduationYear || '2026';

  const systemInstruction = `You are "ConnectAI", the empathetic, ultra-practical Career Counselor and Internship Advisor for CareerConnect.
CareerConnect is a modern platform built specifically for university students, freshers, and early-career graduates.

Student Profile Context:
- Name: ${studentContext?.name || 'Student'}
- Branch / Major: ${studentBranch}
- Graduation Year: ${gradYear}
- Current Skills: ${studentSkills}
- Preferred Role: ${studentContext?.preferredRole || 'Tech / Software / Design'}

Current Open Opportunities on CareerConnect:
${jobsSummary || 'Multiple software engineering, data science, AI/ML, and design internships and fresh graduate jobs are available.'}

Guidelines:
1. Provide actionable, supportive, and realistic advice tailored for students and fresh graduates.
2. When answering queries like "Which internships are suitable for Java?" or "I know Python and SQL. What jobs can I apply for?", identify relevant roles from the Current Open Opportunities list and explicitly mention them with their title and company name so the user can find them.
3. Suggest clear learning roadmaps (core fundamentals, hands-on projects, portfolio tips, interview prep).
4. For early students (e.g. 1st or 2nd year), emphasize building foundations (DSA, Git, mini-projects, open-source) and exploring off-campus hackathons/open-source fellowships.
5. Structure answers with clean markdown headings, bullet points, and highlighted keywords. Keep the tone encouraging, professional, and concise.`;

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'I could not generate an answer right now. Please try again.';
    res.json({ reply, source: 'gemini' });
  } catch (error: any) {
    console.warn('Gemini API call failed or unconfigured, utilizing contextual fallback response:', error?.message);

    // Contextual fallback response generator so students never encounter a broken state
    const lower = message.toLowerCase();
    let fallbackText = '';

    if (lower.includes('java')) {
      fallbackText = `### ☕ Java Opportunities & Recommendations for Students

Based on Java skills, here is what is best suited for you:

1. **Backend Developer Intern @ FinScale Tech**
   - **Focus:** Java, Spring Boot, PostgreSQL, REST APIs
   - **Why it fits:** FinScale builds scalable payment microservices. They prioritize strong Core Java, OOP concepts, and SQL basics.
   - **Recommended Next Steps:** Make sure you know Java Collections, multithreading basics, and build a simple CRUD REST API using Spring Boot.

2. **Full Stack Engineer (Fresher) @ CloudMatrix**
   - **Focus:** Java / TypeScript, Microservices, Docker
   - **What they look for:** Strong fundamentals in data structures, algorithms, and clean modular code.

**Key Skills to Pair with Java:**
- Spring Boot & Hibernate ORM
- Maven/Gradle build tools
- Relational Databases (PostgreSQL / MySQL)
- Git & Docker containerization basics`;
    } else if (lower.includes('python') && lower.includes('sql')) {
      fallbackText = `### 🐍 Roles for Python & SQL Proficiency

With a strong foundation in **Python** and **SQL**, you qualify for high-demand early-career paths:

1. **Junior Data Analyst @ MetricStream Analytics**
   - **Skills:** Python (Pandas, NumPy), SQL, Tableau/PowerBI
   - **Day-to-day:** Writing complex queries (JOINs, Window functions, CTEs) and automating analytics pipelines.

2. **AI/ML Research Intern @ DeepVision Labs**
   - **Skills:** Python, PyTorch/TensorFlow, SQL, Data preprocessing
   - **Focus:** Training fine-tuned models and evaluating dataset performance.

3. **Backend Engineering Intern @ ZeptoSync**
   - **Skills:** Python (FastAPI / Django), PostgreSQL, Redis
   - **Focus:** High-throughput API design and database query optimization.

**Skill Enhancement Tip:** Add FastAPI for rapid backend prototyping or Apache Airflow/dbt basics if aiming for Data Engineering!`;
    } else if (lower.includes('first-year') || lower.includes('1st year') || lower.includes('freshman')) {
      fallbackText = `### 🎓 Strategic Advice for 1st-Year CSE Students

Starting your career preparation in your first year is a massive competitive advantage! Here is your step-by-step roadmap:

1. **Master One Programming Language Thoroughly:**
   - Pick either **C++**, **Java**, or **Python**. Focus deeply on Object-Oriented Programming (OOP) and memory fundamentals.
2. **Begin Data Structures & Algorithms (DSA):**
   - Start with Arrays, Strings, Linked Lists, Stacks, and Queues on LeetCode/CodeChef.
3. **Build 2 Concrete Portfolio Projects:**
   - Rather than simple tutorials, build something practical (e.g., a student expense tracker, a college club portal, or a CLI utility).
4. **Learn Version Control (Git & GitHub):**
   - Commit code regularly and document clean READMEs.
5. **Types of Roles to Target:**
   - Look for **Summer Explorer Programs** (e.g., Google STEP, Microsoft Engage, open-source programs like GSoC and Hacktoberfest) which are specifically crafted for 1st and 2nd-year undergraduates!`;
    } else {
      fallbackText = `### 💡 Career Guidance & Matching Suggestions

Thank you for your question! Here are tailored insights based on current university placement trends:

- **Current Industry Demand:** Full Stack Development (Next.js / Node.js), Python & AI Engineering, Cloud Foundations (AWS / Docker), and Modern Product Design (Figma).
- **Matching Platform Roles:** Check out the **Featured Internships** on CareerConnect, especially roles at **NovaTech Labs**, **FinScale Tech**, and **DeepVision**.
- **Portfolio Checklist:**
  - 1-page ATS-compliant resume with quantifiable bullet points.
  - Active GitHub repository with live deployed demos.
  - Demonstrated understanding of testing and documentation.

Feel free to ask about specific languages (Java, Python, C++, React), branches (CSE, ECE, Mechanical), or interview preparation strategies!`;
    }

    res.json({ reply: fallbackText, source: 'fallback' });
  }
});

// Configure Vite or Static serving
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`CareerConnect server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start CareerConnect server:', err);
  process.exit(1);
});
