import React from "react";
import VSCodeLayout from "./components/VSCode/VSCodeLayout";
import HeroSection from "./components/Sections/HeroSection";
import AboutSection from "./components/Sections/AboutSection";
import ProjectsSection from "./components/Sections/ProjectsSection";
import ContactSection from "./components/Sections/ContactSection";
import "./styles/globals.css";

function App() {
  return (
    <VSCodeLayout>
      <div className="portfolio-content">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </VSCodeLayout>
  );
}

export default App;
