import { Home, Calendar, FileText, Users, Calculator, Settings, LogOut, ChevronsRight } from "lucide-react";
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
  activeItem: string;
  onNavigate: (id: string) => void;
}

export default function UniversitySidebar({ isExpanded, onToggle, activeItem, onNavigate }: UniversitySidebarProps) {
  const handleItemClick = (id: string) => {
    onNavigate(id);
  };

  const iconColumnWidth = "w-12";
  const sidebarPadding = "px-4";

  return (
    <div 
      className={`fixed left-0 top-0 h-screen p-4 z-50 transition-[width] duration-300 ease-in-out ${
        isExpanded ? "w-[272px]" : "w-[112px]"
      }`}
    >
      <div className="h-full bg-white dark:bg-card rounded-[36px] shadow-lg flex flex-col overflow-hidden">
        {/* Top Section - University Branding */}
        <div className={`pt-4 flex flex-col mb-4 ${sidebarPadding}`}>
          {/* University Logo - Letter A with green gradient */}
          <div className={`${iconColumnWidth} h-12 flex items-center justify-center mb-2`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg font-bold">A</span>
            </div>
          </div>
          
          {/* Expand Button */}
          <button
            onClick={onToggle}
            data-testid="button-expand-sidebar"
            className="group h-12 grid grid-cols-[3rem_1fr] items-center hover:scale-105 transition-transform duration-200"
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            <div className="w-12 h-12 flex items-center justify-center">
              <ChevronsRight
                className={`w-6 h-6 transition-transform duration-300 text-muted-foreground group-hover:text-primary ${
                  isExpanded ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            <span 
              className={`text-sm font-medium whitespace-nowrap transition-all duration-300 overflow-hidden text-left text-muted-foreground group-hover:text-primary ${
                isExpanded 
                  ? "opacity-100" 
                  : "opacity-0 w-0"
              }`}
            >
              Recolher
            </span>
          </button>
        </div>

        {/* Middle Section - Navigation Icons */}
        <nav className={`flex-1 flex flex-col justify-center space-y-2 ${sidebarPadding}`}>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                data-testid={`button-nav-${item.id}`}
                className="relative group h-12 grid grid-cols-[3rem_1fr] items-center hover:scale-105 transition-transform duration-200"
                aria-label={item.label}
              >
                {/* Active state background */}
                {isActive && (
                  <div className={`absolute bg-primary/10 top-0 bottom-0 left-0 transition-all duration-300 ${
                    isExpanded ? "right-0 rounded-full" : "w-12 rounded-full"
                  }`} />
                )}
                {/* Icon container - fixed width column */}
                <div className="w-12 h-12 flex items-center justify-center relative z-10">
                  <Icon
                    className={`w-6 h-6 transition-colors duration-200 ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-primary"
                    }`}
                  />
                </div>
                {/* Label column - animates width */}
                <span 
                  className={`text-sm font-medium relative z-10 whitespace-nowrap transition-all duration-300 overflow-hidden text-left ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-primary"
                  } ${
                    isExpanded 
                      ? "opacity-100" 
                      : "opacity-0 w-0"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Section - Settings & Logout */}
        <div className={`pb-4 flex flex-col space-y-2 ${sidebarPadding}`}>
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                data-testid={`button-${item.id}`}
                className="relative group h-12 grid grid-cols-[3rem_1fr] items-center hover:scale-105 transition-transform duration-200"
                aria-label={item.label}
              >
                {/* Active state background */}
                {isActive && (
                  <div className={`absolute bg-primary/10 top-0 bottom-0 left-0 transition-all duration-300 ${
                    isExpanded ? "right-0 rounded-full" : "w-12 rounded-full"
                  }`} />
                )}
                {/* Icon container - fixed width column */}
                <div className="w-12 h-12 flex items-center justify-center relative z-10">
                  <Icon
                    className={`w-6 h-6 transition-colors duration-200 ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-primary"
                    }`}
                  />
                </div>
                {/* Label column - animates width */}
                <span 
                  className={`text-sm font-medium relative z-10 whitespace-nowrap transition-all duration-300 overflow-hidden text-left ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-primary"
                  } ${
                    isExpanded 
                      ? "opacity-100" 
                      : "opacity-0 w-0"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
