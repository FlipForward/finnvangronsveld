import Navigation from "@/components/Navigation";
import { Instagram, Twitch, Linkedin, Camera, Music, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const focusAreas = [
    "Web & IT (student @ Thomas More Geel)",
    "Photography & Editing (portfolio/stock on Pexels)",
    "DJ/Producer — ATLΛZ (Harder Styles)",
    "Streaming & Community (Twitch / Instagram)",
    "Scouting Leadership & Teamwork",
  ];

  const highlights = [
    { number: "120K+", label: "Photo views on Pexels" },
    { number: "9+", label: "Tracks / remixes released" },
    { number: "3rd year", label: "Scouts leader" },
    { number: "Harder Styles", label: "DJ & producer (ATLΛZ)" },
  ];

  const socialLinks = [
    { icon: Instagram, label: "Personal Instagram", url: "https://www.instagram.com/finnvangronsveld?igsh=MXAxOTNvNnhjMXRidQ==" },
    { icon: Instagram, label: "ATLΛZ Instagram", url: "https://www.instagram.com/atlazmusicbe?igsh=emd1OHRhazlpdnVy" },
    { icon: Twitch, label: "Twitch", url: "https://www.twitch.tv/mrfinnertytv" },
    { icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/finnvangronsveld/" },
    { icon: Camera, label: "Pexels Photography", url: "https://www.pexels.com/@finnvangronsveld/" },
    { icon: Music, label: "SoundCloud", url: "https://soundcloud.com/atlazmusicbe" },
    { icon: Music, label: "Spotify Artist", url: "https://open.spotify.com/artist/3eXIEA0f6BK8ibuR8m9EkF?si=i2ZMTWo4TDqrr7MgSR9Myg" },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navigation />
      
      <div className="pt-32 px-6 md:px-12 lg:px-16 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Main Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
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
                  Hey! I'm Finn Vangronsveld — 19 — from Schoonbroek, Retie (BE). I study Applied IT at Thomas More Geel.
                </p>
                <p>
                  I split my time between software & tech, photography, and music. As a DJ/producer I go by ATLΛZ, creating harder styles and sharing the journey as a gaming/creative streamer.
                </p>
                <p>
                  I'm also a scouts leader. I literally grew up at camps (my parents were cooking parents), learned to walk at camp, became a member as soon as I could, and I'm now in my 3rd year as a leader.
                </p>
                <p>
                  If I'm not coding or mixing, I'm shooting photos and building community online.
                </p>
              </div>

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
                      <span className="text-hero-accent mt-1">•</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div
            className={`mb-16 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <h2 className="text-2xl font-anton text-hero-accent mb-6">HIGHLIGHTS</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {highlights.map((stat, index) => (
                <div
                  key={index}
                  className="p-6 bg-hero-accent/5 border border-hero-accent/20 rounded-2xl text-center hover:bg-hero-accent/10 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100 + 600}ms` }}
                >
                  <div className="text-2xl md:text-3xl font-anton text-hero-accent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xs text-foreground/60 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div
            className={`transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <h2 className="text-2xl font-anton text-hero-accent mb-6">LINKS</h2>
            <div className="flex flex-wrap gap-4 mb-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-hero-accent/10 border border-hero-accent/20 text-hero-accent rounded-full text-sm font-medium hover:bg-hero-accent hover:text-background transition-all duration-300 hover:scale-105"
                  title={link.label}
                >
                  <link.icon size={16} />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
            
            {/* All Links & Booking */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://beacons.ai/atlazmusicbe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-hero-accent/10 border border-hero-accent/20 text-hero-accent rounded-full text-sm font-medium hover:bg-hero-accent hover:text-background transition-all duration-300 hover:scale-105"
              >
                🔗 All Links (Beacons)
              </a>
              <a
                href="mailto:bookings.atlaz@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 bg-hero-accent/10 border border-hero-accent/20 text-hero-accent rounded-full text-sm font-medium hover:bg-hero-accent hover:text-background transition-all duration-300 hover:scale-105"
              >
                <Mail size={16} />
                bookings.atlaz@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
