import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: "React & TypeScript", level: 90 },
    { name: "Node.js & Backend", level: 85 },
    { name: "UI/UX Design", level: 80 },
    { name: "Music Production", level: 95 },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-16 py-20 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-hero-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-hero-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Text content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <div>
              <h2 className="text-5xl md:text-7xl font-anton text-hero-accent mb-4 leading-tight">
                {t('about.title')}
              </h2>
              <div className="w-24 h-1 bg-hero-accent mb-8" />
            </div>

            <div className="space-y-6 text-foreground/80 text-lg leading-relaxed">
              <p className="animate-fade-in" style={{ animationDelay: "200ms" }}>
                Hey! I'm Finn Vangronsveld, a passionate IT student who loves creating digital
                experiences. I blend technical skills with creative vision to build meaningful
                projects that make an impact.
              </p>
              <p className="animate-fade-in" style={{ animationDelay: "400ms" }}>
                When I'm not coding, you'll find me behind the decks as a DJ and producer,
                crafting beats and mixing tracks. Music and tech are my two passions, and I love
                how they both involve creation, rhythm, and flow.
              </p>
              <p className="animate-fade-in" style={{ animationDelay: "600ms" }}>
                I also stream on Twitch, sharing my journey and connecting with an amazing
                community. Whether it's development, music production, or gaming - I'm all about
                bringing people together through digital experiences.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4 animate-fade-in" style={{ animationDelay: "800ms" }}>
              <a
                href="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 bg-hero-accent/10 border-2 border-hero-accent text-hero-accent rounded-full font-medium hover:bg-hero-accent hover:text-background transition-all duration-300 hover:scale-105"
              >
                View My Work
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path
                    d="M6 3L11 8L6 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Right side - Skills & Stats */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            {/* Skills */}
            <div className="space-y-6">
              <h3 className="text-2xl font-anton text-hero-accent mb-6">CORE SKILLS</h3>
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="space-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/70 font-medium">{skill.name}</span>
                    <span className="text-hero-accent font-bold">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-foreground/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-hero-accent/50 to-hero-accent rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: isVisible ? `${skill.level}%` : "0%",
                        transitionDelay: `${index * 100 + 400}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              {[
                { number: "3+", label: "Years Experience" },
                { number: "50+", label: "Projects Done" },
                { number: "100+", label: "DJ Sets Played" },
                { number: "5K+", label: "Stream Viewers" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="p-6 bg-hero-accent/5 border border-hero-accent/20 rounded-2xl text-center hover:bg-hero-accent/10 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100 + 800}ms` }}
                >
                  <div className="text-3xl md:text-4xl font-anton text-hero-accent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xs text-foreground/60 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
