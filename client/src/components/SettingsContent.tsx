import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  FileText,
  Users,
  Bell,
  Sliders,
  Sun,
  Globe,
  Clock,
  Mail,
  Shield,
  Key,
  Smartphone,
  History,
  CreditCard,
  Receipt,
  HelpCircle,
  MessageCircle,
  ChevronRight,
  ExternalLink,
  CheckCircle,
} from "lucide-react";

interface NavigationButtonProps {
  icon: React.ReactNode;
  label: string;
  badge?: React.ReactNode;
  isExternal?: boolean;
  onClick?: () => void;
}

function NavigationButton({ icon, label, badge, isExternal, onClick }: NavigationButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full h-11 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md flex items-center justify-between cursor-pointer transition-all duration-150 hover:bg-gray-50 dark:hover:bg-gray-700/50 active:scale-[0.98]"
      data-testid={`button-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-gray-500 dark:text-gray-400">{icon}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge}
        {isExternal ? (
          <ExternalLink className="w-[18px] h-[18px] text-gray-400" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-400" />
        )}
      </div>
    </button>
  );
}

interface SettingRowProps {
  icon: React.ReactNode;
  label: string;
  control: React.ReactNode;
}

function SettingRow({ icon, label, control }: SettingRowProps) {
  return (
    <div className="flex justify-between items-center py-3 px-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-md transition-colors duration-150 hover:bg-gray-100 dark:hover:bg-gray-700/50">
      <div className="flex items-center gap-3">
        <span className="text-gray-500 dark:text-gray-400">{icon}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
      </div>
      <div>{control}</div>
    </div>
  );
}

interface SettingsCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

function SettingsCard({ icon, iconBg, title, description, children }: SettingsCardProps) {
  return (
    <Card className="w-full p-6 shadow-sm hover:shadow-md transition-shadow duration-150">
      <div className="flex items-center gap-4 mb-5">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
          {icon}
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 tracking-tight">{title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {children}
      </div>
    </Card>
  );
}

function CounterBadge({ count, bgColor, textColor, testId }: { count: number; bgColor: string; textColor: string; testId?: string }) {
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium min-w-[20px] text-center ${bgColor} ${textColor}`} data-testid={testId}>
      {count}
    </span>
  );
}

function StatusBadge({ label, bgColor, textColor, showDot, dotColor, testId }: { 
  label: string; 
  bgColor: string; 
  textColor: string;
  showDot?: boolean;
  dotColor?: string;
  testId?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`} data-testid={testId}>
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />}
      {label}
    </span>
  );
}

function PlanDisplay() {
  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-md p-4 mb-4 flex flex-col gap-1.5" data-testid="display-plan">
      <span className="text-base font-semibold text-amber-800 dark:text-amber-200">Plano Profissional</span>
      <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
        <CheckCircle className="w-4 h-4 text-emerald-500" />
        <span>Ativo até 15/12/2025</span>
      </div>
    </div>
  );
}

export default function SettingsContent() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [theme, setTheme] = useState("claro");
  const [language, setLanguage] = useState("portugues");
  const [timezone, setTimezone] = useState("sao_paulo");

  return (
    <div className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
      <div className="p-6 max-w-[800px] mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight mb-2" data-testid="text-settings-title">
            Configurações
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400" data-testid="text-settings-description">
            Gerencie suas preferências e configurações do sistema
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <SettingsCard
            icon={<Building2 className="w-6 h-6 text-blue-500" />}
            iconBg="bg-blue-50 dark:bg-blue-500/20"
            title="Configurações da Empresa"
            description="Gerencie informações e preferências da empresa"
          >
            <NavigationButton
              icon={<FileText className="w-5 h-5" />}
              label="Dados da Empresa"
            />
            <NavigationButton
              icon={<Users className="w-5 h-5" />}
              label="Usuários Ativos"
              badge={<CounterBadge count={12} bgColor="bg-blue-50 dark:bg-blue-500/20" textColor="text-blue-700 dark:text-blue-300" testId="badge-users-count" />}
            />
            <NavigationButton
              icon={<Bell className="w-5 h-5" />}
              label="Notificações"
            />
          </SettingsCard>

          <SettingsCard
            icon={<Sliders className="w-6 h-6 text-purple-500" />}
            iconBg="bg-purple-50 dark:bg-purple-500/20"
            title="Preferências"
            description="Personalize sua experiência no sistema"
          >
            <SettingRow
              icon={<Sun className="w-5 h-5" />}
              label="Tema da Interface"
              control={
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="h-9 min-w-[140px] text-sm" data-testid="select-theme">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="claro">Claro</SelectItem>
                    <SelectItem value="escuro">Escuro</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              }
            />
            <SettingRow
              icon={<Globe className="w-5 h-5" />}
              label="Idioma"
              control={
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="h-9 min-w-[140px] text-sm" data-testid="select-language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="portugues">Português</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="espanol">Español</SelectItem>
                  </SelectContent>
                </Select>
              }
            />
            <SettingRow
              icon={<Clock className="w-5 h-5" />}
              label="Fuso Horário"
              control={
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger className="h-9 min-w-[140px] text-sm" data-testid="select-timezone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sao_paulo">America/São_Paulo</SelectItem>
                    <SelectItem value="new_york">America/New_York</SelectItem>
                  </SelectContent>
                </Select>
              }
            />
            <SettingRow
              icon={<Mail className="w-5 h-5" />}
              label="Notificações por Email"
              control={
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                  className="w-11 h-6 data-[state=checked]:bg-emerald-500"
                  data-testid="toggle-email-notifications"
                />
              }
            />
          </SettingsCard>

          <SettingsCard
            icon={<Shield className="w-6 h-6 text-red-500" />}
            iconBg="bg-red-50 dark:bg-red-500/20"
            title="Segurança"
            description="Proteja sua conta e gerencie acessos"
          >
            <NavigationButton
              icon={<Key className="w-5 h-5" />}
              label="Alterar Senha"
            />
            <NavigationButton
              icon={<Smartphone className="w-5 h-5" />}
              label="Autenticação em Duas Etapas"
              badge={<StatusBadge label="Desativado" bgColor="bg-red-50 dark:bg-red-500/20" textColor="text-red-700 dark:text-red-300" testId="badge-2fa-status" />}
            />
            <NavigationButton
              icon={<History className="w-5 h-5" />}
              label="Histórico de Acessos"
            />
          </SettingsCard>

          <SettingsCard
            icon={<CreditCard className="w-6 h-6 text-amber-500" />}
            iconBg="bg-amber-50 dark:bg-amber-500/20"
            title="Assinatura e Plano"
            description="Gerencie seu plano e informações de pagamento"
          >
            <PlanDisplay />
            <NavigationButton
              icon={<CreditCard className="w-5 h-5" />}
              label="Gerenciar Assinatura"
            />
            <NavigationButton
              icon={<Receipt className="w-5 h-5" />}
              label="Histórico de Pagamentos"
            />
          </SettingsCard>

          <SettingsCard
            icon={<HelpCircle className="w-6 h-6 text-emerald-500" />}
            iconBg="bg-emerald-50 dark:bg-emerald-500/20"
            title="Suporte"
            description="Obtenha ajuda e entre em contato conosco"
          >
            <NavigationButton
              icon={<HelpCircle className="w-5 h-5" />}
              label="Central de Ajuda"
              isExternal
            />
            <NavigationButton
              icon={<Mail className="w-5 h-5" />}
              label="Suporte por Email"
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 pl-4 -mt-1 mb-1">
              suporte@empresa.com.br
            </div>
            <NavigationButton
              icon={<MessageCircle className="w-5 h-5" />}
              label="Chat ao Vivo"
              badge={<StatusBadge label="Online" bgColor="bg-emerald-50 dark:bg-emerald-500/20" textColor="text-emerald-700 dark:text-emerald-300" showDot dotColor="bg-emerald-500" testId="badge-chat-status" />}
            />
          </SettingsCard>
        </div>
      </div>
    </div>
  );
}
