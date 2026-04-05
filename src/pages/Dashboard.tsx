import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/ecoloop-logo.png";
import {
  Wallet, Recycle, History, LogOut, User, LayoutDashboard,
  MapPin, Settings, ChevronRight, ArrowLeft, Menu, X,
  TrendingUp, CreditCard, ArrowDownToLine, ArrowUpFromLine,
  Copy, Bell
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  balance: number;
  totalRecycled: number;
  joinedAt: string;
  history: { date: string; items: number; earned: number }[];
}

type Tab = "overview" | "recycling" | "wallet" | "profile" | "settings";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("ecoloop_current_user");
    if (!stored) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(stored));
  }, [navigate]);

  useEffect(() => {
    const hash = location.hash.replace("#", "") as Tab;
    if (["overview", "recycling", "wallet", "profile", "settings"].includes(hash)) {
      setActiveTab(hash);
    }
  }, [location.hash]);

  const handleLogout = () => {
    localStorage.removeItem("ecoloop_current_user");
    navigate("/");
  };

  const switchTab = (tab: Tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
    window.history.replaceState(null, "", `#${tab}`);
  };

  if (!user) return null;

  const navItems: { id: Tab; icon: typeof LayoutDashboard; label: string }[] = [
    { id: "overview", icon: LayoutDashboard, label: "Dashboard" },
    { id: "recycling", icon: Recycle, label: "Recycling" },
    { id: "wallet", icon: Wallet, label: "Wallet" },
    { id: "profile", icon: User, label: "Profile" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-secondary/30 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static`}>
        <div className="flex items-center gap-2 px-5 h-16 border-b border-border">
          <img src={logo} alt="EcoLoop" width={32} height={32} />
          <span className="font-bold text-foreground text-lg">EcoLoop</span>
          <button className="lg:hidden ml-auto" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => switchTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? "eco-gradient text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-card border-b border-border h-16 flex items-center px-4 gap-3">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5 text-foreground" />
          </button>
          <div className="flex-1">
            <h2 className="font-semibold text-foreground capitalize">{activeTab}</h2>
          </div>
          <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
            <Bell className="h-5 w-5 text-muted-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full eco-gradient flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold">{user.fullName.charAt(0)}</span>
            </div>
            <span className="hidden sm:block text-sm font-medium text-foreground">{user.fullName.split(" ")[0]}</span>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {activeTab === "overview" && <OverviewTab user={user} onNavigate={switchTab} />}
          {activeTab === "recycling" && <RecyclingTab user={user} />}
          {activeTab === "wallet" && <WalletTab user={user} setUser={setUser} />}
          {activeTab === "profile" && <ProfileTab user={user} setUser={setUser} />}
          {activeTab === "settings" && <SettingsTab user={user} onLogout={handleLogout} />}
        </main>
      </div>
    </div>
  );
};

/* ─── Overview ─── */
const OverviewTab = ({ user, onNavigate }: { user: UserData; onNavigate: (t: Tab) => void }) => {
  const stats = [
    { icon: Wallet, label: "Wallet Balance", value: `₦${user.balance.toLocaleString()}`, color: "eco-gradient", action: () => onNavigate("wallet") },
    { icon: Recycle, label: "Items Recycled", value: user.totalRecycled.toString(), color: "bg-accent", action: () => onNavigate("recycling") },
    { icon: TrendingUp, label: "Total Earned", value: `₦${user.history.reduce((s, h) => s + h.earned, 0).toLocaleString()}`, color: "bg-secondary", action: () => onNavigate("wallet") },
    { icon: History, label: "Transactions", value: user.history.length.toString(), color: "bg-primary/20", action: () => onNavigate("recycling") },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back, {user.fullName.split(" ")[0]} 👋</h1>
        <p className="text-muted-foreground text-sm">Here's your recycling summary</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <button key={i} onClick={s.action} className="bg-card rounded-2xl p-5 shadow-soft border border-border text-left hover:shadow-elevated transition-all group">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
              <s.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </button>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Recent Activity</h2>
          <button onClick={() => onNavigate("recycling")} className="text-sm text-primary hover:underline">View all</button>
        </div>
        {user.history.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-2">
            {user.history.slice(0, 5).map((h, i) => (
              <HistoryRow key={i} h={h} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Recycling ─── */
const RecyclingTab = ({ user }: { user: UserData }) => (
  <div className="max-w-5xl mx-auto space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Recycling History</h1>
      <p className="text-muted-foreground text-sm">All your recycling transactions</p>
    </div>

    <div className="grid sm:grid-cols-3 gap-4">
      <StatCard icon={Recycle} label="Total Items" value={user.totalRecycled.toString()} />
      <StatCard icon={TrendingUp} label="Total Earned" value={`₦${user.history.reduce((s, h) => s + h.earned, 0).toLocaleString()}`} />
      <StatCard icon={History} label="Sessions" value={user.history.length.toString()} />
    </div>

    <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
      <h2 className="font-semibold text-foreground mb-4">Transaction Log</h2>
      {user.history.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-2">
          {user.history.map((h, i) => (
            <HistoryRow key={i} h={h} />
          ))}
        </div>
      )}
    </div>
  </div>
);

/* ─── Wallet ─── */
const WalletTab = ({ user, setUser }: { user: UserData; setUser: (u: UserData) => void }) => {
  const { toast } = useToast();

  const handleWithdraw = () => {
    if (user.balance <= 0) {
      toast({ title: "Insufficient balance", description: "You need to recycle more to earn rewards.", variant: "destructive" });
      return;
    }
    toast({ title: "Coming Soon", description: "Withdrawal feature will be available once we launch fully." });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Wallet</h1>
        <p className="text-muted-foreground text-sm">Manage your earnings and withdrawals</p>
      </div>

      {/* Balance Card */}
      <div className="eco-gradient rounded-2xl p-6 md:p-8 text-primary-foreground">
        <p className="text-sm opacity-80">Available Balance</p>
        <p className="text-4xl font-bold mt-1">₦{user.balance.toLocaleString()}</p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Button onClick={handleWithdraw} className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-medium">
            <ArrowUpFromLine className="h-4 w-4 mr-1" /> Withdraw
          </Button>
          <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
            <CreditCard className="h-4 w-4 mr-1" /> Add Bank
          </Button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
        <h2 className="font-semibold text-foreground mb-4">Wallet Transactions</h2>
        {user.history.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-2">
            {user.history.map((h, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ArrowDownToLine className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Recycling Reward</p>
                    <p className="text-xs text-muted-foreground">{new Date(h.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className="font-semibold text-primary">+₦{h.earned}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Profile ─── */
const ProfileTab = ({ user, setUser }: { user: UserData; setUser: (u: UserData) => void }) => {
  const { toast } = useToast();

  const copyId = () => {
    navigator.clipboard.writeText(user.id);
    toast({ title: "Copied!", description: "Your EcoLoop ID has been copied." });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground text-sm">Your account information</p>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full eco-gradient flex items-center justify-center">
            <span className="text-primary-foreground text-2xl font-bold">{user.fullName.charAt(0)}</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{user.fullName}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="space-y-3">
          <ProfileField label="Full Name" value={user.fullName} />
          <ProfileField label="Email" value={user.email} />
          <ProfileField label="Phone" value={user.phone} />
          <ProfileField label="Location" value={user.location || "Not set"} />
          <ProfileField label="Member Since" value={new Date(user.joinedAt).toLocaleDateString()} />
          <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
            <div>
              <p className="text-xs text-muted-foreground">EcoLoop ID</p>
              <p className="text-sm font-medium text-foreground font-mono">{user.id}</p>
            </div>
            <button onClick={copyId} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
              <Copy className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, value }: { label: string; value: string }) => (
  <div className="p-3 rounded-xl bg-secondary/50">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-sm font-medium text-foreground">{value}</p>
  </div>
);

/* ─── Settings ─── */
const SettingsTab = ({ user, onLogout }: { user: UserData; onLogout: () => void }) => (
  <div className="max-w-2xl mx-auto space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      <p className="text-muted-foreground text-sm">Manage your account preferences</p>
    </div>

    <div className="bg-card rounded-2xl shadow-soft border border-border divide-y divide-border">
      <SettingsRow label="Notifications" desc="Manage notification preferences" />
      <SettingsRow label="Privacy" desc="Control your data and privacy" />
      <SettingsRow label="Help & Support" desc="Get help or contact support" />
      <SettingsRow label="Terms of Service" desc="Read our terms and conditions" />
    </div>

    <div className="bg-card rounded-2xl p-4 shadow-soft border border-border">
      <Button variant="destructive" className="w-full" onClick={onLogout}>
        <LogOut className="h-4 w-4 mr-1" /> Log Out
      </Button>
    </div>
  </div>
);

const SettingsRow = ({ label, desc }: { label: string; desc: string }) => (
  <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors text-left">
    <div>
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground">{desc}</p>
    </div>
    <ChevronRight className="h-4 w-4 text-muted-foreground" />
  </button>
);

/* ─── Shared ─── */
const StatCard = ({ icon: Icon, label, value }: { icon: typeof Recycle; label: string; value: string }) => (
  <div className="bg-card rounded-2xl p-5 shadow-soft border border-border">
    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="text-2xl font-bold text-foreground">{value}</p>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-10">
    <Recycle className="h-12 w-12 text-muted-foreground/20 mx-auto mb-3" />
    <p className="text-muted-foreground font-medium">No activity yet</p>
    <p className="text-sm text-muted-foreground">Visit an EcoLoop machine to start earning!</p>
  </div>
);

const HistoryRow = ({ h }: { h: { date: string; items: number; earned: number } }) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg eco-gradient flex items-center justify-center">
        <Recycle className="h-4 w-4 text-primary-foreground" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{h.items} items recycled</p>
        <p className="text-xs text-muted-foreground">{new Date(h.date).toLocaleDateString()}</p>
      </div>
    </div>
    <p className="font-semibold text-primary">+₦{h.earned}</p>
  </div>
);

export default Dashboard;
