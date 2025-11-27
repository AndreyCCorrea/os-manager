import { useState } from "react";
import UniversitySidebar from "@/components/UniversitySidebar";
import DashboardContent from "@/components/DashboardContent";

export default function Dashboard() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 dark:from-teal-950/20 dark:via-cyan-950/20 dark:to-emerald-950/20">
      <UniversitySidebar isExpanded={isSidebarExpanded} onToggle={toggleSidebar} />
      <main 
        className={`min-h-screen transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? "ml-[280px]" : "ml-[160px]"
        }`}
      >
        <DashboardContent />
      </main>
    </div>
  );
}
