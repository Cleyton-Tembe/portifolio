import { useState } from "react";
import { MotionConfig } from "framer-motion";
import { useTheme } from "./hooks/useTheme";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Work from "./components/Work";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ResumeDialog from "./components/ResumeDialog";

export default function App() {
  const { theme, toggle } = useTheme();
  const [resumeOpen, setResumeOpen] = useState(false);
  const openResume = () => setResumeOpen(true);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-night"
      >
        Skip to projects
      </a>
      <Header theme={theme} onToggleTheme={toggle} onOpenResume={openResume} />
      <main>
        <Hero onOpenResume={openResume} />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
      <ResumeDialog open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </MotionConfig>
  );
}
