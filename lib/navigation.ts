import {
  Calendar,
  FileText,
  LayoutDashboard,
  Sparkles,
  UserCog,
  Users,
  type LucideIcon,
} from "lucide-react";

export type NavSection = "Visão geral" | "Clínica" | "Sistema";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  section: NavSection;
  adminOnly?: boolean;
};

export const dashboardNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, section: "Visão geral" },
  { label: "Pacientes", href: "/pacientes", icon: Users, section: "Clínica" },
  { label: "Consultas", href: "/consultas", icon: Calendar, section: "Clínica" },
  { label: "Documentos", href: "/documentos", icon: FileText, section: "Sistema" },
  { label: "IA Clínica", href: "/ia", icon: Sparkles, section: "Sistema" },
  { label: "Usuários", href: "/usuarios", icon: UserCog, section: "Sistema", adminOnly: true },
];

export const NAV_SECTION_ORDER: NavSection[] = ["Visão geral", "Clínica", "Sistema"];
