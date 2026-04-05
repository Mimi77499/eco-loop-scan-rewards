import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/ecoloop-logo.png";
import { Wallet, Recycle, History, LogOut, User, ArrowLeft } from "lucide-react";

interface UserData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  balance: number;
  totalRecycled: number;
  joinedAt: string;
  history: { date: string; items: number; earned: number }[];
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("ecoloop_current_user");
    if (!stored) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(stored));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("ecoloop_current_user");
    navigate("/");
  };

  if (!user) return null;

  const stats = [
    { icon: Wallet, label: "Balance", value: `₦${user.balance.toLocaleString()}`, color: "eco-gradient" },
    { icon: Recycle, label: "Items Recycled", value: user.totalRecycled.toString(), color: "bg-accent" },
    { icon: History, label: "Transactions", value: user.history.length.toString(), color: "bg-secondary" },
  ];

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <img src={logo} alt="EcoLoop" width={32} height={32} />
            <span className="font-bold text-foreground">Dashboard</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-1" /> Log Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Hello, {user.fullName.split(" ")[0]} 👋</h1>
          <p className="text-muted-foreground text-sm">Welcome to your EcoLoop dashboard</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="bg-card rounded-2xl p-5 shadow-soft border border-border">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Profile Card */}
        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full eco-gradient flex items-center justify-center">
              <User className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">{user.fullName}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="p-3 rounded-xl bg-secondary/50">
              <p className="text-muted-foreground">Phone</p>
              <p className="font-medium text-foreground">{user.phone}</p>
            </div>
            <div className="p-3 rounded-xl bg-secondary/50">
              <p className="text-muted-foreground">Member Since</p>
              <p className="font-medium text-foreground">{new Date(user.joinedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
          <h2 className="font-semibold text-foreground mb-4">Recycling History</h2>
          {user.history.length === 0 ? (
            <div className="text-center py-8">
              <Recycle className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No recycling activity yet.</p>
              <p className="text-sm text-muted-foreground">Visit an EcoLoop machine to start earning!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {user.history.map((h, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                  <div>
                    <p className="text-sm font-medium text-foreground">{h.items} items recycled</p>
                    <p className="text-xs text-muted-foreground">{new Date(h.date).toLocaleDateString()}</p>
                  </div>
                  <p className="font-semibold text-primary">+₦{h.earned}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
