import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-recycling.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center pt-16">
      <div className="absolute inset-0 overflow-hidden">
        <img src={heroImg} alt="Smart recycling machine" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-xl space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium">
            ♻️ Recycle & Earn Rewards
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground leading-tight">
            Turn Your <span className="eco-gradient-text">Plastic Waste</span> Into Real Cash
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-md">
            Insert your bottles into our smart machines, get scanned instantly, and earn rewards you can withdraw as cash or mobile money.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="hero" size="lg" onClick={() => navigate("/signup")}>
              Get Started Free
            </Button>
            <Button variant="hero-outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" onClick={() => {
              document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
            }}>
              See How It Works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
