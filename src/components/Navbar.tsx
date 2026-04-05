import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/ecoloop-logo.png";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="EcoLoop" width={36} height={36} />
          <span className="text-xl font-bold text-foreground">EcoLoop</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
          <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>Log In</Button>
          <Button variant="hero" size="sm" onClick={() => navigate("/signup")}>Sign Up</Button>
        </div>

        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 space-y-3">
          <a href="#how-it-works" className="block text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>How It Works</a>
          <a href="#features" className="block text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#about" className="block text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>About</a>
          <div className="flex gap-2 pt-2">
            <Button variant="ghost" size="sm" className="flex-1" onClick={() => { navigate("/login"); setMobileOpen(false); }}>Log In</Button>
            <Button variant="hero" size="sm" className="flex-1" onClick={() => { navigate("/signup"); setMobileOpen(false); }}>Sign Up</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
