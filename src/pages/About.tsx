import Navigation from "@/components/Navigation";
import { useEffect, useRef, useState } from "react";
import { Instagram, Twitch, Linkedin, Camera, Music, Mail, ExternalLink } from "lucide-react";

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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const focusAreas = [
    "IT & Web Development (Thomas More Geel)",
    "DJ & Music Production (Harder Styles as ATLAZ)",
    "Gaming & Twitch Streaming",
    "Photography & Visual Creativity",
    "Scouting Leadership & Teamwork",
  ];

  const stats = [
    { number: "3rd year", label: "Scouts Leader" },
    { number: "9+", label: "Tracks Released" },
    { number: "100+", label: "DJ Sets Played" },
    { number: "5K+", label: "Twitch Viewers" },
  ];

  const socialLinks = [
    { name: "Instagram (Personal)", icon: Instagram, url: "https://www.instagram.com/finnvangronsveld?igsh=MXAxOTNvNnhjMXRidQ==" },
    { name: "Instagram (ATLAZ)", icon: Instagram, url: "https://www.instagram.com/atlazmusicbe?igsh=emd1OHRhazlpdnVy" },
    { name: "Twitch", icon: Twitch, url: "https://www.twitch.tv/mrfinnertytv" },
    { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/finnvangronsveld/" },
    { name: "Pexels Photography", icon: Camera, url: "https://www.pexels.com/@finnvangronsveld/" },
    { name: "SoundCloud", icon: Music, url: "https://soundcloud.com/atlazmusicbe" },
    { name: "Spotify Artist", icon: Music, url: "https://open.spotify.com/artist/3eXIEA0f6BK8ibuR8m9EkF?si=i2ZMTWo4TDqrr7MgSR9Myg" },
    { name: "All Links (Beacons)", icon: ExternalLink, url: "https://beacons.ai/atlazmusicbe" },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navigation />
      
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-16 py-32 overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-hero-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-hero-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto space-y-16">
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Column - About Me */}
            <div
              className={`space-y-8 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              <div>
                <h1 className="text-5xl md:text-7xl font-anton text-hero-accent mb-4 leading-tight">
                  ABOUT ME
                </h1>
                <div className="w-24 h-1 bg-hero-accent mb-8" />
              </div>

              <div className="space-y-6 text-foreground/80 text-lg leading-relaxed">
                <p>
                  Hey! I'm Finn Vangronsveld, a 19-year-old IT student from Schoonbroek, Retie (Belgium) studying Applied IT at Thomas More Geel.
                </p>
                <p>
                  I'm passionate about tech, music, and creativity — and I love blending those worlds together. When I'm not coding or working on digital projects, you'll find me performing and producing harder styles as ATLAZ.
                </p>
                <p>
                  I also stream on Twitch, where I share my gaming and creative journey with an amazing online community. Whether it's coding, mixing, or gaming, I love connecting with people through what I create.
                </p>
                <p>
                  Outside the digital world, I'm a scouts leader. Scouting has been part of my life since birth — my parents were cooking parents at camps, I literally learned to walk there, and now I'm in my third year as a leader, guiding younger members through adventure and teamwork.
                </p>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
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

            {/* Right Column - Focus Areas */}
            <div
              className={`space-y-8 transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
            >
              <div>
                <h2 className="text-2xl font-anton text-hero-accent mb-6">FOCUS AREAS</h2>
                <ul className="space-y-4">
                  {focusAreas.map((area, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-foreground/70 text-lg"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="text-hero-accent mt-1 text-xl">•</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div
            className={`grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="p-6 bg-hero-accent/5 border border-hero-accent/20 rounded-2xl text-center hover:bg-hero-accent/10 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100 + 600}ms` }}
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

          {/* Links Section */}
          <div
            className={`transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <h2 className="text-2xl font-anton text-hero-accent mb-6">LINKS</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-hero-accent/5 border border-hero-accent/20 rounded-xl hover:bg-hero-accent/10 hover:border-hero-accent/40 transition-all duration-300 hover:scale-105 group"
                >
                  <link.icon className="w-5 h-5 text-hero-accent" />
                  <span className="text-sm text-foreground/70 group-hover:text-foreground transition-colors">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
            
            {/* Booking Email */}
            <div className="mt-6">
              <a
                href="mailto:bookings.atlaz@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-hero-accent/10 border-2 border-hero-accent text-hero-accent rounded-full font-medium hover:bg-hero-accent hover:text-background transition-all duration-300 hover:scale-105"
              >
                <Mail className="w-5 h-5" />
                bookings.atlaz@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
