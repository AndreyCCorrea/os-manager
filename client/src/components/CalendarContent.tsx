import { useState, useMemo } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Search,
  RefreshCw,
  ChevronDown,
  Clock,
  MapPin,
  Users,
  Calendar as CalendarIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type EventCategory = 
  | "regular" 
  | "oneOnOne" 
  | "teamMeeting" 
  | "workSession" 
  | "social" 
  | "important" 
  | "presentation";

type ViewType = "month" | "week" | "day" | "list";

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  category: EventCategory;
  description?: string;
  location?: string;
}

const categoryConfig: Record<EventCategory, { 
  bgColor: string; 
  textColor: string; 
  borderColor: string; 
  label: string 
}> = {
  regular: { 
    bgColor: "#F3F4F6",
    textColor: "#374151",
    borderColor: "#9CA3AF",
    label: "Regular"
  },
  oneOnOne: { 
    bgColor: "#FEE2E2",
    textColor: "#991B1B",
    borderColor: "#DC2626",
    label: "One-on-One"
  },
  teamMeeting: { 
    bgColor: "#DBEAFE",
    textColor: "#1E40AF",
    borderColor: "#3B82F6",
    label: "Reuniao de Equipe"
  },
  workSession: { 
    bgColor: "#E0E7FF",
    textColor: "#3730A3",
    borderColor: "#6366F1",
    label: "Sessao de Trabalho"
  },
  social: { 
    bgColor: "#D1FAE5",
    textColor: "#065F46",
    borderColor: "#10B981",
    label: "Social"
  },
  important: { 
    bgColor: "#FEF3C7",
    textColor: "#92400E",
    borderColor: "#F59E0B",
    label: "Importante"
  },
  presentation: { 
    bgColor: "#FCE7F3",
    textColor: "#831843",
    borderColor: "#DB2777",
    label: "Apresentacao"
  },
};

const WEEKDAYS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

const initialEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Standup Diario",
    start: new Date(2024, 11, 16, 9, 0),
    end: new Date(2024, 11, 16, 9, 30),
    category: "regular",
    description: "Reuniao diaria da equipe",
    location: "Sala de Reunioes A"
  },
  {
    id: "2",
    title: "1:1 com Maria",
    start: new Date(2024, 11, 16, 14, 0),
    end: new Date(2024, 11, 16, 14, 30),
    category: "oneOnOne",
    description: "Conversa sobre progresso do projeto"
  },
  {
    id: "3",
    title: "Reuniao de Sprint",
    start: new Date(2024, 11, 18, 10, 0),
    end: new Date(2024, 11, 18, 11, 30),
    category: "teamMeeting",
    location: "Sala Principal"
  },
  {
    id: "4",
    title: "Sessao de Desenvolvimento",
    start: new Date(2024, 11, 19, 14, 0),
    end: new Date(2024, 11, 19, 17, 0),
    category: "workSession",
    description: "Foco no modulo de pagamentos"
  },
  {
    id: "5",
    title: "Almoco de Equipe",
    start: new Date(2024, 11, 20, 12, 0),
    end: new Date(2024, 11, 20, 13, 30),
    category: "social",
    location: "Restaurante Central"
  },
  {
    id: "6",
    title: "Deadline: Entrega MVP",
    start: new Date(2024, 11, 22, 18, 0),
    end: new Date(2024, 11, 22, 18, 0),
    category: "important"
  },
  {
    id: "7",
    title: "Demo para Cliente",
    start: new Date(2024, 11, 23, 15, 0),
    end: new Date(2024, 11, 23, 16, 30),
    category: "presentation",
    location: "Sala de Conferencias"
  },
  {
    id: "8",
    title: "Revisao de Codigo",
    start: new Date(2024, 11, 17, 11, 0),
    end: new Date(2024, 11, 17, 12, 0),
    category: "teamMeeting"
  },
  {
    id: "9",
    title: "Planejamento Mensal",
    start: new Date(2024, 11, 24, 9, 0),
    end: new Date(2024, 11, 24, 12, 0),
    category: "important",
    description: "Definir metas do proximo mes"
  }
];

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  const days: Array<{ date: Date; isCurrentMonth: boolean }> = [];
  
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevMonthYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();
  
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push({
      date: new Date(prevMonthYear, prevMonth, daysInPrevMonth - i),
      isCurrentMonth: false
    });
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      date: new Date(year, month, day),
      isCurrentMonth: true
    });
  }
  
  const remainingDays = 42 - days.length;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextMonthYear = month === 11 ? year + 1 : year;
  
  for (let day = 1; day <= remainingDays; day++) {
    days.push({
      date: new Date(nextMonthYear, nextMonth, day),
      isCurrentMonth: false
    });
  }
  
  return days;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export default function CalendarContent() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 15));
  const [viewType, setViewType] = useState<ViewType>("month");
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    category: "regular" as EventCategory,
    description: "",
    location: "",
    startTime: "09:00",
    endTime: "10:00"
  });

  const monthDays = useMemo(() => 
    getMonthDays(currentDate.getFullYear(), currentDate.getMonth()),
    [currentDate]
  );

  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return events;
    const query = searchQuery.toLowerCase();
    return events.filter(event => 
      event.title.toLowerCase().includes(query) ||
      event.description?.toLowerCase().includes(query) ||
      event.location?.toLowerCase().includes(query)
    );
  }, [events, searchQuery]);

  const getEventsForDay = (date: Date) => {
    return filteredEvents.filter(event => isSameDay(event.start, date));
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + direction, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsAddEventOpen(true);
  };

  const handleAddEvent = () => {
    if (!selectedDate || !newEvent.title.trim()) return;

    const [startHour, startMin] = newEvent.startTime.split(":").map(Number);
    const [endHour, endMin] = newEvent.endTime.split(":").map(Number);

    const newEventData: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      start: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), startHour, startMin),
      end: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), endHour, endMin),
      category: newEvent.category,
      description: newEvent.description || undefined,
      location: newEvent.location || undefined
    };

    setEvents(prev => [...prev, newEventData]);
    setIsAddEventOpen(false);
    setNewEvent({
      title: "",
      category: "regular",
      description: "",
      location: "",
      startTime: "09:00",
      endTime: "10:00"
    });
    setSelectedDate(null);
  };

  const viewLabels: Record<ViewType, string> = {
    month: "Mes",
    week: "Semana",
    day: "Dia",
    list: "Lista"
  };

  const currentMonth = MONTH_NAMES[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  const getMonthRange = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    return `${firstDay.getDate()} ${currentMonth.slice(0, 3)} - ${lastDay.getDate()} ${currentMonth.slice(0, 3)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/20">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 p-6 pb-0">
        <h1 
          className="text-2xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight"
          data-testid="text-calendar-title"
        >
          Calendario
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Buscar eventos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-60 pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            data-testid="input-search-events"
          />
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateMonth(-1)}
            className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            data-testid="button-prev-month"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateMonth(1)}
            className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            data-testid="button-next-month"
          >
            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </Button>
          <Button
            variant="outline"
            onClick={goToToday}
            className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium"
            data-testid="button-today"
          >
            Hoje
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setEvents([...initialEvents])}
            className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            data-testid="button-refresh"
          >
            <RefreshCw className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </Button>

          {/* Month Display */}
          <div className="ml-4">
            <span 
              className="text-lg font-semibold text-gray-800 dark:text-gray-100"
              data-testid="text-current-month"
            >
              {currentMonth} {currentYear}
            </span>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              {getMonthRange()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 gap-2"
                data-testid="button-view-dropdown"
              >
                {viewLabels[viewType]}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setViewType("day")} data-testid="menu-item-day">
                Dia
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setViewType("week")} data-testid="menu-item-week">
                Semana
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setViewType("month")} data-testid="menu-item-month">
                Mes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setViewType("list")} data-testid="menu-item-list">
                Lista
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Add Event Button */}
          <Button
            onClick={() => {
              setSelectedDate(new Date());
              setIsAddEventOpen(true);
            }}
            className="bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white gap-2"
            data-testid="button-add-event"
          >
            <Plus className="w-4 h-4" />
            Adicionar Evento
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Body */}
          <div className="grid grid-cols-7 auto-rows-[minmax(120px,auto)]">
            {monthDays.map(({ date, isCurrentMonth }, index) => {
              const dayEvents = getEventsForDay(date);
              const isToday = isSameDay(date, today);
              const maxVisible = 3;
              const visibleEvents = dayEvents.slice(0, maxVisible);
              const hiddenCount = dayEvents.length - maxVisible;

              return (
                <div
                  key={index}
                  onClick={() => handleDayClick(date)}
                  className={`min-h-[120px] p-2 border-b border-r border-gray-100 dark:border-gray-700 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                    !isCurrentMonth ? "bg-gray-50/50 dark:bg-gray-900/30" : ""
                  }`}
                  data-testid={`day-cell-${date.getDate()}-${date.getMonth()}`}
                >
                  {/* Day Number */}
                  <div className="flex justify-end mb-2">
                    <span
                      className={`w-7 h-7 flex items-center justify-center text-sm font-medium rounded-full ${
                        isToday
                          ? "bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800"
                          : isCurrentMonth
                            ? "text-gray-800 dark:text-gray-200"
                            : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {date.getDate()}
                    </span>
                  </div>

                  {/* Events */}
                  <div className="flex flex-col gap-1">
                    {visibleEvents.map((event) => {
                      const config = categoryConfig[event.category];
                      return (
                      <Popover key={event.id}>
                        <PopoverTrigger asChild>
                          <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              backgroundColor: config.bgColor,
                              color: config.textColor,
                              borderLeftColor: config.borderColor
                            }}
                            className="px-2 py-1 rounded text-xs font-medium truncate cursor-pointer border-l-[3px] transition-transform hover:translate-x-0.5 hover:shadow-sm"
                            data-testid={`event-chip-${event.id}`}
                          >
                            {event.title}
                            <span className="ml-1 opacity-80">{formatTime(event.start)}</span>
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-72 p-4" align="start">
                          <div className="space-y-3">
                            <div>
                              <Badge 
                                variant="secondary" 
                                style={{
                                  backgroundColor: config.bgColor,
                                  color: config.textColor
                                }}
                                className="mb-2"
                              >
                                {config.label}
                              </Badge>
                              <h4 className="font-semibold text-gray-800 dark:text-gray-100">{event.title}</h4>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Clock className="w-4 h-4" />
                              <span>{formatTime(event.start)} - {formatTime(event.end)}</span>
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <MapPin className="w-4 h-4" />
                                <span>{event.location}</span>
                              </div>
                            )}
                            {event.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-400">{event.description}</p>
                            )}
                          </div>
                        </PopoverContent>
                      </Popover>
                    );
                    })}
                    {hiddenCount > 0 && (
                      <span 
                        className="text-xs text-gray-500 dark:text-gray-400 px-2 cursor-pointer hover:text-blue-500"
                        onClick={(e) => e.stopPropagation()}
                      >
                        +{hiddenCount} mais...
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Event Dialog */}
      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent className="sm:max-w-[480px]" data-testid="modal-add-event">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Novo Evento
            </DialogTitle>
            <DialogDescription>
              {selectedDate && (
                <span>
                  {selectedDate.getDate()} de {MONTH_NAMES[selectedDate.getMonth()]} de {selectedDate.getFullYear()}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titulo</Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Nome do evento"
                data-testid="input-event-title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select
                value={newEvent.category}
                onValueChange={(value: EventCategory) => setNewEvent(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger data-testid="select-event-category">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categoryConfig).map(([key, cfg]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded border-l-2" 
                          style={{ 
                            backgroundColor: cfg.bgColor,
                            borderLeftColor: cfg.borderColor 
                          }}
                        />
                        {cfg.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Inicio</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={newEvent.startTime}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, startTime: e.target.value }))}
                  data-testid="input-event-start"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">Fim</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={newEvent.endTime}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
                  data-testid="input-event-end"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Local (opcional)</Label>
              <Input
                id="location"
                value={newEvent.location}
                onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Onde sera o evento"
                data-testid="input-event-location"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descricao (opcional)</Label>
              <Textarea
                id="description"
                value={newEvent.description}
                onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Detalhes do evento"
                className="resize-none"
                rows={3}
                data-testid="input-event-description"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEventOpen(false)} data-testid="button-cancel-event">
              Cancelar
            </Button>
            <Button 
              onClick={handleAddEvent} 
              disabled={!newEvent.title.trim()}
              className="bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600"
              data-testid="button-save-event"
            >
              Salvar Evento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
