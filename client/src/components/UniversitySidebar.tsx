import { Home, Search, Users, BarChart3, Settings, LogOut } from "lucide-react";
import { useState } from "react";

interface NavigationItem {
  icon: typeof Home;
  label: string;
  id: string;
}

const navigationItems: NavigationItem[] = [
  { icon: Home, label: "Home", id: "home" },
  { icon: Search, label: "Search", id: "search" },
  { icon: Users, label: "Users", id: "users" },
  { icon: BarChart3, label: "Analytics", id: "analytics" },
];

const bottomItems: NavigationItem[] = [
  { icon: Settings, label: "Settings", id: "settings" },
  { icon: LogOut, label: "Logout", id: "logout" },
];

export default function UniversitySidebar() {
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (id: string) => {
    setActiveItem(id);
    console.log(`Navigated to: ${id}`);
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-[280px] p-4">
      <div className="h-full bg-white dark:bg-card rounded-[24px] shadow-lg flex flex-col">
        {/* Top Section - University Branding */}
        <div className="pt-10 px-6 flex flex-col items-center">
          {/* University Logo - Letter A with green gradient */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center mb-4">
            <span className="text-white text-3xl font-bold">A</span>
          </div>
          <h1 className="text-foreground font-semibold text-lg">OAK University</h1>
        </div>

        {/* Middle Section - Navigation Icons */}
        <nav className="flex-1 flex flex-col items-center justify-center space-y-5 px-6">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                data-testid={`button-nav-${item.id}`}
                className={`relative group transition-transform duration-200 hover:scale-110 ${
                  isActive ? "" : ""
                }`}
                aria-label={item.label}
              >
                {/* Active state background circle */}
                {isActive && (
                  <div className="absolute inset-0 -m-3 bg-primary/10 rounded-full" />
                )}
                <Icon
                  className={`w-6 h-6 transition-colors duration-200 relative z-10 ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-primary"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Bottom Section - Settings & Logout */}
        <div className="pb-10 px-6 flex flex-col items-center space-y-5">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                data-testid={`button-${item.id}`}
                className={`relative group transition-transform duration-200 hover:scale-110`}
                aria-label={item.label}
              >
                {isActive && (
                  <div className="absolute inset-0 -m-3 bg-primary/10 rounded-full" />
                )}
                <Icon
                  className={`w-6 h-6 transition-colors duration-200 relative z-10 ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-primary"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
