import { motion } from "framer-motion";

/** Floating laundry pod loader — replaces traditional spinners. */
export function PodLoader({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10" role="status" aria-label={label}>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
        className="relative"
      >
        <svg viewBox="0 0 64 64" className="h-14 w-14">
          <defs>
            <linearGradient id="podLoaderG" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#756CA1" />
              <stop offset="1" stopColor="#2A3A86" />
            </linearGradient>
          </defs>
          <rect x="8" y="8" width="48" height="48" rx="16" fill="url(#podLoaderG)" />
          <motion.circle
            cx="24" cy="24" r="7" fill="white"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
          <motion.circle
            cx="42" cy="40" r="9" fill="white" opacity="0.7"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.4 }}
          />
        </svg>
      </motion.div>
      <span className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">{label}</span>
    </div>
  );
}
