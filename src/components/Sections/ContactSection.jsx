import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Send,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import "./ContactSection.css";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: "riicodt@gmail.com",
      action: "mailto:riicodt@gmail.com",
      color: "var(--vscode-blue)",
    },
    {
      icon: <Phone size={20} />,
      label: "WhatsApp",
      value: "+55 (11) 98962-6148",
      action: "https://wa.me/5511989626148",
      color: "var(--vscode-green)",
    },
    {
      icon: <MapPin size={20} />,
      label: "Localização",
      value: "ABC Paulista, SP",
      action: null,
      color: "var(--vscode-orange)",
    },
    {
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      value: "/in/euricoturzi",
      action: "https://linkedin.com/in/euricoturzi",
      color: "#0077b5",
    },
    {
      icon: <Github size={20} />,
      label: "GitHub",
      value: "/euricoturzi",
      action: "https://github.com/euricoturzi",
      color: "#333",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação básica
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      alert("❌ Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("❌ Por favor, insira um email válido.");
      return;
    }

    // Simula envio (na vida real, aqui você faria uma chamada para API)
    console.log("Form submitted:", formData);

    // Monta a mensagem para WhatsApp
    const whatsappMessage = `Olá! Sou ${formData.name}.\n\n${formData.message}\n\nEmail para contato: ${formData.email}`;
    const whatsappUrl = `https://wa.me/5511989626148?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    // Abre WhatsApp com a mensagem
    window.open(whatsappUrl, "_blank");

    // Limpa o formulário
    setFormData({
      name: "",
      email: "",
      message: "",
    });

    alert("✅ Redirecionando para WhatsApp! Sua mensagem foi pré-formatada.");
  };

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

  return (
    <section className="contact-section" ref={ref} id="contact">
      <motion.div
        className="contact-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="section-header" variants={itemVariants}>
          <div className="title-line">
            <h2>
              <span className="keyword">function</span>{" "}
              <span className="function">getInTouch</span>
              <span className="operator">()</span>{" "}
              <span className="operator">{"{"}</span>
            </h2>
          </div>
          <p className="section-description">
            Pronto para transformar suas ideias em código? Vamos conversar sobre
            seu próximo projeto!
          </p>
        </motion.div>

        <div className="contact-content">
          {/* Contact Info */}
          <motion.div className="contact-info" variants={itemVariants}>
            <div className="info-header">
              <MessageSquare size={24} />
              <h3>Informações de Contato</h3>
            </div>

            <div className="contact-methods">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="contact-method"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 5 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => {
                    if (info.action) {
                      window.open(info.action, "_blank");
                    } else if (info.label === "Email") {
                      window.open("mailto:riicodt@gmail.com", "_blank");
                    } else if (info.label === "WhatsApp") {
                      window.open("https://wa.me/5511989626148", "_blank");
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="method-icon" style={{ color: info.color }}>
                    {info.icon}
                  </div>
                  <div className="method-content">
                    <span className="method-label">{info.label}</span>
                    <span className="method-value">{info.value}</span>
                  </div>
                  {info.action && (
                    <div className="method-action">
                      <ExternalLink size={16} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <a href="mailto:riicodt@gmail.com" className="quick-action email">
                <Mail size={18} />
                <span>Enviar Email</span>
              </a>

              <a
                href="https://wa.me/5511989626148"
                className="quick-action whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone size={18} />
                <span>WhatsApp</span>
              </a>

              <a
                href="https://linkedin.com/in/euricoturzi"
                className="quick-action linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://github.com/euricoturzi"
                className="quick-action github"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="contact-form-container"
            variants={itemVariants}
          >
            <div className="form-header">
              <Send size={24} />
              <h3>Envie uma Mensagem</h3>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nome</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Assunto</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Sobre o que você gostaria de conversar?"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensagem</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Conte mais sobre seu projeto ou ideia..."
                  rows="5"
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="submit-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={18} />
                <span>Enviar Mensagem</span>
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div className="contact-footer" variants={itemVariants}>
          <div className="footer-content">
            <p className="footer-text">
              <span className="comment">
                // Obrigado por visitar meu portfolio!
              </span>
            </p>
            <p className="footer-closing">
              <span className="operator">{"}"}</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
