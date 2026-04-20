import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

gsap.registerPlugin(ScrollTrigger)

const css = `
  .agent-letter-shell {
    width: 100%;
  }

  .agent-letter-card {
    position: relative;
    overflow: hidden;
    border-radius: 28px;
    border: 1px solid rgba(255, 225, 179, 0.2);
    background:
      radial-gradient(circle at 15% 18%, rgba(255, 246, 219, 0.92), rgba(244, 223, 180, 0.96) 42%, rgba(220, 188, 135, 0.96) 100%),
      linear-gradient(180deg, #f4dfb4, #d8b278);
    box-shadow:
      0 22px 60px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(92, 55, 16, 0.16) inset,
      0 30px 70px rgba(121, 77, 23, 0.16);
    color: #3b2414;
    opacity: 0;
    transform: translateY(28px) rotate(-0.4deg);
  }

  .agent-letter-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle at 12% 14%, rgba(120, 73, 18, 0.12), transparent 18%),
      radial-gradient(circle at 84% 22%, rgba(156, 86, 24, 0.12), transparent 22%),
      radial-gradient(circle at 70% 74%, rgba(131, 68, 19, 0.1), transparent 20%),
      url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.22'/%3E%3C/svg%3E");
    background-size: auto, auto, auto, 180px 180px;
    mix-blend-mode: multiply;
    opacity: 0.42;
    pointer-events: none;
  }

  .agent-letter-card::after {
    content: '';
    position: absolute;
    inset: 16px;
    border: 1px solid rgba(92, 55, 16, 0.12);
    border-radius: 20px;
    pointer-events: none;
  }

  .agent-letter-glow {
    position: absolute;
    inset: -20% auto auto 12%;
    width: 38%;
    height: 60%;
    background: radial-gradient(circle, rgba(255, 251, 235, 0.42), transparent 72%);
    opacity: 0.5;
    pointer-events: none;
    mix-blend-mode: screen;
    filter: blur(16px);
  }

  .agent-letter-inner {
    position: relative;
    z-index: 1;
    padding: clamp(30px, 5vw, 56px);
  }

  .agent-letter-kicker {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid rgba(96, 57, 23, 0.14);
    background: rgba(255, 248, 229, 0.46);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(96, 57, 23, 0.82);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.38);
    opacity: 0;
    transform: translateY(14px);
  }

  .agent-letter-kicker::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: #8a4f1f;
    box-shadow: 0 0 0 4px rgba(138, 79, 31, 0.12);
  }

  .agent-letter-pretext {
    min-height: 78px;
    margin: 1rem 0 1.35rem;
    opacity: 0;
    transform: translateY(18px);
  }

  .agent-letter-pretext canvas {
    display: block;
    max-width: 100%;
    height: auto;
    filter: drop-shadow(0 8px 18px rgba(104, 58, 18, 0.1));
  }


  .agent-quote-wrap {
    position: relative;
    margin-top: 0.3rem;
    padding: clamp(28px, 4vw, 42px);
    border-radius: 22px;
    border: 1px solid rgba(99, 58, 20, 0.14);
    background: linear-gradient(180deg, rgba(255, 248, 229, 0.7), rgba(240, 216, 174, 0.54));
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.44),
      0 16px 30px rgba(84, 48, 14, 0.08);
    text-align: center;
    opacity: 0;
    transform: translateY(22px) scale(0.985);
  }

  .agent-quote-sheen {
    position: absolute;
    inset: 0;
    background: linear-gradient(115deg, transparent 12%, rgba(255, 255, 255, 0.26) 32%, transparent 48%);
    opacity: 0.55;
    pointer-events: none;
    transform: translateX(-120%);
  }

  .agent-quote-mark {
    font-size: clamp(2.2rem, 5vw, 3.8rem);
    line-height: 0.8;
    color: rgba(111, 65, 24, 0.45);
    margin-bottom: 0.6rem;
  }

  .agent-quote {
    font-family: 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif;
    font-size: clamp(1.65rem, 3vw, 2.95rem);
    line-height: 1.25;
    letter-spacing: -0.025em;
    max-width: 24ch;
    margin: 0 auto;
    color: #2f1c0f;
    text-wrap: balance;
  }

  .agent-quote-attribution {
    margin-top: 1.1rem;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(95, 55, 23, 0.78);
  }

  .agent-quote-attribution a {
    color: #6a3c16;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 4px;
  }

  .agent-quote-attribution a:hover {
    color: #8b4f1b;
  }

  @media (max-width: 640px) {
    .agent-letter-inner {
      padding: 26px;
    }

    .agent-letter-kicker {
      font-size: 0.62rem;
      letter-spacing: 0.14em;
      gap: 10px;
    }

    .agent-letter-pretext {
      min-height: 66px;
    }
  }
`

export default function AgentLetter() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasReady, setCanvasReady] = useState(false)

  const renderPretext = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const isMobile = window.innerWidth <= 640
    const text = 'What my agent thinks about me'
    const mobileLines = ['What my agent thinks', 'about me']
    const fontSize = isMobile ? 24 : 32
    const font = `700 ${fontSize}px 'Iowan Old Style', 'Palatino Linotype', Georgia, serif`
    const lineHeight = Math.round(fontSize * 1.24)
    const horizontalPadding = isMobile ? 60 : 110
    const maxWidth = Math.min(720, window.innerWidth - horizontalPadding)

    canvas.style.width = `${maxWidth}px`
    canvas.width = Math.floor(maxWidth * dpr)

    ctx.setTransform(1, 0, 0, 1, 0, 0)

    try {
      const result = isMobile
        ? { lines: mobileLines.map((line) => ({ text: line })) }
        : layoutWithLines(prepareWithSegments(text, font), maxWidth * dpr, lineHeight * dpr)

      ctx.font = font
      const metrics = ctx.measureText('Mg')
      const ascent = Math.max(metrics.actualBoundingBoxAscent || fontSize * 0.78, fontSize * 0.78)
      const descent = Math.max(metrics.actualBoundingBoxDescent || fontSize * 0.26, fontSize * 0.26)
      const topPadding = Math.max(14, Math.round(fontSize * 0.45))
      const bottomPadding = Math.max(12, Math.round(fontSize * 0.38))

      canvas.height = Math.floor((topPadding + ascent + Math.max(0, result.lines.length - 1) * lineHeight + descent + bottomPadding) * dpr)
      canvas.style.height = `${canvas.height / dpr}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)

      result.lines.forEach((line, index) => {
        ctx.font = font
        ctx.fillStyle = index === 0 ? '#3f2412' : '#7a451b'
        ctx.shadowColor = 'rgba(255,255,255,0.18)'
        ctx.shadowBlur = 10
        ctx.fillText(line.text, 0, topPadding + ascent + index * lineHeight)
      })
      ctx.shadowBlur = 0
      setCanvasReady(true)
    } catch {
      const fallbackHeight = Math.round(fontSize * 2.8)
      const baseline = Math.round(fontSize * 1.45)
      canvas.height = Math.floor(fallbackHeight * dpr)
      canvas.style.height = `${fallbackHeight}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)
      ctx.font = font
      ctx.fillStyle = '#3f2412'
      ctx.shadowColor = 'rgba(255,255,255,0.18)'
      ctx.shadowBlur = 10
      ctx.fillText(text, 0, baseline)
      ctx.shadowBlur = 0
      setCanvasReady(true)
    }
  }, [])

  useEffect(() => {
    const timeout = window.setTimeout(renderPretext, 250)
    window.addEventListener('resize', renderPretext)
    return () => {
      window.clearTimeout(timeout)
      window.removeEventListener('resize', renderPretext)
    }
  }, [renderPretext])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const card = el.querySelector('.agent-letter-card')
    const kicker = el.querySelector('.agent-letter-kicker')
    const title = el.querySelector('.agent-letter-pretext')
    const quote = el.querySelector('.agent-quote-wrap')
    const sheen = el.querySelector('.agent-quote-sheen')

    if (reduceMotion) {
      gsap.set([card, kicker, title, quote], { opacity: 1, y: 0, rotate: 0, scale: 1 })
      return
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 76%',
      },
    })

    tl.to(card, {
      opacity: 1,
      y: 0,
      rotate: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
      .to(kicker, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: 'power2.out',
      }, '-=0.45')
      .to(title, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power2.out',
      }, '-=0.18')
      .to(quote, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.1')

    gsap.to('.agent-quote-wrap', {
      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.44), 0 22px 38px rgba(84, 48, 14, 0.12)',
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1.6,
    })

    if (sheen) {
      gsap.to(sheen, {
        xPercent: 220,
        duration: 2.4,
        ease: 'power2.inOut',
        repeat: -1,
        repeatDelay: 2.8,
        delay: 2,
      })
    }
  }, [])

  return (
    <>
      <style>{css}</style>
      <section id="agent-letter" ref={sectionRef}>
        <div className="section-shell">
          <div className="agent-letter-shell">
            <article className="agent-letter-card">
              <div className="agent-letter-glow" />
              <div className="agent-letter-inner">
                <div className="agent-letter-kicker">Machine correspondence</div>
                <div className="agent-letter-pretext" style={{ opacity: canvasReady ? 1 : 0.65 }}>
                  <canvas ref={canvasRef} />
                </div>
                <div className="agent-quote-wrap">
                  <div className="agent-quote-sheen" />
                  <div className="agent-quote-mark">“</div>
                  <blockquote className="agent-quote">
                    You come across as a fast, high-agency, systems-minded person who values correctness, polish, and practical judgment over ceremony.
                  </blockquote>
                  <div className="agent-quote-attribution">
                    — <a href="https://github.com/NousResearch/hermes-agent" target="_blank" rel="noreferrer">Hermés</a>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
