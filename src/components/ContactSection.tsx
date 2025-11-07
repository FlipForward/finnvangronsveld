import { useEffect, useRef, useState } from "react";
import { Mail, Send, User, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useParallax } from "@/hooks/useParallax";

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { toast } = useToast();
  const parallaxOffset = useParallax(0.1);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "I'll get back to you as soon as possible.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      id="contact-section"
      ref={sectionRef}
      className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-16 py-20"
    >
      {/* Background decorations */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ transform: `translateY(${parallaxOffset * 0.6}px)` }}
      >
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-hero-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-hero-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
      </div>

      <div className="relative w-full max-w-4xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-7xl font-anton text-hero-accent mb-4 leading-tight">
              GET IN TOUCH
            </h2>
            <div className="w-24 h-1 bg-hero-accent mx-auto mb-8" />
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Have a project in mind or just want to chat? Drop me a message and I'll get back to you soon!
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2 animate-fade-in" style={{ animationDelay: '200ms' }}>
                <label className="text-sm text-foreground/70 flex items-center gap-2">
                  <User size={16} className="text-hero-accent" />
                  Name
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  required
                  className="bg-hero-accent/5 border-hero-accent/30 focus:border-hero-accent text-foreground placeholder:text-foreground/40"
                />
              </div>

              {/* Email */}
              <div className="space-y-2 animate-fade-in" style={{ animationDelay: '300ms' }}>
                <label className="text-sm text-foreground/70 flex items-center gap-2">
                  <Mail size={16} className="text-hero-accent" />
                  Email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  required
                  className="bg-hero-accent/5 border-hero-accent/30 focus:border-hero-accent text-foreground placeholder:text-foreground/40"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <label className="text-sm text-foreground/70 flex items-center gap-2">
                <MessageSquare size={16} className="text-hero-accent" />
                Message
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your project or just say hi..."
                required
                rows={6}
                className="bg-hero-accent/5 border-hero-accent/30 focus:border-hero-accent text-foreground placeholder:text-foreground/40 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center animate-fade-in" style={{ animationDelay: '500ms' }}>
              <Button
                type="submit"
                size="lg"
                className="rounded-full bg-hero-accent text-background hover:bg-hero-accent/90 px-8 py-6 font-medium transition-all hover:scale-105"
              >
                <Send size={18} className="mr-2" />
                Send Message
              </Button>
            </div>
          </form>

          {/* Quick contact info */}
          <div className="mt-12 pt-12 border-t border-hero-accent/20 text-center animate-fade-in" style={{ animationDelay: '600ms' }}>
            <p className="text-foreground/60 text-sm mb-4">Or reach out directly via email</p>
            <a
              href="mailto:finn@example.com"
              className="inline-flex items-center gap-2 text-hero-accent hover:text-hero-accent/80 transition-colors"
            >
              <Mail size={18} />
              <span className="text-lg">finnvangronsveld@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
