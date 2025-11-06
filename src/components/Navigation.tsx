import { NavLink } from "./NavLink";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'nl' : 'en');
  };

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-6 md:px-12 lg:px-16">
      {/* Icon in top center */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0">
        <img 
          src="/icon.png" 
          alt="Icon" 
          className="w-10 h-10 md:w-12 md:h-12"
          style={{ filter: 'brightness(0) saturate(100%) invert(85%) sepia(35%) saturate(2719%) hue-rotate(136deg) brightness(94%) contrast(101%)' }} 
        />
      </div>

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
          <NavLink
            to="/about"
            className="px-3 py-1.5 text-sm font-medium text-background/70 hover:text-background transition-colors rounded-full relative"
            activeClassName="bg-background text-hero-accent"
          >
            {t('nav.about')}
          </NavLink>
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
            <NavLink
              to="/about"
              className="px-4 py-3 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.about')}
            </NavLink>
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
