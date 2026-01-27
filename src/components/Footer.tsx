import { Instagram, Music, Camera, Linkedin, Twitch } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "Instagram", url: "https://www.instagram.com/finnvangronsveld?igsh=MXAxOTNvNnhjMXRidQ==", icon: Instagram },
    { name: "ATLAZ", url: "https://www.instagram.com/atlazmusicbe?igsh=emd1OHRhazlpdnVy", icon: Music },
    { name: "Twitch", url: "https://www.twitch.tv/mrfinnertytv", icon: Twitch },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/finnvangronsveld/", icon: Linkedin },
    { name: "Pexels", url: "https://www.pexels.com/@finnvangronsveld/", icon: Camera },
    { name: "SoundCloud", url: "https://soundcloud.com/atlazmusicbe", icon: Music },
  ];

  return (
    <footer className="relative border-t border-hero-accent/20 bg-background">
      <div className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Centered content */}
          <div className="flex flex-col items-center space-y-8">
            {/* Brand */}
            <h3 className="text-3xl font-anton text-hero-accent">FINN VANGRONSVELD</h3>
            
            {/* Social */}
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-hero-accent/10 border border-hero-accent/30 text-hero-accent hover:bg-hero-accent hover:text-background transition-all hover:scale-110"
                  aria-label={link.name}
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-foreground/50 text-sm">
              © {currentYear} Finn Vangronsveld. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
