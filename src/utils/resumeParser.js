// src/utils/resumeParser.js

/**
 * Dynamically loads PDF.js from CDN with worker pre-configured.
 * Works seamlessly in client browsers without bundler worker issues.
 */
export async function loadPdfJS() {
  if (window.pdfjsLib) return window.pdfjsLib;
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
    script.onload = () => {
      const lib = window['pdfjs-dist/build/pdf'] || window.pdfjsLib;
      if (lib) {
        lib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
        window.pdfjsLib = lib;
        resolve(lib);
      } else {
        reject(new Error('PDF.js library object not found.'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load PDF parsing engine from CDN.'));
    document.head.appendChild(script);
  });
}

/**
 * Dynamically loads Mammoth for DOCX support.
 */
export async function loadMammoth() {
  if (window.mammoth) return window.mammoth;
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js';
    script.onload = () => resolve(window.mammoth);
    script.onerror = () => reject(new Error('Failed to load DOCX parser.'));
    document.head.appendChild(script);
  });
}

/**
 * Extracts raw text from an uploaded PDF file.
 */
export async function extractTextFromPDF(file) {
  const pdfjsLib = await loadPdfJS();
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageStrings = content.items.map(item => item.str);
    fullText += pageStrings.join(' ') + '\n';
  }

  return fullText.trim();
}

/**
 * Extracts raw text from an uploaded DOCX file.
 */
export async function extractTextFromDOCX(file) {
  const mammoth = await loadMammoth();
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value ? result.value.trim() : '';
}

/**
 * Known tech skill catalog for fast client-side regex matching.
 */
const TECH_SKILLS_DICTIONARY = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'C', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin',
  'React', 'React.js', 'React Native', 'Angular', 'Vue.js', 'Next.js', 'Node.js', 'Express', 'Express.js', 'Django',
  'Flask', 'Spring Boot', 'FastAPI', 'HTML', 'HTML5', 'CSS', 'CSS3', 'Tailwind', 'Tailwind CSS', 'Bootstrap',
  'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Oracle', 'SQLite', 'Firebase', 'Supabase',
  'Git', 'GitHub', 'GitLab', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Linux', 'REST API', 'GraphQL',
  'Data Structures', 'Algorithms', 'OOPs', 'Machine Learning', 'Deep Learning', 'Pandas', 'NumPy', 'Scikit-learn',
  'TensorFlow', 'PyTorch', 'Computer Networks', 'Operating Systems', 'DBMS'
];

/**
 * Parses raw resume text into structured candidate insights:
 * name, detected skills, projects detected, education highlights.
 */
export function analyzeParsedResume(rawText) {
  if (!rawText || rawText.length < 30) {
    throw new Error('The uploaded file does not contain readable text. Please upload a valid resume.');
  }

  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);

  // Candidate Name heuristic: usually the top 1-3 lines
  let candidateName = 'Candidate';
  for (let i = 0; i < Math.min(4, lines.length); i++) {
    const line = lines[i];
    if (line.length > 2 && line.length < 35 && !line.includes('@') && !line.includes('http') && !/resume|curriculum|phone|email/i.test(line)) {
      candidateName = line;
      break;
    }
  }

  // Detect technical skills
  const lowerText = rawText.toLowerCase();
  const detectedSkills = TECH_SKILLS_DICTIONARY.filter(skill => {
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    return regex.test(lowerText);
  });

  // Detect projects section
  const detectedProjects = [];
  const projectKeywords = ['project', 'projects', 'academic projects', 'personal projects', 'key projects'];
  let projectSectionFound = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase();
    if (projectKeywords.some(kw => line.startsWith(kw) || line === kw)) {
      projectSectionFound = true;
      continue;
    }
    if (projectSectionFound) {
      if (/education|experience|skills|certifications|achievements|strengths/i.test(line) && line.length < 30) {
        break; // Reached next section
      }
      if (lines[i].length > 5 && lines[i].length < 60 && !lines[i].startsWith('•') && !lines[i].startsWith('-')) {
        detectedProjects.push(lines[i]);
        if (detectedProjects.length >= 4) break;
      }
    }
  }

  // Fallback if no project heading explicitly matched
  if (detectedProjects.length === 0) {
    const possibleProjects = lines.filter(l => 
      /system|portal|app|platform|website|detector|predictor|manager|tracker/i.test(l) && 
      l.length > 8 && l.length < 50
    );
    detectedProjects.push(...possibleProjects.slice(0, 3));
  }

  return {
    name: candidateName,
    skills: Array.from(new Set(detectedSkills)).slice(0, 15),
    projects: detectedProjects.slice(0, 3),
    rawTextLength: rawText.length,
    rawText: rawText.slice(0, 3500) // Keep reasonable context window
  };
}
