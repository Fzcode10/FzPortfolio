import React, { useEffect, useRef } from 'react';
import { 
  SiJavascript, 
  SiCplusplus, 
  SiMysql, 
  SiMongodb, 
  SiReact, 
  SiHtml5, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiExpress, 
  SiJsonwebtokens, 
  SiGit, 
  SiGithub, 
  SiPostman
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import { 
  TbApi, 
  TbBug, 
  TbBrandCss3,
  TbBrandVscode,
  TbCode,
  TbLayout,
  TbServer,
  TbDatabase,
  TbTool,
} from 'react-icons/tb';
import './Skills.css';

const skillCategories = [
  {
    title: 'Languages',
    icon: TbCode,
    skills: [
      { name: 'Java', icon: FaJava, color: '#EA2D2E' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'C++', icon: SiCplusplus, color: '#00599C' },
      { name: 'SQL', icon: SiMysql, color: '#4479A1' },
    ],
  },
  {
    title: 'Frontend',
    icon: TbLayout,
    skills: [
      { name: 'React.js', icon: SiReact, color: '#61DAFB' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: TbBrandCss3, color: '#1572B6' },
    ],
  },
  {
    title: 'Backend',
    icon: TbServer,
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
      { name: 'Express.js', icon: SiExpress, color: '#FFFFFF' },
      { name: 'REST APIs', icon: TbApi, color: '#38BDF8' },
      { name: 'JWT Auth', icon: SiJsonwebtokens, color: '#D63AFF' },
    ],
  },
  {
    title: 'Databases',
    icon: TbDatabase,
    skills: [
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
    ],
  },
  {
    title: 'Tools & Workflow',
    icon: TbTool,
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#F0F6FC' },
      { name: 'VS Code', icon: TbBrandVscode, color: '#007ACC' },
      { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
      { name: 'Debugging', icon: TbBug, color: '#A855F7' },
    ],
  }
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="section skills-section" ref={sectionRef}>
      <div className="section-container">
        {/* Header Section */}
        <div className="section-header">
          <div className="section-label reveal">My Expertise</div>
          <h2 className="section-title reveal reveal-delay-1">Skills & Technologies</h2>
          <p className="section-subtitle reveal reveal-delay-2">
            Technologies, frameworks, and tools I use to build scalable full-stack applications.
          </p>
        </div>

        {/* Responsive Cards Grid */}
        <div className="skills__cards-grid">
          {skillCategories.map((category, catIdx) => {
            const CategoryIcon = category.icon;
            return (
              <div
                key={category.title}
                className={`skills__card reveal reveal-delay-${(catIdx % 3) + 1}`}
              >
                {/* Category Title Header */}
                <div className="skills__card-header">
                  <div className="skills__card-title-group">
                    <div className="skills__card-icon-wrap">
                      <CategoryIcon className="skills__card-category-icon" />
                    </div>
                    <h3 className="skills__card-title">{category.title}</h3>
                  </div>
                  <span className="skills__card-count-badge">
                    {category.skills.length}
                  </span>
                </div>

                {/* Badges Grid */}
                <div className="skills__items-grid">
                  {category.skills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        className="skill-item"
                        title={skill.name}
                      >
                        <div 
                          className="skill-item__icon-box"
                          style={{ color: skill.color }}
                        >
                          <Icon className="skill-item__icon" />
                        </div>
                        <span className="skill-item__name">{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
