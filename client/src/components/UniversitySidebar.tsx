import { Home, Calendar, FileText, Users, Calculator, Settings, LogOut, Bell, ChevronsRight } from "lucide-react";
import { useState } from "react";

interface NavigationItem {
  icon: typeof Home;
  label: string;
  id: string;
}

const navigationItems: NavigationItem[] = [
  { icon: Home, label: "Home", id: "home" },
  { icon: Calendar, label: "Agenda", id: "calendar" },
  { icon: FileText, label: "Documentos", id: "document" },
  { icon: Users, label: "Usuários", id: "users" },
  { icon: Calculator, label: "Calculadora", id: "calculator" },
];

const bottomItems: NavigationItem[] = [
  { icon: Settings, label: "Configurações", id: "settings" },
  { icon: LogOut, label: "Sair", id: "logout" },
];

interface UniversitySidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export default function UniversitySidebar({ isExpanded, onToggle }: UniversitySidebarProps) {
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (id: string) => {
    setActiveItem(id);
    console.log(`Navigated to: ${id}`);
  };

  return (
    <div 
      className={`fixed left-0 top-0 h-screen p-4 z-50 transition-all duration-300 ease-in-out ${
        isExpanded ? "w-[280px]" : "w-[160px]"
      }`}
    >
      <div className="h-full bg-white dark:bg-card rounded-[36px] shadow-lg flex flex-col overflow-hidden">
        {/* Top Section - University Branding */}
        <div className="pt-10 px-6 flex flex-col items-center mb-8">
          {/* University Logo - Letter A with green gradient */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center mb-6 flex-shrink-0">
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
              onClick={onToggle}
              data-testid="button-expand-sidebar"
              className="group transition-transform duration-200 hover:scale-110"
              aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              <ChevronsRight
                className={`w-6 h-6 transition-all duration-300 text-muted-foreground group-hover:text-primary ${
                  isExpanded ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Middle Section - Navigation Icons */}
        <nav className="flex-1 flex flex-col justify-center space-y-5">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <div key={item.id} className="flex justify-center px-6">
                <button
                  onClick={() => handleItemClick(item.id)}
                  data-testid={`button-nav-${item.id}`}
                  className={`relative group transition-all duration-300 hover:scale-105 flex items-center ${
                    isExpanded ? "w-full px-4 py-2 justify-start" : "w-12 h-12 justify-center"
                  }`}
                  aria-label={item.label}
                >
                  {/* Active state background */}
                  {isActive && (
                    <div className={`absolute bg-primary/10 transition-all duration-300 ${
                      isExpanded ? "inset-0 rounded-xl" : "inset-0 rounded-full"
                    }`} />
                  )}
                  <Icon
                    className={`w-6 h-6 transition-colors duration-200 relative z-10 flex-shrink-0 ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-primary"
                    }`}
                  />
                  {/* Label with animation */}
                  <span 
                    className={`text-sm font-medium relative z-10 whitespace-nowrap transition-all duration-300 overflow-hidden ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-primary"
                    } ${
                      isExpanded 
                        ? "opacity-100 ml-3 max-w-[150px]" 
                        : "opacity-0 ml-0 max-w-0"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              </div>
            );
          })}
        </nav>

        {/* Bottom Section - Settings & Logout */}
        <div className="pb-10 flex flex-col space-y-5">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <div key={item.id} className="flex justify-center px-6">
                <button
                  onClick={() => handleItemClick(item.id)}
                  data-testid={`button-${item.id}`}
                  className={`relative group transition-all duration-300 hover:scale-105 flex items-center ${
                    isExpanded ? "w-full px-4 py-2 justify-start" : "w-12 h-12 justify-center"
                  }`}
                  aria-label={item.label}
                >
                  {isActive && (
                    <div className={`absolute bg-primary/10 transition-all duration-300 ${
                      isExpanded ? "inset-0 rounded-xl" : "inset-0 rounded-full"
                    }`} />
                  )}
                  <Icon
                    className={`w-6 h-6 transition-colors duration-200 relative z-10 flex-shrink-0 ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-primary"
                    }`}
                  />
                  {/* Label with animation */}
                  <span 
                    className={`text-sm font-medium relative z-10 whitespace-nowrap transition-all duration-300 overflow-hidden ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-primary"
                    } ${
                      isExpanded 
                        ? "opacity-100 ml-3 max-w-[150px]" 
                        : "opacity-0 ml-0 max-w-0"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
