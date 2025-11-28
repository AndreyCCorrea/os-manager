import { useState, useMemo } from "react";
import { 
  Search, 
  Plus, 
  Filter, 
  Printer, 
  MoreHorizontal, 
  Clock, 
  AlertCircle, 
  Check, 
  Eye, 
  Edit2, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  FileText,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ServiceStatus = "emAberto" | "emProgresso" | "finalizado" | "atrasado" | "cancelado";
type TimeStatus = "noPrazo" | "proximoDoPrazo" | "atrasado";

interface ServiceOrder {
  id: string;
  orderNumber: string;
  clientName: string;
  serviceDescription: string;
  technicianName: string;
  createdDate: string;
  createdTime: string;
  dueDate: string;
  dueTime: string;
  status: ServiceStatus;
  daysRemaining: number;
}

const mockOrders: ServiceOrder[] = [
  {
    id: "1",
    orderNumber: "#00225",
    clientName: "Maria Silva Santos",
    serviceDescription: "Manutenção preventiva em ar condicionado split 12000 BTUs",
    technicianName: "João Pereira",
    createdDate: "25/11/2024",
    createdTime: "09:30",
    dueDate: "28/11/2024",
    dueTime: "18:00",
    status: "emAberto",
    daysRemaining: 3,
  },
  {
    id: "2",
    orderNumber: "#00224",
    clientName: "Carlos Eduardo Lima",
    serviceDescription: "Instalação de sistema de aquecimento solar residencial",
    technicianName: "Pedro Santos",
    createdDate: "24/11/2024",
    createdTime: "14:15",
    dueDate: "26/11/2024",
    dueTime: "17:00",
    status: "emProgresso",
    daysRemaining: 1,
  },
  {
    id: "3",
    orderNumber: "#00223",
    clientName: "Ana Beatriz Oliveira",
    serviceDescription: "Reparo em sistema de refrigeração comercial",
    technicianName: "Lucas Mendes",
    createdDate: "23/11/2024",
    createdTime: "10:00",
    dueDate: "25/11/2024",
    dueTime: "12:00",
    status: "atrasado",
    daysRemaining: -2,
  },
  {
    id: "4",
    orderNumber: "#00222",
    clientName: "Roberto Ferreira Costa",
    serviceDescription: "Limpeza e higienização de dutos de ar condicionado",
    technicianName: "João Pereira",
    createdDate: "22/11/2024",
    createdTime: "08:45",
    dueDate: "24/11/2024",
    dueTime: "16:00",
    status: "finalizado",
    daysRemaining: 0,
  },
  {
    id: "5",
    orderNumber: "#00221",
    clientName: "Fernanda Almeida",
    serviceDescription: "Troca de compressor em refrigerador industrial",
    technicianName: "Pedro Santos",
    createdDate: "21/11/2024",
    createdTime: "11:30",
    dueDate: "23/11/2024",
    dueTime: "15:00",
    status: "finalizado",
    daysRemaining: 0,
  },
  {
    id: "6",
    orderNumber: "#00220",
    clientName: "Marcos Vinícius",
    serviceDescription: "Instalação de ar condicionado multi-split em escritório",
    technicianName: "Lucas Mendes",
    createdDate: "20/11/2024",
    createdTime: "09:00",
    dueDate: "27/11/2024",
    dueTime: "18:00",
    status: "emProgresso",
    daysRemaining: 2,
  },
  {
    id: "7",
    orderNumber: "#00219",
    clientName: "Patricia Souza",
    serviceDescription: "Manutenção corretiva em câmara frigorífica",
    technicianName: "João Pereira",
    createdDate: "19/11/2024",
    createdTime: "16:00",
    dueDate: "21/11/2024",
    dueTime: "12:00",
    status: "cancelado",
    daysRemaining: 0,
  },
  {
    id: "8",
    orderNumber: "#00218",
    clientName: "Ricardo Gomes",
    serviceDescription: "Recarga de gás refrigerante R-410A",
    technicianName: "Pedro Santos",
    createdDate: "18/11/2024",
    createdTime: "13:45",
    dueDate: "29/11/2024",
    dueTime: "17:00",
    status: "emAberto",
    daysRemaining: 4,
  },
];

const statusConfig: Record<ServiceStatus, { label: string; className: string }> = {
  emAberto: {
    label: "Em Aberto",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  },
  emProgresso: {
    label: "Em Progresso",
    className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  },
  finalizado: {
    label: "Finalizado",
    className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  },
  atrasado: {
    label: "Atrasado",
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  },
  cancelado: {
    label: "Cancelado",
    className: "bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400",
  },
};

function getTimeStatus(daysRemaining: number, status: ServiceStatus): TimeStatus {
  if (status === "finalizado" || status === "cancelado") return "noPrazo";
  if (daysRemaining < 0) return "atrasado";
  if (daysRemaining <= 3) return "proximoDoPrazo";
  return "noPrazo";
}

const timeStatusConfig: Record<TimeStatus, { className: string }> = {
  noPrazo: {
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  },
  proximoDoPrazo: {
    className: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  },
  atrasado: {
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  },
};

type TabType = "todas" | "emAberto" | "emProgresso" | "finalizado" | "atrasado";

const tabs: { id: TabType; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "emAberto", label: "Em Aberto" },
  { id: "emProgresso", label: "Em Progresso" },
  { id: "finalizado", label: "Finalizadas" },
  { id: "atrasado", label: "Atrasadas" },
];

function StatusBadge({ status, orderId }: { status: ServiceStatus; orderId: string }) {
  const config = statusConfig[status];
  return (
    <span
      data-testid={`badge-status-${orderId}`}
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap",
        config.className
      )}
    >
      {status === "finalizado" && <Check className="w-3 h-3" />}
      {status === "atrasado" && <AlertCircle className="w-3 h-3" />}
      {config.label}
    </span>
  );
}

function TimeBadge({ daysRemaining, status, orderId }: { daysRemaining: number; status: ServiceStatus; orderId: string }) {
  if (status === "finalizado" || status === "cancelado") return null;
  
  const timeStatus = getTimeStatus(daysRemaining, status);
  const config = timeStatusConfig[timeStatus];
  
  const label = daysRemaining < 0 
    ? `Atrasado há ${Math.abs(daysRemaining)} ${Math.abs(daysRemaining) === 1 ? 'dia' : 'dias'}`
    : daysRemaining === 0
    ? "Vence hoje"
    : `${daysRemaining} ${daysRemaining === 1 ? 'dia restante' : 'dias restantes'}`;

  return (
    <span
      data-testid={`badge-time-${orderId}`}
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap",
        config.className
      )}
    >
      {timeStatus === "atrasado" ? (
        <AlertCircle className="w-3 h-3" />
      ) : (
        <Clock className="w-3 h-3" />
      )}
      {label}
    </span>
  );
}

export default function ServiceOrdersContent() {
  const [activeTab, setActiveTab] = useState<TabType>("todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredOrders = useMemo(() => {
    let orders = [...mockOrders];
    
    if (activeTab !== "todas") {
      orders = orders.filter(order => order.status === activeTab);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      orders = orders.filter(
        order =>
          order.orderNumber.toLowerCase().includes(query) ||
          order.clientName.toLowerCase().includes(query) ||
          order.serviceDescription.toLowerCase().includes(query) ||
          order.technicianName.toLowerCase().includes(query)
      );
    }
    
    return orders;
  }, [activeTab, searchQuery]);

  const tabCounts = useMemo(() => {
    return {
      todas: mockOrders.length,
      emAberto: mockOrders.filter(o => o.status === "emAberto").length,
      emProgresso: mockOrders.filter(o => o.status === "emProgresso").length,
      finalizado: mockOrders.filter(o => o.status === "finalizado").length,
      atrasado: mockOrders.filter(o => o.status === "atrasado").length,
    };
  }, []);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredOrders, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(paginatedOrders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders(prev => [...prev, orderId]);
    } else {
      setSelectedOrders(prev => prev.filter(id => id !== orderId));
    }
  };

  const isAllSelected = paginatedOrders.length > 0 && paginatedOrders.every(order => selectedOrders.includes(order.id));
  const isSomeSelected = selectedOrders.length > 0;

  return (
    <div className="p-6 min-h-screen bg-muted/30">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 
              className="text-2xl font-semibold tracking-tight text-foreground"
              data-testid="text-page-title"
            >
              Ordens de Serviço
            </h1>
            <p className="text-sm mt-1 text-muted-foreground" data-testid="text-page-subtitle">
              Gerencie todas as ordens de serviço do sistema
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              className="gap-2"
              data-testid="button-filter"
            >
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              data-testid="button-print"
            >
              <Printer className="w-4 h-4" />
              Imprimir
            </Button>
            <Button
              className="gap-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white"
              data-testid="button-new-order"
            >
              <Plus className="w-4 h-4" />
              Nova Ordem
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => {
            setActiveTab(value as TabType);
            setCurrentPage(1);
          }}
          className="mt-6"
        >
          <TabsList className="h-auto p-0 bg-transparent border-b-2 border-border rounded-none w-full justify-start gap-1 overflow-x-auto">
            {tabs.map(tab => {
              const count = tabCounts[tab.id];
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  data-testid={`tab-${tab.id}`}
                  className={cn(
                    "px-4 h-11 rounded-none border-b-2 -mb-0.5 data-[state=active]:shadow-none gap-2",
                    "data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:font-semibold",
                    "data-[state=inactive]:border-transparent data-[state=inactive]:text-muted-foreground"
                  )}
                >
                  {tab.label}
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "px-2 py-0.5 text-xs font-semibold rounded-full",
                      activeTab === tab.id 
                        ? "bg-primary/10 text-primary" 
                        : "bg-muted text-muted-foreground"
                    )}
                    data-testid={`badge-count-${tab.id}`}
                  >
                    {count}
                  </Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>

      {/* Search and Filters */}
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por número, cliente, serviço..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            data-testid="input-search"
            className="pl-10"
          />
        </div>
        <div className="text-sm text-muted-foreground" data-testid="text-results-count">
          Mostrando {paginatedOrders.length} de {filteredOrders.length} ordens
        </div>
      </div>

      {/* Selection Bar */}
      {isSomeSelected && (
        <div
          className="mb-4 p-4 rounded-lg flex items-center justify-between gap-4 bg-amber-50 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800"
          data-testid="selection-bar"
        >
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-amber-800 dark:text-amber-300" data-testid="text-selection-count">
              {selectedOrders.length} {selectedOrders.length === 1 ? 'ordem selecionada' : 'ordens selecionadas'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedOrders([])}
              className="text-amber-800 dark:text-amber-300 gap-1"
              data-testid="button-clear-selection"
            >
              <X className="w-4 h-4" />
              Limpar seleção
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white"
              data-testid="button-batch-finish"
            >
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Finalizar em Lote
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive/10"
              data-testid="button-batch-delete"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Excluir
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      <Card className="shadow-sm" data-testid="table-container">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  data-testid="checkbox-select-all"
                />
              </TableHead>
              <TableHead className="uppercase text-xs tracking-wider" data-testid="header-order-number">
                Nº da Ordem
              </TableHead>
              <TableHead className="uppercase text-xs tracking-wider" data-testid="header-client">
                Cliente / Serviço
              </TableHead>
              <TableHead className="uppercase text-xs tracking-wider" data-testid="header-technician">
                Técnico
              </TableHead>
              <TableHead className="uppercase text-xs tracking-wider" data-testid="header-created">
                Criado em
              </TableHead>
              <TableHead className="uppercase text-xs tracking-wider" data-testid="header-due">
                Prazo
              </TableHead>
              <TableHead className="w-16 uppercase text-xs tracking-wider" data-testid="header-actions">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-12 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <FileText className="w-16 h-16 text-muted-foreground/50" />
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-foreground" data-testid="text-empty-title">
                        Nenhuma ordem encontrada
                      </h3>
                      <p className="text-sm text-muted-foreground" data-testid="text-empty-description">
                        {searchQuery 
                          ? "Tente ajustar sua busca ou filtros"
                          : "Crie sua primeira ordem de serviço"
                        }
                      </p>
                    </div>
                    {!searchQuery && (
                      <Button
                        className="gap-2 mt-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white"
                        data-testid="button-empty-new-order"
                      >
                        <Plus className="w-4 h-4" />
                        Nova Ordem
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedOrders.map((order) => {
                const isSelected = selectedOrders.includes(order.id);
                const isUrgent = order.status === "atrasado";
                
                return (
                  <TableRow
                    key={order.id}
                    data-testid={`row-order-${order.id}`}
                    className={cn(
                      "transition-colors",
                      isSelected && "bg-amber-50 dark:bg-amber-900/20",
                      isUrgent && "border-l-[3px] border-l-destructive"
                    )}
                  >
                    <TableCell>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) => handleSelectOrder(order.id, checked as boolean)}
                        data-testid={`checkbox-order-${order.id}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1.5">
                        <span 
                          className="text-sm font-semibold text-foreground"
                          data-testid={`text-order-number-${order.id}`}
                        >
                          {order.orderNumber}
                        </span>
                        <StatusBadge status={order.status} orderId={order.id} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span 
                          className="text-sm font-medium text-foreground"
                          data-testid={`text-client-${order.id}`}
                        >
                          {order.clientName}
                        </span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span 
                              className="text-sm line-clamp-1 cursor-help max-w-xs text-muted-foreground"
                              data-testid={`text-service-${order.id}`}
                            >
                              {order.serviceDescription}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="max-w-[250px]">
                            {order.serviceDescription}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span 
                        className="text-sm text-muted-foreground"
                        data-testid={`text-technician-${order.id}`}
                      >
                        {order.technicianName}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium text-foreground" data-testid={`text-created-date-${order.id}`}>
                          {order.createdDate}
                        </span>
                        <span className="text-xs text-muted-foreground" data-testid={`text-created-time-${order.id}`}>
                          {order.createdTime}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1.5">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-medium text-foreground" data-testid={`text-due-date-${order.id}`}>
                            {order.dueDate}
                          </span>
                          <span className="text-xs text-muted-foreground" data-testid={`text-due-time-${order.id}`}>
                            {order.dueTime}
                          </span>
                        </div>
                        <TimeBadge daysRemaining={order.daysRemaining} status={order.status} orderId={order.id} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            data-testid={`button-actions-${order.id}`}
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-[200px]">
                          <DropdownMenuItem 
                            className="gap-2.5 cursor-pointer"
                            data-testid={`action-view-${order.id}`}
                          >
                            <Eye className="w-4 h-4 text-muted-foreground" />
                            <span>Ver detalhes</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="gap-2.5 cursor-pointer"
                            data-testid={`action-edit-${order.id}`}
                          >
                            <Edit2 className="w-4 h-4 text-muted-foreground" />
                            <span>Editar ordem</span>
                          </DropdownMenuItem>
                          {order.status !== "finalizado" && order.status !== "cancelado" && (
                            <DropdownMenuItem 
                              className="gap-2.5 cursor-pointer"
                              data-testid={`action-finish-${order.id}`}
                            >
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              <span>Finalizar</span>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="gap-2.5 cursor-pointer text-destructive focus:text-destructive"
                            data-testid={`action-delete-${order.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Excluir ordem</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-5 py-4 flex items-center justify-between border-t border-border">
            <div className="text-sm text-muted-foreground" data-testid="text-pagination-info">
              Página {currentPage} de {totalPages}
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                data-testid="button-prev-page"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentPage(page)}
                  data-testid={`button-page-${page}`}
                  className={cn(
                    currentPage === page && "bg-orange-500 hover:bg-orange-600 text-white"
                  )}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                data-testid="button-next-page"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
