import { Card } from "@/components/ui/card";
import { ClipboardList, Zap, CheckCircle2, TrendingUp } from "lucide-react";

export default function DashboardContent() {
  return (
    <div className="pr-4 pt-4 pb-4 space-y-3 h-screen">
      {/* Orders Section */}
      <div className="h-80 p-6 bg-rose-100 dark:bg-rose-900/30 rounded-[40px] inline-flex justify-start items-end gap-3 overflow-auto w-full">
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
            <div className="text-black dark:text-white text-sm font-normal whitespace-nowrap" data-testid="text-orders-execution">Ordens Em Execução</div>
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
      {/* Services Section */}
      <div 
        className="inline-flex justify-end items-stretch gap-3 h-[calc(100vh-16px-16px-320px-12px)]"
        style={{ '--services-height': 'calc(100vh - 16px - 16px - 320px - 12px)' } as React.CSSProperties}
      >
        <div 
          className="grid grid-cols-2 grid-rows-2 gap-3"
          style={{ height: 'var(--services-height)', width: 'var(--services-height)' } as React.CSSProperties}
        >
          <div className="w-full h-full p-2.5 bg-red-100 rounded-[40px]" />
          <div className="w-full h-full p-2.5 bg-red-100 rounded-[40px]" />
          <div className="w-full h-full p-2.5 bg-red-100 rounded-[40px]" />
          <div className="w-full h-full p-2.5 bg-red-100 rounded-[40px]" />
        </div>
        <div className="flex-1 p-8 bg-red-100 rounded-[40px] inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden">
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="inline-flex flex-col justify-start items-start">
              <div className="justify-start text-black text-2xl font-semibold font-['Inter']">Próximos Serviços</div>
              <div className="justify-start text-black text-sm font-normal font-['Inter']">Agendamento dos próximos serviços</div>
            </div>
            <div className="p-3 bg-white rounded-3xl flex justify-center items-center gap-2.5">
              <div className="justify-start text-black text-sm font-normal font-['Inter']">Ver Todos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
