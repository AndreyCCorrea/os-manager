import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Pencil, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  Users
} from "lucide-react";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  personType: "fisica" | "juridica";
  status: "active" | "inactive" | "pending";
  avatarUrl?: string;
}

const mockClients: Client[] = [
  { id: "1", name: "Maria Silva Santos", email: "maria.silva@email.com", phone: "(11) 99999-1234", document: "123.456.789-00", personType: "fisica", status: "active" },
  { id: "2", name: "Tech Solutions Ltda", email: "contato@techsolutions.com", phone: "(11) 3333-4567", document: "12.345.678/0001-99", personType: "juridica", status: "active" },
  { id: "3", name: "Carlos Eduardo Ferreira", email: "carlos.ferreira@email.com", phone: "(21) 98765-4321", document: "987.654.321-00", personType: "fisica", status: "pending" },
  { id: "4", name: "Inovação Digital SA", email: "financeiro@inovacaodigital.com", phone: "(11) 2222-8899", document: "98.765.432/0001-11", personType: "juridica", status: "active" },
  { id: "5", name: "Ana Paula Oliveira", email: "ana.oliveira@email.com", phone: "(31) 97777-5566", document: "456.789.123-00", personType: "fisica", status: "inactive" },
  { id: "6", name: "Consulting Brasil ME", email: "contato@consultingbrasil.com", phone: "(11) 4444-7788", document: "45.678.901/0001-22", personType: "juridica", status: "pending" },
  { id: "7", name: "Roberto Carlos Mendes", email: "roberto.mendes@email.com", phone: "(41) 96666-3344", document: "789.012.345-00", personType: "fisica", status: "active" },
  { id: "8", name: "Digital Commerce Ltda", email: "vendas@digitalcommerce.com", phone: "(11) 5555-9900", document: "56.789.012/0001-33", personType: "juridica", status: "active" },
  { id: "9", name: "Fernanda Costa Lima", email: "fernanda.lima@email.com", phone: "(51) 95555-2233", document: "012.345.678-00", personType: "fisica", status: "active" },
  { id: "10", name: "StartUp Vision EIRELI", email: "hello@startupvision.io", phone: "(11) 6666-1122", document: "67.890.123/0001-44", personType: "juridica", status: "inactive" },
];

const ITEMS_PER_PAGE = 8;

export default function ClientsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const filteredClients = useMemo(() => {
    if (!searchQuery.trim()) return mockClients;
    const query = searchQuery.toLowerCase();
    return mockClients.filter(
      client =>
        client.name.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query) ||
        client.document.includes(query)
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE);
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedClients(new Set(paginatedClients.map(c => c.id)));
    } else {
      setSelectedClients(new Set());
    }
  };

  const handleSelectClient = (clientId: string, checked: boolean) => {
    const newSelected = new Set(selectedClients);
    if (checked) {
      newSelected.add(clientId);
    } else {
      newSelected.delete(clientId);
    }
    setSelectedClients(newSelected);
  };

  const allSelected = paginatedClients.length > 0 && paginatedClients.every(c => selectedClients.has(c.id));
  const someSelected = paginatedClients.some(c => selectedClients.has(c.id));

  const getInitials = (name: string) => {
    return name.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase();
  };

  const getPersonTypeBadge = (type: "fisica" | "juridica") => {
    if (type === "fisica") {
      return (
        <Badge 
          variant="outline" 
          className="bg-[#DBEAFE] text-[#1E40AF] border-transparent text-xs font-medium"
          data-testid={`badge-person-type-fisica`}
        >
          Pessoa Fisica
        </Badge>
      );
    }
    return (
      <Badge 
        variant="outline" 
        className="bg-[#D1FAE5] text-[#065F46] border-transparent text-xs font-medium"
        data-testid={`badge-person-type-juridica`}
      >
        Pessoa Juridica
      </Badge>
    );
  };

  return (
    <div className="pt-4 pb-4 pr-4 h-full">
      <div className="h-full bg-white/90 backdrop-blur-sm rounded-[36px] shadow-lg p-6 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 
            className="text-2xl font-semibold text-[#1F2937] tracking-tight"
            data-testid="text-page-title"
          >
            Clientes
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Gerencie sua base de clientes
          </p>
        </div>
        <Button 
          className="bg-[#10B981] text-white gap-2"
          data-testid="button-new-client"
        >
          <Plus className="w-4 h-4" />
          Novo Cliente
        </Button>
      </div>

      {/* Selection Bar */}
      {selectedClients.size > 0 && (
        <div 
          className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-3 mb-4 flex items-center justify-between gap-4"
          data-testid="selection-bar"
        >
          <span className="text-sm text-[#1E40AF] font-medium">
            {selectedClients.size} {selectedClients.size === 1 ? "cliente selecionado" : "clientes selecionados"}
          </span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-[#6B7280] gap-1" data-testid="button-bulk-edit">
              <Pencil className="w-4 h-4" />
              Editar
            </Button>
            <Button variant="ghost" size="sm" className="text-[#DC2626] gap-1" data-testid="button-bulk-delete">
              <Trash2 className="w-4 h-4" />
              Excluir
            </Button>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
          <input
            type="search"
            placeholder="Buscar por nome, email ou documento..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full h-10 pl-10 pr-4 bg-white border border-[#D1D5DB] rounded-md text-sm text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all"
            data-testid="input-search"
          />
        </div>
        <Button 
          variant="outline" 
          className="gap-2 border-[#D1D5DB] text-[#374151] bg-white"
          data-testid="button-filter"
        >
          <Filter className="w-4 h-4" />
          Filtros
        </Button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
          <div className="grid grid-cols-[48px_1fr_1fr_180px_140px_60px] items-center h-11 px-4">
            <div className="flex items-center justify-center">
              <Checkbox
                checked={allSelected}
                onCheckedChange={handleSelectAll}
                className="border-[#D1D5DB] data-[state=checked]:bg-[#10B981] data-[state=checked]:border-[#10B981]"
                data-testid="checkbox-select-all"
              />
            </div>
            <div className="text-xs font-medium text-[#6B7280] uppercase tracking-wider">
              Cliente
            </div>
            <div className="text-xs font-medium text-[#6B7280] uppercase tracking-wider">
              Contato
            </div>
            <div className="text-xs font-medium text-[#6B7280] uppercase tracking-wider">
              Documento
            </div>
            <div className="text-xs font-medium text-[#6B7280] uppercase tracking-wider">
              Tipo
            </div>
            <div></div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-[#F1F3F5]">
          {paginatedClients.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="w-12 h-12 rounded-full bg-[#F1F3F5] flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[#D1D5DB]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1F2937] mb-1" data-testid="text-empty-title">
                Nenhum cliente encontrado
              </h3>
              <p className="text-sm text-[#6B7280] text-center max-w-sm">
                {searchQuery 
                  ? "Tente ajustar os termos da busca ou limpar os filtros."
                  : "Comece adicionando seu primeiro cliente."}
              </p>
            </div>
          ) : (
            paginatedClients.map((client) => {
              const isSelected = selectedClients.has(client.id);
              return (
                <div
                  key={client.id}
                  className={`grid grid-cols-[48px_1fr_1fr_180px_140px_60px] items-center h-16 px-4 transition-colors ${
                    isSelected 
                      ? "bg-[#EFF6FF] border-l-2 border-l-[#3B82F6]" 
                      : "bg-white hover:bg-[#F9FAFB]"
                  }`}
                  data-testid={`row-client-${client.id}`}
                >
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => handleSelectClient(client.id, checked as boolean)}
                      className="border-[#D1D5DB] data-[state=checked]:bg-[#10B981] data-[state=checked]:border-[#10B981]"
                      data-testid={`checkbox-client-${client.id}`}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                      {client.avatarUrl ? (
                        <AvatarImage src={client.avatarUrl} alt={client.name} />
                      ) : null}
                      <AvatarFallback className="bg-[#E5E7EB] text-[#6B7280] text-sm font-medium">
                        {getInitials(client.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span 
                      className="text-[15px] font-medium text-[#1F2937]"
                      data-testid={`text-client-name-${client.id}`}
                    >
                      {client.name}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span 
                      className="text-sm text-[#4B5563]"
                      data-testid={`text-client-email-${client.id}`}
                    >
                      {client.email}
                    </span>
                    <span 
                      className="text-xs text-[#9CA3AF]"
                      data-testid={`text-client-phone-${client.id}`}
                    >
                      {client.phone}
                    </span>
                  </div>
                  <div 
                    className="text-sm text-[#4B5563]"
                    data-testid={`text-client-document-${client.id}`}
                  >
                    {client.document}
                  </div>
                  <div>
                    {getPersonTypeBadge(client.personType)}
                  </div>
                  <div className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="w-8 h-8 text-[#6B7280]"
                          data-testid={`button-actions-${client.id}`}
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent 
                        align="end" 
                        className="w-44 bg-white border border-[#E5E7EB] shadow-lg rounded-lg p-1"
                      >
                        <DropdownMenuItem 
                          className="gap-2 text-sm text-[#374151] cursor-pointer rounded"
                          data-testid={`menu-view-${client.id}`}
                        >
                          <Eye className="w-4 h-4" />
                          Ver detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="gap-2 text-sm text-[#374151] cursor-pointer rounded"
                          data-testid={`menu-edit-${client.id}`}
                        >
                          <Pencil className="w-4 h-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-[#E5E7EB] my-1" />
                        <DropdownMenuItem 
                          className="gap-2 text-sm text-[#DC2626] cursor-pointer rounded focus:text-[#DC2626]"
                          data-testid={`menu-delete-${client.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {filteredClients.length > ITEMS_PER_PAGE && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#E5E7EB] bg-white">
            <span className="text-sm text-[#6B7280]">
              Mostrando {((currentPage - 1) * ITEMS_PER_PAGE) + 1} a {Math.min(currentPage * ITEMS_PER_PAGE, filteredClients.length)} de {filteredClients.length} clientes
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-9 h-9 border-[#E5E7EB] bg-white disabled:opacity-40"
                data-testid="button-prev-page"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 ${
                    page === currentPage 
                      ? "bg-[#10B981] text-white border-[#10B981]" 
                      : "border-[#E5E7EB] bg-white text-[#374151]"
                  }`}
                  data-testid={`button-page-${page}`}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-9 h-9 border-[#E5E7EB] bg-white disabled:opacity-40"
                data-testid="button-next-page"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
