import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const css = `
  .about-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: clamp(22px, 4vw, 54px);
  }
  .about-quote {
    font-size: clamp(1.6rem, 3vw, 2.5rem);
    line-height: 1.22;
    letter-spacing: -0.02em;
    margin-bottom: 1.6rem;
  }
  .about-quote .blue { color: var(--accent-blue-strong); }
  .about-quote .gold { color: var(--accent-gold-strong); }
  .about-narrative {
    display: grid;
    gap: 1rem;
  }
  .about-narrative p {
    color: var(--text-secondary);
    font-size: clamp(0.93rem, 1.35vw, 1.03rem);
  }
  .about-narrative strong {
    color: var(--text-primary);
    font-weight: 640;
  }
  .about-stats {
    margin-top: 1.8rem;
    padding-top: 1.4rem;
    border-top: 1px solid var(--border);
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
  }
  .about-stat {
    border: 1px solid var(--border);
    border-radius: 12px;
    background: rgba(9, 14, 25, 0.45);
    padding: 12px;
  }
  .about-stat strong {
    display: block;
    font-family: var(--font-mono);
    color: var(--accent-blue-strong);
    font-size: clamp(1rem, 1.5vw, 1.3rem);
  }
  .about-stat span {
    font-family: var(--font-mono);
    font-size: 0.66rem;
    letter-spacing: 0.04em;
    color: var(--text-muted);
  }
  .about-tags {
    margin-top: 1.1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .about-tag {
    font-family: var(--font-mono);
    border: 1px solid var(--border);
    border-radius: 999px;
    color: var(--text-secondary);
    font-size: 0.66rem;
    padding: 6px 10px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  @media (max-width: 900px) {
    .about-grid { grid-template-columns: 1fr; }
  }
`

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const items = el.querySelectorAll('.about-anim')

    if (reduceMotion) {
      gsap.set(items, { opacity: 1, y: 0 })
      return
    }

    gsap.set(items, { opacity: 0, y: 28 })
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 72%',
      },
    })
  }, [])

  return (
    <>
      <style>{css}</style>
      <section id="about" ref={sectionRef}>
        <div className="section-shell">
          <div className="section-panel">
            <div className="section-label about-anim">About</div>
            <div className="about-grid">
              <div>
                <div className="about-quote about-anim">
                  A <span className="blue">mechanical engineer</span> who never went to a mech class. Now a <span className="gold">Tech Lead</span> who architects distributed systems by day and cooks fresh pasta by night.
                </div>
                <div className="about-stats about-anim">
                  <div className="about-stat"><strong>6+</strong><span>Years shipping production code</span></div>
                  <div className="about-stat"><strong>3</strong><span>Years to Tech Lead</span></div>
                  <div className="about-stat"><strong>65K</strong><span>Orders/day on side project</span></div>
                </div>
              </div>

              <div className="about-narrative">
                <p className="about-anim"><strong>BITS Pilani, Class of 2020.</strong> Mechanical Engineering on paper. Zero attendance in mech classes — thanks to a magical zero-attendance policy. Instead? CS electives, coding club, and building things that actually shipped.</p>
                <p className="about-anim">Met his wife <strong>Diksha</strong> in a Bhagavad Gita humanities elective. His alma mater became his sasural. Life writes better plots than any code.</p>
                <p className="about-anim"><strong>ADHD isn&apos;t a bug — it&apos;s a feature.</strong> It means going 0 to deep-expertise on anything that catches his eye. The result? A portfolio spanning banking compliance systems, distributed scraping platforms, AI memory engines, 3D games, cinematography, and hand-drawn icon libraries.</p>
                <p className="about-anim"><strong>&ldquo;There is not one single language or anything that can stop me.&rdquo;</strong></p>
                <div className="about-tags about-anim">
                  {['Builder', 'Cinematographer', 'Cook', 'Singer', 'Film Critic', 'Mentor', 'Traveler', 'Tinkerer'].map((tag) => (
                    <span key={tag} className="about-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
