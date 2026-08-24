import { motion, useReducedMotion } from 'framer-motion'

/**
 * Wrapper de scroll-reveal.
 * Quando o usuario tem `prefers-reduced-motion: reduce` ativo no sistema,
 * o conteudo e renderizado direto, sem qualquer animacao.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = 0.6,
  as = 'div',
  className = '',
  ...rest
}) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  if (reduced) {
    const Tag = as
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
