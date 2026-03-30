import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const css = `
  .about-section {
    padding: var(--section-padding);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(40px, 6vw, 100px);
    align-items: start;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }
  .about-left {
    position: relative;
  }
  .about-left .big-quote {
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin-bottom: 2rem;
  }
  .about-left .big-quote .highlight-blue {
    color: var(--accent-blue);
  }
  .about-left .big-quote .highlight-gold {
    color: var(--accent-gold);
  }
  .about-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 2.5rem;
    padding-top: 2.5rem;
    border-top: 1px solid var(--border);
  }
  .about-stat-number {
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    font-weight: 800;
    color: var(--accent-blue);
    font-family: var(--font-mono);
  }
  .about-stat-label {
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-top: 4px;
    font-family: var(--font-mono);
    letter-spacing: 0.05em;
  }
  .about-right {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .about-right p {
    font-size: clamp(0.9rem, 1.3vw, 1.05rem);
    color: var(--text-secondary);
    line-height: 1.8;
  }
  .about-right p strong {
    color: var(--text-primary);
    font-weight: 600;
  }
  .about-tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 1rem;
  }
  .about-tag {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    padding: 6px 14px;
    border-radius: 100px;
    border: 1px solid var(--border);
    color: var(--text-secondary);
    letter-spacing: 0.05em;
    transition: all 0.3s ease;
  }
  .about-tag:hover {
    border-color: var(--accent-blue);
    color: var(--accent-blue);
    background: var(--accent-blue-dim);
  }
  @media (max-width: 768px) {
    .about-grid { grid-template-columns: 1fr; }
    .about-stats { grid-template-columns: repeat(3, 1fr); }
  }
`

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const items = el.querySelectorAll('.about-anim')
    gsap.set(items, { opacity: 0, y: 40 })
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    })
  }, [])

  return (
    <>
      <style>{css}</style>
      <section className="about-section" id="about" ref={sectionRef}>
        <div className="about-grid">
          <div className="about-left">
            <div className="section-label about-anim">About</div>
            <div className="big-quote about-anim">
              A <span className="highlight-blue">mechanical engineer</span> who never went to a mech class. Now a{' '}
              <span className="highlight-gold">Tech Lead</span> who architects distributed systems by day and
              cooks fresh pasta by night.
            </div>

            <div className="about-stats about-anim">
              <div>
                <div className="about-stat-number">6+</div>
                <div className="about-stat-label">Years shipping production code</div>
              </div>
              <div>
                <div className="about-stat-number">3</div>
                <div className="about-stat-label">Years to Tech Lead</div>
              </div>
              <div>
                <div className="about-stat-number">65K</div>
                <div className="about-stat-label">Orders/day on his side project</div>
              </div>
            </div>
          </div>

          <div className="about-right">
            <p className="about-anim">
              <strong>BITS Pilani, Class of 2020.</strong> Mechanical Engineering on paper. Zero attendance in mech classes — thanks to a magical zero-attendance policy. Instead? CS electives, coding club, and building things that actually shipped.
            </p>
            <p className="about-anim">
              Met his wife <strong>Diksha</strong> in a Bhagavad Gita humanities elective. His alma mater became his sasural. Life writes better plots than any code.
            </p>
            <p className="about-anim">
              <strong>ADHD isn&apos;t a bug — it&apos;s a feature.</strong> It means going 0 to deep-expertise on anything that catches his eye. The result? A portfolio spanning banking compliance systems, distributed scraping platforms, AI memory engines, 3D games, cinematography, and hand-drawn icon libraries.
            </p>
            <p className="about-anim">
              <strong>&ldquo;There is not one single language or anything that can stop me.&rdquo;</strong>
            </p>

            <div className="about-tag-row about-anim">
              {['Builder', 'Cinematographer', 'Cook', 'Singer', 'Film Critic', 'Mentor', 'Traveler', 'Tinkerer'].map((t) => (
                <span className="about-tag" key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
