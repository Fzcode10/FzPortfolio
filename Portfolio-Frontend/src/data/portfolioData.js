// ==================================================
// REPLACE THESE PLACEHOLDER LINKS WITH YOUR REAL LINKS
// ==================================================

const portfolioData = {
  personal: {
    name: "Faij Ahamad",
    firstName: "Faij",
    lastName: "Ahamad",
    title: "Full Stack Developer",
    subtitle: "Computer Science Student",
    email: "fzcode7276@gmail.com",
    phone: "7543931970",
    phoneDisplay: "+91 7543931970",
    location: "Hyderabad, India",
    brandName: "FzCode",
  },

  links: {
    resume: "https://drive.google.com/file/d/1prFBzjnFsxBFWvDJeycAdr097oMMqBcn/view?usp=sharing",
    github: "https://github.com/Fzcode10",        // REPLACE WITH YOUR GITHUB
    linkedin: "https://www.linkedin.com/in/faij-ahamad-8a97a434b/", // REPLACE WITH YOUR LINKEDIN
    leetcode: "https://leetcode.com/u/FzTech/",    
  },

  hero: {
    greeting: "Hello, I'm",
    description:
      "Computer Science student and aspiring Full Stack Developer building scalable, responsive and user-focused web applications with modern frontend and backend technologies.",
    // ===================================================
    // PROFILE PHOTO SETUP:
    // Place your photo at: public/images/profile.png
    // (Create the 'images' folder inside 'public' if it doesn't exist)
    // The path below maps to: http://localhost:5173/images/profile.png
    // If the file doesn't exist, the "FA" initials placeholder is shown.
    // ===================================================
    profileImage: "https://res.cloudinary.com/dwmjn9qgq/image/upload/v1788026342/Profile2_scecnh.png",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "MySQL", "Java"],
  },



  stats: [
    { value: "500+", label: "LeetCode Problems", icon: "Code2" },
    { value: "365", label: "Day Coding Streak", icon: "Flame" },
    { value: "30", label: "LeetCode Contests", icon: "Trophy" },
    { value: "1543", label: "Peak Contest Rating", icon: "Star" },
  ],

  about: {
    heading: "About Me",
    paragraphs: [
      "I'm a Computer Science student and aspiring Full Stack Developer with a strong interest in building scalable web applications, solving complex problems and continuously improving my development skills.",
      "I enjoy working across frontend and backend development, from creating responsive React interfaces to designing RESTful APIs, authentication systems and database-driven applications.",
    ],
    strengths: [
      { label: "Full Stack Development", icon: "Layers" },
      { label: "Problem Solving", icon: "Brain" },
      { label: "Frontend Development", icon: "Monitor" },
      { label: "Backend Development", icon: "Server" },
      { label: "Database Design", icon: "Database" },
      { label: "REST APIs", icon: "Globe" },
      { label: "Authentication", icon: "Shield" },
      { label: "Clean Code", icon: "Code2" },
    ],
  },

  skills: {
    programmingLanguages: [
      { name: "Java" },
      { name: "JavaScript" },
      { name: "C++" },
      { name: "SQL" },
    ],
    frontend: [
      { name: "React.js" },
      { name: "HTML" },
      { name: "CSS" },
      { name: "Tailwind CSS" },
    ],
    backend: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "RESTful APIs" },
      { name: "JWT Authentication" },
    ],
    database: [
      { name: "MongoDB" },
      { name: "MySQL" },
    ],
    tools: ["Git", "GitHub", "VS Code", "Debugging", "Version Control"],
    engineering: [
      // "Agile/Scrum",
      // "Sprint Planning",
      // "Requirement Analysis",
      // "Code Review",
      // "Technical Documentation",
    ],
  },

  experience: [
    {
      role: "Web Development & Design Intern",
      company: "OASIS INFOBYTE",
      duration: "July 2026 – August 2026",
      location: "Remote",
      responsibilities: [
        "Developed a responsive web application for online pizza delivery.",
        "Implemented inventory management.",
        "Implemented delivery-location handling.",
        "Integrated payment gateway functionality.",
        "Used AI-assisted development tools to improve development productivity across coding, debugging and repetitive tasks.",
      ],
      tags: [
        "Web Development",
        "Responsive Design",
        "Payment Gateway",
        "Inventory Management",
        "AI-Assisted Development",
      ],
      link: "https://example.com", // REPLACE WITH ACTUAL COMPANY LINK
    },
  ],

  projects: [
    {
      id: "fzad-event-manager",
      title: "FzadEventManager",
      subtitle: "Role-Based Digital Event & Visitor Management System",
      description:
        "Built a role-based MERN application for Admin, Host, Security and Visitor workflows with JWT authentication and protected APIs.",
      technologies: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JavaScript",
        "Cloudinary",
        "SMTP",
        "JWT",
      ],
      features: [
        "QR-based visitor check-in/check-out",
        "Event scheduling",
        "Visitor registration",
        "Digital pass generation",
        "Cloudinary image storage",
        "SMTP email notifications",
      ],
      image: "/assets/projects/fzad-event-manager.png", // REPLACE WITH YOUR SCREENSHOT
      liveDemo: "https://example.com/fzad-event-manager",  // REPLACE WITH ACTUAL URL
      github: "https://github.com/Fzcode10/fzadEventManager", // REPLACE WITH ACTUAL URL
    },
    {
      id: "eduvantaaz",
      title: "EduVantaAZ",
      subtitle: "Student Mentorship & Academic Management Platform",
      description:
        "Developed a role-based MERN platform for student academic tracking and mentorship management across Admin, Mentor and Student roles.",
      technologies: [
        "React.js",
        "Node.js",
        "Express.js",
        "MySQL",
        "JavaScript",
        "JWT",
      ],
      features: [
        "JWT authentication",
        "Role-based authorization",
        "RESTful APIs",
        "Role-specific dashboards",
        "Responsive React interfaces",
        "Academic tracking",
        "Mentorship workflows",
      ],
      image: "/assets/projects/eduvantaaz.png", 
      liveDemo: "https://example.com/eduvantaaz",  
      github: "https://github.com/Fzcode10/EduVantaAz_Project_1", 
    },
  ],

  achievements: {
    leetcodeProblems: "494+",
    codingStreak: "365 Days",
    submissions: "569+",
    contests: "29",
    peakRating: "1543",
    contestsDetails: [
      { name: "Weekly Contest 473", rank: "7,425 / 27K+" },
      { name: "Biweekly Contest 170", rank: "7,714 / 26K+" },
    ],
  },

  education: [
    {
      institution: "Maulana Azad National Urdu University",
      degree: "B.Tech (Computer Science)",
      duration: "2023 – Present",
      location: "Hyderabad",
      result: "CGPA: 8.45",
      coursework: ["OOP", "Data Structures", "DBMS", "Computer Networks"],
      current: true,
    },
    {
      institution: "Purnea College",
      degree: "Intermediate",
      duration: "2021 – 2023",
      location: "Purnea, Bihar",
      result: "Percentage: 76.6%",
      coursework: ["Physics", "Chemistry", "Mathematics"],
      current: false,
    },
    {
      institution: "Utkramit High School, Bariya",
      degree: "Matriculation",
      duration: "2019 – 2021",
      location: "Purnea, Bihar",
      result: "Percentage: 88.88%",
      coursework: [],
      current: false,
    },
  ],

  certifications: [
    {
      title: "Java (Basic)",
      issuer: "HackerRank",
      link: "https://www.hackerrank.com/certificates/iframe/b614f988841e", 
    },
    {
      title: "SQL for Beginners: Learn SQL using MySQL and Database Design",
      issuer: "Scaler",
      link: "https://moonshot.scaler.com/s/sl/1WfY5yjyNe?_gl=1*j06n0a*_gcl_aw*R0NMLjE3ODczMzMwMjMuQ2p3S0NBanc3cF9VQmhCbEVpd0FocElzNzNJR29CUzFDeG5fWU9TalRZM2FJOU9lMVhQdkI1bTNYRERIQkNrMUhTRVhNYkVZNVkzSjVCb0NOV0VRQXZEX0J3RQ..*_gcl_au*NjIxNzYwMjI1LjE3ODY5NzgyMTE.*FPAU*NjIxNzYwMjI1LjE3ODY5NzgyMTE.*_ga*NDA1NTA0NDU3LjE3ODY5NzgyMzQ.*_ga_53S71ZZG1X*czE3ODc2Njg4MzIkbzE3JGcxJHQxNzg3NjcwODU2JGo1NCRsMCRoNzk1NTY1MTY2", 
    },
  ],

  languages: ["English", "Hindi"],

  contact: {
    heading: "Let's Work Together!",
    description:
      "Have a project idea, internship opportunity, collaboration or simply want to connect? Feel free to reach out.",

    // ==================================================
    // WHATSAPP CONFIGURATION
    // Change the number or message here to update globally.
    // number: India country code (91) + phone number, no spaces/symbols
    // message: pre-filled text the visitor sees when WhatsApp opens
    // ==================================================
    whatsapp: {
      number: "917543931970",
      message:
        "Hello Faij, I visited your portfolio and would like to connect with you regarding a project or opportunity.",
    },
  },

  footer: {
    copyright: "© 2026 Faij Ahamad. All rights reserved.",
    tagline: "Full Stack Developer",
  },
};

export default portfolioData;
