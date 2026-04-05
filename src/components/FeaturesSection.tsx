import { Smartphone, ShieldCheck, TrendingUp, Users, Banknote, Zap } from "lucide-react";

const features = [
  { icon: Smartphone, title: "Mobile App", desc: "Track your recycling, check balance, and withdraw rewards anytime." },
  { icon: ShieldCheck, title: "Anti-Fraud Scanner", desc: "Smart sensors ensure only valid recyclable items are accepted." },
  { icon: Banknote, title: "Cash Withdrawal", desc: "Withdraw to bank, mobile money, or use for airtime and bills." },
  { icon: TrendingUp, title: "Earn More Over Time", desc: "Bonuses for consistent recycling and hitting milestones." },
  { icon: Users, title: "Referral Program", desc: "Invite friends and earn extra rewards when they recycle." },
  { icon: Zap, title: "Instant Rewards", desc: "No waiting — your account is credited the moment you recycle." },
];

const FeaturesSection = () => (
  <section id="features" className="py-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why EcoLoop?</h2>
        <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
          We make recycling rewarding, simple, and transparent.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="p-6 rounded-2xl bg-card border border-border hover:shadow-elevated transition-all group">
            <div className="w-11 h-11 rounded-xl eco-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <f.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
