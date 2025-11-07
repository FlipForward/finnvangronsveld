import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";
import EnterScreen from "./components/EnterScreen";

const queryClient = new QueryClient();

const App = () => {
  const [showEnter, setShowEnter] = useState(() => {
    return !sessionStorage.getItem('hasVisited');
  });
  const [contentReady, setContentReady] = useState(() => {
    return sessionStorage.getItem('hasVisited') === 'true';
  });

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {showEnter && <EnterScreen onEnter={() => {
            setShowEnter(false);
            sessionStorage.setItem('hasVisited', 'true');
            // Delay content rendering to ensure smooth transition
            setTimeout(() => setContentReady(true), 100);
          }} />}
          {contentReady && <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/portfolio" element={<Portfolio />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>}
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
