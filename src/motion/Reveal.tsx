import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeUp } from "./variants";

type Props = HTMLMotionProps<"div"> & {
  /** Сколько процентов блока должно попасть во вьюпорт, чтобы запустилось. */
  amount?: number;
  /** Анимировать каждый раз при появлении или только один раз. */
  once?: boolean;
};

/**
 * Появление при попадании во вьюпорт. Используй для секций ниже сгиба.
 *
 * <Reveal><FeatureCard ... /></Reveal>
 */
export function Reveal({
  amount = 0.2,
  once = true,
  children,
  ...rest
}: Props) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
