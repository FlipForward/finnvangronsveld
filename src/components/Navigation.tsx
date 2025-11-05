import { NavLink } from "./NavLink";
import { Button } from "./ui/button";

const Navigation = () => {
  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-6 md:px-12 lg:px-16">
      <div className="flex items-center justify-between">
        {/* Left nav pills */}
        <div className="flex items-center gap-1 rounded-full border border-hero-accent/30 bg-black/50 backdrop-blur-sm px-2 py-2">
          <NavLink
            to="/"
            className="px-4 py-2 text-sm font-medium transition-colors rounded-full"
            activeClassName="bg-hero-accent/10 text-hero-accent"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors rounded-full"
          >
            About Me
          </NavLink>
          <NavLink
            to="/portfolio"
            className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors rounded-full"
          >
            Portfolio
          </NavLink>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-hero-accent/30 text-foreground/70 hover:text-foreground hover:border-hero-accent/50"
          >
            EN
          </Button>
          <Button
            size="sm"
            className="rounded-full bg-hero-accent/10 border border-hero-accent/30 text-hero-accent hover:bg-hero-accent/20"
          >
            Contact
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
