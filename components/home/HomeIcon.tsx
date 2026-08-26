import {
  Activity,
  AudioLines,
  Blocks,
  Brain,
  GraduationCap,
  HeartHandshake,
  MonitorSmartphone,
  Puzzle,
  Salad,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { HomeIconName } from "@/lib/content/home";

const iconMap: Record<HomeIconName, LucideIcon> = {
  brain: Brain,
  activity: Activity,
  puzzle: Puzzle,
  "graduation-cap": GraduationCap,
  blocks: Blocks,
  "audio-lines": AudioLines,
  salad: Salad,
  users: Users,
  "monitor-smartphone": MonitorSmartphone,
  "heart-handshake": HeartHandshake,
};

type HomeIconProps = {
  name: HomeIconName;
  className?: string;
};

export function HomeIcon({ name, className }: HomeIconProps) {
  const Icon = iconMap[name];
  return <Icon className={className} aria-hidden="true" />;
}
