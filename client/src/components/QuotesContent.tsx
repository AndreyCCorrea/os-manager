import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  Filter,
  Printer,
  Download,
  MoreHorizontal,
  Circle,
  Clock,
  XCircle,
  CheckCircle,
  Check,
  Copy,
  Eye,
  Trash2,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type QuoteStatus = "aberto" | "emAnalise" | "cancelado" | "aprovado" | "concluido";

interface Quote {
  id: string;
  number: string;
  clientName: string;
  status: QuoteStatus;
  createdAt: string;
  createdTime: string;
  quoteDate: string;
  quoteTime: string;
  approvedAt?: string;
  approvedTime?: string;
  value: string;
}

const mockQuotes: Quote[] = [
  {
    id: "1",
    number: "ORC-2024-001",
    clientName: "Empresa ABC Ltda",
    status: "aberto",
    createdAt: "28/11/2024",
    createdTime: "09:30",
    quoteDate: "29/11/2024",
    quoteTime: "14:00",
    value: "R$ 15.750,00",
  },
  {
    id: "2",
    number: "ORC-2024-002",
    clientName: "Tech Solutions S.A.",
    status: "emAnalise",
    createdAt: "27/11/2024",
    createdTime: "14:15",
    quoteDate: "28/11/2024",
    quoteTime: "10:00",
    value: "R$ 32.400,00",
  },
  {
    id: "3",
    number: "ORC-2024-003",
    clientName: "Construtora Delta",
    status: "aprovado",
    createdAt: "25/11/2024",
    createdTime: "11:00",
    quoteDate: "26/11/2024",
    quoteTime: "09:00",
    approvedAt: "30/11/2024",
    approvedTime: "16:30",
    value: "R$ 87.200,00",
  },
  {
    id: "4",
    number: "ORC-2024-004",
    clientName: "Indústria Gama",
    status: "concluido",
    createdAt: "20/11/2024",
    createdTime: "16:45",
    quoteDate: "21/11/2024",
    quoteTime: "11:30",
    approvedAt: "25/11/2024",
    approvedTime: "14:00",
    value: "R$ 124.500,00",
  },
  {
    id: "5",
    number: "ORC-2024-005",
    clientName: "Comércio Beta",
    status: "cancelado",
    createdAt: "22/11/2024",
    createdTime: "10:20",
    quoteDate: "23/11/2024",
    quoteTime: "15:00",
    value: "R$ 8.900,00",
  },
  {
    id: "6",
    number: "ORC-2024-006",
    clientName: "Logistics Express",
    status: "aberto",
    createdAt: "01/12/2024",
    createdTime: "08:00",
    quoteDate: "02/12/2024",
    quoteTime: "09:00",
    value: "R$ 45.600,00",
  },
  {
    id: "7",
    number: "ORC-2024-007",
    clientName: "Farmácia Central",
    status: "emAnalise",
    createdAt: "30/11/2024",
    createdTime: "13:45",
    quoteDate: "01/12/2024",
    quoteTime: "10:30",
    value: "R$ 19.800,00",
  },
];

const statusConfig = {
  aberto: {
    label: "Aberto",
    icon: Circle,
    bgClass: "bg-[#DBEAFE] dark:bg-blue-900/30",
    textClass: "text-[#1E40AF] dark:text-blue-300",
    borderClass: "border-[#93C5FD] dark:border-blue-700",
  },
  emAnalise: {
    label: "Em Análise",
    icon: Clock,
    bgClass: "bg-[#FEF3C7] dark:bg-amber-900/30",
    textClass: "text-[#92400E] dark:text-amber-300",
    borderClass: "border-[#FDE68A] dark:border-amber-700",
  },
  cancelado: {
    label: "Cancelado",
    icon: XCircle,
    bgClass: "bg-[#F3F4F6] dark:bg-gray-800",
    textClass: "text-[#4B5563] dark:text-gray-400",
    borderClass: "border-[#D1D5DB] dark:border-gray-600",
  },
  aprovado: {
    label: "Aprovado",
    icon: CheckCircle,
    bgClass: "bg-[#D1FAE5] dark:bg-emerald-900/30",
    textClass: "text-[#065F46] dark:text-emerald-300",
    borderClass: "border-[#6EE7B7] dark:border-emerald-700",
  },
  concluido: {
    label: "Concluído",
    icon: Check,
    bgClass: "bg-[#E0E7FF] dark:bg-indigo-900/30",
    textClass: "text-[#3730A3] dark:text-indigo-300",
    borderClass: "border-[#A5B4FC] dark:border-indigo-700",
  },
};

function StatusBadge({ status }: { status: QuoteStatus }) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${config.bgClass} ${config.textClass} ${config.borderClass}`}
      data-testid={`badge-status-${status}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
}

function DateTimeCell({ date, time }: { date: string; time: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-sm font-medium text-[#1F2937] dark:text-gray-100">{date}</span>
      <span className="text-xs text-[#6B7280] dark:text-gray-400">{time}</span>
    </div>
  );
}

const PAGE_SIZE = 5;

export default function QuotesContent() {
  const [activeTab, setActiveTab] = useState<"pendentes" | "concluidos">("pendentes");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pendingStatuses: QuoteStatus[] = ["aberto", "emAnalise"];
  const completedStatuses: QuoteStatus[] = ["aprovado", "concluido", "cancelado"];

  const filteredQuotes = mockQuotes.filter((quote) => {
    const matchesTab =
      activeTab === "pendentes"
        ? pendingStatuses.includes(quote.status)
        : completedStatuses.includes(quote.status);

    const matchesSearch =
      searchQuery === "" ||
      quote.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.clientName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const totalPages = Math.ceil(filteredQuotes.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedQuotes = filteredQuotes.slice(startIndex, endIndex);

  const pendingCount = mockQuotes.filter((q) => pendingStatuses.includes(q.status)).length;
  const completedCount = mockQuotes.filter((q) => completedStatuses.includes(q.status)).length;

  const handleTabChange = (tab: "pendentes" | "concluidos") => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSelectedIds([]);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedQuotes.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedQuotes.map((q) => q.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    setSelectedIds([]);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-[#F8F9FA] dark:bg-background">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h1
                className="text-2xl font-semibold text-[#1F2937] dark:text-gray-100 tracking-tight"
                data-testid="text-page-title"
              >
                Orçamentos
              </h1>
              <p className="text-sm text-[#6B7280] dark:text-gray-400 mt-1">
                Gerencie seus orçamentos e acompanhe o status de aprovação
              </p>
            </div>
            <Button
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white gap-2"
              data-testid="button-new-quote"
            >
              <Plus className="w-4 h-4" />
              Novo Orçamento
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b-2 border-[#E5E7EB] dark:border-gray-700 mt-4">
            <button
              onClick={() => handleTabChange("pendentes")}
              data-testid="tab-pendentes"
              className={`relative h-11 px-4 text-sm font-medium transition-colors -mb-[2px] ${
                activeTab === "pendentes"
                  ? "text-[#3B82F6] border-b-2 border-[#3B82F6] bg-white dark:bg-card"
                  : "text-[#6B7280] dark:text-gray-400 hover:text-[#374151] dark:hover:text-gray-300"
              }`}
            >
              Pendentes
              <span
                className={`ml-2 px-2 py-0.5 text-xs font-semibold rounded-full ${
                  activeTab === "pendentes"
                    ? "bg-[#DBEAFE] text-[#1E40AF] dark:bg-blue-900/50 dark:text-blue-300"
                    : "bg-[#F3F4F6] text-[#6B7280] dark:bg-gray-700 dark:text-gray-400"
                }`}
              >
                {pendingCount}
              </span>
            </button>
            <button
              onClick={() => handleTabChange("concluidos")}
              data-testid="tab-concluidos"
              className={`relative h-11 px-4 text-sm font-medium transition-colors -mb-[2px] ${
                activeTab === "concluidos"
                  ? "text-[#3B82F6] border-b-2 border-[#3B82F6] bg-white dark:bg-card"
                  : "text-[#6B7280] dark:text-gray-400 hover:text-[#374151] dark:hover:text-gray-300"
              }`}
            >
              Concluídos
              <span
                className={`ml-2 px-2 py-0.5 text-xs font-semibold rounded-full ${
                  activeTab === "concluidos"
                    ? "bg-[#DBEAFE] text-[#1E40AF] dark:bg-blue-900/50 dark:text-blue-300"
                    : "bg-[#F3F4F6] text-[#6B7280] dark:bg-gray-700 dark:text-gray-400"
                }`}
              >
                {completedCount}
              </span>
            </button>
          </div>
        </div>

        {/* Selection Bar */}
        {selectedIds.length > 0 && (
          <div
            className="mb-4 p-4 bg-[#EFF6FF] dark:bg-blue-900/20 border border-[#BFDBFE] dark:border-blue-800 rounded-lg flex items-center justify-between gap-4 animate-in slide-in-from-top-2"
            data-testid="selection-bar"
          >
            <span className="text-sm font-medium text-[#1E40AF] dark:text-blue-300">
              {selectedIds.length} {selectedIds.length === 1 ? "item selecionado" : "itens selecionados"}
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="outline" size="sm" className="gap-2" data-testid="button-print-selected">
                <Printer className="w-4 h-4" />
                Imprimir
              </Button>
              <Button variant="outline" size="sm" className="gap-2" data-testid="button-export-selected">
                <Download className="w-4 h-4" />
                Exportar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 text-[#DC2626] border-[#FCA5A5] hover:bg-[#FEF2F2] dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20"
                data-testid="button-delete-selected"
              >
                <Trash2 className="w-4 h-4" />
                Deletar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSelection}
                className="text-[#6B7280]"
                data-testid="button-clear-selection"
              >
                Limpar seleção
              </Button>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
            <Input
              type="search"
              placeholder="Buscar por número ou cliente..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 h-10 bg-white dark:bg-card border-[#D1D5DB] dark:border-gray-600 focus:border-[#3B82F6] focus:ring-[#3B82F6]/10"
              data-testid="input-search"
            />
          </div>
          <Button variant="outline" className="gap-2 h-10" data-testid="button-filters">
            <Filter className="w-4 h-4" />
            Filtros
          </Button>
          <Button variant="outline" className="gap-2 h-10" data-testid="button-print">
            <Printer className="w-4 h-4" />
            Imprimir
          </Button>
          <Button variant="outline" className="gap-2 h-10" data-testid="button-export">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
        </div>

        {/* Table */}
        <Card className="border border-[#E5E7EB] dark:border-gray-700 shadow-sm">
          {paginatedQuotes.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-[#F1F3F5] dark:bg-gray-800 flex items-center justify-center">
                <FileText className="w-8 h-8 text-[#D1D5DB] dark:text-gray-500" />
              </div>
              <h3
                className="text-lg font-semibold text-[#1F2937] dark:text-gray-100 mb-2"
                data-testid="text-empty-title"
              >
                Nenhum orçamento encontrado
              </h3>
              <p className="text-sm text-[#6B7280] dark:text-gray-400 mb-6 max-w-sm">
                {searchQuery
                  ? "Tente ajustar sua busca ou filtros"
                  : "Comece criando seu primeiro orçamento"}
              </p>
              {!searchQuery && (
                <Button
                  className="bg-[#3B82F6] hover:bg-[#2563EB] text-white gap-2"
                  data-testid="button-empty-new-quote"
                >
                  <Plus className="w-4 h-4" />
                  Novo Orçamento
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              {/* Table Header */}
              <div className="bg-[#F9FAFB] dark:bg-muted/30 border-b border-[#E5E7EB] dark:border-gray-700 min-w-[900px]">
                <div className="grid grid-cols-[40px_1fr_1fr_140px_140px_140px_140px_48px] items-center h-12 px-5 gap-3">
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedIds.length === paginatedQuotes.length && paginatedQuotes.length > 0}
                      onCheckedChange={toggleSelectAll}
                      data-testid="checkbox-select-all"
                    />
                  </div>
                  <span className="text-xs font-medium text-[#6B7280] dark:text-gray-400 uppercase tracking-wider">
                    Nº / Cliente
                  </span>
                  <span className="text-xs font-medium text-[#6B7280] dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </span>
                  <span className="text-xs font-medium text-[#6B7280] dark:text-gray-400 uppercase tracking-wider">
                    Criado em
                  </span>
                  <span className="text-xs font-medium text-[#6B7280] dark:text-gray-400 uppercase tracking-wider">
                    Data Orçamento
                  </span>
                  <span className="text-xs font-medium text-[#6B7280] dark:text-gray-400 uppercase tracking-wider">
                    Aprovado em
                  </span>
                  <span className="text-xs font-medium text-[#6B7280] dark:text-gray-400 uppercase tracking-wider text-right">
                    Valor
                  </span>
                  <span></span>
                </div>
              </div>

              {/* Table Body */}
              <div className="min-w-[900px]">
                {paginatedQuotes.map((quote) => (
                  <div
                    key={quote.id}
                    className={`grid grid-cols-[40px_1fr_1fr_140px_140px_140px_140px_48px] items-center h-16 px-5 gap-3 border-b border-[#F1F3F5] dark:border-gray-800 last:border-b-0 transition-colors ${
                      selectedIds.includes(quote.id)
                        ? "bg-[#EFF6FF] dark:bg-blue-900/10"
                        : "bg-white dark:bg-card hover:bg-[#F9FAFB] dark:hover:bg-muted/20"
                    }`}
                    data-testid={`row-quote-${quote.id}`}
                  >
                    <div className="flex items-center justify-center">
                      <Checkbox
                        checked={selectedIds.includes(quote.id)}
                        onCheckedChange={() => toggleSelect(quote.id)}
                        data-testid={`checkbox-quote-${quote.id}`}
                      />
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span
                        className="text-sm font-semibold text-[#1F2937] dark:text-gray-100 truncate"
                        data-testid={`text-quote-number-${quote.id}`}
                      >
                        {quote.number}
                      </span>
                      <span
                        className="text-sm text-[#4B5563] dark:text-gray-400 truncate"
                        data-testid={`text-quote-client-${quote.id}`}
                      >
                        {quote.clientName}
                      </span>
                    </div>
                    <div>
                      <StatusBadge status={quote.status} />
                    </div>
                    <DateTimeCell date={quote.createdAt} time={quote.createdTime} />
                    <DateTimeCell date={quote.quoteDate} time={quote.quoteTime} />
                    <div>
                      {quote.approvedAt ? (
                        <DateTimeCell date={quote.approvedAt} time={quote.approvedTime!} />
                      ) : (
                        <span className="text-sm text-[#9CA3AF] dark:text-gray-500">-</span>
                      )}
                    </div>
                    <div className="text-right">
                      <span
                        className="text-sm font-medium text-[#1F2937] dark:text-gray-100"
                        data-testid={`text-quote-value-${quote.id}`}
                      >
                        {quote.value}
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-[#6B7280] hover:text-[#374151]"
                            data-testid={`button-actions-${quote.id}`}
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            className="gap-2 cursor-pointer"
                            data-testid={`menu-view-${quote.id}`}
                          >
                            <Eye className="w-4 h-4" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="gap-2 cursor-pointer"
                            data-testid={`menu-duplicate-${quote.id}`}
                          >
                            <Copy className="w-4 h-4" />
                            Duplicar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="gap-2 cursor-pointer"
                            data-testid={`menu-print-${quote.id}`}
                          >
                            <Printer className="w-4 h-4" />
                            Imprimir
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="gap-2 cursor-pointer"
                            data-testid={`menu-export-${quote.id}`}
                          >
                            <Download className="w-4 h-4" />
                            Exportar PDF
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="gap-2 cursor-pointer text-[#DC2626] focus:text-[#DC2626] focus:bg-[#FEF2F2] dark:text-red-400 dark:focus:bg-red-900/20"
                            data-testid={`menu-delete-${quote.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                            Deletar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Pagination */}
        {filteredQuotes.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-4 mt-4 px-1">
            <span className="text-sm text-[#6B7280] dark:text-gray-400">
              Mostrando {Math.min(endIndex, filteredQuotes.length)} de {filteredQuotes.length} orçamentos
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                disabled={currentPage === 1}
                onClick={goToPrevPage}
                data-testid="button-prev-page"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(page)}
                  className={`h-9 min-w-9 ${
                    page === currentPage
                      ? "bg-[#3B82F6] text-white border-[#3B82F6] hover:bg-[#2563EB] hover:border-[#2563EB]"
                      : ""
                  }`}
                  data-testid={`button-page-${page}`}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                disabled={currentPage === totalPages}
                onClick={goToNextPage}
                data-testid="button-next-page"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
