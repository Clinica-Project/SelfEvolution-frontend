import {
  Activity,
  AudioLines,
  Baby,
  Blocks,
  Brain,
  CalendarCheck,
  Compass,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Home,
  Lightbulb,
  Lock,
  MonitorSmartphone,
  Puzzle,
  Salad,
  School,
  ShieldCheck,
  Users,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import type { InstitucionalIconName } from "@/lib/content/institucional";

const iconMap: Record<InstitucionalIconName, LucideIcon> = {
  brain: Brain,
  activity: Activity,
  puzzle: Puzzle,
  "graduation-cap": GraduationCap,
  blocks: Blocks,
  "audio-lines": AudioLines,
  salad: Salad,
  baby: Baby,
  school: School,
  "user-round": UserRound,
  "hand-heart": HandHeart,
  home: Home,
  "heart-handshake": HeartHandshake,
  lightbulb: Lightbulb,
  compass: Compass,
  users: Users,
  "shield-check": ShieldCheck,
  "monitor-smartphone": MonitorSmartphone,
  "calendar-check": CalendarCheck,
  lock: Lock,
};

type InstitucionalIconProps = {
  name: InstitucionalIconName;
  className?: string;
};

export function InstitucionalIcon({ name, className }: InstitucionalIconProps) {
  const Icon = iconMap[name];
  return <Icon className={className} aria-hidden="true" />;
}
