import { Card } from "@/components/ui/card";
import { ClipboardList, Zap, CheckCircle2, TrendingUp } from "lucide-react";

export default function DashboardContent() {
  return (
    <div className="p-4 space-y-6">
      {/* Orders Section */}
      <div className="h-80 p-6 bg-rose-100 dark:bg-rose-900/30 rounded-[40px] inline-flex justify-start items-end gap-6 overflow-auto w-[calc(100vw-160px-32px)]">
        {/* Ordens Abertas */}
        <div className="w-52 p-6 bg-stone-400 dark:bg-stone-600 rounded-3xl inline-flex flex-col justify-center items-start gap-10 flex-shrink-0">
          <div className="inline-flex justify-start items-center gap-2">
            <ClipboardList className="w-5 h-5 text-black" />
            <div className="text-black dark:text-white text-sm font-normal" data-testid="text-orders-open">Ordens Abertas</div>
          </div>
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="text-black dark:text-white text-2xl font-semibold" data-testid="text-orders-open-count">1200</div>
            <div className="w-8 h-8 relative bg-white rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-black" />
            </div>
          </div>
        </div>

        {/* Ordens Em Execução */}
        <div className="w-52 p-6 bg-stone-400 dark:bg-stone-600 rounded-3xl inline-flex flex-col justify-center items-start gap-10 flex-shrink-0">
          <div className="inline-flex justify-start items-center gap-2">
            <Zap className="w-5 h-5 text-black" />
            <div className="text-black dark:text-white text-sm font-normal" data-testid="text-orders-execution">Ordens Em Execução</div>
          </div>
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="text-black dark:text-white text-2xl font-semibold" data-testid="text-orders-execution-count">980</div>
            <div className="w-8 h-8 relative bg-white rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-black" />
            </div>
          </div>
        </div>

        {/* Ordens Finalizadas */}
        <div className="w-52 p-6 bg-stone-400 dark:bg-stone-600 rounded-3xl inline-flex flex-col justify-center items-start gap-10 flex-shrink-0">
          <div className="inline-flex justify-start items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-black" />
            <div className="text-black dark:text-white text-sm font-normal" data-testid="text-orders-finished">Ordens Finalizadas</div>
          </div>
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="text-black dark:text-white text-2xl font-semibold" data-testid="text-orders-finished-count">730</div>
            <div className="w-8 h-8 relative bg-white rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
        <Card className="p-6">
          <div className="space-y-4">
            {[
              { action: "New student enrollment", department: "Computer Science", time: "2 hours ago" },
              { action: "Course updated", department: "Mathematics", time: "5 hours ago" },
              { action: "Faculty meeting scheduled", department: "Engineering", time: "1 day ago" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.department}</p>
                </div>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
