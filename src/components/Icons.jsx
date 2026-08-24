/**
 * Icones em SVG inline — sem dependencia externa, herdam currentColor
 * e permanecem nitidos em qualquer tamanho.
 */

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24'
}

const ICONS = {
  // --- Hero ---
  shieldCheck: (
    <>
      <path d="M12 2.5 4.5 5.6v5.9c0 4.6 3.2 8.4 7.5 9.9 4.3-1.5 7.5-5.3 7.5-9.9V5.6L12 2.5Z" />
      <path d="m8.8 11.9 2.2 2.2 4.2-4.4" />
    </>
  ),
  bolt: <path d="M13.2 2.5 4.8 13.2h6L10 21.5l8.6-10.8h-6.2l.8-8.2Z" />,
  bars: (
    <>
      <path d="M4 20.2h16" />
      <path d="M7 20.2v-6.4" />
      <path d="M12 20.2V7.6" />
      <path d="M17 20.2V3.8" />
    </>
  ),
  code: (
    <>
      <path d="m8.6 7.4-5 4.6 5 4.6" />
      <path d="m15.4 7.4 5 4.6-5 4.6" />
    </>
  ),

  // --- Modulos ---
  scan: (
    <>
      <path d="M3.5 8.2V5a1.5 1.5 0 0 1 1.5-1.5h3.2" />
      <path d="M20.5 8.2V5A1.5 1.5 0 0 0 19 3.5h-3.2" />
      <path d="M3.5 15.8V19A1.5 1.5 0 0 0 5 20.5h3.2" />
      <path d="M20.5 15.8V19a1.5 1.5 0 0 1-1.5 1.5h-3.2" />
      <path d="M3.5 12h17" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.5 4.5 5.6v5.9c0 4.6 3.2 8.4 7.5 9.9 4.3-1.5 7.5-5.3 7.5-9.9V5.6L12 2.5Z" />
      <circle cx="12" cy="11" r="2.2" />
      <path d="M12 13.2v2.6" />
    </>
  ),
  fix: (
    <>
      <circle cx="6.5" cy="6" r="2.5" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="17.5" cy="12" r="2.5" />
      <path d="M6.5 8.5v7" />
      <path d="M9 6h4.5A1.5 1.5 0 0 1 15 7.5V10" />
    </>
  ),
  risk: (
    <>
      <path d="M3.5 20.2h17" />
      <path d="m5 15.5 4.4-4.8 3.4 3 5.7-6.8" />
      <path d="M18.5 6.9h-3.4" />
      <path d="M18.5 6.9v3.4" />
    </>
  ),
  pulse: (
    <>
      <path d="M2.5 12h4l2.4-6.4 4.3 12.8 2.4-6.4h5.9" />
    </>
  ),
  radar: (
    <>
      <circle cx="12" cy="12" r="8.8" />
      <circle cx="12" cy="12" r="4.8" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      <path d="M12 12 18.2 5.8" />
    </>
  ),

  // --- Interface ---
  arrow: (
    <>
      <path d="M4.5 12h15" />
      <path d="m13.5 6 6 6-6 6" />
    </>
  ),
  check: <path d="m4.8 12.4 4.6 4.6 9.8-10.4" />,
  chevron: <path d="m6.5 9.5 5.5 5 5.5-5" />,
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="M6 6 18 18" />
      <path d="M18 6 6 18" />
    </>
  ),
  external: (
    <>
      <path d="M13.5 4.5h6v6" />
      <path d="m19.5 4.5-8 8" />
      <path d="M18 14.5V18a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18V7.5A1.5 1.5 0 0 1 6 6h3.6" />
    </>
  ),
  github: (
    <path
      d="M12 2.2a9.8 9.8 0 0 0-3.1 19.1c.5.1.7-.2.7-.5v-1.8c-2.7.6-3.3-1.3-3.3-1.3-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.5 4.9.3.3.7 1 .7 2v2.9c0 .3.2.6.7.5A9.8 9.8 0 0 0 12 2.2Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  linkedin: (
    <path
      d="M4.6 3.5a2 2 0 1 0 0 4.1 2 2 0 0 0 0-4.1ZM2.9 9.2h3.4v11.3H2.9V9.2Zm6 0h3.3v1.6h.1a3.6 3.6 0 0 1 3.2-1.8c3.5 0 4.1 2.3 4.1 5.2v6.3h-3.4v-5.6c0-1.3 0-3.1-1.9-3.1s-2.1 1.5-2.1 3v5.7H8.9V9.2Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  mail: (
    <>
      <rect x="2.8" y="5" width="18.4" height="14" rx="2" />
      <path d="m3.4 6.4 8.6 6.2 8.6-6.2" />
    </>
  ),
  spinner: <path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5" />
}

export default function Icon({ name, size = 24, className = '', ...rest }) {
  const content = ICONS[name]
  if (!content) return null

  return (
    <svg
      {...base}
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {content}
    </svg>
  )
}
