import { Scan, BarChart3, Wallet, ArrowDownToLine } from "lucide-react";
import machineImg from "@/assets/ecoloop-machine.jpg";

const steps = [
  {
    icon: ArrowDownToLine,
    title: "Insert Your Bottle",
    desc: "Drop your plastic bottle or aluminum can into the EcoLoop machine.",
  },
  {
    icon: Scan,
    title: "Machine Scans It",
    desc: "Smart sensors detect the material type, size, and validate the item instantly.",
  },
  {
    icon: BarChart3,
    title: "Value is Calculated",
    desc: "The system measures weight and material to determine your reward points.",
  },
  {
    icon: Wallet,
    title: "Get Your Reward",
    desc: "Scan the QR code or connect your app — rewards go straight to your account.",
  },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-20 bg-secondary/50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">How It Works</h2>
        <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
          Four simple steps from waste to wallet. It's that easy.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 items-start p-4 rounded-xl bg-card shadow-soft transition-all hover:shadow-elevated">
              <div className="flex-shrink-0 w-12 h-12 rounded-full eco-gradient flex items-center justify-center">
                <step.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  <span className="text-primary mr-2">Step {i + 1}.</span>
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl overflow-hidden shadow-elevated">
          <img src={machineImg} alt="EcoLoop machine in action" className="w-full h-auto" loading="lazy" />
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
