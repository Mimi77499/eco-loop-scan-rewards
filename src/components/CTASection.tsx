import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section id="about" className="py-20 eco-gradient">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Ready to Earn From Your Waste?
        </h2>
        <p className="text-primary-foreground/80 max-w-md mx-auto mb-8">
          Join EcoLoop today. Create your free account and start turning plastic into cash.
        </p>
        <Button
          size="lg"
          className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold text-base"
          onClick={() => navigate("/signup")}
        >
          Create Your Account
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
