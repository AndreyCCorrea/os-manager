import { Home, Calendar, FileText, Users, Calculator, Settings, LogOut, Bell, ChevronRight } from "lucide-react";
import { useState } from "react";

interface NavigationItem {
  icon: typeof Home;
  label: string;
  id: string;
}

const navigationItems: NavigationItem[] = [
  { icon: Home, label: "Home", id: "home" },
  { icon: Calendar, label: "Calendar", id: "calendar" },
  { icon: FileText, label: "Document", id: "document" },
  { icon: Users, label: "Users", id: "users" },
  { icon: Calculator, label: "Calculator", id: "calculator" },
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
    <div className="fixed left-0 top-0 h-screen w-[160px] p-4">
      <div className="h-full bg-white dark:bg-card rounded-[36px] shadow-lg flex flex-col">
        {/* Top Section - University Branding */}
        <div className="pt-10 px-6 flex flex-col items-center mb-8">
          {/* University Logo - Letter A with green gradient */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center mb-6">
            <span className="text-white text-3xl font-bold">A</span>
          </div>
          
          {/* Notification and Expand Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveItem("notifications");
                console.log("Notifications clicked");
              }}
              data-testid="button-notifications"
              className="relative group transition-transform duration-200 hover:scale-110"
              aria-label="Notifications"
            >
              {activeItem === "notifications" && (
                <div className="absolute inset-0 -m-3 bg-primary/10 rounded-full" />
              )}
              <Bell
                className={`w-6 h-6 transition-colors duration-200 relative z-10 ${
                  activeItem === "notifications"
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-primary"
                }`}
              />
            </button>
            <button
              data-testid="button-expand-sidebar"
              className="group transition-transform duration-200 hover:scale-110"
              aria-label="Expand sidebar"
            >
              <ChevronRight
                className="w-5 h-5 transition-colors duration-200 text-muted-foreground group-hover:text-primary"
              />
            </button>
          </div>
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
