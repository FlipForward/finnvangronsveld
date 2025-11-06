import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";

const Portfolio = () => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navigation />
      <div className="pt-32 px-6 md:px-12 lg:px-16">
        <h1 className="text-4xl md:text-6xl font-anton text-hero-accent mb-8">{t('portfolio.title')}</h1>
        <p className="text-muted-soft">{t('portfolio.content')}</p>
      </div>
    </div>
  );
};

export default Portfolio;
