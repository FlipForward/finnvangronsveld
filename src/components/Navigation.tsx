import { NavLink } from "./NavLink";
import { Button } from "./ui/button";
import { Menu, X, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation, useNavigate } from "react-router-dom";
import ColorSlider from "./ColorSlider";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Show arrow when scrolled past 80% of viewport height
      setShowArrow(window.scrollY > window.innerHeight * 0.8);

      // Detect active section
      const sections = ['hero', 'about-section', 'portfolio-section', 'contact-section'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'nl' : 'en');
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(`#${sectionId}`);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-6 md:px-12 lg:px-16">
      {/* Icon in top center / Arrow when scrolled */}
      <button 
        onClick={scrollToTop}
        className={`absolute left-1/2 -translate-x-1/2 top-0 cursor-pointer transition-transform duration-300 ${
          showArrow ? 'hover:scale-110' : ''
        }`}
      >
        <div className="relative w-10 h-10 md:w-12 md:h-12">
          <ArrowUp 
            size={40}
            className={`absolute inset-0 text-hero-accent transition-all duration-500 ${
              showArrow 
                ? 'opacity-100 scale-100 rotate-0 pointer-events-auto' 
                : 'opacity-0 scale-50 -rotate-90 pointer-events-none'
            }`}
            strokeWidth={2}
          />
          <img 
            src="/icon.png" 
            alt="Icon" 
            className={`absolute inset-0 w-full h-full transition-all duration-500 ${
              showArrow 
                ? 'opacity-0 scale-50 rotate-90 pointer-events-none' 
                : 'opacity-100 scale-100 rotate-0 pointer-events-auto'
            }`}
            style={{ filter: 'brightness(0) saturate(100%) invert(85%) sepia(35%) saturate(2719%) hue-rotate(136deg) brightness(94%) contrast(101%)' }} 
          />
        </div>
      </button>

      <div className="flex items-center justify-between">
        {/* Desktop nav pills */}
        <div className="hidden md:flex items-center gap-1 rounded-full bg-hero-accent px-2 py-1.5">
          <button
            onClick={() => scrollToSection('hero')}
            className={`px-3 py-1.5 text-sm font-medium transition-all duration-300 rounded-full hover:scale-105 ${
              activeSection === 'hero' 
                ? 'bg-background text-hero-accent' 
                : 'text-background/70 hover:text-background'
            }`}
          >
            {t('nav.home')}
          </button>
          <button
            onClick={() => scrollToSection('about-section')}
            className={`px-3 py-1.5 text-sm font-medium transition-all duration-300 rounded-full hover:scale-105 ${
              activeSection === 'about-section' 
                ? 'bg-background text-hero-accent' 
                : 'text-background/70 hover:text-background'
            }`}
          >
            {t('nav.about')}
          </button>
          <button
            onClick={() => scrollToSection('portfolio-section')}
            className={`px-3 py-1.5 text-sm font-medium transition-all duration-300 rounded-full hover:scale-105 ${
              activeSection === 'portfolio-section' 
                ? 'bg-background text-hero-accent' 
                : 'text-background/70 hover:text-background'
            }`}
          >
            {t('nav.portfolio')}
          </button>
        </div>

        {/* Mobile burger button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full bg-hero-accent text-background"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-3">
          <ColorSlider />
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="rounded-full border-hero-accent/30 text-foreground/70 hover:text-foreground hover:border-hero-accent/50 h-8 px-3 py-1 transition-all duration-300 hover:scale-105"
          >
            {language.toUpperCase()}
          </Button>
          <Button
            size="sm"
            onClick={() => scrollToSection('contact-section')}
            className={`rounded-full h-8 px-3 py-1 transition-all duration-300 hover:scale-105 ${
              activeSection === 'contact-section'
                ? 'bg-hero-accent text-background border-hero-accent'
                : 'bg-hero-accent/10 border border-hero-accent/30 text-hero-accent hover:bg-hero-accent/20'
            }`}
          >
            {t('nav.contact')}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-6 right-6 bg-black/95 backdrop-blur-sm border border-hero-accent/30 rounded-2xl p-4 z-50">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => scrollToSection('hero')}
              className={`px-4 py-3 text-sm font-medium transition-colors rounded-lg text-left ${
                activeSection === 'hero' ? 'bg-hero-accent/10 text-hero-accent' : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => scrollToSection('about-section')}
              className={`px-4 py-3 text-sm font-medium transition-colors rounded-lg text-left ${
                activeSection === 'about-section' ? 'bg-hero-accent/10 text-hero-accent' : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              {t('nav.about')}
            </button>
            <button
              onClick={() => scrollToSection('portfolio-section')}
              className={`px-4 py-3 text-sm font-medium transition-colors rounded-lg text-left ${
                activeSection === 'portfolio-section' ? 'bg-hero-accent/10 text-hero-accent' : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              {t('nav.portfolio')}
            </button>
            <div className="h-px bg-hero-accent/20 my-2" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-foreground/70">Theme</span>
              <ColorSlider />
            </div>
            <Button
              size="sm"
              onClick={toggleLanguage}
              className="rounded-lg bg-hero-accent/10 border border-hero-accent/30 text-hero-accent hover:bg-hero-accent/20 mb-2 transition-all duration-300 w-full"
            >
              {language === 'en' ? 'NL' : 'EN'}
            </Button>
            <Button
              size="sm"
              onClick={() => scrollToSection('contact-section')}
              className={`rounded-lg transition-all duration-300 ${
                activeSection === 'contact-section'
                  ? 'bg-hero-accent text-background border-hero-accent'
                  : 'bg-hero-accent/10 border border-hero-accent/30 text-hero-accent hover:bg-hero-accent/20'
              }`}
            >
              {t('nav.contact')}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
