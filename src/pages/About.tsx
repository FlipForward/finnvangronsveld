import Navigation from "@/components/Navigation";
import { useEffect, useRef, useState } from "react";
import { Instagram, Music, Camera, Linkedin, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
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

  const focusAreas = [
    "IT & Web Development (Thomas More Geel)",
    "DJ & Music Production (Harder Styles, as ATLAZ)",
    "Gaming & Twitch Streaming",
    "Photography & Visual Creativity",
    "Scouting Leadership & Teamwork"
  ];

  const highlights = [
    { label: "3rd Year", subtitle: "Scouts Leader" },
    { label: "Released Tracks", subtitle: "Produced as ATLAZ" },
    { label: "DJ Sets Played", subtitle: "Performing Harder Styles" },
    { label: "Twitch Streams", subtitle: "Gaming & Creative Sessions" }
  ];

  const socialLinks = [
    { 
      name: "Instagram (Personal)", 
      url: "https://www.instagram.com/finnvangronsveld?igsh=MXAxOTNvNnhjMXRidQ==",
      icon: Instagram 
    },
    { 
      name: "Instagram (ATLAZ)", 
      url: "https://www.instagram.com/atlazmusicbe?igsh=emd1OHRhazlpdnVy",
      icon: Instagram 
    },
    { 
      name: "Twitch", 
      url: "https://www.twitch.tv/mrfinnertytv",
      icon: ExternalLink 
    },
    { 
      name: "LinkedIn", 
      url: "https://www.linkedin.com/in/finnvangronsveld/",
      icon: Linkedin 
    },
    { 
      name: "Photography", 
      url: "https://www.pexels.com/@finnvangronsveld/",
      icon: Camera 
    },
    { 
      name: "SoundCloud", 
      url: "https://soundcloud.com/atlazmusicbe",
      icon: Music 
    },
    { 
      name: "Spotify", 
      url: "https://open.spotify.com/artist/3eXIEA0f6BK8ibuR8m9EkF?si=i2ZMTWo4TDqrr7MgSR9Myg",
      icon: Music 
    }
  ];
  
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navigation />
      
      {/* Main About Section */}
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
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left side - About Me */}
            <div
              className={`space-y-8 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              <div>
                <h2 className="text-5xl md:text-7xl font-anton text-hero-accent mb-4 leading-tight">
                  ABOUT ME
                </h2>
                <div className="w-24 h-1 bg-hero-accent mb-8" />
              </div>

              <div className="space-y-6 text-foreground/80 text-lg leading-relaxed">
                <p className="animate-fade-in" style={{ animationDelay: "200ms" }}>
                  Hey! I'm Finn Vangronsveld, a 19-year-old IT student from Schoonbroek, Retie (Belgium), currently studying Applied IT at Thomas More Geel.
                </p>
                <p className="animate-fade-in" style={{ animationDelay: "400ms" }}>
                  I combine two great passions: technology and music. As ATLAZ, I produce and perform harder styles—bringing energy and rhythm to my sets and productions.
                </p>
                <p className="animate-fade-in" style={{ animationDelay: "600ms" }}>
                  I also stream on Twitch, where I share my gaming sessions, creative experiments, and connect with a community who enjoys music, tech and fun.
                </p>
                <p className="animate-fade-in" style={{ animationDelay: "800ms" }}>
                  Off-screen I'm a scouts leader. Scouting has been part of my life since I was born (my parents were cooking parents at camps!), I learned to walk at camp, then became a member, and I'm now in my third year as a leader, mentoring younger scouts through adventure and teamwork.
                </p>
                <p className="animate-fade-in" style={{ animationDelay: "1000ms" }}>
                  If I'm not coding or mixing, I'm shooting photos and building community online.
                </p>
              </div>

              {/* CTA Button */}
              <div className="pt-4 animate-fade-in" style={{ animationDelay: "1200ms" }}>
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

            {/* Right side - Focus Areas */}
            <div
              className={`space-y-8 transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
            >
              {/* Focus Areas */}
              <div className="space-y-6">
                <h3 className="text-2xl font-anton text-hero-accent mb-6">FOCUS AREAS</h3>
                <ul className="space-y-4">
                  {focusAreas.map((area, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-foreground/70 text-lg animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="text-hero-accent text-xl mt-1">→</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Highlights Grid */}
              <div className="pt-8">
                <h3 className="text-2xl font-anton text-hero-accent mb-6">HIGHLIGHTS</h3>
                <div className="grid grid-cols-2 gap-4">
                  {highlights.map((stat, index) => (
                    <div
                      key={stat.label}
                      className="p-6 bg-hero-accent/5 border border-hero-accent/20 rounded-2xl text-center hover:bg-hero-accent/10 transition-all duration-300 hover:scale-105 animate-fade-in"
                      style={{ animationDelay: `${index * 100 + 400}ms` }}
                    >
                      <div className="text-2xl md:text-3xl font-anton text-hero-accent mb-2">
                        {stat.label}
                      </div>
                      <div className="text-xs text-foreground/60 uppercase tracking-wider">
                        {stat.subtitle}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section className="px-6 md:px-12 lg:px-16 pb-20">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-anton text-hero-accent mb-8 text-center">CONNECT WITH ME</h3>
          
          {/* Social Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-hero-accent/5 border border-hero-accent/20 rounded-xl hover:bg-hero-accent/10 transition-all duration-300 hover:scale-105 group"
              >
                <link.icon className="text-hero-accent flex-shrink-0" size={20} />
                <span className="text-foreground/70 text-sm group-hover:text-foreground transition-colors">
                  {link.name}
                </span>
              </a>
            ))}
          </div>

          {/* Additional Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://beacons.ai/atlazmusicbe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-hero-accent/10 border-2 border-hero-accent text-hero-accent rounded-full font-medium hover:bg-hero-accent hover:text-background transition-all duration-300 hover:scale-105"
            >
              <ExternalLink size={18} />
              All Links (Beacons)
            </a>
            <a
              href="mailto:bookings.atlaz@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-hero-accent/10 border-2 border-hero-accent text-hero-accent rounded-full font-medium hover:bg-hero-accent hover:text-background transition-all duration-300 hover:scale-105"
            >
              <Mail size={18} />
              Booking Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
