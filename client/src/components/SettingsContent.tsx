import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Building2, 
  CreditCard, 
  HelpCircle, 
  Sliders, 
  Shield, 
  Plug, 
  ChevronRight, 
  ExternalLink,
  Users,
  Bell,
  FileText,
  History,
  Mail,
  MessageSquare,
  Sun,
  Moon,
  Globe,
  Clock,
  CheckCircle2
} from "lucide-react";

interface SettingsCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

function SettingsCard({ icon, iconBg, title, description, children, className = "" }: SettingsCardProps) {
  return (
    <Card className={`p-6 bg-white dark:bg-card border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${className}`}>
      <div className="mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${iconBg}`}>
          {icon}
        </div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2" data-testid={`text-settings-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="space-y-2">
        {children}
      </div>
    </Card>
  );
}

interface NavigationButtonProps {
  icon: React.ReactNode;
  label: string;
  badge?: React.ReactNode;
  isExternal?: boolean;
  onClick?: () => void;
}

function NavigationButton({ icon, label, badge, isExternal = false, onClick }: NavigationButtonProps) {
  return (
    <button
      onClick={onClick}
      data-testid={`button-${label.toLowerCase().replace(/\s+/g, '-')}`}
      className="w-full h-11 px-4 bg-white dark:bg-card border border-gray-200 dark:border-gray-700 rounded-md flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-[0.99] transition-all duration-150"
    >
      <div className="flex items-center gap-3">
        <span className="text-gray-500 dark:text-gray-400">{icon}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge}
        {isExternal ? (
          <ExternalLink className="w-5 h-5 text-gray-400" />
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
    <div className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
      <div className="flex items-center gap-2.5">
        <span className="text-gray-500 dark:text-gray-400">{icon}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
      </div>
      {control}
    </div>
  );
}

export default function SettingsContent() {
  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight" data-testid="text-settings-title">
            Configurações
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Gerencie as configurações da sua conta e preferências do sistema
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              badge={<Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 text-xs">12</Badge>}
            />
            <NavigationButton
              icon={<Bell className="w-5 h-5" />}
              label="Notificações"
            />
          </SettingsCard>

          <SettingsCard
            icon={<CreditCard className="w-6 h-6 text-amber-500" />}
            iconBg="bg-amber-50 dark:bg-amber-500/20"
            title="Assinatura e Plano"
            description="Visualize e gerencie seu plano de assinatura"
          >
            <div className="p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-md mb-3">
              <div className="text-base font-semibold text-amber-800 dark:text-amber-300 mb-1" data-testid="text-plan-name">
                Plano Profissional
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Ativo até 15/12/2025</span>
              </div>
            </div>
            <NavigationButton
              icon={<CreditCard className="w-5 h-5" />}
              label="Gerenciar Assinatura"
            />
            <NavigationButton
              icon={<History className="w-5 h-5" />}
              label="Histórico de Pagamentos"
            />
          </SettingsCard>

          <SettingsCard
            icon={<HelpCircle className="w-6 h-6 text-emerald-500" />}
            iconBg="bg-emerald-50 dark:bg-emerald-500/20"
            title="Suporte"
            description="Entre em contato com nossa equipe de suporte"
          >
            <NavigationButton
              icon={<HelpCircle className="w-5 h-5" />}
              label="Central de Ajuda"
              isExternal
            />
            <NavigationButton
              icon={<Mail className="w-5 h-5" />}
              label="Enviar Email"
              badge={<span className="text-xs text-gray-500 dark:text-gray-400">suporte@empresa.com</span>}
            />
            <NavigationButton
              icon={<MessageSquare className="w-5 h-5" />}
              label="Chat ao Vivo"
              badge={
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Online
                </Badge>
              }
            />
          </SettingsCard>

          <SettingsCard
            icon={<Sliders className="w-6 h-6 text-purple-500" />}
            iconBg="bg-purple-50 dark:bg-purple-500/20"
            title="Preferências"
            description="Personalize sua experiência no sistema"
            className="md:col-span-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <SettingRow
                icon={<Sun className="w-5 h-5" />}
                label="Tema da Interface"
                control={
                  <Select defaultValue="light">
                    <SelectTrigger className="min-w-[140px] h-11" data-testid="select-theme">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                }
              />
              <SettingRow
                icon={<Globe className="w-5 h-5" />}
                label="Idioma"
                control={
                  <Select defaultValue="pt-BR">
                    <SelectTrigger className="min-w-[140px] h-11" data-testid="select-language">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português</SelectItem>
                      <SelectItem value="en-US">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                }
              />
              <SettingRow
                icon={<Clock className="w-5 h-5" />}
                label="Fuso Horário"
                control={
                  <Select defaultValue="america-sp">
                    <SelectTrigger className="min-w-[140px] h-11" data-testid="select-timezone">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america-sp">America/Sao_Paulo</SelectItem>
                      <SelectItem value="america-ny">America/New_York</SelectItem>
                      <SelectItem value="europe-london">Europe/London</SelectItem>
                    </SelectContent>
                  </Select>
                }
              />
              <SettingRow
                icon={<Mail className="w-5 h-5" />}
                label="Notificações por Email"
                control={<Switch data-testid="switch-email-notifications" defaultChecked />}
              />
            </div>
          </SettingsCard>

          <SettingsCard
            icon={<Shield className="w-6 h-6 text-red-500" />}
            iconBg="bg-red-50 dark:bg-red-500/20"
            title="Segurança"
            description="Proteja sua conta e dados"
          >
            <NavigationButton
              icon={<Shield className="w-5 h-5" />}
              label="Alterar Senha"
            />
            <NavigationButton
              icon={<Shield className="w-5 h-5" />}
              label="Autenticação em Duas Etapas"
              badge={<Badge variant="secondary" className="bg-red-50 text-red-700 dark:bg-red-500/20 dark:text-red-300 text-xs">Desativado</Badge>}
            />
            <NavigationButton
              icon={<History className="w-5 h-5" />}
              label="Histórico de Acessos"
            />
          </SettingsCard>

          <SettingsCard
            icon={<Plug className="w-6 h-6 text-indigo-500" />}
            iconBg="bg-indigo-50 dark:bg-indigo-500/20"
            title="Integrações"
            description="Conecte com outros serviços e ferramentas"
          >
            <NavigationButton
              icon={<Plug className="w-5 h-5" />}
              label="APIs Conectadas"
              badge={<Badge variant="secondary" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 text-xs">3</Badge>}
            />
            <NavigationButton
              icon={<FileText className="w-5 h-5" />}
              label="Documentação da API"
              isExternal
            />
            <NavigationButton
              icon={<History className="w-5 h-5" />}
              label="Logs de Integração"
            />
          </SettingsCard>
        </div>
      </div>
    </div>
  );
}
