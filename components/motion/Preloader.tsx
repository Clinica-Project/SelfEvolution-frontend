import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_EXPO, INTRO_STORAGE_KEY } from "@/lib/motion";

function alreadySeen() {
  try {
    return sessionStorage.getItem(INTRO_STORAGE_KEY) === "1";
  } catch {
    return true;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
  document.documentElement.removeAttribute("data-intro");
}

export function Preloader() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (reduced || alreadySeen()) {
      markSeen();
      return;
    }

    setVisible(true);

    const exitTimer = window.setTimeout(() => setExiting(true), 1000);
    const doneTimer = window.setTimeout(() => {
      markSeen();
      setVisible(false);
    }, 1450);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, [reduced]);

  useEffect(() => {
    return () => {
      document.documentElement.removeAttribute("data-intro");
    };
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface-background"
      initial={{ y: 0 }}
      animate={{ y: exiting ? "-100%" : 0 }}
      transition={{ duration: 0.45, ease: EASE_EXPO }}
    >
      <div className="overflow-hidden pb-[0.06em]">
        <motion.p
          className="font-display text-3xl font-medium lowercase tracking-tight text-brand-primary sm:text-4xl"
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.7, ease: EASE_EXPO }}
        >
          selfevolution
        </motion.p>
      </div>
      <motion.p
        className="mt-2 text-xs text-content-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.28, ease: EASE_EXPO }}
      >
        clínica interdisciplinar
      </motion.p>
      <div className="mt-10 h-px w-40 overflow-hidden bg-border">
        <motion.div
          className="h-full origin-left bg-brand-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: EASE_EXPO }}
        />
      </div>
    </motion.div>
  );
}
