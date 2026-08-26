import { motion, useReducedMotion } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";

export type WeekDayDatum = {
  /** Rótulo curto do dia, ex.: "seg". */
  label: string;
  agendadas: number;
  realizadas: number;
};

type WeekChartProps = {
  data: WeekDayDatum[];
};

const CHART_W = 320;
const CHART_H = 120;
const AXIS_Y = CHART_H - 20; // espaço inferior para labels dos dias
const SLOT_W = CHART_W / 7;
const BAR_W = 9;
const GAP = 4;

/**
 * Barras SVG dos últimos 7 dias (agendadas vs realizadas).
 * Zero lib de chart — tooltips via <title>, animação scaleY com stagger.
 */
export function WeekChart({ data }: WeekChartProps) {
  const reduced = useReducedMotion();
  const max = Math.max(...data.map((d) => Math.max(d.agendadas, d.realizadas)), 1);

  function barHeight(value: number): number {
    return value === 0 ? 0 : Math.max((value / max) * (AXIS_Y - 12), 4);
  }

  return (
    <div>
      <svg
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        role="img"
        aria-label="Consultas dos últimos 7 dias: agendadas versus realizadas"
        className="w-full"
      >
        {/* linha de base */}
        <line
          x1="0"
          y1={AXIS_Y}
          x2={CHART_W}
          y2={AXIS_Y}
          className="stroke-border"
          strokeWidth="1"
        />

        {data.map((day, i) => {
          const slotX = i * SLOT_W + SLOT_W / 2;
          const hA = barHeight(day.agendadas);
          const hR = barHeight(day.realizadas);
          const xA = slotX - BAR_W - GAP / 2;
          const xR = slotX + GAP / 2;

          return (
            <g key={day.label}>
              <motion.rect
                x={xA}
                y={AXIS_Y - hA}
                width={BAR_W}
                height={hA}
                rx={2.5}
                className="fill-brand-primary"
                style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
                {...(reduced
                  ? {}
                  : {
                      initial: { scaleY: 0 },
                      animate: { scaleY: 1 },
                      transition: { duration: 0.5, delay: i * 0.06, ease: EASE_EXPO },
                    })}
              >
                <title>{`${day.label}: ${day.agendadas} agendada(s)`}</title>
              </motion.rect>
              <motion.rect
                x={xR}
                y={AXIS_Y - hR}
                width={BAR_W}
                height={hR}
                rx={2.5}
                className="fill-status-success"
                style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
                {...(reduced
                  ? {}
                  : {
                      initial: { scaleY: 0 },
                      animate: { scaleY: 1 },
                      transition: { duration: 0.5, delay: i * 0.06 + 0.05, ease: EASE_EXPO },
                    })}
              >
                <title>{`${day.label}: ${day.realizadas} realizada(s)`}</title>
              </motion.rect>
              <text
                x={slotX}
                y={CHART_H - 6}
                textAnchor="middle"
                className="fill-content-muted text-[10px] font-medium uppercase"
              >
                {day.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-3 flex items-center gap-5 text-xs text-content-muted">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand-primary" />
          Agendadas
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-status-success" />
          Realizadas
        </span>
      </div>
    </div>
  );
}
