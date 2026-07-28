// src/data/technicalInterviewSyllabus.js
// ─── Technical Interview Preparation Syllabus Registry ────────────────────────

export const TECHNICAL_INTERVIEW_SYLLABUS = [
  {
    id: 'programming',
    title: 'Programming',
    slug: 'programming',
    description: 'Fundamental programming concepts and coding questions.',
    icon: '💻',
    color: '#3b82f6', // Blue
    order: 1,
    questionCount: 0,
    comingSoon: true
  },
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    slug: 'data-structures-algorithms',
    description: 'Arrays, Lists, Trees, Graphs, Sorting, Searching, and complexity analysis.',
    icon: '📊',
    color: '#8b5cf6', // Violet
    order: 2,
    questionCount: 25,
    comingSoon: false
  },
  {
    id: 'database',
    title: 'Database',
    slug: 'database',
    description: 'Relational databases, SQL queries, normalization, indexing, and NoSQL.',
    icon: '🗄️',
    color: '#0d9488', // Teal
    order: 3,
    questionCount: 25,
    comingSoon: false
  },
  {
    id: 'os',
    title: 'Operating Systems',
    slug: 'operating-systems',
    description: 'Processes, threads, memory management, scheduling, and concurrency.',
    icon: '⚙️',
    color: '#f59e0b', // Amber
    order: 4,
    questionCount: 25,
    comingSoon: false
  },
  {
    id: 'networks',
    title: 'Computer Networks',
    slug: 'computer-networks',
    description: 'OSI model, TCP/IP, routing protocols, HTTP, DNS, and network security.',
    icon: '🌐',
    color: '#3b82f6', // Blue
    order: 5,
    questionCount: 25,
    comingSoon: false
  },
  {
    id: 'co',
    title: 'Computer Organization',
    slug: 'computer-organization',
    description: 'CPU architecture, memory hierarchy, cache, and instruction sets.',
    icon: '💾',
    color: '#6b7280', // Grey
    order: 6,
    questionCount: 25,
    comingSoon: false
  },
  {
    id: 'ood',
    title: 'Object-Oriented Design',
    slug: 'object-oriented-design',
    description: 'OOP principles, class diagrams, and design considerations for software components.',
    icon: '📐',
    color: '#10b981', // Emerald
    order: 7,
    questionCount: 0,
    comingSoon: true
  },
  {
    id: 'patterns',
    title: 'Design Patterns',
    slug: 'design-patterns',
    description: 'Creational, structural, and behavioral software engineering patterns.',
    icon: '🧩',
    color: '#ec4899', // Pink
    order: 8,
    questionCount: 0,
    comingSoon: true
  },
  {
    id: 'sysdesign',
    title: 'System Design',
    slug: 'system-design',
    description: 'Scalability, microservices, load balancing, caching, and distributed systems.',
    icon: '🏗️',
    color: '#ef4444', // Red
    order: 9,
    questionCount: 0,
    comingSoon: true
  },
  {
    id: 'git',
    title: 'Git & GitHub',
    slug: 'git-github',
    description: 'Version control, branching, merging, pull requests, and Git workflows.',
    icon: '🐙',
    color: '#f97316', // Orange
    order: 10,
    questionCount: 0,
    comingSoon: true
  },
  {
    id: 'linux',
    title: 'Linux',
    slug: 'linux',
    description: 'Shell commands, file system navigation, permissions, and bash scripting.',
    icon: '🐧',
    color: '#111827', // Dark Grey
    order: 11,
    questionCount: 0,
    comingSoon: true
  },
  {
    id: 'apis',
    title: 'APIs',
    slug: 'apis',
    description: 'RESTful services, GraphQL, status codes, authentication, and API design.',
    icon: '🔌',
    color: '#06b6d4', // Cyan
    order: 12,
    questionCount: 0,
    comingSoon: true
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    slug: 'javascript',
    description: 'Closures, promises, event loop, prototype inheritance, and ES6+ features.',
    icon: '🟨',
    color: '#eab308', // Yellow
    order: 13,
    questionCount: 0,
    comingSoon: true
  },
  {
    id: 'react',
    title: 'React',
    slug: 'react',
    description: 'Virtual DOM, component lifecycle, hooks, state management, and reconciliation.',
    icon: '⚛️',
    color: '#06b6d4', // Cyan
    order: 14,
    questionCount: 0,
    comingSoon: true
  },
  {
    id: 'nodejs',
    title: 'Node.js',
    slug: 'node-js',
    description: 'Event-driven architecture, package management, Express.js, and asynchronous patterns.',
    icon: '🟢',
    color: '#22c55e', // Green
    order: 15,
    questionCount: 0,
    comingSoon: true
  },
  {
    id: 'hr',
    title: 'HR Interview',
    slug: 'hr-interview',
    description: 'Behavioral questions, situational prompts, and culture fit strategies.',
    icon: '👥',
    color: '#a855f7', // Purple
    order: 16,
    questionCount: 0,
    comingSoon: true
  },
  {
    id: 'resume',
    title: 'Resume Preparation',
    slug: 'resume-preparation',
    description: 'Structuring, highlighting impact, technical skills layout, and portfolio creation.',
    icon: '📄',
    color: '#3b82f6', // Blue
    order: 17,
    questionCount: 0,
    comingSoon: true
  },
  {
    id: 'advanced',
    title: 'Advanced Topics',
    slug: 'advanced-topics',
    description: 'Security concepts, cloud platforms, containerization, and devops foundations.',
    icon: '🚀',
    color: '#dc2626', // Crimson Red
    order: 18,
    questionCount: 0,
    comingSoon: true
  }
];
