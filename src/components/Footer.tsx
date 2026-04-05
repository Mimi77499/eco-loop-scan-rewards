import logo from "@/assets/ecoloop-logo.png";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground py-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <img src={logo} alt="EcoLoop" width={32} height={32} className="brightness-200" />
          <span className="text-lg font-bold">EcoLoop</span>
        </div>
        <p className="text-sm opacity-70">© {new Date().getFullYear()} EcoLoop. Recycle. Earn. Repeat.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
