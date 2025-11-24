import { Card } from "@/components/ui/card";

export default function DashboardContent() {
  return (
    <div className="p-8 space-y-6">
      {/* Orders Section */}
      <div className="h-80 p-3 bg-rose-100 dark:bg-rose-900/30 rounded-[40px] inline-flex justify-start items-end gap-3 overflow-auto w-full">
        {/* Ordens Abertas */}
        <div className="w-52 p-3 bg-stone-400 dark:bg-stone-600 rounded-3xl inline-flex flex-col justify-center items-start gap-10 flex-shrink-0">
          <div className="inline-flex justify-start items-center gap-1">
            <div className="w-5 h-5 relative">
              <div className="w-4 h-3 left-[1.99px] top-[4.17px] absolute border border-black" />
              <div className="w-[5px] h-[5px] left-[7.50px] top-[7.50px] absolute border border-black" />
            </div>
            <div className="text-black dark:text-white text-sm font-normal" data-testid="text-orders-open">Ordens Abertas</div>
          </div>
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="text-black dark:text-white text-2xl font-semibold" data-testid="text-orders-open-count">1200</div>
            <div className="w-8 h-8 relative bg-white rounded-2xl flex items-center justify-center">
              <div className="w-3 h-2 bg-black transform rotate-45" />
            </div>
          </div>
        </div>

        {/* Ordens Em Execução */}
        <div className="w-52 p-3 bg-stone-400 dark:bg-stone-600 rounded-3xl inline-flex flex-col justify-center items-start gap-10 flex-shrink-0">
          <div className="inline-flex justify-start items-center gap-1">
            <div className="w-5 h-5 relative">
              <div className="w-3.5 h-3.5 left-[2.50px] top-[2.50px] absolute border border-black" />
              <div className="w-[2.50px] h-1.5 left-[10px] top-[5.83px] absolute border border-black" />
            </div>
            <div className="text-black dark:text-white text-sm font-normal" data-testid="text-orders-execution">Ordens Em Execução</div>
          </div>
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="text-black dark:text-white text-2xl font-semibold" data-testid="text-orders-execution-count">980</div>
            <div className="w-8 h-8 relative bg-white rounded-2xl flex items-center justify-center">
              <div className="w-3 h-2 bg-black transform rotate-45" />
            </div>
          </div>
        </div>

        {/* Ordens Finalizadas */}
        <div className="w-52 p-3 bg-stone-400 dark:bg-stone-600 rounded-3xl inline-flex flex-col justify-center items-start gap-10 flex-shrink-0">
          <div className="inline-flex justify-start items-center gap-1">
            <div className="w-5 h-5 relative">
              <div className="w-4 h-3 left-[1.66px] top-[3.89px] absolute bg-black" />
            </div>
            <div className="text-black dark:text-white text-sm font-normal" data-testid="text-orders-finished">Ordens Finalizadas</div>
          </div>
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="text-black dark:text-white text-2xl font-semibold" data-testid="text-orders-finished-count">730</div>
            <div className="w-8 h-8 relative bg-white rounded-2xl flex items-center justify-center">
              <div className="w-3 h-2 bg-black transform rotate-45" />
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
