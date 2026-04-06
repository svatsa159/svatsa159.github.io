import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import heroImage from '../assets/hero.png'

const collectorCards = [
  { title: 'SYSTEM LEADER', sub: 'Drives teams to execution' },
  { title: 'DEEP THINKER', sub: 'Finds first principles fast' },
  { title: 'ROOT-CAUSE HUNTER', sub: 'Solves the real problem' },
  { title: 'CALM OPERATOR', sub: 'Reliable under pressure' },
  { title: 'PRODUCT BUILDER', sub: 'Ships with business intent' },
]

const css = `
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding-top: 108px;
  }
  .hero-shell {
    max-width: var(--content-max);
    margin: 0 auto;
    width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
    gap: clamp(22px, 5vw, 60px);
    align-items: center;
  }
  .hero-copy {
    position: relative;
    z-index: 2;
  }
  .hero-kicker {
    font-family: var(--font-mono);
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--accent-gold);
    font-size: 0.72rem;
    margin-bottom: 1rem;
  }
  .hero-name {
    font-size: clamp(2.6rem, 8vw, 6.2rem);
    line-height: 0.94;
    letter-spacing: -0.045em;
    margin-bottom: 1rem;
    text-wrap: balance;
    opacity: 0;
  }
  .hero-name span:last-child {
    color: var(--accent-blue-strong);
    display: block;
  }
  .hero-title {
    font-family: var(--font-mono);
    font-size: clamp(0.88rem, 1.7vw, 1.05rem);
    color: var(--text-secondary);
    min-height: 1.4em;
    line-height: 1.2;
    letter-spacing: 0.04em;
    opacity: 0;
  }
  .hero-title .cursor {
    display: inline-block;
    margin-left: 4px;
    width: 2px;
    height: 1.45em;
    background: var(--accent-gold);
    vertical-align: -0.28em;
    animation: hero-blink 0.9s step-end infinite;
  }
  @keyframes hero-blink { 50% { opacity: 0; } }

  .hero-summary {
    margin-top: 1.4rem;
    max-width: 58ch;
    color: var(--text-secondary);
    font-size: clamp(0.96rem, 1.4vw, 1.1rem);
    opacity: 0;
  }
  .hero-cta-row {
    margin-top: 1.8rem;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    opacity: 0;
  }
  .hero-pill {
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 8px 14px;
    background: rgba(18, 27, 47, 0.55);
    font-family: var(--font-mono);
    color: var(--text-secondary);
    font-size: 0.68rem;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  .hero-visual {
    opacity: 0;
    transform: translateY(20px);
  }

  .collector-stack {
    position: relative;
    width: min(420px, 100%);
    margin-left: auto;
    height: 520px;
    perspective: 1000px;
  }

  .collector-card {
    --card-inner: #8b55d9;
    --card-border: #b48bff;
    --card-glow: rgba(139, 85, 217, 0.3);
    --image-filter: none;
    position: absolute;
    inset: 0;
    border-radius: 22px;
    overflow: hidden;
    border: 1.5px solid color-mix(in srgb, var(--card-border) 78%, transparent);
    box-shadow:
      0 22px 45px rgba(3, 8, 18, 0.5),
      0 0 28px var(--card-glow),
      inset 0 0 0 1px color-mix(in srgb, var(--card-border) 28%, transparent);
    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease;
    will-change: transform, opacity;
    transform-style: preserve-3d;
    background: linear-gradient(165deg, #0c1422, #0a111d);
    padding: 18px;
  }

  .collector-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 18% 10%, color-mix(in srgb, var(--card-inner) 45%, transparent), transparent 46%);
    pointer-events: none;
    z-index: 2;
  }

  .collector-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.16'/%3E%3C/svg%3E");
    background-size: 180px 180px;
    mix-blend-mode: soft-light;
    opacity: 0.35;
    pointer-events: none;
    z-index: 3;
  }

  .collector-image-wrap {
    position: absolute;
    inset: 18px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #1a2235 0%, #141c2e 100%);
    border: 1px solid color-mix(in srgb, var(--card-border) 42%, transparent);
    z-index: 1;
    overflow: hidden;
  }

  .collector-image-wrap::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent);
    pointer-events: none;
    z-index: 2;
  }

  .collector-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: var(--image-filter);
    opacity: 1;
  }

  .collector-overlay {
    position: absolute;
    left: 18px;
    right: 18px;
    bottom: 18px;
    padding: 20px 16px 16px;
    background: linear-gradient(to top, rgba(4, 8, 16, 0.98), rgba(4, 8, 16, 0.28) 62%, transparent);
    z-index: 4;
    border-radius: 0 0 14px 14px;
  }

  .collector-title {
    font-family: var(--font-mono);
    font-weight: 900;
    font-size: clamp(1.06rem, 2vw, 1.28rem);
    letter-spacing: 0.1em;
    color: #f8fbff;
    text-transform: uppercase;
    line-height: 1.04;
    margin-bottom: 8px;
    text-shadow: 0 3px 16px rgba(0, 0, 0, 0.75);
  }

  .collector-sub {
    font-family: var(--font-mono);
    font-weight: 900;
    font-size: 0.84rem;
    color: #edf3ff;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    opacity: 0.98;
  }

  @media (max-width: 920px) {
    .hero-shell {
      grid-template-columns: 1fr;
      gap: 24px;
    }
    .hero {
      min-height: auto;
      padding-top: 96px;
    }
    .collector-stack {
      margin: 0 auto;
      width: min(420px, 92vw);
      height: min(520px, 72vw);
      min-height: 380px;
    }
  }
`

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const summaryRef = useRef<HTMLParagraphElement>(null)
  const chipsRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  const [deckOrder, setDeckOrder] = useState([0, 1, 2, 3, 4])

  const [typeText, setTypeText] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'Technical Lead. Systems Architect. Product Builder.'
    }
    return ''
  })

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const text = 'Technical Lead. Systems Architect. Product Builder.'
    let i = 0
    const interval = window.setInterval(() => {
      setTypeText(text.slice(0, i + 1))
      i += 1
      if (i >= text.length) window.clearInterval(interval)
    }, 42)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const interval = window.setInterval(() => {
      setDeckOrder((prev) => [...prev.slice(1), prev[0]])
    }, 2000)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      gsap.set([nameRef.current, subtitleRef.current, summaryRef.current, chipsRef.current, visualRef.current], { opacity: 1, y: 0, scale: 1 })
      return
    }

    const timeline = gsap.timeline({ delay: 0.15 })
    timeline
      .to(nameRef.current, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' })
      .to(subtitleRef.current, { opacity: 1, duration: 0.4 }, '-=0.35')
      .to(summaryRef.current, { opacity: 1, duration: 0.4 }, '-=0.2')
      .to(chipsRef.current, { opacity: 1, duration: 0.35 }, '-=0.15')
      .to(visualRef.current, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.3')
  }, [])

  return (
    <>
      <style>{css}</style>
      <section className="hero" id="hero">
        <div className="hero-shell">
          <div className="hero-copy">
            <div className="hero-kicker">Portfolio • Engineering Leadership</div>
            <h1 ref={nameRef} className="hero-name">
              <span>Srivatsa</span>
              <span>Rampalli</span>
            </h1>
            <div ref={subtitleRef} className="hero-title">
              {typeText}
              <span className="cursor" />
            </div>
            <p ref={summaryRef} className="hero-summary">
              Building resilient platforms across finance, automation, and AI — with a practical focus on team velocity, system reliability, and measurable outcomes.
            </p>
            <div ref={chipsRef} className="hero-cta-row" aria-label="Key strengths">
              <span className="hero-pill">Distributed Systems</span>
              <span className="hero-pill">Kubernetes Platforms</span>
              <span className="hero-pill">Regulated Domains</span>
              <span className="hero-pill">Product + Engineering</span>
            </div>
          </div>

          <div ref={visualRef} className="hero-visual" aria-label="Collector edition trait cards">
            <div className="collector-stack">
              {deckOrder.map((cardIndex, depth) => {
                const card = collectorCards[cardIndex]
                const palette = [
                  {
                    inner: '#8B55D9',
                    border: '#B48BFF',
                    glow: 'rgba(139, 85, 217, 0.30)',
                    imageFilter: 'none',
                  },
                  {
                    inner: '#2FA8E6',
                    border: '#8EDBFF',
                    glow: 'rgba(47, 168, 230, 0.28)',
                    imageFilter: 'none',
                  },
                  {
                    inner: '#1FAE92',
                    border: '#7BE8CF',
                    glow: 'rgba(31, 174, 146, 0.28)',
                    imageFilter: 'none',
                  },
                  {
                    inner: '#C94A78',
                    border: '#F59AB9',
                    glow: 'rgba(201, 74, 120, 0.28)',
                    imageFilter: 'none',
                  },
                  {
                    inner: '#D59A2A',
                    border: '#FFD27A',
                    glow: 'rgba(213, 154, 42, 0.28)',
                    imageFilter: 'none',
                  },
                ]
                const tone = palette[cardIndex]
                const zIndex = 20 - depth
                const translateY = depth * 12
                const scale = 1 - depth * 0.04
                const rotate = (depth % 2 === 0 ? -1 : 1) * depth * 1.1
                const opacity = 1 - depth * 0.14
                const style = {
                  zIndex,
                  opacity,
                  transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
                  ['--card-inner' as string]: tone.inner,
                  ['--card-border' as string]: tone.border,
                  ['--card-glow' as string]: tone.glow,
                  ['--image-filter' as string]: tone.imageFilter,
                }

                return (
                  <article key={`${card.title}-${cardIndex}`} className="collector-card" style={style}>
                    <div className="collector-image-wrap">
                      <img className="collector-image" src={heroImage} alt={card.title} />
                    </div>
                    <div className="collector-overlay">
                      <div className="collector-title">{card.title}</div>
                      <div className="collector-sub">{card.sub}</div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
