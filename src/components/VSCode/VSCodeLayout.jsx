import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Files,
  Search,
  GitBranch,
  Settings,
  User,
  ChevronRight,
  ChevronDown,
  FileText,
  Folder,
  FolderOpen,
} from "lucide-react";
import { FaNodeJs, FaReact, FaReadme, FaCss3Alt } from "react-icons/fa";
import { SiGitignoredotio } from "react-icons/si";
import "./VSCodeLayout.css";

const VSCodeLayout = ({ children }) => {
  const [activeTab, setActiveTab] = useState("portfolio.jsx");
  const [expandedFolders, setExpandedFolders] = useState(["src", "components"]);
  const [activeIcon, setActiveIcon] = useState("files");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // Navigation function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Sidebar icon actions
  const handleIconClick = (iconType) => {
    setActiveIcon(iconType);
    switch (iconType) {
      case "search": {
        // Abre modal de busca moderno
        setSearchModalOpen(true);
        break;
      }
      case "user": {
        // Redireciona para LinkedIn
        window.open("https://linkedin.com/in/euricoturzi", "_blank");
        break;
      }
      case "git": {
        // Redireciona para GitHub
        window.open("https://github.com/euricoturzi", "_blank");
        break;
      }
      case "settings": {
        // Abre modal de configurações
        setIsSettingsModalOpen(true);
        break;
      }
      default:
        break;
    }
  };

  const fileStructure = [
    {
      name: "src",
      type: "folder",
      children: [
        {
          name: "components",
          type: "folder",
          children: [
            {
              name: "About.jsx",
              type: "file",
              icon: <FaReact size={14} />,
              action: () => scrollToSection("about"),
            },
            {
              name: "Projects.jsx",
              type: "file",
              icon: <FaReact size={14} />,
              action: () => scrollToSection("projects"),
            },
            {
              name: "Contact.jsx",
              type: "file",
              icon: <FaReact size={14} />,
              action: () => scrollToSection("contact"),
            },
            {
              name: "Portfolio.jsx",
              type: "file",
              icon: <FaReact size={14} />,
              action: () => scrollToSection("home"),
            },
          ],
        },
        {
          name: "styles",
          type: "folder",
          children: [
            {
              name: "globals.css",
              type: "file",
              icon: <FaCss3Alt size={14} />,
            },
            {
              name: "components.css",
              type: "file",
              icon: <FaCss3Alt size={14} />,
            },
          ],
        },
        {
          name: "App.jsx",
          type: "file",
          icon: <FaReact size={14} />,
          action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
        },
        { name: "main.jsx", type: "file", icon: <FaReact size={14} /> },
      ],
    },
    { name: "package.json", type: "file", icon: <FaNodeJs size={14} /> },
    { name: "README.md", type: "file", icon: <FaReadme size={14} /> },
    { name: ".gitignore", type: "file", icon: <SiGitignoredotio size={14} /> },
  ];

  const tabs = [
    {
      name: "portfolio.jsx",
      active: true,
      icon: <FaReact size={14} />,
      action: () => scrollToSection("home"),
    },
    {
      name: "about.jsx",
      active: false,
      icon: <FaReact size={14} />,
      action: () => scrollToSection("about"),
    },
    {
      name: "projects.jsx",
      active: false,
      icon: <FaReact size={14} />,
      action: () => scrollToSection("projects"),
    },
    {
      name: "contact.jsx",
      active: false,
      icon: <FaReact size={14} />,
      action: () => scrollToSection("contact"),
    },
  ];

  const toggleFolder = (folderName) => {
    setExpandedFolders((prev) =>
      prev.includes(folderName)
        ? prev.filter((name) => name !== folderName)
        : [...prev, folderName]
    );
  };

  const renderFileTree = (items, level = 0) => {
    return items.map((item, index) => (
      <div
        key={index}
        className="file-tree-item"
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {item.type === "folder" ? (
          <div>
            <div
              className="folder-item"
              onClick={() => toggleFolder(item.name)}
            >
              {expandedFolders.includes(item.name) ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
              {expandedFolders.includes(item.name) ? (
                <FolderOpen size={14} />
              ) : (
                <Folder size={14} />
              )}
              <span>{item.name}</span>
            </div>
            {expandedFolders.includes(item.name) && item.children && (
              <div className="folder-children">
                {renderFileTree(item.children, level + 1)}
              </div>
            )}
          </div>
        ) : (
          <div className="file-item" onClick={item.action}>
            <span className="file-icon">{item.icon}</span>
            <span>{item.name}</span>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="vscode-layout">
      {/* Activity Bar */}
      <div className="activity-bar">
        <div className="activity-icons">
          <div
            className={`activity-icon ${
              activeIcon === "files" ? "active" : ""
            }`}
            onClick={() => handleIconClick("files")}
            title="Explorer"
          >
            <Files size={24} />
          </div>
          <div
            className={`activity-icon ${
              activeIcon === "search" ? "active" : ""
            }`}
            onClick={() => handleIconClick("search")}
            title="Buscar no portfólio"
          >
            <Search size={24} />
          </div>
          <div
            className={`activity-icon ${activeIcon === "git" ? "active" : ""}`}
            onClick={() => handleIconClick("git")}
            title="Ir para GitHub"
          >
            <GitBranch size={24} />
          </div>
          <div
            className={`activity-icon ${activeIcon === "user" ? "active" : ""}`}
            onClick={() => handleIconClick("user")}
            title="Ir para LinkedIn"
          >
            <User size={24} />
          </div>
        </div>
        <div className="activity-icons bottom">
          <div
            className={`activity-icon ${
              activeIcon === "settings" ? "active" : ""
            }`}
            onClick={() => handleIconClick("settings")}
            title="Configurações"
          >
            <Settings size={24} />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>EXPLORER</h3>
        </div>
        <div className="file-explorer">
          <div className="workspace-header">
            <ChevronDown size={14} />
            <span>EURICO-PORTFOLIO</span>
          </div>
          <div className="file-tree">{renderFileTree(fileStructure)}</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Tab Bar */}
        <div className="tab-bar">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tab ${tab.active ? "active" : ""}`}
              onClick={() => {
                setActiveTab(tab.name);
                if (tab.action) tab.action();
              }}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-name">{tab.name}</span>
              <span className="tab-close">×</span>
            </div>
          ))}
        </div>

        {/* Editor Area */}
        <div className="editor-area">
          <div className="editor-content">{children}</div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          <span className="status-item">
            <GitBranch size={14} />
            main
          </span>
          <span className="status-item">0 ⚠</span>
          <span className="status-item">0 ❌</span>
        </div>
        <div className="status-right">
          <span className="status-item">Ln 27, Col 43</span>
          <span className="status-item">JavaScript</span>
          <span className="status-item">UTF-8</span>
          <span className="status-item">LF</span>
        </div>
      </div>

      {/* Modal de Configurações */}
      {isSettingsModalOpen && (
        <motion.div
          className="settings-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSettingsModalOpen(false)}
        >
          <motion.div
            className="settings-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-title">
                <Settings size={20} />
                <h3>Configurações do Portfólio</h3>
              </div>
              <button
                className="modal-close"
                onClick={() => setIsSettingsModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-content">
              <div className="settings-section">
                <h4>👤 Informações Pessoais</h4>
                <div className="info-grid">
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
                    <span className="label">Cargo:</span>
                    <span className="value">Full Stack Developer</span>
                  </div>
                </div>
              </div>

              <div className="settings-section">
                <h4>📧 Contatos</h4>
                <div className="contact-grid">
                  <div className="contact-item">
                    <span className="contact-label">Email:</span>
                    <a
                      href="mailto:riicodt@gmail.com"
                      className="contact-value"
                    >
                      riicodt@gmail.com
                    </a>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">WhatsApp:</span>
                    <a
                      href="https://wa.me/5511989626148"
                      className="contact-value"
                    >
                      +55 (11) 98962-6148
                    </a>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">LinkedIn:</span>
                    <a
                      href="https://linkedin.com/in/euricoturzi"
                      className="contact-value"
                    >
                      /in/euricoturzi
                    </a>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">GitHub:</span>
                    <a
                      href="https://github.com/euricoturzi"
                      className="contact-value"
                    >
                      /euricoturzi
                    </a>
                  </div>
                </div>
              </div>

              <div className="settings-section">
                <h4>🛠️ Tecnologias</h4>
                <div className="tech-grid">
                  <span className="tech-item">React</span>
                  <span className="tech-item">Node.js</span>
                  <span className="tech-item">Django</span>
                  <span className="tech-item">FastAPI</span>
                  <span className="tech-item">PostgreSQL</span>
                  <span className="tech-item">Redis</span>
                  <span className="tech-item">AWS</span>
                  <span className="tech-item">Docker</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Search Modal */}
      {searchModalOpen && (
        <motion.div
          className="search-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSearchModalOpen(false)}
        >
          <motion.div
            className="search-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search-header">
              <Search size={20} />
              <input
                type="text"
                placeholder="Buscar no portfólio..."
                value={searchQuery}
                onChange={(e) => {
                  const query = e.target.value;
                  setSearchQuery(query);

                  if (query.length > 2) {
                    // Buscar em todas as seções
                    const sections = [
                      {
                        id: "hero",
                        name: "Início",
                        keywords: [
                          "desenvolvedor",
                          "fullstack",
                          "react",
                          "python",
                        ],
                      },
                      {
                        id: "about",
                        name: "Sobre",
                        keywords: [
                          "experiência",
                          "skills",
                          "formação",
                          "carreira",
                        ],
                      },
                      {
                        id: "projects",
                        name: "Projetos",
                        keywords: ["projetos", "portfolio", "github", "demo"],
                      },
                      {
                        id: "contact",
                        name: "Contato",
                        keywords: ["contato", "email", "linkedin", "github"],
                      },
                    ];

                    const results = sections.filter(
                      (section) =>
                        section.name
                          .toLowerCase()
                          .includes(query.toLowerCase()) ||
                        section.keywords.some((keyword) =>
                          keyword.includes(query.toLowerCase())
                        )
                    );

                    setSearchResults(results);
                  } else {
                    setSearchResults([]);
                  }
                }}
                autoFocus
              />
              <button
                className="search-close"
                onClick={() => setSearchModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="search-results">
              {searchQuery.length <= 2 ? (
                <div className="search-help">
                  <p>💡 Digite pelo menos 3 caracteres para buscar</p>
                  <div className="search-suggestions">
                    <span>Sugestões:</span>
                    <button onClick={() => setSearchQuery("react")}>
                      React
                    </button>
                    <button onClick={() => setSearchQuery("python")}>
                      Python
                    </button>
                    <button onClick={() => setSearchQuery("projetos")}>
                      Projetos
                    </button>
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="results-list">
                  <p className="results-count">
                    {searchResults.length} resultado(s) encontrado(s)
                  </p>
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      className="result-item"
                      onClick={() => {
                        scrollToSection(result.id);
                        setSearchModalOpen(false);
                      }}
                    >
                      <div className="result-icon">📍</div>
                      <div className="result-content">
                        <h4>{result.name}</h4>
                        <p>Navegar para a seção {result.name}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <p>❌ Nenhum resultado encontrado para "{searchQuery}"</p>
                  <p>Tente termos como: react, python, projetos, contato</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default VSCodeLayout;
