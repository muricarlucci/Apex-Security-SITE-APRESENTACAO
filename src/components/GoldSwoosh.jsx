import './GoldSwoosh.css'

/**
 * ELEMENTO ASSINATURA DA MARCA
 * -----------------------------------------------------------------------
 * As grandes curvas douradas luminosas que cruzam o fundo escuro atras do
 * hero, como trilhas de luz descendo dos cantos superiores e convergindo
 * num horizonte brilhante logo acima da fileira de cards.
 *
 * Construcao em tres camadas:
 *   1. glow de horizonte  — radial-gradient em CSS (camada mais ao fundo)
 *   2. arcos difusos      — curvas Bezier com stroke em gradiente + blur
 *   3. arcos nitidos      — as mesmas curvas, finas e sem blur, por cima
 *
 * O viewBox e largo e baixo (1440x640) para acompanhar a proporcao da
 * faixa que o elemento ocupa; `slice` preenche qualquer tela sem
 * distorcer as curvas. Decorativo: fica fora da arvore de acessibilidade.
 */
export default function GoldSwoosh() {
  return (
    <div className="swoosh" aria-hidden="true">
      {/* 1. Horizonte luminoso e brilho ambiente (CSS puro) */}
      <div className="swoosh__ambient" />
      <div className="swoosh__horizon" />

      {/* 2 + 3. Trilhas de luz */}
      <svg
        className="swoosh__svg"
        viewBox="0 0 1440 640"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradiente das trilhas da esquerda: apaga no topo, acende embaixo */}
          <linearGradient id="swooshLeft" x1="0.05" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#8B6914" stopOpacity="0" />
            <stop offset="24%" stopColor="#C9A84C" stopOpacity="0.4" />
            <stop offset="66%" stopColor="#E8C97A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFF3D0" stopOpacity="1" />
          </linearGradient>

          {/* Espelho do anterior, para as trilhas da direita */}
          <linearGradient id="swooshRight" x1="0.95" y1="0" x2="0.2" y2="1">
            <stop offset="0%" stopColor="#8B6914" stopOpacity="0" />
            <stop offset="24%" stopColor="#C9A84C" stopOpacity="0.4" />
            <stop offset="66%" stopColor="#E8C97A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFF3D0" stopOpacity="1" />
          </linearGradient>

          {/* Halo largo, para as copias difusas */}
          <filter id="swooshBlurWide" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="22" />
          </filter>

          {/* Halo curto, para dar corpo as linhas nitidas */}
          <filter id="swooshBlurTight" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* ---------- Camada difusa (o brilho) ---------- */}
        <g filter="url(#swooshBlurWide)" opacity="0.72">
          <path
            d="M -170 -90 C 130 150, 200 470, 720 588"
            stroke="url(#swooshLeft)"
            strokeWidth="15"
            fill="none"
          />
          <path
            d="M 1610 -90 C 1310 150, 1240 470, 720 588"
            stroke="url(#swooshRight)"
            strokeWidth="15"
            fill="none"
          />
          <path
            d="M -30 -170 C 250 120, 330 490, 720 582"
            stroke="url(#swooshLeft)"
            strokeWidth="8"
            fill="none"
          />
          <path
            d="M 1470 -170 C 1190 120, 1110 490, 720 582"
            stroke="url(#swooshRight)"
            strokeWidth="8"
            fill="none"
          />
        </g>

        {/* ---------- Camada nitida (os fios de luz) ---------- */}
        <g filter="url(#swooshBlurTight)">
          <path
            d="M -170 -90 C 130 150, 200 470, 720 588"
            stroke="url(#swooshLeft)"
            strokeWidth="2.2"
            fill="none"
          />
          <path
            d="M 1610 -90 C 1310 150, 1240 470, 720 588"
            stroke="url(#swooshRight)"
            strokeWidth="2.2"
            fill="none"
          />
          <path
            d="M -30 -170 C 250 120, 330 490, 720 582"
            stroke="url(#swooshLeft)"
            strokeWidth="1.4"
            fill="none"
          />
          <path
            d="M 1470 -170 C 1190 120, 1110 490, 720 582"
            stroke="url(#swooshRight)"
            strokeWidth="1.4"
            fill="none"
          />
        </g>

        {/* ---------- Fios internos, mais curtos e discretos ---------- */}
        <g opacity="0.5" filter="url(#swooshBlurTight)">
          <path
            d="M 210 -50 C 360 170, 430 460, 720 576"
            stroke="url(#swooshLeft)"
            strokeWidth="0.9"
            fill="none"
          />
          <path
            d="M 1230 -50 C 1080 170, 1010 460, 720 576"
            stroke="url(#swooshRight)"
            strokeWidth="0.9"
            fill="none"
          />
        </g>

        {/* ---------- Linha de horizonte ---------- */}
        <ellipse
          cx="720"
          cy="600"
          rx="600"
          ry="6"
          fill="url(#swooshLeft)"
          opacity="0.45"
          filter="url(#swooshBlurTight)"
        />
      </svg>

      {/* Vinheta que funde o hero com o restante da pagina */}
      <div className="swoosh__vignette" />
    </div>
  )
}
