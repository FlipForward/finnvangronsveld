import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useParallax } from "@/hooks/useParallax";

// Import Finn's real Pexels photos
import photo1 from "@/assets/gallery/finn-2.jpg";
import photo2 from "@/assets/gallery/finn-3.jpg";
import photo3 from "@/assets/gallery/finn-5.jpg";
import photo4 from "@/assets/gallery/finn-6.jpg";
import photo5 from "@/assets/gallery/finn-7.jpg";
import photo6 from "@/assets/gallery/finn-8.jpg";
import photo7 from "@/assets/gallery/finn-9.jpg";
import photo8 from "@/assets/gallery/finn-10.jpg";
import photo9 from "@/assets/gallery/finn-11.jpg";

interface Photo {
  id: number;
  src: string;
  alt: string;
}

const photos: Photo[] = [
  { id: 1, src: photo1, alt: "Photography by Finn Vangronsveld" },
  { id: 2, src: photo7, alt: "Photography by Finn Vangronsveld" },
  { id: 3, src: photo4, alt: "Photography by Finn Vangronsveld" },

  { id: 4, src: photo6, alt: "Photography by Finn Vangronsveld" },
  { id: 5, src: photo5, alt: "Photography by Finn Vangronsveld" },
  { id: 6, src: photo2, alt: "Photography by Finn Vangronsveld" },

  { id: 7, src: photo9, alt: "Photography by Finn Vangronsveld" },
  { id: 8, src: photo3, alt: "Photography by Finn Vangronsveld" },
  { id: 9, src: photo8, alt: "Photography by Finn Vangronsveld" },
];

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxOffset = useParallax(0.15);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const openLightbox = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setTimeout(() => setSelectedPhoto(null), 300);
  };

  const navigatePhoto = (direction: "prev" | "next") => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
    let newIndex;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    } else {
      newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedPhoto(photos[newIndex]);
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen py-20 px-6 md:px-12 lg:px-16">
      {/* Abstract minimalistic grid background */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ transform: `translateY(${parallaxOffset * 0.8}px)` }}
      >
        {/* Vertical lines */}
        <div className="absolute left-[15%] top-0 bottom-0 w-px bg-hero-accent/10" />
        <div className="absolute left-[35%] top-0 bottom-0 w-px bg-hero-accent/5" />
        <div className="absolute left-[62%] top-0 bottom-0 w-px bg-hero-accent/10" />
        <div className="absolute right-[18%] top-0 bottom-0 w-px bg-hero-accent/5" />

        {/* Horizontal lines */}
        <div className="absolute top-[20%] left-0 right-0 h-px bg-hero-accent/10" />
        <div className="absolute top-[45%] left-0 right-0 h-px bg-hero-accent/5" />
        <div className="absolute top-[68%] left-0 right-0 h-px bg-hero-accent/10" />

        {/* Accent dots */}
        <div className="absolute left-[15%] top-[20%] w-2 h-2 rounded-full bg-hero-accent/20" />
        <div className="absolute left-[62%] top-[45%] w-2 h-2 rounded-full bg-hero-accent/20" />
        <div className="absolute right-[18%] top-[68%] w-2 h-2 rounded-full bg-hero-accent/20" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-anton text-hero-accent mb-4">PORTFOLIO</h2>
          <div className="w-24 h-1 bg-hero-accent mb-8" />
          <div className="flex items-center justify-between">
            <p className="text-foreground/70 text-lg max-w-2xl">
              Visual storytelling through photography — capturing moments, emotions, and perspectives.
            </p>
            <a
              href="https://www.pexels.com/@finnvangronsveld/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 border border-hero-accent/30 text-hero-accent rounded-full hover:bg-hero-accent/10 transition-all"
            >
              <span className="text-sm">View on Pexels</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Masonry grid preserving original ratios */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="group relative cursor-pointer overflow-hidden rounded-lg bg-hero-accent/5 border border-hero-accent/20 transition-all duration-300 hover:border-hero-accent hover:scale-[1.02] hover:z-10 animate-fade-in break-inside-avoid mb-4"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => openLightbox(photo)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <p className="text-white text-xs font-medium">View Full Size</p>
                  <ExternalLink size={14} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pexels link for mobile */}
        <div className="md:hidden flex justify-center mt-12">
          <a
            href="https://www.pexels.com/@finnvangronsveld/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-hero-accent/10 border-2 border-hero-accent text-hero-accent rounded-full hover:bg-hero-accent hover:text-background transition-all"
          >
            <span>View on Pexels</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={isLightboxOpen} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-hero-accent/30">
          {selectedPhoto && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-hero-accent/10 border border-hero-accent/30 text-hero-accent hover:bg-hero-accent/20 transition-all"
                aria-label="Close"
              >
                <X size={24} />
              </button>

              {/* Navigation buttons */}
              <button
                onClick={() => navigatePhoto("prev")}
                className="absolute left-4 z-50 p-3 rounded-full bg-hero-accent/10 border border-hero-accent/30 text-hero-accent hover:bg-hero-accent/20 transition-all"
                aria-label="Previous photo"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={() => navigatePhoto("next")}
                className="absolute right-4 z-50 p-3 rounded-full bg-hero-accent/10 border border-hero-accent/30 text-hero-accent hover:bg-hero-accent/20 transition-all"
                aria-label="Next photo"
              >
                <ChevronRight size={24} />
              </button>

              {/* Image */}
              <img src={selectedPhoto.src} alt={selectedPhoto.alt} className="max-w-full max-h-[90vh] object-contain" />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-center text-lg">{selectedPhoto.alt}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PhotoGallery;
