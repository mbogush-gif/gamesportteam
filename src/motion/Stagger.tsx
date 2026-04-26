import { motion, type HTMLMotionProps } from "framer-motion";
import { staggerContainer, fadeUp } from "./variants";

type ContainerProps = HTMLMotionProps<"div"> & { once?: boolean };

/**
 * Контейнер, дети которого появляются по очереди.
 * Каждого ребёнка оборачивай в <StaggerItem>.
 *
 * <Stagger>
 *   <StaggerItem><Card/></StaggerItem>
 *   <StaggerItem><Card/></StaggerItem>
 * </Stagger>
 */
export function Stagger({ once = true, children, ...rest }: ContainerProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...rest }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={fadeUp} {...rest}>
      {children}
    </motion.div>
  );
}
