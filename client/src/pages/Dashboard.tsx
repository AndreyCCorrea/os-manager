import { useState } from "react";
import UniversitySidebar from "@/components/UniversitySidebar";
import DashboardContent from "@/components/DashboardContent";
import ClientsContent from "@/components/ClientsContent";
import ServiceOrdersContent from "@/components/ServiceOrdersContent";
import QuotesContent from "@/components/QuotesContent";

export default function Dashboard() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [activeView, setActiveView] = useState("home");

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const handleNavigate = (id: string) => {
    setActiveView(id);
  };

  const renderContent = () => {
    switch (activeView) {
      case "users":
        return <ClientsContent />;
      case "document":
        return <ServiceOrdersContent />;
      case "calculator":
        return <QuotesContent />;
      case "home":
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 dark:from-teal-950/20 dark:via-cyan-950/20 dark:to-emerald-950/20">
      <UniversitySidebar 
        isExpanded={isSidebarExpanded} 
        onToggle={toggleSidebar}
        activeItem={activeView}
        onNavigate={handleNavigate}
      />
      <main 
        className={`min-h-screen transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? "ml-[272px]" : "ml-[112px]"
        }`}
      >
        {renderContent()}
      </main>
    </div>
  );
}
