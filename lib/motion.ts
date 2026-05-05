/** Shared motion presets — joyful, soft springs */
export const joySpring = {
  type: "spring" as const,
  stiffness: 118,
  damping: 20,
  mass: 0.85,
};

export const joySpringSlow = {
  type: "spring" as const,
  stiffness: 80,
  damping: 18,
  mass: 0.9,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: joySpring,
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

export const viewportOnce = {
  once: true as const,
  margin: "-48px 0px",
  amount: 0.2,
};

export const popIn = {
  hidden: { opacity: 0, y: 20, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: joySpring,
  },
};
