import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const css = `
  .hero-section {
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background: var(--bg);
  }
  .hero-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 0 20px;
  }
  .hero-name {
    font-size: clamp(3rem, 10vw, 8rem);
    font-weight: 900;
    letter-spacing: -0.04em;
    line-height: 0.95;
    margin-bottom: 1.5rem;
    opacity: 0;
  }
  .hero-name .first {
    display: block;
    color: var(--text-primary);
  }
  .hero-name .last {
    display: block;
    color: var(--accent-blue);
  }
  .hero-subtitle {
    font-family: var(--font-mono);
    font-size: clamp(0.85rem, 2vw, 1.1rem);
    color: var(--text-secondary);
    letter-spacing: 0.1em;
    opacity: 0;
    height: 1.5em;
  }
  .hero-subtitle .cursor {
    display: inline-block;
    width: 2px;
    height: 1.15em;
    background: var(--accent-gold);
    margin-left: 4px;
    vertical-align: text-bottom;
    animation: blink 1s step-end infinite;
    font-size: inherit;
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  .hero-scroll-hint {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    opacity: 0;
    z-index: 2;
  }
  .hero-scroll-hint span {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text-muted);
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
  .hero-scroll-line {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, var(--accent-blue), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.3; transform: scaleY(0.5); }
    50% { opacity: 1; transform: scaleY(1); }
  }
  .hero-tagline {
    font-family: var(--font-mono);
    font-size: clamp(0.7rem, 1.2vw, 0.85rem);
    color: var(--accent-gold);
    margin-top: 2rem;
    opacity: 0;
    letter-spacing: 0.05em;
  }
`

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [typeText, setTypeText] = useState('')

  // Canvas animation - floating particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.3 + 0.05,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0, 170, 255, ${0.03 * (1 - dist / 150)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 170, 255, ${p.alpha})`
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // GSAP entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })
    tl.to(nameRef.current, { opacity: 1, duration: 0.8, ease: 'power3.out' })
      .to(subtitleRef.current, { opacity: 1, duration: 0.5 }, '-=0.3')
      .to(taglineRef.current, { opacity: 1, duration: 0.5 }, '-=0.1')
      .to(scrollRef.current, { opacity: 1, duration: 0.5 }, '-=0.1')
  }, [])

  // Typewriter effect
  useEffect(() => {
    const text = 'Technical Lead. Builder. Tinkerer.'
    let i = 0
    const interval = setInterval(() => {
      setTypeText(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(interval)
    }, 60)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <style>{css}</style>
      <section className="hero-section" id="hero">
        <canvas ref={canvasRef} className="hero-canvas" />

        <div className="hero-content">
          <h1 ref={nameRef} className="hero-name">
            <span className="first">SRIVATSA</span>
            <span className="last">RAMPALLI</span>
          </h1>
          <div ref={subtitleRef} className="hero-subtitle" style={{ opacity: 0 }}>
            {typeText}<span className="cursor" />
          </div>
          <div ref={taglineRef} className="hero-tagline" style={{ opacity: 0 }}>
            &ldquo;From Kubernetes orchestrators to fresh pasta — I architect everything.&rdquo;
          </div>
        </div>

        <div ref={scrollRef} className="hero-scroll-hint" style={{ opacity: 0 }}>
          <span>Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </section>
    </>
  )
}
