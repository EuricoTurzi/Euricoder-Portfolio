import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Play, Terminal } from "lucide-react";
import "./HeroSection.css";
import { FileCode } from "lucide-react";

const HeroSection = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedCode, setDisplayedCode] = useState([""]);

  const codeLines = useMemo(
    () => [
      "// 💻 Portfólio - Eurico Turzi",
      "// Desenvolvedor Full Stack | Analista de Sistemas",
      "",
      "const desenvolvedorInfo = {",
      "    nome: 'Eurico Turzi',",
      "    idade: 27,",
      "    localizacao: 'ABC Paulista, São Paulo',",
      "    formacao: 'Análise e Desenvolvimento de Sistemas',",
      "    foco: 'Desenvolvimento Web Full Stack',",
      "    experiencia: '2+ anos criando soluções digitais',",
      "    disponivel: true",
      "};",
      "",
      "const tecnologias = {",
      "    backend: ['Node.js', 'Python', 'Django', 'FastAPI'],",
      "    frontend: ['React', 'JavaScript', 'TypeScript', 'HTML/CSS'],",
      "    bancoDados: ['PostgreSQL', 'MongoDB'],",
      "    ferramentas: ['Git', 'Docker', 'AWS', 'VS Code'],",
      "    metodologias: ['Clean Code', 'SOLID', 'RESTful APIs']",
      "};",
      "",
      "class DesenvolvedorFullStack {",
      "    constructor(perfil) {",
      "        this.info = perfil;",
      "        this.paixao = 'Transformar ideias em código';",
      "        this.missao = 'Criar soluções que fazem diferença';",
      "    }",
      "",
      "    async criarProjeto(requisitos) {",
      "        const analise = await this.analisarRequisitos(requisitos);",
      "        const arquitetura = this.projetarSistema(analise);",
      "        const codigo = this.implementarSolucao(arquitetura);",
      "        ",
      "        return this.entregarExcelencia(codigo);",
      "    }",
      "",
      "    obterContato() {",
      "        return {",
      "            status: 'Disponível para novos projetos! 🚀',",
      "            email: 'riicodt@gmail.com',",
      "            linkedin: '/in/euricoturzi',",
      "            github: '/euricoturzi'",
      "        };",
      "    }",
      "}",
      "",
      "// 🎯 Vamos construir algo incrível juntos!",
      "const eurico = new DesenvolvedorFullStack(desenvolvedorInfo);",
      "",
      "console.log('👋 Olá! Bem-vindo ao meu portfólio!');",
      "console.log('💡 Pronto para criar sua próxima solução digital!');",
    ],
    []
  );

  // Função para renderizar código com syntax highlighting
  const renderHighlightedCode = (code) => {
    if (!code || code.trim() === "") return <span>&nbsp;</span>;

    // Se é um comentário
    if (code.trim().startsWith("//")) {
      return <span className="comment">{code}</span>;
    }

    // Split do código em tokens para highlighting
    const tokens = [];
    const text = code;

    // Regex patterns
    const patterns = [
      // Keywords coladas (ex: constdesenvolvedorInfo, asynccriarProjeto, returnthis)
      {
        regex:
          /\b(const|let|var|class|function|async|await|return|new|this|extends|constructor)(\s+)/g,
        className: "keyword",
      },
      // Strings
      { regex: /(['"`])([^'"`]*?)\1/g, className: "string" },
      // Variables
      {
        regex:
          /\b(desenvolvedorInfo|tecnologias|DesenvolvedorFullStack|perfil|info|paixao|missao|requisitos|analise|arquitetura|codigo|eurico)\b/g,
        className: "variable",
      },
      // Functions
      {
        regex:
          /\b(criarProjeto|analisarRequisitos|projetarSistema|implementarSolucao|entregarExcelencia|obterContato|console\.log)\b/g,
        className: "function",
      },
    ];

    // Encontrar todos os matches
    const matches = [];
    patterns.forEach((pattern) => {
      let match;
      pattern.regex.lastIndex = 0;
      while ((match = pattern.regex.exec(text)) !== null) {
        if (pattern.includeSpace && match[2]) {
          // Para keywords, separar a palavra do espaço
          matches.push({
            start: match.index,
            end: match.index + match[1].length,
            text: match[1],
            className: pattern.className,
          });
          // Adicionar o espaço como texto normal
          matches.push({
            start: match.index + match[1].length,
            end: match.index + match[0].length,
            text: match[2],
            className: null,
          });
        } else if (pattern.forceSpace) {
          // Para keywords sem espaço, força um espaço após
          matches.push({
            start: match.index,
            end: match.index + match[1].length,
            text: match[1],
            className: pattern.className,
          });
          matches.push({
            start: match.index + match[1].length,
            end: match.index + match[1].length + 1,
            text: " ",
            className: null,
          });
        } else {
          matches.push({
            start: match.index,
            end: match.index + match[0].length,
            text: match[0],
            className: pattern.className,
          });
        }
      }
    });

    // Ordenar matches por posição
    matches.sort((a, b) => a.start - b.start);

    // Construir tokens
    let lastEnd = 0;
    matches.forEach((match) => {
      // Adicionar texto antes do match
      if (match.start > lastEnd) {
        tokens.push({
          text: text.slice(lastEnd, match.start),
          className: null,
        });
      }

      // Adicionar o match
      tokens.push({
        text: match.text,
        className: match.className,
      });

      lastEnd = match.end;
    });

    // Adicionar texto restante
    if (lastEnd < text.length) {
      tokens.push({
        text: text.slice(lastEnd),
        className: null,
      });
    }

    // Se não há tokens, retornar texto simples
    if (tokens.length === 0) {
      return <span>{code}</span>;
    }

    // Renderizar tokens
    return (
      <span>
        {tokens.map((token, index) =>
          token.className ? (
            <span key={index} className={token.className}>
              {token.text}
            </span>
          ) : (
            <span key={index}>{token.text}</span>
          )
        )}
      </span>
    );
  };

  useEffect(() => {
    if (currentLine < codeLines.length) {
      const timer = setTimeout(() => {
        const currentLineText = codeLines[currentLine];

        if (currentChar < currentLineText.length) {
          setDisplayedCode((prev) => {
            const newCode = [...prev];
            newCode[currentLine] = currentLineText.substring(
              0,
              currentChar + 1
            );
            return newCode;
          });
          setCurrentChar((prev) => prev + 1);
        } else {
          setCurrentLine((prev) => prev + 1);
          setCurrentChar(0);
          // Only add new line if we're moving to a new line that exists
          if (currentLine + 1 < codeLines.length) {
            setDisplayedCode((prev) => [...prev, ""]);
          }
        }
      }, 50); // Add timing for the animation

      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar, codeLines]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 8px 25px rgba(0, 122, 204, 0.3)",
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <motion.div
      className="hero-section"
      id="home"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="hero-content">
        {/* Code Editor Area */}
        <div className="code-editor">
          <div className="editor-header">
            <div className="editor-tabs">
              <span>portfolio.js</span>
            </div>
            <div className="editor-actions">
              <button className="run-button">
                <Play size={14} />
                Run
              </button>
            </div>
          </div>

          <div className="editor-body">
            <div className="line-numbers">
              {displayedCode.map((_, index) => (
                <div key={index} className="line-number">
                  {index + 1}
                </div>
              ))}
            </div>

            <div className="code-content">
              {displayedCode.map((line, index) => (
                <motion.div
                  key={index}
                  className="code-line"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {renderHighlightedCode(line)}
                  {index === currentLine && (
                    <span className="cursor" style={{ display: "inline" }}>
                      |
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <motion.div className="hero-info" variants={itemVariants}>
          {/* Terminal Panel */}
          <div className="info-panel terminal-panel">
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-controls">
                  <span className="control red"></span>
                  <span className="control yellow"></span>
                  <span className="control green"></span>
                </div>
                <div className="terminal-title">
                  <Terminal size={14} />
                  <span>eurico@portfolio:~$</span>
                </div>
              </div>

              <div className="terminal-body">
                <div className="terminal-line">
                  <span className="prompt">$</span>
                  <span className="command">whoami</span>
                </div>
                <div className="terminal-output">
                  <div className="output-line">💻 Desenvolvedor Full Stack</div>
                  <div className="output-line">🎯 Arquiteto de Soluções</div>
                  <div className="output-line">🚀 Entusiasta de Inovação</div>
                </div>

                <div className="terminal-line">
                  <span className="prompt">$</span>
                  <span className="command">./contato.sh --disponivel</span>
                </div>
                <div className="terminal-output">
                  <div className="output-line success">
                    ✅ Pronto para novos projetos!
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <motion.button
              className="btn btn-primary"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <span>Entre em Contato</span>
              <ChevronRight size={16} />
            </motion.button>

            <motion.button
              className="btn btn-secondary"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => {
                const projectsSection = document.getElementById("projects");
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <span>Ver Projetos</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="floating-elements">
        <motion.div
          className="floating-icon"
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ⚛️
        </motion.div>

        <motion.div
          className="floating-icon"
          animate={{
            y: [10, -10, 10],
            rotate: [0, -5, 0, 5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          🐍
        </motion.div>

        <motion.div
          className="floating-icon"
          animate={{
            y: [-5, 15, -5],
            rotate: [0, 10, 0, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          ⚡
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
