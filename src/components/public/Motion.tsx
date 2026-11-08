import React from "react";
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";

export type MotionDirection = "up" | "down" | "left" | "right" | "none";

interface MotionFadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  direction?: MotionDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

export const MotionFadeIn: React.FC<MotionFadeInProps> = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.4,
  distance = 20,
  className = "",
  once = true,
  ...rest
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, opacity: 0 };
      case "down":
        return { y: -distance, opacity: 0 };
      case "left":
        return { x: -distance, opacity: 0 };
      case "right":
        return { x: distance, opacity: 0 };
      case "none":
      default:
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once, margin: "0px" }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export const MotionStaggerContainer: React.FC<{
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
}> = ({ children, staggerDelay = 0.06, className = "", once = true }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "0px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const MotionStaggerItem: React.FC<{
  children: React.ReactNode;
  direction?: MotionDirection;
  distance?: number;
  duration?: number;
  className?: string;
}> = ({
  children,
  direction = "up",
  distance = 18,
  duration = 0.38,
  className = "",
}) => {
  const getInitial = () => {
    switch (direction) {
      case "up":
        return { y: distance, opacity: 0 };
      case "down":
        return { y: -distance, opacity: 0 };
      case "left":
        return { x: -distance, opacity: 0 };
      case "right":
        return { x: distance, opacity: 0 };
      default:
        return { opacity: 0 };
    }
  };

  const itemVariants: Variants = {
    hidden: getInitial(),
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

export default MotionFadeIn;

