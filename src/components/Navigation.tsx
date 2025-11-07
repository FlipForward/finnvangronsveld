import { NavLink } from "./NavLink";
import { Button } from "./ui/button";
import { Menu, X, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { VolumeSlider } from "./VolumeSlider";
import { useBackgroundMusic } from "@/hooks/useBackgroundMusic";
import { useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { volume, setVolume } = useBackgroundMusic();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Show arrow when scrolled past 80% of viewport height
      setShowArrow(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'nl' : 'en');
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // On homepage, scroll to about section
      const aboutSection = document.querySelector('#about-section');
      aboutSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Navigate to homepage then scroll
      navigate('/');
      setTimeout(() => {
        const aboutSection = document.querySelector('#about-section');
        aboutSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
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
          <NavLink
            to="/"
            className="px-3 py-1.5 text-sm font-medium transition-colors rounded-full text-background/70 hover:text-background relative"
            activeClassName="bg-background text-hero-accent"
          >
            {t('nav.home')}
          </NavLink>
          <button
            onClick={handleAboutClick}
            className="px-3 py-1.5 text-sm font-medium text-background/70 hover:text-background transition-colors rounded-full relative"
          >
            {t('nav.about')}
          </button>
          <NavLink
            to="/portfolio"
            className="px-3 py-1.5 text-sm font-medium text-background/70 hover:text-background transition-colors rounded-full relative"
            activeClassName="bg-background text-hero-accent"
          >
            {t('nav.portfolio')}
          </NavLink>
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
          <VolumeSlider volume={volume} onVolumeChange={setVolume} />
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="rounded-full border-hero-accent/30 text-foreground/70 hover:text-foreground hover:border-hero-accent/50 h-8 px-3 py-1"
          >
            {language.toUpperCase()}
          </Button>
          <Button
            size="sm"
            className="rounded-full bg-hero-accent/10 border border-hero-accent/30 text-hero-accent hover:bg-hero-accent/20 h-8 px-3 py-1"
          >
            {t('nav.contact')}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-6 right-6 bg-black/95 backdrop-blur-sm border border-hero-accent/30 rounded-2xl p-4 z-50">
          <div className="flex flex-col gap-2">
            <NavLink
              to="/"
              className="px-4 py-3 text-sm font-medium transition-colors rounded-lg"
              activeClassName="bg-hero-accent/10 text-hero-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </NavLink>
            <button
              onClick={handleAboutClick}
              className="px-4 py-3 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors rounded-lg text-left w-full"
            >
              {t('nav.about')}
            </button>
            <NavLink
              to="/portfolio"
              className="px-4 py-3 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.portfolio')}
            </NavLink>
            <div className="h-px bg-hero-accent/20 my-2" />
            <Button
              size="sm"
              onClick={toggleLanguage}
              className="rounded-lg bg-hero-accent/10 border border-hero-accent/30 text-hero-accent hover:bg-hero-accent/20 mb-2"
            >
              {language === 'en' ? 'NL' : 'EN'}
            </Button>
            <Button
              size="sm"
              className="rounded-lg bg-hero-accent/10 border border-hero-accent/30 text-hero-accent hover:bg-hero-accent/20"
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
