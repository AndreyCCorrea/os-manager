import UniversitySidebar from "@/components/UniversitySidebar";
import DashboardContent from "@/components/DashboardContent";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 dark:from-teal-950/20 dark:via-cyan-950/20 dark:to-emerald-950/20">
      <UniversitySidebar />
      <main className="ml-[160px] min-h-screen">
        <DashboardContent />
      </main>
    </div>
  );
}
