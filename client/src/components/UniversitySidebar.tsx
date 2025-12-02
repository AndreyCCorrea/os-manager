import { Home, Calendar, FileText, Users, Calculator, Settings, LogOut, ChevronsRight } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleItemClick = (id: string) => {
    if (id === "logout") {
      setShowLogoutModal(true);
    } else {
      onNavigate(id);
    }
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    onNavigate("logout");
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const iconColumnWidth = "w-12";
  const sidebarPadding = "px-4";

  return (
    <>
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
              const isLogout = item.id === "logout";
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  data-testid={`button-${item.id}`}
                  className="relative group h-12 grid grid-cols-[3rem_1fr] items-center hover:scale-105 transition-transform duration-200"
                  aria-label={item.label}
                >
                  {/* Active state background */}
                  {isActive && !isLogout && (
                    <div className={`absolute bg-primary/10 top-0 bottom-0 left-0 transition-all duration-300 ${
                      isExpanded ? "right-0 rounded-full" : "w-12 rounded-full"
                    }`} />
                  )}
                  {/* Red background for logout when active */}
                  {isActive && isLogout && (
                    <div className={`absolute bg-red-500/10 top-0 bottom-0 left-0 transition-all duration-300 ${
                      isExpanded ? "right-0 rounded-full" : "w-12 rounded-full"
                    }`} />
                  )}
                  {/* Icon container - fixed width column */}
                  <div className="w-12 h-12 flex items-center justify-center relative z-10">
                    <Icon
                      className={`w-6 h-6 transition-colors duration-200 ${
                        isLogout
                          ? "text-red-500 group-hover:text-red-600"
                          : isActive
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-primary"
                      }`}
                    />
                  </div>
                  {/* Label column - animates width */}
                  <span 
                    className={`text-sm font-medium relative z-10 whitespace-nowrap transition-all duration-300 overflow-hidden text-left ${
                      isLogout
                        ? "text-red-500 group-hover:text-red-600"
                        : isActive
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

      {/* Logout Confirmation Modal */}
      <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
        <DialogContent 
          className="sm:max-w-[400px] bg-white dark:bg-card rounded-[36px] border-0 shadow-xl p-0 overflow-hidden"
          hideCloseButton
          data-testid="modal-logout"
        >
          <div className="p-6">
            {/* Header with icon */}
            <DialogHeader className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
                <LogOut className="w-8 h-8 text-red-500" />
              </div>
              <DialogTitle className="text-xl font-semibold text-foreground">
                Sair da conta
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-center">
                Tem certeza que deseja sair? Você precisará fazer login novamente para acessar sua conta.
              </DialogDescription>
            </DialogHeader>

            {/* Footer with buttons */}
            <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button
                variant="outline"
                onClick={handleLogoutCancel}
                className="flex-1 h-11 rounded-full border-gray-200 dark:border-gray-700"
                data-testid="button-cancel-logout"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleLogoutConfirm}
                className="flex-1 h-11 rounded-full bg-red-500 hover:bg-red-600 text-white border-0"
                data-testid="button-confirm-logout"
              >
                Sair
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
