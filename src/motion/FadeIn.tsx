import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeUp } from "./variants";

type Props = HTMLMotionProps<"div"> & {
  delay?: number;
};

/**
 * Появляется один раз при маунте. Используй для контента "над сгибом".
 *
 * <FadeIn delay={0.1}><h1>Заголовок</h1></FadeIn>
 */
export function FadeIn({ delay = 0, children, ...rest }: Props) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      transition={{ ...fadeUp.show, delay } as never}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
