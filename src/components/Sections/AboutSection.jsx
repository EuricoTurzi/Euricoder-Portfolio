import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Database,
  Server,
  Code,
  Cloud,
  Shield,
  Zap,
  Users,
  GitBranch,
  Monitor,
  Cpu,
  FileCode,
  Globe,
  Settings,
  Terminal,
  Activity,
  Layers,
  Package,
  Coffee,
  Play,
} from "lucide-react";
import {
  SiDjango,
  SiFlask,
  SiFastapi,
  SiJavascript,
  SiMongodb,
  SiSelenium,
} from "react-icons/si";
import {
  FaNodeJs,
  FaReact,
  FaDatabase,
  FaAws,
  FaDocker,
  FaLinux,
} from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import "./AboutSection.css";

const AboutSection = () => {
  const [activeSkill, setActiveSkill] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      id: "development",
      title: "Análise e Desenvolvimento",
      icon: <Code size={24} />,
      description:
        "Levantamento de requisitos e análise de soluções para sistemas de alta performance.",
      skills: [
        { name: "Django", level: 95, icon: <SiDjango size={14} /> },
        { name: "Flask", level: 97, icon: <SiFlask size={14} /> },
        { name: "FastAPI", level: 90, icon: <SiFastapi size={14} /> },
        { name: "Node.js", level: 85, icon: <FaNodeJs size={14} /> },
        { name: "React", level: 75, icon: <FaReact size={14} /> },
        { name: "JavaScript", level: 90, icon: <SiJavascript size={14} /> },
      ],
    },
    {
      id: "database",
      title: "Gestão de Banco de Dados",
      icon: <Database size={24} />,
      description:
        "Modelagem e administração de bancos relacionais e não relacionais.",
      skills: [
        { name: "PostgreSQL", level: 93, icon: <BiLogoPostgresql size={14} /> },
        { name: "MongoDB", level: 80, icon: <SiMongodb size={14} /> },
        { name: "SQL Optimization", level: 84, icon: <FaDatabase size={14} /> },
      ],
    },
    {
      id: "cloud",
      title: "Infraestrutura & Cloud",
      icon: <Cloud size={24} />,
      description:
        "Administração de serviços em nuvem com foco em disponibilidade e segurança.",
      skills: [
        { name: "AWS", level: 85, icon: <FaAws size={14} /> },
        { name: "Docker", level: 75, icon: <FaDocker size={14} /> },
        { name: "CI/CD", level: 80, icon: <GitBranch size={14} /> },
        { name: "Linux", level: 80, icon: <FaLinux size={14} /> },
      ],
    },
    {
      id: "security",
      title: "Segurança & Performance",
      icon: <Shield size={24} />,
      description:
        "Monitoramento e otimização de sistemas para garantir alta disponibilidade.",
      skills: [
        {
          name: "Security Best Practices",
          level: 88,
          icon: <Shield size={14} />,
        },
        {
          name: "Performance Optimization",
          level: 85,
          icon: <Activity size={14} />,
        },
        { name: "Monitoring", level: 83, icon: <Monitor size={14} /> },
      ],
    },
    {
      id: "automation",
      title: "Automação",
      icon: <Zap size={24} />,
      description: "Desenvolvimento de automações para melhoria operacional.",
      skills: [
        { name: "Selenium", level: 87, icon: <SiSelenium size={14} /> },
        { name: "Python Scripts", level: 92, icon: <Code size={14} /> },
        { name: "Process Automation", level: 85, icon: <Settings size={14} /> },
      ],
    },
    {
      id: "methodology",
      title: "Metodologias Ágeis",
      icon: <Users size={24} />,
      description: "Atuação em metodologias ágeis para entrega contínua.",
      skills: [
        { name: "Scrum", level: 75, icon: <Users size={14} /> },
        { name: "Kanban", level: 90, icon: <Monitor size={14} /> },
        { name: "Team Leadership", level: 70, icon: <Users size={14} /> },
      ],
    },
  ];

  const codeSnippet = `
Eurico's Tech Arsenal
const techStack = {
  backend: {
    python: ['Django', 'Flask', 'FastAPI'],
    javascript: ['Node.js', 'Express', 'Fastify'],
    databases: ['PostgreSQL', 'MongoDB']
  },
  
  frontend: {
    frameworks: ['React'],
    styling: ['CSS3', 'Tailwind'],
    tools: ['Webpack', 'Vite']
  },
  
  cloud: {
    aws: ['EC2', 'RDS', 'S3'],
    devops: ['Docker'],
    monitoring: ['Grafana']
  },
  
  automation: {
    testing: ['Selenium', 'Pytest', 'Jest'],
    scripting: ['Python', 'Bash', 'PowerShell']
  }
};

class FullStackDeveloper {
  consτructor() {
    this.experience = '2+ years';
    this.location = 'ABC Paulista, SP';
    this.passion = 'Building scalable solutions';
  }
  
  async solveProblem(challenge) {
    const solution = await this.analyzeRequirements(challenge);
    const architecture = this.designSystem(solution);
    return this.implementWithQuality(architecture);
  }
}
`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const skillCardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="about-section" ref={ref} id="about">
      <motion.div
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="section-header" variants={itemVariants}>
          <div className="section-title">
            <div className="title-line">
              <h2>
                <span className="keyword">class</span>{" "}
                <span className="variable">AboutEurico</span>{" "}
                <span className="keyword">extends</span>{" "}
                <span className="type">Developer</span>
              </h2>
            </div>
            <p className="section-description">
              Especialista em criar soluções tecnológicas inovadoras com foco em
              performance e escalabilidade.
            </p>
          </div>
        </motion.div>

        <div className="about-content">
          {/* Code Preview */}
          <motion.div className="code-preview" variants={itemVariants}>
            <div className="code-header">
              <div className="file-tab">
                <FileCode size={14} />
                <span>about-eurico.js</span>
              </div>
            </div>
            <div className="code-body">
              <pre className="code-snippet">
                <code
                  dangerouslySetInnerHTML={{
                    __html: highlightCode(codeSnippet),
                  }}
                />
              </pre>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div className="skills-section" variants={itemVariants}>
            <h3 className="skills-title">
              <Monitor size={20} />
              Áreas de Expertise
            </h3>

            <div className="skills-grid">
              {skillCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  className={`skill-card ${
                    activeSkill === category.id ? "active" : ""
                  }`}
                  variants={skillCardVariants}
                  whileHover="hover"
                  onMouseEnter={() => setActiveSkill(category.id)}
                  onMouseLeave={() => setActiveSkill(null)}
                  style={{ "--delay": `${index * 0.1}s` }}
                >
                  <div className="skill-header">
                    <div className="skill-icon">{category.icon}</div>
                    <h4>{category.title}</h4>
                  </div>

                  <p className="skill-description">{category.description}</p>

                  <div className="skill-items">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        className="skill-item"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "100%" } : { width: 0 }}
                        transition={{
                          delay: index * 0.1 + skillIndex * 0.05,
                          duration: 0.6,
                        }}
                      >
                        <div className="skill-info">
                          <span className="skill-icon-small">{skill.icon}</span>
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-level">{skill.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <motion.div
                            className="skill-progress"
                            initial={{ width: 0 }}
                            animate={
                              isInView
                                ? { width: `${skill.level}%` }
                                : { width: 0 }
                            }
                            transition={{
                              delay: index * 0.1 + skillIndex * 0.05 + 0.3,
                              duration: 0.8,
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Personal Info */}
          <motion.div className="personal-info" variants={itemVariants}>
            <div className="info-card">
              <div className="info-header">
                <Globe size={20} />
                <h3>Sobre Mim</h3>
              </div>
              <div className="info-content">
                <div className="profile-photo">
                  <div className="photo-container">
                    <img
                      src="/images/euricoturzi.jpg"
                      alt="Eurico Turzi"
                      loading="lazy"
                      className="photo-normal"
                    />
                    <img
                      src="/images/euricopixel.jpg"
                      alt="Eurico Turzi Pixel Art"
                      loading="lazy"
                      className="photo-pixel"
                    />
                  </div>
                </div>
                <div className="info-item">
                  <span className="label">Nome:</span>
                  <span className="value">Eurico Turzi</span>
                </div>
                <div className="info-item">
                  <span className="label">Idade:</span>
                  <span className="value">27 anos</span>
                </div>
                <div className="info-item">
                  <span className="label">Localização:</span>
                  <span className="value">ABC Paulista, SP</span>
                </div>
                <div className="info-item">
                  <span className="label">Foco:</span>
                  <span className="value">Soluções Web & APIs</span>
                </div>
                <div className="info-item">
                  <span className="label">Experiência:</span>
                  <span className="value">2+ anos</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

// Code highlighting function
const highlightCode = (code) => {
  if (!code) return "";

  // Aplicar highlighting de forma mais cuidadosa
  let highlighted = code
    // Comentários primeiro
    .replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
    // Strings com aspas
    .replace(/(['"`])([^'"`\n]*?)\1/g, "<span>$1$2$1</span>")
    // Keywords coladas (ex: constdesenvolvedorInfo)
    .replace(
      /\b(const|let|var|class|function|async|await|return|new|this|extends|consτructor)(?!\s)/g,
      '<span class="keyword">$1</span> '
    )
    // Keywords com espaço
    .replace(
      /\b(const|let|var|class|function|async|await|return|new|this|extends|consτructor)(\s+)/g,
      '<span class="keyword">$1</span>$2'
    )
    // Variables específicas
    .replace(
      /\b(techStack|backend|frontend|cloud|automation|FullStackDeveloper|experience|location|passion|python|javascript|databases|frameworks|styling|tools|aws|devops|monitoring|testing|scripting)\b/g,
      '<span class="variable">$1</span>'
    )
    // Functions
    .replace(
      /\b(analyzeRequirements|designSystem|implementWithQuality|solveProblem)\b(?=\s*\()/g,
      '<span class="function">$1</span>'
    )
    // Types
    .replace(
      /\b(string|number|boolean|Array|Object)\b/g,
      '<span class="type">$1</span>'
    );

  return highlighted;
};

export default AboutSection;
