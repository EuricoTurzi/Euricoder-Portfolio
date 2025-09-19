import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ExternalLink,
  Github,
  Play,
  Code,
  Database,
  Cloud,
  Smartphone,
  Globe,
  Server,
  Filter,
} from "lucide-react";
import "./ProjectsSection.css";

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Função para obter cor do status
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "concluído":
      case "completed":
        return "#4ade80";
      case "em desenvolvimento":
      case "in-progress":
        return "#fbbf24";
      case "planejado":
      case "planned":
        return "#60a5fa";
      default:
        return "#9ca3af";
    }
  };

  // Função para obter label do status
  const getStatusLabel = (status) => {
    switch (status.toLowerCase()) {
      case "concluído":
      case "completed":
        return "Concluído";
      case "em desenvolvimento":
      case "in-progress":
        return "Em Desenvolvimento";
      case "planejado":
      case "planned":
        return "Planejado";
      default:
        return status;
    }
  };

  const filters = [
    { id: "all", label: "Todos", icon: <Code size={16} /> },
    { id: "web", label: "Web Apps", icon: <Globe size={16} /> },
    { id: "api", label: "APIs", icon: <Server size={16} /> },
    { id: "automation", label: "Automação", icon: <Database size={16} /> },
  ];

  const projects = [
    {
      id: 1,
      title: "E-learning Platform",
      description:
        "Plataforma completa de e-learning com Django. Sistema de certificados, gestão de usuários e treinamentos.",
      image: "/images/elearning.jpeg",
      category: ["web", "api"],
      technologies: ["Django", "PostgreSQL", "AWS"],
      github: "https://github.com/eurico-turzi",
      demo: "https://demo.com",
      status: "CONCLUÍDO",
      highlights: [
        "Payment Integration",
        "Real-time Analytics",
        "Microservices Architecture",
      ],
    },
    {
      id: 2,
      title: "Social Media Analytics",
      description:
        "Plataforma de análise de redes sociais com coleta automatizada de dados e insights em tempo real.",
      image: "/images/socialmedia.jpg",
      category: ["web", "automation"],
      technologies: ["Django", "React", "PostgreSQL"],
      github: "https://github.com/eurico-turzi",
      demo: "https://analytics-demo.com",
      status: "CONCLUÍDO",
      highlights: [
        "Automated Data Collection",
        "Real-time Insights",
        "Custom Reports",
      ],
    },
    {
      id: 3,
      title: "NPM Security Scanner",
      description:
        "Ferramenta para análise de segurança de packages Node.js, detectando vulnerabilidades e sugerindo correções.",
      image: "/images/npm-scanner.jpg",
      category: ["automation", "api"],
      technologies: ["Node.js", "Express", "MongoDB", "Docker", "Jest"],
      github: "https://github.com/eurico",
      status: "completed",
      highlights: [
        "Vulnerability Detection",
        "Automated Scanning",
        "Security Reports",
      ],
    },
    {
      id: 4,
      title: "VS Code Portfolio",
      description:
        "Portfólio interativo inspirado na interface do VS Code com animações e funcionalidades avançadas.",
      image: "/images/portfolio.jpg",
      category: ["web"],
      technologies: ["React", "Framer Motion", "CSS3", "Vite", "Lucide"],
      github: "https://github.com/eurico",
      status: "completed",
      highlights: ["VS Code UI", "Advanced Animations", "Interactive Features"],
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category.includes(activeFilter));

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

  const projectCardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="projects-section" ref={ref} id="projects">
      <motion.div
        className="projects-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="section-header" variants={itemVariants}>
          <div className="title-line">
            <h2>
              <span className="keyword">const</span>{" "}
              <span className="variable">projects</span>{" "}
              <span className="operator">=</span>{" "}
              <span className="string">"showcasing innovation"</span>
            </h2>
          </div>
          <p className="section-description">
            Uma seleção dos meus projetos mais recentes, demonstrando expertise
            em diferentes tecnologias e soluções.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div className="filter-section" variants={itemVariants}>
          <div className="filter-header">
            <Filter size={20} />
            <span>Filtrar por categoria:</span>
          </div>
          <div className="filter-tabs">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`filter-tab ${
                  activeFilter === filter.id ? "active" : ""
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.icon}
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div className="projects-grid" variants={containerVariants}>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              variants={projectCardVariants}
              whileHover="hover"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              layout
              initial="hidden"
              animate="visible"
              exit="hidden"
              style={{ "--delay": `${index * 0.1}s` }}
            >
              {/* Project Header */}
              {(() => {
                const isImageUrl =
                  typeof project.image === "string" &&
                  /\.(png|jpe?g|gif|webp|svg)$/i.test(project.image);
                return (
                  <div
                    className={`project-header ${
                      isImageUrl ? "has-bg-image" : ""
                    }`}
                    style={
                      isImageUrl
                        ? {
                            backgroundImage: `url(${project.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : undefined
                    }
                  >
                    {isImageUrl ? (
                      <div className="header-overlay" />
                    ) : (
                      <div className={`project-icon ${project.image || ""}`}>
                        <div className="icon-overlay"></div>
                      </div>
                    )}
                    <div className="project-status">
                      <div
                        className="status-indicator"
                        style={{
                          backgroundColor: getStatusColor(project.status),
                        }}
                      />
                      <span className="status-text">
                        {getStatusLabel(project.status)}
                      </span>
                    </div>
                  </div>
                );
              })()}
              {/* End Project Header */}

              {/* Project Content */}
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                {/* Highlights */}
                <div className="project-highlights">
                  {project.highlights.map((highlight, idx) => (
                    <span key={idx} className="highlight-tag">
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Technologies */}
                <div className="project-technologies">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Actions */}
              <div className="project-actions">
                {project.github && (
                  <a
                    href={project.github}
                    className="action-button github"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} />
                    <span>Código</span>
                  </a>
                )}

                {project.demo && (
                  <a
                    href={project.demo}
                    className="action-button demo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={16} />
                    <span>Demo</span>
                  </a>
                )}
              </div>

              {/* Project Stats */}
              {project.stats && (
                <div className="project-stats">
                  <div className="stat">
                    <span className="stat-icon">👁</span>
                    <span className="stat-value">{project.stats.views}</span>
                    <span className="stat-label">views</span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">❤</span>
                    <span className="stat-value">{project.stats.likes}</span>
                    <span className="stat-label">likes</span>
                  </div>
                </div>
              )}

              {/* Hover Overlay */}
              {hoveredProject === project.id && (
                <motion.div
                  className="project-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Modal de Detalhes */}
      {isModalOpen && selectedProject && (
        <motion.div
          className="project-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            className="project-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-title">
                <span className="project-emoji">{selectedProject.image}</span>
                <h3>{selectedProject.title}</h3>
              </div>
              <button
                className="modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-content">
              <div className="project-description">
                <h4>📝 Descrição</h4>
                <p>{selectedProject.description}</p>
              </div>

              <div className="project-technologies">
                <h4>🛠️ Tecnologias</h4>
                <div className="tech-tags">
                  {selectedProject.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="project-highlights">
                <h4>⭐ Principais Features</h4>
                <ul>
                  {selectedProject.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-actions">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-action-button github"
                  >
                    <Github size={16} />
                    <span>Ver Código</span>
                  </a>
                )}
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-action-button demo"
                  >
                    <ExternalLink size={16} />
                    <span>Ver Demo</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default ProjectsSection;
