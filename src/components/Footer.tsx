import { Instagram, Music, Camera, Linkedin, ExternalLink, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "Instagram", url: "https://www.instagram.com/finnvangronsveld?igsh=MXAxOTNvNnhjMXRidQ==", icon: Instagram },
    { name: "ATLAZ", url: "https://www.instagram.com/atlazmusicbe?igsh=emd1OHRhazlpdnVy", icon: Music },
    { name: "Twitch", url: "https://www.twitch.tv/mrfinnertytv", icon: ExternalLink },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/finnvangronsveld/", icon: Linkedin },
    { name: "Pexels", url: "https://www.pexels.com/@finnvangronsveld/", icon: Camera },
    { name: "SoundCloud", url: "https://soundcloud.com/atlazmusicbe", icon: Music },
  ];

  return (
    <footer className="relative border-t border-hero-accent/20 bg-background">
      <div className="px-6 md:px-12 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Top section */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-2xl font-anton text-hero-accent">FINN VANGRONSVELD</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">
                IT Student, DJ/Producer, Photographer & Streamer from Belgium.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-hero-accent uppercase tracking-wider">Quick Links</h4>
              <div className="flex flex-col gap-2">
                <a href="#hero" className="text-foreground/60 hover:text-hero-accent transition-colors text-sm">Home</a>
                <a href="#about-section" className="text-foreground/60 hover:text-hero-accent transition-colors text-sm">About</a>
                <a href="#portfolio-section" className="text-foreground/60 hover:text-hero-accent transition-colors text-sm">Portfolio</a>
                <a href="#contact-section" className="text-foreground/60 hover:text-hero-accent transition-colors text-sm">Contact</a>
              </div>
            </div>

            {/* Social */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-hero-accent uppercase tracking-wider">Connect</h4>
              <div className="grid grid-cols-3 gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-hero-accent/10 border border-hero-accent/30 text-hero-accent hover:bg-hero-accent hover:text-background transition-all hover:scale-110"
                    aria-label={link.name}
                  >
                    <link.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="pt-8 border-t border-hero-accent/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-foreground/50 text-sm">
                © {currentYear} Finn Vangronsveld. All rights reserved.
              </p>
              <p className="text-foreground/50 text-sm flex items-center gap-1">
                Built with <Heart size={14} className="text-hero-accent fill-hero-accent" /> using React & TypeScript
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
