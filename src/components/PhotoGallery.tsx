import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Import gallery images
import nature1 from "@/assets/gallery/nature-1.jpg";
import nature2 from "@/assets/gallery/nature-2.jpg";
import nature3 from "@/assets/gallery/nature-3.jpg";
import urban1 from "@/assets/gallery/urban-1.jpg";
import urban2 from "@/assets/gallery/urban-2.jpg";
import urban3 from "@/assets/gallery/urban-3.jpg";
import event1 from "@/assets/gallery/event-1.jpg";
import event2 from "@/assets/gallery/event-2.jpg";
import portrait1 from "@/assets/gallery/portrait-1.jpg";

interface Photo {
  id: number;
  src: string;
  alt: string;
  category: "all" | "nature" | "urban" | "events" | "portrait";
}

const photos: Photo[] = [
  { id: 1, src: nature1, alt: "Mountain landscape at golden hour", category: "nature" },
  { id: 2, src: urban1, alt: "Modern city architecture at night", category: "urban" },
  { id: 3, src: event1, alt: "Concert crowd with stage lighting", category: "events" },
  { id: 4, src: nature2, alt: "Forest with sunbeams", category: "nature" },
  { id: 5, src: urban2, alt: "Street photography with neon signs", category: "urban" },
  { id: 6, src: event2, alt: "Music festival atmosphere", category: "events" },
  { id: 7, src: portrait1, alt: "Creative portrait with dramatic lighting", category: "portrait" },
  { id: 8, src: nature3, alt: "Coastal sunset with waves", category: "nature" },
  { id: 9, src: urban3, alt: "Geometric architectural details", category: "urban" },
];

const PhotoGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "nature" | "urban" | "events" | "portrait">("all");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const categories = [
    { value: "all" as const, label: "All" },
    { value: "nature" as const, label: "Nature" },
    { value: "urban" as const, label: "Urban" },
    { value: "events" as const, label: "Events" },
    { value: "portrait" as const, label: "Portrait" },
  ];

  const filteredPhotos = selectedCategory === "all" 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

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
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    let newIndex;
    
    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredPhotos.length - 1;
    } else {
      newIndex = currentIndex < filteredPhotos.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedPhoto(filteredPhotos[newIndex]);
  };

  return (
    <section className="relative min-h-screen py-20 px-6 md:px-12 lg:px-16">
      {/* Grid background pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--hero-accent) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--hero-accent) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-anton text-hero-accent mb-4">
            PHOTOGRAPHY
          </h2>
          <div className="w-24 h-1 bg-hero-accent mb-8" />
          <p className="text-foreground/70 text-lg max-w-2xl">
            Capturing moments through the lens — from nature's beauty to urban energy and event atmosphere.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              variant={selectedCategory === category.value ? "default" : "outline"}
              className={`rounded-full transition-all duration-300 ${
                selectedCategory === category.value
                  ? "bg-hero-accent text-background hover:bg-hero-accent/90"
                  : "border-hero-accent/30 text-foreground/70 hover:border-hero-accent hover:text-hero-accent"
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="group relative aspect-video cursor-pointer overflow-hidden rounded-2xl bg-hero-accent/5 border border-hero-accent/20 transition-all duration-300 hover:border-hero-accent hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => openLightbox(photo)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium">{photo.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-foreground/50 text-lg">No photos in this category yet.</p>
          </div>
        )}
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
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="max-w-full max-h-[90vh] object-contain"
              />

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
